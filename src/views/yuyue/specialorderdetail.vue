<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="compose"></Icon>
                    预约订单详情
                </p>
                <Form ref="formCustom" :model="formCustom" :label-width="130">
                        <FormItem label="专家名称:" prop="SpecialName">
                            <label type="text" style="width: 400px" >{{formCustom.SpecialName}}</label>
                        </FormItem>
                        <FormItem label="订单创建时间:" prop="CreateDate">
                            <label type="text" style="width: 400px" >{{formCustom.CreateDate}}</label>
                        </FormItem>
                         <FormItem label="用户名:" prop="UserName">
                            <label type="text" style="width: 400px" >{{formCustom.UserName}}</label>
                        </FormItem>
                         <FormItem label="用户手机号码:" prop="UserName">
                            <label type="text" style="width: 400px" >{{formCustom.UserCellPhone}}</label>
                        </FormItem>
                          <FormItem label="门店名称:" prop="UserName">
                            <label type="text" style="width: 400px" >{{formCustom.StoreName}}</label>
                        </FormItem>
                          <FormItem label="订单状态:" prop="OrderStatus">
                            <label type="text" style="width: 400px" >{{formCustom.OrderStatus}}</label>
                        </FormItem>
                        <FormItem label="订单金额:" prop="PayPrice">
                            <label type="text" style="width: 400px" >{{formCustom.PayPrice}}</label>
                        </FormItem>
                </Form>
                <Table :columns="shopping_col" :data="shopping_data"></Table>
            </Card>
        </Row>
    </div>
</template>

<script>
import PhUpload from "../main-components/phupload.vue";
import Util from '../../libs/util.js';
import {validateNum,validateRequired} from '../../libs/validate.js';

export default {
    name: 'specialorder_detail',
    components: {
          PhUpload
    },
    data () {
        return {
            showInfo: false,
            shopping_col: [
                {
                    title: '购买物品名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '购买时间',
                    key: 'time',
                    align: 'center'
                },
                {
                    title: '价格',
                    key: 'price',
                    align: 'center'
                }
            ],
            shopping_data: [],
            formCustom:{
                    Id:this.$route.params.id, 
                    SpecialName:'', //专家名称
                    CreateDate:'', //订单创建时间
                    UserName:'', //用户名
                    UserCellPhone:'',//用户手机号码
                    StoreName:'', //门店名称
                    OrderStatus:'待支付', //订单状态
                    PayDate:'', //支付时间 
                    PayTypeName:'', //支付类型
                    PayGatewayOrderId:'',//支付序列号类型
                    PayPrice:0 //支付金额
            },
            geturl:'admin/Special/Order/Detail'
        };
    },
    methods: {
        init () {
            let vm=this;
            let name = '';
            let time = '';
            let price = '';
            switch (this.$route.query.Id) {
                case '100001': name = '《vue.js实战》'; time = '2017年11月12日 13：33：24'; price = '79'; break;
                case '100002': name = '面包'; time = '2017年11月5日 19：13：24'; price = '10'; break;
                case '100003': name = '咖啡'; time = '2017年11月8日 10：39：24'; price = '57'; break;
                case '100004': name = '超级豪华土豪金牙签'; time = '2017年11月9日 11：45：24'; price = '200'; break;
            }
            let shoppingInfor = {
                name: name,
                time: time,
                price: price
            };
            this.shopping_data = [shoppingInfor];
            //load message
            if(this.formCustom.Id&&this.formCustom.Id!=0){
                Util.post(this.geturl,{Id:this.formCustom.Id},vm,function(res,data){
                    if(res==='1'){
                         vm.formCustom=data.data;
                    }else{
                         this.$Message.error('获取订单信息出错了');
                    }
               });
            }
        }
    },
    mounted () {
        this.init();
    },
    watch: {
        '$route' () {
            this.init();
        }
    }
};
</script>
