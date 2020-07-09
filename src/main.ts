import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagModel from '@/models/tagModel.ts';
import recordModel from '@/models/recordModel.ts';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

//record store
window.recordList = recordModel.fetch();
window.createRecord = (record) => {
  recordModel.create(record);
}
//tag store
window.tagList = tagModel.fetch()
window.createTag = (name) => {
  if (name) {
    const message = tagModel.create(name);
    if (message === "duplicated") {
      window.alert("添加失败：标签名重复");
    } else if (message === "success") {
      return;
    }
  }
}
window.removeTag = (id) => {
  return tagModel.remove(id);
}
window.updateTag = (id, name) => {
  return tagModel.update(id, name);
}
window.findTag = (id) => {
  return window.tagList.filter(t => t.id === id)[0]
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
