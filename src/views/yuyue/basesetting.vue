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
                     <Card v-if="modalAll==true" class="ivu-card1" style="position: fixed;width: 600px;" :bordered="false" :dis-hover="false"  :shadow="false">
                          <p slot="title"></Icon>信息显示  {{OprName}}</p>
                          <p>
                               <Form  v-if="modalEdit==true" :model="editdata" :rules="editRuleCustom" :label-width="100" style="margin-top:20px;">
                                    <FormItem label="* 名称" prop="title">
                                        <input type="hidden" :value='editdata.Id' />
                                        <input type="hidden" :value='editdata.PId' />
                                        <Input type="text" v-model="editdata.title" style="width: 300px" @on-change="setNodeName"   ></Input>
                                    </FormItem>
                                    <FormItem label="备注" prop="remark">
                                        <Input  type="textarea" :rows="4" v-model="editdata.remark" style="width: 300px"></Input>
                                    </FormItem>
                                    <FormItem label="诊费" prop="price">
                                        <Input  type="text"   v-model="editdata.price" style="width: 300px"></Input>
                                    </FormItem>
                                     <div style="margin-top:20px;margin-left:200px">
                                        <Button type="primary"   @click="EditArea" :loading="loading">保存</Button>
                                    </div>
                                </Form>
                                <Form  v-if="modalAdd==true" :model="adddata" :rules="addRuleCustom" :label-width="100" style="margin-top:20px;">
                                    <FormItem label="* 名称" prop="title">
                                        <input type="hidden" :value='adddata.Id' />
                                        <input type="hidden" :value='adddata.PId' />
                                        <Input type="text" v-model="adddata.title" style="width: 300px"    ></Input>
                                    </FormItem>
                                    <FormItem label="备注" prop="remark">
                                        <Input  type="textarea" :rows="4" v-model="adddata.remark" style="width: 300px"></Input>
                                    </FormItem>
                                    <FormItem label="诊费" prop="price">
                                        <Input  type="text"   v-model="adddata.price" style="width: 300px"></Input>
                                    </FormItem>
                                     <div style="margin-top:20px;margin-left:200px">
                                        <Button type="primary"   @click="AddArea" :loading="loading2">保存</Button>
                                    </div>
                                </Form>
                            </p>
                     </Card>
                      <Modal
        title="删除操作"
        v-model="isDelModel" 
        class-name="vertical-center-modal" @on-ok="Del">
        <p>确定要删除吗?</p>
    </Modal>
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
                rootx:[], 
                nodex:{}, 
                datax:[],
                modalAdd:false,
                modalAll:false,
                modalEdit:false,
                loading:false,
                loading2:false,
                isDelModel:false,
                OprName:"",
                editdata:{
                    title:'',
                    remark:'',
                    price:0,
                    PId:0,
                    Id:0,
                },
                adddata:{
                    title:'',
                    remark:'',
                    price:0,
                    PId:0,
                    Id:0,
                },
                addRuleCustom: {
                     title: [{ validator: validateRequired, trigger: "blur" }],
                     //price: [{ validator: validateNum, trigger: "blur" }]
                },
                editRuleCustom: {
                     title: [{ validator: validateRequired, trigger: "blur" }],
                     //price: [{ validator: validateNum, trigger: "blur" }]
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
                                            width: '87px'
                                        },
                                        on: {
                                            click: () => {
                                                this.modalEdit=false;
                                                this.modalAdd=true;
                                                this.modalAll=true;
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
                                icon: 'edit'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                //行的编辑事件
                                click: () => { 
                                    this.modalEdit=true;
                                    this.modalAdd=false;
                                    this.modalAll=true;
                                    this.editdata=data;
                                    this.selfNode=node;
                                    this.OprName="-- 编辑（"+data.title+"）"
                                }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                //行的添加下级
                                click: () => { 
                                    this.modalEdit=false;
                                    this.modalAdd=true;
                                    this.modalAll=true;
                                    this.append(data) 
                                }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            on: {
                                //行的删除事件
                                click: () => {
                                    this.remove(root, node, data);
                                }
                            }
                        })
                    ])
                ]);
            },
            append (data) {
                let vm=this;
                vm.OprName="-- 新增下级（"+data.title+"）";
                vm.adddata.PId=data.Id;
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                let pdata = { Id: data.Id};
                let vm=this;
                Util.post("admin/Special/Diagnosis/Delete",pdata,vm,function (res,data) {
                    if (res === "1") {
                        if(data.resultCode==0){
                            vm.$Message.success("删除成功");
                            parent.children.splice(index, 1);
                        }
                    } else {
                        vm.$Message.error(data.errors);
                    }
                })
            },
            Del(){
                let vm=this;
                let _rootx=vm.rootx;
                let _nodex=vm.nodex;
                let _datax=vm.datax;
                this.remove(_rootx, _nodex, _datax);
            },
            setNodeName(){
                this.selfNode.node.title = this.editdata.title;
            },
            SetForm(data){
                let vm=this;
                vm.editdata=data;
            },
            EditArea(){
                let  vm=this;
                vm.loading=true;
                if(vm.editdata.title=="")
                {
                     vm.$Message.error("请输入名称");vm.loading=false; return;
                }
                let pdata = { Id: vm.editdata.Id, PId: vm.editdata.PId,title:vm.editdata.title,price:vm.editdata.price,remark:vm.editdata.remark };
                Util.post("admin/Special/Diagnosis/AddOrEdit",pdata,vm,function (res,data) {
                    vm.loading=false;
                    if(res==='1'){
                        if(data.resultCode==0){
                            vm.$Message.success("操作成功");
                            //vm.init();
                        }else{
                            vm.$Message.error(data.errors);
                        }
                    }else{
                        vm.$Message.error("操作出错了");
                    }
                })
            },
            AddArea(){
                let  vm=this;
                vm.loading2=true;
                if(vm.adddata.title=="")
                {
                     vm.$Message.error("请输入名称"); vm.loading2=false; return;
                }
                let pdata = { Id: vm.adddata.Id, PId: vm.adddata.PId,title:vm.adddata.title,price:vm.adddata.price,remark:vm.adddata.remark };
                Util.post("admin/Special/Diagnosis/AddOrEdit",pdata,vm,function (res,data) {
                    vm.loading2=false;
                    if(res==='1'){
                        if(data.resultCode==0){
                            vm.$Message.success("操作成功");
                            vm.init();
                        }else{
                            vm.$Message.error(data.errors);
                        }
                    }else{
                        vm.$Message.error("操作出错了");
                    }
                })
            },
            ResetArea(){
                let vm=this;
                vm.editdata.remark='';
                vm.editdata.title='';
                vm.editdata.price=0;
                vm.editdata.Id=0;
                vm.editdata.PId=0;
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
