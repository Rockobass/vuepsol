<template>
  <div style="margin: 0 auto">
    <div style="width: 1300px">
      <div style="color: orangered;margin-top: 40px;font-size: 20px;">全部商品</div>
      <hr>

      <div style="margin-top: 40px">
        <div v-if="!stores.length > 0">
          购物车空空如也, 快去首页看看吧!
        </div>
        <div v-for="(item,si) in stores" v-if="stores.length > 0">
          <div style="margin-bottom: 30px">
            <div style="margin-bottom: 15px">
              <span>
                <el-checkbox :change="ck(item)" v-model="item.selected" :name="item.storeId" style="position: relative;bottom: 5px;"></el-checkbox>
                <i class="el-icon-s-shop" style="color: orangered;font-size: 28px;margin-left: 10px"></i>
              </span><span style="position: relative;bottom: 3px;left: 2px">{{item.storeName}}</span>
            </div>

            <div v-for="(choice,ci) in item.products" class="it">
              <div style="display: flex">
                <el-checkbox v-model="choice.selected" style="position: relative;"></el-checkbox>
                <div style="border: 1px solid #eee;margin-left: 12px">
                  <el-image :src="'/api'+choice.coverImg"  style="width: 100px;height: 100px;cursor: pointer" fit="scale-down" @click="toDetail(choice.productId)"></el-image>
                </div>
                <span style="width: 230px;font-size: 12px;color: #3c3c3c;margin-left: 20px;cursor: pointer" @click="toDetail(choice.productId)">{{choice.productName}}</span>
                <span style="color: #9c9c9c;margin-left: 30px;font-size: 11px;margin-top: 6px;width: 130px">商品规格：{{choice.choiceName}}</span>
                <span style="width: 80px;margin-left: 100px;color: #3c3c3c;font-weight: 700;font-family: Helvetica Neue,sans-serif;margin-top: 4px">￥{{Math.floor(choice.price).toFixed(2)}}</span>
                <el-input-number v-model="choice.number" @change="valueChange(choice.choiceId,choice.number)" size="mini" :min="1" :max="choice.storage" style="margin-left: 80px"></el-input-number>
                <span style="margin-left: 100px;color: #f40;font-weight: 700;font-family: Helvetica Neue,sans-serif;margin-top: 4px;width: 130px">￥{{choice.number * Math.floor(choice.price).toFixed(2)}}</span>
                <span style="position: relative;bottom: 4px"><el-button type="text" style="color: black" @click="deleteItem(choice.choiceId)">删除</el-button></span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div style="height: 100px"></div>




      <div class="bt">
        <div style="padding-top: 25px;padding-left: 25px;font-size: 18px">已选商品<span style="font-size: 20px;color: red;margin: auto 4px">{{totalSelected}}</span>件</div>
        <div style="padding-top: 20px;padding-right: 25px;font-size: 18px">合计：
          <span style="font-size: 20px;color: red">￥{{totalPrice}}</span>
          <el-button type="danger" size="big" style="font-size: 17px;margin-left: 30px" @click="toCheckOut()">结算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Message} from 'element-ui'
  export default {
    name: "Cart",
    computed:{
      user(){
        return this.$store.state.user
      },
      totalPrice() {
        let tp = 0;
        for (let i = 0; i < this.stores.length; i++) {
          for (let j = 0; j < this.stores[i].products.length; j++) {
            if (this.stores[i].products[j].selected) {
              tp += Math.floor(this.stores[i].products[j].price * this.stores[i].products[j].number)
            }
          }
        }
        return tp.toFixed(2)
      },
      totalSelected() {
        let ts = 0;
        for (let i = 0; i < this.stores.length; i++) {
          for (let j = 0; j < this.stores[i].products.length; j++) {
            if (this.stores[i].products[j].selected) {
              ts+=1
            }
          }
        }
        return ts
      },
      checkoutGoods() {
        let data = {
          userId: this.user.id,
          totalPrice: this.totalPrice,
          storeList:[]
        };
        for (let i = 0; i < this.stores.length; i++) {
          let aStore = {
            storeId: this.stores[i].storeId,
            storeName: this.stores[i].storeName,
            special: this.stores[i].special,
            total: 0,
            choiceList:[]
          };
          for (let j = 0; j < this.stores[i].products.length; j++) {
            if (this.stores[i].products[j].selected) {
              let p = this.stores[i].products[j];
              aStore.choiceList.push(this.stores[i].products[j]);
              aStore.total += p.price * p.number
            }
          }
          if (aStore.choiceList.length > 0)
            data.storeList.push(aStore)
        }
        return data
      },

    },
    created() {
      this.postRequest('/api/cart/getcart',this.$qs.stringify({userId: this.user.id})).then(res => {
        this.totalCount = res.total;
        this.stores = res.stores;
      })
    },
    data() {
      return {
        totalCount: null,
        stores: null
      }
    },
    methods: {
      ck(val) {
        console.log(val)
      },
      toDetail(id) {
        this.$router.push('/home/detail/'+ id)
      },
      toCheckOut() {
        if (!this.totalSelected > 0 ) {
          Message.info('未选择商品');
          return;
        }

        this.$router.push({
          name: 'Checkout',
          params: {data: this.checkoutGoods}
        })
      },
      deleteItem(choiceId){
        this.$confirm('确认删除该项吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest("/api/cartItem/delete",this.$qs.stringify({choiceId:choiceId,userId: this.user.id})).then(res =>{
            this.totalCount = res.obj.totalCount;
            this.stores = res.obj.stores;
          });

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {

        });
      },
      valueChange(choiceId,number) {
        this.postRequest('/api/cartItem/update',this.$qs.stringify({choiceId: choiceId,userId: this.user.id, number: number}))
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