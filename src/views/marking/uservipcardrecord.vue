<template>
    <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="true" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-width="600" @set-form="setForm" :other-query="otherQuery"  >
    </list>
</template>

<script>
import list from "../main-components/list.vue";
import {validateNum,validateRequired} from '../../libs/validate.js';
export default {
  name: "page1-table",
  components: {
    list
  },
  data() {
    return {
      updateUrl: "admin/Uservipcardrecord/Save",
      deleteUrl: "admin/Uservipcardrecord/Delete",
      addUrl: "admin/Uservipcardrecord/Save",
      getUrl: "admin/Uservipcardrecord/GetList",
      formCustom:{},
      ruleCustom:{},
      otherQuery:{
            Type:this.$route.params.id
      }
    };
  },
  computed:{
     
  },
  watch: {
    
  }
  ,
  methods: {
    getresult(data) {
    
    },
    setForm(data) {
     
    }
  },
  created() {}
};
</script>