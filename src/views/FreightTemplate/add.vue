<style type="text/css">
.province {
  width: 670px;
  display: none;
}

.province li {
  float: left;
  width: 160px;
  padding-bottom: 5px;
  font-size: 13px;
  line-height: 25px;
}

.city {
  max-width: 300px;
  padding: 6px 15px 6px 6px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 3px #ddd;
  background-color: #fff;
  margin-top: -5px;
}

.province li:nth-child(4n) .city {
  width: 300px;
}

.city li {
  float: left;
  width: auto;
  padding: 5px;
}

.city .colse {
  position: absolute;
  top: -4px;
  right: 1px;
  font-size: 14px;
  line-height: 14px;
  padding: 0 3px;
  background-color: #333;
  color: #fff;
  font-style: normal;
  cursor: pointer;
}

.province {
  padding-left: 30px;
  margin: 0;
}

.province li div {
  z-index: 9999;
  position: absolute;
  background: #efefef;
}

.province li b {
  font-weight: normal;
  cursor: pointer;
  margin-left: 5px;
}

.province li input {
  margin-right: 3px;
}

.spCount {
  color: red;
}

.table-area-freight,
.table-area-freight th {
  text-align: center;
}

.table-area-freight .btn-a {
  min-width: 50px;
  text-align: center;
}

.table-area-freight td span {
  float: left;
  text-align: left;
}

.table-area-freight td span b {
  font-weight: normal;
}

.table-area-freight td input {
  width: 50px;
  text-align: center;
  display: inline-block;
}

.editArea {
  cursor: pointer;
  float: right;
}
</style>
<template>
<card>
    <Form :label-width="100" ref="formCustom" :model="formCustom" :rules="ruleCustom">
         <FormItem label="运费名称" prop="Name">
                <Input type="text" style="width: 300px" v-model="formCustom.Name"></Input>
            </FormItem>
             <FormItem label="是否包邮" >
                <Checkbox v-model="IsFree" />
            </FormItem>
            <template v-if="formCustom.IsFree==0">
                    <FormItem label="计价方式" >
                 <RadioGroup v-model="formCustom.ValuationMethod">
                        <Radio value="0" label="0">按件数</Radio>
                        <Radio value="1" label="1">按重量</Radio>
                        <Radio value="2" label="2">按体积</Radio>
                </RadioGroup>
              
            </FormItem>
            <FormItem label="默认运送方式" prop="defaultTemplate">
                 <span>默认运费：</span><Input type="text" style="width: 60px"  v-model="formCustom.defaultTemplate.FirstUnit" ></Input><span>{{methodname}}</span>内,
                    <Input type="text" style="width: 60px"  v-model="formCustom.defaultTemplate.FirstUnitMonry" ></Input><span>元,</span>
                    <span>每增加</span><Input type="text" style="width: 60px"  v-model="formCustom.defaultTemplate.AccumulationUnit" ></Input><span>{{methodname}}</span><span>,</span>
                    <span>增加运费</span><Input type="text" style="width: 60px"  v-model="formCustom.defaultTemplate.AccumulationUnitMoney" ></Input><span>元</span>
            </FormItem>
            <FormItem label="运送方式" >
                  <Row>
                <Col span="14">
                     <table class="table table-bordered table-area-freight"  >
                        <thead>
                            <tr>
                                <th>运送到</th>
                                <th>首<span name="ValuationUnitDesc">{{methodname}}</span>（<span name="ValuationUnit">{{methodname}}</span>）</th>
                                <th>首费（元）</th>
                                <th>续<span name="ValuationUnitDesc">{{methodname}}</span>（<span name="ValuationUnit">{{methodname}}</span>）</th>
                                <th>续费（元）</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  v-for="(item, index) in formCustom.templates" v-if="item.status" >
                                <td @click="checkArea(item.index)"><span>{{getCheckName(item.index)}}</span><Button type="dashed">选择</Button></td>
                                            <td><Input type="text" style="width: 60px"  v-model="item.FirstUnit" ></Input></td>
                                            <td><Input type="text" style="width: 60px"  v-model="item.FirstUnitMonry" ></Input></td>
                                            <td><Input type="text" style="width: 60px"  v-model="item.AccumulationUnit" ></Input></td>
                                            <td><Input type="text" style="width: 60px"  v-model="item.AccumulationUnitMoney" ></Input></td>
                                            <td> <Button type="error" @click="handleRemove(item.index)">删除{{item.index}}</Button></td>
                            </tr>
                        </tbody>
                    </table>
                             <Button type="dashed" long @click="handleAdd" icon="plus-round" style="width:200px;">Add item</Button>
                </Col>
               
            </Row>        
            </FormItem>
            </template>
            
        <FormItem>
            <Button type="primary" :loading="loading2" @click="handleSubmit('formDynamic')">提交</Button>

        </FormItem>
    </Form>
    

    <Modal  v-model="modalArea"
            title="Modal"
            :loading="loadingbtn1" :width="700">
            <div class="aui_content" style="padding: 20px 10px;height:300px;">
                <ul id="ulArea" class="province clearfix" style="display: block;">
                     <li v-for="province in allData"><label><input type="checkbox" @click="checkAll(province.id)" :checked="isAllCheck(province.id,province.city.length)" class="pro-check" >{{province.name}}</label>
                     <span class="spCount" v-if="getCheckNum(province.id)>0">{{getCheckNum(province.id)}}</span><b class="operate glyphicon glyphicon-menu-down" @click="checkPro(province.id)">城市</b>
                     <div class="city-box" id="dvCity_0" v-if="showProvince==province.id"><ul class="city clearfix">
                         <i class="colse" @click="checkPro(0)">×</i>
                         <li v-for="city in province.city"><label><input type="checkbox"  :checked="isCheckCity(province.id,city.id)"  @click="checkCity(province.id,city.id,city.name)" id="city_101">{{city.name}}</label></li>
                         </ul></div>
                     </li>
                </ul>
            </div>
   </Modal>
</card>
</template>
<script>
import allregions from "../../libs/regions.js";
import { validateNum, validateRequired } from "../../libs/validate.js";
import Util from "../../libs/util.js";
export default {
  name: "freightadd",
  data() {
    return {
      modalArea: false,
      loadingbtn1: false,
      result: [],
      allData: allregions,
      showProvince: 0,
      showModalId: 0,
      formCustom: {
        Id: this.$route.params.id,
        Name: "",
        IsFree: 0,
        ValuationMethod: 0,
        defaultTemplate: {
          Id: 0,
          FirstUnit: 0,
          FirstUnitMonry: 0,
          AccumulationUnit: 0,
          AccumulationUnitMoney: 0,
          FreightTemplateId: this.$route.params.id,
          IsDefault: 1,
          AreaContent: ""
        },
        templates: []
      },
      index: 0,
      ruleCustom: {
        Name: [{ validator: validateRequired, trigger: "blur" }],
        defaultTemplate: [{ validator: validateRequired, trigger: "blur" }]
      },
      loading2: false,
      IsFree: false
    };
  },
  watch: {
    IsFree: function(val) {
      this.formCustom.IsFree = val ? 1 : 0;
    }
  },
  mounted() {
    this.getModel();
    this.setForm();
  },
  computed: {
    methodname: function() {
      let unit = "";

      if (this.formCustom.ValuationMethod == 0) {
        unit = "件";
      }
      if (this.formCustom.ValuationMethod == 1) {
        unit = "kg";
      }
      if (this.formCustom.ValuationMethod == 2) {
        unit = "m3";
      }

      return unit;
    }
  },
  methods: {
    checkArea(id) {
      this.showModalId = id;
      this.modalArea = true;
    },
    checkPro(id) {
      this.showProvince = id;
    },
    checkCity(proid, cityid, name) {
      let vm = this;

      let result = vm.result;
      var item = result.filter(function(e) {
        return e.index == vm.showModalId;
      });

      if (item && item.length > 0) {
        let pro = item[0].pros.filter(function(e) {
          return e.id == proid;
        });

        if (!pro || pro.length <= 0) {
          let prodata = {
            id: proid,
            citys: [{ id: cityid, checked: true, name: name }]
          };

          item[0].pros.push(prodata);
        } else {
          var city = pro[0].citys.filter(function(e) {
            return e.id == cityid;
          });
          if (city && city.length > 0) {
            city[0].checked = !city[0].checked;
          } else {
            pro[0].citys.push({ id: cityid, checked: true, name: name });
          }
        }
        item = item;
      } else {
        let item = {
          index: vm.showModalId,
          pros: [
            { id: proid, citys: [{ id: cityid, checked: true, name: name }] }
          ]
        };

        vm.result.push(item);
      }
      console.log(vm.result);
    },
    handleAdd() {
      this.index++;
      this.formCustom.templates.push({
        Id: 0,
        index: this.index,
        status: 1,
        FirstUnit: "",
        FirstUnitMonry: "",
        AccumulationUnit: "",
        AccumulationUnitMoney: "",
        FreightTemplateId: this.formCustom.Id,
        AreaContent: [],
        AreaResult: []
      });
    },
    handleRemove(index) {
      var item = this.formCustom.templates.filter(function(e) {
        return e.index == index;
      });

      if (item) {
        item[0].status = 0;
      }
      // this.formCustom.templates[index].status = 0;
    },
    isAllCheck(proid, len) {
      let bl = false;
      let vm = this;
      var item = vm.result.filter(function(e) {
        return e.index == vm.showModalId;
      });
      if (item && item.length > 0) {
        let pro = item[0].pros.filter(function(e) {
          return e.id == proid;
        });
        if (pro && pro.length > 0) {
          let citys = pro[0].citys.filter(function(e) {
            return e.checked;
          });
          bl = citys.length == len;
        }
      }
      return bl;
    },
    isCheckCity(proid, cityid) {
      let bl = false;
      let vm = this;
      var item = vm.result.filter(function(e) {
        return e.index == vm.showModalId;
      });
      if (item && item.length > 0) {
        let pro = item[0].pros.filter(function(e) {
          return e.id == proid;
        });
        if (pro && pro.length > 0) {
          let city = pro[0].citys.filter(function(e) {
            return e.id == cityid;
          });
          if (city && city.length > 0) {
            bl = city[0].checked;
          }
        }
      }
      return bl;
    },
    getCheckNum(proid) {
      let num = 0;
      let vm = this;
      var item = vm.result.filter(function(e) {
        return e.index == vm.showModalId;
      });
      if (item && item.length > 0) {
        let pro = item[0].pros.filter(function(e) {
          return e.id == proid;
        });
        if (pro && pro.length > 0) {
          let citys = pro[0].citys.filter(function(e) {
            return e.checked;
          });
          num = citys.length;
        }
      }
      return num;
    },
    checkAll(proid) {
      let vm = this;
      let datanums = 0; //数据长度
      let checknum = 0; //选中长度

      let temp = vm.allData.filter(function(e) {
        return e.id == proid;
      });
      if (temp && temp.length > 0) {
        datanums = temp[0].city.length;
      }
      var item = vm.result.filter(function(e) {
        return e.index == vm.showModalId;
      });
      if (item && item.length > 0) {
        //是否有过数据

        let pro = item[0].pros.filter(function(e) {
          return e.id == proid;
        });
        if (pro && pro.length > 0) {
          //是否选过省份

          let citys = pro[0].citys.filter(function(e) {
            return e.checked;
          });
          checknum = citys.length;
          if (checknum == datanums) {
            citys.forEach(res => {
              res.checked = false;
            });
          } else {
            pro[0].citys = [];
            temp[0].city.forEach(res => {
              pro[0].citys.push({ id: res.id, checked: true, name: res.name });
            });
          }
        } else {
          let tc1 = [];
          temp[0].city.forEach(res => {
            tc1.push({ id: res.id, checked: true, name: res.name });
          });

          let prodata = {
            id: proid,
            citys: tc1
          };

          item[0].pros.push(prodata);
        }
      } else {
        let tc1 = [];
        temp[0].city.forEach(res => {
          tc1.push({ id: res.id, checked: true, name: res.name });
        });
        let info = {
          index: vm.showModalId,
          pros: [{ id: proid, citys: tc1 }]
        };
        console.log(info);
        vm.result.push(info);
      }
    },
    getCheckName(modalid) {
      let num = 0;
      let vm = this;
      let cityname = [];
      let item = vm.result.filter(function(e) {
        return e.index == modalid;
      });

      if (item && item.length > 0) {
        item[0].pros.forEach(res => {
          res.citys.forEach(city => {
            if (city.checked) {
              cityname.push(city.name);
            }
          });
        });
      }
      return cityname.toString();
    },
    handleSubmit() {
      this.loading2 = true;
      this.$refs["formCustom"].validate(valid => {
        if (valid) {
          let vm = this;
          let pdata = this.formCustom;
          let items = pdata.templates.filter(function(e) {
            return e.status == 1;
          });

          if (items && items.length > 0) {
            items.forEach(res => {
              let temps = [];
              let araeinfo = vm.result.filter(function(e) {
                return e.index == res.index;
              });
              araeinfo.forEach(it => {
                it.pros.forEach(pro => {
                  pro.citys.forEach(city => {
                    temps.push(city.id);
                  });
                });
              });
              res.AreaContent = temps.toString();
              res.AreaResult= JSON.stringify(araeinfo);
            });
          }
          pdata.templates=items;
          Util.post("/Admin/Freighttemplate/Save", pdata, vm, function(
            res,
            msg
          ) {
            if (res === "1") {
              vm.$Message.success("保存成功");
              // vm.getData();
              vm.loading2 = false;
              vm.$router.push({ name: "FreightTemplate" });
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
    getModel() {
      let vm = this;
      if (this.formCustom.Id && this.formCustom.Id != 0) {
        Util.post(
          "admin/Freighttemplate/GetModel",
          { Id: this.formCustom.Id },
          vm,
          function(res, data) {
            if (res === "1") {
              vm.setForm(data.data);
            } else {
              vm.$Message.error("运费信息有误");
            }
          }
        );
      }
    },
    setForm(data) {
      let vm = this;
      if (data) {
         if(data.IsFree==1) {
           this.IsFree=true;
         }
        data.templates.forEach(res => {
          this.index++;
          res["index"] = this.index;
          res["status"] = 1;
           let result=res.AreaResult?JSON.parse(res.AreaResult):[];
           if(result && result.length>0){
                result[0].index=this.index;
                vm.result.push( result[0])
           }
         
        });
        this.formCustom = data;
      } else {
      }
    }
  }
};
</script>
