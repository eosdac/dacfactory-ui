export async function login({ state, commit, dispatch }) {
  commit("setShow", true);
}

export async function logout({ state, commit, dispatch }) {
  await state.authenticator.logout();
  commit("setLoggedIn", false);
}

export async function transact({ state, commit, getters }, payload) {
  let user = state.authenticator.users[0];
  //add authorization to actions if not supplied
  payload.actions.forEach(a => {
    if (!a.authorization) {
      a.authorization = [{ actor: user.accountName, permission: "active" }];
    }
    // return a;
  });
  console.log(JSON.stringify(payload.actions, null, 2) );
  //sign
  try{
  let res = await user.signTransaction(
    { actions: payload.actions },
    { broadcast: true }
  );
  console.log(res);
  return res;
  }catch(e){
    console.log(e, e.cause)
  }
}
