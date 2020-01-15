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

export async function isValidSymbol(symbol) {
  if (!/^[A-Z]{1,7}$/.test(symbol)) {
    return this.$t("errors.step1.can_only_have_letters");
  }

  return true;
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
    } else if (process.env.DAC_API) {
      const axios = await Vue.prototype.$axios;
      const params = {symbol_contract: process.env.DAC_TOKEN_CONTRACT, symbol_code: scope};
      const res = await axios.get(`${process.env.DAC_API}/v1/eosdac/dac_info`, {
        params
      });

      if (res.data.count){
        return this.$t("errors.step1.token_already_exists");
      }
    }
  } catch (error) {
    return this.$t("errors.step1.token_verification_error");
  }

  return true;
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
    return false;
  } else {
    return true;
  }
}

export async function processDacNameInId(dacName) {
  console.log(dacName)
  const nameParts = dacName.toLowerCase().replace(/[^a-z1-5\ ]+/g, "").split(' ');
  let dacId = '';
  while (dacId.length < 5 && nameParts.length) {
    dacId += nameParts.shift();
  }
  if (dacId.length > 11) {
    dacId = dacId.substring(0, 11);
  }
  if (dacId.length < 5) {
    dacId = dacId.padEnd(5, "1");
  }

  let available = await isAvailableDacId(dacId);
  let bailout = false;
  const original = dacId;
  let i = 1;
  while (!available && !bailout){
    if (original.length < 11){
      dacId = `${original.substr(0, 10)}${i}`
      available = await isAvailableDacId(dacId);
      if (i >= 5){
        bailout = true
      }
    }
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
