export function getActiveStep(state) {
  return state.activeStep;
}

export function getStepsData(state) {
  return state.stepsData;
}

export function getTokenSymbol(state) {
  return state.stepsData[1].tokenSymbol;
}
