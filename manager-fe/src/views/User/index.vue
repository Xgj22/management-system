<template>
    <div class="userWrapper">
        <div class="queryform">
            <el-form :inline="true" :model="user" class="demo-form-inline" size="big">
                <el-form-item >
                    <el-input v-model="user.userId" placeholder="请输入用户 ID" />
                </el-form-item>
                <el-form-item >
                    <el-input v-model="user.userName" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item>
                    <el-select v-model="user.state" placeholder="Select">
                        <el-option :value="0" label="所有"></el-option>
                        <el-option :value="1" label="在职"></el-option>
                        <el-option :value="2" label="离职"></el-option>
                        <el-option :value="3" label="试用期"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleQuery">查询</el-button>
                    <el-button type="button" @click="handleReset('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="basetable">
            <div class="action">
                <el-button type="primary">新增</el-button>
                <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
            </div>
            <div class="table">
                <el-table 
                    :data="userList" 
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55" />
                    <el-table-column 
                        v-for="item in columns" 
                        :key="item.index"
                        :prop="item.prop" 
                        :label="item.label" 
                        :formatter="item.formatter"
                        width="150" 
                    />
                    <el-table-column fixed="right" label="操作" width="150">
                        <!-- scope 该行对应的对象 -->
                        <template #default="scope">
                            <el-button link  
                            >编辑</el-button>
                            <el-button 
                                link 
                                type="danger"
                                @click="handleDel(scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
export default {
    name:'User',
    setup(){
        // 获取 CompositionAPI 上下文对象
        // 直接 getCurrentInstance 获取ctx 失败，因此改用以下方法
        const { ctx } = getCurrentInstance()
        const myCtx = getCurrentInstance().appContext.config.globalProperties
        console.log(myCtx)
        // 初始化表单用户对象
        const user = reactive({
            state:1
        })
        // 初始化用户列表数据
        const userList = ref([])
        // 初始化分页对象
        const pager = reactive({
            pageNum :1,
            pageSize:10
        })
        // 选中用户列表对象
        const checkedUserIds = ref([]);
        const columns = reactive([
            {
                index:1,
                label:'用户ID',
                prop:'userId'
            },
            {
                index:2,
                label:'用户名',
                prop:'userName'
            },
            {
                index:3,
                label:'用户邮箱',
                prop:'userEmail'
            },
            {
                index:4,
                label:'用户状态',
                prop:'state',
                // formatter 相当于一个字典
                formatter(row, column, value) {
                    return {
                        1: "在职",
                        2: "离职",
                        3: "试用期",
                    }[value];
                },
            },
            {
                index:5,
                label:'注册时间',
                prop:'createTime'
            },
            {
                index:6,
                label:'最后登陆时间',
                prop:'lastLoginTime'
            }
        
        ])
        // 初始化接口调用
        onMounted(()=>{
            getUserList()
            console.log(123)
        })
        // 获取用户列表
        const getUserList = async() =>{
            try {
                let params = { ...user,...pager}
                const { page,list }= await myCtx.$api.getUserList(params)
                userList.value = list
            } catch (error) {
                console.log(error)
            }
        }
        //  查询事件，获取用户列表
        const handleQuery = () => {
            getUserList();
        };
        // 重置查询表单
        const handleReset = (form) => {
            ctx.$refs[form].resetFields();
        };
        // 分页事件处理
        const handleCurrentChange = (current) => {
            pager.pageNum = current;
            getUserList();
        };
        // 用户单个删除
        const handleDel = async (row) => {
            await myCtx.$api.userDel({
                userIds: [row.userId], //可单个删除，也可批量删除
            });
            myCtx.$message.success("删除成功");
            getUserList();
        };
        // 批量删除
        const handlePatchDel = async () => {
            if (checkedUserIds.value.length == 0) {
                myCtx.$message.error("请选择要删除的用户");
                return;
            }
            const res = await myCtx.$api.userDel({
                userIds: checkedUserIds.value, //可单个删除，也可批量删除
            });
            if (res.nModified > 0) {
                myCtx.$message.success("删除成功");
                getUserList();
            } else {
                myCtx.$message.success("修改失败");
            }
        };
        // 表格多选,element plus 自带的方法，用于获取多选框的元素
        const handleSelectionChange = (list) => {
            let arr = [];
            list.map((item) => {
                arr.push(item.userId);// 获取每个被选行的userId
            });
            checkedUserIds.value = arr;
        };
        return {
            user,
            userList,
            columns,
            pager,
            checkedUserIds,
            getUserList,
            handleQuery,
            handleReset,
            handleCurrentChange,
            handleDel,
            handlePatchDel,
            handleSelectionChange
        }
    }
}
</script>

<style lang="scss">
.userWrapper{
    .queryform{
        height: 70px;
        padding-top: 20px;
        padding-left: 20px;
        background-color: #fff;
    }
    .basetable{
        margin-top: 20px;
        padding: 20px 20px;
        background-color: #fff;
        .table{
            margin-top: 20px;
        }
    }
}
</style>