<style lang="less">
@import "./form.less";
</style>
<template>
    <list :show-search="true" :show-date="false" :show-key-word="true" :show-add-button="true" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-Width="500" @set-form="setForm" :other-query="otherQuery">
        <template slot="fromtop">
          <div class="ivu-modal-header"><div class="ivu-modal-header-inner">店长管理</div></div>
        </template>
        <template slot="frommodel">
            <FormItem label="* 所属门店" prop="StoreId">
              <Select v-model="formCustom.StoreId" style="width:300px" number>
                    <Option v-for="item in storelist" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="* 真实姓名" prop="RealName">
                <Input type="text" style="width: 300px"  v-model="formCustom.RealName"></Input>
            </FormItem>
            <FormItem label="  用户头像"  prop="Avatar">
                 <PhUpload @get-result="getresult" :default-list="defaultImageUrl" :format="['jpg','jpeg','png']" :maxsize="1024*10">
                </PhUpload>
            </FormItem>
            <FormItem label="* 用户手机号" prop="UserName">
                  <Input type="text" style="width: 300px" placeholder="店长端登录手机号(默认密码123456)"  v-model="formCustom.UserName"></Input>
            </FormItem>
            <FormItem label="是否管理员" style="display:none"  >
                  <Input type="text" style="width: 300px"  v-model="formCustom.IsAdmin"></Input>
            </FormItem>
            <FormItem label="是否启用" style="display:none"  >
                    <Input type="text" style="width: 300px"  v-model="formCustom.IsEnable"></Input>
            </FormItem>
            <FormItem label="是否删除" style="display:none"  >
                    <Input type="text" style="width: 300px"  v-model="formCustom.IsDeleted"></Input>
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
  name: "storemanager-table",
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
      updateUrl: "admin/Store/Manager/AddOrUpdate",
      deleteUrl: "admin/Store/Manager/Delete",
      addUrl: "admin/Store/Manager/AddOrUpdate",
      getUrl: "admin/Store/Manager/GetList",
      formCustom: {
        Id: 0,
        RealName: "", //真实姓名
        UserName: "", //用户手机号码
        IsAdmin: true, //是否管理员
        Avatar: "", //头像
        IsDeleted: false, //是否删除
        StoreId: 0, //门店信息
        IsEnable: true //是否启用
      },
      ruleCustom: {
        RealName: [{ validator: validateRequired, trigger: "blur" }],
        StoreId: [{ validator: validateNum, trigger: "blur" }],
        UserName: [{ validator: validateRequired, trigger: "blur" }]
      },
      modalWidth: 500,
      defaultImageUrl: [],
      otherQuery: {
        TypeId: this.slideType
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
            case "IsAdmin":
               this.formCustom[key] = true;
              break;
            case "IsEnable":
              this.formCustom[key] = true;
              break;
            case "IsDeleted":
              this.formCustom[key] = false;
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