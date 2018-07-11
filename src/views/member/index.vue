<template>
    <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="false" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :routername="'specialorder_detail'" :submitbtn="false" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-Width="500" @set-form="setForm" :other-query="otherQuery">
       
       <template slot="rightbtn">
          <PhUploadFile  :uploadurl="'admin/Member/ExcelMembers'" :templateurl="'/statics/file/membercard.xls'" >
          </PhUploadFile>
        </template>
        <template slot="fromtop">
          <div class="ivu-modal-header"><div class="ivu-modal-header-inner">会员查看</div></div>
        </template>
        <template slot="frommodel">
           <template v-if="showtype===0">
             <FormItem label="用户名" prop="UserName" >
                  <label type="text" style="width: 500px" >{{showFormCustom.UserName}}</label>
            </FormItem>         
            <FormItem label="昵称" prop="Nick" >
                  <label type="text" style="width: 500px" >{{showFormCustom.Nick}}</label>
            </FormItem>
            <FormItem label="创建时间" prop="CreateDate" >
                  <label type="text" style="width: 500px" >{{showFormCustom.CreateDate | formatDate}}</label>
            </FormItem>
            <FormItem label="最后的登录时间" prop="LastLoginDate" >
                  <label type="text" style="width: 500px" >{{showFormCustom.LastLoginDate |  formatDate}}</label>
            </FormItem>
           </template>
           <template v-if="showtype===1">
             <FormItem label="所属门店ID" prop="DistributorId" >
                    <Input type="text" style="width: 200px" v-model="formCustom.DistributorId"></Input>
            </FormItem>         
           </template>
        </template>
    </list>
</template>

<script>
import PhUpload from "../main-components/phupload.vue";
import PhUploadFile from "../main-components/phuploadfile.vue";
import Util from "../../libs/util.js";
import list from "../main-components/list.vue";
import { validateNum, validateRequired } from "../../libs/validate.js";
export default {
  name: "member-table",
  components: {
    list,
    PhUploadFile
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
      updateUrl: "admin/Member/Save",
      deleteUrl: "admin/Member/Delete",
      addUrl: "admin/Member/Save",
      getUrl: "admin/Member/GetList",
      formCustom: {
        Id: 0,
        DistributorId: 0
      },
      showFormCustom: [],
      ruleCustom: {
        DistributorId: [{ validator: validateNum, trigger: "blur" }]
      },
      modalWidth: 500,
      defaultImageUrl: [],
      otherQuery: {
        TypeId: this.slideType
      },
      showtype: 0
    };
  },
  methods: {
    uploadmembers(fileurl) {
      let vm = this;
      if (!fileurl) {
        vm.$Message.error("文件不存在");
      }
      return false;
    },
    setForm(data, showtype) {
      if (showtype) {
        this.showtype = showtype;
      } else {
        this.showtype = 0;
      }
      if (data) {
        for (let key in this.formCustom) {
          this.formCustom[key] = data[key];
        }
        this.showFormCustom=data;
      } else {
        this.showFormCustom=[];
        for (let key in this.formCustom) {
          if (key === "Id") {
            this.formCustom[key] = 0;
          } else {
            this.formCustom[key] = "";
          }
        }
      }
    }
  },
  created() {},
  mounted() {}
};
</script>