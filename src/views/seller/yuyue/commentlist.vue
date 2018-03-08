<style lang="less">
@import "./form.less";
</style>
<template>
    <list :show-search="true" :show-date="false" :show-key-word="true" :show-add-button="false" :show-page="true"  :delete-url="deleteUrl"  :get-url="getUrl"  :other-query="otherQuery">
    </list>
</template>

<script>
import list from "../../main-components/list.vue";
import { validateNum, validateRequired } from "../../../libs/validate.js";
export default {
  name: "seller-comment-table",
  components: {
    list
  },
  props: {
  },
  data() {
    return {
      deleteUrl: "",
      getUrl: "api/StoreApi/GetSpecialCommentList",
      otherQuery: {
      }
    };
  },
  methods: {
  },
  created() {},
  mounted() {}
};
</script> 