export default {

  activeStep: 0,
  stepsConfig:{
    1 :{
      title: "Treasury & Authority accounts"
    },
    2 :{
      title: "Name & Token"
    },
    3 :{
      title: "Tokenomics"
    },
    4 :{
      title: "DAC Brand & URL"
    },
    5 :{
      title: "Custodian Configuration"
    },
    6 :{
      title: "Pay & Create DAC"
    }
  },
  stepsData:{
    1:{
      treasuryAccount: null,
      authorityAccount: null
    },
    2:{
      dacName: null,
      dacDescription: null,
      dacId: null,
      tokenSymbol: null
    },
    3:{
      maxSupply: null,
      decimals: null,
      issuance: null,
    },
    4:{
      url: null,
      logo: null,
      logoSmall: null,
      colorTheme: {},
    },
    5:{
      lockupAsset:null,
      requestPayMax:null,
      lockupReleaseTimeDelay:null,
      periodLength:null,

      numElected:null,
      thresholdHigh:null,
      thresholdMed:null,
      thresholdLow:null,
      maxVotes:null,

      voteQuorumPercent:null

    }
  }
}
