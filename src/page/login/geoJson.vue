
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

    const viewer = new Cesium.Viewer("cesiumContainer", {
       requestRenderMode : true,//画面不发生变化时,停止渲染  节省性能
    });

    viewer.scene.debugShowFramesPerSecond = true;//展示fps

    viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏底部版权信息
  
    var promise=Cesium.GeoJsonDataSource.load(require('./static/jsonpoint.json'),{});
promise.then(function(dataSource) {

  viewer.dataSources.add(dataSource);
  //设置样式
    var entities = dataSource.entities.values;
    //可对单个实体进行设置
    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        //修改图片
        // entity.billboard.image =require("./waterNormalsSmall.jpg") ;
        //添加注记
        entity.label = new Cesium.LabelGraphics({
            text:entity.properties.NAME._value,
            font : '12px sans-serif',
            pixelOffset : new Cesium.Cartesian2(0.0, 10)
        });
    }
    
});
viewer.flyTo(promise);

  },
  methods: {},
  components: {},
};
</script>

<style>
</style>