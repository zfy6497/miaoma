<template>
    <div style="background:#eee;padding: 20px;padding-right:200px;">

  <Card  >
            <p slot="title">优惠劵详情</p>
            <Form  label-position="left" :label-width="100"   >
        <FormItem label="名称" style="margin-bottom:2px;">
            <span>{{result.CouponName}}</span>
        </FormItem>
         <FormItem label="创建时间" style="margin-bottom:2px;">
            <span>{{result.CreateTime | formatDate}}</span>
        </FormItem>
         <FormItem label="价格" style="margin-bottom:2px;">
            <span>{{result.Price}}</span>
        </FormItem>
         <FormItem label="每人可领数量" style="margin-bottom:2px;">
            <span>{{result.PerMax}}</span>
        </FormItem>
         <FormItem label="总数量" style="margin-bottom:2px;">
            <span>{{result.Num}}</span>
        </FormItem>
          <FormItem label="已领取" style="margin-bottom:2px;">
            <span>{{result.ReceivesNum}}</span>
        </FormItem>
         <FormItem label="状态" style="margin-bottom:2px;">
            <span>{{result.StatusStr}}</span>
        </FormItem>
         </Form>
        </Card >

          <Card  style="margin-top: 20px;">
            <p slot="title">领取详情</p>
            <Form  label-position="left" :label-width="100"   >
      
          <FormItem label="满额可用" style="margin-bottom:2px;">
            <span>{{result.OrderAmount}}</span>
        </FormItem>
         <FormItem label="所需积分" style="margin-bottom:2px;">
            <span>{{result.NeedValue}}</span>
        </FormItem>
         <FormItem label="使用期限" style="margin-bottom:2px;">
            <span>{{result.UseDate}}</span>
        </FormItem>
          <FormItem label="领取期限" style="margin-bottom:2px;">
            <span>{{result.GetDate}}</span>
        </FormItem>
        <template >
             <FormItem label="微信端链接" style="margin-bottom:2px;">
            <span>{{result.LinkUrl}}</span>
        </FormItem>
        </template>
        
         </Form>
        </Card >
    </div>
</template>
<script>
import Util from "../../libs/util.js";
export default {
  name: "coupondetail",
  data() {
    return {
      id: this.$route.params.id,
      result: {},
      columns: [],
      columns1: []
    };
  },
  methods: {
    init: function() {
      let vm = this;
      Util.post("admin/Coupon/GetModel", { Id: this.id }, vm, function(
        res,
        data
      ) {
        if (res === "1") {
          vm.columns = data.columns;
          vm.columns1 = data.columns1;
          vm.result = data.data;
        } else {
          vm.$Message.error("优惠劵信息信息有误");
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
