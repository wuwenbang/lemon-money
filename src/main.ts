import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagModel from '@/models/tagModel.ts';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);
window.tagList = tagModel.fetch()
window.createTag = (name: string | null) => {
  if (name) {
    const message = tagModel.create(name);
    if (message === "duplicated") {
      window.alert("添加失败：标签名重复");
    } else if (message === "success") {
      return;
    }
  }
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
