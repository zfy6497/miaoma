<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import md5 from 'js-md5';
import Util from '../libs/util';
export default {
    data () {
        return {
            form: {
                userName: 'admin',
                password: '123456'
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    computed:{
        postdata:function(){
             return {'UserName':this.form.userName,'PassWord':md5(this.form.password),'CheckCode':'','AutoLogin':'','Type':'99'};
        }
    },
    methods: {
        getSign(){


        },
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {  
                    let t1=this.postdata;
                    t1["Sign"]=Util.createsign(t1,this.$store.state.app.mmkey);
                    Util.ajax.post("/admin/Admin/UserLogin",t1).then (res=>{
                        var data=res.data;
                        if(data.resultCode=="0")
                        {
                            Cookies.set('user', this.form.userName);
                            Cookies.set('token', data.data.Token);
                            Cookies.set('mmnum', data.data.MemberID);
                           // this.$store.commit('loginin', data.data.Token);
                            if (this.form.userName === 'iview_admin') {
                                Cookies.set('access', 0);
                            } else {
                                Cookies.set('access', 1);
                            }
                            this.$router.push({
                                name: 'home_index'
                            });
                        }
                        else{
                            this.$Message.error(data.message);
                        }

                    }).catch(error=>{
                        console.log(error);
                        this.$Message.error("请求错误");
                    });

                }
            });
        }
    }
};
</script>

<style>

</style>