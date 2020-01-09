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

export function createColorScheme(scheme) {
  const currentColorScheme = {
    primary: scheme.primary,
    secondary: scheme.secondary,
  };

  currentColorScheme.warning = '#f2c037';
  currentColorScheme.info = '#31ccec';
  currentColorScheme.positive = '#21ba45';
  currentColorScheme.negative = '#cb2739';
  currentColorScheme.dark = `#1f1f1f`;

  return currentColorScheme;
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
  const crypto = require('crypto');
  return crypto.createHash('sha256')
               .update(CONSTITUTION_TEXT)
               .digest('hex');
}
