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
import PhUpload from "../main-components/phupload.vue";
import Util from "../../libs/util.js";
import list from "../main-components/list.vue";
import { validateNum, validateRequired } from "../../libs/validate.js";
export default {
  name: "babyorder-table",
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
      updateUrl: "admin/Store/Order/UpdatePrice",
      deleteUrl: "admin/Store/Order/Delete",
      addUrl: "admin/Store/Order/UpdatePrice",
      getUrl: "admin/Store/Order/List",
      formCustom: {
        BabyStrokeId: 0, //项目Id
        OrderPrice: 0,
        OrderId: 0
      },
      ruleCustom: {
        ProjectId: [{ validator: validateNum, trigger: "blur" }],
        OrderPrice: [{ validator: validateNum, trigger: "blur" }]
      },
      modalWidth: 500,
      defaultImageUrl: [],
      otherQuery: {
        TypeId: this.slideType,
        SId: this.$route.params.id
      },
      projectlist:[]
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
    loadProject(){
      let vm=this;
      Util.post("admin/Store/GetProjectByStoreId", { Id: this.$route.params.id }, vm, function(res, data) {
        if (res === "1") {
          if (data.totalCount > 0) {
            vm.projectlist = data.data;
          } else {
            vm.projectlist = [];
          }
        }
      });
    },
    getPrice(value){
      let vm=this;
      let projectId=value;
      console.log("price:"+projectId);
      Util.post("admin/Store/GetProjectPrice", { Id:  projectId}, vm, function(res, data) {
        if (res === "1") {
           vm.formCustom.OrderPrice = data.data.Price;
        }else{
           vm.formCustom.OrderPrice=0;
        }
      });
    }
  },
  created() {
    
  },
  mounted() {
    this.loadProject();
    }
};
</script>