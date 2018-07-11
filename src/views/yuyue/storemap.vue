<template>
  <Row>
       <Col >
         <Card>
              <Form ref="formCustom"  :label-width="10">
                <Tabs value="name1">
                    <TabPane label="地图定位" name="name1">
                    
                     <FormItem>
                         <PhMap @set-point="setPoint" :longitude="formCustom.Longitude" :latitude="formCustom.Latitude"></PhMap>
                        </FormItem>
                          <FormItem>
                            <Button type="primary" :loading="loading2"   @click="saveInfo">提交</Button>
                        </FormItem>
                    </TabPane>
 
                </Tabs>
            </Form>
         </Card>
      </Col>
      
  </Row>
</template>


<script>
import Util from "../../libs/util.js";
import {
  validateNum,
  validateRequired,
  validateInteger
} from "../../libs/validate.js";
import UEditor from "../main-components/ueditor.vue";
import PhMap from "../main-components/phmap.vue";
export default {
  name: "type-detail",
  components: {
    UEditor,
    PhMap
  },
  data() {
    return {
      formCustom: {
        Id: this.$route.params.id,
        Longitude: "120.209246",
        Latitude: "30.252592"
      },
      loading2: false,
      mapStyle: {
        width: "100%",
        height: this.mapHeight + "px"
      },
      address:'',
      loading:false
    };
  },
  computed: {},
  beforeDestroy() {},
  destroyed() {},

  mounted() {
   this.getModel();
  },
  methods: {
    saveInfo: function() {
      let vm = this;
      vm.loading2 = true;
      let pdata = vm.formCustom;
      Util.post("/Admin/store/SetPoint", pdata, vm, function(res, msg) {
        if (res === "1") {
          vm.$Message.success("保存成功");
          vm.loading2 = false;
         
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
    getModel: function() {
      let vm = this;
      if (this.formCustom.Id && this.formCustom.Id != 0) {
        Util.post(
          "admin/store/GetModelById",
          { Id: this.formCustom.Id },
          vm,
          function(res, data) {
            if (res === "1") {
               let info=data.data;
               if(info.Longitude && info.Latitude){
                  vm.formCustom.Longitude=info.Longitude;
                   vm.formCustom.Latitude=info.Latitude;
               }
                // vm.setForm(data.data);
            } else {
              vm.$Message.error("商品信息有误");
            }
          }
        );
      }
    },
    setForm(data) {
      let vm = this;
      if (data) {
        try {
          for (let key in this.formCustom) {
            this.formCustom[key] = data[key];

          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    initMap() {
      // 百度地图API功能
      let map = new BMap.Map("allmap"); // 创建Map实例
      map.centerAndZoom(new BMap.Point(120.209246, 30.252592), 11); // 初始化地图,设置中心点坐标和地图级别
      //添加地图类型控件
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      );
      map.setCurrentCity("杭州"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    },
    setPoint(lng, lat) {
          this.formCustom.Longitude=lng;
          this.formCustom.Latitude=lat;
    },
    search(){
         
    }
  }
  
};
</script>