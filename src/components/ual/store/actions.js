import {
  processThresholdFromNE,
  THRESHOLD_HIGH,
  THRESHOLD_MIDDLE,
  THRESHOLD_LOW,
  createColorsScheme
} from "imports/utils";
import { processDacNameInId, processFromDacId } from "imports/validators";

export async function renderLoginModal({ commit }) {
  commit("setShouldRenderLoginModal", true);
}

export async function logout({ state, commit }) {
  let activeAuth = state.activeAuthenticator;
  if (activeAuth) {
    console.log(`Logging out from authenticator: ${activeAuth.getStyle().text}`);
    activeAuth
      .logout()
      .then(() => {
        console.log("Logged out!");
        commit("setActiveAuthenticator", false);
        commit("setAccountName", false);
        commit("setSESSION", { accountName: null, authenticatorName: null });
      })
      .catch(e => {
        console.log(`An error occured while attempting to logout from authenticator: ${activeAuth.getStyle().text}`);
      });
  } else {
    console.log("No active authenticator found, you must be logged in before logging out.");
  }
}

export async function waitForAuthenticatorToLoad({}, authenticator) {
  return new Promise(resolve => {
    if (!authenticator.isLoading()) {
      resolve();
      return;
    }
    const authenticatorIsLoadingCheck = setInterval(() => {
      if (!authenticator.isLoading()) {
        clearInterval(authenticatorIsLoadingCheck);
        resolve();
      }
    }, 250);
  });
}
export async function attemptAutoLogin({ state, commit, dispatch }) {
  let { accountName, authenticatorName, timestamp } = state.SESSION;
  if (accountName && authenticatorName) {
    let authenticator = state.UAL.authenticators.find(a => a.getStyle().text == authenticatorName);
    authenticator.init();
    await dispatch("waitForAuthenticatorToLoad", authenticator);
    if (authenticator.initError) {
      console.log(
        `Attempt to auto login with authenticator ${authenticatorName} failed because it's not available anymore.`
      );
      commit("setSESSION", { accountName: null, authenticatorName: null });
      return;
    }
    authenticator
      .login(accountName)
      .then(() => {
        commit("setSESSION", { accountName, authenticatorName });
        commit("setAccountName", accountName);
        commit("setActiveAuthenticator", authenticator);
      })
      .catch(e => {
        commit("setSESSION", { accountName: null, authenticatorName: null });
        console.log("auto login error", e, e.cause);
      });
  }
}

export function prepareDacTransact({ state, commit, dispatch }, payload) {
  const { accountName } = state;
  const { stepsData, payTokenSymbol, payTokenQuantity, pushCallback } = payload;

  const { dacName, dacDescription, tokenSymbol } = stepsData[1];
  const { maxSupply, decimals, issuance } = stepsData[2];
  const { lockupAsset, maxRequestPay, lockup, lockupSelect, periodLength, numberElected, maxVotes } = stepsData[3];
  const { websiteURL, logoURL, logoMarkURL, colorsScheme } = stepsData[4];

  const lockupSeconds = lockupSelect === "Day(s)" ? lockup * 24 * 3600 : lockup * 3600;
  const { DAC_TOKEN_CONTRACT, DAC_FACTORY } = process.env;
  const tokenToPay = process.env[`${payTokenSymbol}_TOKEN_CONTRACT`];
  const tariffName = `monthly.${payTokenSymbol.toLowerCase()}`;

  const dacId = processDacNameInId(dacName);
  commit("setDacId", dacId);
  // TODO remove || 1 after proper validation will be added to fields
  const dacData = {
    id: dacId,
    owner: accountName,
    appointed_custodian: accountName,
    authority: processFromDacId(dacId, "authority"),
    treasury: processFromDacId(dacId, "treasury"),
    symbol: {
      contract: DAC_TOKEN_CONTRACT,
      symbol: `${decimals},${tokenSymbol}`
    },
    max_supply: `${(maxSupply || 1).toFixed(decimals)} ${tokenSymbol}`,
    issuance: `${(issuance || 1).toFixed(decimals)} ${tokenSymbol}`,
    name: dacName,
    description: dacDescription,
    homepage: websiteURL,
    logo_url: logoURL,
    logo_notext_url: logoMarkURL,
    background_url: "",
    theme: {
      is_dark: true,
      colors: createColorsScheme(colorsScheme)
    },
    custodian_config: {
      lockupasset: {
        quantity: `${(lockupAsset || 1).toFixed(decimals)} ${tokenSymbol}`,
        contract: DAC_TOKEN_CONTRACT
      },
      maxvotes: maxVotes,
      numelected: numberElected,
      periodlength: periodLength,
      should_pay_via_service_provider: false,
      initial_vote_quorum_percent: 1,
      vote_quorum_percent: 1,
      auth_threshold_high: processThresholdFromNE(numberElected, THRESHOLD_HIGH),
      auth_threshold_mid: processThresholdFromNE(numberElected, THRESHOLD_MIDDLE),
      auth_threshold_low: processThresholdFromNE(numberElected, THRESHOLD_LOW),
      lockup_release_time_delay: lockupSeconds,
      requested_pay_max: {
        quantity: `${(maxRequestPay || 1).toFixed(4)} EOS`,
        contract: "eosio.token"
      }
    },
    proposals_config: {
      proposal_threshold: 4,
      finalize_threshold: 1,
      escrow_expiry: 2592000,
      approval_expiry: 2592000
    }
  };

  const actions = [
    {
      account: tokenToPay,
      name: "transfer",
      data: {
        from: accountName,
        to: DAC_FACTORY,
        quantity: "20.0000 EOS",
        memo: `${dacId}:_setup`
      }
    },
    {
      account: tokenToPay,
      name: "transfer",
      data: {
        from: accountName,
        to: DAC_FACTORY,
        quantity: payTokenQuantity,
        memo: `${dacId}:${tariffName}`
      }
    },
    {
      account: DAC_FACTORY,
      name: "createdac",
      data: {
        dac_id: dacId,
        json: JSON.stringify(dacData)
      }
    }
  ];

  dispatch("transact", { actions, callback: pushCallback });
}

export async function transact({ state, dispatch, commit }, payload) {
  const { actions, callback } = payload;
  commit("setSigningOverlay", { show: true, status: 0, msg: "Waiting for Signature" });
  const user = state.activeAuthenticator.users[0];
  const copiedActions = actions.map((action, index) => ({
    ...actions[index],
    authorization: [{ actor: user.accountName, permission: "active" }]
  }));

  //sign
  try {
    if (callback && typeof callback === "function") {
      //await user.signTransaction({ actions: [copiedActions] }, { broadcast: true });
      commit("setSigningOverlay", { show: true, status: 1, msg: "Transaction Successful" });
      await dispatch("hideSigningOverlay", 1000);
      console.log('transact finished');
      callback();
    }
  } catch (e) {
    console.log(e, e.cause);
    commit("setSigningOverlay", { show: true, status: 2, msg: dispatch("parseUalError", e) });
    dispatch("hideSigningOverlay", 2000);
  }
}

export function parseUalError({}, error) {
  let cause = "unknown cause";
  let error_code = "";
  if (error.cause) {
    cause = error.cause.reason || error.cause.message || "Report this error to the eosdac devs to enhance the UX";
    error_code = error.cause.code || error.cause.errorCode;
  }
  return `${error}. ${cause} ${error_code}`;
}

export function hideSigningOverlay({ commit }, ms = 10000) {
  return new Promise(resolve => {
    setTimeout(() => {
      commit("setSigningOverlay", { show: false, status: 0 });
      resolve();
    }, ms);
  });
}
