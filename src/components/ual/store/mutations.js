export function setShouldRenderLoginModal(state, payload) {
    state.showLoginModal = payload;
}

export function setUAL(state, payload) {
    state.UAL = payload;
}

export function setActiveAuthenticator(state, payload) {
    state.activeAuthenticator = payload;
}

export function setSESSION(state, payload) {
    payload.timestamp = new Date().getTime();
    state.SESSION = Object.assign(state.SESSION, payload);
}

export function setAccountName(state, payload) {
    state.accountName = payload;
}




