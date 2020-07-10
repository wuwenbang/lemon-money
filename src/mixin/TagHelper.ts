
import Vue from "vue";
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      alert("标签名不能为空");
    } else if (this.$store.state.tagList) {
      this.$store.commit("createTag", name);
    }
  }
}

export default createTag;