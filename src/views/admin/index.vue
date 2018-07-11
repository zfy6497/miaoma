<style lang="less">
    @import '../../styles/common.less';
    @import '../../tables/components/table.less';
</style>

<template>
    <div>
        <Card>
            <Row>
                <DatePicker type="date" placeholder="请选择开始日期" :format="formatDate" v-model="query.StartDate" style="width: 200px"></DatePicker>
                <DatePicker type="date" placeholder="请选择结束日期" :format="formatDate" v-model="query.EndDate" style="width: 200px"></DatePicker>
                <Input v-model="query.KeyWord" placeholder="请输入关键字搜搜..." style="width: 200px" />
                <span @click="search" style="margin: 0 10px;"><Button type="primary" :loading="loading" icon="search">搜索</Button></span>
                <Button @click="cancelSearch" type="ghost">取消</Button>
                <template>
                    <div style="float: right;">
                        <span @click="addModal" style=""><Button type="primary"  icon="add">新增</Button></span>
                    </div>
                </template>

            </Row>
            <Row>
                <div class="margin-top-10">
                    <can-edit-table refs="table4" v-model="editInlineAndCellData" :hover-show="true" :editIncell="true" :columns-list="editInlineAndCellColumn"
                        :loading="loadingTable" :update-url="updateUrl" :delete-url="deleteUrl"></can-edit-table>

                </div>

                <Modal :width="500" v-model="showAdd">
                    <template>
                        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                            <FormItem label="用户名" prop="LoginName">
                                <Input type="text" v-model="formCustom.LoginName"></Input>
                            </FormItem>
                            <FormItem label="密码" prop="PassWord">
                                <Input type="password" v-model="formCustom.PassWord"></Input>
                            </FormItem>
                            <FormItem label="确认密码" prop="PassWordCheck">
                                <Input type="password" v-model="formCustom.PassWordCheck"></Input>
                            </FormItem>
                            <FormItem label="真实姓名" prop="NickName">
                                <Input type="text" v-model="formCustom.NickName" number></Input>
                            </FormItem>

                        </Form>
                    </template>
                    <div slot="footer">
                        <Button type="ghost" @click="closeModal">取消</Button>
                        <Button type="primary" @click="saveInfo" :loading="loading2">确定</Button>
                    </div>

                </Modal>
            </Row>
            <Row>
                <div style="float: left;" class="margin-top-10">
                    <Page :total="totalCount" :current="query.page" @on-change="changePage"></Page>
                </div>
            </Row>
        </Card>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import canEditTable from '../../tables/components/canEditTable.vue';
import tableData from '../../tables/components/table_data.js';
import Util from '../../libs/util.js';
import md5 from 'js-md5';
export default {
    name: 'editable-table',
    components: {
        canEditTable
    },
    data () {
         const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.formCustom.PassWordCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('PassWordCheck');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入确认密码'));
            } else if (value !== this.formCustom.PassWord) {
                callback(new Error('2次密码不一致!'));
            } else {
                callback();
            }
        };
        const validateName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入登录名'));
            }
            // 模拟异步验证效果
            setTimeout(() => {
                 callback();
            }, 1000);
        };
        const validateNick = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入真实姓名'));
            }
            callback();
        };
        return {
            editInlineAndCellColumn: [],
            editInlineAndCellData: [],
            loading:false,
            loading2:false,
            loadingTable:true,
            searchConName3:'',
            formatDate:'yyyy-MM-dd',
            showAdd:false,
            totalCount:0,
            current:1,
            formCustom:{
                 LoginName:'',
                 PassWord:'',
                 PassWordCheck:'',
                 nickName:''
            },
            ruleCustom: {
                    LoginName: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    PassWord: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    PassWordCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    NickName: [
                        { validator: validateNick, trigger: 'blur' }
                    ]
            },
            query:{
                ApiUid:Cookies.get('mmnum'),
                Token:Cookies.get('token'),
                Page:1,
                Rows:10,
                KeyWord:'',
                StartDate:'',
                EndDate:''
            },
            updateUrl:"api/Admin/UpdateAdmin",
            deleteUrl:"api/Admin/DeleteAdmin",
            addUrl:"api/Admin/AddAdmin",
            getUrl:"api/Admin/GetList"
        };
    },
    methods: {
        getData () {
            this.loadingTable=true;
            var pdata=this.query;

            let vm=this;

            Util.post(vm.getUrl,pdata,vm,function(res,data){
                if(res==='1')
                {
                    vm.totalCount=data.totalCount;
                    vm.loadingTable=false;
                    vm.editInlineAndCellColumn = data.columns;
                    if(data.totalCount>0)
                    {
                
                        vm.editInlineAndCellData = data.data;
                    
                    }else{
                        vm.editInlineAndCellData = [];
                    }
                }else{
                    vm.$Message.error("数据获取失败");
                    vm.loadingTable=false;
                }
            
            });
        },
        search(){
            this.getData();
        },
        cancelSearch(){
            this.query.KeyWord='';
            this.query.StartDate='';
            this.query.EndDate='';
            this.getData();
        },
        addModal(){
            this.showAdd=true;
        },
        transfer(){
            this.showAdd=true;
        },
        saveInfo(){
            this.loading2=true;
            this.$refs["formCustom"].validate((valid) => {
            if (valid) {
                var vm=this;
                 let pdata=this.formCustom;
                 Util.post(this.addUrl,pdata,this,function(res){
                    if(res==='1')
                    {
                        vm.$Message.success('新增成功');
                        for(var key in  vm.formCustom)
                        {
                            vm.formCustom[key]="";
                        }
                        vm.getData();
                        vm.loading2=false;
                    }else{
                        vm.$Message.error('新增失败');
                        vm.loading2=false;
                    }      
                });
            } else {
                console.log('error submit!!');
                this.loading2=false;
                return false;
            }
        });
           
        },
        closeModal(){
            this.showAdd=false;
        },
        changePage(n){
             this.query.Page=n;
             this.getData();
        }
    },
    mounted () {
        this.getData();
    }
};
</script>