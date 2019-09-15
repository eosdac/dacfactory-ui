export function setActiveStep (state, payload) {
    payload = payload < 0 ? 0 : payload;
    state.activeStep = payload;
}

export function setStepsData (state, payload) {
    //{step:1, key:'authorityAccount', data: $event}
    let error = payload.data.error;
    let value = error ? '' : payload.data.value;
    let data={};
    data[payload.key] = value;

    state.stepsData[payload.step] = Object.assign(state.stepsData[payload.step], data);
}
