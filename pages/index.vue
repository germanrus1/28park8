<template>
  <div class="content-index">
    <div class="wrapper">
      <div class="error" :class="{active:isActiveModal}">
        <div class="error__description">
          Необходимо выбрать, для кого открытка
        </div>
        <div class="error__content">
          <button class="error__content_button" @click="isActiveModal = false;">Ок</button>
        </div>
      </div>
      <div class="description">
        <div class="label">Привет!</div>
        <div class="text">
          Это digital-конструктор праздничных открыток из нашего парка развлечений.
          Здесь вы сможете создать креативную поздравительную открытку и поделиться<br>
          ей с коллегами или близкими людьми.
        </div>
      </div>
      <div class="for-whom">Для кого открытка?</div>
      <div class="radiobutton-content">
        <div class="radiobutton-button">
          <label class="radiobutton" @click="radiobuttonModel = 'fromwoman'">
            <input type="radio" name="forwhom">
            <span class="checkmark left"></span>
          </label>
          <span class="radiobutton-label right">ДЛЯ НЕГО</span>
        </div>
        <div class="radiobutton-button">
          <label class="radiobutton" @click="radiobuttonModel = 'fromman'">
            <input type="radio" name="forwhom">
            <span class="checkmark right"></span>
          </label>
          <span class="radiobutton-label left">ДЛЯ НЕЁ</span>
        </div>

      </div>
      <div class="button-content">
        <button class="button generate" @click="nextPage">Создать<br>открытку</button>
      </div>
    </div>
  </div>
</template>

<script>
  import dropdown from "vue-dropdowns";

  export default {
    name: "generator",
    components: {
      'dropdown': dropdown,
    },
    data() {
      return {
        radiobuttonModel: null,
        isActiveModal: false,
      }
    },
    methods: {
      nextPage() {
        if (!this.radiobuttonModel) {
          this.isActiveModal = true;
        } else {
          this.$emit('updateSelected', this.radiobuttonModel)
          this.$emit('updatePage', 'generator')
        }
      },
      toggleError() {
        this.isActiveModal = this.isActiveModal ? false : true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .error {
    position: absolute;
    width: 36.458vw;
    height: 14.74vw;
    background: #FF527C;
    border-radius: 2.604vw;
    display: none;
    &.active {
      display: block;
    }
    &__description {
      margin: 5.208vw 5.104vw 1.979vw;
      font-family: 'GT Eesti Pro Text';
      font-style: normal;
      font-weight: 350;
      font-size: 1.354vw;
      line-height: 1.5625vw;
      color: #FFFFFF;
    }
    &__content {
      display: flex;
      justify-content: space-around;
      &_button {
        width: 15.052vw;
        height: 3.59375vw;
        background: linear-gradient(99.15deg, #FFFFFF 3.58%, #FFFFFF 97.76%);
        box-shadow: 0 0.208vw 0.521vw rgba(117, 20, 48, 0.2);
        border-radius: 1.042vw;
        border: 0;
        font-style: normal;
        font-weight: 400;
        font-size: 1.354vw;
        line-height: 1.5625vw;
        text-transform: uppercase;
        color: #FF527C;
        cursor: pointer;
      }
    }
  }
  .content-index {
    padding-top: 17.76vw;
    background: no-repeat url(/background_text_v-mire.svg) 17.76vw 4.21875vw,
                no-repeat url(/background_text_MIR.svg) 78.542vw 5.521vw,
                no-repeat url(/background_index.png) 0 6.9vw;
    padding-bottom: 5vw;
    background-size: 26%, 8%, 100%;
  }
  .button-content {
    width: 15.052vw;
    height: 5.833vw;
    margin: 1.09375vw auto 1.09375vw auto;
  }
  .wrapper {
    width: 36.458vw;
    left: 12.448vw;
    top: 17.76vw;
    background: #FFFFFF;
    border-radius: 2.604vw;
    margin: 0 0 0 12.448vw;
    padding-bottom: 1.09375vw;
  }
  .description {
    font-family: 'GT Eesti Pro Text';
    font-style: normal;
    font-weight: 350;
    color: #1F5BD7;
    padding-top: 1.25vw;
    padding-left: 5.104vw;
    .label {
      font-size: 1.667vw;
      line-height: 1.927vw;
      margin-bottom: 1.09375vw;
      margin-top: 1.25vw;
    }
    .text {
      width: 27.03125vw;
      height: 7.8125vw;
      font-size: 1.354vw;
      line-height: 1.5625vw;
    }
  }
  .for-whom {
    width: 27.03125vw;
    height: 1.5625vw;
    font-family: 'GT Eesti Pro Text';
    font-style: normal;
    font-weight: 350;
    font-size: 1.667vw;
    line-height: 1.927vw;
    color: #1F5BD7;
    margin-top: 1.09375vw;
    padding-left: 5.104vw;
  }
  .radiobutton-content {
    display: flex;
    justify-content: space-between;
    width: 26.875vw;
    height: 8vw;
    margin-top: 1.823vw;
    padding-left: 5.104vw;
  }
  .radiobutton {
    display: block;
    position: relative;
    margin-bottom: 0.625vw;
    cursor: pointer;
    font-size: 1.146vw;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 5vw;
    height: 5vw;
  }
  .radiobutton-button {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .radiobutton-label {
    font-family: 'GT Eesti Pro Text';
    font-style: normal;
    font-weight: 350;
    font-size: 1.354vw;
    line-height: 1.5625vw;
    margin-top: 1vw;
    &.right {
      color: #1F5BD7;
    }
    &.left {
      color: #FF527C;;
    }
  }
  /* Hide the browser's default checkbox */
  .radiobutton input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    width: 5vw;
    height: 5vw;
    border-radius: 0.625vw;
    background: #FFFFFF;
   //left: 98px;
    //top: 311px;
    &.left {
      box-shadow: 0 0.573vw 0.99vw rgba(31, 91, 215, 0.8);
    }
    &.right {
      box-shadow: 0 0.573vw 0.99vw rgba(255, 186, 203, 0.81);
    }
  }

  /* On mouse-over, add a grey background color */
  .radiobutton:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .radiobutton input:checked ~ .checkmark {
    background: url("/radiobutton_checked.svg");
    background-size: 100%;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .radiobutton input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .radiobutton .checkmark:after {
    left: 0.46875vw;
    top: 0.26vw;
    width: 0.26vw;
    height: 0.521vw;
    border: solid white;
    border-width: 0 0.15625vw 0.15625vw 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
</style>