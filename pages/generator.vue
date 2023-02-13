<template>
  <div class="content-generator" >
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

export default {
  name: "generator",
  components: {
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
      countBG: 8,  // 8 фоновоых картинок
      currentBG: this.rand(8), // 8 фоновоых картинок
      fromwhom: {
        'fromman': [
          {name: 'От профессионального кофе-брейкера'},
          {name: 'От любителя праздничных угощений'},
          {name: 'От надёжного, как скала'},
          {name: 'От точного, как прогноз погоды'},
          {name: 'От напарника в любом деле'},
          {name: 'От соседа по карусели'},
          {name: 'От свидетеля сладкой ваты'},
          {name: 'От путешественника в любую сторону'},
          {name: 'От весёлого и находчивого'},
        ],
        'fromwoman': [
          {name: 'От непредсказуемой, как американские горки'},
          {name: 'От королевы групповых чатов'},
          {name: 'От обладательницы мешка мемов и шуток'},
          {name: 'От надёжной напарницы в любом деле'},
          {name: 'От фанатки хорошего настроения'},
          {name: 'От коллеги по офисным шуткам'},
          {name: 'От большой любительницы открыток'},
        ],
      },
      forwhom: {
        'fromwoman': [
          {name: 'Чемпиону всех барных игр мира'},
          {name: 'Укротителю дедлайнов'},
          {name: 'Безудержному оптимисту'},
          {name: 'Главному специалисту по внезапному веселью'},
          {name: 'Знатоку смешных историй'},
          {name: 'Генератору ярких идей'},
          {name: 'Покорителю финансовых вершин'},
          {name: 'Специалисту по праздничной атмосфере'},
          {name: 'Душе компании'},
          {name: 'Лучшему в мире коллеге'},
        ],
        'fromman': [
          {name: 'Главной по праздничной атмосфере'},
          {name: 'Фее цветов и конфет'},
          {name: 'Вдохновительнице на подвиги'},
          {name: 'Королеве сладостей'},
          {name: 'Генератору хорошего настроения'},
          {name: 'Главной по улыбкам'},
          {name: 'Обладательнице черного пояса по креативности'},
          {name: 'Укротительнице понедельников'},
          {name: 'Лучшей в мире коллеге'},
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
      let ctx;
      if (who == 'for') {
        ctx = this.ctxFromWhom;
      } else {
        ctx = this.ctxForWhom;
      }
      this.clearCtx(ctx);
      ctx.font = "400 3.354vw GT Eesti Pro Text";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, 40, who == 'for' ? 40 : 90);
    },
    drawDescription(text = '') {
      let ctx;
      ctx = this.ctxDescription;
      this.clearCtx(ctx);
      ctx.font = "400 3.354vw GT Eesti Pro Text";
      ctx.fillStyle = "#ffffff";
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
    clearCtx(ctx) {
      ctx.clearRect(0, 0, this.canvasHeight, this.canvasWidth);
    },
    clearDescription() {
      this.clearCtx(this.ctxDescription);
    },
    clearSticker() {
      this.clearCtx(this.ctxSticker);
    },
    nextPage() {
      this.mergeLayers();
      this.$emit('updatePage', 'finish');
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
  background: no-repeat url("/background_generator.png") top center;
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
</style>