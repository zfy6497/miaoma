<template>
    <Row>
        <Col>
        <Card>
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="70">
                <Tabs value="name1">
                    <TabPane label="商品属性" name="name1">
                        <FormItem label="分类" prop="CategoryId">
                            <Cascader style="width: 400px;margin-left: 16px;" :data="cdata" v-model="value1" @on-change="categoryChange"></Cascader>
                        </FormItem>
                           <FormItem label="品牌" prop="BrandId">
                      
                        <Select v-model="formCustom.BrandId" style="width:400px">
                         <Option v-for="item in brandlist" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
                          </Select>
                        </FormItem>
                        <FormItem label="名称" prop="ProductName">
                        
                            <Input type="text" style="width: 400px" v-model="formCustom.ProductName"></Input>
                        </FormItem>
                         <FormItem label="商品编码" prop="ProductCode">
                            <Input type="text" style="width: 400px" v-model="formCustom.ProductCode"></Input>
                        </FormItem>
                        <FormItem label="售价" prop="MinSalePrice">
                            <Input type="text" style="width: 100px" v-model="formCustom.MinSalePrice" :number="true">
                            <span slot="prepend">￥</span>
                            </Input>
                        </FormItem>
                        <FormItem label="原价" prop="MarketPrice">
                            <Input type="text" style="width: 100px" v-model="formCustom.MarketPrice" :number="true">
                            <span slot="prepend">￥</span>
                            </Input>
                        </FormItem>
                          <FormItem label="库存" prop="Stock">
                            <Input type="text" style="width: 100px" v-model="formCustom.Stock" :number="true">
                            </Input>
                        </FormItem>
                        <FormItem label="商品图片" prop="ImagePath">
                            <PhUpload @get-result="getresult" :default-list="defaultLogo" :format="['jpg','jpeg','png']" :maxsize="1024*10" :maxlength="5">
                            </PhUpload>
                        </FormItem>
                        <FormItem label="分佣金额" prop="ShareMoney">
                            <Input type="text" style="width: 100px" v-model="formCustom.ShareMoney" :number="true"></Input>
                        </FormItem>
                        <FormItem label="运费模板" prop="FreightTemplateId">
                        <Select v-model="formCustom.FreightTemplateId" style="width:400px">
                         <Option v-for="item in freights" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
                          </Select>
                        </FormItem>
                         <FormItem v-if="valuationMethod==1" label="重量(KG)" prop="Weight">
                            <Input type="text" style="width: 100px" v-model="formCustom.Weight" :number="true">
                            </Input>
                        </FormItem>
                         <FormItem  v-if="valuationMethod==2" label="体积(m3)" prop="Volume">
                            <Input type="text" style="width: 100px" v-model="formCustom.Volume" :number="true">
                            </Input>
                        </FormItem>
                        <FormItem label="简介" prop="ShortDescription">
                            <Input type="textarea" :rows="4" style="width: 400px" v-model="formCustom.ShortDescription"></Input>
                        </FormItem>
                        <FormItem label="属性" prop="">
                             <table style="width:800px;"  v-if="attrlist && attrlist.length>0">
                                     <tr v-for="attr in attrlist">
                                         <td style="width:150px;">
                                           <label>{{attr.Name}}</label>
                                         </td>
                                         <td>
                                             <div><CheckboxGroup v-model="attr.CheckIds">
                                                     <Checkbox :label="val.Id" :value="val.Id" v-for="val in attr.Vals">{{val.AttrValue}}</Checkbox>
                                               </CheckboxGroup></div>
                                         </td>
                                     </tr>
                                 </table>
                                   <router-link v-if="!attrlist || attrlist.length==0"  :to="{name:'types'}">设置属性</router-link>
                        </FormItem>
                         <FormItem label="规格" prop="">
                             <template v-if="spelist && spelist.length>0" >
                               <a href="javascript:;"  @click="checkspes = true">规格设置</a>
                               
                                    <Table v-if="skus && skus.length>0"  :columns="skucolumns" :data="skus" :width="980"></Table>
                             </template>
                             <router-link v-if="!spelist || spelist.length==0"  :to="{name:'types'}">设置规格</router-link>
                        </FormItem>
                        <FormItem label="说明" prop="Description">
                            <UEditor ref="ueditor1"></UEditor>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="saveInfo">提交</Button>
                        </FormItem>
                    </TabPane>

                </Tabs>
            </Form>
              <Modal v-model="checkspes" @on-ok="getSepData">
                     <table >
                                     <tr v-for="attr in spelist">
                                         <td style="width:80px;line-height: 30px;">
                                           <label>{{attr.Name}}</label>
                                         </td>
                                         <td>
                                             <div><CheckboxGroup v-model="attr.CheckIds">
                                                     <Checkbox :label="val.Id" :value="val.Id" v-for="val in attr.Vals">{{val.AttrValue}}</Checkbox>
                                               </CheckboxGroup></div>
                                         </td>
                                     </tr>
                      </table>
              </Modal>
        </Card>
        </Col>
    </Row>
</template>


<script>
import PhUpload from "../main-components/phupload.vue";
import Util from "../../libs/util.js";
import {
  validateNum,
  validateRequired,
  validateInteger
} from "../../libs/validate.js";
import UEditor from "../main-components/ueditor.vue";
export default {
  name: "page1-detail",
  components: {
    PhUpload,
    UEditor
  },
  data() {
    return {
      value1: [],
      formCustom: {
        Id: this.$route.params.id,
        ProductName: "",
        ProductCode: "",
        ShortDescription: "",
        FreightTemplateId: 0,
        Weight: 0,
        Volume: 0,
        ImagePath: "",
        Description: "",
        ShareMoney: 0,
        BrandId: 0,
        CategoryId: 0,
        CategoryPath: "",
        MarketPrice: 0,
        MinSalePrice: 0,
        Stock: 0,
        TypeId:0
      },
      ruleCustom: {
        ProductName: [{ validator: validateRequired, trigger: "blur" }],
        DisplaySequence: [{ validator: validateInteger, trigger: "blur" }],
        MinSalePrice: [{ validator: validateNum, trigger: "blur" }],
        MarketPrice: [{ validator: validateNum, trigger: "blur" }],
        ImagePath: [{ validator: validateRequired, trigger: "blur" }],
        SalePrice: [{ validator: validateNum, trigger: "blur" }],
        Stock: [{ validator: validateInteger, trigger: "blur" }],
        Weight: [{ validator: validateNum, trigger: "blur" }],
        Volume: [{ validator: validateNum, trigger: "blur" }]
      },
      defaultLogo: [],
      cdata: [],
      query: {
        Page: 1,
        Rows: 100,
        KeyWord: "",
        StartDate: "",
        EndDate: "",
        Sidx: "Id",
        Sord: "desc"
      },
      loading2: false,
      editurl: "admin/Products/SaveProducts",
      brandlist: [],
      freights: [],
      attrlist: [],
      spelist: [],
      skus: [],
      skucolumns: [],
      oldskus: [],
      oldattrids: [],
      checkspes: false
    };
  },
  beforeDestroy() {
    this.$refs.ueditor1.destoryUE();
  },
  destroyed() {},
  computed: {
    valuationMethod: function() {
      let vm = this;
      let temp = 0;
      let model = vm.freights.filter(function(e) {
        return e.Id == vm.formCustom.FreightTemplateId;
      });

      if (model && model.length > 0) {
        temp = model[0].ValuationMethod;
      }
      return temp;
    }
  },
  watch: {
    value1: function(val, oldvalue) {
      let t1 = val.length;
      if (t1 > 0) {
        this.formCustom.CategoryId = val[t1 - 1];
        this.formCustom.CategoryPath = val.toString();
      }
    }
  },
  mounted() {
    // this.editor = UE.getEditor('editor',{ BaseUrl: '', UEDITOR_HOME_URL: 'src/statics/ueditor/', });
    this.getCData();
    this.setForm();
  },
  methods: {
    categoryChange(value, selectedData) {
      let types = selectedData.map(o => o.TypeId);
      if (types && types.length > 0) {
        let tid=types[types.length - 1];
        this.formCustom.TypeId=tid
        this.getAttrList(tid);
      }
    },
    getresult(data) {
      if (data.length > 0) {
        let t1 = [];
        data.forEach(res => {
          t1.push(res.url);
        });
        this.formCustom.ImagePath = t1.toString();
      }
    },
    setForm(data) {
      if (data) {
        let vm = this;
        try {
          for (let key in this.formCustom) {
            this.formCustom[key] = data[key];
            if (key === "ImagePath") {
              let imgs = data[key].split(",");
              let t1 = [];
              let i = 1;
              imgs.forEach(res => {
                var item = { name: "img" + i, url: res, status: "finished" };
                t1.push(item);
                i++;
              });
              this.defaultLogo = t1;
            }
            if (key === "Description" && data[key]) {
              vm.$refs.ueditor1.setUEContent(data[key]);
            }
          }

          if (data["CategoryPath"]) {
            let t1 = [];
            data["CategoryPath"].split(",").forEach(res => {
              t1.push(parseInt(res));
            });
            vm.value1 = t1;

            console.log(t1);
          }

          if (data["Skus"]) {
            vm.oldskus = data["Skus"];
          }
          if (data["AttrIds"]) {
            vm.oldattrids = data["AttrIds"];
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        for (let key in this.formCustom) {
          let iarr = [
            "Id",
            "FreightTemplateId",
            "Weight",
            "Volume",
            "ShareMoney",
            "MarketPrice",
            "SalePrice",
            "BrandId"
          ];
          let notclear = ["BrandId", "CategoryId", "CategoryPath"];
          if (iarr.indexOf(key) >= 0) {
            this.formCustom[key] = 0;
          } else if (notclear.indexOf(key) >= 0) {
          } else {
            this.formCustom[key] = "";
          }
        }
        // this.value1=[];
        this.defaultLogo = [];
        this.$refs.ueditor1.setUEContent("");
      }
    },
    getCData() {
      var pdata = this.query;
      let vm = this;

      Util.post("admin/Products/GetOtherList", pdata, vm, function(res, data) {
        if (res === "1") {
          var result = data.data;
          if (result) {
            if (result.Categories) {
              vm.cdata = result.Categories;
            } else {
              vm.cdata = [];
            }
            if (result.Brands) {
              vm.brandlist = result.Brands;
            } else {
              vm.brandlist = [];
            }
            if (result.Freights) {
              vm.freights = result.Freights;
            } else {
              vm.freights = [];
            }
          }
        } else {
        }
      });
      if (this.formCustom.Id && this.formCustom.Id != 0) {
        Util.post(
          "admin/Products/GetProductsDetail",
          { Id: this.formCustom.Id },
          vm,
          function(res, data) {
            if (res === "1") {
              vm.getAttrList(data.data.TypeId);
              vm.setForm(data.data);
            } else {
              vm.$Message.error("商品信息有误");
            }
          }
        );
      }
    },

    getAttrList(id) {
      let vm = this;
      if (id && id > 0) {
        Util.post("admin/Products/GetAttrsList", { Id: id }, vm, function(
          res,
          data
        ) {
          if (res === "1") {
            let result = data.data;
            let attrs = result.filter(function(e) {
              return e.AttrType == 0;
            });
            let spes = result.filter(function(e) {
              return e.AttrType == 1;
            });
            if (attrs && attrs.length > 0) {
              vm.attrlist = attrs;
            } else {
              vm.attrlist = [];
            }
            if (spes && spes.length > 0) {
              vm.spelist = spes;
            } else {
              vm.spelist = [];
            }
            if (vm.oldattrids && vm.oldattrids.length > 0) {
              vm.attrlist.forEach(res => {
                let temp = [];
                res.Vals.forEach(item1 => {
                  if (vm.oldattrids.indexOf(item1.Id) >= 0) {
                    temp.push(item1.Id);
                  }
                });
                res.CheckIds = temp;
              });
            }
            vm.getSepData(1);
          } else {
          }
        });
      } else {
        vm.attrlist = [];
        vm.spelist = [];
        vm.skus = [];
      }
    },
    getSepData(isfirst) {
      let vm = this;

      if (isfirst && isfirst == 1 && vm.oldskus && vm.oldskus.length > 1) {
        //首次进入，而且sku有值
        let oids = [];
        vm.oldskus.forEach(res => {
          let tempid = res.Id.split("_");
          tempid.forEach((item1, index) => {
            if (index > 0) {
              oids.push(parseInt(item1));
            }
          });
        });

        if (oids && oids.length > 0) {
          this.spelist.forEach(res => {
            let temp = [];
            res.Vals.forEach(item1 => {
              if (oids.indexOf(item1.Id) >= 0) {
                temp.push(item1.Id);
              }
            });
            res.CheckIds = temp;
          });
        }
      }
      console.log(this.spelist);
      console.log("---------");
      let spes = this.spelist.filter(function(e) {
        return e.CheckIds.length > 0;
      });

      let templist1 = [];
      let templist2 = [];
      let templist3 = [];
      let skus = [];
      let columns = [];
      if (spes && spes.length > 0) {
        spes.forEach((res, index) => {
          let checks = res.CheckIds;
          let column = {};
          if (index == 0) {
            column = { title: res.Name, key: "SpeVal1" };
            res.Vals.forEach(e => {
              if (checks.indexOf(e.Id) >= 0) {
                templist1.push(e);
              }
            });
          }
          if (index == 1) {
            column = { title: res.Name, key: "SpeVal2" };
            res.Vals.forEach(e => {
              if (checks.indexOf(e.Id) >= 0) {
                templist2.push(e);
              }
            });
          }
          if (index == 2) {
            column = { title: res.Name, key: "SpeVal3" };
            res.Vals.forEach(e => {
              if (checks.indexOf(e.Id) >= 0) {
                templist3.push(e);
              }
            });
          }
          columns.push(column);
        });
        columns.push({
          title: "库存",
          key: "Stock",
          render: (h, params) => {
            return h("input", {
              domProps: {
                type: "text",
                value: params.row.Stock
              },
              class: "ivu-input",
              style: "width:140px;",
              on: {
                change(event) {
                  let spe = vm.skus.filter(function(e) {
                    return (
                      e.SpeVal1 == params.row.SpeVal1 &&
                      e.SpeVal2 == params.row.SpeVal2 &&
                      e.SpeVal3 == params.row.SpeVal3
                    );
                  });
                  if (spe && spe.length > 0) {
                    spe[0].Stock = event.target.value;
                  }
                }
              }
            });
          }
        });
        columns.push({
          title: "价格",
          key: "SalePrice",
          render: (h, params) => {
            return h("input", {
              domProps: {
                type: "text",
                value: params.row.SalePrice
              },
              class: "ivu-input",
              style: "width:140px;",
              on: {
                change(event) {
                  let spe = vm.skus.filter(function(e) {
                    return (
                      e.SpeVal1 == params.row.SpeVal1 &&
                      e.SpeVal2 == params.row.SpeVal2 &&
                      e.SpeVal3 == params.row.SpeVal3
                    );
                  });
                  if (spe && spe.length > 0) {
                    spe[0].SalePrice = event.target.value;
                  }
                }
              }
            });
          }
        });
        vm.skucolumns = columns;
        let pid = vm.formCustom.Id == 0 ? "" : vm.formCustom.Id;
        if (templist3 && templist3.length > 0) {
          templist1.forEach(item1 => {
            templist2.forEach(item2 => {
              templist3.forEach(item3 => {
                let sku = {
                  Id: pid + "_" + item1.Id + "_" + item2.Id + "_" + item3.Id,
                  ProductId: vm.formCustom.Id,
                  SpeVal1: item1.AttrValue,
                  SpeVal2: item2.AttrValue,
                  SpeVal3: item3.AttrValue,
                  Stock: 0,
                  SalePrice: 0
                };
                let oldsku = vm.oldskus.filter(function(e) {
                  return e.Id == sku.Id;
                });
                if (oldsku && oldsku.length > 0) {
                  skus.push(oldsku[0]);
                } else {
                  skus.push(sku);
                }
              });
            });
          });
        } else if (templist2 && templist2.length > 0) {
          templist1.forEach(item1 => {
            templist2.forEach(item2 => {
              let sku = {
                Id: pid + "_" + item1.Id + "_" + item2.Id + "_0",
                ProductId: vm.formCustom.Id,
                SpeVal1: item1.AttrValue,
                SpeVal2: item2.AttrValue,
                SpeVal3: "",
                Stock: 0,
                SalePrice: 0
              };
              let oldsku = vm.oldskus.filter(function(e) {
                return e.Id == sku.Id;
              });
              if (oldsku && oldsku.length > 0) {
                skus.push(oldsku[0]);
              } else {
                skus.push(sku);
              }
            });
          });
        } else if (templist1 && templist1.length > 0) {
          templist1.forEach(item1 => {
            let sku = {
              Id: pid + "_" + item1.Id + "_0_0",
              ProductId: vm.formCustom.Id,
              SpeVal1: item1.AttrValue,
              SpeVal2: "",
              SpeVal3: "",
              Stock: 0,
              SalePrice: 0
            };
            let oldsku = vm.oldskus.filter(function(e) {
              return e.Id == sku.Id;
            });
            if (oldsku && oldsku.length > 0) {
              skus.push(oldsku[0]);
            } else {
              skus.push(sku);
            }
          });
        }
        vm.skus = skus;
      }
    },
    saveInfo() {
      this.loading2 = true;
      this.$refs["formCustom"].validate(valid => {
        if (valid) {
          let vm = this;
          let pdata = this.formCustom;
          if (!pdata["BrandId"]) {
            pdata["BrandId"] = 0;
          }
          if (!pdata["CategoryId"]) {
            pdata["CategoryId"] = 0;
          }
          if (!pdata["FreightTemplateId"]) {
            pdata["FreightTemplateId"] = 0;
          }
          pdata.Skus = vm.skus;
          let spes = this.attrlist.filter(function(e) {
            return e.CheckIds.length > 0;
          });
          let attrs = [];
          if (spes && spes.length > 0) {
            spes.forEach(res => {
              let checks = res.CheckIds;
              res.Vals.forEach(e => {
                if (checks.indexOf(e.Id) >= 0) {
                  attrs.push(e);
                }
              });
            });
          }
          pdata.AttrList = attrs;
          let cont = vm.$refs.ueditor1.getUEContent();
          pdata.Description = cont;

          Util.post(this.editurl, pdata, vm, function(res, msg) {
            if (res === "1") {
              vm.$Message.success("保存成功");
              vm.loading2 = false;
              if (!pdata["Id"] || pdata["Id"] === 0) {
                vm.setForm();
              }
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
    }
  }
};
</script>