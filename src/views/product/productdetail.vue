<template>
    <Row>
        <Col>
        <Card>
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="130">
                <Tabs value="name1">
                    <TabPane label="商品属性" name="name1">
                        <FormItem label="分类" prop="CategoryId">
                            <Cascader style="width: 400px;margin-left: 16px;" :data="cdata" v-model="value1"></Cascader>
                        </FormItem>
                           <FormItem label="品牌" prop="BrandId">
                      
                        <Select v-model="formCustom.BrandId" style="width:400px">
                         <Option v-for="item in brandlist" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
                          </Select>
                        </FormItem>
                        <FormItem label="名称" prop="ProductName">
                        
                            <Input type="text" style="width: 400px" v-model="formCustom.ProductName"></Input>
                        </FormItem>
                         <FormItem label="商品编码" prop="ProductCode">
                            <Input type="text" style="width: 400px" v-model="formCustom.ProductCode"></Input>
                        </FormItem>
                        <FormItem label="售价" prop="MinSalePrice">
                            <Input type="text" style="width: 100px" v-model="formCustom.MinSalePrice" :number="true">
                            <span slot="prepend">￥</span>
                            </Input>
                        </FormItem>
                        <FormItem label="原价" prop="MarketPrice">
                            <Input type="text" style="width: 100px" v-model="formCustom.MarketPrice" :number="true">
                            <span slot="prepend">￥</span>
                            </Input>
                        </FormItem>
                          <FormItem label="库存" prop="Stock">
                            <Input type="text" style="width: 100px" v-model="formCustom.Stock" :number="true">
                            </Input>
                        </FormItem>
                        <FormItem label="商品图片" prop="ImagePath">
                            <PhUpload @get-result="getresult" :default-list="defaultLogo" :format="['jpg','jpeg','png']" :maxsize="1024*10" :maxlength="5">
                            </PhUpload>
                        </FormItem>
                        <FormItem label="分佣金额" prop="ShareMoney">
                            <Input type="text" style="width: 100px" v-model="formCustom.ShareMoney" :number="true"></Input>
                        </FormItem>
                        <FormItem label="运费模板" prop="FreightTemplateId">
                        <Select v-model="formCustom.FreightTemplateId" style="width:400px">
                         <Option v-for="item in freights" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
                          </Select>
                        </FormItem>
                         <FormItem v-if="valuationMethod==1" label="重量(KG)" prop="Weight">
                            <Input type="text" style="width: 100px" v-model="formCustom.Weight" :number="true">
                            </Input>
                        </FormItem>
                         <FormItem  v-if="valuationMethod==2" label="体积(m3)" prop="Volume">
                            <Input type="text" style="width: 100px" v-model="formCustom.Volume" :number="true">
                            </Input>
                        </FormItem>
                        <FormItem label="简介" prop="ShortDescription">
                            <Input type="textarea" :rows="4" style="width: 400px" v-model="formCustom.ShortDescription"></Input>
                        </FormItem>
                        <FormItem label="说明" prop="Description">
                            <UEditor ref="ueditor1"></UEditor>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="saveInfo">提交</Button>
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
import Util from '../../libs/util.js';
import {validateNum,validateRequired,validateInteger} from '../../libs/validate.js';
import UEditor from '../main-components/ueditor.vue';
    export default {
         name: 'page1-detail',
        components: {
          PhUpload,
          UEditor
        },
        data(){
            return{
                  value1: [],
                  formCustom:{
                    Id:this.$route.params.id,
                    ProductName:'',
                    ProductCode:'',
                    ShortDescription:'',
                    FreightTemplateId:0,
                    Weight:0,
                    Volume:0,
                    ImagePath:'',
                    Description:'',
                    ShareMoney:0,
                    BrandId:0,
                    CategoryId:0,
                    CategoryPath:'',
                    MarketPrice:0,
                    MinSalePrice:0,
                    Stock:0
                 },
                 ruleCustom: {
                    ProductName: [
                        { validator: validateRequired, trigger: 'blur' }
                    ],
                    DisplaySequence: [
                        { validator: validateInteger, trigger: "blur" }
                    ],
                    MinSalePrice: [

                        { validator: validateNum, trigger: "blur" }
                    ],
                    MarketPrice: [

                        { validator: validateNum, trigger: "blur" }
                    ],
                    ImagePath:[
                        { validator: validateRequired, trigger: "blur" }  
                    ] ,
                    SalePrice: [

                        { validator: validateNum, trigger: "blur" }
                    ],
                    Stock: [

                        { validator: validateInteger, trigger: "blur" }
                    ],
                     Weight: [

                        { validator: validateNum, trigger: "blur" }
                    ],
                    Volume: [

                        { validator: validateNum, trigger: "blur" }
                    ],
                },
                  defaultLogo: [],
            cdata:[],
            query:{
                Page:1,
                Rows:100,
                KeyWord:'',
                StartDate:'',
                EndDate:'',
                Sidx:'Id',
                Sord:'desc'
            },
            loading2:false,
            editurl:'admin/Products/SaveProducts',
            brandlist:[],
            freights:[],
        }
        },
         beforeDestroy () {
             this.$refs.ueditor1.destoryUE();
        },
        destroyed () {
          
        },
        computed:{
            valuationMethod:function(){
                let vm=this;
                let temp=0;
               let model=  vm.freights.filter(function(e){return e.Id==vm.formCustom.FreightTemplateId});
             
                if(model && model.length>0){
                   temp=model[0].ValuationMethod;
                }
                return temp;
            }
        }
        ,
        watch:{
            value1:function(val,oldvalue){
                 let t1=val.length;
                 if(t1>0)
                 {
                    this.formCustom.CategoryId = val[t1-1];
                    this.formCustom.CategoryPath = val.toString();
                 }
                
            }
        },
        mounted () {
        
           // this.editor = UE.getEditor('editor',{ BaseUrl: '', UEDITOR_HOME_URL: 'src/statics/ueditor/', }); 
            this.getCData();
            this.setForm();

        },
        methods: {
           getresult(data) {
            if (data.length > 0) {
                let t1=[];
                data.forEach(res=>{
                    t1.push(res.url);
                });
                this.formCustom.ImagePath=t1.toString();
            }
        },
        setForm(data) {
   
            if(data)
            {
                let vm=this;
                try{
                   for(let key in this.formCustom)
                   {
                        this.formCustom[key]=data[key];
                        if(key==='ImagePath')
                        {
                            let imgs=data[key].split(',');
                            let t1=[];
                            let i=1;
                           imgs.forEach(res=>{
                              var item={'name':'img'+i,'url':res,'status':'finished'};
                              t1.push(item)
                              i++;
                           });
                            this.defaultLogo=t1;
                        }
                        if(key==='Description' && data[key])
                        {
                            vm.$refs.ueditor1.setUEContent(data[key]);
                        }
                   }

                   if(data["CategoryPath"]){
                       let t1=[];
                       data["CategoryPath"].split(',').forEach(res=>{
                            t1.push(parseInt(res));
                       });
                       this.value1=t1;

                       console.log(t1);
                   }
                }
                catch(error){
                    console.log(error);
                }
               
            
            }else{
                for(let key in this.formCustom)
                {
                    let iarr=['Id','FreightTemplateId','Weight','Volume','ShareMoney','MarketPrice','SalePrice','BrandId'];
                    let notclear=['BrandId','CategoryId','CategoryPath'];
                    if(iarr.indexOf(key)>=0)
                    {
                       
                        
                        this.formCustom[key]=0;
                    }
                    else if(notclear.indexOf(key)>=0)
                    {

                    }
                    else
                    {
                        this.formCustom[key]="";
                    }
                    
                }
               // this.value1=[];
                this.defaultLogo=[];
                this.$refs.ueditor1.setUEContent('');
            }
            
        },
        getCData () {
            var pdata=this.query;
            let vm=this;

            Util.post("api/Products/GetOtherList",pdata,vm,function(res,data){
                if(res==='1')
                {
                    var result=data.data
                    if(result){
                        if(result.Categories){
                            vm.cdata =result.Categories;   
                        }else{
                             vm.cdata = [];
                        }
                        if(result.Brands){
                            vm.brandlist = result.Brands;   
                        }else{
                             vm.brandlist = [];
                        }
                         if(result.Freights){
                            vm.freights = result.Freights;   
                        }else{
                             vm.freights = [];
                        }
                    }
                   
                }else{
                   
                    
                }
            
            });
            if(this.formCustom.Id&&this.formCustom.Id!=0)
            {
                 Util.post("admin/Products/GetProductsDetail",{Id:this.formCustom.Id},vm,function(res,data){
                if(res==='1')
                {
                    vm.setForm(data.data);
                }else{
                        
                     vm.$Message.error('商品信息有误');
                }
            
               });
            }
        },
        saveInfo(){
            this.loading2=true;
            this.$refs["formCustom"].validate((valid) => {
            if (valid) {
                let vm=this;
                let pdata=this.formCustom;
                if(!pdata["BrandId"]){
                    pdata["BrandId"]=0;
                }
                 if(!pdata["CategoryId"]){
                    pdata["CategoryId"]=0;
                }
                 if(!pdata["FreightTemplateId"]){
                    pdata["FreightTemplateId"]=0;
                }
                let cont=vm.$refs.ueditor1.getUEContent();
               pdata.Description=cont;
                Util.post(this.editurl,pdata,vm,function(res,msg){
                    if(res==='1')
                    {
                        vm.$Message.success('保存成功');
                        vm.loading2=false;
                        if(!pdata["Id"]||pdata["Id"]===0)
                        {
                            vm.setForm();
                        }
                        
                    }else{
                        if(msg && msg!="")
                        {
                            vm.$Message.error(msg);
                        }else{
                             vm.$Message.error('保存失败');
                        }
                        vm.loading2=false;
                    }      
                });
            } else {
                console.log('error submit!!');
                this.loading2=false;
                return false;
            }
        });
           
        }

        }
    };
</script>