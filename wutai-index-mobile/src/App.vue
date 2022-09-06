<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}
.main{
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
  a{
    color: #2A2A2A;

  }
</style>
