<style lang="less">
@import "./form.less";
</style>
<template>
    <list :show-search="true" :show-date="false" :show-key-word="true" :show-add-button="true" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-Width="500" @set-form="setForm" :other-query="otherQuery">
        <template slot="fromtop">
          <div class="ivu-modal-header"><div class="ivu-modal-header-inner">首页广告</div></div>
        </template>
        <template slot="frommodel">
            <FormItem label="广告轮播图" prop="ImageUrl">
                <PhUpload @get-result="getresult" :default-list="defaultImageUrl" :format="['jpg','jpeg','png']" :maxsize="1024*10">
                </PhUpload>
            </FormItem>
            <FormItem label="跳转链接" prop="Url">
                <Input type="url" style="width: 300px" v-model="formCustom.Url"></Input>
            </FormItem>
            <FormItem label="排序值" prop="Sort">
                <Input type="text" style="width: 100px" v-model="formCustom.Sort" :number="true"></Input>
            </FormItem>
              <FormItem label="说明" prop="Description">
                <Input type="text" style="width: 300px" v-model="formCustom.Description"></Input>
            </FormItem>
        </template>
    </list>
</template>

<script>
import PhUpload from "../main-components/phupload.vue";
import list from "../main-components/list.vue";
import { validateNum, validateRequired } from "../../libs/validate.js";
export default {
  name: "homeads-table",
  components: {
    list,
    PhUpload
  },
  props: {
    slideType: {
      Type: Number,
      default: 4
    }
  },
  data() {
    return {
      updateUrl: "admin/Slideads/AddOrUpdate",
      deleteUrl: "admin/Slideads/Delete",
      addUrl: "admin/Slideads/AddOrUpdate",
      getUrl: "admin/Slideads/GetList",
      formCustom: {
        Id: 0,
        Url: "",
        Sort: 99,
        ImageUrl: "",
        Description: "",
        TypeId: 4
      },
      ruleCustom: {
        Url: [{ validator: validateRequired, trigger: "blur" }],
        ImageUrl: [{ validator: validateRequired, trigger: "blur" }],
        Sort: [{ validator: validateNum, trigger: "blur" }]
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
        this.formCustom.ImageUrl = data[0].url;
      }
    },
    setForm(data) {
      if (data) {
        for (let key in this.formCustom) {
          if (key === "ImageUrl") {
            var item = [{ name: "", url: data[key], status: "finished" }];
            this.defaultImageUrl = item;
          }
          this.formCustom[key] = data[key];
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
      }
    }
  },
  created() {},
  mounted() {}
};
</script>