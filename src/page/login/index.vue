
<template>
  <div class="box">
    <div id="cesiumContainer" class="fullSize"></div>
    <div id="loadingOverlay"><h1>Loading...</h1></div>
    <div id="toolbar"></div>

    <div id="test" style="position: absolute;color:aqua;z-index: 99;">测试 overlay</div>

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

    

    const viewer = new Cesium.Viewer("cesiumContainer", {
      animation: true, //是否创建动画小器件，左下角仪表
      baseLayerPicker: true, //是否显示图层选择器
      fullscreenButton: false, //是否显示全屏按钮
      geocoder: true, //是否显示geocoder小器件，右上角查询按钮
      homeButton: false, //是否显示Home按钮
      infoBox: false, //是否显示信息框
      sceneModePicker: true, //是否显示3D/2D选择器
      selectionIndicator: true, //是否显示选取指示器组件
      timeline: false, //是否显示时间轴
      navigationHelpButton: false, //是否显示右上角的帮助按钮
      scene3DOnly: false, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      clock: new Cesium.Clock(), //用于控制当前时间的时钟对象
      selectedImageryProviderViewModel: vmodels[2], //当前图像图层的显示模型，仅baseLayerPicker设为true有意义
      imageryProviderViewModels:
        Cesium.createDefaultImageryProviderViewModels(), //可供BaseLayerPicker选择的图像图层ProviderViewModel数组
      selectedTerrainProviderViewModel: undefined, //当前地形图层的显示模型，仅baseLayerPicker设为true有意义
      terrainProviderViewModels:
        Cesium.createDefaultTerrainProviderViewModels(), //可供BaseLayerPicker选择的地形图层ProviderViewModel数组
      // imageryProvider: new Cesium.UrlTemplateImageryProvider({
      //   url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
      // }),
      terrainProvider: new Cesium.EllipsoidTerrainProvider(), //地形图层提供者，仅baseLayerPicker设为false有意义
      fullscreenElement: document.body, //全屏时渲染的HTML元素,
      useDefaultRenderLoop: true, //如果需要控制渲染循环，则设为true
      targetFrameRate: undefined, //使用默认render loop时的帧率
      showRenderLoopErrors: false, //如果设为true，将在一个HTML面板中显示错误信息
      automaticallyTrackDataSourceClocks: true, //自动追踪最近添加的数据源的时钟设置
      contextOptions: undefined, //传递给Scene对象的上下文参数（scene.options）
      sceneMode: Cesium.SceneMode.SCENE3D, //初始场景模式
      mapProjection: new Cesium.WebMercatorProjection(), //地图投影体系
      dataSources: new Cesium.DataSourceCollection(), //需要进行可视化的数据源的集合

       requestRenderMode : true,//画面不发生变化时,停止渲染  节省性能
    });

    viewer.scene.debugShowFramesPerSecond = true;//展示fps

    viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏底部版权信息


//在某个世界坐标一直显示 一个dom 不会被遮挡
    var htmlOverlay = document.getElementById('test');

    //preRender获取当前场景每帧渲染前的事件，监听该事件在每帧渲染之前触发
    viewer.scene.preRender.addEventListener(() => { //一直触发
          var position = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883);
          //世界坐标转化为屏幕坐标
          var canvasPosition = viewer.scene.cartesianToCanvasCoordinates(position);
          if (Cesium.defined(canvasPosition)) {
              htmlOverlay.style.top = canvasPosition.y + 'px';
        htmlOverlay.style.left = canvasPosition.x + 'px';
          }
      });
  },
  methods: {},
  components: {},
};
</script>

<style>
</style>