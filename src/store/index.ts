import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
  },
  mutations: {
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.time = new Date();
      state.recordList && state.recordList.push(record2);
      store.commit('saveRecords');
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
      return state.recordList;
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      return state.tagList;
    },
    findTag(state, id: string) {
      return state.tagList.filter(t => t.id === id)[0];
    },
    createTag(state, name: string | null) {
      if (name === null) return 'fail'
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了');
        return 'duplicated';
      } else {
        const id = createId().toString();
        state.tagList.push({ id, name: name });
        store.commit("saveTags");
        return 'success';
      }

    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit("saveTags");
      return true;
    },
    // updateTag(state, id: string, name: string) {
    //   const idList = state.tagList.map(item => item.id);
    //   if (idList.indexOf(id) >= 0) {
    //     const names = state.tagList.map(item => item.name);
    //     if (names.indexOf(name) >= 0) {
    //       return 'duplicated';
    //     } else {
    //       const tag = state.tagList.filter(item => item.id === id)[0];
    //       tag.name = name;
    //       store.commit("saveTags");
    //       return 'success';
    //     }
    //   } else {
    //     return 'not found';
    //   }
    // },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    }
  }
})
export default store;