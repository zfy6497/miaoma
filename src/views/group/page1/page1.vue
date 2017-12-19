
<template>
     <list :show-search="true" :show-date="true" :show-key-word="true" :show-add-button="true"  :show-page="true" :update-url="updateUrl" :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl">

     </list>
</template>

<script>
import list from '../../main-components/list.vue';
import tableData from '../../main-components/tables/components/table_data.js';
export default {
    name: 'editable-table',
    components: {
        list
    },
    data () {
        return {
            updateUrl:"api/Admin/UpdateAdmin",
            deleteUrl:"api/Admin/DeleteAdmin",
            addUrl:"api/Admin/AddAdmin",
            getUrl:"api/Admin/GetList"
        };
    },
    methods: {
        getData () {
            this.columnsList = tableData.table1Columns;
            this.tableData = tableData.table1Data;
            this.editInlineColumns = tableData.editInlineColumns;
            this.editInlineData = tableData.editInlineData;
            this.editIncellColumns = tableData.editIncellColumns;
            this.editIncellData = tableData.editIncellData;
            this.editInlineAndCellColumn = tableData.editInlineAndCellColumn;
            this.editInlineAndCellData = tableData.editInlineAndCellData;
            this.showCurrentColumns = tableData.showCurrentColumns;
        },
        handleNetConnect (state) {
            this.breakConnect = state;
        },
        handleLowSpeed (state) {
            this.lowNetSpeed = state;
        },
        getCurrentData () {
            this.showCurrentTableData = true;
        },
        handleDel (val, index) {
            this.$Message.success('删除了第' + (index + 1) + '行数据');
        },
        handleCellChange (val, index, key) {
            this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
        },
        handleChange (val, index) {
            this.$Message.success('修改了第' + (index + 1) + '行数据');
        }
    },
    created () {
        this.getData();
    }
};
</script>
