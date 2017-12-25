<style lang="less">
@import "../../styles/common.less";
@import "../../tables/components/table.less";
@import "./form.less";
</style>

<template>
    <div>
        <Card>
            <Row>
                <DatePicker type="date" placeholder="请选择开始日期"  :format="formatDate" v-model="query.StartDate" style="width: 200px;display:none;"></DatePicker>
                <DatePicker type="date" placeholder="请选择结束日期" :format="formatDate" v-model="query.EndDate" style="width: 200px;display:none;"></DatePicker>
                <Input v-model="query.KeyWord" placeholder="请输入门店名称..." style="width: 200px" />
                <span @click="search" ><Button type="primary" :loading="loading" icon="search">搜索</Button></span>
                <Button @click="cancelSearch" type="ghost">取消</Button>
                <template>
                    <div style="float: right;">
                         <span @click="addModal" style="margin: 0 10px;"><Button type="primary"  icon="plus-round">新增</Button></span>
                    </div>
                </template>

            </Row>
            <Row>
                <div class="margin-top-10">
                    <can-edit-table refs="table4" v-model="editInlineAndCellData" :hover-show="true"  :columns-list="editInlineAndCellColumn"
                        :loading="loadingTable" :update-url="updateUrl" :delete-url="deleteUrl" :editMessage="editModal" ></can-edit-table>
                </div>

                <Modal :width="560" :scrollable="true" v-model="showAdd"  class-name="vertical-center-modal" title="门店管理">
                    <template>
                        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="120"   >
                            <FormItem label="* 标题" prop="W_ReplyTitle" >
                                  <div style="display:inline-block;width:300px;">
                                      <Input type="text" placeholder="请输入图文回复标题" v-model="formCustom.W_ReplyTitle"></Input>
                                  </div>
                            </FormItem>
                            <FormItem label="* tup" prop="W_ReplyTitle" >
                                  <div style="display:inline-block;width:300px;">
                                      <Input type="text"  placeholder="请上传图文回复图片" v-model="formCustom.W_ReplyImage"></Input>
                                  </div>
                            </FormItem>
                           
                            <FormItem label="* 所在区域" prop="AreaId">
                                <div style="display:inline-block;width:300px;">
                                    <Input type="text"  v-model="formCustom.AreaId" number></Input>
                                 </div>
                            </FormItem>
                            <FormItem label="* 门店名称" prop="Name">
                                 <div style="display:inline-block;width:300px;">
                                    <Input type="text" v-model="formCustom.Name"></Input>
                                 </div>
                            </FormItem>
                            <FormItem label="* 顶部图片" prop="TopImage">
                                 <div style="display:inline-block;width:300px;">
                                    <Input type="text" v-model="formCustom.TopImage"></Input>
                                 </div>
                            </FormItem>
                            <FormItem label="* 联系电话" prop="Telephone">
                                 <div style="display:inline-block;width:300px;">
                                    <Input type="text" v-model="formCustom.Telephone"></Input>
                                 </div>
                            </FormItem>
                            <FormItem label="* 门店地址" prop="Address">
                                 <div style="display:inline-block;width:300px;">
                                    <Input type="text" v-model="formCustom.Address"></Input>
                                 </div>
                            </FormItem>
                            <FormItem label="门店地理经度" prop="Longitude">
                                 <div style="display:inline-block;width:300px;">
                                    <Input type="text" v-model="formCustom.Longitude"></Input>
                                 </div>
                            </FormItem>
                            <FormItem label="门店地理纬度" prop="Latitude">
                                 <div style="display:inline-block;width:300px;">
                                    <Input type="text" v-model="formCustom.Latitude"></Input>
                                 </div>
                            </FormItem>
                            <FormItem label="* 门店简介" prop="Remark">
                                 <div style="display:inline-block;width:300px;">
                                    <Input type="text" v-model="formCustom.Remark"></Input>
                                 </div>
                            </FormItem>
                            <FormItem label="* 订单页头部图片" prop="OrderPageTopImage">
                                 <div style="display:inline-block;width:300px;">
                                    <Input type="text" v-model="formCustom.OrderPageTopImage"></Input>
                                 </div>
                            </FormItem>
                            <FormItem label="* 订单预约说明" prop="OrderPageRemark">
                                 <div style="display:inline-block;width:300px;">
                                    <Input type="text" v-model="formCustom.OrderPageRemark"></Input>
                                 </div>
                            </FormItem>
                            <FormItem label="* 排序" prop="Sort">
                                 <div style="display:inline-block;width:300px;">
                                    <Input type="text" v-model="formCustom.Sort" number placeholder="排序号码越小越靠前" ></Input>
                                 </div>
                            </FormItem>
                        </Form>
                      
                    </template>
                    <div slot="footer">
                        <Button type="ghost" @click="closeModal">取消</Button>
                        <Button type="primary" @click="saveInfo" :loading="loading2">确定</Button>
                    </div>

                </Modal>
            </Row>
            <Row>
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
  data() {
    const validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入门店名称"));
      }
      callback();
    };
    const validateTelephone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入联系电话"));
      }
      callback();
    };
    return {
      editInlineAndCellColumn: [],
      editInlineAndCellData: [],
      loading: false,
      loading2: false,
      loadingTable: true,
      searchConName3: "",
      formatDate: "yyyy-MM-dd",
      showAdd: false,
      totalCount: 0,
      current: 1,
      formCustom: {
        Id: 0,
        W_ReplyTitle: "", //图文回复标题
        W_ReplyImage: "", //图文回复图片
        W_LinkUrl: "", //微信访问链接
        AreaId: 0, //区域ID
        Name: "", //门店名称
        TopImage: "", //顶部图片
        Telephone: "", //电话
        Address: "",
        Remark: "",
        Longitude: "",
        Latitude: "",
        Sort: 99,
        OrderPageTopImage: "",
        OrderPageRemark: ""
      },
      ruleCustom: {
        Telephone: [{ validator: validateTelephone, trigger: "blur" }],
        Name: [{ validator: validateName, trigger: "blur" }]
      },
      query: {
        ApiUid: Cookies.get("mmnum"),
        Token: Cookies.get("token"),
        Page: 1,
        Rows: 10,
        KeyWord: "",
        StartDate: "",
        EndDate: ""
      },
      updateUrl: "api/Store/AddOrUpdate",
      deleteUrl: "api/Store/Delete",
      addUrl: "api/Store/AddOrUpdate",
      getUrl: "api/Store/GetList"
    };
  },
  methods: {
    getData() {
      this.loadingTable = true;
      var pdata = this.query;
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
          vm.$Message.error("获取数据失败~");
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
      this.showAdd = true;
    },
    editModal:function(vm, h, currentRow, index){
          this.showAdd = true;
          this.formCustom=currentRow;
    },
    transfer() {
      this.showAdd = true;
    },
    saveInfo() {
      this.loading2 = true;
      this.$refs["formCustom"].validate(valid => {
        if (valid) {
          var vm = this;
          let pdata = this.formCustom;
          Util.post(this.addUrl, pdata, this, function(res) {
            if (res === "1") {
              vm.$Message.success("操作成功");
              for (var key in vm.formCustom) {
                vm.formCustom[key] = "";
              }
              vm.getData();
              vm.loading2 = false;
            } else {
              vm.$Message.error("操作失败");
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
      this.showAdd = false;
    },
    changePage(n) {
      this.query.Page = n;
      this.getData();
    }
  },
  mounted() {
    this.getData();
  }
};
</script>