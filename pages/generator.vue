<template>
  <div class="content-generator">
    <div class="generator-content">
      <!--      Левая часть-->
      <div class="generator-content__left">
        <div class="text__select-bg">
          Выберите фон
        </div>
        <div class="canvas-wrapper">
          <canvas class="canvas-layer" style="z-index: 1" id="img-background" height="400" width="400">Ваш браузер не поддерживает это приложение.
            Обновитесь или скачайте другой браузер
          </canvas>
          <canvas class="canvas-layer" style="z-index: 2" id="img-description" height="400" width="400"></canvas>
          <canvas class="canvas-layer" style="z-index: 3" id="img-fromwhom" height="400" width="400"></canvas>
          <canvas class="canvas-layer" style="z-index: 3" id="img-forwhom" height="400" width="400"></canvas>

        </div>
        <div class="control-panel">
          <button-circle icon="prev" @click="previousBg"></button-circle>
          <button-circle icon="rand" @click="randomImage" style="margin-top: 2.1vw;"></button-circle>
          <button-circle icon="next" @click="nextBg"></button-circle>
        </div>
        <div style="display: none">
          <img v-for="i in 3" :id="'bg-' + i" :src="'/backgrounds/image' + i +'.png'" :alt="'/background/image' + i +'.png'">
        </div>
      </div>
      <!--      Правая часть-->
      <div class="generator-content__right">
        <div class="description">
          <custom-button text="Добавить текст"/>
<!--          <textarea v-model="descriptionModel" @change="drawDescription" class="description__textarea" rows="5" cols="30" placeholder="Введите текст" name="description"></textarea>-->
        </div>
        <custom-button text="Выбрать наклейку" />
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
        <div>
          <custom-button text="Создать открытку" @click="mergeLayers" classes="create"></custom-button>
          <a id="downloadResult" @click="downloadResult" target="_blank" class="download">Сохранить</a>
          <canvas id="img-result" style="" height="400" width="400"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "../components/customButton";
import CustomDropdown from "../components/customDropdown";
import ButtonCircle from "../components/buttonCircle"

export default {
  name: "generator",
  components: {
    CustomDropdown,
    CustomButton,
    ButtonCircle,
  },
  data() {
    return {
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
      countBG: 3,
      currentBG: this.rand(3) + 1,
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
      this.drawBg();
      this.shiftCurrentBG('next');
    },
    previousBg() {
      this.drawBg();
      this.shiftCurrentBG('prev');
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
      ctxBG.clearRect(0, 0, this.canvasBG.width, this.canvasBG.height);
      ctxBG.drawImage(bgImg, 0, 0, this.canvasBG.width, this.canvasBG.height);
    },
    drawText(text, who = 'for') {
      console.log(who)
      let ctxText;
      if (who == 'for') {
        ctxText = this.ctxFromWhom;
      } else {
        ctxText = this.ctxForWhom;
      }
      ctxText.clearRect(0, 0, this.canvasBG.width, this.canvasBG.height);
      ctxText.font = "40pt Calibri";
      ctxText.fillText(text, 40, who == 'for' ? 40 : 90);
    },
    drawDescription() {
      let ctxText;
      ctxText = this.ctxDescription;
      ctxText.clearRect(0, 0, this.canvasBG.width, this.canvasBG.height);
      ctxText.font = "40pt Calibri";
      ctxText.fillText(this.descriptionModel, 40, 140);
    },
    shiftCurrentBG(way = 'next') {
      let result = this.currentBG;
      if (!way && way == 'next') {
        if (result == this.countBG) {
          result = 1;
        } else {
          result++;
        }
      } else if (way == 'rand') {
        result = this.rand(this.countBG) + 1;
      } else {
        if (result == 1) {
          result = this.countBG;
        } else {
          result--;
        }
      }
      this.currentBG = result;
    },
    mergeLayers() {
      let ctx = this.ctxResult;
      ctx.clearRect(0, 0, this.canvasBG.width, this.canvasBG.height);
      ctx.drawImage(this.canvasBG, 0, 0, this.canvasBG.width, this.canvasBG.height);
      ctx.drawImage(this.canvasForWhom, 0, 0, this.canvasBG.width, this.canvasBG.height);
      ctx.drawImage(this.canvasFromWhom, 0, 0, this.canvasBG.width, this.canvasBG.height);
      ctx.drawImage(this.canvasDescription, 0, 0, this.canvasBG.width, this.canvasBG.height);
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

    }
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
      this.nextBg();
  }
}
</script>

<style lang="scss" scoped>
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
.zi-100 {
  z-index: 100;
  position: relative;
}
.zi-200 {
  z-index: 200;
  position: relative;
}
.canvas-layer {
  position: absolute;
  height: 26.5625vw;
  width: 26.5625vw;
}
.canvas-wrapper {
  height: 26.5625vw;
  width: 26.5625vw;
  background: no-repeat url("/generator_bg.png");
  background-size: 91%;
  margin-left: 8.229vw;
  canvas {
    height: 17.5625vw;
    width: 17.5625vw;
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