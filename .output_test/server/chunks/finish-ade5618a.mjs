import { _ as __nuxt_component_4 } from './customButton-1555bca0.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = {
  data() {
    return {
      canvasResult: null
    };
  },
  methods: {
    downloadResult() {
      let dataURL = this.canvasResult.toDataURL("image/png");
      let link = document.getElementById("downloadResult");
      link.href = dataURL;
      link.download = "\u041E\u0442\u043A\u0440\u044B\u0442\u043A\u0430.png";
      link.click();
    }
  },
  mounted() {
    this.canvasResult = document.getElementById("img-result");
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_custom_button = __nuxt_component_4;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-generator" }, _attrs))} data-v-f293c8cb><div class="content-generator__wrapper" data-v-f293c8cb><div class="generator-content" data-v-f293c8cb><div class="generator-content__left" data-v-f293c8cb><div class="canvas-wrapper" data-v-f293c8cb><canvas id="img-result" style="${ssrRenderStyle({})}" height="600" width="600" data-v-f293c8cb>\u0412\u0430\u0448 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u044D\u0442\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435. \u041E\u0431\u043D\u043E\u0432\u0438\u0442\u0435\u0441\u044C \u0438\u043B\u0438 \u0441\u043A\u0430\u0447\u0430\u0439\u0442\u0435 \u0434\u0440\u0443\u0433\u043E\u0439 \u0431\u0440\u0430\u0443\u0437\u0435\u0440</canvas></div></div><div class="generator-content__right" data-v-f293c8cb><a href="https://krugosvetka.nspk.ru/dash" target="_blank" data-v-f293c8cb><div class="description-img" data-v-f293c8cb></div></a><div class="description-text_top" data-v-f293c8cb> \u0423 \u0432\u0430\u0441 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0430\u0441\u044C \u043E\u0442\u043B\u0438\u0447\u043D\u0430\u044F \u043E\u0442\u043A\u0440\u044B\u0442\u043A\u0430! </div><div class="description-text_bottom" data-v-f293c8cb> \u041D\u0435 \u0437\u0430\u0431\u0443\u0434\u044C\u0442\u0435 \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F \u0435\u0439 <br data-v-f293c8cb>\u0441 \u043A\u043E\u043B\u043B\u0435\u0433\u0430\u043C\u0438 \u043D\u0430 \xAB\u041A\u0440\u0443\u0433\u043E\u0441\u0432\u0435\u0442\u043A\u0435\xBB. <br data-v-f293c8cb><br data-v-f293c8cb> \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0435 \u0441\u0432\u043E\u044E \u043E\u0442\u043A\u0440\u044B\u0442\u043A\u0443 \u0438 \u043F\u043E\u0437\u0434\u0440\u0430\u0432\u044C\u0442\u0435 \u0434\u0440\u0443\u0437\u0435\u0439 \u0438 \u0431\u043B\u0438\u0437\u043A\u0438\u0445. </div><div data-v-f293c8cb>`);
  _push(ssrRenderComponent(_component_custom_button, {
    text: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
    onClick: $options.downloadResult,
    classes: "create"
  }, null, _parent));
  _push(ssrRenderComponent(_component_custom_button, {
    text: "\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0435\u0449\u0435 \u0440\u0430\u0437",
    onClick: ($event) => this.$emit("updatePage", "index"),
    classes: "again"
  }, null, _parent));
  _push(`<a id="downloadResult" target="_blank" class="download" style="${ssrRenderStyle({ "display": "none" })}" data-v-f293c8cb>\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</a></div></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/finish.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Finish = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f293c8cb"]]);

export { Finish as default };
//# sourceMappingURL=finish-ade5618a.mjs.map
