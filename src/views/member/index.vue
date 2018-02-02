<template>
    <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="false" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :routername="'specialorder_detail'" :submitbtn="false" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-Width="500" @set-form="setForm" :other-query="otherQuery">
        <template slot="fromtop">
          <div class="ivu-modal-header"><div class="ivu-modal-header-inner">会员查看</div></div>
        </template>
        <template slot="frommodel">
            <FormItem label="用户名" prop="UserName" >
                  <label type="text" style="width: 500px" >{{formCustom.UserName}}</label>
            </FormItem>         
            <FormItem label="昵称" prop="Nick" >
                  <label type="text" style="width: 500px" >{{formCustom.Nick}}</label>
            </FormItem>
            <FormItem label="创建时间" prop="CreateDate" >
                  <label type="text" style="width: 500px" >{{formCustom.CreateDate | formatDate}}</label>
            </FormItem>
            <FormItem label="最后的登录时间" prop="LastLoginDate" >
                  <label type="text" style="width: 500px" >{{formCustom.LastLoginDate |  formatDate}}</label>
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
  name: "member-table",
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
      deleteUrl: "admin/Member/Delete",
      addUrl: "",
      getUrl: "admin/Member/GetList",
      formCustom: {
        Id: 0,
        UserName: "", //区域ID
        Nick: "", //名称
        Photo: "",
        CreateDate:"",
        LastLoginDate:""
      },
      ruleCustom: {
        UserName: [{ validator: validateRequired, trigger: "blur" }],
        Photo: [{ validator: validateRequired, trigger: "blur" }],
        Nick: [{ validator: validateRequired, trigger: "blur" }]
      },
      modalWidth: 500,
      defaultImageUrl: [],
      otherQuery: {
        TypeId: this.slideType
      }
    };
  },
  methods: {
    getresult(data) {
      if (data.length > 0) {
        this.formCustom.Photo = data[0].url;
      }
    },
    setForm(data) {
      if (data) {
        for (let key in this.formCustom) {
          if (key === "Photo") {
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
    }
  },
  created() {},
  mounted() {}
};
</script>