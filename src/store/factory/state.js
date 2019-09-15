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
      treasuryAccount: '',
      authorityAccount: ''
    },
    2:{
      dacName: '',
      dacDescription: '',
      dacId: '',
      tokenSymbol: ''
    },
    3:{
      maxSupply: '',
      decimals: '',
      issuance: '',
    },
    4:{
      url: '',
      logo: '',
      logoSmall: '',
      colorTheme: {},
    },
    5:{
      lockupAsset:'',
      requestPayMax:'',
      lockupReleaseTimeDelay:'',
      periodLength:'',

      numElected:'',
      thresholdHigh:'',
      thresholdMed:'',
      thresholdLow:'',
      maxVotes:'',

      voteQuorumPercent:''

    }
  }
}
