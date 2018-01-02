<template>
    <script id="editor" type="text/plain" style="width:1024px;height:500px;"></script>
</template>
<script>
   
    import '../../statics/ueditor/ueditor.config';
    import '../../statics/ueditor/ueditor.all'; 
    import '../../statics/ueditor/lang/zh-cn/zh-cn'; 
     export default {
        name: "UEditor",
        data(){
            return {
                editor:null
            }
        },
      
        props: {
            id: {
                type: String
            }
        },
        mounted() {
           
            this.editor = UE.getEditor('editor',{ BaseUrl: ''});
        },
        destoryed() {
               UE.getEditor("editor").destroy();
           // this.editor.destory();
        },
        methods:{
            getUEContent: function(){
               return this.editor.getContent();
            },
            setUEContent: function(cont){
                let vm=this;

                vm.editor.addListener("ready", function () { 
                    console.log("aaaaaaaa");
                     vm.editor.setContent(cont); 
                });

                 try{
                     vm.editor.setContent(cont); 
                 }catch(error){

                 }
                 
            },
            destoryUE: function(){
                UE.getEditor("editor").destroy();
                console.log(this.editor);
               // this.editor.destory();
            }
        }

     };
</script>