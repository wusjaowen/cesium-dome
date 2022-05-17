
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

    const scene = viewer.scene;
    scene.debugShowFramesPerSecond = true; //fps

    //建立转换矩阵
    const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
      Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)
    );
    const emitterInitialLocation = new Cesium.Cartesian3(0.0, 0.0, 100.0);

    const minimumExplosionSize = 30.0;
    const maximumExplosionSize = 100.0;
    const particlePixelSize = new Cesium.Cartesian2(7.0, 7.0);
    const lifetime = 10.0;

    const emitterModelMatrixScratch = new Cesium.Matrix4();

    function createFirework(offset, color, bursts) {
      const position = Cesium.Cartesian3.add(
        emitterInitialLocation,
        offset,
        new Cesium.Cartesian3()
      );
      const emitterModelMatrix = Cesium.Matrix4.fromTranslation(
        position,
        emitterModelMatrixScratch
      );
      const particleToWorld = Cesium.Matrix4.multiply(
        modelMatrix,
        emitterModelMatrix,
        new Cesium.Matrix4()
      );
      const worldToParticle = Cesium.Matrix4.inverseTransformation(
        particleToWorld,
        particleToWorld
      );

      const size = Cesium.Math.randomBetween(
        minimumExplosionSize,
        maximumExplosionSize
      );

      const force = function (particle) {
        //将局部坐标转换为椭球笛卡尔坐标
        const position = Cesium.Matrix4.multiplyByPoint(
          worldToParticle,
          particle.position,
          new Cesium.Cartesian3()
        );
        if (Cesium.Cartesian3.magnitudeSquared(position) >= size * size) {
          Cesium.Cartesian3.clone(
            Cesium.Cartesian3.ZERO,
            particle.velocity
          );
        }
      };

      const normalSize =
        (size - minimumExplosionSize) /
        (maximumExplosionSize - minimumExplosionSize);
      const minLife = 0.3;
      const maxLife = 1.0;
      const life = normalSize * (maxLife - minLife) + minLife;


      scene.primitives.add(
        new Cesium.ParticleSystem({
          image: require('./logo.png'),
          startColor: color,
          endColor: color.withAlpha(0.0),
          particleLife: life,//粒子的生命周期
          speed: 100.0,
          imageSize: particlePixelSize,//粒子图片的尺寸大小
          emissionRate: 0,//单位粒子的发射数量
          emitter: new Cesium.SphereEmitter(0.1),//SphereEmitter类,球体发射器类在球体内随机采样位置上初始化粒子，并引导它们从球体中心向外。其使用一个浮点型参数来指定球体的半径
          bursts: bursts,//特定时间粒子产生的数量，可用做粒子爆炸效果
          lifetime: lifetime,//粒子系统的生命周期
          updateCallback: force,
          modelMatrix: modelMatrix,//粒子系统的偏移矩阵
          emitterModelMatrix: emitterModelMatrix,//粒子系统相对自身位置的偏移矩阵
        })
      );
    }

    const xMin = -100.0;
    const xMax = 100.0;
    const yMin = -80.0;
    const yMax = 100.0;
    const zMin = -50.0;
    const zMax = 50.0;


    for (let i = 0; i < 20; ++i) {
      const x = Cesium.Math.randomBetween(xMin, xMax);
      const y = Cesium.Math.randomBetween(yMin, yMax);
      const z = Cesium.Math.randomBetween(zMin, zMax);
      const offset = new Cesium.Cartesian3(x, y, z);
      const color =new Cesium.Color(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255), 0.5);

      

      const bursts = [];
      for (let j = 0; j < 3; ++j) {
        bursts.push(
          new Cesium.ParticleBurst({
            time: Cesium.Math.nextRandomNumber() * lifetime,
            minimum: 400,
            maximum: 400,
          })
        );
      }
      //添加粒子
      createFirework(offset, color, bursts);
    }


    

      viewer.camera.flyTo({
        //目标位置
        destination: Cesium.Cartesian3.fromDegrees(
          -75.59777, 40.03883,100
        ),
        //移动时间
        duration: 1,
        //摄像头角度
        orientation: {
          heading: 0,
          pitch: 0,
          roll: 0
        },
        complete: function () {
        }
      });




    // （1.  show 是否显示粒子系统
    // （2.  updateCallback 每帧更新粒子的回调
    // （3.  emitter 粒子发射器，就是发射粒子的方式。cesium粒子系统提供的发射器有BoxEmitter盒子发射器，发射的粒子都在一个盒子内。CircleEmitter圆形发射器，发射的粒子都在一个圆形范围内。ConeEmitter锥形发射器，发射的粒子都在一个圆锥内。SphereEmitter球体发射器，发射的粒子都在一个包围球内。
    // （4.  modelMatrix 粒子系统的偏移矩阵
    // （5.  emitterModelMatrix 粒子系统相对自身位置的偏移矩阵
    // （6.  emissionRate 单位粒子的发射数量
    // （7.  bursts 特定时间粒子产生的数量，可用做粒子爆炸效果
    // （8.  loop 粒子系统是否一直循环存在
    // （9.  scale 粒子的缩放比例
    // （10. startScale粒子产生时候的缩放比例
    // （11. endScale粒子消亡时候的缩放比例
    // （12. color粒子的颜色
    // （13. startColor 粒子开始产生时候的颜色
    // （14. endColor 粒子消亡时候的颜色
    // （15. image 用于产生粒子的图片
    // （16. imageSize 粒子图片的尺寸
    // （17. minimumImageSize 随机粒子产生时候最小的尺寸
    // （18. maximumImageSize 随机粒子产生时候最大的尺寸
    // （19. sizeInMeters 粒子尺寸的单位是像素还是米
    // （20. speed 粒子的速度
    // （21. minimumSpeed 随机粒子的最小速度
    // （22. maximumSpeed 随机粒子的最大速度
    // （23. lifetime 粒子系统的生命周期
    // （24. particleLife 粒子的生命周期
    // （25. minimumParticleLife 随机粒子的最小生命周期
    // （26. maximumParticleLife 随机粒子的最大生命周期
    // （27. mass粒子的质量
    // （28. minimumMass 随机粒子的最小质量
    // （29. maximumMass 随机粒子的最大质量




  },
  methods: {},
  components: {},
};
</script>

<style>
</style>