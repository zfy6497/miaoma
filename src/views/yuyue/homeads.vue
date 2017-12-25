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
                <Input v-model="query.KeyWord" placeholder="请输入标题..." style="width: 200px" />
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

                <Modal :width="560" :scrollable="true" v-model="showAdd"  class-name="vertical-center-modal" title="广告管理">
                    <template>
                        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="120">
                            <FormItem label="* 标题" prop="Name">
                                <div style="display:inline-block;width:300px;">
                                    <input type="hidden" v-model="formCustom.TypeId">
                                    <Input type="text" placeholder="请输入标题" v-model="formCustom.Name"></Input>
                                </div> 
                            </FormItem>
                            <FormItem label="* 图片" prop="ImageUrl">
                                <div style="display:inline-block;width:300px;">
                                    <Input type="text"  placeholder="请上传图片" v-model="formCustom.ImageUrl"></Input>
                                </div>
                            </FormItem>
                            <FormItem label="* 链接" prop="Url">
                                <div style="display:inline-block;width:300px;">
                                    <Input type="text"  v-model="formCustom.Url" placeholder="请输入链接" ></Input>
                                 </div>
                            </FormItem>
                            <FormItem label="* 排序" prop="Sort">
                                 <div style="display:inline-block;width:300px;">
                                    <Input type="text" v-model="formCustom.Sort" placeholder="排序号小的排在最前面" number></Input>
                                 </div>
                            </FormItem>
                            <!-- <FormItem label="* 是否显示" prop="TopImage">
                                 <div style="display:inline-block;width:300px;">
                                    <RadioGroup v-model="formCustom.TopImage">
                                        <Radio label="是">是</Radio>
                                        <Radio label="否">否</Radio>
                                    </RadioGroup>
                                 </div>
                                 
                            </FormItem> -->
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
    const validateImageUrl = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请上传图片"));
      }
      callback();
    };
    const validateUrl = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入链接"));
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
        Id:0,
        Name:"", //名称
        ImageUrl:"", //图片链接
        Url:"", //链接
        TypeId:0,
        Sort:99
      },
      ruleCustom: {
        ImageUrl: [{ validator: validateImageUrl, trigger: "blur" }],
        Name: [{ validator: validateName, trigger: "blur" }],
        Url:[{validator:validateUrl,trigger:"blur"}]
      },
      query: {
        ApiUid: Cookies.get("mmnum"),
        Token: Cookies.get("token"),
        Page: 1,
        Rows: 10,
        KeyWord: "",
        StartDate: "",
        EndDate: "",
        TypeId:0 //滚动广告
      },
      updateUrl: "api/SlideAds/AddOrUpdate",
      deleteUrl: "api/SlideAds/Delete",
      addUrl: "api/SlideAds/AddOrUpdate",
      getUrl: "api/SlideAds/GetList"
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
      let vm=this;
      vm.showAdd = true;
    },
    editModal:function(vm, h, currentRow, index){
      let vm=this;
      vm.showAdd = true;
      vm.formCustom=currentRow;     
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
      this.getData();
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