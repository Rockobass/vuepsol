<template>
  <div>
    <span v-html="html"></span>
  </div>
</template>

<script>
  export default {
    name: "MyOrder",
    computed:{
      user(){
        return this.$store.state.user
      }
    },
    data() {
      return {
        html: null
      }
    },
    created() {
      this.getRequest('/api/common/myOrder',{userId: this.user.id}).then(res => {
        this.html = res
      })
    }
  }
</script>

<style scoped>

</style>