<template>
    <div class="basic-layout">
        <div class="nav-side"></div>
        <!-- 系统LOGO -->
        <div class="logo">
            <img src="./../assets/logo.png" class="img"/>
            <span class="text">Manager</span>
        </div>
        <!-- 导航菜单 -->
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo left-meun"
        >
            <TreeMenu :userMenu="userMenu"></TreeMenu>
        </el-menu>
        <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
            <div class="nav-top">
                <div class="nav-left">
                    <div class="menu-fold" @click="toggle">
                        <i class="el-icon-s-fold"></i>
                    </div>
                    <div class="bread">
                        <BreadCrumb />
                    </div>
                </div>
                <div class="user-info">
                    <el-badge
                        :is-dot="true"
                        class="notice"
                        type="danger"
                    >
                        <el-icon class="bell"><Bell /></el-icon>
                    </el-badge>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                        {{ userInfo.userName }}
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                        </span>
                        <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>{{ userInfo.userEmail }}</el-dropdown-item>
                        </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div class="wrapper">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import TreeMenu from './TreeMenu.vue';
import BreadCrumb from './BreadCrumb.vue';

export default {
    name:"Home",
    data(){
        return {
            userInfo:this.$store.state.userInfo,
            userMenu:[]
        }
    },
    components:{
        TreeMenu,
        BreadCrumb
    },
    methods:{
        async loadMenuList(){
            try {
                const res = await this.$api.getMenuList()
                this.userMenu = res
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted(){
        this.loadMenuList()
    }
}
</script>

<style lang="scss">
.basic-layout{
    position: relative;
    .nav-side{
        width: 200px;
        height: 100vh;
        position: fixed;
        background-color: #001529;
        color:#fff;
        overflow-y: auto;
        transition: width .5s;
    }
    .logo {
        display: flex;
        align-items: center;
        font-size: 18px;
        height: 50px;

        .img {
            // margin-top: 100px;
            z-index: 999;
            margin: 0px 16px;
            width: 48px;
            height:48px;
        }
        .text{
            z-index: 999;
            color:#fff;
        }
    }
    .left-meun{
        width:201px;
        position: fixed;
        background-color: #001529;
        color:#fff;
    }
    .content-right{
        margin-left: 200px;
        // 合并
        &.fold {
            margin-left: 64px;
        }
        // 展开
        &.unfold {
            margin-left: 200px;
        }
        .nav-top{
            height: 20px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding: 0 20px;
            .user-info{
                .notice{
                    position: relative;
                    margin-right: 20px;
                    .bell{
                        position: relative;
                        top: -15px;
                        left: -15px;
                    }
                }
            }
        }
        
        .wrapper{
            background: #eef0f3;
            padding: 20px;
            height: calc(100vh - 50px);
            .main-page{
                background-color: #ffff;
                height: 100%;
            }
        }
    }
}
.el-sub-menu__title{
 color: #fff;
}

ul.el-menu.el-menu--inline{
 background-color: #001529;
 /* color: #fff; */
}

li.el-menu-item{
 color: #fff;
}
</style>