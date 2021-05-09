<template>
    <div>
        <el-container style="height: 100vh">
            <el-header class="header">
                <div class="hd">
                    <div>
                        <router-link to="/home/index">首页</router-link>
                    </div>
                    <div>
                        <router-link to="/home/cart">购物车</router-link>
                    </div>
                    <div>
                        <router-link to="/myOrder">我的订单</router-link>
                    </div>
                    <div>
                        <router-link to="/home/openStore">申请开店</router-link>
                    </div>
                    <div>
                        <router-link to="/myAddress">收货地址</router-link>
                    </div>
                    <div>
                        <el-dropdown class="userInfo" @command="commandHandler">
                            <span class="el-dropdown-link" style="font-size: 15px">{{user.nickname}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                                <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>

            </el-header>

            <router-view style="height: 100%"></router-view>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        computed:{
            user(){
                return this.$store.state.user
            }
        },
        methods: {
            commandHandler(cmd) {
                if (cmd === 'logout') {
                    this.getRequest('/api/logout');
                    window.sessionStorage.removeItem("user");
                    this.$store.state.user = null;
                    this.$router.replace('/login')
                } else if (cmd === 'profile') {
                    this.$router.push('/home/profile')
                }
            },
        },
    }
</script>

<style scoped>
    .hd{
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }
    .hd div{
        margin-right: 3px;
    }
    .header {
        background-color: #F4F4F4;
    }

</style>