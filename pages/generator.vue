<template>
  <div class="content-generator" >
<!--    <dev-ranger min="0" max="600" v-on:textPosition="textPosition"></dev-ranger>-->
    <div class="content-generator__wrapper">
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
<!--          <div id="html2canvasDescription" class="html2canvasDescription"></div>-->
<!--          <img id="testIMG" src="">-->
          <canvas class="canvas-layer" style="z-index: 2" id="img-sticker" height="600" width="600"></canvas>
          <canvas class="canvas-layer" style="z-index: 3" id="img-description" height="600" width="600"></canvas>
          <canvas class="canvas-layer" style="z-index: 4" id="img-fromwhom" height="600" width="600"></canvas>
          <canvas class="canvas-layer" style="z-index: 5" id="img-forwhom" height="600" width="600"></canvas>
          <div style="min-height: 3vw; min-width: 3vw"
               @dblclick="editText()"
          >

          </div>
        </div>
        <div class="control-panel">
          <button-circle icon="prev" @click="previousBg"></button-circle>
          <button-circle icon="rand" @click="randomImage" style="margin-top: 2.1vw;"></button-circle>
          <button-circle icon="next" @click="nextBg"></button-circle>
<!--          <span style="font-size: 4vw">{{currentBG}}</span>-->
        </div>
        <div style="display: none">
          <img v-for="i in this.countBG" :id="'bg-' + (i - 1)" :src="'/backgrounds/background-' + (i - 1) +'.png'" :alt="'/background/background-' + (i - 1) +'.png'">
        </div>
      </div>
      <!--      Правая часть-->
      <div class="generator-content__right">
        <div class="description">
          <dropdown-description
              text="Добавить текст"
              v-on:clearDescription="clearDescription"
              v-on:selectDescription="selectDescription"
              :options="descriptions[fromwhomSelected]"
              :closeOnOutsideClick="true"
          ></dropdown-description>
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
                :options="forwhom[fromwhomSelected]"
                :selected="'Кому'"
                :placeholder="'Кому'"
                :who="'for'"
                :closeOnOutsideClick="true">
            </custom-dropdown>
          </div>
          <div class=" zi-100">
            <custom-dropdown
                v-on:drawText="drawText"
                :options="fromwhom[fromwhomSelected]"
                :selected="'От кого'"
                :placeholder="'От кого'"
                :who="'from'"
                :closeOnOutsideClick="true">
            </custom-dropdown>
          </div>
          <custom-button text="Создать открытку" classes="create" @click="nextPage()"></custom-button>
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
import DropdownDescription from "../components/dropdownDescription";
import DevRanger from "../components/devRanger";
// import Html2Canvas from 'html2canvas';

export default {
  name: "generator",
  components: {
    DevRanger,
    DropdownDescription,
    CustomDropdown,
    CustomButton,
    ButtonCircle,
    DropdownTextarea,
    DropdownStickers,
  },
  props: {
    fromwhomSelected: 'fromman',
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
      currentSticker: 0,
      currentTextFor: '',
      currentTextFrom: '',
      coordinates: {
        'description': {'x': 0, 'y': 0},
        'fromwhom': {'x': 0, 'y': 0},
        'forwhom': {'x': 0, 'y': 0},
        'sticker': {'x': 0, 'y': 0},
        'fontSize': 26,
      },
      positions: {
        'sticker': {
          0: {x:90, y:223},
          1: {x:116, y:119},
          2: {x:167, y:118},
          3: {x:142, y:57},
          4: {x:96, y:55},
          5: {x:281, y:70},
          6: {x:126, y:327},
          7: {x:69, y:325},
        },
        'forwhom': {
          0: {x:208, y:504},
          1: {x:208, y:504},
          2: {x:208, y:504},
          3: {x:208, y:504},
          4: {x:208, y:504},
          5: {x:208, y:504},
          6: {x:126, y:504},
          7: {x:126, y:504},
        },
        'fromwhom': {
          0: {x:208, y:370},
          1: {x:208, y:370},
          2: {x:208, y:370},
          3: {x:208, y:370},
          4: {x:208, y:370},
          5: {x:208, y:370},
          6: {x:126, y:370},
          7: {x:126, y:370},
        },
        'description': {
          0: {x:208, y:370},
          1: {x:208, y:370},
          2: {x:208, y:370},
          3: {x:208, y:370},
          4: {x:208, y:370},
          5: {x:208, y:370},
          6: {x:126, y:370},
          7: {x:126, y:370},
        },
        'textFontSize': 26,
        'descriptionFontSize': 28,
      },
      countBG: 8,  // 8 фоновоых картинок
      currentBG: this.rand(8), // 8 фоновоых картинок
      fromwhom: {
        'fromman': [
          {name: 'От профессионального@кофе-брейкера', id: 0},
          {name: 'От любителя@праздничных угощений', id: 1},
          {name: 'От надёжного,@как скала', id: 2},
          {name: 'От точного, как прогноз@погоды', id: 3},
          {name: 'От напарника в любом@деле', id: 4},
          {name: 'От соседа@по карусели', id: 5},
          {name: 'От свидетеля@сладкой ваты', id: 6},
          {name: 'От путешественника@в любую сторону', id: 7},
          {name: 'От весёлого@и находчивого', id: 8},
        ],
        'fromwoman': [
          {name: 'От непредсказуемой,@как американские горки', id: 0},
          {name: 'От королевы групповых@чатов', id: 1},
          {name: 'От обладательницы@мешка мемов и шуток', id: 2},
          {name: 'От надёжной@напарницы в любом@деле', id: 3},
          {name: 'От фанатки хорошего@настроения', id: 4},
          {name: 'От коллеги@по офисным шуткам', id: 5},
          {name: 'От большой@любительницы@открыток', id: 6},
        ],
      },
      forwhom: {
        'fromwoman': [
          {name: 'Чемпиону всех барных@игр мира', id: 0},
          {name: 'Укротителю@дедлайнов', id: 1},
          {name: 'Безудержному@оптимисту', id: 2},
          {name: 'Главному специалисту@по внезапному веселью', id: 3},
          {name: 'Знатоку смешных@историй', id: 4},
          {name: 'Генератору@ярких идей', id: 5},
          {name: 'Покорителю@финансовых вершин', id: 6},
          {name: 'Специалисту@по праздничной@атмосфере', id: 7},
          {name: 'Душе компании', id: 8},
          {name: 'Лучшему в мире@коллеге', id: 9},
        ],
        'fromman': [
          {name: 'Главной по@праздничной@атмосфере', id: 0},
          {name: 'Фее цветов и конфет', id: 1},
          {name: 'Вдохновительнице@на подвиги', id: 2},
          {name: 'Королеве сладостей', id: 3},
          {name: 'Генератору хорошего@настроения', id: 4},
          {name: 'Главной по улыбкам', id: 5},
          {name: 'Обладательнице@черного пояса по@креативности', id: 6},
          {name: 'Укротительнице@понедельников', id: 7},
          {name: 'Лучшей в мире коллеге', id: 8},
        ],
      },
      descriptionModel: '',
      descriptions: {
        'fromman': [
          {name: 'Ты лучше, чем праздничный фейерверк. Ведь ты не только светишь, но и согреваешь!'},
          {name: 'Пусть мечты будут слаще, чем сладкая вата!'},
          {name: 'Ты настоящий фейерверк!'},
          {name: 'Ты раскачаешь любой праздник лучше, чем качели!'},
          {name: 'Пусть каждый день будет словно в парке развлечений!'},
          {name: 'Вытяни счастливый билетик, чтобы сбывались мечты!'},
          {name: 'Пусть проблемы улетят на воздушных шариках!'},
          {name: 'С тобой комната страха превращается в комнату смеха!'},
          {name: 'Любой вопрос решается, если за дело берёшься ты лично!'},
          {name: 'Ярких побед в любом деле!'},
          {name: 'Головокружительного успеха во всём!'},
          {name: 'Ныряй в приключения, будь на позитиве!'},
          {name: 'Твоя энергия заряжает стадионы!'},
        ],
        'fromwoman': [
          {name: 'С тобой интереснее, чем на самом большом колесе обозрения!'},
          {name: 'Азарт – это твоё второе имя. Пусть тебе везет каждый день!'},
          {name: 'Когда ты рядом, сложное становится простым!'},
          {name: 'Твои идеи просто улет!'},
          {name: 'С тобой не нужен билет в парк развлечений!'},
          {name: 'Ты настоящий вулкан идей!'},
          {name: 'Пусть мечты вдохновляют тебя и людей вокруг!'},
          {name: 'Головокружительных успехов во всем!'},
          {name: 'Пусть удача тебе улыбнётся!'},
          {name: 'Мечтай по-крупному, выигрывай во всем!'},
          {name: 'Главное, верить в себя!'},
          {name: 'С тобой – хоть в комнату страха, хоть в комнату смеха!'},
        ],
      },
      selectedForwhom: {
        name: 'Для кого',
      },
      selectedFromwhom: {
        name: 'От кого',
      }
    }
  },
  methods: {
    textPosition(type, x, y, fontSize) {
      this.coordinates[type].x = x;
      this.coordinates[type].y = y;
      // this.coordinates.fontSize = fontSize;
    },
    editText() {

    },
    selectDescription(text) {
      // this.descriptionModel = text;
      this.drawDescription(text);
    },
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
      this.drawSticker('sticker-' + this.rand(13));
      this.drawDescription(this.descriptions[this.fromwhomSelected][this.rand(this.descriptions[this.fromwhomSelected].length)].name);
      this.drawText(this.fromwhom[this.fromwhomSelected][this.rand(this.fromwhom[this.fromwhomSelected].length)].name, 'from');
      this.drawText(this.forwhom[this.fromwhomSelected][this.rand(this.forwhom[this.fromwhomSelected].length)].name, 'for');
    },
    drawBg() {
      let ctxBG = this.ctxBG;
      let bgImg = document.getElementById('bg-' + this.currentBG);
      this.clearCtx(ctxBG);
      ctxBG.drawImage(bgImg, 0, 0, this.canvasBG.width, this.canvasBG.height);
    },
    drawText(text, who = 'for') {
      let ctx, x, y, fontSize, texts, maxLengthText;

      if (who == 'for') {
        ctx = this.ctxFromWhom;
      } else {
        ctx = this.ctxForWhom;
      }
      x = Number(this.positions[who == 'for' ? 'forwhom' : 'fromwhom'][this.currentBG].x);
      y = Number(this.positions[who == 'for' ? 'forwhom' : 'fromwhom'][this.currentBG].y);
      fontSize = this.positions.textFontSize;
      texts = text.split('@');
      maxLengthText = this.getMaxLengText(texts);

      this.clearCtx(ctx);

      // заливка фона градиентом
      const gradient = ctx.createLinearGradient(x + 20, 0, x + 358, 0);
      gradient.addColorStop(0.04, "rgba(31, 91, 215, 0.29)");
      gradient.addColorStop(0.9, "rgba(253, 138, 166, 0.13)");
      gradient.addColorStop(0.6, "#1897F8");
      ctx.beginPath();
      ctx.roundRect(x - fontSize - 20, y - fontSize - 20, maxLengthText * (fontSize - 8) + 30, fontSize*3+texts.length*fontSize / 2, 50);
      ctx.fillStyle = gradient;
      ctx.fill();

      // заливка текста/текстов
      texts.forEach(function(text, index) {
        ctx.font = "400 " + fontSize + "px GT Eesti Pro Text";
        ctx.fillStyle = "#ffffff";

        // выравнивание нижних текстов относительно первого
        let drawX;
        drawX = text.length != maxLengthText ? x + (fontSize * (maxLengthText - text.length) / 4) : x + 0;
        console.log(x);
        console.log(y);
        ctx.fillText(text, drawX, y + (fontSize + 3) * index);
      })
    },
    drawDescription(text = '') {
      let ctx, x, y, fontSize, texts, maxLengthText;
      ctx = this.ctxDescription;
      this.clearCtx(ctx);

      x = Number(this.positions['description'][this.currentBG].x);
      y = Number(this.positions['description'][this.currentBG].y);
      fontSize = this.positions.textFontSize;
      texts = text.split('@');
      maxLengthText = this.getMaxLengText(texts);

      // заливка фона градиентом
      const gradient = ctx.createLinearGradient(x + 20, 0, x + 358, 0);
      gradient.addColorStop(1, "rgba(109, 192, 255, 0.28)");
      gradient.addColorStop(0.29, "#1F5BD7");
      ctx.beginPath();
      ctx.roundRect(x - fontSize - 20, y - fontSize - 20, maxLengthText * (fontSize - 8) + 30, fontSize*3+texts.length*fontSize / 2, 50);
      ctx.fillStyle = gradient;
      ctx.fill();

      // заливка текста/текстов
      texts.forEach(function(text, index) {
        ctx.font = "400 " + fontSize + "px GT Eesti Pro Text";
        ctx.fillStyle = "#ffffff";

        // выравнивание нижних текстов относительно первого
        let drawX;
        drawX = text.length != maxLengthText ? x + (fontSize * (maxLengthText - text.length) / 4) : x + 0;
        console.log(x);
        console.log(y);
        ctx.fillText(text, drawX, y + (fontSize + 3) * index);
      })

      ctx.font = "400 3.354vw GT Eesti Pro Text";
      ctx.fillStyle = "#000000";
      ctx.fillText(text, 40, 120);
    },
    getMaxLengText(texts) {
      let max = 0;
      texts.forEach(function (text) {
        max = max < text.length ? text.length : max;
      });

      return max;
    },
    drawSticker(id) {
      let ctx = this.ctxSticker;
      this.clearCtx(ctx);
      let sticker = document.getElementById(id);
      ctx.drawImage(sticker, this.positions.sticker[this.currentBG].x, this.positions.sticker[this.currentBG].y, 290, 290);
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
    clearCtx(ctx) {
      ctx.clearRect(0, 0, this.canvasHeight, this.canvasWidth);
    },
    clearDescription() {
      this.clearCtx(this.ctxDescription);
    },
    clearSticker() {
      this.clearCtx(this.ctxSticker);
    },
    clearForwhom() {
      this.clearCtx(this.ctxForWhom);
    },
    clearFromwhom() {
      this.clearCtx(this.ctxFromWhom);
    },
    nextPage() {
      this.mergeLayers();
      this.$emit('updatePage', 'finish');
    },
    clearLayers() {
      this.clearSticker();
      this.clearDescription();
      this.clearForwhom();
      this.clearFromwhom();
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
.content-generator {
  background: no-repeat url(/background_text_v-mire.svg) 18.542vw 5.208vw,
  no-repeat url(/background_text_MIR.svg) 82.34375vw 5.3125vw,
  no-repeat url(/background_generator.png) 0 0;
  background-size: 18%, 8%, 100%;
  padding-bottom: 5vw;
  &__wrapper {
    padding-top: 14.53125vw;
  }
}
.control-panel {
  display: flex;
  justify-content: space-between;
  width: 24.917vw;
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
  margin-top: -1vw;
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
  margin: auto;
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
.html2canvasDescription {
  //background: linear-gradient(99.15deg, rgba(31, 91, 215, 0.29) 3.58%, #1897F8 63.63%, rgba(253, 138, 166, 0.13) 97.76%);
  border-radius: 2.604vw;
  height: 5.208vw;
  width: 2.604vw;
}
</style>