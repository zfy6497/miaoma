<template>
    <div style="background:#eee;padding: 20px;padding-right:200px;">
        <Card :bordered="false" span="11">
            <p slot="title">退款商品</p>
          <Table :columns="columns" :data="result.Items" ></Table>
        </Card>

         <Row  style="margin-top: 20px;">
             <Col span="11">
                  <Card  >
            <p slot="title">申请信息</p>
            <Form  label-position="left" :label-width="100"   >
        <FormItem label="订单号" style="margin-bottom:2px;">
            <span>{{result.OrderId}}</span>
        </FormItem>
         <FormItem label="申请时间" style="margin-bottom:2px;">
            <span>{{result.ApplyDate | formatDate}}</span>
        </FormItem>
         <FormItem label="状态" style="margin-bottom:2px;">
            <span>{{result.StatusStr}}</span>
        </FormItem>
          <FormItem label="退款模式" style="margin-bottom:2px;">
            <span>{{result.RefundModeStr}}</span>
        </FormItem>
         <FormItem label="退款原因" style="margin-bottom:2px;">
            <span>{{result.Reason}}</span>
        </FormItem>
        
         <FormItem label="备注" style="margin-bottom:2px;">
            <span>{{result.Applicant}}</span>
        </FormItem>
                  <FormItem label="退款数量" style="margin-bottom:2px;">
            <span>{{result.RefundNum}}</span>
        </FormItem>
         <FormItem label="可退金额" style="margin-bottom:2px;">
            <span>{{result.RefundMoney}}</span>
        </FormItem>
         </Form>
        </Card >
       </Col>
        <Col span="13" style="padding-left: 50px;">
         <Card >
            <p slot="title">审核信息</p>
            <Form  label-position="left" :label-width="100"   >
      

          <FormItem label="审核时间" style="margin-bottom:2px;"  v-if="result.Status>1" >
            <span>{{result.SellerAuditDate}}</span>
        </FormItem>
          <FormItem label="拒绝理由" v-if="result.SellerRemark"  style="margin-bottom:2px;">
            <span>{{result.SellerRemark}}</span>
        </FormItem>
        <template v-if="result.ExpressCompanyName">
           
         <FormItem label="买家发货时间" style="margin-bottom:2px;">
            <span>{{result.BuyerDeliverDate}}</span>
        </FormItem>
           <FormItem label="快递公司" style="margin-bottom:2px;">
            <span>{{result.ExpressCompanyName}}</span>
        </FormItem>
           <FormItem label="快递单号" style="margin-bottom:2px;">
            <span>{{result.ShipOrderNumber}}</span>
        </FormItem>
        </template>
           <FormItem v-if="result.Status>=5" label="确认收货时间" style="margin-bottom:2px;">
            <span>{{result.SellerConfirmArrivalDate}}</span>
        </FormItem>
          <FormItem label="打款时间"  v-if="result.Status==7"  style="margin-bottom:2px;">
            <span>{{result.ManagerConfirmDate}}</span>
        </FormItem>
         </Form>
        </Card >
             </Col>
         </Row>
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
      Util.post("admin/OrderRefunds/GetModel", { Id: this.id }, vm, function(
        res,
        data
      ) {
        if (res === "1") {
          vm.columns = data.columns;
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
    $route: function() {}
  }
};
</script>
