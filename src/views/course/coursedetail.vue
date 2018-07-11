<template>
   <Row>
       <Col>
         <Card>
              <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="70">
                <Tabs value="name1">
                    <TabPane label="课程信息" name="name1">
                        <FormItem label="名称" prop="Title">
                <Input type="text" style="width: 300px" v-model="formCustom.Title" />
            </FormItem>
            <FormItem label="课程分类" prop="CourseCategoryId">
                    <Select v-model="formCustom.CourseCategoryId"  style="width:200px">
                         <Option value="0" key="0">请选择</Option>
                         <Option v-for="item in typelist" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
                    </Select>
            </FormItem>
            <FormItem label="售价" prop="Price">
                            <Input type="text" style="width: 100px" v-model="formCustom.Price" :number="true">
                            <span slot="prepend">￥</span>
                            </Input>
            </FormItem>
              <FormItem label="时长" prop="Price">
                    <Input type="text" style="width: 100px" v-model="formCustom.Times" :number="true">  <span slot="append">分钟</span></Input>
                  
            </FormItem>
             <FormItem label="课程图片" prop="Thumbnail">
                <PhUpload @get-result="getresult2" :default-list="defaultLogo" :format="['jpg','jpeg','png']" :maxsize="1024*10">
                </PhUpload>
            </FormItem>
             <FormItem label="是否推荐" prop="IsRecommend">
        <Checkbox v-model="formCustom.IsRecommend" />
      </FormItem>

       <FormItem label="课节数" prop="">
                             <template  >

                                    <table   width="980px" style="width:900px;">
                                         <thead>
                                               <tr  >
                                                   <td>标题</td>
                                                   <td>视频/音频文件</td>
                                                   <td>视频/音频图片</td>
                                                   <td>时长</td>
                                                   <td>操作</td>
                                               </tr>
                                         </thead>
                                         <tbody>
                                                <tr v-for="item in items" v-if="!item.isdel">
                                                    <td>
                                                           <Input type="text" style="width: 100px" v-model="item.Title" />
                                                    </td>
                                                    <td>
                                                           <PhUpload @get-result="getresult" :indexid="item.indexid" :default-list="item.defaultUrl" :format="['mp4','mp3']" :maxsize="3*1024*1024" :uptype="1"> </PhUpload>
                                                    </td>
                                                      <td>
                                                           <PhUpload @get-result="getresult1" :indexid="item.indexid" :default-list="item.defaultImage" :format="['jpg','jpeg','png']" :maxsize="1024*10"> </PhUpload>
                                                    </td>
                                                     <td>
                                                           <Input type="text" style="width: 100px" v-model="item.Times" :number="true">  <span slot="append">分钟</span></Input>
                                                    </td>
                                                    <td>
                                                                   <Button type="default"  @click="deleteitem(item.indexid)">删除</Button>
                                                    </td>
                                                </tr>
                                         </tbody>
                                    </table>
                             </template>
                                   <Button type="default"  @click="additem">添加</Button>
                        </FormItem>
            <FormItem label="简介" prop="ShortDescription">
                            <Input type="textarea" :rows="4" style="width: 400px" v-model="formCustom.ShortDescription"></Input>
             </FormItem>
            <FormItem label="说明" prop="Description">
                            <UEditor ref="ueditor1"></UEditor>
             </FormItem>
              <FormItem>
                            <Button type="primary" :loading="loading2" @click="saveInfo">提交</Button>
            </FormItem>
                    </TabPane>
                </Tabs>
              </Form>
         </Card>
       </Col>
    </Row>
</template>
<script>
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
    PhUpload,
    UEditor
  },
  data() {
    return {
      editurl: "admin/Course/Save",
      formCustom: {
        Id: this.$route.params.id,
        Title: "",
        Price: 0,
        CourseCategoryId: 0,
        ShortDescription: "",
        Times: 0,
        Description: "",
        Thumbnail:""
      },
      ruleCustom: {
        Title: [{ validator: validateRequired, trigger: "blur" }],
        CourseCategoryId: [{ validator: validateRequired, trigger: "blur" }],
        Price: [{ validator: validateNum, trigger: "blur" }],
        Times: [{ validator: validateInteger, trigger: "blur" }],
        Thumbnail: [{ validator: validateRequired, trigger: "blur" }],
      },
      typelist: [],
      defaultitemimg: [],
      loading2: false,
      itemcolumns:[],
      items:[],
      defaulitemtvedio:[],
      defaultLogo:[],
      indexid:0
    };
  },
  methods: {
    
    getresult(data,indexid) {
      if (data.length > 0) {
        let item=this.items.filter(res=>{return res.indexid==indexid});
        if(item && item.length>0){
           item[0].VideoUrl = data[0].data;
        }
      }
    },
     getresult1(data,indexid) {
      if (data.length > 0) {
        let item=this.items.filter(res=>{return res.indexid==indexid});
        if(item && item.length>0){
           item[0].VideoImage = data[0].data;
        }
        
      }
    },
     getresult2(data) {
        if (data.length > 0) {
            this.formCustom.Thumbnail = data[0].url;
        }
    },
    additem(){
     this.indexid++;
      let item={Title:"",Times:'',indexid:this.indexid,VideoUrl:'',VideoImage:'',Cid:this.formCustom.Id,isdel:false,Times:0};
      this.items.push(item);
      console.log(this.items);
    }
    ,
    deleteitem(indexid){
        let item=this.items.filter(res=>{return res.indexid==indexid});
        if(item && item.length>0){
           item[0].isdel = true;
        }
    }
    ,
    setForm(data) {
      let vm=this;
      if (data) {
        for (let key in this.formCustom) {
          this.formCustom[key] = data[key];
          if (key === "Thumbnail") {
            var item = [{ name: "", url: data[key], status: "finished" }];
            vm.defaultLogo = item;
          }
          if (key === "Description" ) {
              vm.$refs.ueditor1.setUEContent(data[key]);
            }
        }
        if(data.Items && data.Items.length>0){
           data.Items.forEach((item,index)=>{
              vm.indexid++;
              item.indexid=vm.indexid;

               var itemimages = [{ name: "", url: item.VideoImage, status: "finished" }];
               var itemurls = [{ name: "", url: item.VideoUrl, status: "finished" }];
              item.defaultImage = itemimages;
              item.defaultUrl = itemurls;
              item.isdel=false;
           })
           this.items=data.Items;
        }

      } else {
        for (let key in this.formCustom) {
          if (key === "Id") {
            this.formCustom[key] = 0;
          } else {
            this.formCustom[key] = "";
          }
        }
        this.formCustom.IsRecommend = false;
        this.defaultLogo = [];
      }
    },
    getDetailInfo() {
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

      if (this.formCustom.Id && this.formCustom.Id != 0) {
        Util.post(
          "admin/Course/GetModel",
          { Id: this.formCustom.Id },
          vm,
          function(res, data) {
            if (res === "1") {
              vm.setForm(data.data);
            } else {
              vm.$Message.error("商品信息有误");
            }
          }
        );
      }
    },
    saveInfo() {
      this.loading2 = true;
      this.$refs["formCustom"].validate(valid => {
        if (valid) {
          let vm = this;
          let pdata = this.formCustom;
          if (!pdata["CourseCategoryId"]) {
            pdata["CourseCategoryId"] = 0;
          }
          let items = vm.items.filter(function(e) {
            return !e.isdel;
          });
          if(items.length<=0){
            vm.$Message.error("请录入课程信息");
                    vm.loading2 = false;
            return false;
          }
          pdata.Items = items;
          let cont = vm.$refs.ueditor1.getUEContent();
          pdata.Description = cont;

          Util.post(this.editurl, pdata, vm, function(res, msg) {
            if (res === "1") {
              vm.$Message.success("保存成功");
              vm.loading2 = false;
              if (!pdata["Id"] || pdata["Id"] === 0) {
                vm.setForm();
              }
            } else {
              if (msg && msg != "") {
                vm.$Message.error(msg);
              } else {
                vm.$Message.error("保存失败");
              }
              vm.loading2 = false;
            }
          });
        } else {
          console.log("error submit!!");
          this.loading2 = false;
          return false;
        }
      });
    },
    getitems(){
        
    }
  },
  created() {},
  mounted() {
    this.getDetailInfo();
    this.setForm();
  },
  beforeDestroy() {
    this.$refs.ueditor1.destoryUE();
  }
};
</script>

