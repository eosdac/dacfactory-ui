export default {
  //
  showLoginModal: false,
  signingOverlay: {
    show: false,
    status: "", //0=wait for sig, 1=success, 2=error
    msg: ""
  },
  activeAuthenticator: null,
  UAL: null,
  accountName: null,
  SESSION: {
    accountName: null,
    authenticatorName: null,
    timestamp: null
  },
  payTokenInfo: null
};
