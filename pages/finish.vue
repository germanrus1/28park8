<template>
  <div class="content-generator" >
    <div class="generator-content">
      <!--      Левая часть-->
      <div class="generator-content__left">
        <div class="text__select-bg">
          Выберите фон
        </div>
        <div class="canvas-wrapper">
          <canvas id="img-result" style="" height="600" width="600">Ваш браузер не поддерживает это приложение.
            Обновитесь или скачайте другой браузер</canvas>
        </div>
      </div>
      <!--      Правая часть-->
      <div class="generator-content__right">
        <div class="description-img">
        </div>
        <div class="description-text_top">
          У вас получилась отличная открытка!
        </div>
        <div class="description-text_bottom">
          Не забудьте поделиться ей <br>с коллегами на «Кругосветке».
          <br><br>
          Сохраните свою открытку и поздравьте друзей и близких.
        </div>
        <div>
          <custom-button text="Сохранить" @click="downloadResult" classes="create"></custom-button>
          <custom-button text="Попробовать еще раз" @click="console.log('/')" classes="again"></custom-button>
          <a id="downloadResult" @click="downloadResult" target="_blank" class="download">Сохранить</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>

.content {
  background: no-repeat url("/generator_bg-1.png");
}
.content-generator {
  padding-top: 14.53125vw;
}
.control-panel {
  display: flex;
  justify-content: space-between;
  width: 27.917vw;
  margin-left: 8.073vw;
  margin-top: -1.2vw;
}
.text__select-bg {
  width: 15.417vw;
  height: 3.49vw;
  font-family: 'GT Eesti Pro Text';
  font-style: normal;
  font-weight: 350;
  font-size: 3.333vw;
  line-height: 97%;
  color: #1F5BD7;
  margin-top: 2.8125vw;
  margin-left: 2.448vw;
}
.canvas-layer {
  position: absolute;
}
.canvas-wrapper {
  height: 24.5625vw;
  width: 24.5625vw;
  background: no-repeat url("/generator_bg.png");
  background-size: 100%;
  margin-left: 8.229vw;
  display: flex;
  justify-content: center;
  align-items: center;
canvas {
  height: 20.5625vw;
  width: 20.5625vw;
}
}
.generator-content {
  display: flex;
  justify-content: space-between;
  width: 65.15625vw;
  height: 36.71875vw;
  margin-left: 17.448vw;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: inset 0 0.208vw 5.9375vw #FFFFFF;
  backdrop-filter: blur(0.9375vw);
  border-radius: 2.604vw;
  &__left {
     width: 35.99vw;
   }
  &__right {
    margin-top: 5.46875vw;
    width: 22.552vw;
    padding-right: 1.5625vw;
    padding-left: 1.5625vw;
    font-family: 'GT Eesti Pro Text';
    font-style: normal;
    font-weight: 350;
    font-size: 1.354vw;
    line-height: 1.5625vw;
    color: #1F5BD7;
    background: #FFFFFF;
    border-radius: 1.5625vw;
    margin-right: 2.917vw;
   }
}
.description {
  &-img {
    width: 17.596vw;
    height: 8.638vw;
    background: no-repeat url('/finish_description.svg');
    background-size: 100%;
    margin-top: 1.198vw;
  }
  &-text_top {
    font-weight: 400;
    font-size: 1.667vw;
    line-height: 1.927vw;
    margin-bottom: 1.09375vw;
  }
  &-text_bottom {
    margin-bottom: 1.198vw;
  }
}
</style>