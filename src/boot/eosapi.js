import { JsonRpc } from "eosjs";

const rpc = new JsonRpc(`${process.env.EOS_API_PROTOCOL}://${process.env.EOS_API_HOST}`);

export default ({ Vue }) => {
  Vue.prototype.$eosapi = rpc;
};
