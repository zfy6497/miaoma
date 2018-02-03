<style type="text/css">
.province {
  width: 670px;
  display: none;
}

.province li {
  float: left;
  width: 160px;
  padding-bottom: 5px;
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
  <div class="container">
    <ul class="nav nav-tabs-custom clearfix" id="ulMenu">
        <strong>运费模版设置</strong>
        <li><a id="btnManage" href="Index">管理</a></li>
        <li class="active"><a id="btnAdd">新增</a></li>
    </ul>
    <div class="form-horizontal">
        <div class="form-group">
            <label class="col-sm-2 control-label" for="">物流模板名称：</label>
            <div class="col-sm-4">
                <input id="inputTempName" type="text"  class="form-control input-sm" />
            </div>
        </div>

    
      

        <div class="form-group">
            <label class="col-sm-2 control-label" for="">是否包邮：</label>
            <div class="col-sm-10 form-control-static">
                <input name="isfree"  type="radio" id="radioSelfDef"><label for="radioSelfDef">自定义运费</label>

            </div>
        </div>

        <div class="form-group">
            <label class="col-sm-2 control-label" for="">计价方式：</label>
            <div class="col-sm-10 form-control-static">
                <input name="valuationMethod" status="0" type="radio" id="radioPiece"><label for="radioPiece">按件数</label>
                <input name="valuationMethod" status="1" type="radio" id="radioWeight"><label for="radioWeight">按重量</label>
                <input name="valuationMethod"  status="2" type="radio" id="radioBulk"><label for="radioBulk">按体积</label>
                <input name="valuationMethod"  status="3" type="radio" id="radioWeightNoCity"><label for="radioWeightNoCity">按重量[无城市限制]</label>
                <label id="valuationMethodTip" class="red"></label>
            </div>
        </div>
        <div class="form-group" id="divContent">
            <label for="" class="col-sm-2 control-label">运送方式：</label>
            <div class="col-sm-10">
                <div id="default_1" class="col-sm-10">
                    <span>默认运费：</span> <input id="inputDefFirstUnit" type="text" class="form-control input-xs" value="" style="width: 80px;display: inline-block;"><span name="ValuationUnit">件</span>内,
                    <input id="inputDefFirstUnitMonry" type="text" class="form-control input-xs" value="" style="width: 60px;display: inline-block;"><span>元,</span>
                    <span>每增加</span><input id="inputDefAccumulationUnit" type="text" class="form-control input-xs" value="" style="width: 80px;display: inline-block;"><span name="ValuationUnit">件</span><span>,</span>
                    <span>增加运费</span><input id="inputDefAccumulationUnitMoney" type="text" class="form-control input-xs" value="" style="width: 80px;display: inline-block;"><span>元</span>
                </div>
                <div id="default_2" style="display:none" class="col-sm-10">
                    <span>默认运费：</span> <input id="inputDefUnit" type="text" class="form-control input-xs" value="" style="width: 80px;display: inline-block;">重量（kg）内,
                    <input id="inputDefMonry" type="text" class="form-control input-xs" value="" style="width: 60px;display: inline-block;"><span>元</span>
                </div>
                <br />
                <br />
                <div id="yes_city">
                    <table class="table table-bordered table-area-freight">
                        <thead>
                            <tr>
                                <th>运送到</th>
                                <th>首<span name="ValuationUnitDesc">件</span>（<span name="ValuationUnit">件</span>）</th>
                                <th>首费（元）</th>
                                <th>续<span name="ValuationUnitDesc">件</span>（<span name="ValuationUnit">件</span>）</th>
                                <th>续费（元）</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                            <td @click="checkArea(0)"><span class="chooseArea"  ></span><a class="editArea">编辑</a></td>
                                            <td><input type="text" class="form-control input-xs" value="" /></td>
                                            <td><input type="text" class="form-control input-xs" value="" /></td>
                                            <td><input type="text" class="form-control input-xs" value="" /></td>
                                            <td><input type="text" class="form-control input-xs" value="" /></td>
                                            <td><span class="btn-a"><a name="delContent">删除</a></span></td>
                                        </tr>
                        </tbody>
                    </table>
                    <a class="add-atrr" id="addCityFreight"><span class="glyphicon glyphicon-plus-sign"></span>新增指定城市运费</a>
                </div>
                <div id="no_city" >
                    <table class="table table-bordered table-area-freight">
                        <thead>
                            <tr>
                                <th>重量（kg）</th>
                                <th>费用（元）</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                             <tr>
                                            <td><input type="text" class="form-control input-xs" value="" /></td>
                                            <td><input type="text" class="form-control input-xs" value="" /></td>
                                            <td><span class="btn-a"><a name="delFreight">删除</a></span></td>
                                        </tr>
                        </tbody>
                    </table>
                    <a class="add-atrr" id="addFreight"><span class="glyphicon glyphicon-plus-sign"></span>新增无城市运费</a>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
               <input type="button" class="btn btn-primary" id="btnSave" value="保 存">
            </div>
        </div>
    </div>

    <Modal  v-model="modalArea"
            title="Modal"
            :loading="loadingbtn1" :width="700">
            <div class="aui_content" style="padding: 20px 10px;height:300px;">
                <ul id="ulArea" class="province clearfix" style="display: block;">
                     <li v-for="province in allData"><label><input type="checkbox" class="pro-check" id="province_100">{{province.name}}</label>
                     <span class="spCount"></span><b class="operate glyphicon glyphicon-menu-down" @click="checkPro(province.id)">城市</b>
                     <div class="city-box" id="dvCity_0" v-if="showProvince==province.id"><ul class="city clearfix">
                         <i class="colse" @click="checkPro(0)">×</i>
                         <li v-for="city in province.city"><label><input type="checkbox" @click="checkCity(province.id,city.id)" id="city_101">{{city.name}}</label></li>
                         </ul></div>
                     </li>
                </ul>
            </div>
   </Modal>
</div>
</template>
<script>
export default {
  name: "freightadd",
  data() {
    return {
      modalArea: false,
      loadingbtn1: false,
      result: [{ index: 0, pros: [{ id: 1, citys: [] }] }],
      allData: this.$store.state.app.areas,
      showProvince: 0,
      showModalId: 0
    };
  },
  methods: {
    checkArea(id) {
      this.showModalId = id;
      this.modalArea = true;
    },
    checkPro(id) {
      this.showProvince = id;
    },
    checkCity(proid, cityid) {
      let vm = this;
      console.log(this.result[vm.showModalId].pros);
      let pro = this.result[vm.showModalId].pros.filter(function(e) {
        return e.id == proid;
      });
      if (!pro) {
        // let city=[{}]
        let prodata = { id: proid, citys: [{ id: cityid, checked: true }] };
        this.result[vm.showModalId].pros.push(prodata);
      } else {
        var city = pro.citys.filter(function(e) {
          return e.id == cityid;
        });
        if (city) {
            city.checked=!city.checked;
        } else {
          pro.citys.push({ id: cityid , checked: true});
        }
      }
    }
  }
};
</script>
