<style lang="less">
@import "./form.less";
</style>
<template>
    <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="false" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :routername="'babyorder_detail'" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-Width="500" @set-form="setForm" :other-query="otherQuery">
          <template slot="fromtop">
          <div class="ivu-modal-header"><div class="ivu-modal-header-inner">确认服务</div></div>
        </template>
        <template slot="frommodel">
            <FormItem label="选择项目" prop="AreaId">
              <Select v-model="formCustom.BabyStrokeId"  @on-change="getPrice" style="width:300px" number>
                    <Option v-for="item in projectlist" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
              </Select>
            </FormItem>
             <input type="hidden" v-model="formCustom.OrderId" />
            <FormItem label="项目价格" prop="OrderPrice">
                <Input type="text" style="width: 300px"   v-model="formCustom.OrderPrice"></Input>
            </FormItem>
        </template>
    </list>
</template>

<script>
import PhUpload from "../../main-components/phupload.vue";
import Util from "../../../libs/util.js";
import list from "../../main-components/list.vue";
import { validateNum, validateRequired } from "../../../libs/validate.js";
export default {
  name: "seller-special-table",
  components: {
    list,
    PhUpload
  },
  props: {
    slideType: {
      Type: Number,
      default: 0
    },
    // CurrentStatus: {
    //   type: Number,
    //   default: 0
    // }
  },
  data() {
    return {
      updateUrl: "",
      deleteUrl: "",
      addUrl: "",
      getUrl: "api/StoreApi/GetStoreOrderList",
      formCustom: {
        Id: 0,
        AreaId: 0, //区域ID
        Name: "", //名称
        Sort: 99
      },
      ruleCustom: {
        Name: [{ validator: validateRequired, trigger: "blur" }],
        AreaId: [{ validator: validateNum, trigger: "blur" }],
        Sort: [{ validator: validateNum, trigger: "blur" }]
      },
      modalWidth: 500,
      defaultImageUrl: [],
      otherQuery: {
        TypeId: this.slideType
      },
      arealist: [],
      CurrentStatus:0
    };
  },
  methods: {
    getresult(data) {
      if (data.length > 0) {
        this.formCustom.TopImage = data[0].url;
      }
    },
    setForm(data) {
      if (data) {
        for (let key in this.formCustom) {
          if (key === "TopImage") {
            var item = [{ name: "", url: data[key], status: "finished" }];
            this.defaultImageUrl = item;
          }
          this.formCustom[key] = data[key];
        }
      } else {
        for (let key in this.formCustom) {
          if (key === "Id") {
            this.formCustom[key] = 0;
          } else if (key != "TypeId") {
            this.formCustom[key] = "";
          } else {
            this.formCustom[key] = this.slideType;
          }
        }
        this.defaultImageUrl = [];
      }
    },
    setCurrentStatus(){ //设置当前状态
      console.log("----------------------------");
    }
  },
  created() {},
  mounted() {
    //load area this
  }
};
</script>