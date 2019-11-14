import { initialState } from "store/factory/state";

export function setActiveStep(state, payload) {
  payload = payload < 0 ? 0 : payload;
  state.activeStep = payload;
}

export function setStepsData(state, payload) {
  const newData = {};
  const { data, key, step } = payload;
  const { value, error } = data;

  if (error && value) {
    return;
  }

  newData[key] = value;
  state.stepsData[step] = Object.assign(state.stepsData[step], newData);
}

export function resetState(state) {
  const initialedState = { ...initialState() };
  Object.keys(initialedState).forEach(item => {
    state[item] = initialedState[item]
  });
}
