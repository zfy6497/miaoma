<style lang="less">
    @import './editable-table.less';
</style>

<template>
    <div>
        <Table :ref="refs" :columns="columnsList" :loading="loading" @on-sort-change="sortChange" :data="thisTableData" border disabled-hover ></Table>
    </div>
</template>

<script>
import Util from '../../libs/util.js';



const editButton = (vm, h, currentRow, index) => {


    return h('Button', {
        props: {
            type: currentRow.editting ? 'success' : 'primary',
            loading: currentRow.saving,
            size:'small'
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': () => {
                if (!currentRow.editting) {
                    if (currentRow.edittingCell) {
                        for (let name in currentRow.edittingCell) {
                            currentRow.edittingCell[name] = false;
                            vm.edittingStore[index].edittingCell[name] = false;
                        }
                    }
                    vm.edittingStore[index].editting = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                } else {
                    let edittingRow = vm.edittingStore[index];
                    let pdata={};
                    vm.caneditcolumns.forEach(item => {
                    pdata[item.key]=edittingRow[item.key];
                    });
                    if(edittingRow["Id"]&&edittingRow["Id"]!=="0")
                    {
                    pdata["Id"]=edittingRow["Id"];                    
                    }
                    Util.post(vm.updateUrl,pdata,vm,function(res){
                        if(res==='1')
                        {
                            vm.edittingStore[index].saving = true;
                            vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                            edittingRow.editting = false;
                            edittingRow.saving = false;
                            vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                            vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                            //vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index);
                            vm.$Message.success('编辑成功');
                        }else{
                                vm.$Message.error('编辑失败');
                        }
                    })                  
                }
            }
        }
    }, currentRow.editting ? '保存' : '编辑');
};
const deleteButton = (vm, h, currentRow, index) => {
    return h('Poptip', {
        props: {
            confirm: true,
            title: '您确定要删除这条数据吗?',
            transfer: true,
               
        },
        on: {
            'on-ok': () => {
                 let pdata={};
                if(currentRow["Id"]&&currentRow["Id"]!=="0")
                {
                   pdata["Id"]=currentRow["Id"];                    
                }
                Util.post(vm.deleteUrl,pdata,vm,function(res){
                if(res==='1')
                {
                    vm.thisTableData.splice(index, 1);
                    vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                //vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index);
                    vm.$Message.success('删除成功');
                }else{
                    vm.$Message.error('删除失败');
                }
            })
            }
        }
    }, [
        h('Button', {
            style: {
                margin: '0 5px'
            },
            props: {
                type: 'error',
                placement: 'top',
                 size:'small'
            }
        }, '删除')
    ]);
};

//查看
const selectButton = (vm, h, currentRow, index,callback) => {
    return h('Button', {
        style: {
            margin: '0 5px'
        },
        props: {
             type: 'text',
             size: 'small'
        },                   
        on: {
            'click': () => {        
                 let query = {Id: currentRow.Id};
                 let routeName = vm.$route.name;
                 console.log(vm.$route.path);
                 vm.$router.push({
                        name: routeName,
                        query: query
                 }); 
                callback&&callback();
            }
        }
    },'查看');
};

const incellEditBtn = (vm, h, param) => {
    if (vm.hoverShow) {
        return h('div', {
            'class': {
                'show-edit-btn': vm.hoverShow
            }
        }, [
            h('Button', {
                props: {
                    type: 'text',
                    icon: 'edit'
                },
                on: {
                    click: (event) => {
                        vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    }
                }
            })
        ]);
    } else {
        return h('Button', {
            props: {
                type: 'text',
                icon: 'edit'
            },
            on: {
                click: (event) => {
                    vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                }
            }
        });
    }
};
const saveIncellEditBtn = (vm, h, param) => {
    return h('Button', {
        props: {
            type: 'text',
            icon: 'checkmark'
        },
        on: {
            click: (event) => {
                let edittingRow = vm.edittingStore[param.index];
                let pdata={};
                vm.caneditcolumns.forEach(item => {
                   pdata[item.key]=edittingRow[item.key];
                });
                if(edittingRow["Id"]&&edittingRow["Id"]!=="0")
                {
                   pdata["Id"]=edittingRow["Id"];                    
                }
                Util.post(vm.updateUrl,pdata,vm,function(res){
                    if(res==='1')
                    {
                        edittingRow.edittingCell[param.column.key] = false;
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                        vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                        //vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key);
                        vm.$Message.success('编辑成功');
                    }else{
                         vm.$Message.error('编辑失败');
                    }
                })

              
            }
        }
    });
};
const cellInput = (vm, h, param, item) => {
    return h('Input', {
        props: {
            type: 'text',
            value: vm.edittingStore[param.index][item.key]
        },
        on: {
            'on-change' (event) {
                let key = item.key;
                vm.edittingStore[param.index][key] = event.target.value;
            }
        }
    });
};
export default {
    name: 'canEditTable',
    props: {
        refs: String,
        columnsList: Array,
        value: Array,
        url: String,
        editIncell: {
            type: Boolean,
            default: false
        },
        hoverShow: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: true
        },
        updateUrl:String,
        deleteUrl:String,
        select:Function
    },
    data () {
        return {
            columns: [],
            thisTableData: [],
            edittingStore: [],
            caneditcolumns:[]
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            let vm = this;
            let editableCell = this.columnsList.filter(item => {
                if (item.editable) {
                    if (item.editable === true) {
                        return item;
                    }
                }
            });
            this.caneditcolumns=editableCell;
            let cloneData = JSON.parse(JSON.stringify(this.value));
            let res = [];
            res = cloneData.map((item, index) => {
                let isEditting = false;
                if (this.thisTableData[index]) {
                    if (this.thisTableData[index].editting) {
                        isEditting = true;
                    } else {
                        for (const cell in this.thisTableData[index].edittingCell) {
                            if (this.thisTableData[index].edittingCell[cell] === true) {
                                isEditting = true;
                            }
                        }
                    }
                }
                if (isEditting) {
                    return this.thisTableData[index];
                } else {
                    this.$set(item, 'editting', false);
                    let edittingCell = {};
                    editableCell.forEach(item => {
                        edittingCell[item.key] = false;
                    });
                    this.$set(item, 'edittingCell', edittingCell);
                    return item;
                }
            });
            this.thisTableData = res;
            this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
            this.columnsList.forEach(item => {
                item.fixed=item.fixedType
                if (item.editable) {
                    item.render = (h, param) => {
                        let currentRow = this.thisTableData[param.index];
                        if (!currentRow.editting) {
                            if (this.editIncell) {
                                return h('Row', {
                                    props: {
                                        type: 'flex',
                                        align: 'middle',
                                        justify: 'center'
                                    }
                                }, [
                                    h('Col', {
                                        props: {
                                            span: '22'
                                        }
                                    }, [
                                        !currentRow.edittingCell[param.column.key] ? h('span', currentRow[item.key]) : cellInput(this, h, param, item)
                                    ]),
                                    h('Col', {
                                        props: {
                                            span: '2'
                                        }
                                    }, [
                                        currentRow.edittingCell[param.column.key] ? saveIncellEditBtn(this, h, param) : incellEditBtn(this, h, param)
                                    ])
                                ]);
                            } else {
                                return h('span', currentRow[item.key]);
                            }
                        } else {
                            return h('Input', {
                                props: {
                                    type: 'text',
                                    value: currentRow[item.key]
                                },
                                on: {
                                    'on-change' (event) {
                                        let key = param.column.key;
                                        vm.edittingStore[param.index][key] = event.target.value;
                                    }
                                }
                            });
                        }
                    };
                }
                if (item.handle) {
                    item.render = (h, param) => {
                        let currentRowData = this.thisTableData[param.index];
                        return  h('div', [
                            item.handle.map((todo,i)=>{
                                let type;
                                switch (todo) {
                                    case "edit":
                                        type = editButton(this, h, currentRowData, param.index);
                                        break;
                                    case "delete":
                                        type = deleteButton(this, h, currentRowData, param.index)
                                        break;
                                    case "select":
                                       type =  selectButton(this, h, currentRowData, param.index)
                                        break;
                                }
                                return type;
                            })
                        ])
                        /* if (item.handle.length === 2) {
                            return h('div', [ editButton(this, h, currentRowData, param.index),deleteButton(this, h, currentRowData, param.index)
                            ]);
                        } else if (item.handle.length === 1) {
                            if (item.handle[0] === 'edit') {
                                return h('div', [
                                    editButton(this, h, currentRowData, param.index)
                                ]);
                            } else {
                                return h('div', [
                                    deleteButton(this, h, currentRowData, param.index)
                                ]);
                            }
                        } */
                    };
                }
                if(item.formatType==="formatTime"){

                     item.render = (h, param) => {
                        let currentRowData = this.thisTableData[param.index];
                         return h('span', Util.formatDate(currentRowData[item.key]));
                    };
                   
                }
                

            });
        },
        handleBackdata (data) {
            let clonedData = JSON.parse(JSON.stringify(data));
            clonedData.forEach(item => {
                delete item.editting;
                delete item.edittingCell;
                delete item.saving;
            });
            return clonedData;
        },
        sortChange(data){
            this.$emit('on-reload', data.key,data.order);
        }
    },
    watch: {
        value (data) {
            this.init();
        }
    }
};
</script>