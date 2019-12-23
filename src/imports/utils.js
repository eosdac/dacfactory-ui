import { CONSTITUTION_TEXT, ERROR_MARK } from "components/constants";

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

export function createColorsScheme(scheme) {
  const currentColorsScheme = {};
  for (let i = 0; i < scheme.length; i++) {
    currentColorsScheme.$warning = `#${scheme[0]}`;
    currentColorsScheme.primary = `#${scheme[1]}`;
    currentColorsScheme.bg1 = `#${scheme[2]}`;
    currentColorsScheme.bg2 = `#${scheme[3]}`;
    currentColorsScheme.text1 = `#${scheme[4]}`;
    currentColorsScheme.text2 = `#${scheme[5]}`;
    currentColorsScheme.info = `#${scheme[6]}`;
    currentColorsScheme.positive = `#${scheme[7]}`;
    currentColorsScheme.negative = `#${scheme[8]}`;
    currentColorsScheme.dark = `#${scheme[9]}`;
  }
  return currentColorsScheme;
}

export function findStepErrors(stepData, isCheckEmpty) {
  let error = null;
  let firstEmptyField = null;
  const stepKeys = Object.keys(stepData);
  for (let i = 0; i < stepKeys.length; i++) {
    const stepKey = stepKeys[i];
    const dataByKey = stepData[stepKey];
    if (isCheckEmpty && !firstEmptyField && !stepKey.endsWith(ERROR_MARK) && !dataByKey) {
      firstEmptyField = stepKey;
    }
    if (stepKey.endsWith(ERROR_MARK) && dataByKey) {
      error = stepKey.replace(ERROR_MARK, "");
      break;
    }
  }
  return error ? error : firstEmptyField;
}

export async function encodeInSHA1() {
  const msgUint8 = new TextEncoder().encode(CONSTITUTION_TEXT);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}
