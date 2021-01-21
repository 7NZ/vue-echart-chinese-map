<template>
  <v-chart ref="mapChart" autoresize :options="chartOpt"/>
</template>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from 'vue-echarts'
import * as echarts from 'echarts/index.blank'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/chart/map'
// import 'zrender/lib/canvas/canvas';

import nameMap from './provinceMap.js'
import cityMap from './citymap.js'

import cityJson from '@/assets/map/json/china-cities.json'
console.log(cityJson)

export default {
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      nameArr: ['china'],
      level: 1,
      chartOpt: {
        title: {
          text: '地图',
          subtext: '右键点击返回上一级'
        },
        tooltip: {
          show: true,
          trigger: 'item'
          // formatter: '{b}:{c}'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          min: 1,
          max: 10000,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        },
        series: [],
        animationDuration: 2000
      }
    }
  },
  computed: {
    comp() {
      return this.$refs.mapChart
    }
  },
  created() {
    const name = nameMap['中国']
    this.renderChart(name, name)
  },
  mounted() {
    this.inToNext()
    this.back()
  },
  methods: {
    back() { // 返回上一级
      /* this.comp.chart.on('contextmenu', () => {
        console.log('contextmenu')
        if (this.nameArr.length > 1) {
          this.nameArr.pop()
          this.setOption()
        }
      }) */
      this.comp.$el.addEventListener('contextmenu', e => {
        e.preventDefault() // 去除鼠标默认右键菜单
        if (this.nameArr.length > 1) {
          this.level -= 1
          this.nameArr.pop()
          this.setOption()
        }
      })
    },
    inToNext() { // 点击下钻
      this.comp.chart.on('click', params => {
        console.log(params)
        if (nameMap[params.name] !== undefined) {
          this.nameArr.push(params.name)
          const jsonDir = 'province/' + nameMap[params.name]
          this.renderChart(params.name, jsonDir)
          this.level = 2
        }
        if (cityMap[params.name] !== undefined) {
          this.nameArr.push(params.name)
          const jsonDir = 'city/' + cityMap[params.name]
          this.renderChart(params.name, jsonDir)
          this.level = 3
        }
      })
    },
    renderChart(name, jsonSrc) {
      import('@/assets/map/json/' + jsonSrc + '.json')
        .then(({ default: json }) => {
          console.log(json)
          echarts.registerMap(name, json)
          this.setOption()
        })
        .catch(err => {
          console.warn(err)
        })
    },
    setOption() {
      this.chartOpt.series = [{
        name: '中国地图',
        type: 'map',
        map: this.nameArr.length > 1 ? this.nameArr[this.nameArr.length - 1] : this.nameArr[0],
        label: {
          show: true
        },
        zoom: 1, // 当前视角的缩放比例
        roam: true, // 是否开启平游或缩放
        scaleLimit: { // 滚轮缩放的极限控制
          min: 1,
          max: 2
        },
        data: [
          { name: '浙江', value: 40 },
          { name: '杭州市', value: 15 },
          { name: '福建', value: 16 }
        ]
      }]
    }
  }
}
</script>
