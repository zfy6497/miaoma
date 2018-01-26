<template>
    <div style="background:#eee;padding: 20px;padding-right:200px;">
        <Card :bordered="false" span="11">
            <p slot="title">商品详情</p>
          <Table :columns="columns" :data="result.Items" ></Table>
           <h5  style=""><font>商品总价：￥ {{result.ProductTotalAmount}};  </font><font> 运费：￥{{result.Freight}} ;  </font> 会员卡抵扣金额:￥{{result.CardPayMoney}} ;<font>优惠券抵扣金额:￥{{result.DiscountAmount}} ;</font><font>实付金额：￥{{result.OrderAmountRedundancy}};</font></h5>
        </Card>

         <Row  style="margin-top: 20px;">
             <Col span="11">
                  <Card  >
            <p slot="title">订单详情</p>
            <Form  label-position="left" :label-width="100"   >
        <FormItem label="订单号" style="margin-bottom:2px;">
            <span>{{result.Id}}</span>
        </FormItem>
         <FormItem label="创建时间" style="margin-bottom:2px;">
            <span>{{result.OrderDate | formatDate}}</span>
        </FormItem>
         <FormItem label="订单状态" style="margin-bottom:2px;">
            <span>{{result.OrderStatusStr}}</span>
        </FormItem>
         <FormItem label="下单会员" style="margin-bottom:2px;">
            <span>{{result.UserName}}</span>
        </FormItem>
        
         <FormItem label="买家备注" style="margin-bottom:2px;">
            <span>{{result.UserRemark}}</span>
        </FormItem>
         </Form>
        </Card >
       </Col>
        <Col span="13" style="padding-left: 50px;">
         <Card >
            <p slot="title">收货详情</p>
            <Form  label-position="left" :label-width="100"   >
      
          <FormItem label="收 货 人" style="margin-bottom:2px;">
            <span>{{result.ShipTo}}</span>
        </FormItem>
         <FormItem label="地 址" style="margin-bottom:2px;">
            <span>{{result.RegionFullName+result.Address}}</span>
        </FormItem>
          <FormItem label="手机号码" style="margin-bottom:2px;">
            <span>{{result.CellPhone}}</span>
        </FormItem>
        <template v-if="result.ExpressCompanyName">
             <FormItem label="快递公司" style="margin-bottom:2px;">
            <span>{{result.ExpressCompanyName}}</span>
        </FormItem>
         <FormItem label="发货单" style="margin-bottom:2px;">
            <span>{{result.ShipOrderNumber}}</span>
        </FormItem>
        </template>
        
         </Form>
        </Card >
             </Col>
         </Row>

        
          <Card :bordered="false"  style="margin-top: 20px;">
            <p slot="title">操作记录</p>
          <Table :columns="columns1" :data="result.Operations" ></Table>
        </Card>
    </div>
</template>
<script>
import Util from "../../libs/util.js";
export default {
  name: "orderdetail",
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
      Util.post("admin/Orders/GetModel", { Id: this.id }, vm, function(
        res,
        data
      ) {
        if (res === "1") {
          vm.columns = data.columns;
          vm.columns1 = data.columns1;
          vm.result = data.data;
        } else {
          vm.$Message.error("订单信息有误");
        }
      });
    }
  },
  mounted() {
    this.init();
  },
   watch: {
    // 如果路由有变化，会再次执行该方法
      '$route': function(){
          
      }
    }
};
</script>
