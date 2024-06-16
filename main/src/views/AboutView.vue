<template>
  <div class="about">
    <h1>This is parent about page</h1>
    <div id="subapp-viewport2"></div>
  </div>
</template>

<script>
import { start } from 'qiankun';
export default {
  mounted() {
    console.log('window qiankunStarted', window.qiankunStarted)
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      console.log('111111111111')
      start();
    }
  },
}
</script>
<style scoped>
h1{
  color: green;
}
</style>