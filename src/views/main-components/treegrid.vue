
<!--@events  @on-row-click 单击行或者单击操作按钮方法
            @on-selection-change  多选模式下 选中项变化时触发
            @on-sort-change  排序时有效，当点击排序时触发
   @props   items 显示的结构化数据
            columns 表格列的配置描述 sortable:true 开启排序功能 
            type: 'selection'为多选功能 type: 'action' 为操作功能 actions:[{}] 操作按钮
 -->
 <style lang="less">
@import "./treegrid.less";
</style>
<template>
    <Card>
        <Row>
            <div style="float: right;">
                <span @click="addModal" style=""><Button type="primary"  icon="add">新增</Button></span>
            </div>
        </Row>
        <Row class="margin-top-10">
           <div :style="{width:tableWidth}" class='autoTbale'>
                <table class="table table-bordered" id='hl-tree-table'>
                    <thead>
                        <tr>
                            <th v-for="(column,index) in cloneColumns">
                                <label v-if="column.type === 'selection'">
                                    <input type="checkbox" v-model="checks" @click="handleCheckAll">
                                </label>
                                <label v-else>
                                    {{ renderHeader(column, index) }}
                                    <span class="ivu-table-sort" v-if="column.sortable">
                                        <Icon type="arrow-up-b" :class="{on: column._sortType === 'asc'}" @click.native="handleSort(index, 'asc')" />
                                        <Icon type="arrow-down-b" :class="{on: column._sortType === 'desc'}" @click.native="handleSort(index, 'desc')" />
                                    </span>
                                </label>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in initItems" :key="item.id" v-show="show(item)" :class="{'child-tr':item.parent}">
                            <td v-for="(column,snum) in columns" :key="column.key" :style=tdStyle(column)>
                                <label v-if="column.type === 'selection'">
                                    <input type="checkbox" :value="item.id" v-model="checkGroup">
                                </label>
                                <template v-if="column.type === 'action'" v-for='action in (column.actions)'>
                                    <Poptip class="ivu-poptip" v-if="action.text === '删除'" confirm title="您确认删除这条内容吗？" @on-ok="RowDelete(item)" > <Button  :type="action.type" size="small"  :key="action.text">{{action.text}}</Button></Poptip>
                                    <Button style="margin: 0px 5px;" v-if="action.text !== '删除'" :type="action.type" size="small" @click="RowClick(item,$event,index,action.text)"  :key="action.text">{{action.text}}</Button>
                                </template>
                                <label @click="toggle(index,item)" v-if="!column.type">
                                    <span v-if='snum==iconRow()'>
                                        <i v-html='item.spaceHtml'></i>
                                        <i v-if="item.children&&item.children.length>0" class="ivu-icon" :class="{'ivu-icon-plus-circled':!item.expanded,'ivu-icon-minus-circled':item.expanded }"></i>
                                        <i v-else class="ms-tree-space"></i>
                                    </span> {{renderBody(item,column) }}
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            <Modal :width="modalWidth" v-model="showFrom"  @on-cancel="closeModal" :closable="false">
                <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                        <slot name="formmodel"></slot>
                    </Form>

                    <div slot="footer">
                        <Button type="ghost" @click="closeModal">取消</Button>
                        <Button type="primary" @click="saveInfo" :loading="loading2">确定</Button>
                    </div>
            </Modal>
            </div>
        </Row>
    </Card>
</template>

<script>
import Util from '../../libs/util.js';
export default {
  name: "treeGrid",
  props: {
    columns: Array,
    items: {
      type: Array,
      default: function() {
        return [];
      }
    },
    updateUrl: String,
    deleteUrl: String,
    addUrl: String,
    getUrl: String,
    formCustom: Object,
    ruleCustom: Object,
    modalWidth: Number,
    modalLabel: Number
  },
  data() {
    return {
      initItems: [], //处理后数据数组
      cloneColumns: [], //处理后的表头数据
      checkGroup: [], //复选框数组
      checks: false, //全选
      screenWidth: document.body.clientWidth, //自适应宽
      tdsWidth: 0, //td总宽
      timer: false, //控制监听时长
      dataLength: 0, //树形数据长度,
      showFrom: false,
      loading2: false,
      editItem: ""
    };
  },
  computed: {
    tableWidth() {
      return this.tdsWidth > this.screenWidth && this.screenWidth > 0
        ? this.screenWidth + "px"
        : "100%";
    }
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        setTimeout(() => {
          this.timer = false;
        }, 400);
      }
    },
    items() {
      if (this.items) {
        this.dataLength = this.Length(this.items);
        this.initData(this.deepCopy(this.items), 1, null);
        this.checkGroup = this.renderCheck(this.items);
        if (this.checkGroup.length == this.dataLength) {
          this.checks = true;
        } else {
          this.checks = false;
        }
      }
    },
    columns: {
      handler() {
        this.cloneColumns = this.makeColumns();
      },
      deep: true
    },
    checkGroup(data) {
      this.checkAllGroupChange(data);
    }
  },
  mounted() {
    if (this.items) {
      this.dataLength = this.Length(this.items);
      this.initData(this.deepCopy(this.items), 1, null);
      this.cloneColumns = this.makeColumns();
      this.checkGroup = this.renderCheck(this.items);
      if (this.checkGroup.length == this.dataLength) {
        this.checks = true;
      } else {
        this.checks = false;
      }
    }
    // 绑定onresize事件 监听屏幕变化设置宽
    this.$nextTick(() => {
      this.screenWidth = document.body.clientWidth;
    });
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
  },
  methods: {
    // 有无多选框折叠位置优化
    iconRow() {
      for (var i = 0, len = this.columns.length; i < len; i++) {
        if (this.columns[i].type == "selection") {
          return 1;
        }
      }
      return 0;
    },
    // 设置td宽度,td的align
    tdStyle(column) {
      var style = {};
      if (column.align) {
        style["text-align"] = column.align;
      }
      if (column.width) {
        style["min-width"] = column.width + "px";
      }
      return style;
    },
    // 排序事件
    handleSort(index, type) {
      this.cloneColumns.forEach(col => (col._sortType = "normal"));
      if (this.cloneColumns[index]._sortType === type) {
        this.cloneColumns[index]._sortType = "normal";
      } else {
        this.cloneColumns[index]._sortType = type;
      }
      this.$emit(
        "on-sort-change",
        this.cloneColumns[index]["key"],
        this.cloneColumns[index]["_sortType"]
      );
    },
    // 点击某一行事件
    RowClick(data, event, index, text) {
        let result = this.makeData(data);
        if(text==="编辑")
        {
             this.showFrom = true;
             this.$emit("set-form", result);
        }

    },
    RowDelete(currentRow){
        let vm=this;
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
        });
    },
    // 点击事件 返回数据处理
    makeData(data) {
      const t = this.type(data);
      let o;
      if (t === "array") {
        o = [];
      } else if (t === "object") {
        o = {};
      } else {
        return data;
      }
      if (t === "array") {
        for (let i = 0; i < data.length; i++) {
          o.push(this.makeData(data[i]));
        }
      } else if (t === "object") {
        for (let i in data) {
          if (
            i != "spaceHtml" &&
            i != "parent" &&
            i != "level" &&
            i != "expanded" &&
            i != "isShow" &&
            i != "load"
          ) {
            o[i] = this.makeData(data[i]);
          }
        }
      }
      return o;
    },
    // 处理表头数据
    makeColumns() {
      let columns = this.deepCopy(this.columns);
      this.tdsWidth = 0;
      columns.forEach((column, index) => {
        column._index = index;
        column._width = column.width ? column.width : "";
        column._sortType = "normal";
        this.tdsWidth += column.width ? parseFloat(column.width) : 0;
      });
      return columns;
    },
    // 数据处理 增加自定义属性监听
    initData(items, level, parent) {
      this.initItems = [];
      let spaceHtml = "";
      for (var i = 1; i < level; i++) {
        spaceHtml += "<i class='ms-tree-space'></i>";
      }
      items.forEach((item, index) => {
        item = Object.assign({}, item, {
          parent: parent,
          level: level,
          spaceHtml: spaceHtml
        });
        if (typeof item.expanded == "undefined") {
          item = Object.assign({}, item, {
            expanded: false
          });
        }
        if (typeof item.show == "undefined") {
          item = Object.assign({}, item, {
            isShow: false
          });
        }
        item = Object.assign({}, item, {
          load: item.expanded ? true : false
        });
        this.initItems.push(item);
        if (item.children && item.expanded) {
          this.initData(item.children, level + 1, item);
        }
      });
    },
    //  隐藏显示
    show(item) {
      return (
        item.level == 1 || (item.parent && item.parent.expanded && item.isShow)
      );
    },
    toggle(index, item) {
      let level = item.level + 1;
      let spaceHtml = "";
      for (var i = 1; i < level; i++) {
        spaceHtml += "<i class='ms-tree-space'></i>";
      }
      if (item.children) {
        if (item.expanded) {
          item.expanded = !item.expanded;
          this.close(index, item);
        } else {
          item.expanded = !item.expanded;
          if (item.load) {
            this.open(index, item);
          } else {
            item.load = true;
            item.children.forEach((child, childIndex) => {
              this.initItems.splice(index + childIndex + 1, 0, child);
              //设置监听属性
              this.$set(this.initItems[index + childIndex + 1], "parent", item);
              this.$set(this.initItems[index + childIndex + 1], "level", level);
              this.$set(
                this.initItems[index + childIndex + 1],
                "spaceHtml",
                spaceHtml
              );
              this.$set(this.initItems[index + childIndex + 1], "isShow", true);
              this.$set(
                this.initItems[index + childIndex + 1],
                "expanded",
                false
              );
            });
          }
        }
      }
    },
    open(index, item) {
      if (item.children) {
        item.children.forEach((child, childIndex) => {
          child.isShow = true;
          if (child.children && child.expanded) {
            this.open(index + childIndex + 1, child);
          }
        });
      }
    },
    close(index, item) {
      if (item.children) {
        item.children.forEach((child, childIndex) => {
          child.isShow = false;
          child.expanded = false;
          if (child.children) {
            this.close(index + childIndex + 1, child);
          }
        });
      }
    },
    //checkbox 全选 选择事件
    handleCheckAll() {
      this.checks = !this.checks;
      if (this.checks) {
        this.checkGroup = this.getArray(
          this.checkGroup.concat(this.All(this.items))
        );
      } else {
        this.checkGroup = [];
      }
      // this.$emit('on-selection-change', this.checkGroup)
    },
    // 数组去重
    getArray(a) {
      var hash = {},
        len = a.length,
        result = [];
      for (var i = 0; i < len; i++) {
        if (!hash[a[i]]) {
          hash[a[i]] = true;
          result.push(a[i]);
        }
      }
      return result;
    },
    checkAllGroupChange(data) {
      if (this.dataLength > 0 && data.length === this.dataLength) {
        this.checks = true;
      } else {
        this.checks = false;
      }
      this.$emit("on-selection-change", this.checkGroup);
    },
    All(data) {
      let arr = [];
      data.forEach(item => {
        arr.push(item.id);
        if (item.children && item.children.length > 0) {
          arr = arr.concat(this.All(item.children));
        }
      });
      return arr;
    },
    // 返回树形数据长度
    Length(data) {
      let length = data.length;
      data.forEach(child => {
        if (child.children) {
          length += this.Length(child.children);
        }
      });
      return length;
    },
    // 返回表头
    renderHeader(column, $index) {
      if ("renderHeader" in this.columns[$index]) {
        return this.columns[$index].renderHeader(column, $index);
      } else {
        return column.title || "#";
      }
    },
    // 返回内容
    renderBody(row, column, index) {
      return row[column.key];
    },
    // 默认选中
    renderCheck(data) {
      let arr = [];
      data.forEach(item => {
        if (item._checked) {
          arr.push(item.id);
        }
        if (item.children && item.children.length > 0) {
          arr = arr.concat(this.renderCheck(item.children));
        }
      });
      return arr;
    },
    // 深度拷贝函数
    deepCopy(data) {
      var t = this.type(data),
        o,
        i,
        ni;
      if (t === "array") {
        o = [];
      } else if (t === "object") {
        o = {};
      } else {
        return data;
      }
      if (t === "array") {
        for (i = 0, ni = data.length; i < ni; i++) {
          o.push(this.deepCopy(data[i]));
        }
        return o;
      } else if (t === "object") {
        for (i in data) {
          o[i] = this.deepCopy(data[i]);
        }
        return o;
      }
    },
    type(obj) {
      var toString = Object.prototype.toString;
      var map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object"
      };
      return map[toString.call(obj)];
    },
    addModal() {
      this.showFrom = true;
    },
    saveInfo() {
      // this.loading2=true;
      this.$refs["formCustom"].validate(valid => {
        if (valid) {
          var vm = this;
          Util.post(this.addUrl, this.formCustom, vm, function(res, msg) {
            if (res === "1") {
              vm.$Message.success("新增成功");
              for (var key in vm.formCustom) {
                vm.formCustom[key] = "";
              }
              vm.getData();
              vm.loading2 = false;
            } else {
              if (msg && msg != "") {
                vm.$Message.error(msg);
              } else {
                vm.$Message.error("新增失败");
              }

              vm.loading2 = false;
            }
          });
        } else {
          console.log("error submit!!");
          this.loading2 = false;
          return false;
        }
      });
    },
    closeModal() {
      this.showFrom = false;
    },
    addModal() {
        this.showFrom=true;
        this.$emit("set-form");
    }
  },
  beforeDestroy() {
    window.onresize = null;
  }
};
</script>
