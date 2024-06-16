<template>
  <div id="app">
    <p>micro app vue sub-app</p>
    <!-- <router-view></router-view> -->
    <div id="hello-world"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    console.log('micro app vue sub-app2')
    console.log(this.loadMicroApp)
  }
}
</script>

<style>
</style>
