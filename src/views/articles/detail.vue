<template>
  <Row>
       <Col >
         <Card>
              <Form ref="formCustom"  :label-width="100">
                <Tabs value="name1">
                    <TabPane label="系统配置" name="name1">
                    
                         <FormItem label="标题" prop="Title">
                            <Input type="text" style="width: 300px" v-model="formCustom.Title" >
                            </Input>
                        </FormItem>
                          <FormItem label="内容" prop="Content">
                               <UEditor ref="ueditor1"></UEditor>
                        </FormItem>
                       
                        <FormItem>
                            <Button type="primary" @click="saveInfo" :loading="loading2">提交</Button>
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
export default {
  name: "type-detail",
  components: {
    UEditor
  },
  data() {
    return {
      formCustom: {
        Id: this.$route.params.id,
        Title: "",
        Content: ""
      },
      loading2: false
    };
  },
  computed: {},
  beforeDestroy() {
    this.$refs.ueditor1.destoryUE();
  },
  destroyed() {},

  mounted() {
    this.getModel();
  },
  methods: {
    saveInfo: function() {
      let vm = this;
      vm.loading2 = true;
      let pdata = vm.formCustom;
      let cont = vm.$refs.ueditor1.getUEContent();
      pdata.Content = cont;
      Util.post("/Admin/Articles/Save", pdata, vm, function(res, msg) {
        if (res === "1") {
          vm.$Message.success("保存成功");
          vm.loading2 = false;
          if (!vm.formCustom.Id || vm.formCustom.Id === 0) {
            vm.setForm();
            vm.$refs.ueditor1.setUEContent("");
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
    },
    getModel: function() {
      let vm = this;
      if (this.formCustom.Id && this.formCustom.Idd != 0) {
        Util.post(
          "admin/Articles/GetModel",
          { Id: this.formCustom.Id },
          vm,
          function(res, data) {
            if (res === "1") {
              vm.setForm(data.data);
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

            if (key === "Content") {
              vm.$refs.ueditor1.setUEContent(data[key]);
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$refs.ueditor1.setUEContent("");
      }
    }
  }
};
</script>