<style lang="less">
@import "./form.less";
</style>
<template>
    <list :show-search="true" :show-date="false" :show-key-word="true" :show-add-button="true" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-Width="500" @set-form="setForm" :other-query="otherQuery">
        <template slot="fromtop">
          <div class="ivu-modal-header"><div class="ivu-modal-header-inner">婴泳项目</div></div>
        </template>
        <template slot="frommodel">
            <FormItem label="* 所属门店" prop="StoreId">
              <Select v-model="formCustom.StoreId" disabled  style="width:300px" number>
                    <Option v-for="item in storelist" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="项目名称" prop="Title">
                <Input type="text" style="width: 300px" v-model="formCustom.Title"></Input>
            </FormItem>
            <FormItem label="价格" prop="Price">
                <Input type="text" style="width: 100px" v-model="formCustom.Price" :number="true"></Input>
            </FormItem>
            <FormItem label="项目头像" prop="Avatar">
                <PhUpload @get-result="getresult" :default-list="defaultImageUrl" :format="['jpg','jpeg','png']" :maxsize="1024*10">
                </PhUpload>
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
  name: "baby_list",
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
      updateUrl: "admin/BabyStroke/AddOrUpdate",
      deleteUrl: "admin/BabyStroke/Delete",
      addUrl: "admin/BabyStroke/AddOrUpdate",
      getUrl: "admin/BabyStroke/GetList",
      formCustom: {
        Id: 0,
        Title: "",
        Price: 0,
        Avatar: "",
        Remark: "",
        StoreId:this.$store.state.user.type==0? 0:this.$route.params.id
      },
      ruleCustom: {
        Title: [{ validator: validateRequired, trigger: "blur" }],
        Avatar: [{ validator: validateRequired, trigger: "blur" }],
        Price: [{ validator: validateNum, trigger: "blur" }]
      },
      modalWidth: 500,
      defaultImageUrl: [],
      otherQuery: {
        TypeId: this.slideType,
        SId: this.$store.state.user.type==0? 0:this.$route.params.id
      },
      storelist: []
    };
  },
  methods: {
    getresult(data) {
      if (data.length > 0) {
        this.formCustom.Avatar = data[0].url;
      }
    },
    setForm(data) {
      if (data) {
        for (let key in this.formCustom) {
          if (key === "Avatar") {
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
            case "StoreId":
              this.formCustom[key] = this.$route.params.id;
              break;
            default:
              this.formCustom[key] = "";
              break;
          }
        }
        this.defaultImageUrl = [];
      }
    },
    loadStore() {
      let vm = this;
      Util.post("admin/Store/GetAllStore", {}, vm, function(res, data) {
        if (res === "1") {
          if (data.totalCount > 0) {
            vm.storelist = data.data;
          } else {
            vm.storelist = [];
          }
        }
      });
    }
  },
  mounted() {
    this.loadStore();
  }
};
</script>