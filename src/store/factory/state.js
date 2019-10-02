export default {
  activeStep: 0,
  stepsConfig:{
    1 :{
      title: "DAC Profile"
    },
    2 :{
      title: "Tokenomics"
    },
    3 :{
      title: "Custodian Configuration"
    },
    4 :{
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
      maxSupply: '',
      decimals: '4',
      issuance: '',
    },
    3:{
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
