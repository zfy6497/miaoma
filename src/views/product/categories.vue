<template>
   <tree-grid :items='data' :columns='columns' @on-row-click='rowClick' @on-selection-change='selectionClick' @on-sort-change='sortClick'
                :modalWidth="500" :update-url="updateUrl" :delete-url="deleteUrl" :add-url="addUrl" :get-url="getUrl" :form-custom="formCustom"
                :rule-custom="ruleCustom"  @set-form="setForm">
                <template slot="formmodel">
                    <FormItem label="名称" prop="Name">
                        <input  type="hidden" :value='formCustom.Depth'/>
                        <Input type="text" style="width: 300px" v-model="formCustom.Name"></Input>
                    </FormItem>
                    <FormItem label="分类图标" prop="Icon">
                        <PhUpload @get-result="getresult" :upload-list="defaultIcon" :maxlength="2">
                        </PhUpload>
                    </FormItem>
                    <FormItem label="排序值" prop="DisplaySequence">
                        <Input type="text" style="width: 100px" v-model="formCustom.DisplaySequence" :number="true"></Input>
                    </FormItem>
                    <FormItem label="上级分类" prop="PassWordCheck">
                        <Dropdown v-for="(c1,index) in ddd">
                            <a href="javascript:void(0)">一级分类<Icon type="arrow-down-b"></Icon></a>
                            <DropdownMenu slot="list">
                                <DropdownItem v-if="c1.childs.length<=0">{{c1.name}}</DropdownItem>
                                <Dropdown placement="right-start" v-if="c1.childs.length>0">
                                    <DropdownItem> {{c1.name}}
                                        <Icon type="ios-arrow-right"></Icon>
                                    </DropdownItem>

                                    <DropdownMenu slot="list" v-for="(c2,index2) in c1.childs">
                                        <DropdownItem v-if="c2.childs.length<=0"> {{c2.name}}</DropdownItem>
                                        <Dropdown placement="right-start" v-if="c2.childs.length>0">
                                            <DropdownItem> {{c2.name}}
                                                <Icon type="ios-arrow-right"></Icon>
                                            </DropdownItem>
                                            <DropdownMenu slot="list" v-for="(c3,index3) in c2.childs">
                                                <DropdownItem> {{c3.name}}</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </DropdownMenu>
                                </Dropdown>
                            </DropdownMenu>
                        </Dropdown>
                    </FormItem>
                    <FormItem label="是否推荐" prop="IsRecommend">
                        <Checkbox v-model="formCustom.IsRecommend" />
                    </FormItem>
                </template>
            </tree-grid>
</template>
<script>
import TreeGrid from "../main-components/treegrid.vue";
import PhUpload from "../main-components/phupload.vue";

export default {
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入名称"));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        callback();
      }, 1000);
    };
    const validateIcon = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请上传分类图标"));
      }
      callback();
    };
    const validateDisplaySequence = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入排序值"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字"));
        } else {
          callback();
        }
      }, 1000);
    };

    return {
      columns: [
        {
          title: "分类名称",
          key: "Name",
          sortable: true,
          width: "250"
        },
        {
          title: "操作",
          type: "action",
          actions: [
            {
              type: "primary",
              text: "编辑"
            },
            {
              type: "error",
              text: "删除"
            }
          ],
          width: "150"
        }
      ],
      data: [
        {
          Id: 1,
          Name:'分类',
          IsRecommend: true,
          Icon: "",
          DisplaySequence: 1,
          ParentCategoryId: 0,
          Depth:''
        },
        {
           Id: 1,
          Name:'分类',
          IsRecommend: true,
          Icon: "",
          DisplaySequence: 1,
          ParentCategoryId: 0,
          Depth:'',
          children: [
            {
          Id: 1,
          Name:'分类',
          IsRecommend: true,
          Icon: "",
          DisplaySequence: 1,
          ParentCategoryId: 0,
          Depth:''
        },
           {
          Id: 2,
          Name:'分类',
          IsRecommend: true,
          Icon: "",
          DisplaySequence: 1,
          ParentCategoryId: 0,
          Depth:''
        }]},
        {
          Id: 3,
          Name:'分类',
          IsRecommend: true,
          Icon: "",
          DisplaySequence: 1,
          ParentCategoryId: 0,
          Depth:''
        },
        {
          Id: 4,
          Name:'分类',
          IsRecommend: true,
          Icon: "",
          DisplaySequence: 1,
          ParentCategoryId: 0,
          Depth:''
        }
      ],
      updateUrl: "api/Admin/UpdateAdmin",
      deleteUrl: "api/Admin/DeleteAdmin",
      addUrl: "api/Admin/AddAdmin",
      getUrl: "api/Admin/GetList",
      formCustom: {
           Id: 0,
        Name: "",
        IsRecommend: false,
        Icon: "",
        DisplaySequence: 1,
        ParentCategoryId: 0,
        Depth: ""
      },
      ruleCustom: {
        Name: [{ validator: validateName, trigger: "blur" }],
       // Icon: [{ validator: validateIcon, trigger: "blur" }],
        DisplaySequence: [
          { validator: validateDisplaySequence, trigger: "blur" }
        ]
      },
      modalWidth: 500,
      defaultIcon: [],
      ddd: [
        {
          name: "一级分类",
          value: "1",
          childs: [
            { name: "二级分类", value: "2", childs: [] },
            {
              name: "二级分类2",
              value: "3",
              childs: [
                { name: "三级分类", value: "4", childs: [] },
                { name: "三级分类2", value: "5", childs: [] }
              ]
            }
          ]
        }
      ]
    };
  },
  components: {
    TreeGrid,
    PhUpload
  },
  methods: {
    rowClick(data, index, event) {
      console.log("当前行数据:" + data);
      console.log("点击行号:" + index);
      console.log("点击事件:" + event);
    },
    selectionClick(arr) {
      console.log("选中数据id数组:" + arr);
    },
    sortClick(key, type) {
      console.log("排序字段:" + key);
      console.log("排序规则:" + type);
    },
    getresult(data) {
      if (data.length > 0) {
        this.formCustom.Icon = data[0].url;
      }
    },
    setForm(data) {
       if(data)
       {
        this.formCustom.Id=data.Id;
        this.formCustom.Icon=data.Icon;
        this.formCustom.Name=data.Name;
        this.formCustom.IsRecommend=data.IsRecommend;
        this.formCustom.DisplaySequence=data.DisplaySequence;
        this.formCustom.ParentCategoryId=data.ParentCategoryId;
        this.formCustom.Depth=data.Depth;
       }else{
          this.formCustom.Id=0;
        this.formCustom.Icon='';
        this.formCustom.Name='';
        this.formCustom.IsRecommend=false;
        this.formCustom.DisplaySequence=1;
        this.formCustom.ParentCategoryId=0;
        this.formCustom.Depth=''; 
       }
        
    }
    
  }
};
</script>