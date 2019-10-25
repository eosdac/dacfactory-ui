export const THRESHOLD_HIGH = 'THRESHOLD_HIGH';
export const THRESHOLD_MIDDLE = 'THRESHOLD_MIDDLE';
export const THRESHOLD_LOW = 'THRESHOLD_LOW';
export function processThresholdFromNE(numberElected, type) {
  switch (type) {
    case THRESHOLD_HIGH:
      return Math.floor(numberElected * 0.9) || 1;
    case THRESHOLD_MIDDLE:
      return Math.floor(numberElected * 0.75) || 1;
    case THRESHOLD_LOW:
      return Math.ceil(numberElected * 0.5) || 1;
    default:
  }
}
