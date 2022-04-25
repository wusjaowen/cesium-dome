
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
    });

    viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏底部版权信息


    let count = 0;

    let positionList = [{
      longitude: 116.405419, latitude: 39.918034, height: 50000, heading: 0,
      pitch: -30,
      roll: 0,
      duration: 10,
    },
    {
      longitude: 120.2821, latitude: 33.918145, height: 0,
      heading: 0,
      pitch: -30,
      roll: 0,
      duration: 10,
    },
    {
      longitude: 115.497402, latitude: 39.344641, height: 20000,
      heading: 0,
      pitch: -30,
      roll: 0,
      duration: 10,
    },
    {
      longitude: 107.942392, latitude: 29.559967, height: 70000,
      heading: 0,
      pitch: -30,
      roll: 0,
      duration: 10,
    },
    {
      longitude: 106.549265, latitude: 29.559967, height: 10000,
      heading: 0,
      pitch: -30,
      roll: 0,
      duration: 10,
    }]

    function fly() {
      if (count >= positionList.length) {
        return;
      }
      var position = positionList[count];

      //移动摄像头
      viewer.camera.flyTo({
        //目标位置
        destination: Cesium.Cartesian3.fromDegrees(
          position.longitude,
          position.latitude,
          position.height
        ),
        //移动时间
        duration: parseFloat(position.duration),
        //摄像头角度
        orientation: {
          heading: Cesium.Math.toRadians(position.heading),
          pitch: Cesium.Math.toRadians(position.pitch),
          roll: Cesium.Math.toRadians(position.roll)
        },
        complete: function () {
          fly();
        }
      });
      //
      count++;
    }

    fly();


  },
  methods: {},
  components: {},
};
</script>

<style>
</style>