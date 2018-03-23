<template>
  <Card>
       <p slot="title">
          <Icon type="compose"></Icon>婴泳订单详情
        </p>
        <Row>
             <Col span="12">
                   <div style="background:#eee;padding: 20px;height:560px;">
                       <Card>
                            <Form ref="formCustom" :model="formCustom" :label-width="130">
                                <FormItem label="专家名称:" prop="SpecialName">
                                    <label type="text" style="width: 400px" >{{formCustom.Order.SpecialName}}</label>
                                </FormItem>
                                <FormItem label="订单创建时间:" prop="CreateDate">
                                    <label type="text" style="width: 400px" >{{formCustom.Order.CreateDate | formatDate}}</label>
                                </FormItem>
                                <FormItem label="下单用户名:" prop="UserName">
                                    <label type="text" style="width: 400px" >{{formCustom.Order.UserName}}</label>
                                </FormItem>
                                <FormItem label="下单用户手机号码:" prop="UserCellPhone">
                                    <label type="text" style="width: 400px" >{{formCustom.Order.UserCellPhone}}</label>
                                </FormItem>
                                 <FormItem label="联系人:" prop="ContactName">
                                    <label type="text" style="width: 400px" >{{formCustom.Order.ContactName}}</label>
                                </FormItem>
                                  <FormItem label="联系人电话:" prop="ContactName">
                                    <label type="text" style="width: 400px" >{{formCustom.Order.ContactMobile}}</label>
                                </FormItem>
                                <FormItem label="服务对象:" prop="ContactName">
                                    <label type="text" style="width: 400px" >{{formCustom.Order.ServiceName}}</label>
                                </FormItem>
                                  <FormItem label="服务对象性别/年龄:" prop="ContactName">
                                    <label type="text" style="width: 400px" >{{formCustom.Order.ServiceSex}}|{{formCustom.Order.ServiceAge}}</label>
                                </FormItem>
                                <FormItem label="服务时间:" prop="PayPrice">
                                    <label type="text" style="width: 400px" >{{formCustom.Order.ServiceDay}}</label>
                                </FormItem>
                            </Form>
                         </Card>
                       </div>
                </Col>
                <Col span="12">
                    <div style="background:#eee;padding: 20px;height:560px">
                        <Card>
                      <Form ref="formCustom" :model="formCustom" :label-width="130">
                         <FormItem label="预约状态:" prop="StatusName">
                            <label type="text" style="width: 400px" >{{formCustom.StatusName}}</label>
                        </FormItem>
                          <FormItem label="门店名称:" prop="UserName">
                            <label type="text" style="width: 400px" >{{formCustom.Order.StoreName}}</label>
                        </FormItem>
                        <FormItem label="订单金额:" prop="PayPrice">
                            <label type="text" style="width: 400px" >{{formCustom.Order.OrderPrice}} (元)</label>
                        </FormItem>
                        <FormItem label="实付订单金额:" prop="PayPrice">
                            <label type="text" style="width: 400px" >{{formCustom.Order.PayPrice}} (元)</label>
                        </FormItem>
                          <FormItem label="优惠劵抵扣金额:" prop="PayPrice">
                            <label type="text" style="width: 400px" >{{formCustom.Order.DiscountPrice}} (元)</label>
                        </FormItem>
                          <FormItem label="会员卡优惠金额:" prop="PayPrice">
                            <label type="text" style="width: 400px" >{{formCustom.Order.CardDiscount}}  (元)</label>
                        </FormItem>
                           <FormItem label="会员卡抵扣金额:" prop="PayPrice">
                            <label type="text" style="width: 400px" >{{formCustom.Order.CardPrice}} (元)</label>
                        </FormItem>
                        <FormItem label="婴泳项目:" prop="BabyStrokeName">
                            <label type="text" style="width: 400px" >{{formCustom.Order.BabyStrokeName}}</label>
                        </FormItem>
                         <FormItem label="" prop="">
                            <label type="text" style="width: 400px;margin: 0 0px;"  >
                                  <div v-if="formCustom.OrderStatus==0" >
                                       <!--  <Button type="primary"    :loading="loading">取消预约</Button> -->
                                    </div>
                            </label>
                        </FormItem>
                    </Form>  
                    </Card></div>
                </Col>
        </Row>

    </Card>
</template>

<script>
import PhUpload from "../main-components/phupload.vue";
import Util from "../../libs/util.js";
import { validateNum, validateRequired } from "../../libs/validate.js";

export default {
  name: "babyorder_detail",
  components: {
    PhUpload
  },
  data() {
    return {
      showInfo: false,
      loading: false,
      formCustom: {
        Id: this.$route.params.id,
        StatusName: "",
        PayStatus: 0,
        OrderStatus: 0,
        OrderType: 0,
        Special: {
          StoreId: 2,
          StoreName: "",
          Telephone: "",
          Address: "",
          Id: 2,
          Stars: 0,
          Sort: 0,
          Name: "",
          Job: "",
          Profile: "",
          Introduction: "",
          Price: 150,
          PriceRemark: null,
          Avatar: "",
          Status: 0,
          StartDate: null,
          EndDate: null,
          TheirStores: null,
          PayMethod: 0
        },
        Order: {
          Id: this.$route.params.id,
          SpecialId: 2,
          SpecialName: "",
          CreateDate: "",
          UserNick: "",
          UserName: "",
          UserCellPhone: "",
          UserId: 0,
          StoreId: 0,
          StoreName: "",
          Address: "",
          OrderId: 0,
          OrderStatus: 1,
          CardPrice: 5,
          CardDiscount: 1.2,
          OrderPrice: 0,
          DiscountPrice: 0,
          PayDate: null,
          PayTypeName: null,
          PaymentTypeGateway: null,
          PayGatewayOrderId: null,
          PayPrice: 3.8,
          FinishDate: null,
          OrderDate: "",
          ContactId: 0,
          ContactMobile: "",
          ContactName: "",
          ServiceId: 20,
          ServiceName: "",
          ServiceSex: "",
          ServiceAge: "",
          Remark: "",
          OperName: null,
          RefundPrice: 0,
          ServiceDay: "",
          BabyStrokeName: ""
        }
      },
      geturl: "admin/Store/Order/Detail"
    };
  },
  methods: {
    init() {
      let vm = this;
      //load message
      if (this.formCustom.Id && this.formCustom.Id != 0) {
        Util.post(this.geturl, { Id: this.formCustom.Id }, vm, function(
          res,
          data
        ) {
          if (res === "1") {
            vm.formCustom = data.data;
          } else {
            this.$Message.error("获取订单信息出错了");
          }
        });
      }
    },
    CancelOrder() {
      let vm = this;
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
    }
  }
};
</script>
