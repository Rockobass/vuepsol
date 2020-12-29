<template>
  <div>
    <el-card class="ecard" :body-style="{padding: '3px'}">
      <div style="display: flex">
        <el-image :src="goods.coverImg" fit="cover" class="im"></el-image>
        <div class="d1">
          <div class="nm">{{goods.name}}</div>
          <div>￥{{goods.lowPrice}}</div>
          <span style="text-decoration: line-through">￥{{goods.highPrice}}</span>
          <div>销量: {{goods.sales}}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "HorizentalCard",
    props: {
      goods: {
        type: Object
      }
    }
  }
</script>

<style scoped>
  .ecard {
    width: 200px;
    height: 145px;
  }
  .im {
    padding: 5px 0 0 4px;
    width: 100px;
    height: 130px;
  }
  .d1 {
    margin-left: 10px;
    margin-top: 10px;
    width: 80px;
    font-size: 12px;
  }

  .nm {
    display: flex;
    flex-wrap: wrap;
    overflow-y: hidden;
    text-overflow: ellipsis;
    height: 30px;
  }

  .nm :hover {
    text-decoration: underline;
  }
</style>