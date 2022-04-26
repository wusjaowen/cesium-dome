
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
      shouldAnimate: true//重要!!!! 不开启不会动
    });

    viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏底部版权信息

    let url = '/apies/SampleData/models/CesiumAir/Cesium_Air.glb';

    let count = 0;

    let positionList = [{ longitude: 116.405419, latitude: 39.918034, height: 0, time: 0 },
    { longitude: 120.2821, latitude: 33.918145, height: 30000, time: 30 },
    { longitude: 115.497402, latitude: 39.344641, height: 70000, time: 60 },
    { longitude: 107.942392, latitude: 29.559967, height: 70000, time: 110 },
    { longitude: 106.549265, latitude: 29.559967, height: 30000, time: 120 }]


    let start = Cesium.JulianDate.fromDate(new Date());
    let property = createProperty(positionList);
    //添加模型
    let entity = viewer.entities.add({
      name: '12',
      position: property,
      // 根据所提供的位置计算模型的朝向
      orientation: new Cesium.VelocityOrientationProperty(property),
      model: {
        uri: url,
        minimumPixelSize: 512,//模型最小像素
          maximumScale: 2000,//模型最小像素 最大20000
        scale: 1000,
      },
    });
    viewer.trackedEntity = entity;




    function createProperty(source) {
      // 取样位置 相当于一个集合
      let property = new Cesium.SampledPositionProperty();
      for (let i = 0; i < source.length; i++) {
        let time = Cesium.JulianDate.addSeconds(start, i * 500, new Cesium.JulianDate);
        let position = Cesium.Cartesian3.fromDegrees(source[i].longitude, source[i].latitude, source[i].height);
        // 添加位置，和时间对应
        property.addSample(time, position);
      }
      console.log(property,'123456');
      return property;
    }

  },
  methods: {},
  components: {},
};
</script>

<style>
</style>