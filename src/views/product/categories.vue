<!--
  <Dropdown v-for="(c1,index) in categorylist" @on-click='checkcategory'>
                            <a href="javascript:void(0)">{{selectcategoryname}}<Icon type="arrow-down-b"></Icon></a>
                            <DropdownMenu slot="list"  >
                                <DropdownItem :name='c1.Id+","+c1.Name+","+(c1.Depth+1)' v-if="c1.Childrens.length<=0">{{c1.Name}}</DropdownItem>
                                <Dropdown placement="right-start" v-if="c1.Childrens.length>0">
                                    <DropdownItem :name='c1.Id+","+c1.Name+","+(c1.Depth+1)'> {{c1.Name}}
                                        <Icon type="ios-arrow-right"></Icon>
                                    </DropdownItem>

                                    <DropdownMenu slot="list" v-for="(c2,index2) in c1.Childrens" >
                                        <!--  <DropdownItem v-if="c2.childs.length<=0"> {{c2.name}}</DropdownItem>
                                        <Dropdown placement="right-start" v-if="c2.childs.length>0">
                                            <DropdownItem> {{c2.name}}
                                                <Icon type="ios-arrow-right"></Icon>
                                            </DropdownItem>
                                            <DropdownMenu slot="list" v-for="(c3,index3) in c2.childs">
                                                <DropdownItem> {{c3.name}}</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>  <DropdownItem :name='c2.Id+","+c2.Name+","+(c2.Depth+1)'> {{c2.Name}}</DropdownItem>
                                        
                                    </DropdownMenu>
                                </Dropdown>
                            </DropdownMenu>
                        </Dropdown>
-->


<template>
  <tree-grid :items='data' :columns='columns' :modalWidth="500" :update-url="updateUrl" :delete-url="deleteUrl" :add-url="addUrl"
    :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" @set-form="setForm" @set-clist="setclist">
    <template slot="formmodel">
      <FormItem label="名称" prop="Name">
        <input type="hidden" :value='formCustom.Depth' />
        <Input type="text" style="width: 300px" v-model="formCustom.Name"></Input>
      </FormItem>
      <FormItem label="分类图标" prop="Icon">
        <PhUpload @get-result="getresult" :default-list="defaultIcon" :format="['jpg','jpeg','png']" :maxsize="1024*10">
        </PhUpload>
      </FormItem>
      <FormItem label="排序值" prop="DisplaySequence">
        <Input type="text" style="width: 100px" v-model="formCustom.DisplaySequence" :number="true"></Input>
      </FormItem>
       <FormItem label="所属类目" prop="TypeId">

        <Select v-model="formCustom.TypeId"  style="width:200px">
                         <Option value="0" key="0">请选择</Option>
                         <Option v-for="item in typelist" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
                    </Select>
      </FormItem>
      <FormItem label="上级分类" prop="ParentCategoryId">

        <Select v-model="formCustom.ParentCategoryId" @on-change="checkcategory" style="width:200px">
                         <Option v-for="item in categorylist" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
      </FormItem>
      <FormItem label="是否推荐" prop="IsRecommend">
        <Checkbox v-model="formCustom.IsRecommend" />
      </FormItem>
    </template>
  </tree-grid>
</template>
<script>
import TreeGrid from "../main-components/treegrid.vue";
import PhUpload from "../main-components/phupload.vue";
import Util from "../../libs/util.js";

export default {
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入名称"));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        callback();
      }, 1000);
    };
    const validateIcon = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请上传分类图标"));
      }
      callback();
    };
    const validateDisplaySequence = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入排序值"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字"));
        } else {
          callback();
        }
      }, 1000);
    };

    return {
      columns: [],
      data: [],
      updateUrl: "admin/Products/SaveCategories",
      deleteUrl: "admin/Products/DeleteCategories",
      addUrl: "admin/Products/SaveCategories",
      getUrl: "admin/Products/GetCategoriesList",
      formCustom: {
        Id: 0,
        Name: "",
        IsRecommend: false,
        Icon: "",
        DisplaySequence: 1,
        ParentCategoryId: 0,
        Depth: 1,
        Path: "",
        TypeId: 0
      },
      ruleCustom: {
        Name: [{ validator: validateName, trigger: "blur" }],
        // Icon: [{ validator: validateIcon, trigger: "blur" }],
        DisplaySequence: [
          { validator: validateDisplaySequence, trigger: "blur" }
        ]
      },
      modalWidth: 500,
      defaultIcon: [],
      categorylist: [],
      selectcategoryname: "一级分类",
      typelist: []
    };
  },
  components: {
    TreeGrid,
    PhUpload
  },
  mounted() {
    this.getOtherList();
  },
  methods: {
    getresult(data) {
      if (data.length > 0) {
        this.formCustom.Icon = data[0].url;
      }
    },
    setForm(items, data) {
      let list = [{ id: 0, name: "一级分类", depth: 1 }];
      items.forEach(res => {
        let item = { id: res.Id, name: "--" + res.Name, depth: res.Depth + 1 };
        list.push(item);
        res.Childrens.forEach(tt => {
          let tt2 = { id: tt.Id, name: "----" + tt.Name, depth: tt.Depth + 1 };
          list.push(tt2);
        });
      });
      this.categorylist = list;
      if (data) {
        for (let key in this.formCustom) {
          if (key === "Icon") {
            var item = [{ name: "", url: data[key], status: "finished" }];
            this.defaultIcon = item;
          }
          this.formCustom[key] = data[key];
        }
      } else {
        this.formCustom.Id = 0;
        this.formCustom.Icon = "";
        this.formCustom.Name = "";
        this.formCustom.IsRecommend = false;
        this.formCustom.DisplaySequence = 1;
        this.formCustom.ParentCategoryId = 0;
        this.formCustom.Depth = 1;
        this.formCustom.Path = "";
        this.defaultIcon = [];
      }
    },
    checkcategory(item, t) {
      // this.formCustom.Depth=attrs[2];
      console.log(t);
    },
    setclist(data) {
      categorylist = data;
    },
    getOtherList() {
      let vm = this;
      Util.post("admin/Products/GetDetailOtherList", {}, vm, function(res,data) {
      
      console.log(data);
      console.log("---");
        if (res === "1") {
          vm.typelist = data.data.TypeList;
        } else {
          vm.$Message.error("信息有误");
        }
      });
    }
  }
};
</script>