<template>
  <div>
    <div class="range">
      <input type="range" :min="0" :max="600" step="4" v-model="xModel" @change="changeCoordinates">
      <span>{{xModel}}</span>
    </div>
    <div class="range">
      <input type="range" :min="0" :max="600" step="4" v-model="yModel" @change="changeCoordinates">
      <span>{{yModel}}</span>
    </div>
    <div class="range">
      <input type="range" :min="10" :max="50" step="2" v-model="fontSizeModel" @change="changeCoordinates">
      <span>{{fontSizeModel}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "devRanger",
  // props: {
  //   min,
  //   max,
  // },
  data() {
    return {
      xModel: 300,
      yModel: 300,
      fontSizeModel: 26,
    }
  },
  methods: {
    changeCoordinates() {
      console.log(this.fontSizeModel);
      this.$emit('textPosition', 'fromwhom', this.xModel, this.yModel, this.fontSizeModel);
    }
  },
  mounted() {
    this.changeCoordinates();
  }
}
</script>

<style lang="scss" scoped>
  .range {
    input {
      width: 30vw;
      height: 5vw;
    }
    span {
      font-size: 3vw;
    }
  }
</style>