<template>
  <div>
             <a style="float: left;" :href="templateurl">下载模板</a>
           <span style="width:350px;float: left; padding-left: 10px;">
        <Upload
             ref="uploadfile"
            :on-success="handleSuccess"
            :format="format"
            :max-size="maxsize"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :on-remove="removeFile"
            :before-upload="handleBeforeUpload"
            :data="headers"
            :action="posturl">
            <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
              
        </Upload>
     
        <div v-if="file !== null">所选文件: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</Button></div>

    </span>
      
  </div>
  
  
</template>
<script>
import Util from "../../libs/util.js";
export default {
  props: {
    maxlength: {
      type: Number,
      default: 1
    },
    defaultList: Array,
    maxsize: {
      type: Number,
      default: 10 * 1024
    },
    indexid: {
      type: Number,
      default: -1
    },
    uptype: {
      type: Number,
      default: 0
    },
    uploadurl: String,
    templateurl: String
  },
  data() {
    return {
      format: ["xlsx", "xls"],
      file: null,
      visible: false,
      uploadList: [],
      posturl: Util.ajaxUrl() + "/api/upload/Image",
      headers: {
        UserId: this.$store.state.user.id,
        Token: this.$store.state.user.token
      },
      loadingStatus: false
    };
  },
  methods: {
    upload() {
      let vm = this;
      this.loadingStatus = true;
      if (!vm.file) {
        vm.$Message.error("文件不存在");
      }
      Util.post(vm.uploadurl, { FilName: vm.file.url }, vm, function(
        res,
        data
      ) {
        if (res === "1") {
          if(data.data){
               vm.$Message.info({
                    content: data.data,
                    duration: 1200,
                    closable: true
                });
          }else{
               vm.$Message.success("导入成功");
          }
         
          vm.file = null;
          vm.filelist = null;
        } else {
          vm.$Message.error(data);
        }
        vm.loadingStatus = false;
      });
    },
    removeFile(file, filelist) {
      let vm = this;
      vm.file = null;
    },
    handleSuccess(data, file) {
      let vm = this;
      let result = data.data;

      if (data.totalCount > 0) {
        result.forEach(res => {
          let url = res.Url;
          file.url = url;
          file.data = res.Url;
          file.name = res.Name;
          vm.file = file;
          //let haves = this.uploadList.filter(e => {
          //return e.uid == res.uid;
          // });
          // if (!haves || haves.length <= 0) {
          //this.uploadList.push(file);
          // }
        });
        console.log(this.uploadList);
        console.log("---------");
        //this.$emit("get-result", this.uploadList, this.indexid);
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不符",
        desc: "文件" + file.name + " 格式错误."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超过最大文件",
        desc:
          "文件  " + file.name + " 太大了, 最大可上传." + this.maxsize + "kb"
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < this.maxlength;
      if (!check) {
        this.$Notice.warning({
          title: "最多可上传数量：" + this.maxlength + ""
        });
      }
      return check;
    }
  },
  mounted() {
    this.uploadList = this.$refs.uploadfile.fileList;
  },
  watch: {},
  computed: {
    comdefaultList: function() {
      let temp = this.defaultList;
      if (temp && temp.length > 0) {
        if (temp[0].url.indexOf(".mp4") >= 0) {
          temp.forEach(res => {
            res.url = this.defaultVedioImg;
          });
        }
        if (temp[0].url.indexOf(".mp3") >= 0) {
          temp.forEach(res => {
            res.url = this.defaultVedioImg;
          });
        }
      } else {
        temp = [];
      }
      this.uploadList = temp;
      return temp;
    }
  }
};
</script>




