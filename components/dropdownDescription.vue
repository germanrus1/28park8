<template>
  <custom-button :text="text" class="zi-800" @click="toggle"></custom-button>
  <div class="content-dropdown zi-700" :class="active ? 'isActive':''">
    <div class="content-textarea">
<!--      <textarea v-model="textModel" @change="this.$emit('selectDescription', textModel)"></textarea>-->
      <div class="list scroll-content">
        <div class="item" v-for="item in options" @click="this.$emit('selectDescription', item.name)">
          {{item.name}}
        </div>
      </div>
      <div class="button-content">
        <custom-button text="Без текста" classes="blue" @click="this.$emit('clearDescription')"></custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "./customButton";

export default {
  name: "dropdownDescription",
  components: {
    CustomButton,
  },
  props: {
    text: {type: String},
    options: {type: Array},
    closeOnOutsideClick: {type: Boolean},
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
  justify-content: flex-end;
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
  .content-textarea {
    width: 20.15625vw;
    height: 16.042vw;
    border-radius: 0 0 1.5625vw 1.5625vw;
    background: #FFFFFF;
    margin-top: 1.8vw;
  }
  .list {
    width: 18.7vw;
    height: 16.042vw;
    background: #FFFFFF;
    border-radius: 0 0 1.5625vw 1.5625vw;
    font-family: 'GT Eesti Pro Text';
    font-style: normal;
    font-weight: 375;
    font-size: 1.042vw;
    line-height: 97%;
    color: #000000;
    padding-left: 1.302vw;
    overflow-y: auto;
    user-select: none;
    padding-bottom: 0.78125vw;
    .item {
      cursor: pointer;
      margin-top: 0.78125vw;
    }
  }
}
</style>