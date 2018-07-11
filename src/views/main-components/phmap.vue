<template>
 <div>
     <p style="margin-bottom: 10px;">
 <Input v-model="address" id="searchaddress"  placeholder="请输入地址搜搜..." style="width: 150px" />
                            <span @click="search" style="margin: 0 10px;"><Button type="primary" :loading="loading" icon="search">搜索</Button></span>
     </p>
  
  <div id="allmap" v-bind:style="mapStyle"></div>
 </div>
    
</template>
<script>
import { MP } from "./map";
export default {
  data: function() {
    return {
      mapStyle: {
        width: "80%",
        height: this.mapHeight + "px"
      },
      address: "",
      loading: false,
      mapinfo: null
    };
  },
  props: {
    // 地图在该视图上的高度
    mapHeight: {
      type: Number,
      default: 500
    },
    // 经度
    longitude: {
      type: String,
      default: "120.209246"
    },
    // 纬度
    latitude: {
      type: String,
      default: "30.252592"
    },
    description: {
      type: String,
      default: "天安门"
    }
  },
  mounted: function() {
    this.init();
  },
  methods: {
    init: function() {
      MP("f1DTj5PtGgHg95iSQaNCodOFGLXfceki").then(BMap => {
          let vm = this;
          let map = new BMap.Map("allmap"); // 创建Map实例
          this.mapinfo = map;

          let point = new BMap.Point(this.longitude, this.latitude);
          map.centerAndZoom(point, 18);
          vm.addmark(map, this.longitude, this.latitude);
          map.enableScrollWheelZoom(true);
          map.addEventListener("click", function(e) {
            vm.addmark(map, e.point.lng, e.point.lat);
          });
        });
    },

    addmark: function(map, lng, lat) {
      let vm = this;
      map.clearOverlays();
      let point = new BMap.Point(lng, lat);
      let marker = new BMap.Marker(point);
      marker.enableDragging();
      map.addOverlay(marker);
      this.setpoint(lng, lat);
      marker.addEventListener("dragend", function(e) {
        //获取覆盖物位置
        let o_Point_now = marker.getPosition();
        let lng = o_Point_now.lng;
        let lat = o_Point_now.lat;
        vm.setpoint(lng, lat);
      });
    },
    search: function() {
      let vm = this;
      let map = this.mapinfo;
      let localSearch = new BMap.LocalSearch(map);
      localSearch.enableAutoViewport(); //允许自动调节窗体大小
      localSearch.setSearchCompleteCallback(function(searchResult) {
        let poi = searchResult.getPoi(0);
        map.centerAndZoom(poi.point, 18);
        vm.addmark(map, poi.point.lng, poi.point.lat);
      });
     
      localSearch.search(this.address);
    },
    setpoint: function(lng, lat) {
      this.$emit("set-point", lng + "", lat + "");
    }
  },
  watch: {
    longitude: function(val, oldval) {
      if (oldval == "120.209246") this.init();
      // this.addmark(this.mapinfo, val, this.latitude);
    }
  }
};
</script>
 