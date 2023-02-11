<template>
  <custom-button :text="text" class="zi-600" @click="toggle"></custom-button>
  <div class="content-dropdown zi-500" :class="active ? 'isActive':''">
    <div class="button-content">
      <custom-button text="Без наклейки" classes="blue" @click="this.$emit('clearSticker')"></custom-button>
    </div>
    <div class="stickers scroll-content horizontal">
      <img v-for="i in 13"
           :id="'sticker-' + (i - 1)"
           :src="'/stickers/sticker-' + (i - 1) +'.png'"
           :alt="'/stickers/sticker-' + (i - 1) +'.png'"
           @click="this.$emit('drawSticker', 'sticker-' + (i - 1))"
      >
    </div>
  </div>
</template>

<script>
import CustomButton from "./customButton";

export default {
  name: "dropdownTextarea",
  components: {
    CustomButton,
  },
  props: {
    text: {type: String},
  },
  data() {
    return {
      active: false,
      textModel: '',
    }
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
  }
}
</script>

<style lang="scss" scoped>
.stickers {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-width: 18.08vw;
  height: 12.865vw;
  border-radius: 1.5625vw;
  overflow-x: auto;
  padding: 1vw 1vw;
  margin: 0 0.521vw 0 0.625vw;
  img {
    height: 4.7vw;
    width: 4.7vw;
    padding: 0.5vw;
    cursor: pointer;
  }
}
.button-content {
  display: flex;
  justify-content: center;
  margin-top: 0.78125vw
}
.content-dropdown {
  display: none;
  flex-direction: column;
  width: 22.552vw;
  height: 22.917vw;
  background: linear-gradient(99.15deg, #9DD6F4 3.58%, #FFBACB 97.76%);
  border-radius: 0 0 1.5625vw 1.5625vw;
  margin-top: -3.5vw;
  position: absolute;
  justify-content: center;
  &.isActive {
    display: flex;
  }
}
</style>