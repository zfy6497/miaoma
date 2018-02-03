<template>
    <list :show-search="false" :show-date="true" :show-key-word="true" :show-add-button="true" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" modal-Width="500" @set-form="setForm">
        <template slot="frommodel">
            <FormItem label="名称" prop="Name">
                <Input type="text" style="width: 300px" v-model="formCustom.CouponName" />
            </FormItem>
             <FormItem label="金额" prop="Price">
                <Input type="text" style="width: 100px" v-model="formCustom.Price" :number="true"><span slot="prepend">￥</span></Input>
            </FormItem>
              <FormItem label="每人可领数量" prop="PerMax">
                <Input type="text" style="width: 100px" v-model="formCustom.PerMax" :number="true" />
            </FormItem>
              <FormItem label="总数量" prop="Num">
                <Input type="text" style="width: 100px" v-model="formCustom.Num" :number="true" />
            </FormItem>
             <FormItem label="满X可用" prop="OrderAmount">
                <Input type="text" style="width: 100px" v-model="formCustom.OrderAmount" :number="true" />
            </FormItem>
            <FormItem  label="使用开始时间" prop="StartTime">
                  <DatePicker type="date" v-model="formCustom.StartTime" placeholder="Select date" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="优惠劵类型" prop="Type">
                <Select v-model="formCustom.type" style="width:200px">
                    <Option v-for="item in TypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
      updateUrl: "admin/Coupon/Save",
      deleteUrl: "admin/Coupon/Delete",
      addUrl: "admin/Coupon/Save",
      getUrl: "admin/Coupon/GetList",
      formCustom: {
        Id: 0,
        CouponName: "",
        Price: 0,
        PerMax: 0,
        Num: 0,
        OrderAmount: 0,
        StartTime: 0,
        Type:0
      },
      ruleCustom: {
        CouponName: [{ validator: validateRequired, trigger: "blur" }],
        Price: [{ validator: validateNum, trigger: "blur" }],
        PerMax: [{ validator: validateNum, trigger: "blur" }],
        Num: [{ validator: validateNum, trigger: "blur" }],
        OrderAmount: [{ validator: validateNum, trigger: "blur" }],
        StartTime: [{ validator: validateRequired, trigger: "blur" }],
        Type: [{ validator: validateRequired, trigger: "blur" }],
      },
      modalWidth: 500,
      defaultLogo: [],
      TypeList:[{name:'商城购物',id:1},{name:'预约挂号',id:2},{name:'游泳',id:3}]
    };
  },
  methods: {
    getresult(data) {
      if (data.length > 0) {
        this.formCustom.Logo = data[0].url;
      }
    },
    setForm(data) {
      if (data) {
        for (let key in this.formCustom) {
          if (key === "Logo") {
            var item = [{ name: "", url: data[key], status: "finished" }];
            this.defaultLogo = item;
          }
          this.formCustom[key] = data[key];
        }
      } else {
        for (let key in this.formCustom) {
          if (key === "IsRecommend") {
            this.formCustom[key] = false;
          } else if (key === "Id") {
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