<template>
  <div>
    <my-header/>
    <router-view></router-view>
    <my-footer/>
  </div>
</template>

<script>
import myHeader from './components/header-footer/Header.vue'
import myFooter from './components/header-footer/Footer.vue'

export default {
  components:{
    myHeader,
    myFooter
  },
  //在每次載入之前，先重置token
  created(){
    this.$store.dispatch('admin/refreshToken');
  }
}
</script>

<style>

  @import './assets/style.css';

</style>