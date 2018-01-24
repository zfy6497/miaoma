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
           <FormItem label="* 标题" style="display:none"  prop="W_ReplyTitle">
                <Input type="text" style="width: 300px"    placeholder="请输入图文回复标题" v-model="formCustom.W_ReplyTitle"></Input>
            </FormItem>
            <FormItem label="* tup"  style="display:none" prop="W_ReplyTitle" >
                <Input type="text"  style="width: 300px"    placeholder="请上传图文回复图片" v-model="formCustom.W_ReplyImage"></Input>
            </FormItem>
            <FormItem label="* 所在区域" prop="AreaId">
              <Select v-model="formCustom.AreaId" style="width:300px" number>
                    <Option v-for="item in arealist" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="* 门店名称" prop="Name">
                <Input type="text" style="width: 300px"  v-model="formCustom.Name"></Input>
            </FormItem>
            <FormItem label="* 顶部图片"  prop="TopImage">
                 <PhUpload @get-result="getresult" :default-list="defaultImageUrl" :format="['jpg','jpeg','png']" :maxsize="1024*10">
                </PhUpload>
            </FormItem>
            <FormItem label="* 联系电话" prop="Telephone">
                  <Input type="text" style="width: 300px"  v-model="formCustom.Telephone"></Input>
            </FormItem>
            <FormItem label="* 门店地址" prop="Address">
                  <Input type="text" style="width: 300px"  v-model="formCustom.Address"></Input>
            </FormItem>
            <FormItem label="门店经度" style="display:none"  prop="Longitude">
                    <Input type="text" style="width: 300px"  v-model="formCustom.Longitude"></Input>
            </FormItem>
            <FormItem label="门店纬度" style="display:none"  prop="Latitude">
                    <Input type="text" style="width: 300px"  v-model="formCustom.Latitude"></Input>
            </FormItem>
            <FormItem label="* 门店简介"  prop="Remark">
                 <Input type="text" style="width: 300px"  v-model="formCustom.Remark"></Input>
            </FormItem>
            <FormItem label="* 订单页头部图片" style="display:none"  prop="OrderPageTopImage">
                    <Input type="text" style="width: 300px"  v-model="formCustom.OrderPageTopImage"></Input>
            </FormItem>
            <FormItem label="* 订单预约说明" style="display:none"  prop="OrderPageRemark">
                    <Input type="text" style="width: 300px"  v-model="formCustom.OrderPageRemark"></Input>
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
  name: "store-table",
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
      updateUrl: "admin/Special/AddOrUpdate",
      deleteUrl: "admin/Special/Delete",
      addUrl: "admin/Special/AddOrUpdate",
      getUrl: "admin/Special/GetList",
      formCustom: {
        Id: 0,
        W_ReplyTitle: "", //图文回复标题
        W_ReplyImage: "", //图文回复图片
        W_LinkUrl: "", //微信访问链接
        AreaId: 0, //区域ID
        Name: "", //门店名称
        TopImage: "", //顶部图片
        Telephone: "", //电话
        Address: "",
        Remark: "",
        Longitude: "",
        Latitude: "",
        Sort: 99,
        OrderPageTopImage: "",
        OrderPageRemark: ""
      },
      ruleCustom: {
        Name: [{ validator: validateRequired, trigger: "blur" }],
        AreaId: [{ validator: validateNum, trigger: "blur" }],
        TopImage: [{ validator: validateRequired, trigger: "blur" }],
        Telephone: [{ validator: validateRequired, trigger: "blur" }],
        Address: [{ validator: validateRequired, trigger: "blur" }],
        Remark: [{ validator: validateRequired, trigger: "blur" }],
        Sort: [{ validator: validateNum, trigger: "blur" }]
      },
      modalWidth: 500,
      defaultImageUrl: [],
      otherQuery: {
        TypeId: this.slideType
      },
      arealist:[],
      storelist:[]
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
                    if(data.totalCount>0){
                        vm.arealist = data.data;                
                    }else{
                        vm.arealist = [];
                    }
                }
      });        
    },
    loadStore(){
      let vm=this;
      Util.post("admin/Store/GetAllStore",{},vm,function (res,data) {
        if(res==='1'){
            if(data.totalCount>0){
                vm.storelist = data.data;                
            }else{
                vm.storelist = [];
            }
        }
      })
    }
  },
  created() {},
  mounted() {
    //load area this
    //this.loadArea();
    //load store  this
    this.loadStore();
  }
};
</script>