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
