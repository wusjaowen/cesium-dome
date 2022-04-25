
<template>
  <div class="box">
    <div id="cesiumContainer" class="fullSize"></div>
    <div id="loadingOverlay"><h1>Loading...</h1></div>
    <div id="toolbar"></div>

  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
  mounted() {
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmOWRiNmU3My02NWQ1LTQ4MzEtOTE5OC1mM2E5NzZmMWQ5MmMiLCJpZCI6OTAyNjUsImlhdCI6MTY1MDM4MDQwNn0.RsT71-k5bufa1Wplfj1-tMRNZJCsumtSSUqGDgousvI";

    const viewer = new Cesium.Viewer("cesiumContainer");

    viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏底部版权信息

    viewer.scene.globe.depthTestAgainstTerrain = false;// 为true时相对于地形表面绘制,有地形时会被地形高程遮挡  false时始终在顶部
    viewer.scene.skyAtmosphere.show = false;//地表大气层是否开启

    viewer.scene.globe.imageryLayers.get(0).alpha = 0.0;//地球的图像图层

    console.log(Cesium.Color.fromCssColorString('#ff9326'),'看看颜色');

    //通过Cesium.Color.fromCssColorString('#ff9326') 转化为 new Cesium.Color 的四个参数 红绿蓝 透明度

    viewer.scene.globe.baseColor = new Cesium.Color(1, 0.5764705882352941,  0.14901960784313725, 0);//设置球的基础色

  },
  methods: {},
  components: {},
};
</script>

<style>
</style>