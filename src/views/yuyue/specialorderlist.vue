<style lang="less">
@import "./form.less";
</style>
<template>
    <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="false" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :routername="'specialorder_detail'" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-Width="500" @set-form="setForm" :other-query="otherQuery">
        <template slot="fromtop">
          <div class="ivu-modal-header"><div class="ivu-modal-header-inner">门店管理</div></div>
        </template>
        <template slot="frommodel">
            <FormItem label="* 所在区域" prop="AreaId">
              <Select v-model="formCustom.AreaId" style="width:300px" number>
                    <Option v-for="item in arealist" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="* 名称" prop="Name">
                <Input type="text" style="width: 300px"  v-model="formCustom.Name"></Input>
            </FormItem>         
            <FormItem label="* 排序" prop="Sort">
                    <Input type="text" style="width: 300px"  v-model="formCustom.Sort" :number="true" placeholder="排序号码越小越靠前" ></Input>
            </FormItem>
        </template>
    </list>
</template>

<script>
import PhUpload from "../main-components/phupload.vue";
import Util from '../../libs/util.js';
import list from "../main-components/list.vue";
import { validateNum, validateRequired } from "../../libs/validate.js";
export default {
  name: "special-table",
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
    },
  },
  data() {
    return {
      updateUrl: "",
      deleteUrl: "admin/Special/Order/Delete",
      addUrl: "",
      getUrl: "admin/Special/Order/List",
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
        TypeId: this.slideType,
        SId:this.$route.params.id
      },
      arealist:[]
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
          }
          else{
              this.formCustom[key] = this.slideType;
          }
        }
        this.defaultImageUrl = [];
      }
    },
    loadArea(){
      let vm=this;
      Util.post("admin/Area/GetAreaList",{Id:100},vm,function(res,data){
            if(res==='1')
                {
                    if(data.totalCount>0)
                    {
                        vm.arealist = data.data;                
                    }else{
                        vm.arealist = [];
                    }
                }
      });        
    }
  },
  created() {},
  mounted() {
    //load area this
  }
};
</script>