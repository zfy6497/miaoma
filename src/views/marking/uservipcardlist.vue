<template>
    <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="false" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-width="400" @set-form="setForm" :other-query="otherQuery"  >
      <template slot="fromtop">
          <div class="ivu-modal-header"><div class="ivu-modal-header-inner">增加金额</div></div>
        </template>
        <template slot="frommodel">
            <FormItem label="金额" prop="UpdateMoney" >
                    <Input type="text" style="width: 200px" v-model="formCustom.UpdateMoney" />
            </FormItem>  
          <FormItem label="备注" prop="Remarks" >
                    <Input type="text" style="width: 200px" v-model="formCustom.Remarks" />
            </FormItem>         
        </template>

    </list>
</template>

<script>
import list from "../main-components/list.vue";
import { validateNum, validateRequired } from "../../libs/validate.js";
export default {
  name: "page1-table",
  components: {
    list
  },
  data() {
    return {
      updateUrl: "admin/Uservipcard/Save",
      deleteUrl: "admin/Uservipcard/Delete",
      addUrl: "admin/Uservipcard/Save",
      getUrl: "admin/Uservipcard/GetList",
      formCustom: { Id: 0, UpdateMoney: 0, Remarks: "" },
      ruleCustom: {},
      otherQuery: {}
    };
  },
  computed: {},
  watch: {},
  methods: {
    getresult(data) {},
    setForm(data) {
      if (data) {
        for (let key in this.formCustom) {
          this.formCustom[key] = data[key];
        }
        this.showFormCustom = data;
      } else {
        this.showFormCustom = [];
        for (let key in this.formCustom) {
          if (key === "Id") {
            this.formCustom[key] = 0;
          } else {
            this.formCustom[key] = "";
          }
        }
      }
    }
  },
  created() {}
};
</script>