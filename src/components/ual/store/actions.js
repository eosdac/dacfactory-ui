export async function renderLoginModal({ state, commit, dispatch }) {
  commit("setShouldRenderLoginModal", true);
}

export async function logout({ state, commit, dispatch }) {
  let activeAuth = state.activeAuthenticator;
  if(activeAuth){
    console.log(`Logging out from authenticator: ${activeAuth.getStyle().text}`);
    activeAuth.logout().then(() =>{
      console.log('Logged out!')
      commit("setActiveAuthenticator", false);
      commit("setAccountName", false);
      commit("setSESSION", {accountName:null, authenticatorName: null});
    }).catch(e => {console.log(`An error occured while attempting to logout from authenticator: ${activeAuth.getStyle().text}`)});
  }
  else{
    console.log('No active authenticator found, you must be logged in before logging out.');
  }
}

export async function waitForAuthenticatorToLoad({}, authenticator) {
  return new Promise((resolve) => {
    if (!authenticator.isLoading()) {
      resolve()
      return
    }
    const authenticatorIsLoadingCheck = setInterval(() => {
      if (!authenticator.isLoading()) {
        clearInterval(authenticatorIsLoadingCheck)
        resolve()
      }
    }, 250)
  })
}
export async function attemptAutoLogin({state, commit, dispatch}){
  let {accountName, authenticatorName, timestamp}= state.SESSION;
  if(accountName && authenticatorName){
    let authenticator = state.UAL.authenticators.find(a => a.getStyle().text == authenticatorName);
    authenticator.init();
    await dispatch('waitForAuthenticatorToLoad', authenticator);
    if(authenticator.initError){
      console.log(`Attempt to auto login with authenticator ${authenticatorName} failed because it's not available anymore.`);
      commit('setSESSION', {accountName:null, authenticatorName: null});
      return;
    }
    authenticator.login(accountName).then(()=>{
      commit('setSESSION', {accountName:accountName, authenticatorName: authenticatorName});
      commit("setAccountName", accountName);
      commit("setActiveAuthenticator", authenticator);
    }).catch(e =>{
      commit('setSESSION', {accountName:null, authenticatorName: null});
      console.log('auto login error', e, e.cause);
    });
  }
  
}

export async function transact({ state, dispatch, commit }, payload) {
  //check if logged in before transacting
  if(!state.activeAuthenticator || !state.accountName){
    dispatch('renderLoginModal');
    return;
  }
  commit('setSigningOverlay', {show: true, status:0, msg: 'Waiting for Signature'});
  let user = state.activeAuthenticator.users[0];
  //add authorization to actions if not supplied
  payload.actions.forEach(a => {
    if (!a.authorization) {
      a.authorization = [{ actor: user.accountName, permission: "active" }];
    }
  });
  console.log(JSON.stringify(payload.actions, null, 2) );
  //sign
  try{
    let res = await user.signTransaction(
      { actions: payload.actions },
      { broadcast: true }
    );
    console.log(res);
    commit('setSigningOverlay', { show: true, status: 1, msg: 'Transaction Successful'});
    dispatch('hideSigningOverlay', 1000);
    return res;
  }catch(e){
    console.log(e, e.cause);
    commit('setSigningOverlay', { show: true, status: 2, msg: await dispatch('parseUalError', e) });
    dispatch('hideSigningOverlay', 2000);
    return false;
  }
}

export async function parseUalError({}, error){
  let cause = 'unknown cause';
  let error_code ='';
  if(error.cause){
    cause = error.cause.reason || error.cause.message || 'Report this error to the eosdac devs to enhance the UX';
    error_code = error.cause.code || error.cause.errorCode;
  }
  return `${error}. ${cause} ${error_code}`;
}

export async function hideSigningOverlay({ commit }, ms=10000) {
  setTimeout(()=>{
    commit('setSigningOverlay', { show: false});
  }, ms)
  
}
