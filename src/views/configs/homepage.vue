<style lang="less">
@import "./pageconfig.less";
</style>
<template>
   <div class="container">
    <ul class="page-tab-hd page-wxindex">
        <li class="li1" @click="checkitem(1)"><i class="glyphicon glyphicon-pencil"></i>轮播图配置</li>
        <li class="li2" ><i class="glyphicon glyphicon-pencil"></i>不可编辑</li>
        <li class="li3" @click="checkitem(3)"><i class="glyphicon glyphicon-pencil"></i>广告位配置</li>
        <li class="li4" @click="checkitem(4)"><i class="glyphicon glyphicon-pencil"></i>优秀医师</li>
        <li class="li5" @click="checkitem(5)"><i class="glyphicon glyphicon-pencil"></i>优秀课程</li>
        <li class="li6" @click="checkitem(6)"><i class="glyphicon glyphicon-pencil"></i>推荐商品</li>
        <i class="arrow"></i>
    </ul>
     <div class="page-tab-bd" :class="checkclass" v-show="showitem">
        <div class="page-item" v-show="items.item1">
             <phslideads :slide-type="1"></phslideads>
        </div><!-- 轮播图配置  -->
        <div class="page-item" v-show="items.item3">
            <phslideads :slide-type="2"></phslideads>
        </div><!-- 广告位配置  -->
        <div class="page-item" v-show="items.item4">
             

        </div><!-- 优秀医师  -->
        <div class="page-item" v-show="items.item5">
             

        </div><!-- 优秀课程  -->
        <div class="page-item" v-show="items.item6">
               <phrecommend :recommend-type="1"></phrecommend>
        </div><!-- 推荐商品  -->
        
   </div>
   </div>
</template>
<script>
import phslideads from "../main-components/phslideads.vue";
import list from "../main-components/list.vue";
import phrecommend from "../main-components/phrecommend.vue";
export default {
  name: "homepage",
  components: {
    list,
    phslideads,
    phrecommend
  },
  data() {
    return {
      checkindex: 0,
      showitem: false,
      items: {
        item1: false,
        item2: false,
        item3:false,
        item4:false,
        item5: false,
        item6: false
      },
      checkclass: "page-tab-top1"
    };
  },
  methods: {
    checkitem: function(index) {
      this.checkindex = index;
    },
    hideitems: function() {
      let vm = this;
      for (let i in vm.items) {
        vm.items[i] = false;
      }
    }
  },
  watch: {
    checkindex: function(val, oldval) {
      this.showitem = true;
      this.hideitems();
      switch (val) {
        case 1:
          this.items.item1 = true;
          break;
        case 2:
          this.items.item2 = true;
          break;
        case 3:
          this.items.item3 = true;
          break;
        case 4:
         this.items.item4 = true;
          break;
        case 5:
         this.items.item5= true;
          break;
        case 6:
         this.items.item6 = true;
          break;
      }
      this.checkclass = "page-tab-top" + val;
    }
  }
};
</script>
