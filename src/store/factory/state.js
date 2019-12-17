export const TOKENS_OPTIONS = ["DAC Token", "System Token"];
export const TIME_PERIOD_OPTIONS = ["Hour(s)", "Day(s)"];

export function factoryInitialState() {
  return {
    stepsData: {
      activeStep: 0,
      1: {
        dacName: "",
        dacNameError: true,
        tokenSymbol: "",
        tokenSymbolError: true,
        dacDescription: ""
      },
      2: {
        issuance: "1000000",
        issuanceError: false,
        decimals: "4"
      },
      3: {
        numberOfCustodians: "7",
        numberOfCustodiansError: false,
        numberOfVotes: "3",
        numberOfVotesError: false,
        periodLength: "7",
        periodLengthError: false,
        periodLengthSelect: TIME_PERIOD_OPTIONS[1]
      },
      4: {
        websiteUrl: "",
        websiteUrlError: false,
        logoUrl: "",
        logoUrlError: false,
        logoMarkUrl: "",
        logoMarkUrlError: false,
        colorsScheme: "light"
      },
      5: {
        isAgree: false
      }
    },
    customDacData: null
  };
}

export default {
  ...factoryInitialState()
};
