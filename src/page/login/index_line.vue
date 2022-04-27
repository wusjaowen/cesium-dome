
<template>
  <div class="box">
    <div id="cesiumContainer" class="fullSize"></div>
    <div id="loadingOverlay"><h1>Loading...</h1></div>
    <div id="toolbar"></div>
  </div>
</template>

<script>
import url from './logo.png'
export default {
  name: "index",
  data() {
    return {};
  },
  mounted() {
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmOWRiNmU3My02NWQ1LTQ4MzEtOTE5OC1mM2E5NzZmMWQ5MmMiLCJpZCI6OTAyNjUsImlhdCI6MTY1MDM4MDQwNn0.RsT71-k5bufa1Wplfj1-tMRNZJCsumtSSUqGDgousvI";

    const viewer = new Cesium.Viewer("cesiumContainer");

    viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏底部版权信息

    //画点
    let pions = viewer.entities.add({  //添加一个实体，仅需要传递一个简单JSON对象，返回值是一个Entity对象
      name: '这是一个点呀',
      properties:'1',
      position: Cesium.Cartesian3.fromDegrees(-80, 38, 20),
        point: {
          color: Cesium.Color.RED,//点的颜色
          pixelSize: 10,//点的大小
          outlineColor: Cesium.Color.YELLOW,//边框颜色
          outlineWidth: 3,//边框宽度
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
          //CLAMP_TO_GROUND 可使点贴地
          //NONE 绝对高程
          //RELATIVE_TO_GROUND 设置地形相对高度 (fromDegrees第三个参数决定高度)
        },
        //description   //值为 html字符串
    });
    //画线
    let line = viewer.entities.add({  //添加一个实体，仅需要传递一个简单JSON对象，返回值是一个Entity对象
      name: '这是我画的线呀',
      properties:'2',
      polyline: {
          positions: parent.Cesium.Cartesian3.fromDegreesArray([-75, 35,-125, 35]),
          width:5,
          material: Cesium.Color.BLUE.withAlpha(0.5), //材质
          clampToGround: false,//是否贴着地形 false可能会被地形遮挡
      }
    });
   
    //画矩形
    var wyoming = viewer.entities.add({  //添加一个实体，仅需要传递一个简单JSON对象，返回值是一个Entity对象
      name: '这是一个矩形',
      properties:'3',
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([//一组地理坐标
          -109.080842, 45.002073,
          //   -105.91517,45.002073,
          -104.058488, 44.996596,
          //   -104.053011,43.002989,
          -104.053011, 41.003906,
          //   -105.728954,40.998429,
          -107.919731, 41.003906,
          //   -109.04798,40.998429,
          -111.047063, 40.998429,
          //   -111.047063,42.000709,
          -111.047063, 44.476286,
          -111.05254, 45.002073]),
        // material: Cesium.Color.BLUE.withAlpha(0.5), //材质
        material: url,//图片材质
        outline: true, //是否显示轮廓
        outlineColor: Cesium.Color.RED, //轮廓的颜色

        //  clampToGround: true, //贴地
        // TERRAIN 将仅对地形进行分类;CESIUM_3D_TILE 将仅对3D Tiles进行分类;BOTH    将同时对Terrain和3D Tiles进行分类。
        classificationType: Cesium.ClassificationType.TERRAIN, //对哪些目标生效
      }
    });


     //添加label标签
    let labels = viewer.entities.add({  //添加一个实体，仅需要传递一个简单JSON对象，返回值是一个Entity对象
      name: '这是标签',
      properties:'4',//相当于 id标识符
      position: Cesium.Cartesian3.fromDegrees(-90, 45, 35),
      label: {
        show: true,
        text: "我瞎写的",
        font: "12px Helvetica",
        // FILL 填充；OUTLINE 只显示边框；FILL_AND_OUTLINE 既有填充又有边框
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        scale: 1.0,
        showBackground: true,
        backgroundColor: Cesium.Color.BLUE,
        backgroundPadding: Cesium.Cartesian2(7, 5),
        pixelOffset: Cesium.Cartesian2.ZERO,//偏移量
        eyeOffset: Cesium.Cartesian3.ZERO,
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        heightReference: Cesium.HeightReference.NONE,//见37行的注释
        fillColor: Cesium.Color.SKYBLUE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        translucencyByDistance: new Cesium.NearFarScalar(
          1.0e3,
          1.0,
          1.5e6,
          0.5
        ),//标量值在眼睛空间中的近距离和远距离处的下限和上限  ------不懂
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(
          1.0e3,
          1.0,
          1.5e6,
          0.0
        ),//标量值在眼睛空间中的近距离和远距离处的下限和上限  ------不懂
        scaleByDistance: new Cesium.NearFarScalar(1.0e3, 2.0, 2.0e3, 1.0),
        // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
        //   1.0e3,
        //   2.0e3
        // ),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
       
        
    });

//添加图片
    let imagess = viewer.entities.add({
        name: '图片哟',
      position: Cesium.Cartesian3.fromDegrees(-100, 45, 50),
      billboard : { //图标
        image : 'https://img-blog.csdnimg.cn/img_convert/1343e2c67c1c0a77d913ff73d4ddc95a.png',
        width : 80,
        height : 80,
        scale: 0.5,
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        disableDepthTestDistance : Number.POSITIVE_INFINITY, //去掉地形遮挡  
    },
    })

   
    

    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((event) => {
        let pick = viewer.scene.pick(event.position);
        if (Cesium.defined(pick)) {
            console.log(pick,'123');
            console.log(pick.id._properties);
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


  },
  methods: {},
  components: {},
};
</script>

<style>
</style>