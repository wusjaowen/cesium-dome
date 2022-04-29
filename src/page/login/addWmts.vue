
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


    var clem = new Cesium.WebMapTileServiceImageryProvider({
      url: "https://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=9669a91e46fd2e29bbbc8cf5130caebc",
      layer: "tdt",//图层名称
      style: 'default',
      format: 'image/jpeg',
      subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
      tileMatrixSetID: "GoogleMapsCompatible",
      
    });



    const viewer = new Cesium.Viewer("cesiumContainer", {
        baseLayerPicker: false, //是否显示图层选择控件
        imageryProvider:clem,

    //   requestRenderMode: true,//画面不发生变化时,停止渲染  节省性能
    });

    viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
            url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=9669a91e46fd2e29bbbc8cf5130caebc",
            layer: "tdts",
            style: "default",
            format: "image/jpeg",
            tileMatrixSetID: "GoogleMapsCompatible",
            rectangle:Cesium.Rectangle.fromDegrees(0,0,117,32),//最小纬度,.最小经度,最大纬度,最大经度



            // show: false
        }));

    viewer.scene.debugShowFramesPerSecond = true;//展示fps

    viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏底部版权信息



  },
  methods: {},
  components: {},
};
</script>

<style>
</style>