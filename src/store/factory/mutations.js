export function setActiveStep (state, payload) {
    payload = payload < 0 ? 0 : payload;
    state.activeStep = payload;
}
