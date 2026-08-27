import { r as createServerFn } from "./server-BtAHFl4G.mjs";
import { D as createSsrRpc } from "./router-BoUir8eE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.functions-DQfHp6Jg.js
var placeOrderFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("c4dd963ce52952317a562c0b0824cd9990071cb5bf09b48225eda4e9eb942954"));
var listOrdersFn = createServerFn({ method: "GET" }).handler(createSsrRpc("d1fd1774bba7b45fd70c65cb44fdcd2ce97c39da91933dac30ca2e500074479d"));
var updateOrderStatusFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("71a96c4074bd523f86cbe6469e1783d48dc2ab02b0c2b626fa7b7d311de83fba"));
var myOrdersFn = createServerFn({ method: "GET" }).handler(createSsrRpc("2c3e15de7b9eaed1edb736d0f1f468d6ddfcdd4e83df0fea876a99dfceb82d19"));
var trackOrderFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("200711f07dd2fa7378f66da80e77661509c254688a1f6ab1f59ff6eafbd67e48"));
//#endregion
export { updateOrderStatusFn as a, trackOrderFn as i, myOrdersFn as n, placeOrderFn as r, listOrdersFn as t };
