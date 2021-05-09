<template>
  <div class="dd" style="height: 100%;overflow: auto" v-infinite-scroll="loadMore" infinite-scroll-delay="200" infinite-scroll-distance="100px">
    <el-container class="main">
      <div style="text-align: center;margin-top: 50px;margin-bottom: 30px">
        <div class="search" style="width: 600px;margin: 0 auto">
          <el-input placeholder="输入商品关键字" class="input">
            <el-button slot="append">搜索</el-button>
          </el-input>
        </div>

        <div class="carousel">
          <el-carousel :interval="4000" type="card" height="360px" style="width: 1300px">
            <el-carousel-item v-for="item in this.swipperUrls"  :key="item">
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

        <div style="display: flex;flex-wrap: wrap;width: 1300px;overflow: auto;">
          <display-card v-for="(item, index) in display.list" :product="display.list[index]"></display-card>
        </div>

      </div>

    </el-container>
  </div>
</template>

<script>
  import CardsBlock from "./component/CardsBlock";
  import DisplayCard from "./component/DisplayCard";
  export default {
    name: "Index",
    components: {
      CardsBlock,
      DisplayCard,
    },
    data() {
      return {
        activeName: '1',
        swipperUrls: [],
        leftGoods: [],
        rightGoods: [],
        goods: {
          "1": {current:1, list:[]},
          "2": {current:1, list:[]},
          "3": {current:1, list:[]},
          "4": {current:1, list:[]},
          "5": {current:1, list:[]},
        },
        display: {
          current: null,
          list: []
        },
        leftTitle: '每日特价',
        rightTitle: '补贴扶贫',
      }
    },
    methods: {
      tabClick(tab, event) {
        console.log(tab.paneName, event.type);
        let name = tab.paneName;
        if (this.goods[name].list.length === 0) {
          this.getRequest('/api/common/type',{type:name,page:this.goods[name].current}).then(res => {
            for (let i = 0; i < res.length; i++) {
              res[i].coverImg = '/api' + res[i].coverImg
            }

            this.goods[name].list.push(...res);
            this.goods[name].current += 1

          })
        }
        this.display.current = this.goods[name].current;
        this.display.list = this.goods[name].list
        // this.activeName = name
      },
      loadMore() {
        let name = this.activeName
        this.getRequest('/api/common/type',{type:this.activeName,page:this.goods[this.activeName].current}).then(res => {
          for (let i = 0; i < res.length; i++) {
            res[i].coverImg = '/api' + res[i].coverImg
          }

          this.goods[name].list.push(...res);
          this.goods[name].current += 1
        })
      },
    },
    created() {
      this.getRequest('/api/common/home').then(resp => {
        this.swipperUrls = resp.swipper;
        for (var i=0;i<this.swipperUrls.length;i++) {
          this.swipperUrls[i] = '/api' + this.swipperUrls[i]
        }
        this.leftGoods = resp.leftGoods;
        for (let i = 0; i < this.leftGoods.length; i++) {
          this.leftGoods[i].coverImg = '/api' + this.leftGoods[i].coverImg;
          this.leftGoods[i].lowPrice = (Math.floor(parseInt(this.leftGoods[i].highPrice))).toFixed(2);
          this.leftGoods[i].highPrice = (Math.floor(parseInt(this.leftGoods[i].highPrice) + 20.0)).toFixed(2)
        }
        this.rightGoods = resp.rightGoods;
        for (let i = 0; i < this.rightGoods.length; i++) {
          this.rightGoods[i].coverImg = '/api' + this.rightGoods[i].coverImg;
          this.rightGoods[i].lowPrice = (Math.floor(parseInt(this.rightGoods[i].highPrice))).toFixed(2);
          this.rightGoods[i].highPrice = (Math.floor(parseInt(this.rightGoods[i].highPrice) + 20.0)).toFixed(2)
        }
        this.goods['1'].list = resp.goods;
        for (let i = 0; i < resp.goods.length; i++) {
          this.goods['1'].list[i].coverImg = '/api' + this.goods['1'].list[i].coverImg;
        }
        this.goods['1'].current = 2
        this.display.current = this.goods['1'].current;
        this.display.list = this.goods['1'].list

      })
    },
  }
</script>

<style scoped>
  .dd {
    height: 100%;
    margin: 0 auto;
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


  div::-webkit-scrollbar {
    width: 0;
  }

</style>