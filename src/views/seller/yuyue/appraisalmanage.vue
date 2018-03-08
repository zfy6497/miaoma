<style lang="less">
@import "./form.less";
</style>
<template>
    <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="false" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl"  :routername="'seller_appraisal_detail'"  :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-Width="500" @set-form="setForm" :other-query="otherQuery">
        <template slot="fromtop">
          <div class="ivu-modal-header"><div class="ivu-modal-header-inner">考评管理</div></div>
        </template>
        <template slot="frommodel">
           <FormItem label="* 考评标题"   prop="Title" >
                <Input type="text" style="width: 300px"   placeholder="请输入考评标题" v-model="formCustom.Title"></Input>
            </FormItem>
            <FormItem label="* 考评内容" prop="Content">
              <Input type="textarea" style="width: 300px"  placeholder="请输入考评内容"  v-model="formCustom.Content"></Input>
               
            </FormItem>
            <FormItem label="* 考评得分" prop="Score">
                    <Input type="text" style="width: 300px"  v-model="formCustom.Score" :number="true" ></Input>
            </FormItem>
            
          <FormItem label="状态" prop="IsShow">
            <i-switch v-model="formCustom.IsShow" size="large">
                <span slot="open">显示</span>
                <span slot="close">隐藏</span>
            </i-switch>
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
  name: "appraisalmanage-table",
  components: {
    list,
    PhUpload
  },
  props: {
    slideType: {
      Type: Number,
      default: 0
    }
  },
  data() {
    return {
      updateUrl: "",
      deleteUrl: "",
      addUrl: "",
      getUrl: "api/StoreApi/GetAppraisalList",
      formCustom: {
        Id: 0,
        Title: "", //标题
        Content: "", //内容
        Score: 0, //得分
        IsShow:true //是否显示
      },
      ruleCustom: {
        Title: [{ validator: validateRequired, trigger: "blur" }],
        Content: [{ validator: validateRequired, trigger: "blur" }],
        Score: [{ validator: validateNum, trigger: "blur" }]
      },
      modalWidth: 500,
      defaultImageUrl: [],
      otherQuery: {
        TypeId: this.slideType
      },
      arealist: []
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
          switch (key) {
            case "TopImage":
              var item = [{ name: "", url: data[key], status: "finished" }];
              this.defaultImageUrl = item;
              break;
            default:
              this.formCustom[key] = data[key];
              break;
          }
        }
      } else {
        //默认值
        for (let key in this.formCustom) {
          switch (key) {
            case "Id":
              this.formCustom[key] = 0;
              break;
            case "TypeId":
              this.formCustom[key] = this.slideType;
              break;
            case "IsShow":
              this.formCustom[key] = true;
              break;
            default:
              this.formCustom[key] = "";
              break;
          }
        }
        this.defaultImageUrl = [];
      }
    }
  },
  created() {},
  mounted() {}
};
</script>