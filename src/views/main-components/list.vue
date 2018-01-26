<style lang="less">
@import "../../styles/common.less";
@import "../../tables/components/table.less";
</style>

<template>
    <div>
        <Card>
            <Row>
                <template v-if="showSearch">
                    <DatePicker type="date" v-if="showDate" placeholder="请选择开始日期" :format="formatDate" v-model="query.StartDate" style="width: 150px"></DatePicker>
                    <DatePicker type="date" v-if="showDate" placeholder="请选择结束日期" :format="formatDate" v-model="query.EndDate" style="width: 150px"></DatePicker>
                    <Input v-model="query.KeyWord" v-if="showKeyWord" placeholder="请输入关键字搜搜..." style="width: 150px" />
                    <template slot="searchslot">

                    </template>
                    <span @click="search" style="margin: 0 10px;"><Button type="primary" :loading="loading" icon="search">搜索</Button></span>
                    
                    <Button @click="cancelSearch" type="ghost">取消</Button>
                </template>
                <template>
                    <div style="float: right;">
                        <span @click="addModal" v-if="showAddButton" style=""><Button type="primary"  icon="add">新增</Button></span>
                         <slot name="rightbtn"></slot>
                    </div>
                </template>
            </Row>
            <Row>
                <div class="margin-top-10">
                    <can-edit-table refs="table4" v-model="editInlineAndCellData" :hover-show="true" :editIncell="true" :columns-list="editInlineAndCellColumn"
                        :loading="loadingTable" :update-url="updateUrl" :delete-url="deleteUrl" @on-reload="reload" :routername="routername"  @set-form="setForm" @set-selected="setSelected"></can-edit-table>

                </div>

                <Modal :width="modalWidth" v-model="showFrom"    :scrollable="scrollable" v-if="modalList!=true" >
                        <slot name="fromtop"></slot>
                    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                        <slot name="frommodel"></slot>
                    </Form>

                    <div slot="footer">
                        <Button type="ghost" @click="closeModal">取消</Button>
                        <Button type="primary"  v-if="submitbtn" @click="saveInfo" :loading="loading2">确定</Button>
                    </div>
                </Modal>

                 <Modal :width="modalWidth" v-model="showModalList" v-if="modalList"  :scrollable="scrollable" >
                     <template >
                          <slot name="ModalList" ref="ModalList1"></slot>
                            <div slot="footer">
                                <Button type="ghost" @click="closeModalList">取消</Button>
                                <Button type="primary"  v-if="submitbtn" @click="checkInfo" :loading="loading2">选择</Button>
                            </div>
                     </template>
                    
                </Modal>
            </Row>
            <Row v-if="showPage">
                <div style="float: left;" class="margin-top-10">
                    <Page :total="totalCount" :current="query.page" @on-change="changePage"></Page>
                </div>
            </Row>
        </Card>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import canEditTable from "../../tables/components/canEditTable.vue";
import tableData from "../../tables/components/table_data.js";
import Util from "../../libs/util.js";
import md5 from "js-md5";

export default {
  name: "editable-table",
  components: {
    canEditTable
  },
  props: {
    showSearch: {
      type: Boolean,
      default: false
    },
    showDate: {
      type: Boolean,
      default: false
    },
    showKeyWord: {
      type: Boolean,
      default: false
    },
    showAddButton: {
      type: Boolean,
      default: false
    },
    showPage: {
      type: Boolean,
      default: false
    },
    submitbtn: {
      type: Boolean,
      default: true
    },
    laststepbtn: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    updateUrl: String,
    deleteUrl: String,
    addUrl: String,
    getUrl: String,
    formCustom: Object,
    ruleCustom: Object,
    modalWidth: {
      type: Number,
      default: 500
    },
    modalLabel: Number,
    routername: String,
    otherQuery: Object,
    modalList: {
      type: Boolean,
      default: false
    },
    modalSelect: Array,
    recommendType: Number, //推荐类型 1:首页商品推荐;
    defaultSidx:String
  },
  data() {
    return {
      selectedData: "1",
      editInlineAndCellColumn: [],
      editInlineAndCellData: [],
      loading: false,
      loading2: false,
      loadingTable: true,
      searchConName3: "",
      formatDate: "yyyy-MM-dd",
      showFrom: false,
      showModalList: false,
      totalCount: 0,
      current: 1,
      query: {
        Page: 1,
        Rows: 10,
        KeyWord: "",
        StartDate: "",
        EndDate: "",
        Sidx: "Id",
        Sord: "desc"
      }
    };
  },
  methods: {
    getData() {
      this.loadingTable = true;
      let pdata = this.query;
      let oq = this.otherQuery;
      for (let key in oq) {
        pdata[key] = oq[key];
      }
      let vm = this;

      Util.post(vm.getUrl, pdata, vm, function(res, data) {
        if (res === "1") {
          vm.totalCount = data.totalCount;
          vm.loadingTable = false;
          vm.editInlineAndCellColumn = data.columns;
          if (data.totalCount > 0) {
            vm.editInlineAndCellData = data.data;
          } else {
            vm.editInlineAndCellData = [];
          }
        } else {
          vm.$Message.error("数据获取失败");
          vm.loadingTable = false;
        }
      });
    },
    search() {
      this.getData();
    },
    cancelSearch() {
      this.query.KeyWord = "";
      this.query.StartDate = "";
      this.query.EndDate = "";
      this.getData();
    },
    addModal() {
      if (this.modalList) {
        this.showModalList = true;
      } else {
        this.showFrom = true;
        this.$emit("set-form");
      }
    },
    transfer() {
      this.showFrom = true;
    },
    saveInfo() {
      this.loading2 = true;
      this.$refs["formCustom"].validate(valid => {
        if (valid) {
          let vm = this;
          let pdata = this.formCustom;
          Util.post(this.addUrl, pdata, vm, function(res, msg) {
            if (res === "1") {
              vm.$Message.success("保存成功");
              vm.getData();
              vm.loading2 = false;

              if (pdata.Id > 0) {
                vm.showFrom = false;
              } else vm.$emit("set-form");
            } else {
              if (msg && msg != "") {
                vm.$Message.error(msg);
              } else {
                vm.$Message.error("保存失败");
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
    closeModalList() {
      this.showModalList = false;
    },
    changePage(n) {
      this.query.Page = n;
      this.getData();
    },
    reload(key, order) {
      this.query.Sidx = key;
      this.query.Sord = order;
      this.getData();
    },
    setForm(data) {
      this.showFrom = true;
      this.$emit("set-form", data);
    },
    checkInfo() {
      let vm = this;
      this.loading2 = true;
      let selected = vm.modalSelect;

      if (!selected || selected.length <= 0) {
        vm.$Message.error("未选择任何项");
        this.loading2 = false;
        return;
      }
      let pdata = { TypeId: vm.recommendType, Ids: selected.toString() };
      Util.post(this.addUrl, pdata, vm, function(res, msg) {
        if (res === "1") {
          vm.$Message.success("保存成功");
          vm.getData();
          vm.loading2 = false;

          vm.showModalList = false;
        } else {
          if (msg && msg != "") {
            vm.$Message.error(msg);
          } else {
            vm.$Message.error("保存失败");
          }

          vm.loading2 = false;
        }
      });
    },
    setSelected(data) {
      let ids = [];
      data.forEach(res => {
        ids.push(res["Id"]);
      });
      this.$emit("set-Select", ids);
    },
    getSelected() {
      return this.modalSelect;
    }
  },
  mounted() {
    if(this.defaultSidx){
      this.query.Sidx=this.defaultSidx;
    }
    this.getData();
  },
     watch: {
    // 如果路由有变化，会再次执行该方法
      '$route': 'getData'
    }
};
</script>