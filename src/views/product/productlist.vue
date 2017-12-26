<template>
    <list :show-search="false" :show-date="true" :show-key-word="true" :show-add-button="true" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" modal-Width="500" @set-form="setForm">
        <template slot="frommodel">
            <FormItem label="名称" prop="ProductName">
                <Input type="text" style="width: 300px" v-model="formCustom.ProductName"></Input>
            </FormItem>
            <FormItem label="商品图片" prop="ImagePath">
                <PhUpload @get-result="getresult" :default-list="defaultLogo" :format="['jpg','jpeg','png']" :maxsize="1024*10" :maxlength="5">
                </PhUpload>
            </FormItem>
            <FormItem label="排序值" prop="DisplaySequence">
                <Input type="text" style="width: 100px" v-model="formCustom.DisplaySequence" :number="true"></Input>
            </FormItem>
               <FormItem label="分佣金额" prop="ShareMoney">
                <Input type="text" style="width: 100px" v-model="formCustom.ShareMoney" :number="true"></Input>
            </FormItem>
              <FormItem label="说明" prop="Description">
                <Input type="text" style="width: 300px" v-model="formCustom.Description"></Input>
            </FormItem>
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
            updateUrl:"api/Products/SaveProducts",
            deleteUrl:"api/Products/DeleteProducts",
            addUrl:"api/Products/SaveProducts",
            getUrl:"api/Products/GetProductsList",
            formCustom:{
                 Id:0,
                 ProductName:'',
                 ProductCode:'',
                 ShortDescription:'',
                 FreightTemplateId:0,
                 Weight:0,
                 Volume:0,
                 DisplaySequence:'',
                 ImagePath:'',
                 Description:'',
                 ShareMoney:0,
                 BrandId:0,
                 CategoryId:0,
                 MarketPrice:0
            },
            ruleCustom: {
                    ProductName: [
                        { validator: validateRequired, trigger: 'blur' }
                    ],
                    DisplaySequence: [
                          { validator: validateRequired, trigger: "blur" } ,
                        { validator: validateNum, trigger: "blur" }
                    ],
                    ShareMoney: [
                        { validator: validateRequired, trigger: "blur" } ,
                        { validator: validateNum, trigger: "blur" }
                    ],
                    MarketPrice: [
                        { validator: validateRequired, trigger: "blur" } ,
                        { validator: validateNum, trigger: "blur" }
                    ],
                    ImagePath:[
                        { validator: validateRequired, trigger: "blur" }  
                    ]
            },
            modalWidth:500,
            defaultLogo: [],
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
            
        }
    },
    created () {
     
    }
};
</script>