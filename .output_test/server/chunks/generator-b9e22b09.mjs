import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { _ as __nuxt_component_4 } from './customButton-1555bca0.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import './config.mjs';
import 'destr';
import 'scule';

const _sfc_main$7 = {
  name: "buttonCircle",
  props: {
    icon: { type: String },
    classes: { type: String }
  }
};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["button circle", $props.classes]
  }, _attrs))} data-v-6c37c245><div class="${ssrRenderClass([$props.icon, "icon"])}" data-v-6c37c245></div><div class="${ssrRenderClass([$props.icon, "text"])}" data-v-6c37c245></div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/buttonCircle.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7], ["__scopeId", "data-v-6c37c245"]]);
const _sfc_main$6 = {
  name: "dropdownDescription",
  components: {
    CustomButton: __nuxt_component_4
  },
  props: {
    text: { type: String },
    options: { type: Array },
    closeOnOutsideClick: { type: Boolean }
  },
  data() {
    return {
      active: false,
      textModel: ""
    };
  },
  methods: {
    toggle() {
      this.active = !this.active;
    }
  }
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_custom_button = __nuxt_component_4;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_custom_button, {
    text: $props.text,
    class: "zi-800",
    onClick: $options.toggle
  }, null, _parent));
  _push(`<div class="${ssrRenderClass([$data.active ? "isActive" : "", "content-dropdown zi-700"])}" data-v-20b8a33e><div class="content-textarea" data-v-20b8a33e><div class="list scroll-content" data-v-20b8a33e><!--[-->`);
  ssrRenderList($props.options, (item) => {
    _push(`<div class="item" data-v-20b8a33e>${ssrInterpolate(item.name)}</div>`);
  });
  _push(`<!--]--></div><div class="button-content" data-v-20b8a33e>`);
  _push(ssrRenderComponent(_component_custom_button, {
    text: "\u0411\u0435\u0437 \u0442\u0435\u043A\u0441\u0442\u0430",
    classes: "blue",
    onClick: ($event) => this.$emit("clearDescription")
  }, null, _parent));
  _push(`</div></div></div><!--]-->`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dropdownDescription.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-20b8a33e"]]);
const _sfc_main$5 = {
  name: "dropdownTextarea",
  components: {
    CustomButton: __nuxt_component_4
  },
  props: {
    text: { type: String }
  },
  data() {
    return {
      active: false,
      textModel: ""
    };
  },
  methods: {
    toggle() {
      this.active = !this.active;
    }
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_custom_button = __nuxt_component_4;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_custom_button, {
    text: $props.text,
    class: "zi-600",
    onClick: $options.toggle
  }, null, _parent));
  _push(`<div class="${ssrRenderClass([$data.active ? "isActive" : "", "content-dropdown zi-500"])}" data-v-4cecbfa7><div class="button-content" data-v-4cecbfa7>`);
  _push(ssrRenderComponent(_component_custom_button, {
    text: "\u0411\u0435\u0437 \u043D\u0430\u043A\u043B\u0435\u0439\u043A\u0438",
    classes: "blue",
    onClick: ($event) => this.$emit("clearSticker")
  }, null, _parent));
  _push(`</div><div class="stickers scroll-content horizontal" data-v-4cecbfa7><!--[-->`);
  ssrRenderList(13, (i) => {
    _push(`<img${ssrRenderAttr("id", "sticker-" + (i - 1))}${ssrRenderAttr("src", "/stickers/sticker-" + (i - 1) + ".png")}${ssrRenderAttr("alt", "/stickers/sticker-" + (i - 1) + ".png")} data-v-4cecbfa7>`);
  });
  _push(`<!--]--></div></div><!--]-->`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dropdownStickers.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-4cecbfa7"]]);
const _sfc_main$4 = {
  data() {
    return {
      selectedOption: {
        name: ""
      },
      showMenu: false,
      placeholderText: "Please select an item"
    };
  },
  props: {
    options: {
      type: [Array, Object]
    },
    selected: {},
    placeholder: [String],
    closeOnOutsideClick: {
      type: [Boolean],
      default: true
    }
  },
  mounted() {
    this.selectedOption = this.selected;
    if (this.placeholder) {
      this.placeholderText = this.placeholder;
    }
    if (this.closeOnOutsideClick) {
      document.addEventListener("click", this.clickHandler);
    }
  },
  beforeDestroy() {
    document.removeEventListener("click", this.clickHandler);
  },
  methods: {
    updateOption(option) {
      this.selectedOption = option;
      this.showMenu = false;
      this.$emit("updateOption", this.selectedOption);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    clickHandler(event) {
      const { target } = event;
      const { $el } = this;
      if (!$el.contains(target)) {
        this.showMenu = false;
      }
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "btn-group" }, _attrs))}>`);
  if ($data.selectedOption.name !== void 0) {
    _push(`<li class="dropdown-toggle">${ssrInterpolate($props.selected)} <span class="caret"></span></li>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.selectedOption.name === void 0) {
    _push(`<li class="dropdown-toggle dropdown-toggle-placeholder">${ssrInterpolate($data.placeholderText)} <span class="caret"></span></li>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.showMenu) {
    _push(`<ul class="dropdown-menu"><!--[-->`);
    ssrRenderList($props.options, (option, idx) => {
      _push(`<li><a href="javascript:void(0)">${ssrInterpolate(option.name)}</a></li>`);
    });
    _push(`<!--]--></ul>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dropdown.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$3 = {
  name: "customDropdown",
  components: {
    "dropdown": __nuxt_component_0
  },
  props: {
    options: {
      type: [Array, Object]
    },
    selected: {},
    placeholder: [String],
    closeOnOutsideClick: {
      type: [Boolean],
      default: true
    },
    who: { type: String }
  },
  methods: {
    onSelected(payload) {
      this.$emit("drawText", this.options[payload.id].name, this.who);
    },
    prepareText(array) {
      let res = [];
      array.forEach(function(element) {
        res.push({ name: element.name.split("@").join(" "), id: element.id });
      });
      return res;
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_dropdown = __nuxt_component_0;
  _push(ssrRenderComponent(_component_dropdown, mergeProps({
    class: "my-dropdown-toggle",
    options: $options.prepareText($props.options),
    selected: $props.selected,
    onUpdateOption: $options.onSelected,
    placeholder: $props.placeholder,
    closeOnOutsideClick: $props.closeOnOutsideClick
  }, _attrs), null, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/customDropdown.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-dbbbde9a"]]);
const _sfc_main$2 = {
  name: "dropdownTextarea",
  components: {
    CustomButton: __nuxt_component_4
  },
  props: {
    text: { type: String }
  },
  data() {
    return {
      active: false,
      textModel: ""
    };
  },
  methods: {
    toggle() {
      this.active = !this.active;
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_custom_button = __nuxt_component_4;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_custom_button, {
    text: $props.text,
    class: "zi-800",
    onClick: $options.toggle
  }, null, _parent));
  _push(`<div class="${ssrRenderClass([$data.active ? "isActive" : "", "content-dropdown zi-700"])}" data-v-18822841><div class="content-textarea" data-v-18822841><textarea data-v-18822841>${ssrInterpolate($data.textModel)}</textarea><div class="button-content" data-v-18822841>`);
  _push(ssrRenderComponent(_component_custom_button, {
    text: "\u0411\u0435\u0437 \u0442\u0435\u043A\u0441\u0442\u0430",
    classes: "blue",
    onClick: ($event) => this.$emit("clearDescription")
  }, null, _parent));
  _push(`</div></div></div><!--]-->`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dropdownTextarea.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const DropdownTextarea = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-18822841"]]);
const _sfc_main$1 = {
  name: "devRanger",
  // props: {
  //   min,
  //   max,
  // },
  data() {
    return {
      xModel: 300,
      yModel: 300,
      fontSizeModel: 26
    };
  },
  methods: {
    changeCoordinates() {
      this.$emit("textPosition", "description", this.xModel, this.yModel, this.fontSizeModel);
    }
  },
  mounted() {
    this.changeCoordinates();
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-89fee6e1><div class="range" data-v-89fee6e1><input type="range"${ssrRenderAttr("min", 0)}${ssrRenderAttr("max", 600)} step="4"${ssrRenderAttr("value", $data.xModel)} data-v-89fee6e1><input class="numbers"${ssrRenderAttr("value", $data.xModel)} data-v-89fee6e1></div><div class="range" data-v-89fee6e1><input type="range"${ssrRenderAttr("min", 0)}${ssrRenderAttr("max", 600)} step="4"${ssrRenderAttr("value", $data.yModel)} data-v-89fee6e1><input class="numbers"${ssrRenderAttr("value", $data.yModel)} data-v-89fee6e1></div><div class="range" data-v-89fee6e1><input type="range"${ssrRenderAttr("min", 10)}${ssrRenderAttr("max", 50)} step="2"${ssrRenderAttr("value", $data.fontSizeModel)} data-v-89fee6e1><input class="numbers"${ssrRenderAttr("value", $data.fontSizeModel)} data-v-89fee6e1></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/devRanger.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DevRanger = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-89fee6e1"]]);
const _sfc_main = {
  name: "generator",
  components: {
    DevRanger,
    DropdownDescription: __nuxt_component_1,
    CustomDropdown: __nuxt_component_3,
    CustomButton: __nuxt_component_4,
    ButtonCircle: __nuxt_component_0$1,
    DropdownTextarea,
    DropdownStickers: __nuxt_component_2
  },
  props: {
    fromwhomSelected: "fromman"
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
      currentTextFor: "",
      currentTextFrom: "",
      coordinates: {
        "description": { "x": 0, "y": 0 },
        "fromwhom": { "x": 0, "y": 0 },
        "forwhom": { "x": 0, "y": 0 },
        "sticker": { "x": 0, "y": 0 },
        "fontSize": 26
      },
      positions: {
        "sticker": {
          0: { x: 90, y: 223 },
          1: { x: 116, y: 119 },
          2: { x: 167, y: 118 },
          3: { x: 142, y: 57 },
          4: { x: 96, y: 55 },
          5: { x: 281, y: 70 },
          6: { x: 126, y: 327 },
          7: { x: 69, y: 325 }
        },
        "forwhom": {
          0: { x: 208, y: 504 },
          1: { x: 208, y: 504 },
          2: { x: 208, y: 504 },
          3: { x: 208, y: 504 },
          4: { x: 208, y: 504 },
          5: { x: 208, y: 504 },
          6: { x: 126, y: 504 },
          7: { x: 126, y: 504 }
        },
        "fromwhom": {
          0: { x: 208, y: 370 },
          1: { x: 208, y: 370 },
          2: { x: 208, y: 370 },
          3: { x: 208, y: 370 },
          4: { x: 208, y: 370 },
          5: { x: 208, y: 370 },
          6: { x: 126, y: 370 },
          7: { x: 126, y: 370 }
        },
        "description": {
          0: { x: 208, y: 370 },
          1: { x: 208, y: 370 },
          2: { x: 208, y: 370 },
          3: { x: 208, y: 370 },
          4: { x: 208, y: 370 },
          5: { x: 208, y: 370 },
          6: { x: 126, y: 370 },
          7: { x: 126, y: 370 }
        },
        "textFontSize": 26,
        "descriptionFontSize": 28
      },
      countBG: 8,
      // 8 фоновоых картинок
      currentBG: this.rand(8),
      // 8 фоновоых картинок
      fromwhom: {
        "fromman": [
          { name: "\u041E\u0442 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0433\u043E@\u043A\u043E\u0444\u0435-\u0431\u0440\u0435\u0439\u043A\u0435\u0440\u0430", id: 0 },
          { name: "\u041E\u0442 \u043B\u044E\u0431\u0438\u0442\u0435\u043B\u044F@\u043F\u0440\u0430\u0437\u0434\u043D\u0438\u0447\u043D\u044B\u0445 \u0443\u0433\u043E\u0449\u0435\u043D\u0438\u0439", id: 1 },
          { name: "\u041E\u0442 \u043D\u0430\u0434\u0451\u0436\u043D\u043E\u0433\u043E,@\u043A\u0430\u043A \u0441\u043A\u0430\u043B\u0430", id: 2 },
          { name: "\u041E\u0442 \u0442\u043E\u0447\u043D\u043E\u0433\u043E, \u043A\u0430\u043A \u043F\u0440\u043E\u0433\u043D\u043E\u0437@\u043F\u043E\u0433\u043E\u0434\u044B", id: 3 },
          { name: "\u041E\u0442 \u043D\u0430\u043F\u0430\u0440\u043D\u0438\u043A\u0430 \u0432 \u043B\u044E\u0431\u043E\u043C@\u0434\u0435\u043B\u0435", id: 4 },
          { name: "\u041E\u0442 \u0441\u043E\u0441\u0435\u0434\u0430@\u043F\u043E \u043A\u0430\u0440\u0443\u0441\u0435\u043B\u0438", id: 5 },
          { name: "\u041E\u0442 \u0441\u0432\u0438\u0434\u0435\u0442\u0435\u043B\u044F@\u0441\u043B\u0430\u0434\u043A\u043E\u0439 \u0432\u0430\u0442\u044B", id: 6 },
          { name: "\u041E\u0442 \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u0438\u043A\u0430@\u0432 \u043B\u044E\u0431\u0443\u044E \u0441\u0442\u043E\u0440\u043E\u043D\u0443", id: 7 },
          { name: "\u041E\u0442 \u0432\u0435\u0441\u0451\u043B\u043E\u0433\u043E@\u0438 \u043D\u0430\u0445\u043E\u0434\u0447\u0438\u0432\u043E\u0433\u043E", id: 8 }
        ],
        "fromwoman": [
          { name: "\u041E\u0442 \u043D\u0435\u043F\u0440\u0435\u0434\u0441\u043A\u0430\u0437\u0443\u0435\u043C\u043E\u0439,@\u043A\u0430\u043A \u0430\u043C\u0435\u0440\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0435 \u0433\u043E\u0440\u043A\u0438", id: 0 },
          { name: "\u041E\u0442 \u043A\u043E\u0440\u043E\u043B\u0435\u0432\u044B \u0433\u0440\u0443\u043F\u043F\u043E\u0432\u044B\u0445@\u0447\u0430\u0442\u043E\u0432", id: 1 },
          { name: "\u041E\u0442 \u043E\u0431\u043B\u0430\u0434\u0430\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u044B@\u043C\u0435\u0448\u043A\u0430 \u043C\u0435\u043C\u043E\u0432 \u0438 \u0448\u0443\u0442\u043E\u043A", id: 2 },
          { name: "\u041E\u0442 \u043D\u0430\u0434\u0451\u0436\u043D\u043E\u0439@\u043D\u0430\u043F\u0430\u0440\u043D\u0438\u0446\u044B \u0432 \u043B\u044E\u0431\u043E\u043C@\u0434\u0435\u043B\u0435", id: 3 },
          { name: "\u041E\u0442 \u0444\u0430\u043D\u0430\u0442\u043A\u0438 \u0445\u043E\u0440\u043E\u0448\u0435\u0433\u043E@\u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u0438\u044F", id: 4 },
          { name: "\u041E\u0442 \u043A\u043E\u043B\u043B\u0435\u0433\u0438@\u043F\u043E \u043E\u0444\u0438\u0441\u043D\u044B\u043C \u0448\u0443\u0442\u043A\u0430\u043C", id: 5 },
          { name: "\u041E\u0442 \u0431\u043E\u043B\u044C\u0448\u043E\u0439@\u043B\u044E\u0431\u0438\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u044B@\u043E\u0442\u043A\u0440\u044B\u0442\u043E\u043A", id: 6 }
        ]
      },
      forwhom: {
        "fromwoman": [
          { name: "\u0427\u0435\u043C\u043F\u0438\u043E\u043D\u0443 \u0432\u0441\u0435\u0445 \u0431\u0430\u0440\u043D\u044B\u0445@\u0438\u0433\u0440 \u043C\u0438\u0440\u0430", id: 0 },
          { name: "\u0423\u043A\u0440\u043E\u0442\u0438\u0442\u0435\u043B\u044E@\u0434\u0435\u0434\u043B\u0430\u0439\u043D\u043E\u0432", id: 1 },
          { name: "\u0411\u0435\u0437\u0443\u0434\u0435\u0440\u0436\u043D\u043E\u043C\u0443@\u043E\u043F\u0442\u0438\u043C\u0438\u0441\u0442\u0443", id: 2 },
          { name: "\u0413\u043B\u0430\u0432\u043D\u043E\u043C\u0443 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u0443@\u043F\u043E \u0432\u043D\u0435\u0437\u0430\u043F\u043D\u043E\u043C\u0443 \u0432\u0435\u0441\u0435\u043B\u044C\u044E", id: 3 },
          { name: "\u0417\u043D\u0430\u0442\u043E\u043A\u0443 \u0441\u043C\u0435\u0448\u043D\u044B\u0445@\u0438\u0441\u0442\u043E\u0440\u0438\u0439", id: 4 },
          { name: "\u0413\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0443@\u044F\u0440\u043A\u0438\u0445 \u0438\u0434\u0435\u0439", id: 5 },
          { name: "\u041F\u043E\u043A\u043E\u0440\u0438\u0442\u0435\u043B\u044E@\u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0445 \u0432\u0435\u0440\u0448\u0438\u043D", id: 6 },
          { name: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u0443@\u043F\u043E \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u0447\u043D\u043E\u0439@\u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0435", id: 7 },
          { name: "\u0414\u0443\u0448\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438", id: 8 },
          { name: "\u041B\u0443\u0447\u0448\u0435\u043C\u0443 \u0432 \u043C\u0438\u0440\u0435@\u043A\u043E\u043B\u043B\u0435\u0433\u0435", id: 9 }
        ],
        "fromman": [
          { name: "\u0413\u043B\u0430\u0432\u043D\u043E\u0439 \u043F\u043E@\u043F\u0440\u0430\u0437\u0434\u043D\u0438\u0447\u043D\u043E\u0439@\u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0435", id: 0 },
          { name: "\u0424\u0435\u0435 \u0446\u0432\u0435\u0442\u043E\u0432 \u0438 \u043A\u043E\u043D\u0444\u0435\u0442", id: 1 },
          { name: "\u0412\u0434\u043E\u0445\u043D\u043E\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0435@\u043D\u0430 \u043F\u043E\u0434\u0432\u0438\u0433\u0438", id: 2 },
          { name: "\u041A\u043E\u0440\u043E\u043B\u0435\u0432\u0435 \u0441\u043B\u0430\u0434\u043E\u0441\u0442\u0435\u0439", id: 3 },
          { name: "\u0413\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0443 \u0445\u043E\u0440\u043E\u0448\u0435\u0433\u043E@\u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u0438\u044F", id: 4 },
          { name: "\u0413\u043B\u0430\u0432\u043D\u043E\u0439 \u043F\u043E \u0443\u043B\u044B\u0431\u043A\u0430\u043C", id: 5 },
          { name: "\u041E\u0431\u043B\u0430\u0434\u0430\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0435@\u0447\u0435\u0440\u043D\u043E\u0433\u043E \u043F\u043E\u044F\u0441\u0430 \u043F\u043E@\u043A\u0440\u0435\u0430\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0438", id: 6 },
          { name: "\u0423\u043A\u0440\u043E\u0442\u0438\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0435@\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u043E\u0432", id: 7 },
          { name: "\u041B\u0443\u0447\u0448\u0435\u0439 \u0432 \u043C\u0438\u0440\u0435 \u043A\u043E\u043B\u043B\u0435\u0433\u0435", id: 8 }
        ]
      },
      descriptionModel: "",
      descriptions: {
        "fromman": [
          { name: "\u0422\u044B \u043B\u0443\u0447\u0448\u0435, \u0447\u0435\u043C \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u0447\u043D\u044B\u0439 \u0444\u0435\u0439\u0435\u0440\u0432\u0435\u0440\u043A. \u0412\u0435\u0434\u044C \u0442\u044B \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0432\u0435\u0442\u0438\u0448\u044C, \u043D\u043E \u0438 \u0441\u043E\u0433\u0440\u0435\u0432\u0430\u0435\u0448\u044C!" },
          { name: "\u041F\u0443\u0441\u0442\u044C \u043C\u0435\u0447\u0442\u044B \u0431\u0443\u0434\u0443\u0442 \u0441\u043B\u0430\u0449\u0435, \u0447\u0435\u043C \u0441\u043B\u0430\u0434\u043A\u0430\u044F \u0432\u0430\u0442\u0430!" },
          { name: "\u0422\u044B \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u0439 \u0444\u0435\u0439\u0435\u0440\u0432\u0435\u0440\u043A!" },
          { name: "\u0422\u044B \u0440\u0430\u0441\u043A\u0430\u0447\u0430\u0435\u0448\u044C \u043B\u044E\u0431\u043E\u0439 \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u043A \u043B\u0443\u0447\u0448\u0435, \u0447\u0435\u043C \u043A\u0430\u0447\u0435\u043B\u0438!" },
          { name: "\u041F\u0443\u0441\u0442\u044C \u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C \u0431\u0443\u0434\u0435\u0442 \u0441\u043B\u043E\u0432\u043D\u043E \u0432 \u043F\u0430\u0440\u043A\u0435 \u0440\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0439!" },
          { name: "\u0412\u044B\u0442\u044F\u043D\u0438 \u0441\u0447\u0430\u0441\u0442\u043B\u0438\u0432\u044B\u0439 \u0431\u0438\u043B\u0435\u0442\u0438\u043A, \u0447\u0442\u043E\u0431\u044B \u0441\u0431\u044B\u0432\u0430\u043B\u0438\u0441\u044C \u043C\u0435\u0447\u0442\u044B!" },
          { name: "\u041F\u0443\u0441\u0442\u044C \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u044B \u0443\u043B\u0435\u0442\u044F\u0442 \u043D\u0430 \u0432\u043E\u0437\u0434\u0443\u0448\u043D\u044B\u0445 \u0448\u0430\u0440\u0438\u043A\u0430\u0445!" },
          { name: "\u0421 \u0442\u043E\u0431\u043E\u0439 \u043A\u043E\u043C\u043D\u0430\u0442\u0430 \u0441\u0442\u0440\u0430\u0445\u0430 \u043F\u0440\u0435\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u043A\u043E\u043C\u043D\u0430\u0442\u0443 \u0441\u043C\u0435\u0445\u0430!" },
          { name: "\u041B\u044E\u0431\u043E\u0439 \u0432\u043E\u043F\u0440\u043E\u0441 \u0440\u0435\u0448\u0430\u0435\u0442\u0441\u044F, \u0435\u0441\u043B\u0438 \u0437\u0430 \u0434\u0435\u043B\u043E \u0431\u0435\u0440\u0451\u0448\u044C\u0441\u044F \u0442\u044B \u043B\u0438\u0447\u043D\u043E!" },
          { name: "\u042F\u0440\u043A\u0438\u0445 \u043F\u043E\u0431\u0435\u0434 \u0432 \u043B\u044E\u0431\u043E\u043C \u0434\u0435\u043B\u0435!" },
          { name: "\u0413\u043E\u043B\u043E\u0432\u043E\u043A\u0440\u0443\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u0443\u0441\u043F\u0435\u0445\u0430 \u0432\u043E \u0432\u0441\u0451\u043C!" },
          { name: "\u041D\u044B\u0440\u044F\u0439 \u0432 \u043F\u0440\u0438\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F, \u0431\u0443\u0434\u044C \u043D\u0430 \u043F\u043E\u0437\u0438\u0442\u0438\u0432\u0435!" },
          { name: "\u0422\u0432\u043E\u044F \u044D\u043D\u0435\u0440\u0433\u0438\u044F \u0437\u0430\u0440\u044F\u0436\u0430\u0435\u0442 \u0441\u0442\u0430\u0434\u0438\u043E\u043D\u044B!" }
        ],
        "fromwoman": [
          { name: "\u0421 \u0442\u043E\u0431\u043E\u0439 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u0435\u0435, \u0447\u0435\u043C \u043D\u0430 \u0441\u0430\u043C\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u043C \u043A\u043E\u043B\u0435\u0441\u0435 \u043E\u0431\u043E\u0437\u0440\u0435\u043D\u0438\u044F!" },
          { name: "\u0410\u0437\u0430\u0440\u0442 \u2013 \u044D\u0442\u043E \u0442\u0432\u043E\u0451 \u0432\u0442\u043E\u0440\u043E\u0435 \u0438\u043C\u044F. \u041F\u0443\u0441\u0442\u044C \u0442\u0435\u0431\u0435 \u0432\u0435\u0437\u0435\u0442 \u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C!" },
          { name: "\u041A\u043E\u0433\u0434\u0430 \u0442\u044B \u0440\u044F\u0434\u043E\u043C, \u0441\u043B\u043E\u0436\u043D\u043E\u0435 \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u043F\u0440\u043E\u0441\u0442\u044B\u043C!" },
          { name: "\u0422\u0432\u043E\u0438 \u0438\u0434\u0435\u0438 \u043F\u0440\u043E\u0441\u0442\u043E \u0443\u043B\u0435\u0442!" },
          { name: "\u0421 \u0442\u043E\u0431\u043E\u0439 \u043D\u0435 \u043D\u0443\u0436\u0435\u043D \u0431\u0438\u043B\u0435\u0442 \u0432 \u043F\u0430\u0440\u043A \u0440\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0439!" },
          { name: "\u0422\u044B \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u0439 \u0432\u0443\u043B\u043A\u0430\u043D \u0438\u0434\u0435\u0439!" },
          { name: "\u041F\u0443\u0441\u0442\u044C \u043C\u0435\u0447\u0442\u044B \u0432\u0434\u043E\u0445\u043D\u043E\u0432\u043B\u044F\u044E\u0442 \u0442\u0435\u0431\u044F \u0438 \u043B\u044E\u0434\u0435\u0439 \u0432\u043E\u043A\u0440\u0443\u0433!" },
          { name: "\u0413\u043E\u043B\u043E\u0432\u043E\u043A\u0440\u0443\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0443\u0441\u043F\u0435\u0445\u043E\u0432 \u0432\u043E \u0432\u0441\u0435\u043C!" },
          { name: "\u041F\u0443\u0441\u0442\u044C \u0443\u0434\u0430\u0447\u0430 \u0442\u0435\u0431\u0435 \u0443\u043B\u044B\u0431\u043D\u0451\u0442\u0441\u044F!" },
          { name: "\u041C\u0435\u0447\u0442\u0430\u0439 \u043F\u043E-\u043A\u0440\u0443\u043F\u043D\u043E\u043C\u0443, \u0432\u044B\u0438\u0433\u0440\u044B\u0432\u0430\u0439 \u0432\u043E \u0432\u0441\u0435\u043C!" },
          { name: "\u0413\u043B\u0430\u0432\u043D\u043E\u0435, \u0432\u0435\u0440\u0438\u0442\u044C \u0432 \u0441\u0435\u0431\u044F!" },
          { name: "\u0421 \u0442\u043E\u0431\u043E\u0439 \u2013 \u0445\u043E\u0442\u044C \u0432 \u043A\u043E\u043C\u043D\u0430\u0442\u0443 \u0441\u0442\u0440\u0430\u0445\u0430, \u0445\u043E\u0442\u044C \u0432 \u043A\u043E\u043C\u043D\u0430\u0442\u0443 \u0441\u043C\u0435\u0445\u0430!" }
        ]
      },
      selectedForwhom: {
        name: "\u0414\u043B\u044F \u043A\u043E\u0433\u043E"
      },
      selectedFromwhom: {
        name: "\u041E\u0442 \u043A\u043E\u0433\u043E"
      }
    };
  },
  methods: {
    textPosition(type, x, y, fontSize) {
      this.coordinates[type].x = x;
      this.coordinates[type].y = y;
    },
    editText() {
    },
    selectDescription(text) {
      this.drawDescription(text);
    },
    nextBg() {
      this.shiftCurrentBG("next");
      this.drawBg();
    },
    previousBg() {
      this.shiftCurrentBG("prev");
      this.drawBg();
    },
    randomImage() {
      this.shiftCurrentBG("rand");
      this.drawBg();
      this.drawSticker("sticker-" + this.rand(13));
      this.drawDescription(this.descriptions[this.fromwhomSelected][this.rand(this.descriptions[this.fromwhomSelected].length)].name);
      this.drawText(this.fromwhom[this.fromwhomSelected][this.rand(this.fromwhom[this.fromwhomSelected].length)].name, "from");
      this.drawText(this.forwhom[this.fromwhomSelected][this.rand(this.forwhom[this.fromwhomSelected].length)].name, "for");
    },
    drawBg() {
      let ctxBG = this.ctxBG;
      let bgImg = document.getElementById("bg-" + this.currentBG);
      this.clearCtx(ctxBG);
      ctxBG.drawImage(bgImg, 0, 0, this.canvasBG.width, this.canvasBG.height);
    },
    drawText(text, who = "for") {
      let ctx, x, y, fontSize, texts, maxLengthText;
      if (who == "for") {
        ctx = this.ctxFromWhom;
      } else {
        ctx = this.ctxForWhom;
      }
      x = Number(this.positions[who == "for" ? "forwhom" : "fromwhom"][this.currentBG].x);
      y = Number(this.positions[who == "for" ? "forwhom" : "fromwhom"][this.currentBG].y);
      fontSize = this.positions.textFontSize;
      texts = text.split("@");
      maxLengthText = this.getMaxLengText(texts);
      this.clearCtx(ctx);
      const gradient = ctx.createLinearGradient(x + 20, 0, x + 358, 0);
      gradient.addColorStop(0.04, "rgba(31, 91, 215, 0.29)");
      gradient.addColorStop(0.9, "rgba(253, 138, 166, 0.13)");
      gradient.addColorStop(0.6, "#1897F8");
      ctx.beginPath();
      ctx.roundRect(x - fontSize - 20, y - fontSize - 20, maxLengthText * (fontSize - 8) + 30, fontSize * 3 + texts.length * fontSize / 2, 50);
      ctx.fillStyle = gradient;
      ctx.fill();
      texts.forEach(function(text2, index) {
        ctx.font = "400 " + fontSize + "px GT Eesti Pro Text";
        ctx.fillStyle = "#ffffff";
        let drawX;
        drawX = text2.length != maxLengthText ? x + fontSize * (maxLengthText - text2.length) / 4 : x + 0;
        console.log(x);
        console.log(y);
        ctx.fillText(text2, drawX, y + (fontSize + 3) * index);
      });
    },
    drawDescription(text = "") {
      let ctx, x, y, fontSize, texts, maxLengthText;
      ctx = this.ctxDescription;
      this.clearCtx(ctx);
      x = Number(this.positions["description"][this.currentBG].x);
      y = Number(this.positions["description"][this.currentBG].y);
      fontSize = this.positions.textFontSize;
      texts = text.split("@");
      maxLengthText = this.getMaxLengText(texts);
      const gradient = ctx.createLinearGradient(x + 20, 0, x + 358, 0);
      gradient.addColorStop(1, "rgba(109, 192, 255, 0.28)");
      gradient.addColorStop(0.29, "#1F5BD7");
      ctx.beginPath();
      ctx.roundRect(x - fontSize - 20, y - fontSize - 20, maxLengthText * (fontSize - 8) + 30, fontSize * 3 + texts.length * fontSize / 2, 50);
      ctx.fillStyle = gradient;
      ctx.fill();
      texts.forEach(function(text2, index) {
        ctx.font = "400 " + fontSize + "px GT Eesti Pro Text";
        ctx.fillStyle = "#ffffff";
        let drawX;
        drawX = text2.length != maxLengthText ? x + fontSize * (maxLengthText - text2.length) / 4 : x + 0;
        console.log(x);
        console.log(y);
        ctx.fillText(text2, drawX, y + (fontSize + 3) * index);
      });
      ctx.font = "400 3.354vw GT Eesti Pro Text";
      ctx.fillStyle = "#000000";
      ctx.fillText(text, 40, 120);
    },
    getMaxLengText(texts) {
      let max = 0;
      texts.forEach(function(text) {
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
    shiftCurrentBG(way = "next") {
      let result = this.currentBG;
      if (!way || way == "next") {
        if (result >= this.countBG - 1) {
          result = 0;
        } else {
          result++;
        }
      } else if (way == "rand") {
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
    rand(max) {
      return Math.floor(Math.floor(Math.random() * max));
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
      this.$emit("updatePage", "finish");
    },
    clearLayers() {
      this.clearSticker();
      this.clearDescription();
      this.clearForwhom();
      this.clearFromwhom();
    }
  },
  mounted() {
    this.canvasBG = document.getElementById("img-background");
    this.ctxBG = this.canvasBG.getContext("2d");
    this.canvasFromWhom = document.getElementById("img-fromwhom");
    this.ctxFromWhom = this.canvasFromWhom.getContext("2d");
    this.canvasForWhom = document.getElementById("img-forwhom");
    this.ctxForWhom = this.canvasForWhom.getContext("2d");
    this.canvasDescription = document.getElementById("img-description");
    this.ctxDescription = this.canvasDescription.getContext("2d");
    this.canvasResult = document.getElementById("img-result");
    this.ctxResult = this.canvasResult.getContext("2d");
    this.canvasSticker = document.getElementById("img-sticker");
    this.ctxSticker = this.canvasSticker.getContext("2d");
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_button_circle = __nuxt_component_0$1;
  const _component_dropdown_description = __nuxt_component_1;
  const _component_dropdown_stickers = __nuxt_component_2;
  const _component_custom_dropdown = __nuxt_component_3;
  const _component_custom_button = __nuxt_component_4;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-generator" }, _attrs))} data-v-8fb8a9a3><div class="content-generator__wrapper" data-v-8fb8a9a3><div class="generator-content" data-v-8fb8a9a3><div class="generator-content__left" data-v-8fb8a9a3><div class="text__select-bg" data-v-8fb8a9a3> \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u043E\u043D </div><div class="canvas-wrapper" data-v-8fb8a9a3><canvas class="canvas-layer" style="${ssrRenderStyle({ "z-index": "1" })}" id="img-background" height="600" width="600" data-v-8fb8a9a3>\u0412\u0430\u0448 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u044D\u0442\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435. \u041E\u0431\u043D\u043E\u0432\u0438\u0442\u0435\u0441\u044C \u0438\u043B\u0438 \u0441\u043A\u0430\u0447\u0430\u0439\u0442\u0435 \u0434\u0440\u0443\u0433\u043E\u0439 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 </canvas><canvas class="canvas-layer" style="${ssrRenderStyle({ "z-index": "2" })}" id="img-sticker" height="600" width="600" data-v-8fb8a9a3></canvas><canvas class="canvas-layer" style="${ssrRenderStyle({ "z-index": "3" })}" id="img-description" height="600" width="600" data-v-8fb8a9a3></canvas><canvas class="canvas-layer" style="${ssrRenderStyle({ "z-index": "4" })}" id="img-fromwhom" height="600" width="600" data-v-8fb8a9a3></canvas><canvas class="canvas-layer" style="${ssrRenderStyle({ "z-index": "5" })}" id="img-forwhom" height="600" width="600" data-v-8fb8a9a3></canvas><div style="${ssrRenderStyle({ "min-height": "3vw", "min-width": "3vw" })}" data-v-8fb8a9a3></div></div><div class="control-panel" data-v-8fb8a9a3>`);
  _push(ssrRenderComponent(_component_button_circle, {
    icon: "prev",
    onClick: $options.previousBg
  }, null, _parent));
  _push(ssrRenderComponent(_component_button_circle, {
    icon: "rand",
    onClick: $options.randomImage,
    style: { "margin-top": "2.1vw" }
  }, null, _parent));
  _push(ssrRenderComponent(_component_button_circle, {
    icon: "next",
    onClick: $options.nextBg
  }, null, _parent));
  _push(`</div><div style="${ssrRenderStyle({ "display": "none" })}" data-v-8fb8a9a3><!--[-->`);
  ssrRenderList(this.countBG, (i) => {
    _push(`<img${ssrRenderAttr("id", "bg-" + (i - 1))}${ssrRenderAttr("src", "/backgrounds/background-" + (i - 1) + ".png")}${ssrRenderAttr("alt", "/background/background-" + (i - 1) + ".png")} data-v-8fb8a9a3>`);
  });
  _push(`<!--]--></div></div><div class="generator-content__right" data-v-8fb8a9a3><div class="description" data-v-8fb8a9a3>`);
  _push(ssrRenderComponent(_component_dropdown_description, {
    text: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u0435\u043A\u0441\u0442",
    onClearDescription: $options.clearDescription,
    onSelectDescription: $options.selectDescription,
    options: $data.descriptions[$props.fromwhomSelected],
    closeOnOutsideClick: true
  }, null, _parent));
  _push(`</div><div class="description" data-v-8fb8a9a3>`);
  _push(ssrRenderComponent(_component_dropdown_stickers, {
    text: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043D\u0430\u043A\u043B\u0435\u0439\u043A\u0443",
    onClearSticker: $options.clearSticker,
    onDrawSticker: $options.drawSticker
  }, null, _parent));
  _push(`</div><div data-v-8fb8a9a3><div class="zi-200" data-v-8fb8a9a3>`);
  _push(ssrRenderComponent(_component_custom_dropdown, {
    onDrawText: $options.drawText,
    options: $data.forwhom[$props.fromwhomSelected],
    selected: "\u041A\u043E\u043C\u0443",
    placeholder: "\u041A\u043E\u043C\u0443",
    who: "for",
    closeOnOutsideClick: true
  }, null, _parent));
  _push(`</div><div class="zi-100" data-v-8fb8a9a3>`);
  _push(ssrRenderComponent(_component_custom_dropdown, {
    onDrawText: $options.drawText,
    options: $data.fromwhom[$props.fromwhomSelected],
    selected: "\u041E\u0442 \u043A\u043E\u0433\u043E",
    placeholder: "\u041E\u0442 \u043A\u043E\u0433\u043E",
    who: "from",
    closeOnOutsideClick: true
  }, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_custom_button, {
    text: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u043A\u0443",
    classes: "create",
    onClick: ($event) => $options.nextPage()
  }, null, _parent));
  _push(`</div></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/generator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Generator = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-8fb8a9a3"]]);

export { Generator as default };
//# sourceMappingURL=generator-b9e22b09.mjs.map
