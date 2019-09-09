<template>
  <div id="q-app">
    <ual :appName= "appName" :chains="chains" :authenticators="authenticators"/>
    <router-view />
  </div>
</template>

<script>
import ual from "components/ual/ual";
import { Scatter } from 'ual-scatter';
import { Ledger } from 'ual-ledger';
import { Lynx } from 'ual-lynx';
import { TokenPocket } from 'ual-token-pocket';
import { EOSIOAuth } from 'ual-eosio-reference-authenticator'


const appName = 'test';
// const chains = [{
//     chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
//     rpcEndpoints: [{
//         protocol: 'https',
//         host: 'api.eostitan.com',
//         port: '443',
//     }]
// }];
const chains = [{
    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
    rpcEndpoints: [{
        protocol: 'https',
        host: 'jungle2.cryptolions.io',
        port: 443,
    }]
}];
export default {
  name: 'App',
  components:{ual},
  data () {
    return {
      appName: appName,
      authenticators:[
        new Scatter(chains, {appName: appName}),
        new Ledger(chains),
        new Lynx(chains, { appName: appName }),
        new TokenPocket(chains),
        new EOSIOAuth(chains, { appName, protocol: 'eosio' })
      ],
      chains: chains
    }
  },
}
</script>

<style>
</style>
