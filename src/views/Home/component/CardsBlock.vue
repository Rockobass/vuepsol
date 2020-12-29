<template>
    <div>
        <el-card class="bcard">
            <div style="margin-left: 10px"><h1>{{title}}</h1></div>
            <div style="display: flex;">
                <el-card class="lcard" :body-style="{padding: '6px'}">
                    <el-image :src="goods[0].coverImg" style="height: 210px" fit="cover"></el-image>
                    <p class="p1">{{goods[0].name}}</p>
                    <div style="display: flex;justify-content: space-evenly">
                        <span>￥{{goods[0].lowPrice}}</span>
                        <span style="text-decoration: line-through">￥{{goods[0].highPrice}}</span>
                    </div>
                    <div style="text-align: right;font-size: 12px">销量: {{goods[0].sales}}</div>
                </el-card>
                <div style="margin-left: 10px">
                    <div style="display: flex">
                        <HorizentalCard :goods="goods[1]"/>
                        <div style="width: 5px"></div>
                        <HorizentalCard :goods="goods[2]"/>
                    </div>
                    <div style="height: 5px"></div>
                    <div style="display: flex">
                        <HorizentalCard :goods="goods[3]"/>
                        <div style="width: 5px"></div>
                        <HorizentalCard :goods="goods[4]"/>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import HorizentalCard from "./HorizentalCard";
    export default {
        name: "CardsBlock",
        components: {
          HorizentalCard
        },
        props: {
            title: {
                type: String
            },
            goods: {
                type: Array
            }
        }
    }
</script>

<style scoped>
    .bcard {
        text-align: left;
        width: 640px;
        height: 400px;
    }
    .lcard{
        width: 200px;
        height: 300px;
        cursor: pointer;
    }

    .p1 {
        width: 150px;
        overflow: hidden;
        font-size: 12px;
        white-space: nowrap;
        text-overflow:ellipsis;
    }
</style>