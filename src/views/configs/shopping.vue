<style lang="less">
@import "./pageconfig.less";
</style>
<template>
   <div class="container">
    <ul class="page-tab-hd page-vshop">
        <li class="li1" ><i class="glyphicon glyphicon-pencil"></i>商品分类，自动读取</li>
        <li class="li2" @click="checkitem(2)"><i class="glyphicon glyphicon-pencil"></i>轮播图配置</li>
        <li class="li3" @click="checkitem(3)"><i class="glyphicon glyphicon-pencil"></i>每日疯抢</li>
        <li class="li4" @click="checkitem(4)"><i class="glyphicon glyphicon-pencil"></i>好货推荐</li>
       
        <i class="arrow"></i>
    </ul>
     <div class="page-tab-bd" :class="checkclass" v-show="showitem">
        <div class="page-item" v-show="items.item2">
             <phslideads :slide-type="3"></phslideads>
        </div><!-- 轮播图配置  -->
        <div class="page-item" v-show="items.item3">
             <phrecommend :recommend-type="2"></phrecommend>
        </div><!-- 每日疯抢  -->

        <div class="page-item" v-show="items.item4">
               <phrecommend :recommend-type="3"></phrecommend>
        </div><!-- 好货推荐  -->
        
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

      }
      this.checkclass = "page-tab-top" + val;
    }
  }
};
</script>
