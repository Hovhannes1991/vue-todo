<template>
  <div class="container">
      <div class="water"></div>
      <p>Loading...</p>     
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="css" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.container p {
  color: #fff;
}

.water {
  display: flex;
  width: 100px;
  height: 100px;
  background-color: skyblue;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  box-shadow: inset 0 0 30px 0 rgba(0, 0, 0, 0.5),
    0 4px 10px 0 rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
.water:before,
.water:after {
  content: "";
  position: absolute;
  width: 100px;
  height: 100px;
  top: -50px;
  background-color: #fff;
}
.water:before {
  border-radius: 45%;
  background: rgba(255, 255, 255, 0.7);
  animation: wave 5s linear infinite;
}
.water:after {
  border-radius: 35%;
  /* background:rgba(28, 131, 54, 0.3); */
  animation: wave 5s linear infinite;
}
@keyframes wave {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
