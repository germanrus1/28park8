<template>
  <div class="content">
    <client-only placeholder="loading">
      <index class="page"
             v-on:updatePage="updatePage"
             v-on:updateSelected="updateSelected"
             :class="(!currentPage || currentPage == 'index') ? 'isActive' : ''"
      ></index>
      <generator class="page"
                 v-on:updatePage="updatePage"
                 :class="(currentPage == 'generator') ? 'isActive' : ''"
                 ref="generator"
                 :fromwhomSelected="this.fromwhomSelected"
      ></generator>
      <finish class="page"
              v-on:updatePage="updatePage"
              :class="(currentPage == 'finish') ? 'isActive' : ''"
      ></finish>
    </client-only>
  </div>
</template>
<script>
import Index from "../pages/index";
import Generator from "../pages/generator";
import Finish from "../pages/finish";

export default {
  components: {
    Index,
    Generator,
    Finish,
  },
  data() {
    return {
      currentPage: 'index',
      fromwhomSelected: 'fromman',
    }
  },
  methods: {
    updatePage(page) {
      this.currentPage = page ? page : 'index';
      if (this.currentPage == 'generator') {
        this.$refs.generator.clearLayers();
      }
    },
    updateSelected(fromwhom) {
      this.fromwhomSelected = fromwhom ?? 'fromman';
    }
  }
}
</script>

<style lang="scss">
  .page {
    display: none;
    &.isActive {
      display: block;
    }
  }
  @font-face {
    font-family: 'GT Eesti Pro Text';
    src: local('GT Eesti Pro Text'),
    url('/fonts/GT-Eesti-Pro-Text-Book-2.ttf') format('truetype'),
    url('/fonts/GT-Eesti-Pro-Text-Light-2.ttf') format('truetype'),
    url('/fonts/GT-Eesti-Pro-Text-Regular-2.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  .button {
    font-family: 'GT Eesti Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 1.354vw;
    line-height: 1.5625vw;
    text-align: center;
    color: #FFFFFF;
    cursor: pointer;
    &.generate {
      text-transform: uppercase;
      width: 15.052vw;
      height: 5.833vw;
      background: linear-gradient(99.15deg, #6DC0FF 3.58%, #FF4B78 97.76%);
      box-shadow: 0 0.208vw 0.521vw rgba(117, 20, 48, 0.2);
      border-radius: 1.042vw;
      border: 0;
    }
  }
  body {
    margin: 0;
  }
  .content {
    background: radial-gradient(84.49% 187.9% at 3.52% 95.88%, #FFBACB 0%, #9DD6F4 64.24%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    box-shadow: 0 0.52vw 0.52vw rgba(0, 0, 0, 0.25);
    max-width: 100vw;
    height: 100%;

    @media screen and (min-width: 768px) {

    }
  }
  .zi-100 {
    z-index: 100;
    position: relative;
  }
  .zi-200 {
    z-index: 200;
    position: relative;
  }
  .zi-300 {
    z-index: 300;
    position: relative;
  }
  .zi-500 {
    z-index: 500;
    position: relative;
  }
  .zi-600 {
    z-index: 600;
    position: relative;
  }
  .zi-700 {
    z-index: 700;
    position: relative;
  }
  .zi-800 {
    z-index: 800;
    position: relative;
  }
  .scroll-content {
    scrollbar-width: thin;
    &.horizontal {
      &::-webkit-scrollbar-thumb {
        //border: 0.15625vw solid orange;
      }
    }
    &::-webkit-scrollbar {
      width: 0.152vw;
      height: 0.5vw;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      box-shadow: none;
      width: 0.78125vw;
      height: 3.646vw;
      background: #1F5BD7;
      border-radius: 2.03125vw;
    }
  }
</style>