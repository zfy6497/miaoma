<template>
  <Row>
       <Col >
         <Card>
              <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
                <Tabs value="name1">
                    <TabPane label="系统配置" name="name1">
                        
                        <FormItem label="购物积分" prop="IntegralOrderConfig">
                              <Tooltip  placement="right" >
                                  <div slot="content" style="white-space: normal">购物1元对应的积分（支付金额），如设置1，支付50元， 获得50积分</div>
                            <Input type="text" style="width: 100px" v-model="formCustom.IntegralOrderConfig" :number="true">
                              <span slot="append">分</span>
                            </Input>
                            </Tooltip>
                        </FormItem>
                         <FormItem label="签到积分" prop="SignIntergral">
                            <Input type="text" style="width: 100px" v-model="formCustom.SignIntergral" :number="true"> <span slot="append">分</span></Input>
                                  
                        </FormItem>
                        <FormItem label="包邮金额" prop="FreeShipping">
                             <Tooltip content="关闭包邮输入-1，全场包邮输入0" placement="right">
                                   <Input type="text" style="width: 100px" v-model="formCustom.FreeShipping" :number="true" >
                                      <span slot="prepend">￥</span>
                                   </Input>
                              </Tooltip>
                           
                        </FormItem>
                         <FormItem label="售后电话" prop="CustomerTel">
                            <Input type="text" style="width: 300px" v-model="formCustom.CustomerTel" >
                            </Input>
                        </FormItem>
                          <FormItem label="退货地址" prop="RefundAddress">
                            <Input type="text" style="width: 300px" v-model="formCustom.RefundAddress" >
                            </Input>
                        </FormItem>
                        <FormItem label="退货联系电话" prop="RefundPhone">
                            <Input type="text" style="width: 300px" v-model="formCustom.RefundPhone"></Input>
                        </FormItem>
                         <FormItem  label="退货联系人" prop="RefundName">
                            <Input type="text" style="width: 300px" v-model="formCustom.RefundName" >
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="saveInfo">提交</Button>
                        </FormItem>
                    </TabPane>

                </Tabs>
            </Form>
         </Card>
      </Col>
      
  </Row>
</template>

<script>
import Util from "../../libs/util.js";
import {
  validateNum,
  validateRequired,
  validateInteger
} from "../../libs/validate.js";
import UEditor from "../main-components/ueditor.vue";
export default {
  name: "page1-detail",
  components: {},
  data() {
    return {
      value1: [],
      formCustom: {
        IntegralOrderConfig: 0,
        Sign: 0,
        FreeShipping: 0,
        CustomerTel: "",
        RefundAddress: "",
        RefundPhone: "",
        RefundName: ""
      },
      ruleCustom: {
        IntegralOrderConfig: [{ validator: validateInteger, trigger: "blur" }],
        SignIntergral: [{ validator: validateInteger, trigger: "blur" }],
        FreeShipping: [{ validator: validateNum, trigger: "blur" }],
        CustomerTel: [{ validator: validateRequired, trigger: "blur" }],
        RefundAddress: [{ validator: validateRequired, trigger: "blur" }],
        RefundPhone: [{ validator: validateRequired, trigger: "blur" }],
        RefundName: [{ validator: validateRequired, trigger: "blur" }]
      },
      loading2: false,
      editurl: "admin/Sysconfig/Save",
      geturl: "admin/Sysconfig/GetModal"
    };
  },
  beforeDestroy() {},
  destroyed() {},
  computed: {
    valuationMethod: function() {}
  },
  watch: {},
  mounted() {
    this.getInfo();
    // this.setForm();
  },
  methods: {
    saveInfo() {
      this.loading2 = true;
      this.$refs["formCustom"].validate(valid => {
        if (valid) {
          let vm = this;
          let pdata = this.formCustom;
          Util.post(this.editurl, pdata, vm, function(res, msg) {
            if (res === "1") {
              vm.$Message.success("保存成功");
              vm.loading2 = false;
            } else {
              if (msg && msg != "") {
                vm.$Message.error(msg);
              } else {
                vm.$Message.error("保存失败");
              }
              vm.loading2 = false;
            }
          });
        } else {
          console.log("error submit!!");
          this.loading2 = false;
          return false;
        }
      });
    },
    getInfo() {
      let vm = this;
      Util.post(this.geturl, {}, vm, function(res, data) {

        if (res === "1") {
          let info = data.data;
          if (info) {
              vm.formCustom= data.data;
            for (let key in vm.formCustom) {
              vm.formCustom[key] = info[key];
            }
          } else {
            for (let key in vm.formCustom) {
            }
          }
        } else {
            vm.$Message.error("获取失败");
        }
      });
    }
  }
};
</script>
