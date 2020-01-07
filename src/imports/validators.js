import Vue from "vue";

export function isValidAccountName(v) {
  if (!v) return true;
  v = v.toLowerCase();
  const re = /^[a-z1-5.]{1,12}$/;
  if (re.test(v)) {
    return true;
  } else {
    return "Account name can only have chars a-z, 1-5 and.";
  }
}

export function isValidUrl(v) {
  if (!v) return true;
  const re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (re.test(v)) {
    return true;
  } else {
    return "URL is not valid";
  }
}
export function isValidSymbol(symbol) {
  if (/^[A-Z]{1,7}$/.test(symbol)) {
    return true;
  } else {
    return this.$t("errors.step1.can_only_have_letters");
  }
}

export async function isAvailableAccountName(name) {
  let res = await Vue.prototype.$eosapi.get_account(name.toLowerCase()).catch(() => false);
  if (!res) {
    //accountname not found
    return true;
  } else {
    return "Account name already taken.";
  }
}

export async function isAvailableSymbol(symbol) {
  const scope = symbol.toUpperCase();

  try {
    const res = await Vue.prototype.$eosapi.get_table_rows({
      json: true,
      code: process.env.DAC_TOKEN_CONTRACT,
      scope,
      table: "stat",
      limit: 1
    });
    if (res && res.rows.length && res.rows[0].supply.split(" ")[1] === scope) {
      return this.$t("errors.step1.token_already_exists");
    } else {
      return true;
    }
  } catch (error) {
    return this.$t("errors.step1.token_verification_error");
  }
}

export function isValidDacId(v) {
  v = v.toLowerCase();
  const re = /^[a-z1-5]{1,11}$/;
  if (re.test(v)) {
    return true;
  } else {
    return "DAC ID can only have characters a-z and 1-5";
  }
}

export async function isAvailableDacId(v) {
  v = v.toLowerCase();
  let res = await Vue.prototype.$eosapi
    .get_table_rows({
      json: true,
      code: "dacdirectory",
      scope: "dacdirectory",
      table: "dacs",
      lower_bound: v,
      upper_bound: v,
      limit: 1
    })
    .catch(e => console.log(e));
  if (res && res.rows.length === 1 && res.rows[0].dac_id === v) {
    return "DAC ID already exists.";
  } else {
    return true;
  }
}

export function processDacNameInId(dacName) {
  let dacId = dacName.toLowerCase().replace(/[^a-z1-5]+/g, "");
  if (dacId.length > 11) {
    dacId = dacId.substring(0, 11);
  }
  if (dacId.length < 5) {
    dacId = dacId.padEnd(5, "1");
  }
  return dacId;
}

export function processFromDacId(dacId, type) {
  let str = dacId.replace(/\./g, "");
  while (str.length < 12) {
    str += type;
  }
  return str.substr(0,12);
}
