<template>
  <div>
        <el-table
        :data="tableData"
        style="width: 100%">
                <el-table-column
                    prop="csrq"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="Byxx"
                    label="地址">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button type="danger" @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
                    </template>
                </el-table-column>
            
        </el-table>
  </div>
</template>

<script>

export default {
    name:'',
    data () {
      return {
            tableData: [],
      };
    },
    created(){
        
    },
    mounted() {
        this.homeGET();
    },   
    methods: {
        homeGET() {
            this.GET("/index").then(res=>{
                console.log(res)
                this.tableData = res
            })
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        

    },

    components: {},

    computed: {},

    beforeMount() {},



    watch: {}

}
</script>
<style scoped>

</style>