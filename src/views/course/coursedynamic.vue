<template>
    <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="true" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" modal-Width="500" @set-form="setForm">
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
      updateUrl: "admin/Coursedynamics/Save",
      deleteUrl: "admin/Coursedynamics/Delete",
      addUrl: "admin/Coursedynamics/Save",
      getUrl: "admin/Coursedynamics/GetList",
      formCustom: {
        Id: 0,
        Name: "",
        Price: 0
      },
      ruleCustom: {
        Name: [{ validator: validateRequired, trigger: "blur" }]
      },
      modalWidth: 500,
      Depth:7
    };
  },
  methods: {
    getresult(data) {
      
    },
    setForm(data) {
      if (data) {
        for (let key in this.formCustom) {
          
          this.formCustom[key] = data[key];
        }
      } else {
        for (let key in this.formCustom) {
          if (key === "Id") {
            this.formCustom[key] = 0;
          } else {
            this.formCustom[key] = "";
          }
        }
        this.defaultLogo = [];
      }
    }
  },
  created() {}
};
</script>