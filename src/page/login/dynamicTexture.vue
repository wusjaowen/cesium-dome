
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

    //Cesium  流动线条纹理 拓展类
    function PolylineTrailLinkMaterialProperty(color, duration) {
      this._definitionChanged = new Cesium.Event();
      this._color = undefined;
      this._colorSubscription = undefined;
      this.color = color;
      this.duration = duration;
      this._time = (new Date()).getTime();
    }

    Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
      isConstant: {
        get: function () {
          return false;
        }
      },
      definitionChanged: {
        get: function () {
          return this._definitionChanged;
        }
      },
      color: Cesium.createPropertyDescriptor('color')
    });

    PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
      return 'PolylineTrailLink';
    }
    PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
      if (!Cesium.defined(result)) {
        result = {};
      }
      result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
      result.image = Cesium.Material.PolylineTrailLinkImage;
      result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
      console.log(result, '123123123123');
      return result;
    }
    PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
      return this === other || (other instanceof PolylineTrailLinkMaterialProperty && Property.equals(this._color, other._color))
    };

    Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty;
    Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink';
    Cesium.Material.PolylineTrailLinkImage = require('./static/colors1.png');//图片

    //着色器代码
    Cesium.Material.PolylineTrailLinkSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
{\n\
    czm_material material = czm_getDefaultMaterial(materialInput);\n\
    vec2 st = materialInput.st;\n\
    vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
    material.alpha = colorImage.a * color.a;\n\
    material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
    return material;\n\
}";
//添加自定义材质
    Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
      fabric: {
        type: Cesium.Material.PolylineTrailLinkType,
        uniforms: {
          color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
          image: Cesium.Material.PolylineTrailLinkImage,
          time: 0
        },
        source: Cesium.Material.PolylineTrailLinkSource
      },
      translucent: function (material) {
        return true;
      }
    })


    let greenTube = viewer.entities.add({
      name: '围墙',
      wall: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          118.286419, 31.864436, 20000.0,
          119.386419, 31.864436, 20000.0,
          119.386419, 32.864436, 20000.0,
          118.286419, 32.864436, 20000.0,
          118.286419, 31.864436, 20000.0,
        ]),
        //CallbackProperty 方法不断返回新的值
        material: new Cesium.PolylineTrailLinkMaterialProperty(Cesium.Color.BLUE, 3000),
      }
    });

    //画矩形
    var wyoming = viewer.entities.add({  //添加一个实体，仅需要传递一个简单JSON对象，返回值是一个Entity对象
      name: '这是一个矩形',
      properties: '3',
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([//一组地理坐标
          109.080842, 45.002073,
          104.058488, 44.996596,
          104.053011, 41.003906,
          107.919731, 41.003906,
          111.047063, 40.998429,
          111.047063, 44.476286,
          111.05254, 45.002073]),
        // material: Cesium.Color.BLUE.withAlpha(0.5), //材质
        material: new Cesium.PolylineTrailLinkMaterialProperty(Cesium.Color.BLUE, 3000),
        // TERRAIN 将仅对地形进行分类;CESIUM_3D_TILE 将仅对3D Tiles进行分类;BOTH    将同时对Terrain和3D Tiles进行分类。
        classificationType: Cesium.ClassificationType.TERRAIN, //对哪些目标生效
      }
    });

    viewer.flyTo(greenTube)

  },
  methods: {},
  components: {},
};
</script>

<style>
</style>