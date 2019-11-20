export const THRESHOLD_HIGH = "THRESHOLD_HIGH";
export const THRESHOLD_MIDDLE = "THRESHOLD_MIDDLE";
export const THRESHOLD_LOW = "THRESHOLD_LOW";
export function processThresholdFromNoC(numberOfCustodians, type) {
  switch (type) {
    case THRESHOLD_HIGH:
      return Math.floor(numberOfCustodians * 0.9) || 1;
    case THRESHOLD_MIDDLE:
      return Math.floor(numberOfCustodians * 0.75) || 1;
    case THRESHOLD_LOW:
      return Math.ceil(numberOfCustodians * 0.5) || 1;
    default:
  }
}

const lightColorsScheme = [
  "#f2e285",
  "#ba5f34",
  "#1f130d",
  "#574943",
  "#ffffff",
  "#c0c0c0",
  "#4583ba",
  "#21ba45",
  "#db2828",
  "#3d2d27"
];
const darkColorsScheme = [
  "#a2aa85",
  "#ba5f34",
  "#1f130d",
  "#574943",
  "#ffffff",
  "#c0c0c0",
  "#4583ba",
  "#21ba45",
  "#ff2844",
  "#3d2d27"
];
export function createColorsScheme(type) {
  let currentColorsSet;
  switch (type) {
    case "light":
      currentColorsSet = lightColorsScheme;
      break;
    case "dark":
      currentColorsSet = darkColorsScheme;
      break;
    default:
  }

  const currentColorsScheme = {};
  for (let i = 0; i < currentColorsSet.length; i++) {
    currentColorsScheme.$warning = currentColorsSet[0];
    currentColorsScheme.primary = currentColorsSet[1];
    currentColorsScheme.bg1 = currentColorsSet[2];
    currentColorsScheme.bg2 = currentColorsSet[3];
    currentColorsScheme.text1 = currentColorsSet[4];
    currentColorsScheme.text2 = currentColorsSet[5];
    currentColorsScheme.info = currentColorsSet[6];
    currentColorsScheme.positive = currentColorsSet[7];
    currentColorsScheme.negative = currentColorsSet[8];
    currentColorsScheme.dark = currentColorsSet[9];
  }
  return currentColorsScheme;
}

export function findStepErrors(stepData) {
  let error = null;
  const stepKeys = Object.keys(stepData);
  for (let i = 0; i < stepKeys.length; i++) {
    if (stepKeys[i].endsWith('Error') && stepData[stepKeys[i]]) {
      error = stepKeys[i].replace('Error', '');
      break;
    }
  }
  return error
}
