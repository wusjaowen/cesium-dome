
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

    var vmodels = Cesium.createDefaultImageryProviderViewModels();
    let modelTree = Cesium.createDefaultTerrainProviderViewModels();

    const viewer = new Cesium.Viewer("cesiumContainer");

    viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏底部版权信息

    //画点
    let pions = viewer.entities.add({  //添加一个实体，仅需要传递一个简单JSON对象，返回值是一个Entity对象
      name: '这是一个点呀',
      position: Cesium.Cartesian3.fromDegrees(-70, 35, 35),
        point: {
          color: Cesium.Color.RED,
          pixelSize: 10,
          outlineColor: Cesium.Color.YELLOW,
          outlineWidth: 3,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
    });
    //画线
    let line = viewer.entities.add({  //添加一个实体，仅需要传递一个简单JSON对象，返回值是一个Entity对象
      name: '这是我画的线呀',
      polyline: {
          positions: parent.Cesium.Cartesian3.fromDegreesArray([-75, 35,-125, 35]),
          width:5,
          material: Cesium.Color.BLUE.withAlpha(0.5), //材质
          clampToGround: true
      }
    });
   
    //画矩形
    var wyoming = viewer.entities.add({  //添加一个实体，仅需要传递一个简单JSON对象，返回值是一个Entity对象
      name: '这是一个矩形',
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([//一组地理坐标
          -109.080842, 45.002073,
          //   -105.91517,45.002073,
          -104.058488, 44.996596,
          //   -104.053011,43.002989,
          -104.053011, 41.003906,
          //   -105.728954,40.998429,
          -107.919731, 41.003906,
          //   -109.04798,40.998429,
          -111.047063, 40.998429,
          //   -111.047063,42.000709,
          -111.047063, 44.476286,
          -111.05254, 45.002073]),
        material: Cesium.Color.BLUE.withAlpha(0.5), //材质
        outline: true, //是否显示轮廓
        outlineColor: Cesium.Color.RED //轮廓的颜色
      }
    });

    let handler = new Cesium.ScreenSpaceEventHandler(_viewer.scene.canvas);
    handler.setInputAction((event) => {
        let pick = _viewer.scene.pick(event.position);
        if (Cesium.defined(pick)) {
            console.log(pick.id._properties);
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


  },
  methods: {},
  components: {},
};
</script>

<style>
</style>