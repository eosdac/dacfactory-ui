import { factoryInitialState } from "store/factory/state";

import { ERROR_MARK } from "components/constants";

export function setActiveStep(state, payload) {
  payload = payload < 0 ? 0 : payload;
  state.stepsData.activeStep = payload;
}

export function setStepsData(state, payload) {
  const { step, key, data } = payload;
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

export function setDacId(state, payload) {
  state.stepsData.dacId = payload;
}

export function setCustomDacData(state, payload) {
  state.customDacData = payload;
}

export function setReferrer(state, payload) {
  if (/^[a-z1-5]{1,12}$/.exec(payload)){
    state.referrer = payload;
  }
}
