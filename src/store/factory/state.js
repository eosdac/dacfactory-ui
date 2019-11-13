export const TOKENS_OPTIONS = ["DAC Token", "System Token"];
export const TIME_PERIOD_OPTIONS = ["Hour(s)", "Day(s)"];

export default {
  activeStep: 1,
  stepsData: {
    1: {
      dacName: "",
      dacDescription: "",
      tokenSymbol: ""
    },
    2: {
      maxSupply: "",
      issuance: "",
      decimals: "4"
    },
    3: {
      lockupAsset: "",
      lockupAssetSelect: TOKENS_OPTIONS[0],
      maxRequestedPay: "",
      maxRPSelect: TOKENS_OPTIONS[0],
      lockup: "",
      lockupSelect: TIME_PERIOD_OPTIONS[0],
      periodLength: "",
      periodLengthSelect: TIME_PERIOD_OPTIONS[0],
      numberElected: "",
      maxVotes: ""
    },
    4: {
      websiteURL: "",
      logoURL: "",
      logoMarkURL: "",
      colorsScheme: "light"
    },
    5: {
      isAgree: false
    }
  }
};
