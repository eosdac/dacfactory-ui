export function setActiveStep(state, payload) {
    payload = payload < 0 ? 0 : payload;
    state.activeStep = payload;
}

export function setStepsData(state, payload) {
    const data = {};
    if (payload.data.error) {
      return;
    }
    data[payload.key] = payload.data.value;

    state.stepsData[payload.step] = Object.assign(state.stepsData[payload.step], data);
}
