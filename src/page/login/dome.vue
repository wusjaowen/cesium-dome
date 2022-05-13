
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