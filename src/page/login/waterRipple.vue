
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

 shouldAnimate: true,//重要!!!! 不开启不会动
      requestRenderMode: true,//画面不发生变化时,停止渲染  节省性能
    });

    viewer.scene.debugShowFramesPerSecond = true;//展示fps

    viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏底部版权信息
//全球 水波纹效果
var worldRectangle = viewer.scene.primitives.add(new Cesium.Primitive({
    geometryInstances : new Cesium.GeometryInstance({
      //构造 矩形或者拉伸的矩形
        geometry : new Cesium.RectangleGeometry({
            rectangle : Cesium.Rectangle.fromDegrees(-180, -90, 180.0, 90.0),

            // 构造多边形  line 地理坐标 范围内添加水波纹
            // new Cesium.PolygonGeometry({
        // polygonHierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(line)),
            vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        })
    }),
    appearance : new Cesium.EllipsoidSurfaceAppearance({
        aboveGround : true,
        material : new Cesium.Material({
            fabric : {
                type : 'Water',
                uniforms : {
                    blendColor: new Cesium.Color(0.0, 0.0, 1.0, 0.3),
                    normalMap:require('./waterNormalsSmall.jpg'),
                    frequency: 10000.0,  //频率
                    animationSpeed: 0.1,//动画速度
                    amplitude: 1.0      //振幅    
                }
            }
        })
    }),
    show : true
}))




  },
  methods: {},
  components: {},
};
</script>

<style>
</style>