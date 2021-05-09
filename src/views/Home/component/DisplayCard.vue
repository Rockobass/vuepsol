<template>
  <div>
    <el-card class="listcard">
      <el-image :src="product.coverImg" style="height: 210px;cursor: pointer" fit="cover" @click="toDetail(product.id)"></el-image>
      <p class="nm" @click="toDetail(product.id)">{{product.name}}</p>
      <div style="display: flex;justify-content: start;margin-left: 4px;">
        <span style="position: relative;top: -10px">￥{{product.lowPrice}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>

  export default {
    name: "DisplayCard",
    props: {
      product: {
        type: Object
      }
    },
    methods: {
      toDetail(id) {
        this.$router.push('/home/detail/'+ id)
      }
    }
  }
</script>

<style scoped>
  .listcard {
    width: 251px;
    height: 330px;
    margin-right: 3px;
    margin-left: 3px;
    margin-bottom: 5px;
  }
  .nm {
    cursor: pointer;
    text-indent: 3px;
    font-size: 15px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: hidden;
    text-overflow: ellipsis;
    height: 38px;
  }
</style>