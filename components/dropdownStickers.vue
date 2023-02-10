<template>
  <custom-button :text="text" class="zi-600" @click="toggle"></custom-button>
  <div class="content-dropdown zi-500" :class="active ? 'isActive':''">
    <div class="content">
      <div class="button-content">
        <custom-button text="Без текста" classes="blue" @click="this.$emit('clearDescription')"></custom-button>
      </div>
      <div class="stickers">
        <img v-for="i in 13" :id="'bg-' + (i - 1)" :src="'/stickers/sticker-' + (i - 1) +'.png'" :alt="'/stickers/sticker-' + (i - 1) +'.png'">
      </div>
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
.button-content {
  display: flex;
  justify-content: center;
  margin-top: 0.78125vw
}
.content-dropdown {
  display: none;
  width: 22.552vw;
  height: 22.917vw;
  background: linear-gradient(99.15deg, #9DD6F4 3.58%, #FFBACB 97.76%);
  border-radius: 0 0 1.5625vw 1.5625vw;
  margin-top: -2.5vw;
  position: absolute;
  justify-content: center;
  &.isActive {
    display: flex;
  }
  .content {
    width: 20.15625vw;
    height: 16.042vw;
    border-radius: 0 0 1.5625vw 1.5625vw;
    background: none;
    margin-top: 1.8vw;
  }
  textarea {
    width: 18.7vw;
    height: 16.042vw;
    background: #FFFFFF;
    border-radius: 0 0 1.5625vw 1.5625vw;
    border: 1px;
    resize: none;
    font-family: 'GT Eesti Pro Text';
    font-style: normal;
    font-weight: 375;
    font-size: 1.042vw;
    line-height: 97%;
    padding-top: 0.78125vw;
    padding-left: 1.302vw
  }
}
</style>