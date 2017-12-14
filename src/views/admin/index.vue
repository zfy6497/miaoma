<style lang="less">
    @import '../../styles/common.less';
    @import '../../tables/components/table.less';
</style>

<template>
    <div>

        <Card>
            <Row>
                <Input v-model="searchConName3" placeholder="请输入姓名搜搜..." style="width: 200px" />
                <span @click="search" style="margin: 0 10px;"><Button type="primary" :loading="loading" icon="search">搜索</Button></span>
                <Button type="ghost">取消</Button>
                <span @click="addModal" style=""><Button type="primary"  icon="add">新增</Button></span>
            </Row>
            <Row :gutter="10">
                <div class="margin-top-10 searchable-table-con1">
                    <can-edit-table refs="table4" v-model="editInlineAndCellData" @on-cell-change="handleCellChange" @on-change="handleChange"
                        :hover-show="true" :editIncell="true" :columns-list="editInlineAndCellColumn"></can-edit-table>
                </div>
                <Modal :width="500" v-model="showAdd" ok-text="aaa" on-ok="onOk">
                    <template>
                        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                            <FormItem label="用户名" prop="loginName">
                                <Input type="text" v-model="formCustom.loginName"></Input>
                            </FormItem>
                            <FormItem label="密码" prop="passWord">
                                <Input type="password" v-model="formCustom.passWord"></Input>
                            </FormItem>
                            <FormItem label="确认密码" prop="passWordCheck">
                                <Input type="password" v-model="formCustom.passWordCheck"></Input>
                            </FormItem>
                            <FormItem label="真实姓名" prop="nickName">
                                <Input type="text" v-model="formCustom.nickName" number></Input>
                            </FormItem>

                        </Form>
                    </template>
                    <div slot="footer">
                        <Button type="ghost" @click="closeModal">取消</Button>
                        <Button type="primary" @click="saveInfo" :loading="loading2">确定</Button>
                    </div>

                </Modal>
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
                callback(new Error('Please enter your password'));
            } else {
                if (this.formCustom.passWordCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('passWordCheck');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password again'));
            } else if (value !== this.formCustom.passWord) {
                callback(new Error('The two input passwords do not match!'));
            } else {
                callback();
            }
        };
        const validateName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('loginname cannot be empty'));
            }
            // 模拟异步验证效果
            setTimeout(() => {
                 callback();
            }, 1000);
        };
        const validateNick = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('nickname cannot be empty'));
            }
            callback();
        };
        return {
            editInlineAndCellColumn: [],
            editInlineAndCellData: [],
            showCurrentColumns: [],
            showCurrentTableData: false,
            loading:false,
            loading2:false,
            searchConName3:'',
            showAdd:false,
            formCustom:{
                 loginName:'',
                 passWord:'',
                 passWordCheck:'',
                 nickName:''
            },
            ruleCustom: {
                    loginName: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    passWord: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passWordCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    nickName: [
                        { validator: validateNick, trigger: 'blur' }
                    ]
            },
            query:{
                userId:Cookies.get('mmnum'),
                token:Cookies.get('token'),
                page:'1',
                rows:'10'
            }
        };
    },
    methods: {
        getData () {
              var q=this.query;
              q["sign"]=Util.createsign(q,this.$store.state.app.mmkey);
              console.log(q);
              Util.ajax.post("api/Admin/GetList",q).then(res=>{
                var data=res.data;
                if(data.resultCode=="0")
                {
                       this.editInlineAndCellColumn = data.columns;
                       this.editInlineAndCellData = data.data;
                }
                else{
                    this.$Message.error(data.message);
                }    
            
            }).catch(error=>{
                this.$Message.error('新增失败');
            });

        },
        handleNetConnect (state) {
            this.breakConnect = state;
        },
        handleLowSpeed (state) {
            this.lowNetSpeed = state;
        },
        getCurrentData () {
            this.showCurrentTableData = true;
        },
        handleDel (val, index) {
            this.$Message.success('删除了第' + (index + 1) + '行数据');
        },
        handleCellChange (val, index, key) {
            this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
        },
        handleChange (val, index) {
            this.$Message.success('修改了第' + (index + 1) + '行数据');
        },
        search(){
            alert(this.$store.state.user.token);
            this.loading=true;
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
                 let pdata=this.formCustom;
                 pdata["passWord"]=md5(pdata["passWord"]);
                 pdata["userId"]=this.$store.state.user.id;
                 pdata["token"]=this.$store.state.user.token;
                 pdata["sign"]=Util.createsign(pdata,this.$store.state.app.mmkey);
                 Util.ajax.post("api/Admin/AddAdmin",pdata).then(res=>{
                    var data=res.data;
                    if(data.resultCode=="0")
                    {
                       this.$Message.success('新增成功');
                       for(var key in  this.formCustom)
                       {
                            this.formCustom[key]="";
                       }
                    }
                    else{
                        this.$Message.error(data.message);
                    }    
                   
                 }).catch(error=>{
                    this.$Message.error('新增失败');
                 });

              
                this.loading2=false;
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
    },
    created () {
        this.getData();
    }
};
</script>