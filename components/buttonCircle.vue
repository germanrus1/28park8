<template>
  <div class="button circle" :class="classes">
    <div class="icon" :class="icon"></div>
    <div class="text" :class="icon"></div>
  </div>
</template>

<script>
export default {
  name: "buttonCircle",
  props: {
    icon: {type: String},
    classes: {type: String},
  }
}
</script>

<style lang="scss" scoped>
  .button {
    width: 5vw;
    height: 5vw;
    background: #FFFFFF;
    box-shadow: 0 0.573vw 0.99vw rgba(31, 91, 215, 0.8);
    border-radius: 2.5vw;
    border: 0;
  .icon {
    position: absolute;
    height: 7.2vw;
    width: 7.2vw;
    &.next {
      background: no-repeat url(/_nuxt/button_arrow.svg) 74% 74%;
      background-size: 53%;
      transform: rotate(180deg);
    }
    &.prev {
      background: no-repeat url(/_nuxt/button_arrow.svg) 14% 28%;
      background-size: 53%;
    }
    &.rand {
      background: no-repeat url(/_nuxt/button_random.svg) 28% 23%;
      background-size: 33%;
    }
  }
  .text {
    width: 6.2vw;
    height: 7.2vw;
    position: absolute;
    &.next {
      background: no-repeat url("/button_text_next.svg");
      margin-left: 2.8vw;
      background-size: 71.6%;
      margin-top: -0.5vw;
    }
    &.prev {
      background: no-repeat url("/button_text_prev.svg");
      margin-left: -1.1vw;
      background-size: 46.6%;
    }
  }
 }
</style>