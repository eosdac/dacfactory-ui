export function setActiveStep (state, payload) {
    payload = payload < 0 ? 0 : payload;
    state.activeStep = payload;
}

export function setStepsData (state, payload) {

    state.stepsData[payload.step] = Object.assign(state.stepsData[payload.step], payload.data);
}
