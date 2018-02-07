<style lang="less">
@import "./form.less";
</style>
<template>
  <tree-grid :items='data' :columns='columns' :modalWidth="500" :update-url="updateUrl" :delete-url="deleteUrl" :add-url="addUrl"
    :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" @set-form="setForm" @set-clist="setclist">
    <template slot="formmodel">
        <FormItem label="上级分类" prop="ParentId">
        <Select v-model="formCustom.ParentId" @on-change="checkcategory" style="width:200px">
             <Option v-for="item in categorylist" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
      </FormItem>
      <FormItem label="名称" prop="Name">
        <Input type="text" style="width: 300px" v-model="formCustom.Name"></Input>
      </FormItem>
      <FormItem label="排序值" prop="Sort">
        <Input type="text" style="width: 100px" v-model="formCustom.Sort" :number="true"></Input>
      </FormItem>
      
    </template>
  </tree-grid>
</template>
<script>
import TreeGrid from "../main-components/treegrid.vue";
import list from "../main-components/list.vue";
import { validateNum, validateRequired } from "../../libs/validate.js";
export default {
   name: "arealist-table",
   components: {
       TreeGrid
  },
  data() {
    return {
      columns: [ ],
      data: [],
      updateUrl: "admin/Area/AddOrUpdate",
      deleteUrl: "admin/Area/Delete",
      addUrl: "admin/Area/AddOrUpdate",
      getUrl: "admin/Area/GetList",
      formCustom: {
           Id: 0,
           Name: "",
           Sort: 99,
           ParentId: 0
      },
      ruleCustom: {
         Name: [{ validator: validateRequired, trigger: "blur" }],
         Sort: [{ validator: validateNum, trigger: "blur" }]
      },
      modalWidth: 500,
      defaultIcon: [],
      categorylist: [],
      selectcategoryname:'一级分类'

    };
  },
  methods: {
    getresult(data) {
      if (data.length > 0) {
        this.formCustom.Icon = data[0].url;
      }
    },
    setForm(items,data) {
 
      let  list=[{'id':0,'name':'一级分类','depth':1}];
      items.forEach(res=>{
          let  item={'id':res.Id,'name':"--"+res.Name};
          list.push(item);
          res.Childrens.forEach(tt=>{
               let  tt2={'id':tt.Id,'name':"----"+tt.Name};
                  list.push(tt2);
          })
      });
           this.categorylist=list;
       if(data)
       {
           for(let key in this.formCustom)
           {
              if(key==='Icon')
              {
                var item=[{'name':'','url':data[key],'status':'finished'}];
                 this.defaultIcon=item;
              }
              this.formCustom[key]=data[key]
             
           }
       
       }else{
            this.formCustom.Id=0;
            this.formCustom.Name='';
            this.formCustom.Sort=99;
            this.formCustom.ParentId=0;
            this.defaultIcon=[];
       }
        
    },
    checkcategory(item,t){
      console.log(t);
    },
    setclist(data){
      categorylist=data;
    }
    
  }
};
</script>