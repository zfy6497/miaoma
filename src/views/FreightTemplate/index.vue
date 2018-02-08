<template>
    <list :show-search="false" :show-date="false" :show-key-word="true" :show-add-button="false" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-width="600" @set-form="setForm" :other-query="otherQuery"  :routername="'freight_detail'">
       <template slot="rightbtn">
            <span @click="addgolink"  style=""><Button type="primary"  icon="add">新增</Button></span>
        </template>
    </list>
    
</template>

<script>
import list from "../main-components/list.vue";
export default {
  name: "page1-table",
  components: {
    list
  },
  data() {
    return {
      updateUrl: "admin/Freighttemplate/Save",
      deleteUrl: "admin/Freighttemplate/Delete",
      addUrl: "admin/Freighttemplate/Save",
      getUrl: "admin/Freighttemplate/GetList",
      formCustom:{},
      ruleCustom:{},
      otherQuery:{
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
     
    },addgolink(){
          this.$router.push({ name: 'freight_detail', params: { id: 0 } })
      }
  },
  created() {}
};
</script>