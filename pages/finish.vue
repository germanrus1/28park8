<template>
  <div class="content-generator" >
    <div class="content-generator__wrapper">
      <div class="generator-content">
        <!--      Левая часть-->
        <div class="generator-content__left">
          <div class="canvas-wrapper">
            <canvas id="img-result" style="" height="600" width="600">Ваш браузер не поддерживает это приложение.
              Обновитесь или скачайте другой браузер</canvas>
          </div>
        </div>
        <!--      Правая часть-->
        <div class="generator-content__right">
          <a href="https://krugosvetka.nspk.ru/dash" target="_blank"><div class="description-img"></div></a>
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
            <custom-button text="Попробовать еще раз" @click="this.$emit('updatePage', 'index')" classes="again"></custom-button>
            <a id="downloadResult" @click="downloadResult" target="_blank" class="download" style="display: none">Сохранить</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        canvasResult: null,
      }
    },
    methods: {
      downloadResult() {
        let dataURL = this.canvasResult.toDataURL("image/png");
        let link = document.getElementById('downloadResult');
        link.href = dataURL;
        link.download = "Открытка.png";
        link.click();
      },
    },
    mounted() {
      this.canvasResult = document.getElementById('img-result');
    }
  }
</script>

<style lang="scss" scoped>
.content-generator {
  background: no-repeat url("/background_finish.png") top center;
  padding-bottom: 5vw;
  &__wrapper {
    padding-top: 14.53125vw;
  }
}
.control-panel {
  display: flex;
  justify-content: space-between;
  width: 27.917vw;
  margin-left: 8.073vw;
  margin-top: -1.2vw;
}
.canvas-layer {
  position: absolute;
}
.canvas-wrapper {
  height: auto;
  width: 31.5625vw;
  background: no-repeat url("/generator_bg.png");
  background-size: 100%;
  margin-left: 1.40625vw;
  display: flex;
  justify-content: center;
  align-items: center;
canvas {
  height: 33.125vw;
  width: 33.125vw;
}
}
.generator-content {
  display: flex;
  justify-content: space-between;
  width: 65.15625vw;
  height: auto;
  margin-left: 17.448vw;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: inset 0 0.208vw 5.9375vw #FFFFFF;
  backdrop-filter: blur(0.9375vw);
  border-radius: 2.604vw;
  padding-bottom: 1.302vw;
  &__left {
    margin-top: 1.302vw;
     width: 35.99vw;
   }
  &__right {
    margin-top: 1.302vw;
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