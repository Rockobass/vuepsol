<template>
  <div style="margin: 0 auto">
    <div style="width: 1300px">
      <div style="margin-top: 40px;font-size: 20px;">确认订单信息</div>
      <hr>

      <div style="margin-top: 40px">
        <div v-for="(item,si) in storeList">
          <div style="margin-bottom: 30px">
            <div style="margin-bottom: 15px">
              <span>
                <i class="el-icon-s-shop" style="color: orangered;font-size: 28px;margin-left: 10px"></i>
              </span><span style="position: relative;bottom: 3px;left: 2px">店铺：{{item.storeName}}</span>
            </div>

            <div v-for="(choice,ci) in item.choiceList" class="it">
              <div style="display: flex">
                <div style="border: 1px solid #eee;margin-left: 12px">
                  <el-image :src="'/api'+choice.coverImg"  style="width: 100px;height: 100px;cursor: pointer" fit="scale-down" @click="toDetail(choice.productId)"></el-image>
                </div>
                <span style="width: 230px;font-size: 12px;color: #3c3c3c;margin-left: 20px;cursor: pointer" @click="toDetail(choice.productId)">{{choice.productName}}</span>
                <span style="color: #9c9c9c;margin-left: 30px;font-size: 11px;margin-top: 6px;width: 130px">商品规格：{{choice.choiceName}}</span>
                <span style="width: 80px;margin-left: 100px;color: #3c3c3c;font-weight: 700;font-family: Helvetica Neue,sans-serif;margin-top: 4px">￥{{Math.floor(choice.price).toFixed(2)}}</span>
                <el-input-number v-model="choice.number" :disabled="true" size="mini" style="margin-left: 80px"></el-input-number>
                <span style="margin-left: 100px;color: #f40;font-weight: 700;font-family: Helvetica Neue,sans-serif;margin-top: 4px">￥{{Math.floor(choice.number * choice.price).toFixed(2)}}</span>
              </div>
              <div style="margin-top: 10px;margin-left: 30px" v-if="choice.special">
                <span style="font-size: 10px;color: orange">扶贫商品：  成交后商家会获得{{choice.price * 0.05}}元互助金</span>
              </div>
            </div>
            <div style="text-align: right;margin-top: 6px">店铺合计:
              <span style="color: rgb(255, 0, 54);font-size: 18px;font-weight: 700;margin-left: 3px">￥{{Math.floor(item.total).toFixed(2)}}</span>
            </div>

          </div>
        </div>
      </div>


      <div style="display: flex;justify-content: flex-end">
        <div style="border: 1px solid #ff0036;width: 500px;text-align: right;padding: 20px 8px 20px 20px;height: 140px">
          <div>
            <span style="font-weight: 700;position:relative;bottom: 2px;right: 3px">总计:</span>
            <span style="font-size: 26px;margin-right: 4px;color: #999;">￥</span>
            <span style="font: 700 26px tahoma;color: rgb(255, 0, 54);">{{totalPrice}}</span>
          </div>
          <div style="margin-top: 25px">
            <span style="font-weight: 700;position:relative;right: 3px;">寄送至:</span>
            <span>浙江 杭州 西湖 留下 留和路288号浙江工业大学家和东苑14幢</span>
          </div>
          <div style="margin-top: 10px">
            <span style="font-weight: 700;position:relative;right: 3px">收货人:</span>
            <span>蔡蔡</span>
            <span>13067828009</span>
          </div>

        </div>
      </div>

      <div style="display: flex;justify-content: flex-end;cursor: pointer">
        <div style="padding-top: 8px;margin-right: 100px">
          <i class="el-icon-back" style="font-size: 14px;margin-right: 4px"></i>
          <span style="font-size: 15px" @click="toCart()">返回购物车</span>
        </div>
        <el-button @click="checkout()" type="danger" size="medium" plain>提交订单</el-button>
      </div>



      <div style="height: 100px"></div>




    </div>
  </div>
</template>

<script>
  import {Message} from 'element-ui'
  export default {
    name: "CheckOut",
    computed: {
      postData() {
        let postData = {
          userId: this.userId,
          storeList: []
        };

        for (let i = 0; i < this.storeList.length; i++) {
          let storeObj = {
            storeId: this.storeList[i].storeId,
            total: this.storeList[i].total,
            choiceList: []
          };

          for (let j = 0; j < this.storeList[i].choiceList.length; j++) {
            let aChoice = {
              choiceId: this.storeList[i].choiceList[j].choiceId,
              number: this.storeList[i].choiceList[j].number
            };
            storeObj.choiceList.push(aChoice)
          }
          postData.storeList.push(storeObj)
        }
        return postData
      },

    },
    data() {
      return {
        userId: null,
        totalPrice: null,
        storeList: []
      }
    },
    created() {
      let dt = this.$route.params.data;
      this.userId = dt.userId;
      this.totalPrice = dt.totalPrice;
      this.storeList = dt.storeList;
    },
    methods: {
      checkout() {
        this.postRequest('/api/order/checkout',this.postData).then(res => {
          this.$router.replace("/home/index")
        })
      },
      toCart(){
        this.$router.replace("/home/cart")
      }
    }
  }
</script>

<style scoped>
  .bt {
    position: fixed;
    /*left: 0;*/
    bottom: 0;
    width: 1300px;
    z-index: 9999;
    height: 80px;
    background-color: #F4F4F4;

    display: flex;
    justify-content: space-between;
  }

  .it {
    border: 1px solid #e8e8e8;
    padding: 23px 23px 20px 23px;
    background-color: #fcfcfc;
  }
</style>