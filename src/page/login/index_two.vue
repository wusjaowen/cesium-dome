
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

    const viewModel = {
      color: "Red",
      colors: ["White", "Red", "Green", "Blue", "Yellow", "Gray"],
      alpha: 1.0,
      colorBlendMode: "Highlight",
      colorBlendModes: ["Highlight", "Replace", "Mix"],
      colorBlendAmount: 0.5,
      colorBlendAmountEnabled: false,
      silhouetteColor: "Red",
      silhouetteColors: ["Red", "Green", "Blue", "Yellow", "Gray"],
      silhouetteAlpha: 1.0,
      silhouetteSize: 2.0,
    };

    viewer._cesiumWidget._creditContainer.style.display = "none";//隐藏底部版权信息

    function getColorBlendMode(colorBlendMode) {
      return Cesium.ColorBlendMode[colorBlendMode.toUpperCase()];
    }

    function getColor(colorName, alpha) {
      const color = Cesium.Color[colorName.toUpperCase()];
      return Cesium.Color.fromAlpha(color, parseFloat(alpha));
    }

    let entity;

    function createModel(url, height) {
      viewer.entities.removeAll();

      const position = Cesium.Cartesian3.fromDegrees(
        -123.0744619,
        44.0503706,
        height
      );
      const heading = Cesium.Math.toRadians(0);//0-360之间  0时 (飞机)模型向右  180时(飞机)模型向左
      const pitch = 0; //暂时不知道
      const roll = -1; //暂时不知道
      const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);//旋转用航向、倾斜和滚转表示的旋转。   相当于围绕xyz轴旋转
      const orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
      );//从以所提供原点为中心的航向  可设置相机位置 参数一为:经纬高 度  参数二为:模型旋转角度xyz轴

      // 默认情况下，模型是直立的并面向东
      entity = viewer.entities.add({
        name: url,
        position: position,
        orientation: orientation,
        model: {
          uri: url,
          minimumPixelSize: 512,
          maximumScale: 2000,//可以跟着地球缩放到多少 最大20000
          color: getColor(viewModel.color, viewModel.alpha),
          colorBlendMode: getColorBlendMode(viewModel.colorBlendMode),
          colorBlendAmount: parseFloat(viewModel.colorBlendAmount),
          silhouetteColor: getColor(
            viewModel.silhouetteColor,
            viewModel.silhouetteAlpha
          ),
          silhouetteSize: parseFloat(viewModel.silhouetteSize),
        },
      });
      viewer.trackedEntity = entity;
    }

    createModel('/apies/SampleData/models/CesiumAir/Cesium_Air.glb', 100.0)


  },
  methods: {


  },
  components: {},
}
</script>

<style>
</style>