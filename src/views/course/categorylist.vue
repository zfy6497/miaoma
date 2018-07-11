<template>
    <list :show-search="true" :show-date="false" :show-key-word="true" :show-add-button="true" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" modal-Width="500" @set-form="setForm">
        <template slot="frommodel">
            <FormItem label="名称" prop="Name">
                <Input type="text" style="width: 300px" v-model="formCustom.Name" />
            </FormItem>
        </template>
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
      updateUrl: "admin/Coursecategory/Save",
      deleteUrl: "admin/Coursecategory/Delete",
      addUrl: "admin/Coursecategory/Save",
      getUrl: "admin/Coursecategory/GetList",
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