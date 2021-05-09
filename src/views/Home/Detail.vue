<template>
  <div style="margin: 0 auto">
    <div style="margin-top: 30px">
      <router-link to="/home">返回首页</router-link>
    </div>

    <div>
      <div class="hd">
        <div class="carousel">
          <el-carousel height="500px" style="width: 400px" trigger="click" indicator-position="none">
            <el-carousel-item v-for="item in this.product.swipperImgs" :key="item">
              <el-image
                      style="width: 100%"
                      :src="item"
                      fit="fill"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="rt">
          <span style="font-size: 20px;">{{product.name}}</span>
          <hr>
          <div style="margin-top: 40px;font-size: 18px">价格：   <span style="font-size: 26px;color: red;margin-left: 40px;">￥{{Math.floor(price).toFixed(2)}}</span></div>
          <div style="text-align: right;font-size: 14px;color: red">互助金: {{(Math.floor(price) * 0.05 ).toFixed(2)}}元</div>
          <div style="display:flex;margin-top: 30px;justify-content: space-between">
            <div style="display: flex">
              <div><span style="font-size: 18px">发货</span><span style="margin-left: 30px"><i class="el-icon-location-outline"></i> <span>{{product.address}}</span></span></div>
            </div>
            <div style="text-align: right;">累计销售： <span style="color: grey;font-size: 14px;">{{product.sales}}</span></div>
          </div>
          <div style="margin-top: 30px">
            <div style="font-size: 18px">保障</div>
            <div style="margin-left: 50px;margin-top: 6px">
              <span v-for="(item, index) in product.services">
              <span>{{item.name}}</span>
              <span v-if="index !== product.services.length-1" style="margin: auto 2px">·</span>
            </span>
            </div>
          </div>

          <div style="margin-top: 30px;font-size: 18px;margin-bottom: 20px"><span>商品选择:</span></div>
          <div style="display: flex;flex-wrap: wrap; width: 450px;margin-left: 30px">
            <div v-for="(item, index) in product.choices">
              <div class="choice" :class="{active: index === selectIndex}" @click="select(item,index)">{{item.choice}}</div>
            </div>
          </div>

          <div style="display: flex">
            <div style="font-size: 18px; margin-top: 10px">数量</div>
            <el-input-number v-model="choice.number"
                             @change="numChange" :min="1" :max="storage" label="数量" size="mini"
                             style="margin-top: 8px;margin-left: 12px"
            ></el-input-number>
            <div style="margin-top: 10px;margin-left: 8px"> (库存 {{storage}} 件)</div>
          </div>

          <div style="display: flex;margin-top: 15px;">
            <el-button type="danger" plain style="margin-right: 10px" @click="addCart()">加入购物车</el-button>
            <el-button type="danger" @click="buy()">立即购买</el-button>
          </div>

        </div>
      </div>
    </div>

    <div>
      <el-tabs type="border-card" style="height: 300px">
        <el-tab-pane label="商品详情" class="pane">
          <div style="margin: 20px;width: 920px">
            <span>{{product.description}}</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品参数" class="pane">
          <div style="display: flex;flex-wrap: wrap;width: 920px;padding-left: 80px;padding-top: 40px">
            <div v-for="item in product.args" style="width: 240px;margin-right: 30px">
              <span>{{item.name}} :</span>
              <span>{{item.value}}</span>
            </div>

          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div v-for="item in product.bodyImgs" style="text-align: center;">
      <img :src="item" alt="" style="width: 700px">
    </div>

  </div>
</template>

<script>
  import {Message} from 'element-ui'
  export default {
    name: "Detail",
    data() {
      return {
        id: null,
        product: {},
        price: null,
        selectIndex: null,
        storage: null,
        choice: {
          number: 1,
          userId: null,
          choiceId: null,
          choiceName:null
        }
      }
    },
    computed:{
      user(){
        return this.$store.state.user
      },
      checkoutGoods() {
        let data = {
          userId: this.user.id,
          totalPrice: this.choice.number * this.price,
          storeList:[]
        };
        let storeObj = {
          storeId: this.product.storeId,
          storeName: this.product.storeName,
          special:false,
          total: this.choice.number * this.price,
          choiceList: []
        };
        let choiceObj = {
          choiceId: this.choice.choiceId,
          number: this.choice.number,
          productId: this.product.id,
          price: this.price,
          choiceName: this.choice.choiceName,
          selected: true,
          coverImg: this.product.coverImg,
          productName: this.product.name
        };
        storeObj.choiceList.push(choiceObj);
        data.storeList.push(storeObj);
        return data;
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.getRequest("/api/common/detail",{id:this.id}).then(res =>{
        this.product = res;
        for (let i = 0; i < res.swipperImgs.length; i++) {
          res.swipperImgs[i] = '/api' + res.swipperImgs[i]
        }

        for (let i = 0; i < res.bodyImgs.length; i++) {
          res.bodyImgs[i] = '/api' + res.bodyImgs[i]
        }

        for (let i = 0; i < res.choices.length; i++) {
          res.choices[i].choiceImg = '/api' + res.choices[i].choiceImg;
          res.choices[i].price = Math.floor(res.choices[i].price)
        }

        this.product = res;
        this.price = res.displayPrice
      })
    },
    methods: {
      select(item, index) {
        this.price = item.price
        this.selectIndex = index
        this.storage = item.storage
        this.choice.choiceId = item.choiceId
        this.choice.number = 1
        this.choice.choiceName = item.choice
      },
      numChange(value) {
        this.choice.number = value
      },
      addCart() {
        if (this.choice.choiceId == null) {
          Message.info("请选择商品规格")
        }else if (this.storage === 0){
          Message.info("库存不足")
        }else {
          this.choice.userId = this.user.id;
          this.postRequest('/api/cartItem/add',this.$qs.stringify(this.choice)).then(res => {
          })
        }
      },
      buy() {
        if (this.choice.choiceId == null) {
          Message.info("请选择商品规格");
          console.log(this.product)
          return
        }
        if (this.storage === 0) {
          Message.info("库存不足")
          return;
        }
        this.$router.push({
          name: 'Checkout',
          params: {data: this.checkoutGoods}
        })
      }
    }
  }
</script>

<style scoped>
  .hd {
    display: flex;
    justify-content: flex-start;
    width: 1000px;
    margin-top: 20px;
    border: 1px solid #eaeaea;
    padding: 30px;
  }
  .rt {
    margin-left: 90px;
  }
  .choice {
    border: 2px solid black;
    padding: 2px 5px 2px 5px;
    cursor: pointer;
    margin-right: 6px;
    margin-bottom: 4px;
  }
  .active {
    border: 2px solid orangered;
  }
  .pane {

  }

</style>