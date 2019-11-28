import {
  processThresholdFromNoC,
  THRESHOLD_HIGH,
  THRESHOLD_MIDDLE,
  THRESHOLD_LOW,
  createColorsScheme
} from "imports/utils";
import { processDacNameInId, processFromDacId } from "imports/validators";

import { TIME_PERIOD_OPTIONS } from "store/factory/state";
import { MAX_SUPPLY_VALUE, SECONDS_IN_HOUR } from "components/constants";

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

export async function prepareDacTransact(storeProps, payload) {
  const {
    rootState: {
      factory: { stepsData },
      ual: {
        accountName,
        paymentInfo: { isDacToken, tokenQuantity }
      }
    },
    dispatch
  } = storeProps;
  const { openWS, afterTransact } = payload;

  const { dacName, dacDescription, tokenSymbol } = stepsData[1];
  const { decimals, issuance } = stepsData[2];
  const { periodLength, periodLengthSelect, numberOfCustodians, numberOfVotes } = stepsData[3];
  const { websiteURL, logoURL, logoMarkURL, colorsScheme } = stepsData[4];
  const {
    DAC_TOKEN,
    NATIVE_TOKEN,
    DAC_TOKEN_CONTRACT,
    NATIVE_TOKEN_CONTRACT,
    DAC_FACTORY
  } = process.env;

  const periodLengthSeconds =
    periodLengthSelect === TIME_PERIOD_OPTIONS[0]
      ? periodLength * SECONDS_IN_HOUR
      : periodLength * 24 * SECONDS_IN_HOUR;
  const tokenToPay = isDacToken ? DAC_TOKEN_CONTRACT : NATIVE_TOKEN_CONTRACT;
  const toPayInfo = tokenQuantity[isDacToken ? DAC_TOKEN : NATIVE_TOKEN].toPay;
  const dacId = processDacNameInId(dacName);

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
    max_supply: `${MAX_SUPPLY_VALUE} ${tokenSymbol}`,
    issuance: `${parseInt(issuance).toFixed(decimals)} ${tokenSymbol}`,
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
        quantity: `${parseInt(0).toFixed(decimals)} ${tokenSymbol}`,
        contract: DAC_TOKEN_CONTRACT
      },
      maxvotes: parseInt(numberOfVotes),
      numelected: parseInt(numberOfCustodians),
      periodlength: periodLengthSeconds,
      should_pay_via_service_provider: false,
      initial_vote_quorum_percent: 1,
      vote_quorum_percent: 1,
      auth_threshold_high: processThresholdFromNoC(numberOfCustodians, THRESHOLD_HIGH),
      auth_threshold_mid: processThresholdFromNoC(numberOfCustodians, THRESHOLD_MIDDLE),
      auth_threshold_low: processThresholdFromNoC(numberOfCustodians, THRESHOLD_LOW),
      lockup_release_time_delay: 0,
      requested_pay_max: {
        quantity: `0 ${NATIVE_TOKEN}`,
        contract: NATIVE_TOKEN_CONTRACT
      }
    },
    proposals_config: {
      proposal_threshold: 4,
      finalize_threshold: 1,
      escrow_expiry: 2592000,
      approval_expiry: 2592000
    }
  };
console.log(dacData);
return ;
  const actions = [
    {
      account: tokenToPay,
      name: "transfer",
      data: {
        from: accountName,
        to: DAC_FACTORY,
        quantity: toPayInfo.quantityPlan,
        memo: `${dacId}:${toPayInfo.planId}`
      }
    },
    {
      account: tokenToPay,
      name: "transfer",
      data: {
        from: accountName,
        to: DAC_FACTORY,
        quantity: tokenQuantity.setupFee,
        memo: `${dacId}:_setup`
      }
    },
    {
      account: DAC_FACTORY,
      name: "createdac",
      data: {
        dac_id: dacId,
        dac_symbol: {
          contract: DAC_TOKEN_CONTRACT,
          symbol: `${decimals},${tokenSymbol}`
        },
        json: JSON.stringify(dacData)
      }
    }
  ];

  dispatch("transact", { actions, dacId, openWS, afterTransact });
}

export async function transact({ state, dispatch, commit }, payload) {
  const { actions, dacId, openWS, afterTransact } = payload;
  commit("setSigningOverlay", { show: true, status: 0, msg: "Waiting for Signature", isShowCloseButton: false });
  const user = state.activeAuthenticator.users[0];
  const copiedActions = actions.map((action, index) => ({
    ...actions[index],
    authorization: [{ actor: user.accountName, permission: "active" }]
  }));

  try {
    await openWS(dacId);
    try {
      await user.signTransaction({ actions: copiedActions }, { broadcast: true });
      console.log("transact finished");
      afterTransact();
    } catch (e) {
      afterTransact(parseUalError(e));
    }
  } catch {}
  commit("setSigningOverlay", { show: false, status: 0 });
}

function parseUalError(error) {
  let cause = "unknown cause";
  let error_code = "";
  if (error.cause) {
    cause = error.cause.reason || error.cause.message || "Report this error to the eosdac devs to enhance the UX";
    error_code = error.cause.code || error.cause.errorCode;
  }
  console.log(cause);
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
