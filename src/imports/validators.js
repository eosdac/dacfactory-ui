import Vue from "vue";

export function isValidAccountName(v) {
  if (v == "") return true;
  v = v.toLowerCase();
  const re = /^[a-z1-5.]{1,12}$/;
  if (re.test(v)) {
    return true;
  } else {
    return "Account name can only have chars a-z, 1-5 and .";
  }
}

export function isValidUrl(v) {
  if (v == "") return true;
  const re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (re.test(v)) {
    return true;
  } else {
    return "This is not a valid url";
  }
}
export function isValidSymbol(v) {
  const re = /^[A-Z]{1,7}$/;
  if (re.test(v)) {
    return true;
  } else {
    return "Token symbol can only have letters A-Z";
  }
}

export async function isAvailableSymbol(v) {
  v = v.toUpperCase();
  let contract = "kasdactokens";
  let res = await Vue.prototype.$eosapi
    .get_table_rows({
      json: true,
      code: contract,
      scope: v,
      table: "stat",
      limit: 1
    })
    .catch(e => false);
  if (res && res.rows.length && res.rows[0].supply.split(" ")[1] == v) {
    return "Symbol already exists";
  } else {
    return true;
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
    .catch(e => false);
  if (res && res.rows.length == 1 && res.rows[0].dac_id == v) {
    return "DAC ID already exists.";
  } else {
    return true;
  }
}

export async function isAvailableAccountName(v) {
  v = v.toLowerCase();
  let res = await Vue.prototype.$eosapi.get_account(v).catch(e => false);
  if (!res) {
    //accountname not found
    return true;
  } else {
    return "Account name already taken.";
  }
}
