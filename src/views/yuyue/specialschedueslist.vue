<style lang="less">
@import "./schedues.less";
</style>
<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="compose"></Icon>
                    排班详情
                </p>
                <Tabs :animated="false"  :value='CurrentDate'   @on-click="setCurrent"> 
                    <TabPane   v-for="option in QueryDate"  :label="option.Week" :name="option.Day"></TabPane>
                </Tabs>
                <Table v-if="showTable==true" :columns="shopping_col" :data="shopping_data">
                    
                </Table>
                <Form  v-if="modalList==true" :model="initCustom" :rules="rulesCustom" :label-width="180" style="margin-top:20px;">
                    <FormItem label="选择所属门店" prop="StoreId">
                        <Select v-model="initCustom.StoreId"  style="width: 500px"  placeholder="">
                             <Option v-for="item in storelist" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
                         </Select>
                     </FormItem>
                     <FormItem label="开始时间" prop="StartTime">
                         <TimePicker  format="HH:mm"  v-model="initCustom.StartTime" style="width: 500px"></TimePicker>
                     </FormItem>
                      <FormItem label="结束时间" prop="EndTime">
                         <TimePicker  format="HH:mm"   v-model="initCustom.EndTime" style="width: 500px"></TimePicker>
                     </FormItem>
                    <div style="margin-top:20px;margin-left:200px">
                        <Button type="primary"   @click="generateTime" :loading="loading2">生成排班时间</Button>
                    </div>
                </Form>
                <p style="margin-top:20px;"  v-if="showTable==true" >
                     <Button type="default" @click="addOneLine"><Icon type="plus" />&nbsp;&nbsp;新增时间段</Button>  <Checkbox v-model="Single">是否成为模板</Checkbox>
                </p>
                <p style="margin-top:20px;" v-if="showTable==true">
                     <Button type="primary" :loading="loading" @click="saveCurrent">保存当前</Button>
                </p>
            </Card>
        </Row>
    </div>
    
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
      showTable: true,
      modalList: false,
      loading2: false,
      loading:false,
      shopping_col: [
        {
          title: "门店",
          key: "StoreId",
          align: "center",
          render: (h, p) => {
            let stolist = this.storelist;
            return h(
              "Select",
              {
                props: {
                  value: p.row.StoreId,
                  model: "StoreId"
                },
                on: {
                  "on-change": value => {
                    this.shopping_data[p.index].StoreId = value;
                  }
                }
              },
              [
                stolist.map((t, i) => {
                  return h(
                    "Option",
                    {
                      props: {
                        value: t.Id,
                        key: t.Id
                      }
                    },
                    t.Name
                  );
                })
              ]
            );
          }
        },
        {
          title: "时间",
          key: "SchedueDate",
          align: "center",
          render: (h, p) => {
            return h("Input", {
              props: {
                value: p.row.SchedueDate
              },
              style: {
                width: "80px"
              },
              on: {
                "on-blur": event => {
                  this.shopping_data[p.index].SchedueDate = event.target.value;
                }
              }
            });
          }
        },
        {
          title: "预约费用",
          key: "OrderPrice",
          align: "center",
          render: (h, p) => {
            return h("Input", {
              props: {
                value: p.row.OrderPrice
              },
              style: {
                width: "80px"
              },
              on: {
                "on-blur": event => {
                  this.shopping_data[p.index].OrderPrice = event.target.value;
                }
              }
            });
          }
        },
        /* {
          title: "到店另付费用",
          key: "AnotherPrice",
          align: "center",
          render: (h, p) => {
            return h("Input", {
              props: {
                value: p.row.AnotherPrice
              },
              style: {
                width: "80px"
              },
              on: {
                "on-blur": event => {
                  this.shopping_data[p.index].AnotherPrice = event.target.value;
                }
              }
            });
          }
        }, */
        {
          title: "名额",
          key: "Count",
          align: "center",
          render: (h, p) => {
            return h("Input", {
              props: {
                value: p.row.Count
              },
              style: {
                width: "80px"
              },
              on: {
                "on-blur": event => {
                  this.shopping_data[p.index].Count = event.target.value;
                }
              }
            });
          }
        },
        {
          title: "操作",
          key: "price",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  style: { margin: "0 5px" },
                  props: {
                    type: "error",
                    placement: "top",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      let thisTableData = this.shopping_data;
                      thisTableData.splice(params.index, 1);
                      this.$Message.success("删除成功");
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        },
        {
          title: "是否临时",
          key: "IsTemporary",
          align: "center",
          render: (h, p) => {
            let templist = this.IsTemp;
            return h(
              "Select",
              {
                props: {
                  value: p.row.IsTemporary ? 1 : 0
                },
                style: {
                  width: "80px"
                },
                on: {
                  "on-change": value => {
                    this.shopping_data[p.index].IsTemporary = value;
                  }
                }
              },
              [
                templist.map((t, i) => {
                  return h(
                    "Option",
                    {
                      props: {
                        value: t.Id,
                        key: t.Id
                      }
                    },
                    t.Name
                  );
                })
              ]
            );
          }
        },
        {
          title: "是否模板",
          key: "IsTemplate",
          align: "center",
          render: (h, p) => {
            return h("Input", {
              props: {
                value: p.row.IsTemplate ? "是" : "否",
                disabled: "disabled"
              },
              style: {
                width: "80px"
              }
            });
          }
        }
      ],
      shopping_data: [],
      formCustom: {
        Id: this.$route.params.id
      },
      initCustom: {
        StoreId: "",
        StartTime: "08:30",
        EndTime: " 17:00"
      },
      rulesCustom: {
        StoreId: [{ validator: validateRequired, trigger: "blur" }],
        StartTime: [{ validator: validateRequired, trigger: "blur" }],
        EndTime: [{ validator: validateRequired, trigger: "blur" }]
      },
      geturl: "admin/Special/Schedues/Record",
      storelist: [],
      IsTemp: [{ Id: 1, Name: "是" }, { Id: 0, Name: "否" }],
      QueryDate: [],
      CurrentDate: "",
      Single: true
    };
  },
  methods: {
    init() {
      let vm = this;
      //是否成为模板
      vm.single = false;
    },
    setCurrent(value) {
      let vm = this;
      vm.CurrentDate = value;
      //设置当前初始值
      vm.initCustom.StoreId = "";
      vm.initCustom.StartTime = "08:30";
      vm.initCustom.EndTime = "17:00";
      this.getDataInfo();
    },
    getDataInfo() {
      let vm = this;
      vm.loading=true;
      if (this.formCustom.Id && this.formCustom.Id != 0) {
        Util.post(
          this.geturl,
          { SId: this.formCustom.Id, Day: this.CurrentDate },
          vm,
          function(res, data) {
            vm.loading=false;
            if (res === "1") {
              if (data.totalCount > 0) {
                vm.showTable = true;
                vm.modalList = false;
                vm.shopping_data = data.data;
              } else {
                vm.modalList = true;
                vm.showTable = false;
              }
            }
          }
        );
      }
    },
    saveCurrent() {
      let vm = this;
      var data2 = this.shopping_data;
      data2.map((t, i) => {
        t.SchedueDay = this.CurrentDate;
        //数据验证
        if(t.StoreId==0 || t.StoreId==''){
             vm.$Message.success("排班门店信息填写不完整"); return ;
        }
        if(t.SchedueDate==''){
             vm.$Message.success("排班时间信息填写不完整"); return ;
        }
        if(t.OrderPrice==''){
             vm.$Message.success("排班预约金额信息填写不完整"); return ;
        }
        /* if(t.AnotherPrice==''){
             vm.$Message.success("排班到店另付费用信息填写不完整"); return ;
        } */
         if(t.Count==''){
             vm.$Message.success("排班名额信息填写不完整"); return ;
        }
      });
      
      Util.post(
        "admin/Special/Schedues/Save",
        {
          SId: this.formCustom.Id,
          Day: this.CurrentDate,
          Single: this.Single,
          SchedueString: JSON.stringify(data2)
        },
        vm,
        function(res, data) {
          if (res === "1") {
            vm.$Message.success("保存成功");
            vm.getDataInfo();
          }else{
      
               vm.$Message.error(data);
          }
        }
      );
    },
    addOneLine() {
      let vm = this;
      vm.shopping_data.push({
        StoreId: 0,
        SchedueDate: "",
        OrderPrice: "",
        AnotherPrice: "",
        Count: 1,
        IsTemplate: false,
        IsTemporary: true
      });
    },
    generateTime() {
      let vm = this;
      //基础信息
      let storeId = 0;
      let startTime = vm.initCustom.StartTime;
      let endTime = vm.initCustom.EndTime;
      storeId = vm.initCustom.StoreId;
      if (storeId == 0) {
        this.$Message.error("请选择门店");
        return;
      }
      if (startTime == "") {
        this.$Message.error("请选择开始时间");
        return;
      }
      if (endTime == "") {
        this.$Message.error("请选择结束时间");
        return;
      }
      startTime = Util.formatDateMin(startTime);
      endTime = Util.formatDateMin(endTime);
      //获取时间段
      Util.post(
        "admin/Special/Schedues/GetDate",
        {
          SId: this.formCustom.Id,
          StoreId: storeId,
          Day: this.CurrentDate,
          Start: startTime,
          End: endTime
        },
        vm,
        function(res, data) {
          if (res === "1") {
            if (data.totalCount > 0) {
              vm.showTable = true;
              vm.modalList = false;
              vm.shopping_data = data.data;
            } else {
              vm.modalList = true;
              vm.showTable = false;
            }
          }
        }
      );
      vm.showTable = true;
      vm.modalList = false;
    },
    loadStore() {
      let vm = this;
      Util.post(
        "admin/Store/GetAllStoreBySId",
        { SId: this.formCustom.Id },
        vm,
        function(res, data) {
          if (res === "1") {
            if (data.totalCount > 0) {
              vm.storelist = data.data;
            } else {
              vm.storelist = [];
            }
          }
        }
      );
    },
    loadDate() {
      let vm = this;
      Util.post("admin/Special/Schedues/Date", {}, vm, function(res, data) {
        if (res === "1") {
          vm.QueryDate = data.data.SchedueDay;
          vm.CurrentDate = data.data.CurrentTime;
          vm.getDataInfo();
        }
      });
    }
  },
  mounted() {
    this.loadStore();
    this.loadDate();
    this.init();
  },
  watch: {
    $route() {
      this.init();
    }
  }
};
</script>
