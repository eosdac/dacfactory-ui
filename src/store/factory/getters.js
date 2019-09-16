
export function getActiveStep (state) {
    return state.activeStep;
}

export function getStepsConfig (state) {
    return state.stepsConfig;
}

export function getMaxSteps (state) {
    return Object.keys(state.stepsConfig).length
}

export function getStepsData (state) {
    return state.stepsData;
}

export function getTokenSymbol (state) {
    return state.stepsData[2].tokenSymbol;
}

