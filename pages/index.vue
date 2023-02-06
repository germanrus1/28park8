<template>
  <div>
    <div>
      <div class="description">Какое очень длинное описание в 4 строки</div>
      <div class="for-whom">Для кого открытка</div>
      <div>
        <div>
          <div>Checkbox1</div>
          <div>Для него</div>
        </div>
        <div>
          <div>Checkbox2</div>
          <div>Для нее</div>
        </div>
      </div>
      <div>
        Отправить открытку
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
  .description {

    width: 72.08vw;
    height: 17.08vw;
    left: 13.61vw;
    top: 8.75vw;

    /*font-family: 'GT Eesti Pro Text';*/
    font-style: normal;
    font-weight: 350;
    font-size: 3.61vw;
    line-height: 4.17vw;
  }
  .for-whom {

    position: absolute;
    width: 519px;
    height: 30px;
    left: 98px;
    top: 195px;

    font-family: 'GT Eesti Pro Text';
    font-style: normal;
    font-weight: 350;
    font-size: 32px;
    line-height: 37px;

    color: #1F5BD7;
  }
</style>