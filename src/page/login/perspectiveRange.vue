
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
      shouldAnimate: true,
    });

  var west = Cesium.Math.toRadians(-77.0);//南
var south = Cesium.Math.toRadians(38.0);//东
var east = Cesium.Math.toRadians(-72.0);//北
var north = Cesium.Math.toRadians(42.0);//西
//方便查看范围
var maxExtent = new Cesium.Rectangle(west, south, east, north);//指定为经度和纬度坐标的二维区域。
viewer.entities.add({
    rectangle : {
        coordinates : maxExtent,
        fill : false,
        outline : true,
        outlineColor : Cesium.Color.WHITE
    }
});
var camera = viewer.scene.camera;
viewer.scene.screenSpaceCameraController.inertiaTranslate = 0;//平移惯性。值为零时，相机将没有惯性
//监听时间变化
viewer.clock.onTick.addEventListener(function() {
  //如果是2d模式
    if (viewer.scene.mode === Cesium.SceneMode.SCENE2D) {
      //屏幕坐标 转椭球面笛卡尔坐标
        var topLeft = camera.pickEllipsoid(new Cesium.Cartesian2(0, 0));
        var topRight = camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth, 0));
        var bottomLeft = camera.pickEllipsoid(new Cesium.Cartesian2(0, viewer.canvas.clientHeight));
        var bottomRight = camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth, viewer.canvas.clientHeight));
        
        if (topLeft && topRight && bottomLeft && bottomRight) {
            //判断点是否在矩形区域内部
            topLeft = Cesium.Ellipsoid.WGS84.cartesianToCartographic(topLeft);
            topRight = Cesium.Ellipsoid.WGS84.cartesianToCartographic(topRight);
            bottomLeft = Cesium.Ellipsoid.WGS84.cartesianToCartographic(bottomLeft);
            bottomRight = Cesium.Ellipsoid.WGS84.cartesianToCartographic(bottomRight);
            var visibleExtent = Cesium.Rectangle.fromCartographicArray([topLeft, topRight, bottomLeft, bottomRight]);
            //如果不包含,表示在矩形外
            if( !(Cesium.Rectangle.contains(maxExtent,topLeft) 
                &&Cesium.Rectangle.contains(maxExtent,topRight) 
                &&Cesium.Rectangle.contains(maxExtent,bottomLeft) 
                &&Cesium.Rectangle.contains(maxExtent,bottomRight) 
            )){
              //validExtent 矩形边界与 当前视角 的交集
                var validExtent =Cesium.Rectangle.intersection(maxExtent, visibleExtent,new Cesium.Rectangle()); 
                viewer.camera.setView({
                    destination: validExtent
                });
            }
        } else {
          console.log(3);
            viewer.camera.setView({
                    destination: maxExtent
                });
        }
    }
});

  },
  methods: {},
  components: {},
};
</script>

<style>
</style>