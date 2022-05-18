
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

    //添加球
var redSphere = viewer.entities.add({
    name : '红色的球',
    position: Cesium.Cartesian3.fromDegrees(107.0, 40.0, 5.0),
    ellipsoid : {
        radii : new Cesium.Cartesian3(10.0, 10.0, 10.0),
        material : Cesium.Color.RED.withAlpha(0.5),
        outline : true,
        outlineColor : Cesium.Color.BLACK
    }
});
viewer.zoomTo(viewer.entities);
var scene = viewer.scene;

let ptTarget = Cesium.Cartesian3.fromDegrees(107.0, 40.0, 0.0);
function getMatrix(pt){
    //目标点
    let ptA = ptTarget;
    //物体点
    let ptB = pt;
    console.log(pt);
    let ptB1 = Cesium.Cartesian3.normalize(ptB,new Cesium.Cartesian3());
    let vecBA = Cesium.Cartesian3.subtract(ptA,ptB,new Cesium.Cartesian3());
    let ay =Cesium.Cartesian3.normalize(vecBA,new Cesium.Cartesian3());
    let ax = Cesium.Cartesian3.cross(ptB1,ay,new Cesium.Cartesian3());
    ax = Cesium.Cartesian3.normalize(ax,new Cesium.Cartesian3())
    let az = Cesium.Cartesian3.cross(ax,ay,new Cesium.Cartesian3());
    az = Cesium.Cartesian3.normalize(az,new Cesium.Cartesian3());
    //Cesium.Cartesian3.cross(left, right, result) ，计算两个坐标的叉(外)积
    //Cesium.Cartesian3.normalize 标准化
    //Cesium.Cartesian3.subtract(left, right, result)，两个矩阵相减

    // cesium矩阵是行主序
    return new Cesium.Matrix3(
        ax.x, ax.y, ax.z,
        ay.x, ay.y, ay.z,
        az.x, az.y, az.z
        );
}
let handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
handler.setInputAction(function(movement) {
    var earthPosition = viewer.camera.pickEllipsoid(movement.position, scene.globe.ellipsoid);//选择世界上椭球体或地图表面上的点
    

    if (!Cesium.defined(earthPosition)) 
        return ;

    var hpRoll = new Cesium.HeadingPitchRoll();
    var fixedFrameTransform = Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west');
    // west   南
    // south  东
    // east   北
    // north  西

    //计算世界矩阵
    var m1 = Cesium.Transforms.headingPitchRollToFixedFrame(earthPosition, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrameTransform);

    var rotateMatrix = getMatrix(earthPosition);

    Cesium.Matrix4.multiplyByMatrix3(m1, rotateMatrix, m1);

    viewer.scene.primitives.add(Cesium.Model.fromGltf({
        url: '/apies/SampleData/models/CesiumAir/Cesium_Air.glb',
        modelMatrix:m1,
        scale: 1
    }))
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);





  },
  methods: {},
  components: {},
};
</script>

<style>
</style>