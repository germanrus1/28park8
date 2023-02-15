import { defineComponent, ref, createElementBlock, mergeProps, useSSRContext } from 'vue';
import Index from './index-e1008122.mjs';
import Generator from './generator-b9e22b09.mjs';
import Finish from './finish-ade5618a.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
import './customButton-1555bca0.mjs';

const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const _sfc_main = {
  components: {
    Index,
    Generator,
    Finish
  },
  data() {
    return {
      currentPage: "index",
      fromwhomSelected: "fromman"
    };
  },
  methods: {
    updatePage(page) {
      this.currentPage = page ? page : "index";
      if (this.currentPage == "generator") {
        this.$refs.generator.clearLayers();
      }
    },
    updateSelected(fromwhom) {
      this.fromwhomSelected = fromwhom != null ? fromwhom : "fromman";
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_client_only = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_client_only, { placeholder: "loading" }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-d057824e.mjs.map
