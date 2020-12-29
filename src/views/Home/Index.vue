<template>
  <div>
    <el-container class="main">
      <div style="text-align: center">
        <div class="search" style="width: 600px">
          <el-input placeholder="输入商品关键字" class="input">
            <el-button slot="append">搜索</el-button>
          </el-input>
        </div>

        <div class="carousel">
          <el-carousel :interval="4000" type="card" height="360px" style="width: 1300px">
            <el-carousel-item v-for="item in this.swipperUrls" :key="item">
              <el-image
                      style="height: 360px;width: 100%"
                      :src="item"
                      fit="fill"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="bargin">
          <CardsBlock :title="leftTitle" :goods="leftGoods"></CardsBlock>

          <div style="width: 20px"></div>

          <CardsBlock :title="rightTitle" :goods="rightGoods"></CardsBlock>
        </div>

        <div style="display: flex;justify-content: center">
          <div class="d1"><hr></div>
          <div style="font-size: 18px;margin: 20px 5px"><h1>为你推荐</h1></div>
          <div class="d1"><hr></div>
        </div>

        <div style="display: flex;justify-content: center">
          <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="生活日用" name="1"></el-tab-pane>
            <el-tab-pane label="电子数码" name="2"></el-tab-pane>
            <el-tab-pane label="服饰家居" name="3"></el-tab-pane>
            <el-tab-pane label="食品酒饮" name="4"></el-tab-pane>
            <el-tab-pane label="补贴扶贫" name="5"></el-tab-pane>
          </el-tabs>
        </div>

        <div style="display: flex;flex-wrap: wrap;width: 1300px">
          <display-card v-for="(item, index) in display.list" :product="display.list[index]"></display-card>
        </div>

      </div>

    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Index"
  }
</script>

<style scoped>

</style>