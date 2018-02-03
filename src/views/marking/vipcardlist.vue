<template>
    <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="true" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" modal-Width="500" @set-form="setForm">
        <template slot="frommodel">
            <FormItem label="名称" prop="CardName">
                <Input type="text" style="width: 300px" v-model="formCustom.CardName" />
            </FormItem>
             <FormItem label="价格" prop="Price">
                <Input type="text" style="width: 100px" v-model="formCustom.Price" :number="true"><span slot="prepend">￥</span></Input>
            </FormItem>
             <FormItem label="卡类金额" prop="CanUseMoney">
                <Input type="text" style="width: 100px" v-model="formCustom.CanUseMoney" :number="true"><span slot="prepend">￥</span></Input>
            </FormItem>
              <FormItem label="购物折扣" prop="Discount1">
                <Input type="text" style="width: 100px" v-model="formCustom.Discount1" max="10" :number="true" />
            </FormItem>
             <FormItem label="预约折扣" prop="Discount2">
                <Input type="text" style="width: 100px" v-model="formCustom.Discount2" max="10" :number="true" />
            </FormItem>
             <FormItem label="游泳折扣" prop="Discount3">
                <Input type="text" style="width: 100px" v-model="formCustom.Discount3" max="10" :number="true" />
            </FormItem>
              <FormItem label="有效期" prop="ValidityNum">
                <Input type="text" style="width: 100px" v-model="formCustom.ValidityNum" :number="true" />
            </FormItem>
           
            <FormItem label="会员卡等级" prop="Depth">
                <Select v-model="formCustom.Depth" style="width:200px">
                    <Option v-for="item in Depth" :value="item" :key="item">{{ item }}</Option>
                  </Select>
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
      updateUrl: "admin/VipCard/Save",
      deleteUrl: "admin/VipCard/Delete",
      addUrl: "admin/VipCard/Save",
      getUrl: "admin/VipCard/GetList",
      formCustom: {
        Id: 0,
        CardName: "",
        Price: 0,
        CanUseMoney: 0,
        Discount1: 0,
        Discount2: 0,
        Discount3: 0,
        ValidityNum: 0,
        Depth:0
      },
      ruleCustom: {
        CardName: [{ validator: validateRequired, trigger: "blur" }],
        Price: [{ validator: validateNum, trigger: "blur" }],
        CanUseMoney: [{ validator: validateNum, trigger: "blur" }],
        Discount1: [{ validator: validateNum, trigger: "blur" }],
        Discount2: [{ validator: validateNum, trigger: "blur" }],
        Discount3: [{ validator: validateNum, trigger: "blur" }],
        ValidityNum: [{ validator: validateNum, trigger: "blur" }],
        Depth: [{ validator: validateNum, trigger: "blur" }],
      
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