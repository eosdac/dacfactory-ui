export default {

  activeStep: 0,
  stepsConfig:{
    1 :{
      title: "DAC Profile"
    },
    2 :{
      title: "Treasury & Authority accounts"
    },
    3 :{
      title: "Tokenomics"
    },

    4 :{
      title: "Custodian Configuration"
    },
    5 :{
      title: "Pay & Create DAC"
    }
  },
  stepsData:{
    1:{
      dacName: '',
      dacDescription: '',
      dacId: '',
      tokenSymbol: '',
      websiteUrl:''
    },
    2:{
      treasuryAccount: '',
      authorityAccount: ''
    },
    3:{
      maxSupply: '',
      decimals: '4',
      issuance: '',
    },

    4:{
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
