<template>
    <list :show-search="false" :show-date="true" :show-key-word="true" :show-add-button="false" :show-page="true" :update-url="updateUrl"
        :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom" :rule-custom="ruleCustom"  @set-form="setForm"  :routername="'type_detail'">
        <template slot="rightbtn">
            <span @click="addgolink"  style=""><Button type="primary"  icon="add">新增</Button></span>
        </template>
    </list>
    
</template>

<script>

import list from '../main-components/list.vue';
export default {
    name: 'page1-table',
    components: {
        list
    },
    data () {
        return {
            updateUrl:"admin/Types/Save",
            deleteUrl:"admin/Types/Delete",
            addUrl:"admin/Types/Save",
            getUrl:"admin/Types/GetList",
            formCustom:{
                 Id:0,
            },
            ruleCustom: {
                   
            },
            modalWidth:500,
        };
    },
    methods: {
        getresult(data) {
            if (data.length > 0) {
               
            }
        },
        setForm(data) {
           
            
        },addgolink(){
          this.$router.push({ name: 'type_detail', params: { id: 0 } })
      }
    },
    created () {
     
    }
};
</script>