<template>
    <video src="./../assets/video.webm" autoplay muted loop></video>
</template>

<script>
export default {
    name: 'VideoBackground'
}
</script>

<style lang="css" scoped>
  video {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      min-width: 100%;
      min-height: 100%;
      overflow: hidden;
  }
</style>