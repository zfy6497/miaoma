<template>
    <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="true" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" modal-Width="500" @set-form="setForm" :other-query="otherQuery" :routername="'refund_detail'">
        <template slot="frommodel">
            <FormItem label="名称" prop="Name">
                <Input type="text" style="width: 300px" v-model="formCustom.Name"></Input>
            </FormItem>
            <FormItem label="分类图标" prop="Logo">
                <PhUpload @get-result="getresult" :default-list="defaultLogo" :format="['jpg','jpeg','png']" :maxsize="1024*10">
                </PhUpload>
            </FormItem>
            <FormItem label="排序值" prop="DisplaySequence">
                <Input type="text" style="width: 100px" v-model="formCustom.DisplaySequence" :number="true"></Input>
            </FormItem>
              <FormItem label="说明" prop="Description">
                <Input type="text" style="width: 300px" v-model="formCustom.Description"></Input>
            </FormItem>
            <FormItem label="是否推荐" prop="IsRecommend">
                <Checkbox v-model="formCustom.IsRecommend" />
            </FormItem>
        </template>
    </list>
</template>

<script>
import PhUpload from "../main-components/phupload.vue";
import list from '../main-components/list.vue';
export default {
    name: 'page1-table',
    components: {
        list,
        PhUpload
    },
    data () {

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
            return callback(new Error("请上传品牌图标"));
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
            updateUrl:"admin/OrderRefunds/Save",
            deleteUrl:"admin/OrderRefunds/Delete",
            addUrl:"admin/OrderRefunds/Save",
            getUrl:"admin/OrderRefunds/GetList",
            formCustom:{
                 Id:0,
                 Name:'',
                 DisplaySequence:'',
                 Logo:'',
                 Description:'',
                 IsRecommend:false
            },
            ruleCustom: {
                    Name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    DisplaySequence: [
                        { validator: validateDisplaySequence, trigger: "blur" }
                    ]
            },
            modalWidth:500,
            defaultLogo: [],
            type:this.$route.params.type,
            otherQuery:{
                Type:this.$route.params.type
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
                    else  if(key==='Id')
                    {
                        this.formCustom[key]=0;
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
        
    },
    mounted(){
    },
   watch: {
    // 如果路由有变化，会再次执行该方法
      '$route': function(){
          this.otherQuery.Type=this.$route.params.type;
      }
    }
};
</script>