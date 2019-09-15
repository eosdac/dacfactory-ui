import Vue from 'vue';

export function isValidAccountName(v) {
    if(v=='') return true;
  const re = /^[a-z1-5.]{1,12}$/;
  if (re.test(v)) {
    return true;
  } else {
    return "Account name can only have chars a-z, 1-5 and .";
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

export function isValidDacId(v) {
    const re = /^[a-z1-5]{1,11}$/;
    if (re.test(v)) {
      return true;
    } else {
      return "DAC ID can only have characters a-z and 1-5";
    }
  }

export async function isAvailableDacId(v){
    let res = await Vue.prototype.$eosapi.get_table_rows({
        json: true,
        code: 'dacdirectory',
        scope: 'dacdirectory',
        table: 'dacs',
        lower_bound: v,
        upper_bound: v,
        limit: 1
    }).catch(e => false);
    if(res && res.rows.length == 1 && res.rows[0].dac_id == v){
        return 'DAC ID already exists.'
    }
    else{
        return true;
    }
    
}


export async function isAvailableAccountName(v) {
//   if (v.length < 12) return true;
  // console.log('from val', Vue.prototype.$eosapi)
  let res = await Vue.prototype.$eosapi.get_account(v).catch(e => false);
  if(!res){
      //accountname not found
    return true;
  }
  else{
    return "Account name already taken.";
  }
  

}
