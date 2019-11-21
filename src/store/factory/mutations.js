import { factoryInitialState } from "store/factory/state";

import { ERROR_MARK } from "components/constants";

export function setActiveStep(state, payload) {
  payload = payload < 0 ? 0 : payload;
  state.activeStep = payload;
}

export function setStepsData(state, payload) {
  const { data, key, step } = payload;
  const { value, error } = data;

  const newData = {
    [key]: value
  };
  if (typeof error === "boolean") {
    newData[`${key}${ERROR_MARK}`] = error;
  }
  state.stepsData[step] = Object.assign(state.stepsData[step], newData);
}

export function resetFactoryState(state) {
  const initialedState = { ...factoryInitialState() };
  Object.keys(initialedState).forEach(item => {
    state[item] = initialedState[item];
  });
}
