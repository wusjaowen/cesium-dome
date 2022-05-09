
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
      //  requestRenderMode : true,//画面不发生变化时,停止渲染  节省性能
    });

    viewer.scene.debugShowFramesPerSecond = true;//展示fps

    viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏底部版权信息


    var startTime = Cesium.JulianDate.now();
    console.log(startTime,'121212');
var speedtime=200; //毫秒

function computeCircle(radius) {
    var positions = [];
    for (var i = 0; i < 360; i++) {
        var radians = Cesium.Math.toRadians(i);
        positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
    }
    console.log(positions,'22331221321');
    return positions;
}

//时间相关
let greenTube = viewer.entities.add({
    name : '绘制管线',
    polylineVolume : {
        positions : Cesium.Cartesian3.fromDegreesArray([-86.0, 31.0,
                                                        -86.0, 35.0,
                                                        -90.0, 35.0]),
        shape : computeCircle(6000.0),//设置形状
        //CallbackProperty 方法不断返回新的值
        material : new Cesium.ColorMaterialProperty(new Cesium.CallbackProperty(function() { 
          //根据时间变化不断返回新的值
            let diff = Cesium.JulianDate.secondsDifference( Cesium.JulianDate.now(), startTime) ;
            let v = parseInt(Math.floor(diff*1000)/speedtime)%2;
            console.log(v);
            return Cesium.Color.GREEN.withAlpha(v);
        }, false))
    }
});

//方法二 直接赋值改变材质
// var ellipse = greenTube.polylineVolume;  

//        setTimeout(() => {
//           ellipse.material = Cesium.Color.RED;//直接改变材质
//        }, 5000);
// var ellipse = entity.ellipse;  
//         ellipse.material = Cesium.Color.RED;
//移动摄像头
let cameraPosition={
   longitude: -86.0, latitude: 31.918034, height: 50000, heading: 0,
      pitch: -30,
      roll: 0,
      duration: 1,
}
      viewer.camera.flyTo({
        //目标位置
        destination: Cesium.Cartesian3.fromDegrees(
          cameraPosition.longitude,
          cameraPosition.latitude,
          cameraPosition.height
        ),
        //移动时间
        duration: parseFloat(cameraPosition.duration),
        //摄像头角度
        orientation: {
          heading: Cesium.Math.toRadians(cameraPosition.heading),
          pitch: Cesium.Math.toRadians(cameraPosition.pitch),
          roll: Cesium.Math.toRadians(cameraPosition.roll)
        },
        complete: function () {
          // fly();
        }
      });


  },
  methods: {},
  components: {},
};
</script>

<style>
</style>