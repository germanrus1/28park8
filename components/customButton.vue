<template>
  <button class="button text" :class="classes">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "customButton",
  props: {
    text: {type: String},
    classes: {type: String}
  }
}
</script>

<style lang="scss" scoped>
  .button {
    width: 22.552vw;
    height: 3.49vw;
    border: 0;
    font-family: 'GT Eesti Pro Text';
    margin: 0 0 1.927vw 0;
  &.text {
     background: linear-gradient(99.15deg, #9DD6F4 3.58%, #FFBACB 97.76%);
     box-shadow: 0 0.573vw 0.99vw rgba(31, 91, 215, 0.8);
     border-radius: 0.625vw;
     font-style: normal;
     font-weight: 375;
     font-size: 2.5vw;
     line-height: 97%;
   }
  &.create {
    height: 4.53125vw;
    background: linear-gradient(99.15deg, #6DC0FF 3.58%, #FF4B78 97.76%);
    border: 0.052vw solid #FFFFFF;
    box-shadow: 0 0.573vw 0.99vw rgba(31, 91, 215, 0.8);
  }
 }
</style>