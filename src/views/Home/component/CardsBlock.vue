<template>
    <div>
        <el-card class="bcard">
            <div style="margin-left: 10px"><h1>每日特价</h1></div>
            <div style="display: flex;">
                <el-card class="lcard"></el-card>
                <div style="margin-left: 10px">
                    <div style="display: flex">
                        <el-card class="ecard"></el-card>
                        <div style="width: 5px"></div>
                        <el-card class="ecard"></el-card>
                    </div>
                    <div style="height: 5px"></div>
                    <div style="display: flex">
                        <el-card class="ecard"></el-card>
                        <div style="width: 5px"></div>
                        <el-card class="ecard"></el-card>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "CardsBlock"
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
    }
    .ecard {
        width: 200px;
        height: 145px;
    }
</style>