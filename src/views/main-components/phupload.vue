<template>
    <Upload  ref="upload" :before-upload="before" :max-size="maxsize" :action="posturl" :data="headers" :on-success="success" :on-remove="remove" :on-error="error" :on-exceeded-size="exceeded" :default-file-list="uploadList">
        <Button type="ghost" icon="ios-cloud-upload-outline" >上传</Button>
    </Upload>
</template>
<script>
    import Util from '../../libs/util.js';
    export default {
        props:{
            maxlength:{
                type: Number,
                default: 1
            },
            uploadList:Array
        },
        data(){
            return {
                posturl:Util.ajaxUrl()+"/api/upload/Image",
                headers:{'UserId': this.$store.state.user.id,'Token':this.$store.state.user.token },
                maxsize:10*1024 //最大10M
            }
        },
        mounted () {
             // this.uploadList = this.$refs.upload.fileList;
         },
        methods:{
            before(){
                const fileList = this.$refs.upload.fileList;
                if(fileList.length>=this.maxlength)
                {
                      this.$Message.error("最多可上传"+this.maxlength+"张图片");
                    return false;
                }
            },
            success(data,file){
                let result= data.data;

                result.forEach((res)=>{
                   file.url = res.Url;
                   file.name = res.Name;
                })
                 this.$emit('get-result', this.$refs.upload.fileList);
            },
            remove(file){
                 const fileList = this.$refs.upload.fileList;
                 this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                 this.$emit('get-result', this.$refs.upload.fileList);
            },
            error(error){
                this.$Message.error("上传失败,原因:"+error);
            },
            exceeded(){
                this.$Message.error("文件太大");
            }
        }
    }
</script>