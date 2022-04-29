
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
    return {

    }
  },
  mounted() {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmOWRiNmU3My02NWQ1LTQ4MzEtOTE5OC1mM2E5NzZmMWQ5MmMiLCJpZCI6OTAyNjUsImlhdCI6MTY1MDM4MDQwNn0.RsT71-k5bufa1Wplfj1-tMRNZJCsumtSSUqGDgousvI'


    const viewer = new Cesium.Viewer("cesiumContainer", {
      animation: false, //是否创建动画小器件，左下角仪表
      baseLayerPicker: false, //是否显示图层选择器
      geocoder: false, //是否显示geocoder小器件，右上角查询按钮
      timeline: false, //是否显示时间轴
      scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      infoBox: false,
      selectionIndicator: false,
    });

    viewer._cesiumWidget._creditContainer.style.display = "none";//隐藏底部版权信息


    function loadTileset(url) {

      let tileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          id: 'model3Dtiles',
          url: url,//josn地址
          debugShowBoundingVolume: false,// 会渲染模型的边界
        })
      );
      return tileset.readyPromise
        .then(function () {

          const boundingSphere = tileset.boundingSphere;//获取模型的空间坐标系的中心点(xyz)  与 半径

          const radius = boundingSphere.radius;

          viewer.zoomTo(
            tileset,
            new Cesium.HeadingPitchRange(0.5, -0.5, radius * 4.0)// 参数一 0-6约等于一圈  参数二 俯视角度 负数往上  参数三 到中心点的距离(米)
          );//移动摄像机到模型的对应位置

          const scene = viewer.scene;
          const downHandler = new Cesium.ScreenSpaceEventHandler(
            viewer.scene.canvas
          );//获取地图对象
          //鼠标左键按下事件
          downHandler.setInputAction(function (movement) {
            //pick 射线拾取到的第一个“primitive”  (传入屏幕坐标   
            //pick获取一个  drillPick获取多个
            const pickedObject = scene.pick(movement.position);
            if (pickedObject) {
              // pickedObject //有值则为第一个primitive
            }


            //Cesium.Ray 1.摄像机的位置  2.摄像机的视图方向
            let ray = new Cesium.Ray(viewer.camera.positionWC, viewer.camera.directionWC);
            //pickFromRay 射线拾取到第一个primitive和世界坐标位置
            const pickedObject_world = scene.pickFromRay(ray, '', 10);
            //传入经纬度 计算坐标高度
            // let heightGeometry = scene.sampleHeight();

          }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

        })


    }






    loadTileset('/apies/SampleData/Cesium3DTiles/Instanced/InstancedOrientation/tileset.json');


  },
  methods: {


  },
  components: {},
}
</script>

<style>
</style>