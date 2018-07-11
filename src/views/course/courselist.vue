<template>
    <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="false" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" modal-Width="500" @set-form="setForm"  :routername="'course_detail'">
         <template slot="rightbtn">
            <span @click="addgolink"  style=""><Button type="primary"  icon="add">新增</Button></span>
        </template>
    </list>
</template>

<script>
import list from "../main-components/list.vue";
import PhUpload from "../main-components/phupload.vue";
import Util from "../../libs/util.js";
import {
  validateNum,
  validateRequired,
  validateInteger
} from "../../libs/validate.js";
import UEditor from "../main-components/ueditor.vue";
export default {
  name: "page1-table",
  components: {
    list,
     PhUpload,
    UEditor
  },
  data() {
    return {
      updateUrl: "admin/Course/Save",
      deleteUrl: "admin/Course/Delete",
      addUrl: "admin/Course/Save",
      getUrl: "admin/Course/GetList",
      formCustom: {
        Id: 0,
        Name: "",
        Price: 0,
        CourseCategoryId: 0,
        ShortDescription:'',
        Times:0,
        Description:''
      },
      ruleCustom: {
        Name: [{ validator: validateRequired, trigger: "blur" }]
      },
      modalWidth: 500,
      typelist: []
    };
  },
  methods: {
    getresult(data) {},
    setForm(data) {
      if (data) {
        for (let key in this.formCustom) {
          this.formCustom[key] = data[key];
        }
      } else {
        for (let key in this.formCustom) {
          if (key === "Id") {
            this.formCustom[key] = 0;
          } else {
            this.formCustom[key] = "";
          }
        }
        this.defaultLogo = [];
      }
    },
    getOtherList() {
      let vm = this;
      Util.post("admin/Course/GetCategoryList", {}, vm, function(res, data) {
        console.log(data);
        console.log("---");
        if (res === "1") {
          vm.typelist = data.data;
        } else {
          vm.$Message.error("信息有误");
        }
      });
    },
      addgolink(){
          this.$router.push({ name: 'course_detail', params: { id: 0 } })
      }
  },
  created() {}
};
</script>