<template>
    <list :show-search="false" :show-date="true" :show-key-word="true" :show-add-button="true" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-Width="500" @set-form="setForm" :other-query="otherQuery">
        <template slot="frommodel">
           
            <FormItem label="轮播图" prop="ImageUrl">
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
  name: "page1-table",
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
      updateUrl: "admin/Slideads/AddOrUpdate",
      deleteUrl: "admin/Slideads/Delete",
      addUrl: "admin/Slideads/AddOrUpdate",
      getUrl: "admin/Slideads/GetList",
      formCustom: {
        Id: 0,
        Url: "",
        Sort: "",
        ImageUrl: "",
        Description: "",
        TypeId: 0
      },
      ruleCustom: {
        Url: [{ validator: validateRequired, trigger: "blur" }],
        ImageUrl: [{ validator: validateRequired, trigger: "blur" }],
        DisplaySequence: [{ validator: validateNum, trigger: "blur" }]
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
  watch: {
    slideType: function(val, old) {
      alert(val);
    }
  },
  mounted() {}
};
</script>