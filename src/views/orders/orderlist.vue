<template> 
    <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="false" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :default-sidx="'OrderDate'"   modal-Width="500" @set-form="setForm" :routername="'order_detail'">

        <template slot="frommodel">
            <FormItem label="快递公司" prop="ExpressCompanyName">
              <Select v-model="formCustom.ExpressCompanyName" style="width:300px">
                         <Option v-for="item in expressCompanys" :value="item" :key="item">{{item}}</Option>
                    </Select>
            </FormItem>
            <FormItem label="快递单号" prop="ShipOrderNumber">
                
                     <Input type="text" style="width: 300px" v-model="formCustom.ShipOrderNumber"></Input>
            </FormItem>
           
        </template>
    </list>
</template>

<script>
import PhUpload from "../main-components/phupload.vue";
import list from "../main-components/list.vue";
import {validateNum,validateRequired} from '../../libs/validate.js';
export default {
  name: "page1-table",
  components: {
    list,
    PhUpload
  },
  data() {
    return {
      updateUrl: "admin/Orders/Deliver",
      deleteUrl: "admin/Orders/Delete",
      addUrl: "admin/Orders/Deliver",
      getUrl: "admin/Orders/GetList",
      formCustom: {
        Id: 0,
        ExpressCompanyName: "",
        ShipOrderNumber: ""
      },
      ruleCustom: {
        ExpressCompanyName: [{ validator: validateRequired, trigger: "blur" }],
        ShipOrderNumber: [
          { validator: validateRequired, trigger: "blur" }
        ]
      },
      modalWidth: 500,
      defaultLogo: [],
      expressCompanys: this.$store.state.app.expressCompanys,
       otherQuery:{
         name:''
      }
    };
  },
  methods: {
    getresult(data) {},
    setForm(data) {
      if (data) {
        for (let key in this.formCustom) {
          this.formCustom[key] = data[key];
        }
      } else {
      }
    }
  },
  created() {}
};
</script>