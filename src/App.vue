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
import { Wax } from 'ual-wax';
import { TokenPocket } from 'ual-token-pocket';
import { Anchor } from 'ual-anchor';
// import { EOSIOAuth } from 'ual-eosio-reference-authenticator'

const appName = process.env.APP_NAME;
const chains = [{
    chainId: process.env.EOS_CHAIN_ID,
    rpcEndpoints: [{
        protocol: process.env.EOS_API_PROTOCOL,
        host: process.env.EOS_API_HOST,
        port: process.env.EOS_API_PORT,
    }]
}];

const authenticators = [
  new Scatter(chains, {appName: appName}),
  new Ledger(chains),
  new Lynx(chains, { appName: appName }),
  new TokenPocket(chains),
  new Anchor(chains, { appName: appName })/*,
  new Wax(chains, { appName: appName }),
        new EOSIOAuth(chains, { appName, protocol: 'eosio' })*/
]

export default {
  name: 'App',
  components:{ual},
  data () {
    return {
      appName: appName,
      authenticators,
      chains: chains
    }
  }
}
</script>

<style>
  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
    appearance: none;
  }
</style>

