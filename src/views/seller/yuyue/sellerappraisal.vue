<template>
  <Row>
       <Col >
         <Card>
              <Form ref="formCustom" :model="result" :label-width="100">
                <Tabs value="name1">
                    <TabPane label="月度考评" name="name1">
                        
                         <FormItem label="考评专家" prop="SignIntergral">
                              <Select v-model="SpecialId"  style="width:200px">
                                  <Option value="0" key="0">请选择</Option>
                                  <Option v-for="item in result.specials" :value="item.Id" :key="item.Id">{{ item.Name }}</Option>
                             </Select>
                                  
                        </FormItem>
                        <FormItem :label="item.Title" prop="contents" v-for="item in result.contents">
                              <Tooltip  placement="right" >
                                  <div slot="content" style="white-space: normal">{{item.Content}}</div>
                            <Input type="text" style="width: 100px" v-model="item.SureScore" :number="true">
                              <span slot="append">分</span>
                            </Input>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="备注" prop="Remark">
                            <Input type="textarea" :rows="4" style="width: 400px" v-model="Remark"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="saveInfo">提交</Button>
                        </FormItem>
                    </TabPane>

                </Tabs>
            </Form>
         </Card>
      </Col>
      
  </Row>
</template>

<script>
import Util from "../../../libs/util.js";

export default {
  name: "page1-detail",
  components: {},
  data() {
    return {
      value1: [],
      Remark: "",
      SpecialId: 0,
      result: {},
      loading2: false,
      editurl: "admin/StoreApi/AddAppraisalScore",
      geturl: "admin/StoreApi/GetAppraisalModel"
    };
  },
  beforeDestroy() {},
  destroyed() {},
  computed: {
    valuationMethod: function() {}
  },
  watch: {},
  mounted() {
    this.getInfo();
    // this.setForm();
  },
  methods: {
    saveInfo() {
      this.loading2 = true;
      let vm = this;
      if (vm.SpecialId <= 0) {
        vm.loading2 = false;
        vm.$Message.error("请选择专家");
        return;
      }
      let contents = this.result.contents;
      contents.forEach(item => {
        item["Score"] = item["SureScore"];
        item["AppraisalId"] = item["Id"];
      });
      Util.post(
        this.editurl,
        { Score: contents, SpecialId: vm.SpecialId, Remark: vm.Remark },
        vm,
        function(res, msg) {
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
        }
      );
    },
    getInfo() {
      let vm = this;
      Util.post(this.geturl, {}, vm, function(res, data) {
        if (res === "1") {
          let info = data.data;
          if (info) {
            var result = data.data;
            result.contents.forEach(res => {
              res["SureScore"] = 0;
            });

            vm.result = result;
          } else {
          }
        } else {
          vm.$Message.error("获取失败");
        }
      });
    }
  }
};
</script>
