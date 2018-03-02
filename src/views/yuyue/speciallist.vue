<style lang="less">
@import "./form.less";
</style>


<template>
    <list :show-search="true" :show-date="false" :show-key-word="true" :show-add-button="true" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-Width="500" @set-form="setForm" :other-query="otherQuery">
        <template slot="fromtop">
          <div class="ivu-modal-header"><div class="ivu-modal-header-inner">专家管理</div></div>
        </template>
        <template slot="frommodel">
          <template v-if=""></template>
           <FormItem label="*专家名称"  prop="Name">
                <Input type="text" style="width: 300px"    placeholder="专家名称" v-model="formCustom.Name"></Input>
            </FormItem>
            <FormItem label="* 专家职称"   prop="Job" >
                <Input type="text"  style="width: 300px"    placeholder="专家职称" v-model="formCustom.Job"></Input>
            </FormItem>
              <FormItem label="* 专家星级"   prop="Stars" >
                <Input type="text"  style="width: 300px"    placeholder="星级(0,1,2,3,4,5)" :number="true" v-model="formCustom.Stars"></Input>
            </FormItem>
             <FormItem label="* 专家头像"  prop="Avatar">
                <PhUpload @get-result="getresult" :default-list="defaultImageUrl" :format="['jpg','jpeg','png']" :maxsize="1024*10"></PhUpload>
            </FormItem>
            <FormItem label="* 所属门店" prop="TheirStores">
                <Select v-model="TheirStores1"  style="width: 300px"  @on-change="GetTheirStores"  multiple placeholder="请选择所属门店">
                    <Option v-for="item in storelist" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="* 开始时间"   prop="StartDate">
               <DatePicker type="date"  placeholder="开始时间"  v-model="formCustom.StartDate" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="* 结束时间"   prop="EndDate">
               <DatePicker type="date"  placeholder="结束时间"  v-model="formCustom.EndDate" style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="* 个人简介" prop="Profile">
                <Input type="textarea" style="width: 300px"  v-model="formCustom.Profile"></Input>
            </FormItem>
            <FormItem label="* 资质介绍" prop="Introduction">
                  <Input type="textarea" style="width: 300px"  v-model="formCustom.Introduction"></Input>
            </FormItem>
            <FormItem label="* 服务价格" prop="Price">
                  <Input type="text" style="width: 300px"  v-model="formCustom.Price"></Input>
            </FormItem>
            <FormItem label="* 排序" prop="Sort">
                  <Input type="text" style="width: 300px"  v-model="formCustom.Sort" :number="true" placeholder="排序号码越小越靠前" ></Input>
            </FormItem>
             <FormItem label="* 登录手机号" prop="CellPhone">
                  <Input type="text" style="width: 300px"  v-model="formCustom.CellPhone" placeholder="技师端登录(默认密码123456)" ></Input>
            </FormItem>
        </template>
    </list>
</template>

<script>
import PhUpload from "../main-components/phupload.vue";
import Util from "../../libs/util.js";
import list from "../main-components/list.vue";
import { validateNum, validateRequired } from "../../libs/validate.js";
export default {
  name: "speciallist-table",
  components: {
    list,
    PhUpload
  },
  props: {
    slideType: {
      Type: Number,
      default: 0
    },
    inputShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      updateUrl: "admin/Special/AddOrUpdate",
      deleteUrl: "admin/Special/Delete",
      addUrl: "admin/Special/AddOrUpdate",
      getUrl: "admin/Special/GetList",
      TheirStores1: [],
      formCustom: {
        Id: 0,
        Name: "", //专家名称
        Sort: 99,
        Job: "", //专家职称
        Stars: "",
        Profile: "",
        Avatar: "",
        Introduction: "",
        Price: "",
        TheirStores: "",
        StartDate: "",
        EndDate: "", //结束时间
        CellPhone: "" //手机号码
      },
      ruleCustom: {
        Name: [{ validator: validateRequired, trigger: "blur" }],
        TheirStores: [{ validator: validateRequired, trigger: "blur" }],
        Avatar: [{ validator: validateRequired, trigger: "blur" }],
        Job: [{ validator: validateRequired, trigger: "blur" }],
        Introduction: [{ validator: validateRequired, trigger: "blur" }],
        Price: [{ validator: validateRequired, trigger: "blur" }],
        Profile: [{ validator: validateRequired, trigger: "blur" }],
        EndDate: [{ validator: validateRequired, trigger: "blur" }],
        StartDate: [{ validator: validateRequired, trigger: "blur" }],
        Sort: [{ validator: validateNum, trigger: "blur" }],
        CellPhone: [{ validator: validateRequired, trigger: "blur" }]
      },
      modalWidth: 600,
      defaultImageUrl: [],
      otherQuery: {
        TypeId: this.slideType
      },
      arealist: [],
      storelist: []
    };
  },
  methods: {
    getresult(data) {
      if (data.length > 0) {
        this.formCustom.Avatar = data[0].url;
      }
    },
    GetTheirStores(value) {
      //设置多选框的值
      this.TheirStores1 = value;
      this.formCustom.TheirStores = value.join(","); //转成string
    },
    setForm(data) {
      if (data) {
        for (let key in this.formCustom) {
          if (key === "Avatar") {
            var item = [{ name: "", url: data[key], status: "finished" }];
            this.defaultImageUrl = item;
          }
          if (key === "TheirStores") {
            var dataStrArr = data[key].split(","); //分割成字符串数组
            var dataIntArr = [];
            dataStrArr.forEach(function(data, index, arr) {
              dataIntArr.push(+data);
            });
            this.TheirStores1 = dataIntArr;
            this.formCustom[key] = dataIntArr.join(","); //转成string
          } else {
            this.formCustom[key] = data[key];
          }
        }
      } else {
        for (let key in this.formCustom) {
          switch (key) {
            case "Id":
              this.formCustom[key] = 0;
              break;
            case "TypeId":
              this.formCustom[key] = this.slideType;
              break;
            case "Sort":
              this.formCustom[key] = 99;
              break;
            default:
              this.formCustom[key] = "";
              break;
          }
        }
        this.defaultImageUrl = [];
        this.TheirStores1 = [];
      }
    },
    loadArea() {
      let vm = this;
      Util.post("admin/Area/GetAreaList", { Id: 100 }, vm, function(res, data) {
        if (res === "1") {
          if (data.totalCount > 0) {
            vm.arealist = data.data;
          } else {
            vm.arealist = [];
          }
        }
      });
    },
    loadStore() {
      let vm = this;
      Util.post("admin/Store/GetAllStore", {}, vm, function(res, data) {
        if (res === "1") {
          if (data.totalCount > 0) {
            vm.storelist = data.data;
          } else {
            vm.storelist = [];
          }
        }
      });
    }
  },
  created() {},
  mounted() {
    //load area this
    //this.loadArea();
    //load store this
    this.loadStore();
  }
};
</script>