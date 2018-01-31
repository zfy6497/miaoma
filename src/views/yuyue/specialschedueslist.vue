<style lang="less">
@import "./schedues.less";
</style>
<template>
    <div>
        <Row>
            <Card>
                <p slot="title">
                    <Icon type="compose"></Icon>
                    排班详情
                </p>
                <Tabs :animated="false"   @on-click="setCurrent">
                    <TabPane label="2018-01-31" name="2018-01-31"></TabPane>
                    <TabPane label="2018-02-01" name="2018-02-01"></TabPane>
                    <TabPane label="2018-02-02" name="2018-02-02"></TabPane>
                    <TabPane label="2018-02-03" name="2018-02-03"></TabPane>
                    <TabPane label="2018-02-04" name="2018-02-04"></TabPane>
                </Tabs>
                <Table :v-if="showTable==true" :columns="shopping_col" :data="shopping_data"></Table>
                <p style="margin-top:20px;">
                     <Button type="primary" @click="saveCurrent">保存当前</Button>
                </p>
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
            showTable:true,
            shopping_col: [
                {
                    title: '门店',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '时间',
                    key: 'time',
                    align: 'center'
                },
                {
                    title: '预约费用',
                    key: 'price',
                    align: 'center'
                },
                {
                    title: '到店另付费用',
                    key: 'price',
                    align: 'center'
                },
                {
                    title: '名额',
                    key: 'price',
                    align: 'center'
                }
                ,
                {
                    title: '操作',
                    key: 'price',
                    align: 'center'
                }
                ,
                {
                    title: '是否临时',
                    key: 'price',
                    align: 'center'
                },
                {
                    title: '是否模板',
                    key: 'price',
                    align: 'center'
                }
            ],
            shopping_data: [],
            formCustom:{
                    Id:this.$route.params.id,
                    CurrentDate:'2018-01-31'
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
            switch (this.formCustom.Id) {
                case 3: 
                    name = '《vue.js实战》'; time = '20ry7年11月12日 13：33：24'; price = '79';
                 break;
                case 4: name = '面包'; time = '2017年11月5日 19：13：24'; price = '10'; break;
                case 5: name = '咖啡'; time = '2017年11月8日 10：39：24'; price = '57'; break;
                case 6: name = '超级豪华土豪金牙签'; time = '2017年11月9日 11：45：24'; price = '200'; break;
            }
            let shoppingInfor = {
                name: '',
                time: time,
                price: price
            };
            this.shopping_data = [shoppingInfor];

            vm.formCustom.CurrentDate='2018-01-31';
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
        },
        setCurrent(value){
            let vm=this;
            vm.formCustom.CurrentDate=value;
        },
        saveCurrent() {
            let vm=this;
            vm.shopping_data.push( {
                name: "222",
                time: "sss",
                price: "734"
            });
            console.log(vm.formCustom.CurrentDate);
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
