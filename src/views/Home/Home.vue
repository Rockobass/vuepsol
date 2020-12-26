<template>
    <div>
        <el-container>
            <el-header>
                <div class="hd">
                    <div>
                        <router-link to="">我的订单</router-link>
                    </div>
                    <div>
                        <router-link to="">申请开店</router-link>
                    </div>
                    <div>
                        <router-link to="">收货地址</router-link>
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
            
            <el-container class="main">
                <div style="text-align: center">
                    <div class="search">
                        <el-input placeholder="输入商品关键字">
                            <el-button slot="append">搜索</el-button>
                        </el-input>
                    </div>

                    <div class="carousel">
                        <el-carousel :interval="4000" type="card" height="360px" style="width: 1300px">
                            <el-carousel-item v-for="item in 6" :key="item">
                                <h3 class="medium">{{ item }}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>

                    <div class="bargin">
                        <CardsBlock></CardsBlock>

                        <div style="width: 20px"></div>

                        <CardsBlock></CardsBlock>
                    </div>

                    <div style="display: flex;justify-content: center">
                        <div class="d1"><hr></div>
                        <div style="font-size: 18px;margin: 20px 5px"><h1>为你推荐</h1></div>
                        <div class="d1"><hr></div>
                    </div>

                    <div style="display: flex;justify-content: center">
                        <el-tabs v-model="activeName" @tab-click="tabClick">
                            <el-tab-pane label="生活日用" name="first"></el-tab-pane>
                            <el-tab-pane label="电子数码" name="second"></el-tab-pane>
                            <el-tab-pane label="服饰家居" name="third"></el-tab-pane>
                            <el-tab-pane label="食品酒饮" name="third"></el-tab-pane>
                            <el-tab-pane label="补贴扶贫" name="fourth"></el-tab-pane>
                        </el-tabs>
                    </div>

                    <div style="display: flex;flex-wrap: wrap;width: 1300px">
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                        <el-card class="listcard"></el-card>
                    </div>

                </div>

            </el-container>

        </el-container>
    </div>
</template>

<script>
    import CardsBlock from "./component/CardsBlock";
    export default {
        name: "Home",
        components: {CardsBlock},
        comments: {
            CardsBlock
        },
        data() {
            return {
                activeName: 'second'
            }
        },
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

                }
            },
            tabClick(tab, event) {
                console.log(tab.paneName, event.type);
            }
        }
    }
</script>

<style>
    .hd{
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }
    .hd div{
        margin-right: 3px;
    }
    .el-header {
        background-color: #F4F4F4;
    }
    .search {
        margin: 15px auto;
    }
    .el-input {
        width: 600px;
    }
    .main {
        background-color: #fff;
        height: 100%;
        margin: 0 auto;
    }
    .carousel {
        margin-top: 30px;
        display: flex;
        justify-content: center;
    }
    .bargin{
        display: flex;
        justify-content: center;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }
    .d1 {
        margin: auto 0;
        width: 500px;
    }
    .listcard {
        width: 251px;
        height: 300px;
        margin-right: 3px;
        margin-left: 3px;
        margin-bottom: 5px;
    }


    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .el-tab-pane {
        color: #505458;
    }
    .el-tabs__item.is-active{
        color:rgb(73,178,82);
    }

    .el-tabs__active-bar{
        background-color:rgb(73,178,82);
    }

</style>