export function getActiveStep(state) {
  return state.stepsData.activeStep;
}

export function getStepsData(state) {
  return state.stepsData;
}

export function getTokenSymbol(state) {
  return state.stepsData[1].tokenSymbol;
}
