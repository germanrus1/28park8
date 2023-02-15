import { useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main$1 = {
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
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "btn-group" }, _attrs))}>`);
  if ($data.selectedOption.name !== void 0) {
    _push(`<li class="dropdown-toggle">${ssrInterpolate($data.selectedOption.name)} <span class="caret"></span></li>`);
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/vue-dropdowns/Dropdown.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const dropdown = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  name: "generator",
  components: {
    "dropdown": dropdown
  },
  data() {
    return {
      radiobuttonModel: null,
      isActiveModal: false
    };
  },
  methods: {
    nextPage() {
      if (!this.radiobuttonModel) {
        this.isActiveModal = true;
      } else {
        this.$emit("updateSelected", this.radiobuttonModel);
        this.$emit("updatePage", "generator");
      }
    },
    toggleError() {
      this.isActiveModal = this.isActiveModal ? false : true;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-index" }, _attrs))} data-v-b8633268><div class="wrapper" data-v-b8633268><div class="${ssrRenderClass([{ active: $data.isActiveModal }, "error"])}" data-v-b8633268><div class="error__description" data-v-b8633268> \u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C, \u0434\u043B\u044F \u043A\u043E\u0433\u043E \u043E\u0442\u043A\u0440\u044B\u0442\u043A\u0430 </div><div class="error__content" data-v-b8633268><button class="error__content_button" data-v-b8633268>\u041E\u043A</button></div></div><div class="description" data-v-b8633268><div class="label" data-v-b8633268>\u041F\u0440\u0438\u0432\u0435\u0442!</div><div class="text" data-v-b8633268> \u042D\u0442\u043E digital-\u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440 \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u0447\u043D\u044B\u0445 \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u043A \u0438\u0437 \u043D\u0430\u0448\u0435\u0433\u043E \u043F\u0430\u0440\u043A\u0430 \u0440\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0439. \u0417\u0434\u0435\u0441\u044C \u0432\u044B \u0441\u043C\u043E\u0436\u0435\u0442\u0435 \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u0440\u0435\u0430\u0442\u0438\u0432\u043D\u0443\u044E \u043F\u043E\u0437\u0434\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u0443\u044E \u043E\u0442\u043A\u0440\u044B\u0442\u043A\u0443 \u0438 \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F<br data-v-b8633268> \u0435\u0439 \u0441 \u043A\u043E\u043B\u043B\u0435\u0433\u0430\u043C\u0438 \u0438\u043B\u0438 \u0431\u043B\u0438\u0437\u043A\u0438\u043C\u0438 \u043B\u044E\u0434\u044C\u043C\u0438. </div></div><div class="for-whom" data-v-b8633268>\u0414\u043B\u044F \u043A\u043E\u0433\u043E \u043E\u0442\u043A\u0440\u044B\u0442\u043A\u0430?</div><div class="radiobutton-content" data-v-b8633268><div class="radiobutton-button" data-v-b8633268><label class="radiobutton" data-v-b8633268><input type="radio" name="forwhom" data-v-b8633268><span class="checkmark left" data-v-b8633268></span></label><span class="radiobutton-label right" data-v-b8633268>\u0414\u041B\u042F \u041D\u0415\u0413\u041E</span></div><div class="radiobutton-button" data-v-b8633268><label class="radiobutton" data-v-b8633268><input type="radio" name="forwhom" data-v-b8633268><span class="checkmark right" data-v-b8633268></span></label><span class="radiobutton-label left" data-v-b8633268>\u0414\u041B\u042F \u041D\u0415\u0401</span></div></div><div class="button-content" data-v-b8633268><button class="button generate" data-v-b8633268>\u0421\u043E\u0437\u0434\u0430\u0442\u044C<br data-v-b8633268>\u043E\u0442\u043A\u0440\u044B\u0442\u043A\u0443</button></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b8633268"]]);

export { Index as default };
//# sourceMappingURL=index-e1008122.mjs.map
