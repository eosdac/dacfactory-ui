export const TOKENS_OPTIONS = ["DAC Token", "System Token"];
export const TIME_PERIOD_OPTIONS = ["Hour(s)", "Day(s)"];

export function factoryInitialState() {
  return {
    activeStep: 0,
    stepsData: {
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
        websiteURL: "",
        websiteURLError: true,
        logoURL: "",
        logoURLError: true,
        logoMarkURL: "",
        logoMarkURLError: true,
        colorsScheme: "light"
      },
      5: {
        isAgree: false
      }
    }
  };
}

export default {
  ...factoryInitialState()
};
