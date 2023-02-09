<template>
  <div class="content">
    <client-only placeholder="loading">
      <NuxtPage />
    </client-only>
  </div>
</template>

<script lang="ts">
</script>

<style lang="scss">
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
    width: 100vw;
    height: 100%;

    @media screen and (min-width: 768px) {

    }
  }
</style>