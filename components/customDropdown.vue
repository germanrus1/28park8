<template>
  <dropdown class="my-dropdown-toggle"
            :options="prepareText(options)"
            :selected="selected"
            v-on:updateOption="onSelected"
            :placeholder="placeholder"
            :closeOnOutsideClick="closeOnOutsideClick">
  </dropdown>

</template>

<script>
import dropdown from '../components/dropdown';

export default {
  name: "customDropdown",
  components: {
    'dropdown': dropdown,
  },
  props: {
    options: {
      type: [Array, Object]
    },
    selected: {},
    placeholder: [String],
    closeOnOutsideClick: {
      type: [Boolean],
      default: true,
    },
    who: {type: String}
  },
  methods: {
    onSelected(payload) {
      this.$emit("drawText", this.options[payload.id].name, this.who);
    },
    prepareText(array) {
      let res = [];
      array.forEach(function (element){
        res.push({name: element.name.split('@').join(' '), id: element.id});
      });

      return res;
    }
  }
}
</script>

<style lang="scss" scoped>
.my-dropdown-toggle {
  font-family: 'GT Eesti Pro Text';
  background: linear-gradient(99.15deg, #9DD6F4 3.58%, #FFBACB 97.76%);
  box-shadow: 0 0.573vw 0.99vw rgba(31, 91, 215, 0.8);
  border-radius: 0.625vw;
  font-style: normal;
  font-weight: 375;
  font-size: 2.5vw;
  line-height: 97%;
  color: #FFFFFF;
  text-align: center;
  width: 22.552vw;
  height: 3.49vw;
  z-index: 20;
  margin: 0 0 1.927vw 0;
  @media screen and (min-width: 768px) {

  }

  :deep(.dropdown-toggle) {
    color: white;
    margin-bottom: 0;
    background: 0;
    :hover {
    }

    .caret {
      display: none;
    }
  }

  :deep(.dropdown-menu) {
    width: 22.552vw;
    height: 18.333vw;
    background: linear-gradient(99.15deg, #9DD6F4 3.58%, #FFBACB 97.76%);
    border-radius: 0 0 1.5625vw 1.5625vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;

    li {
      width: 19.583vw;
      background: #FFFFFF;
      border-radius: 1.5625vw;
      flex: none;
      order: 0;
      margin-bottom: 0.3125vw;

      a {
        color: #000000;
        font-family: 'GT Eesti Pro Text';
        font-style: normal;
        font-weight: 350;
        font-size: 0.947vw;
        line-height: 1.09375vw;
        text-align: center;
        padding: 0;
        white-space: break-spaces;
      }
    }
  }

  :deep(.dropdown-toggle-placeholder) {
    color: white;
  }
}
</style>