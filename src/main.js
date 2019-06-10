// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import stores from './store/store.js'
import App from './App'
import router from './router'
import mixin from './mixin/mixin.js'
import {Layout} from 'vue-ydui/dist/lib.rem/layout';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};
Number.prototype.toFixed = function(s){
    return (Math.round(this * Math.pow( 10, s ) )/ Math.pow( 10, s )).toString();
}
const store = new Vuex.Store(stores)
import 'vue-ydui/dist/ydui.base.css';
Vue.component(Layout.name, Layout)
Vue.config.productionTip = false 
//设置为 false 以阻止 vue 在启动时生成生产提示。
//# sourceMappingURL=auto-size.js.map
/* eslint-disable no-new */
document.title=config.title;

router.afterEach((to, from) => {
	if(document.getElementsByClassName('yd-dialog-white-mask')[0]){
		document.getElementsByClassName('yd-dialog-white-mask')[0].remove()
	}
	Loading.close();
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mixins: [mixin],
})
