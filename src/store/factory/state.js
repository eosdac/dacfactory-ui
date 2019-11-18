export const TOKENS_OPTIONS = ["DAC Token", "System Token"];
export const TIME_PERIOD_OPTIONS = ["Hour(s)", "Day(s)"];

export function factoryInitialState() {
  return {
    activeStep: 0,
    stepsData: {
      1: {
        dacName: "",
        dacDescription: "",
        tokenSymbol: ""
      },
      2: {
        issuance: "1000000",
        decimals: "4"
      },
      3: {
        numberElected: "7",
        maxVotes: "3",
        periodLength: "7",
        periodLengthSelect: TIME_PERIOD_OPTIONS[1]
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
}

export default {
  ...factoryInitialState()
};
