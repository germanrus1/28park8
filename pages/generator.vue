<template>
  <div class="content-generator" >
    <div class="generator-content">
      <!--      Левая часть-->
      <div class="generator-content__left">
        <div class="text__select-bg">
          Выберите фон
        </div>
        <div class="canvas-wrapper">
          <canvas class="canvas-layer" style="z-index: 1" id="img-background" height="600" width="600">Ваш браузер не поддерживает это приложение.
            Обновитесь или скачайте другой браузер
          </canvas>
          <canvas class="canvas-layer" style="z-index: 2" id="img-description" height="600" width="600"></canvas>
          <canvas class="canvas-layer" style="z-index: 3" id="img-fromwhom" height="600" width="600"></canvas>
          <canvas class="canvas-layer" style="z-index: 4" id="img-forwhom" height="600" width="600"></canvas>
          <canvas class="canvas-layer" style="z-index: 5" id="img-sticker" height="600" width="600"></canvas>
        </div>
        <div class="control-panel">
          <button-circle icon="prev" @click="previousBg"></button-circle>
          <button-circle icon="rand" @click="randomImage" style="margin-top: 2.1vw;"></button-circle>
          <button-circle icon="next" @click="nextBg"></button-circle>
        </div>
        <div style="display: none">
          <img v-for="i in this.countBG" :id="'bg-' + (i - 1)" :src="'/backgrounds/background-' + (i - 1) +'.png'" :alt="'/background/background-' + (i - 1) +'.png'">
        </div>
      </div>
      <!--      Правая часть-->
      <div class="generator-content__right">
        <div class="description">
          <dropdown-textarea
              text="Добавить текст"
              v-on:clearDescription="clearDescription"
              v-on:drawDescription="drawDescription"
          ></dropdown-textarea>
        </div>
        <div class="description">
          <dropdown-stickers
              text="Выбрать наклейку"
              v-on:clearSticker="clearSticker"
              v-on:drawSticker="drawSticker"
          ></dropdown-stickers>
        </div>
        <div>
          <div class="zi-200">
            <custom-dropdown
                v-on:drawText="drawText"
                :options="forwhom"
                :selected="'Кому'"
                :placeholder="'Кому'"
                :who="'for'"
                :closeOnOutsideClick="false">
            </custom-dropdown>
          </div>
          <div class=" zi-100">
            <custom-dropdown
                v-on:drawText="drawText"
                :options="fromwhom"
                :selected="'От кого'"
                :placeholder="'От кого'"
                :who="'from'"
                :closeOnOutsideClick="false">
            </custom-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "../components/customButton";
import CustomDropdown from "../components/customDropdown";
import ButtonCircle from "../components/buttonCircle"
import DropdownTextarea from "../components/dropdownTextarea"
import DropdownStickers from "../components/dropdownStickers"

export default {
  name: "generator",
  components: {
    CustomDropdown,
    CustomButton,
    ButtonCircle,
    DropdownTextarea,
    DropdownStickers,
  },
  data() {
    return {
      canvasHeight: 600,
      canvasWidth: 600,
      canvasBG: null,
      ctxBG: null,
      canvasForWhom: null,
      ctxForWhom: null,
      canvasFromWhom: null,
      ctxFromWhom: null,
      canvasDescription: null,
      ctxDescription: null,
      canvasResult: null,
      ctxResult: null,
      canvasSticker: null,
      ctxSticker: null,
      countBG: 8,  // 8 фоновоых картинок
      currentBG: this.rand(8), // 8 фоновоых картинок
      fromwhom: [
        {name: 'От защитника'},
        {name: 'От любимого'},
        {name: 'От любимой мужчины'},
        {name: 'От джентельмена'},
      ],
      forwhom: [
          {name: 'Для любимой'},
          {name: 'Для зайчика'},
          {name: 'Прекрасному человеку'},
          {name: 'Наипрекраснейшему человеку'},
      ],
      descriptionModel: '',
      selectedForwhom: {
        name: 'Для кого',
      },
      selectedFromwhom: {
        name: 'От кого',
      }
    }
  },
  methods: {
    nextBg() {
      this.shiftCurrentBG('next');
      this.drawBg();
    },
    previousBg() {
      this.shiftCurrentBG('prev');
      this.drawBg();
    },
    randomImage() {
      this.shiftCurrentBG('rand');
      this.drawBg();
      this.drawText(this.fromwhom[this.rand(this.fromwhom.length)].name, 'from');
      this.drawText(this.forwhom[this.rand(this.forwhom.length)].name, 'for');
    },
    drawBg() {
      let ctxBG = this.ctxBG;
      let bgImg = document.getElementById('bg-' + this.currentBG);
      this.clearCtx(ctxBG);
      // ctxBG.clearRect(0, 0, this.canvasBG.width, this.canvasBG.height);
      ctxBG.drawImage(bgImg, 0, 0, this.canvasBG.width, this.canvasBG.height);
    },
    drawText(text, who = 'for') {
      let ctxText;
      if (who == 'for') {
        ctxText = this.ctxFromWhom;
      } else {
        ctxText = this.ctxForWhom;
      }
      this.clearCtx(ctxText);
      ctxText.font = "40pt Calibri";
      ctxText.fillText(text, 40, who == 'for' ? 40 : 90);
    },
    drawDescription(text = '') {
      let ctx;
      ctx = this.ctxDescription;
      this.clearCtx(ctx);
      ctx.font = "40pt Calibri";
      ctx.fillText(text, 40, 140);
    },
    drawSticker(id) {
      let ctx = this.ctxSticker;
      this.clearCtx(ctx);
      let sticker = document.getElementById(id);
      ctx.drawImage(sticker, 0, 0, this.canvasWidth, this.canvasHeight);
    },
    shiftCurrentBG(way = 'next') {
      let result = this.currentBG;
      if (!way || way == 'next') {
        if (result >= (this.countBG - 1)) {
          result = 0;
        } else {
          result++;
        }
      } else if (way == 'rand') {
        result = this.rand(this.countBG - 1);
      } else {
        if (result <= 0) {
          result = this.countBG - 1;
        } else {
          result--;
        }
      }
      this.currentBG = result;
    },
    mergeLayers() {
      let ctx = this.ctxResult;
      this.clearCtx(ctx);
      ctx.drawImage(this.canvasBG, 0, 0, this.canvasWidth, this.canvasHeight);
      ctx.drawImage(this.canvasSticker, 0, 0, this.canvasWidth, this.canvasHeight);
      ctx.drawImage(this.canvasForWhom, 0, 0, this.canvasWidth, this.canvasHeight);
      ctx.drawImage(this.canvasFromWhom, 0, 0, this.canvasWidth, this.canvasHeight);
      ctx.drawImage(this.canvasDescription, 0, 0, this.canvasWidth, this.canvasHeight);
    },
    rand(max) { // генерирует целые числа
      return Math.floor(Math.floor(Math.random() * max))
    },
    downloadResult() {
      let dataURL = this.canvasResult.toDataURL("image/png");
      let link = document.getElementById('downloadResult');
      link.href = dataURL;
      link.download = "Открытка.png";
      link.click();

    },
    clearCtx(ctx) {
      ctx.clearRect(0, 0, this.canvasHeight, this.canvasWidth);
    },
    clearDescription() {
      this.clearCtx(this.ctxDescription);
    },
    clearSticker() {
      this.clearCtx(this.ctxSticker);
    },
  },
  mounted() {
      this.canvasBG = document.getElementById('img-background');
      this.ctxBG = this.canvasBG.getContext("2d");
      this.canvasFromWhom = document.getElementById('img-fromwhom');
      this.ctxFromWhom = this.canvasFromWhom.getContext("2d");
      this.canvasForWhom = document.getElementById('img-forwhom');
      this.ctxForWhom = this.canvasForWhom.getContext("2d");
      this.canvasDescription = document.getElementById('img-description');
      this.ctxDescription = this.canvasDescription.getContext("2d");
      this.canvasResult = document.getElementById('img-result');
      this.ctxResult = this.canvasResult.getContext("2d");
      this.canvasSticker = document.getElementById('img-sticker');
      this.ctxSticker = this.canvasSticker.getContext("2d");

  }
}
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
    margin-right: 4.0625vw;
  }
}
.description {
  &__textarea {
    color: green;
    resize: none;
  }
}
</style>