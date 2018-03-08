<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    欢迎登录
                    <span style="float:right;cursor: pointer;"  v-on:click="loginmethod(0)"  v-if="platadmin==true" > 店长 <Icon type="log-in"></Icon></span>
                    <span style="float:right;cursor: pointer;"  v-on:click="loginmethod(99)"  v-if="storeadmin==true" > 平台 <Icon type="log-in"></Icon></span>
                </p>
                <div class="form-con">
                    <Form ref="loginForm"  :model="form" :rules="rules">
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
import Cookies from "js-cookie";
import md5 from "js-md5";
import Util from "../libs/util";
export default {
  data() {
    return {
      storeadmin: false,
      platadmin: true,
      form: {
        userName: "",
        password: "",
        type: "99"
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  computed: {
    postdata: function() {
      return {
        UserName: this.form.userName,
        PassWord: md5(this.form.password),
        CheckCode: "",
        AutoLogin: "",
        Type: this.form.type
      };
    },
    _postdata: function() {
      return {
        UserName: this.form.userName,
        PassWord: md5(this.form.password),
        Type: this.form.type
      };
    }
  },
  methods: {
    loginmethod(type) {
      this.form.userName = "";
      this.form.password = "";
      if (type == 0) {
        this.platadmin = false;
        this.storeadmin = true;
      } else {
        this.platadmin = true;
        this.storeadmin = false;
      }
      this.form.type = type;
      Cookies.set("mmtype", type);
    },
    getSign() {},
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let t1 = this.postdata;
          let loginurl = "/admin/Admin/UserLogin";
          if (this.form.type == 0) {
            loginurl = "/api/UserApi/Login";
            t1 = this._postdata;
            t1["Sign"] = Util.createsign(t1, this.$store.state.app.mmkey);
            Util.ajax
              .post(loginurl, t1)
              .then(res => {
                var data = res.data;
                if (data.resultCode == "0") {
                  Cookies.set(
                    "user",
                    data.data.StoreName + "(" + this.form.userName + ")"
                  );
                  Cookies.set("token", data.data.Token);
                  Cookies.set("mmnum", data.data.ApiUid);
                  this.$router.push({ name: "home_index" }); //店长登录首页可修改
                } else {
                  this.$Message.error(data.message);
                }
              })
              .catch(error => {
                this.$Message.error("请求错误");
              });
          } else {
            t1["Sign"] = Util.createsign(t1, this.$store.state.app.mmkey);
            Util.ajax
              .post(loginurl, t1)
              .then(res => {
                var data = res.data;
                if (data.resultCode == "0") {
                  Cookies.set("user", this.form.userName);
                  Cookies.set("token", data.data.Token);
                  Cookies.set("mmnum", data.data.MemberID);
                  this.$router.push({ name: "home_index" });
                } else {
                  this.$Message.error(data.message);
                }
              })
              .catch(error => {
                this.$Message.error("请求错误");
              });
          }
        }
      });
    }
  },
  mounted() {
    Cookies.set("mmtype", 99);
    this.form.userName = "";
    this.form.password = "";
  }
};
</script>