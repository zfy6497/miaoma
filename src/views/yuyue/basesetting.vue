<style lang="less">
@import "./form.less";
</style>
<template>
 <Card >
       <p slot="title"><Icon type="compose"></Icon>基础信息管理</p>
       <p style="">
           <Row>
                <Col span="6"> 
                     <Tree :data="data5" :render="renderContent" ></Tree>
                </Col>
                <Col span="2"> 
                </Col>
                <Col span="16">
                     <Card  class="ivu-card1" style="position: fixed;width: 600px;" :bordered="false" :dis-hover="false"  :shadow="false">
                          <p slot="title"></Icon>信息显示</p>
                          <p>
                               <Form  v-if="modalList==true" :model="editdata" :rules="ruleCustom" :label-width="100" style="margin-top:20px;">
                                    <FormItem label="上级" prop="PId">
                                        <Select v-model="editdata.PId"  style="width: 300px"  placeholder="">
                                            <Option v-for="item in nextlist" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
                                        </Select>
                                        <!-- <Cascader :data="data5"  trigger="hover"></Cascader> -->
                                    </FormItem>
                                    <FormItem label="名称" prop="title">
                                         <input type="hidden" :value='editdata.Id' />
                                        <Input type="text" v-model="editdata.title" style="width: 300px" @on-change="setNodeName"   ></Input>
                                    </FormItem>
                                    <FormItem label="备注" prop="remark">
                                        <Input  type="textarea" :rows="4" v-model="editdata.remark" style="width: 300px"></Input>
                                    </FormItem>
                                    <FormItem label="诊费" prop="price">
                                        <Input  type="text"   v-model="editdata.price" style="width: 300px"></Input>
                                    </FormItem>
                                     <div style="margin-top:20px;margin-left:200px">
                                        <Button type="primary"   @click="SaveArea" :loading="loading">保存</Button>
                                        <Button type="default"   @click="ResetArea" :loading="loading2">重置</Button>
                                    </div>
                                </Form>
                            </p>
                     </Card>
                    
                </Col>
            </Row>
       </p>
</Card>
</template>
<script>
import Util from '../../libs/util.js';
import {validateNum,validateRequired} from '../../libs/validate.js';
    export default {
        data () {
            return {
                modalList:true,
                loading:false,
                loading2:false,
                editdata:{
                    title:'',
                    remark:'',
                    price:0,
                    PId:0,
                    Id:0,
                },
                ruleCustom: {
                     title: [{ validator: validateRequired, trigger: "blur" }],
                     price: [{ validator: validateNum, trigger: "blur" }]
                },
                selfNode:{},
                nextlist:[],
                data5: [
                    {
                        title: '项名称',
                        expand: true,
                        PId:0,
                        Id:0,
                        render: (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline',
                                            PId:0
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                    h('Button', { 
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-plus-empty',
                                            type: 'primary'
                                        }),
                                        style: {
                                            width: '52px'
                                        },
                                        on: {
                                            click: () => {
                                                console.log(JSON.stringify(data));
                                                this.append(data) 
                                            }
                                        }
                                    })
                                ])
                            ]);
                        },
                        children: []
                    }
                ],
                buttonProps: {
                    type: 'ghost',
                    size: 'small',
                }
            }
        },
        methods: {
            /**
             * root <Array>：树的根节点
               node <Object>：当前节点
               data <Object>：当前节点的数据
             */
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    },
                    on: {
                        click: () => {
                                console.log("------------------------------------");
                                console.log(data);
                                this.editdata = data; 
                                this.selfNode = node;
                            }
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })
                    ])
                ]);
            },
            append (data) {
                const children = data.children || [];
                children.push({
                    title: '新节点...',
                    expand: true
                });
                this.$set(data, 'children', children);
                this.SetForm(data);
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                console.log("parentKey:"+parentKey+",this.key="+data.title);
                parent.children.splice(index, 1);
            },
            setNodeName(){
                this.selfNode.node.title = this.editdata.title;
            },
            SetForm(data){
                let vm=this;
                vm.editdata=data;
            },
            SaveArea(){
                console("保存12344");
            },
            ResetArea(){
                let vm=this;
                vm.editdata.remark='';
                vm.editdata.title='';
                vm.editdata.price=0;
            },
            init(){
                let  vm=this;
                Util.post("admin/Special/Diagnosis",{},vm,function (res,data) {
                    if(res==='1'){
                        vm.data5[0].children = data.data;
                    }
                })
            }
        },
        mounted () {
            this.init();
        }
    }
</script>
