<template>
  <div id="app">
    <map-chart />
  </div>
</template>

<script>
import MapChart from './components/MapChart.vue'

export default {
  name: 'App',
  components: {
    MapChart
  }
}
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
  }
  #app {
    width: 100%;
    height: 100%;
  }
</style>
