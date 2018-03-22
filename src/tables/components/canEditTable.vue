<style lang="less">
@import "./editable-table.less";
</style>

<template>
    <div>
        <Table :ref="refs" :columns="columnsList" :loading="loading" @on-sort-change="sortChange" @on-selection-change="changeselect" :data="thisTableData" border disabled-hover ></Table>
        <Modal
            v-model="modalmsg"
            title="Modal"
            :loading="loadingbtn1">
            <p><input class="ivu-input"  style="width:300px;" width=""  autocomplete="off" v-model="auditMsg" placeholder="请输入拒绝理由" /></p>
                   <div slot="footer">
                        <Button type="ghost" @click="closeModal">取消</Button>
                        <Button type="primary"   @click="fail" :loading="loadingbtn1">确定</Button>
                    </div>
        </Modal>
    </div>
</template>


<script>
import Util from "../../libs/util.js";
import D from "../../libs/date.js";
//跳转新页面编辑框
const newPageEditButton = (vm, h, currentRow, index) => {
  return h(
    "Button",
    {
      props: {
        type: "primary",
        loading: currentRow.saving,
        size: "small"
      },
      style: {
        margin: "0 5px"
      },
      on: {
        click: () => {
          // callback(vm,h,currentRow,index);
          vm.$router.push({
            name: vm.routername,
            params: { id: currentRow["Id"] }
          });
        }
      }
    },
    "编辑"
  );
};

//弹出编辑框
const alertEditButton = (vm, h, currentRow, index) => {
  return h(
    "Button",
    {
      props: {
        type: "primary",
        loading: currentRow.saving,
        size: "small"
      },
      style: {
        margin: "0 5px"
      },
      on: {
        click: () => {
          vm.$emit("set-form", currentRow);
          //vm.$router.push({ name: vm.routername, params: { id: currentRow["Id"] } })
        }
      }
    },
    "编辑"
  );
};

//当前编辑
const editButton = (vm, h, currentRow, index) => {
  return h(
    "Button",
    {
      props: {
        type: currentRow.editting ? "success" : "primary",
        loading: currentRow.saving,
        size: "small"
      },
      style: {
        margin: "0 5px"
      },
      on: {
        click: () => {
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
            let pdata = {};
            vm.caneditcolumns.forEach(item => {
              pdata[item.key] = edittingRow[item.key];
            });
            if (edittingRow["Id"] && edittingRow["Id"] !== "0") {
              pdata["Id"] = edittingRow["Id"];
            }
            Util.post(vm.updateUrl, pdata, vm, function(res) {
              if (res === "1") {
                vm.edittingStore[index].saving = true;
                vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                edittingRow.editting = false;
                edittingRow.saving = false;
                vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                vm.$emit("input", vm.handleBackdata(vm.thisTableData));
                //vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index);
                vm.$Message.success("编辑成功");
              } else {
                vm.$Message.error("编辑失败");
              }
            });
          }
        }
      }
    },
    currentRow.editting ? "保存" : "编辑"
  );
};

//删除
const deleteButton = (vm, h, currentRow, index) => {
  return h(
    "Poptip",
    {
      props: {
        confirm: true,
        title: "您确定要删除这条数据吗?",
        transfer: true
      },
      on: {
        "on-ok": () => {
          let pdata = {};
          if (currentRow["Id"] && currentRow["Id"] !== "0") {
            pdata["Id"] = currentRow["Id"];
          }
          Util.post(vm.deleteUrl, pdata, vm, function(res) {
            if (res === "1") {
              vm.thisTableData.splice(index, 1);
              vm.$emit("input", vm.handleBackdata(vm.thisTableData));
              //vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index);
              vm.$Message.success("删除成功");
            } else {
              vm.$Message.error("删除失败");
            }
          });
        }
      }
    },
    [
      h(
        "Button",
        {
          style: {
            margin: "0 5px"
          },
          props: {
            type: "error",
            placement: "top",
            size: "small"
          }
        },
        "删除"
      )
    ]
  );
};
//查看详情
const selectDetailButton = (vm, h, currentRow, index, btn) => {
  let btnName = "查看详情"; ///btn.BtttonName
  if (btn && btn.BtttonName) {
    btnName = btn.BtttonName;
  }
  return h(
    "Button",
    {
      props: {
        type: "default",
        loading: currentRow.saving,
        size: "small"
      },
      style: {
        margin: "0 5px"
      },
      on: {
        click: () => {
          //跳转特殊处理
          switch (btnName) {
            case "预约记录":
              vm.$router.push({
                name: "specialorder_list",
                params: { id: currentRow["Id"] }
              });
              break;
            case "排班管理":
              vm.$router.push({
                name: "specialschedues_list",
                params: { id: currentRow["Id"] }
              });
              break;
            case "领取详情":
              vm.$router.push({
                name: "couponreceivers_list",
                params: { id: currentRow["Id"] }
              });
              break;
            case "使用详情":
              vm.$router.push({
                name: "uservipcardrecord_list",
                params: { id: currentRow["Id"] }
              });
              break;

            case "婴泳项目":
              vm.$router.push({
                name: "baby_list",
                params: { id: currentRow["Id"] }
              });
              break;
            case "婴泳预约":
              vm.$router.push({
                name: "baby_order",
                params: { id: currentRow["Id"] }
              });
              break;
            case "婴泳排班":
              vm.$router.push({
                name: "babyschedues_list",
                params: { id: currentRow["Id"] }
              });
              break;
            default:
              vm.$router.push({
                name: vm.routername,
                params: { id: currentRow["Id"] }
              });
              break;
          }
        }
      }
    },
    btnName
  );
};

//审核重置密码
const resetPasswordButton = (vm, h, currentRow, index, btn) => {
  return h(
    "Poptip",
    {
      props: {
        confirm: true,
        title: btn.Msg ? btn.Msg : "您确定执行此操作吗?",
        transfer: true
      },
      on: {
        "on-ok": () => {
          let pdata = {};
          if (currentRow["Id"] && currentRow["Id"] !== "0") {
            pdata["Id"] = currentRow["Id"];
          }
          Util.post(btn.PostUrl, pdata, vm, function(res) {
            if (res === "1") {
              vm.$emit("reLoad");
              vm.$Message.success("操作成功");
            } else {
              vm.$Message.error("操作失败");
            }
          });
        }
      }
    },
    [
      h(
        "Button",
        {
          style: {
            margin: "0 5px"
          },
          props: {
            type: btn.BtttonStyle,
            placement: "top",
            size: "small"
          }
        },
        btn.BtttonName
      )
    ]
  );
};

//查看
const selectButton = (vm, h, currentRow, index) => {
  return h(
    "Button",
    {
      props: {
        type: "default",
        loading: currentRow.saving,
        size: "small"
      },
      style: {
        margin: "0 5px"
      },
      on: {
        click: () => {
          vm.$emit("set-form", currentRow);
        }
      }
    },
    "查看"
  );
};

//初始化编辑行
const incellEditBtn = (vm, h, param) => {
  if (vm.hoverShow) {
    return h(
      "div",
      {
        class: {
          "show-edit-btn": vm.hoverShow
        }
      },
      [
        h("Button", {
          props: {
            type: "text",
            icon: "edit"
          },
          on: {
            click: event => {
              vm.edittingStore[param.index].edittingCell[
                param.column.key
              ] = true;
              vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
            }
          }
        })
      ]
    );
  } else {
    return h("Button", {
      props: {
        type: "text",
        icon: "edit"
      },
      on: {
        click: event => {
          vm.edittingStore[param.index].edittingCell[param.column.key] = true;
          vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
        }
      }
    });
  }
};

//保存编辑行信息
const saveIncellEditBtn = (vm, h, param) => {
  return h("Button", {
    props: {
      type: "text",
      icon: "checkmark"
    },
    on: {
      click: event => {
        let edittingRow = vm.edittingStore[param.index];
        let pdata = {};
        vm.caneditcolumns.forEach(item => {
          pdata[item.key] = edittingRow[item.key];
        });
        if (edittingRow["Id"] && edittingRow["Id"] !== "0") {
          pdata["Id"] = edittingRow["Id"];
        }
        Util.post(vm.updateUrl, pdata, vm, function(res) {
          if (res === "1") {
            edittingRow.edittingCell[param.column.key] = false;
            vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
            vm.$emit("input", vm.handleBackdata(vm.thisTableData));
            //vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key);
            vm.$Message.success("编辑成功");
          } else {
            vm.$Message.error("编辑失败");
          }
        });
      }
    }
  });
};

const cellInput = (vm, h, param, item) => {
  return h("Input", {
    props: {
      type: "text",
      value: vm.edittingStore[param.index][item.key]
    },
    on: {
      "on-change"(event) {
        let key = item.key;
        vm.edittingStore[param.index][key] = event.target.value;
      }
    }
  });
};

//发货
const deliverButton = (vm, h, currentRow, index) => {
  if (currentRow.OrderStatus != 2) return;
  return h(
    "Button",
    {
      props: {
        type: "primary",
        loading: currentRow.saving,
        size: "small"
      },
      style: {
        margin: "0 5px"
      },
      on: {
        click: () => {
          vm.$emit("set-form", currentRow);
          //vm.$router.push({ name: vm.routername, params: { id: currentRow["Id"] } })
        }
      }
    },
    "发货"
  );
};

//确认服务
const confirmButton = (vm, h, currentRow, index) => {
  if (currentRow.OrderStatus != 0) return;
  return h(
    "Button",
    {
      props: {
        type: "primary",
        loading: currentRow.saving,
        size: "small"
      },
      style: {
        margin: "0 5px"
      },
      on: {
        click: () => {
          vm.$emit("set-form", currentRow);
        }
      }
    },
    "确认服务"
  );
};

//审核

const auditSuccessButton = (vm, h, currentRow, index, btn) => {
  if (currentRow[btn.CheckKey] != btn.CheckValue) return;
  return h(
    "Poptip",
    {
      props: {
        confirm: true,
        title: btn.Msg ? btn.Msg : "您确定执行此操作吗?",
        transfer: true
      },
      on: {
        "on-ok": () => {
          let pdata = {};
          if (currentRow["Id"] && currentRow["Id"] !== "0") {
            pdata["Id"] = currentRow["Id"];
          }
          Util.post(btn.PostUrl, pdata, vm, function(res) {
            if (res === "1") {
              //  vm.thisTableData.splice(index, 1);

              vm.$emit("reLoad");

              // vm.$emit("input", vm.handleBackdata(vm.thisTableData));
              //vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index);
              vm.$Message.success("操作成功");
            } else {
              vm.$Message.error("操作失败");
            }
          });
        }
      }
    },
    [
      h(
        "Button",
        {
          style: {
            margin: "0 5px"
          },
          props: {
            type: btn.BtttonStyle,
            placement: "top",
            size: "small"
          }
        },
        btn.BtttonName
      )
    ]
  );
};

const auditFailButton = (vm, h, currentRow, index, btn) => {
  console.log(currentRow[btn.CheckKey] + "," + btn.CheckValue + "222");
  if (currentRow[btn.CheckKey] != btn.CheckValue) return;

  return h(
    "Button",
    {
      props: {
        type: "error",
        loading: currentRow.saving,
        size: "small"
      },
      style: {
        margin: "0 5px"
      },
      on: {
        click: () => {
          vm.modalmsg = true;
          vm.checkQuery.id = currentRow["Id"];
          vm.checkQuery.posturl = btn.PostUrl;
          // vm.handleRender(vm, currentRow, btn);
          // vm.$emit("set-form", currentRow);
          //vm.$router.push({ name: vm.routername, params: { id: currentRow["Id"] } })
        }
      }
    },
    btn.BtttonName
  );
};
//确认打款
const confirmRefundButton = (vm, h, currentRow, index) => {
  console.log(currentRow[btn.CheckKey] + "," + btn.CheckValue + "111");
  if (currentRow[btn.CheckKey] != btn.CheckValue) return;
  return h(
    "Button",
    {
      props: {
        type: "primary",
        loading: currentRow.saving,
        size: "small"
      },
      style: {
        margin: "0 5px"
      },
      on: {
        click: () => {
          vm.$emit("set-form", currentRow);

          //vm.$router.push({ name: vm.routername, params: { id: currentRow["Id"] } })
        }
      }
    },
    "确认打款"
  );
};

export default {
  name: "canEditTable",
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
    updateUrl: String,
    deleteUrl: String,
    editMessage: Function,
    routername: String
  },
  data() {
    return {
      columns: [],
      thisTableData: [],
      edittingStore: [],
      caneditcolumns: [],
      auditMsg: "",
      loadingbtn1: false,
      modalmsg: false,
      checkQuery: { id: 0, posturl: "" }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let vm = this;
      let editableCell = this.columnsList.filter(item => {
        if (item.editable) {
          if (item.editable === true) {
            return item;
          }
        }
      });
      this.caneditcolumns = editableCell;
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
          this.$set(item, "editting", false);
          let edittingCell = {};
          editableCell.forEach(item => {
            edittingCell[item.key] = false;
          });
          this.$set(item, "edittingCell", edittingCell);
          return item;
        }
      });
      this.thisTableData = res;
      this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
      this.columnsList.forEach(item => {
        item.fixed = item.fixedType;
        if (item.editable) {
          item.render = (h, param) => {
            let currentRow = this.thisTableData[param.index];
            if (!currentRow.editting) {
              if (this.editIncell) {
                return h(
                  "Row",
                  {
                    props: {
                      type: "flex",
                      align: "middle",
                      justify: "center"
                    }
                  },
                  [
                    h(
                      "Col",
                      {
                        props: {
                          span: "22"
                        }
                      },
                      [
                        !currentRow.edittingCell[param.column.key]
                          ? h("span", currentRow[item.key])
                          : cellInput(this, h, param, item)
                      ]
                    ),
                    h(
                      "Col",
                      {
                        props: {
                          span: "2"
                        }
                      },
                      [
                        currentRow.edittingCell[param.column.key]
                          ? saveIncellEditBtn(this, h, param)
                          : incellEditBtn(this, h, param)
                      ]
                    )
                  ]
                );
              } else {
                return h("span", currentRow[item.key]);
              }
            } else {
              return h("Input", {
                props: {
                  type: "text",
                  value: currentRow[item.key]
                },
                on: {
                  "on-change"(event) {
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
            return h("div", [
              item.handle.map((todo, i) => {
                let type;
                switch (todo) {
                  case "edit":
                    type = editButton(this, h, currentRowData, param.index);
                    break;
                  case "alertEdit":
                    type = alertEditButton(
                      this,
                      h,
                      currentRowData,
                      param.index
                    );
                    break;
                  case "newPageEdit":
                    type = newPageEditButton(
                      this,
                      h,
                      currentRowData,
                      param.index
                    );
                    break;
                  case "delete":
                    type = deleteButton(this, h, currentRowData, param.index);
                    break;
                  case "select":
                    type = selectButton(this, h, currentRowData, param.index);
                    break;
                  case "selectDetail":
                    type = selectDetailButton(
                      this,
                      h,
                      currentRowData,
                      param.index
                    );
                    break;
                  case "deliver":
                    type = deliverButton(this, h, currentRowData, param.index);
                    break;
                  case "confirm":
                    type = confirmButton(this, h, currentRowData, param.index);
                    break;
                }
                return type;
              })
            ]);
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

        if (item.BtnItems && item.BtnItems.length > 0) {
          item.render = (h, param) => {
            let currentRowData = this.thisTableData[param.index];
            return h("div", [
              item.BtnItems.map((btn, i) => {
                let type;
                switch (btn.ButtonType) {
                  case "auditSuccess":
                    type = auditSuccessButton(
                      this,
                      h,
                      currentRowData,
                      param.index,
                      btn
                    );
                    break;

                  case "auditFail":
                    type = auditFailButton(
                      this,
                      h,
                      currentRowData,
                      param.index,
                      btn
                    );
                    break;
                  case "edit":
                    type = editButton(this, h, currentRowData, param.index);
                    break;
                  case "alertEdit":
                    type = alertEditButton(
                      this,
                      h,
                      currentRowData,
                      param.index
                    );
                    break;
                  case "newPageEdit":
                    type = newPageEditButton(
                      this,
                      h,
                      currentRowData,
                      param.index
                    );
                    break;
                  case "delete":
                    type = deleteButton(this, h, currentRowData, param.index);
                    break;
                  case "select":
                    type = selectButton(this, h, currentRowData, param.index);
                    break;
                  case "selectDetail":
                    type = selectDetailButton(
                      this,
                      h,
                      currentRowData,
                      param.index,
                      btn
                    );
                    break;
                  case "deliver":
                    type = deliverButton(this, h, currentRowData, param.index);
                    break;
                  case "confirm":
                    type = confirmButton(this, h, currentRowData, param.index);
                    break;
                  case "resetPassWord":
                    type = resetPasswordButton(
                      this,
                      h,
                      currentRowData,
                      param.index,
                      btn
                    );
                    break;
                }
                return type;
              })
            ]);
          };
        }
        if (item.formatType === "formatTime") {
          item.render = (h, param) => {
            let currentRowData = this.thisTableData[param.index];
            return h("span", D.date(currentRowData[item.key]));
          };
        }
        //单图
        if (item.formatType == "image") {
          item.render = (h, param) => {
            let currentRowData = this.thisTableData[param.index];
            return h(
              "div",
              {
                attrs: {
                  style: "width: 40px;height: 40px;"
                }
              },
              [
                h("img", {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  attrs: {
                    src: currentRowData[item.key],
                    style: "width: 40px;height: 40px;border-radius: 2px;"
                  },
                  style: {}
                })
              ]
            );
          };
        }
        //多图显示
        if (item.formatType == "multiImage") {
          item.render = (h, param) => {
            let currentRowData = this.thisTableData[param.index];
            let multiImage = currentRowData[item.key].split(",");
            return h(
              "div",
              {
                attrs: {
                  style: "width: 200px;height: 40px;text-align: left;"
                }
              },
              [
                multiImage.map((i, t) => {
                  return h("img", {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    attrs: {
                      src: i,
                      style:
                        "width: 40px;height: 40px;border-radius: 2px;padding-right:2px"
                    },
                    style: {}
                  });
                })
              ]
            );
          };
        }
      });
    },
    handleBackdata(data) {
      let clonedData = JSON.parse(JSON.stringify(data));
      clonedData.forEach(item => {
        delete item.editting;
        delete item.edittingCell;
        delete item.saving;
      });
      return clonedData;
    },
    sortChange(data) {
      this.$emit("on-reload", data.key, data.order);
    },
    changeselect(selected) {
      this.$emit("set-selected", selected);
    },

    closeModal() {
      this.modalmsg = false;
    },
    fail: function() {
      var vm = this;
      vm.loadingbtn1 = true;
      if (!vm.auditMsg) {
        vm.$Message.error("请输入拒绝原因");
        vm.loadingbtn1 = false;
        return;
      }
      let pdata = {};
      if (vm.checkQuery.id && vm.checkQuery.id !== "0") {
        pdata["Id"] = vm.checkQuery.id;
      } else {
        vm.$Message.error("参数有误");
        vm.loadingbtn1 = false;
        return;
      }
      pdata["AuditMsg"] = vm.auditMsg;
      Util.post(vm.checkQuery.posturl, pdata, vm, function(res) {
        if (res === "1") {
          vm.$emit("reLoad");
          vm.$Message.success("操作成功");
          vm.modalmsg = false;
          vm.auditMsg = "";
        } else {
          vm.$Message.error("操作失败");
        }
        vm.loadingbtn1 = false;
      });
    }
  },
  watch: {
    value(data) {
      this.init();
    }
  }
};
</script>