
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

    const viewer = new Cesium.Viewer("cesiumContainer");

    viewer.scene.debugShowFramesPerSecond = true;//展示fps

    // viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏底部版权信息

    function TetrahedronGeometry() {
      const positions = new Float64Array(4 * 3);

      // 四面体有4个三角形，共计12个点，但是由于重合的关系，可以只记录4个点
      // 点0 坐标
      positions[0] = 0.0;
      positions[1] = 0.0;
      positions[2] = 1.0;

      // 点1 坐标
      positions[3] = 0.0;
      positions[4] = 0.94;
      positions[5] = -0.33;

      // 点2 坐标
      positions[6] = -0.81;
      positions[7] = -0.5;
      positions[8] = -0.33;

      // 点3 坐标
      positions[9] = 0.81;
      positions[10] = -0.5;
      positions[11] = -0.33;

      // 创建顶点属性中的坐标
      const attributes = new Cesium.GeometryAttributes({
        position: new Cesium.GeometryAttribute({
          componentDatatype: Cesium.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: positions
        })
      });

      const indices = new Uint16Array(4 * 3);

      // 后面的三角形用到 0、1、2 号点坐标
      indices[0] = 0;
      indices[1] = 1;
      indices[2] = 2;

      // 左边的三角形用到 0、2、3 号点坐标
      indices[3] = 0;
      indices[4] = 2;
      indices[5] = 3;

      // 右边的三角形用到 0、3、1 号点坐标
      indices[6] = 0;
      indices[7] = 3;
      indices[8] = 1;

      // 下面的三角形用到 2、1、3 号点坐标
      indices[9] = 2;
      indices[10] = 1;
      indices[11] = 3;

      // 指定此四面体的各种属性
      this.attributes = attributes;
      this.indices = indices;
      this.primitiveType = Cesium.PrimitiveType.TRIANGLES;
      this.boundingSphere = undefined;
    }


    const ellipsoid = viewer.scene.globe.ellipsoid;
    console.log(ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-100.0, 40.0)), '123213123321123');

    //对经纬度 (-100, 40) 这个点做垂直地表向上平移200km的计算，并将几何体放大50w倍（即变成500km那么大
    const modelMatrix = Cesium.Matrix4.multiplyByUniformScale(
      Cesium.Matrix4.multiplyByTranslation(
        Cesium.Transforms.eastNorthUpToFixedFrame(ellipsoid.cartographicToCartesian(
          Cesium.Cartographic.fromDegrees(-100.0, 40.0))), // e-n-u计算，返回局部到世界坐标的转换矩阵
        new Cesium.Cartesian3(0.0, 0.0, 200000.0)), // 平移计算，矩阵·平移向量

      500000.0); // 缩放计算，矩阵·50w


    const instance = new Cesium.GeometryInstance({
      geometry: new TetrahedronGeometry(), // 如果直接写在代码而不是构建出来的，可以直接 new TetrahedronGeometry()
      modelMatrix: modelMatrix,
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.WHITE) // 快捷计算顶点颜色
      }
    });

    /* 使用 Primitive API 绘制几何 */
    viewer.scene.primitives.add(new Cesium.Primitive({
      geometryInstances: instance,
      appearance: new Cesium.PerInstanceColorAppearance({
        flat: true,
        translucent: false
      })
    }));



  },
  methods: {},
  components: {},
};
</script>

<style>
</style>