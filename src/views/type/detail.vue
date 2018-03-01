<style lang="less">
@import "./detail.less";
</style>
<template>
<div>
<div class="add-table">
            <dl class="clearfix item">
				<dt>名称</dt>
				<dd>
                     <Input type="text" style="width: 400px" v-model="name"></Input>
				</dd>
			</dl>
			<dl class="clearfix item" v-for="typeinfo in types">
				<dt>{{typeinfo.name}}</dt>
				<dd>
					<div class="spec-btn" @click="addAttr(-1,typeinfo.id)">添加{{typeinfo.name}}</div>
					 <div class="spec-li clearfix" v-for="(item,itemindex) in attrs" v-if="!item.isdel && item.AttrType==typeinfo.id"><div v-if="!item.isedit" class="spec-l">
							<div class="new-item2">{{item.Name}}</div>
							<div class="amend" @click="addAttr(itemindex)"></div>
							<div class="delete" @click="saveAttr(itemindex,true)"></div>
						</div>
                        <div class="spec-l" v-if="item.isedit">
								<input class="txt-inp txt-title" v-model="item.Name" />
                                <div class="amend-save" @click="saveAttr(itemindex,false)"></div>
							    <div class="delete" @click="saveAttr(itemindex,true)"></div>
						</div>
						<div class="spec-r">
							 <div class="itemlist clearfix">
                                 <div class="spec-c" v-for="(val,indexid) in item.Vals"  v-if="!val.isdel">
                                     <div  v-if="val.isedit"><input class="txt-inp" v-model="val.AttrValue" /><div class="amend-save" @click="saveVal(itemindex,indexid,false)"></div><div class="delete" @click="saveVal(itemindex,indexid,true)"></div></div>
                                     <div v-if="!val.isedit"> <div class="li-item" data-m1="20">{{val.AttrValue}}</div><div  @click="addVal(itemindex,indexid)" class="amend"></div><div class="delete" @click="saveVal(itemindex,indexid,true)"></div></div></div>
				                <div class="new-item" style="display: none;"><input type="text" class="txt-inp" data-role="model-name" placeholder=""><div class="model-save"></div></div>
				                <a class="btn-additem spec-btn2"  @click="addVal(itemindex,-1)">＋添加标签</a>
				            </div>
						</div>
                    </div>
                       
				</dd>
			</dl>
           
            <dl class="clearfix item">
				<dt> <Button type="primary" :loading="loading2" @click="saveInfo">提交</Button></dt>

			</dl>
</div>
		
</div>

</template>


<script>
import Util from "../../libs/util.js";
import {
  validateNum,
  validateRequired,
  validateInteger
} from "../../libs/validate.js";

export default {
  name: "type-detail",
  components: {},
  data() {
    return {
      id: this.$route.params.id,
      name: "",
      attrs: [],
      types: [{ id: 0, name: "属性" }, { id: 1, name: "规格" }],
      loading2: false
    };
  },
  computed: {},
  beforeDestroy() {},
  destroyed() {},

  mounted() {
    this.getModel();
  },
  methods: {
    addAttr: function(indexid, type) {
      let vm = this;
      if (indexid >= 0) {
        let items = vm.attrs.filter(function(e, id) {
          return id == indexid;
        });
        if (items && items.length > 0) {
          let item = items[0];
          item.isedit = true;
        }
      } else {
        let item = {
          Id: 0,
          Name: "",
          Vals: [],
          isedit: true,
          isdel: false,
          AttrType: type,
          TypeId: vm.id
        };
        this.attrs.push(item);
      }
    },
    addVal: function(indexid, valid) {
      let vm = this;
      let items = vm.attrs.filter(function(e, id) {
        return id == indexid;
      });
      if (items && items.length > 0) {
        let item = items[0];
        if (valid >= 0) {
          var vals = item.Vals.filter(function(e, id) {
            return id == valid;
          });
          if (vals && vals.length > 0) {
            let val = vals[0];
            val.isedit = true;
          }
        } else {
          let val = {
            Id: 0,
            Aid: item.Id,
            AttrValue: "",
            isedit: true,
            isdel: false
          };
          item.Vals.push(val);
        }
      }
    },
    saveAttr: function(indexid, isdel) {
      let vm = this;
      let items = vm.attrs.filter(function(e, id) {
        return id == indexid;
      });
      if (items && items.length > 0) {
        let item = items[0];
        if (isdel) {
          item.isdel = true;
        } else {
          item.isedit = false;
        }
      }
    },
    saveVal: function(indexid, valid, isdel) {
      let vm = this;
      let items = vm.attrs.filter(function(e, id) {
        return id == indexid;
      });
      console.log(items);
      if (items && items.length > 0) {
        var Vals = items[0].Vals.filter(function(e, id) {
          return id == valid;
        });
        if (Vals && Vals.length > 0) {
          let val = Vals[0];
          if (isdel) {
            val.isdel = true;
          } else {
            val.isedit = false;
          }
        }
      }
    },
    saveInfo: function() {
      let vm = this;
      vm.loading2 = true;
      let attrs = vm.attrs;
      attrs = attrs.filter(function(e) {
        return !e.isdel;
      });
      if (attrs && attrs.length > 0) {
        attrs.forEach(res => {
          res.Vals = res.Vals.filter(function(e) {
            return !e.isdel;
          });
        });

        Util.post(
          "/Admin/Types/Save",
          { Id: vm.id, Name: vm.name, attrs },
          vm,
          function(res, msg) {
            if (res === "1") {
              vm.$Message.success("保存成功");
              vm.loading2 = false;
              if (!vm.id || vm.id === 0) {
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
          }
        );
      } else {
        vm.$Message.error("没有任何数据");
      }
    },
    getModel: function() {
      let vm = this;
      if (this.id && this.id != 0) {
        Util.post("admin/Types/GetModel", { Id: this.id }, vm, function(
          res,
          data
        ) {
          if (res === "1") {
            vm.setForm(data.data);
          } else {
            vm.$Message.error("商品信息有误");
          }
        });
      }
    },
    setForm(data) {
      let vm = this;
      if (data) {
        try {
          vm.name = data.Name;
          vm.attrs = data.Attrs;
        } catch (error) {
          console.log(error);
        }
      } else {
        vm.name = "";
        vm.attrs = [];
      }
    }
  }
};
</script>