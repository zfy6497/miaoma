<template>
    <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="false" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" :modal-width="650" :scrollable="true"
        @set-form="setForm" :routername="'product_detail'">
        <template slot="rightbtn">
            <span @click="addgolink"  style=""><Button type="primary"  icon="add">新增</Button></span>
        </template>
        <template slot="frommodel">

            <Tabs value="name1">
                <TabPane label="商品属性" name="name1">
                    <FormItem label="分类" prop="CategoryId">
                        <Cascader style="width: 400px;margin-left: 16px;" :data="cdata" v-model="value1"></Cascader>
                    </FormItem>
                    <FormItem label="名称" prop="ProductName">
                        <Input type="text" style="width: 400px" v-model="formCustom.ProductName"></Input>
                    </FormItem>

                    <FormItem label="售价" prop="SalePrice">
                        <Input type="text" style="width: 100px" v-model="formCustom.SalePrice" :number="true">
                        <span slot="prepend">￥</span>
                        </Input>
                    </FormItem>
                    <FormItem label="原价" prop="MarketPrice">
                        <Input type="text" style="width: 100px" v-model="formCustom.MarketPrice" :number="true">
                        <span slot="prepend">￥</span>
                        </Input>
                    </FormItem>
                    <FormItem label="商品图片" prop="ImagePath">
                        <PhUpload @get-result="getresult" :default-list="defaultLogo" :format="['jpg','jpeg','png']" :maxsize="1024*10" :maxlength="5">
                        </PhUpload>
                    </FormItem>
                    <FormItem label="分佣金额" prop="ShareMoney">
                        <Input type="text" style="width: 100px" v-model="formCustom.ShareMoney" :number="true"></Input>
                    </FormItem>
                    <FormItem label="简介" prop="ShortDescription">
                        <Input type="textarea" :rows="4" style="width: 400px" v-model="formCustom.ShortDescription"></Input>
                    </FormItem>
                     <FormItem label="简介" prop="ShortDescription">
                        <Input type="textarea" :rows="4" style="width: 400px" v-model="formCustom.ShortDescription"></Input>
                    </FormItem>
                     <FormItem label="简介" prop="ShortDescription">
                        <Input type="textarea" :rows="4" style="width: 400px" v-model="formCustom.ShortDescription"></Input>
                    </FormItem>
                </TabPane>
                <TabPane label="商品介绍" name="name2">
                    <FormItem label="说明" prop="Description">
                        <Input type="text" style="width: 300px" v-model="formCustom.Description"></Input>
                    </FormItem>
                </TabPane>

            </Tabs>
        </template>



    </list>
</template>

<script>
import PhUpload from "../main-components/phupload.vue";
import list from '../main-components/list.vue';
import Util from '../../libs/util.js';
import {validateNum,validateRequired} from '../../libs/validate.js';
export default {
    name: 'page1-table',
    components: {
        list,
        PhUpload
    },
    data () {
        return {
             value1: [],
            updateUrl:"admin/Products/SaveProducts",
            deleteUrl:"admin/Products/DeleteProducts",
            addUrl:"admin/Products/SaveProducts",
            getUrl:"admin/Products/GetProductsList",
            formCustom:{
                 Id:0,
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
                 MarketPrice:0,
                 SalePrice:0
            },
            ruleCustom: {
                    ProductName: [
                        { validator: validateRequired, trigger: 'blur' }
                    ],
                    DisplaySequence: [
                        { validator: validateNum, trigger: "blur" }
                    ],
                    ShareMoney: [

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
            },
            modalWidth:650,
            defaultLogo: [],
            cdata:[{"label":"请选择分类",'value':0}],
            query:{
                Page:1,
                Rows:100,
                KeyWord:'',
                StartDate:'',
                EndDate:'',
                Sidx:'Id',
                Sord:'desc'
            }
        };
    },
    methods: {
        getresult(data) {
            if (data.length > 0) {
                this.formCustom.Logo = data[0].url;
            }
        },
        setForm(data) {
            if(data)
            {
                for(let key in this.formCustom)
                {
                    if(key==='Logo')
                    {
                        var item=[{'name':'','url':data[key],'status':'finished'}];
                        this.defaultLogo=item;
                    }
                    this.formCustom[key]=data[key]
                }
            
            }else{
                for(let key in this.formCustom)
                {
                    if(key==='IsRecommend')
                    {
                        this.formCustom[key]=false;
                    }
                    else
                    {
                        this.formCustom[key]="";
                    }
                    
                }
                this.defaultLogo=[];
            }
            
        },
        getCData () {
            var pdata=this.query;
            let vm=this;

            Util.post("admin/Products/GetCategoriesSelectList",pdata,vm,function(res,data){
                if(res==='1')
                {
                    if(data.totalCount>0)
                    {
                
                        vm.cdata = data.data;
                    
                    }else{
                        vm.cdata = [];
                    }
                }else{
                   
                    
                }
            
            });
      },
      addgolink(){
          this.$router.push({ name: 'product_detail', params: { id: 0 } })
      }
    },
    created () {
     
    },
    mounted () {
        this.getCData();
    }
};
</script>