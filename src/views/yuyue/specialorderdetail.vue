<template>
  <Card>
       <p slot="title">
          <Icon type="compose"></Icon>预约订单详情
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
                        <FormItem label="推拿订单金额:" prop="PayPrice">
                            <label type="text" style="width: 400px" >{{formCustom.Order.OrderPrice}} (元)</label>
                        </FormItem>
                        <FormItem label="预付订单金额:" prop="PayPrice">
                            <label type="text" style="width: 400px" >{{formCustom.Order.PrepaidPrice}} (元)</label>
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
                         <FormItem label="" prop="">
                            <label type="text" style="width: 400px;margin: 0 0px;"  >
                                  <div v-if="formCustom.PayStatus==-1 && formCustom.OrderStatus==0" >
                                        <!-- <Button type="primary"   @click="CancelOrder" :loading="loading">取消预约</Button> -->
                                    </div>
                            </label>
                        </FormItem>
                    </Form>  
                    </Card></div>
                </Col>
        </Row>

        <Row v-if="formCustom.PayStatus!=-1" >
             <Col span="12">
                   <div style="background:#eee;padding: 20px">
                       
                       <Card>
                            <p slot="title"> <Icon type="arrow-right-b"></Icon>&nbsp;&nbsp;基本信息</p>
                            <Scroll style="height:300px"><Form ref="formCustom" :model="formCustom" :label-width="130">
                                <FormItem label="出生日期:" prop="Brith">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.Brith | formatDate}}</label>
                                </FormItem>
                                <FormItem label="出生孕周:" prop="PregnantWeek">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.PregnantWeek}}</label>
                                </FormItem>
                                <FormItem label="妊娠期患病:" prop="PregnancyIllness">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.PregnancyIllness}}</label>
                                </FormItem>
                                <FormItem label="出生情况:" prop="BornSituation">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.BornSituation}}</label>
                                </FormItem>
                                  <FormItem label="出生体重:" prop="BornWeight">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.BornWeight}}</label>
                                </FormItem>
                                  <FormItem label="出生身长:" prop="BornHeight">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.BornHeight}}</label>
                                </FormItem>
                                <FormItem label="目前体重:" prop="CurrWeight">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.CurrWeight}}</label>
                                </FormItem>
                                <FormItem label="目前身高:" prop="CurrHeight">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.CurrHeight}}</label>
                                </FormItem>
                                 <FormItem label="断奶前喂乳:" prop="BeWeaning">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.BeWeaning}}</label>
                                </FormItem>
                                <FormItem label="加辅食月龄:" prop="SideDishMonbtn">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.SideDishMonbtn}}</label>
                                </FormItem>
                                 <FormItem label="添加食物:" prop="AddFood">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.AddFood}}</label>
                                </FormItem>
                                  <FormItem label="添加后情况:" prop="AddAfter">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.AddAfter}}</label>
                                </FormItem>
                                 <FormItem label="过敏史:" prop="Allergy">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.Allergy}}</label>
                                </FormItem>
                                <FormItem label="长期用药:" prop="Allergy">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.LongMedication}}</label>
                                </FormItem>
                            </Form>  </Scroll>
                         </Card>
                       </div>
                </Col>
                <Col span="12">
                    <div style="background:#eee;padding: 20px">
                        <Card>
                             <p slot="title"> <Icon type="arrow-right-b"></Icon>&nbsp;&nbsp;就诊信息</p>
                                <Scroll style="height:300px"><Form ref="formCustom" :model="formCustom" :label-width="130">
                                    <FormItem label="主诊:" prop="Symptoms">
                                        <label type="text" style="width: 400px" >{{formCustom.Serivce.Symptoms}}</label>
                                    </FormItem>
                                    <FormItem label="既往病史:" prop="BeDisease">
                                        <label type="text" style="width: 400px" >{{formCustom.Serivce.BeDisease}}</label>
                                    </FormItem>
                                    <FormItem label="现病史:" prop="NowDisease">
                                        <label type="text" style="width: 400px" >{{formCustom.Serivce.NowDisease}}</label>
                                    </FormItem>
                                    </Form> 
                                     <Card> 
                                            <p slot="title"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;望诊</p>
                                            <Form ref="formCustom" :model="formCustom" :label-width="130">
                                                <FormItem label="面色:" >
                                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.Face}}</label>
                                                </FormItem>
                                                <FormItem label="面色图片:">
                                                    <img style="height:100px;"  :src='formCustom.Serivce.FaceImg' />
                                                </FormItem>
                                                <FormItem label="舌体:" >
                                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.TongueBody}}</label>
                                                </FormItem>
                                                <FormItem label="舌质:" >
                                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.TongueMass}}</label>
                                                </FormItem>
                                                <FormItem label="舌苔:" >
                                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.TongueMoss}}</label>
                                                </FormItem>
                                                 <FormItem label="舌象图片:" >
                                                       <img style="height:100px;" :src='formCustom.Serivce.TongueImg' />
                                                </FormItem>
                                                 <FormItem label="舌下络脉:" >
                                                      <img style="height:100px;" :src='formCustom.Serivce.TongueUpImg' />
                                                </FormItem>
                                                 <FormItem label="指纹<3:" >
                                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.FingerPrint}}</label>
                                                </FormItem>
                                                 <FormItem label="异常特征:" >
                                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.Abnormal}}</label>
                                                </FormItem>
                                            </Form> 
                                     </Card>
                                </Scroll>
                        </Card>
                    </div>
                </Col>
        </Row>
        <Row v-if="formCustom.PayStatus!=-1" >
             <Col span="12">
                   <div style="background:#eee;padding: 20px">
                       <Card>
                            <p slot="title"> <Icon type="arrow-right-b"></Icon>&nbsp;&nbsp;诊断</p>
                            <Scroll style="height:300px"><Form ref="formCustom" :model="formCustom" :label-width="130">
                                <FormItem label="诊断类型:" v-if="formCustom.Diagnosis.Name !=''">
                                    <label type="text" style="width: 400px" >{{formCustom.Diagnosis.Name}}</label>
                                </FormItem>
                                <FormItem label="系别及类型:" v-if="formCustom.Diagnosis.DepartmentType !=''">
                                    <label type="text" style="width: 400px" >{{formCustom.Diagnosis.DepartmentType}}</label>
                                </FormItem>
                                <FormItem label="病因病机:" v-if="formCustom.Diagnosis.SickReason !=''">
                                    <label type="text" style="width: 400px" >{{formCustom.Diagnosis.SickReason}}</label>
                                </FormItem>
                                  <FormItem v-if="formCustom.Diagnosis.PathogenesisContent !=''" >
                                    <label type="text" style="width: 400px" >{{formCustom.Diagnosis.PathogenesisContent}}</label>
                                </FormItem>
                                <FormItem label="证型:" v-if="formCustom.Diagnosis.CertType !=''" >
                                    <label type="text" style="width: 400px" >{{formCustom.Diagnosis.CertType}}</label>
                                </FormItem>
                                 <FormItem   v-if="formCustom.Diagnosis.CardContent !=''">
                                    <label type="text" style="width: 400px" >{{formCustom.Diagnosis.CardContent}}</label>
                                </FormItem>
                                <FormItem label="诊方类型:" v-if="formCustom.Diagnosis.ClinicalType !=''">
                                    <label type="text" style="width: 400px" >{{formCustom.Diagnosis.ClinicalType}}</label>
                                </FormItem>
                                 <FormItem label="诊断内容:" v-if="formCustom.Diagnosis.ClinicalContent !=''">
                                    <label type="text" style="width: 400px" >{{formCustom.Diagnosis.ClinicalContent}}</label>
                                </FormItem>
                                </Form>   
                            </Scroll>
                         </Card>
                       </div>
                </Col>
                
                 <Col span="12">
                   <div style="background:#eee;padding: 20px">
                       <Card>
                            <p slot="title"> <Icon type="arrow-right-b"></Icon>&nbsp;&nbsp;其他措施</p>
                            <Scroll style="height:300px">
                                <Form ref="formCustom"  v-for="item in formCustom.Measures" :label-width="130">
                                    <FormItem label="措施类型:" v-if="item.Name!=''">
                                        <label type="text" style="width: 400px" >{{item.Name}}</label>
                                    </FormItem>
                                    <FormItem label="方式:" v-if="item.Type!=''" >
                                        <label type="text" style="width: 400px" >{{item.Type}}</label>
                                    </FormItem>
                                     <FormItem label="药浴类型:" v-if="item.MedicatedBathType!=''" >
                                        <label type="text" style="width: 400px" >{{item.MedicatedBathType}}</label>
                                    </FormItem>
                                    <FormItem label="套贴类型:"  v-if="item.SetOfType !=''">
                                        <label type="text" style="width: 400px" >{{item.SetOfType}}</label>
                                    </FormItem>
                                     <FormItem label="措施内容:" v-if="item.Content!=''">
                                        <label type="text" style="width: 400px" >{{item.Content}}</label>
                                    </FormItem>
                                     <FormItem label="其他项：" v-if="item.ChildItems | item.ChildItems.length >0 " >
                                        <label  v-for="child in item.ChildItems"   type="text" style="width: 400px" >
                                            <span>{{child.PartsName}}</span>
                                            &nbsp;&nbsp;  | &nbsp;&nbsp;  
                                            <span>{{child.AcupunctureName}}</span>
                                            </label>
                                    </FormItem>
                                </Form>
                            </Scroll>
                         </Card>
                       </div>
                </Col>
        </Row>
        <Row v-if="formCustom.PayStatus!=-1" >
            <Col span="24">
                    <div style="background:#eee;padding: 20px">
                        <Card>
                             <p slot="title"> <Icon type="arrow-right-b"></Icon>&nbsp;&nbsp;疗程</p>
                                <Form ref="formCustom" :model="formCustom" :label-width="130">
                                    <FormItem label="疗程次数:" prop="Period">
                                        <label type="text" style="width: 400px" >{{formCustom.Serivce.Period}}</label>
                                    </FormItem>
                                </Form>  
                        </Card>
                    </div>
                </Col>
        </Row>
        <Row v-if="formCustom.PayStatus!=-1" >
                <Col span="24">
                    <div style="background:#eee;padding: 20px">
                        <Card>
                             <p slot="title"> <Icon type="arrow-right-b"></Icon>&nbsp;&nbsp;食疗方</p>
                                <Form ref="formCustom" :model="formCustom" :label-width="130">
                                    <FormItem label="说明:" prop="Diet">
                                        <label type="text" style="width: 400px" >{{formCustom.Serivce.Diet}}</label>
                                    </FormItem>
                                </Form>  
                        </Card>
                    </div>
                </Col>
        </Row>
        <Row v-if="formCustom.PayStatus!=-1" >
             <Col span="24">
                   <div style="background:#eee;padding: 20px">
                       <Card>
                            <p slot="title"> <Icon type="arrow-right-b"></Icon>&nbsp;&nbsp;忌口</p>
                            <Form ref="formCustom" :model="formCustom" :label-width="130">
                                <FormItem label="说明:" prop="SpecialName">
                                    <label type="text" style="width: 400px" >{{formCustom.Serivce.Avoid}}</label>
                                </FormItem>
                            </Form>  
                         </Card>
                       </div>
                </Col>
        </Row>
        <Row v-if="formCustom.PayStatus!=-1" >
                <Col span="24">
                    <div style="background:#eee;padding: 20px">
                        <Card>
                             <p slot="title"> <Icon type="arrow-right-b"></Icon>&nbsp;&nbsp;医嘱</p>
                                <Form ref="formCustom" :model="formCustom" :label-width="130">
                                    <FormItem label="预约状态:" prop="StatusName">
                                        <label type="text" style="width: 400px" >{{formCustom.Serivce.Advice}}</label>
                                    </FormItem>
                                </Form>  
                        </Card>
                    </div>
                </Col>
        </Row>
    </Card>
</template>

<script>
import PhUpload from "../main-components/phupload.vue";
import Util from "../../libs/util.js";
import { validateNum, validateRequired } from "../../libs/validate.js";

export default {
  name: "specialorder_detail",
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
        Serivce: {
          Id: 0,
          OrderId: 0,
          UserId: 0,
          SpecialId: 2,
          Brith: "",
          PregnantWeek: "",
          PregnancyIllness: "",
          BornSituation: "",
          BornWeight: "",
          BornHeight: "",
          CurrWeight: "",
          CurrHeight: "",
          BeWeaning: "",
          SideDishMonbtn: "",
          AddFood: "",
          AddAfter: "",
          Allergy: "",
          LongMedication: "",
          Symptoms: "",
          BeDisease: "",
          NowDisease: "",
          TongueBody: "",
          TongueMass: "",
          TongueMoss: "",
          Face: "",
          FaceImg: null,
          TongueImg: null,
          TongueUpImg: null,
          FingerPrint: "",
          Abnormal: "",
          DiagnosisJson: "",
          Period: "",
          MeasuresJson: "",
          Diet: "",
          Avoid: "",
          Advice: "",
          TotalPrice: 100049,
          CardPrice: 0,
          CardDiscount: 0,
          PayPrice: 100045.2,
          PayStatus: 0,
          PayDate: "",
          PayGatewayOrderId: "",
          PaymentTypeGateway: "2",
          PayTypeName: "",
          CreateDate: "",
          Type: 1,
          DiagnosisId: 9,
          MeasuresIds: "",
          FinishDate: ""
        },
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
          PrepaidPrice: 10,
          PayDate: null,
          PayTypeName: null,
          PaymentTypeGateway: null,
          PayGatewayOrderId: null,
          PayPrice: 3.8,
          OffLinePayTypeName: null,
          OffLinePayPrice: 0,
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
          ServiceDay: ""
        },
        Diagnosis: {
          Name: "",
          DepartmentType: "",
          SickReason: "",
          CertType: "",
          CardContent: "",
          ClinicalType: "",
          ClinicalContent: ""
        },
        Measures: [
          {
            Name: "",
            Type: "",
            MedicatedBathType: "",
            SetOfType: "",
            Content: "",
            ChildItems: [
              {
                PartsName: "",
                AcupunctureName: ""
              }
            ]
          }
        ]
      },
      geturl: "admin/Special/Order/Detail"
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
