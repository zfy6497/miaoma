<template>
    <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="true" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom" modal-Width="500">
        <template slot="frommodel">
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
                    <Input type="text" v-model="formCustom.NickName" ></Input>
                </FormItem>
        </template>
</list>
</template>

<script>
import list from '../../main-components/list.vue';
export default {
    name: 'page1-table',
    components: {
        list
    },
    data () {

        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.formCustom.PassWordCheck !== '') {
                    // 对第二个密码框单独验证
                  //  this.$refs.formCustom.validateField('PassWordCheck');
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
            updateUrl:"api/Admin/UpdateAdmin",
            deleteUrl:"api/Admin/DeleteAdmin",
            addUrl:"api/Admin/AddAdmin",
            getUrl:"api/Admin/GetList",
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
            modalWidth:500,
            modalLaberWidth:80
        };
    },
    methods: {
      
    },
    created () {
     
    }
};
</script>