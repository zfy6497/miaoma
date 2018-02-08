<template>
    <list :show-search="false" :show-date="true" :show-key-word="true" :show-add-button="true" :show-page="true"  :modal-list="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-width="800" @set-form="setForm" :other-query="otherQuery" :modal-select="selected" :modalList="true" :recommend-type="recommendType">
        <template slot="ModalList">
           
            <list :show-search="true" :show-date="true" :show-key-word="true"  :show-add-button="false" :show-page="true"  :get-url="'admin/Products/GetCheckList'" :other-query="otherQuery"  :modal-select="selected" @set-Select="setSelect">
      
           </list>
            
        </template>
    </list>
</template>

<script>

import list from "../main-components/list.vue";
import { validateNum, validateRequired } from "../../libs/validate.js";
export default {
  name: "page1-table",
  components: {
    list
  },
  props: {
    recommendType: {
      Type: Number,
      default: 0
    }
  },
  data() {
    return {
      updateUrl: "admin/Recommend/Save",
      deleteUrl: "admin/Recommend/Delete",
      addUrl: "admin/Recommend/SaveChecks",
      getUrl: "admin/Recommend/GetProductList",
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
        Type: this.recommendType
      },
      selected:[]
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
    },
    setSelect(data){
        this.selected=data;
    }
  },
  created() {},
  watch: {
    slideType: function(val, old) {

    }
  },
  mounted() {}
};
</script>