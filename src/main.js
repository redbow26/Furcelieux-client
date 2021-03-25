import Vue from "vue";
import Notifications from "vue-notification";
import VModal from "vue-js-modal";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(VModal);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
