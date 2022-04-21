
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

    const scene = viewer.scene;
    let clippingPlanes;
    let tileset;
    let targetY = 0.0;
    let planeEntities = [];
    let selectedPlane;


    function loadTileset(url) {
      clippingPlanes = new Cesium.ClippingPlaneCollection({
        planes: [
          new Cesium.ClippingPlane(
            new Cesium.Cartesian3(0.0, 0.0, -1.0),
            0.0
          ),
        ],
        edgeWidth: 10.0,//剪裁对象的边的高光的宽度（以像素为单位）。
      });

      tileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url: url,
          clippingPlanes: clippingPlanes,
          debugShowBoundingVolume:false,// 会渲染模型的边界
        })
      );

      return tileset.readyPromise
        .then(function () {
          const boundingSphere = tileset.boundingSphere;//获取模型的空间坐标系的中心点(xyz)  与 半径
          
          const radius = boundingSphere.radius;

          viewer.zoomTo(
            tileset,
            new Cesium.HeadingPitchRange(0.5, -0.5, radius * 4.0)// 参数一 0-6约等于一圈  参数二 俯视角度 负数往上  参数三 到中心点的距离(米)
          );

        

          if (
            !Cesium.Matrix4.equals(
              tileset.root.transform,
              Cesium.Matrix4.IDENTITY
            )
          ) {
            // The clipping plane is initially positioned at the tileset's root transform.
            // Apply an additional matrix to center the clipping plane on the bounding sphere center.
            const transformCenter = Cesium.Matrix4.getTranslation(
              tileset.root.transform,
              new Cesium.Cartesian3()
            );
            const transformCartographic = Cesium.Cartographic.fromCartesian(
              transformCenter
            );
            const boundingSphereCartographic = Cesium.Cartographic.fromCartesian(
              tileset.boundingSphere.center
            );
            const height =
              boundingSphereCartographic.height -
              transformCartographic.height;
            clippingPlanes.modelMatrix = Cesium.Matrix4.fromTranslation(
              new Cesium.Cartesian3(0.0, 0.0, height)
            );
          }
            console.log(clippingPlanes,'值');
          for (let i = 0; i < clippingPlanes.length; ++i) {
            const plane = clippingPlanes.get(i);
            console.log(plane,'789789789789','第'+i+'个');
            const planeEntity = viewer.entities.add({
              position: boundingSphere.center,
              plane: {
                  //切面的矩形大小
                dimensions: new Cesium.Cartesian2(
                  radius * 2.5,
                  radius * 2.5
                ),
                material: Cesium.Color.RED.withAlpha(0.1),//切面的颜色
                plane: new Cesium.CallbackProperty(
                  createPlaneUpdateFunction(plane),
                  false
                ),
                outline: true,
                outlineColor: Cesium.Color.RED,//边框颜色
              },
            });

            planeEntities.push(planeEntity);
          }
          return tileset;
        })

    }


    const downHandler = new Cesium.ScreenSpaceEventHandler(
      viewer.scene.canvas
    );
    downHandler.setInputAction(function (movement) {
      const pickedObject = scene.pick(movement.position);
      console.log(pickedObject,'123123');
      if (
        Cesium.defined(pickedObject) &&
        Cesium.defined(pickedObject.id) &&
        Cesium.defined(pickedObject.id.plane)
      ) {
        selectedPlane = pickedObject.id.plane;
        selectedPlane.material = Cesium.Color.BLUE.withAlpha(0.05);//移动时的截面颜色
        selectedPlane.outlineColor = Cesium.Color.BLUE;//移动时的截面颜色
        scene.screenSpaceCameraController.enableInputs = false;//禁止鼠标左键拖动
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    // Release plane on mouse up
    const upHandler = new Cesium.ScreenSpaceEventHandler(
      viewer.scene.canvas
    );
    upHandler.setInputAction(function () {
      if (Cesium.defined(selectedPlane)) {
        selectedPlane.material = Cesium.Color.WHITE.withAlpha(0.1);//停止时的截面颜色
        selectedPlane.outlineColor = Cesium.Color.WHITE;//停止时的截面颜色
        selectedPlane = undefined;
      }

      scene.screenSpaceCameraController.enableInputs = true; //放开鼠标左键拖动
    }, Cesium.ScreenSpaceEventType.LEFT_UP);

    // Update plane on mouse move
    const moveHandler = new Cesium.ScreenSpaceEventHandler(
      viewer.scene.canvas
    );
    moveHandler.setInputAction(function (movement) {
        console.log(movement,'我移动了',Cesium.defined(selectedPlane));
      if (Cesium.defined(selectedPlane)) {
        const deltaY = movement.startPosition.y - movement.endPosition.y;
        targetY += deltaY;
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    function createPlaneUpdateFunction(plane) {
      return function () {
        plane.distance = targetY;
        // console.log(plane,'这是啥玩意');
        return plane;
      };
    }




    loadTileset('/apies/SampleData/Cesium3DTiles/Instanced/InstancedOrientation/tileset.json')




  },
  methods: {


  },
  components: {},
}
</script>

<style>
</style>