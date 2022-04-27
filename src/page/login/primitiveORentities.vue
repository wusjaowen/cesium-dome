
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


      requestRenderMode: true,//画面不发生变化时,停止渲染  节省性能
    });

    viewer.scene.debugShowFramesPerSecond = true;//展示fps

    viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏底部版权信息

    function computeCircle(radius) {
      var positions = [];
      for (var i = 0; i < 360; i++) {
        var radians = Cesium.Math.toRadians(i);//角度转为弧度
        positions.push(
          new Cesium.Cartesian2(
            radius * Math.cos(radians),
            radius * Math.sin(radians)
          )
        );
      }
      return positions;
    }
    //地理坐标位置
    let line_entities = [
      -109.080842, 45.002073,
      -105.91517, 45.002073,
      -104.058488, 44.996596,
      -104.053011, 43.002989,
      -104.053011, 41.003906,
      -105.728954, 40.998429,
      -107.919731, 41.003906,
      -109.04798, 40.998429,
      -111.047063, 40.998429,
      -111.047063, 42.000709,
      -111.047063, 44.476286,
      -111.05254, 45.002073,
    ]

    // entities 绘制管线
    // var redTube = viewer.entities.add({
    //   name: "Red tube with rounded corners",
    //   polylineVolume: {
    //     show: true,

    //     // 定义线带的 Cartesian3 位置的数组
    //     positions: Cesium.Cartesian3.fromDegreesArray(line_entities),

    //     // 指定 Cartesian2 位置的数组，这些位置定义了要拉伸的形状
    //     // shape: computeCircle(4000.0),//圆柱形
    //     shape: [
    //       new Cesium.Cartesian2(-50000, -50000),
    //       new Cesium.Cartesian2(50000, -50000),
    //       new Cesium.Cartesian2(50000, 50000),
    //       new Cesium.Cartesian2(-50000, 50000),
    //     ],

    //     // 拐角的样式  type:CornerType
    //     // ROUNDED  拐角有光滑的边缘;MITERED 拐角点是相邻边的交点;BEVELED 拐角被修剪。
    //     cornerType: Cesium.CornerType.ROUNDED,
    //     // 如果arcType不是ArcType.NONE，则指定每个纬度和经度之间的角距离
    //     fill: true,
    //     material: Cesium.Color.RED,
    //     outline: false,
    //     outlineColor: Cesium.Color.BLACK,
    //     outlineWidth: 1.0,
    //     shadows: Cesium.ShadowMode.DISABLED, // 体积是投射还是接收光源的阴影

    //   },
    // });


    function computeCircle(radius) {
      var positions = [];
      for (var i = 0; i < 360; i++) {
        var radians = Cesium.Math.toRadians(i);
        positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
      }
      return positions;
    }

    //使用Primitive
    //地理坐标位置
    let line = [
      -109.080842, 45.002073, 40000,
      -105.91517, 45.002073, 40000,
      -104.058488, 44.996596, 40000,
      -104.053011, 43.002989, 40000,
      -104.053011, 41.003906, 40000,
      -105.728954, 40.998429, 40000,
      -107.919731, 41.003906, 40000,
      -109.04798, 40.998429, 40000,
      -111.047063, 40.998429, 40000,
      -111.047063, 42.000709, 40000,
      -111.047063, 44.476286, 40000,
      -111.05254, 45.002073, 40000
    ]
    function starPositions(arms, rOuter, rInner) {
      var angle = Math.PI / arms;
      var pos = [];
      for (var i = 0; i < 2 * arms; i++) {
        var r = (i % 2) === 0 ? rOuter : rInner;
        var p = new Cesium.Cartesian2(Math.cos(i * angle) * r, Math.sin(i * angle) * r);
        pos.push(p);
      }
      return pos;
    }

    //构造几何体
    let polylineVolumeOutlineGeometry = new Cesium.PolylineVolumeGeometry({
      polylinePositions: (Cesium.Cartesian3.fromDegreesArrayHeights(line)),
      // shapePositions: starPositions(7,40000.0,50000.0),
      shapePositions: [
        new Cesium.Cartesian2(-50000, -50000),
        new Cesium.Cartesian2(50000, -50000),
        new Cesium.Cartesian2(50000, 50000),
        new Cesium.Cartesian2(-50000, 50000),
      ],

      id: "PolylineVolumeOutlineGeometry"
    })



    viewer.scene.primitives.add(new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: polylineVolumeOutlineGeometry,
      }),
      appearance: new Cesium.PolylineMaterialAppearance({
        // 材质  铁路材质
        material: Cesium.Material.fromType(Cesium.Material.PolylineDashType, {
          color: Cesium.Color.BLACK,
          gapColor: Cesium.Color.WHITE,//缺口颜色
          dashLength: 30
        })

      })
    }));

    // 构造几何体类型
    // BoxGeometry	立方体
    // BoxOutlineGeometry	仅有轮廓的立方体
    // CircleGeometry	圆形或者拉伸的圆形
    // CircleOutlineGeometry	只有轮廓的圆形
    // CorridorGeometry	走廊：沿着地表的多段线，且具有一定的宽度，可以拉伸到一定的高度
    // CorridorOutlineGeometry	只有轮廓的走廊
    // CylinderGeometry	圆柱、圆锥或者截断的圆锥
    // CylinderOutlineGeometry	只有轮廓的圆柱、圆锥或者截断的圆锥
    // EllipseGeometry	椭圆或者拉伸的椭圆
    // EllipseOutlineGeometry	只有轮廓的椭圆或者拉伸的椭圆
    // EllipsoidGeometry	椭球体
    // EllipsoidOutlineGeometry	只有轮廓的椭球体
    // RectangleGeometry	矩形或者拉伸的矩形
    // RectangleOutlineGeometry	只有轮廓的矩形或者拉伸的矩形
    // PolygonGeometry	多边形，可以具有空洞或者拉伸一定的高度
    // PolygonOutlineGeometry	只有轮廓的多边形
    // PolylineGeometry	多段线，可以具有一定的宽度
    // SimplePolylineGeometry	简单的多段线
    // PolylineVolumeGeometry	多段线柱体
    // PolylineVolumeOutlineGeometry	只有轮廓的多段线柱体
    // SphereGeometry	球体
    // SphereOutlineGeometry	只有轮廓的球体
    // WallGeometry	墙
    // WallOutlineGeometry	只有轮廓的墙

  },
  methods: {},
  components: {},
};
</script>

<style>
</style>