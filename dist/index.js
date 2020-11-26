//
//
//
//
//
//

var script = {
  name: 'NotLogin',
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm._m(0)
};
var __vue_staticRenderFns__ = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "not-login__wrapper" }, [
      _c("p", [_vm._v("로그인 후 이용할 수 있습니다")])
    ])
  }
];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-12f838a8_0", { source: ".not-login__wrapper[data-v-12f838a8] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.not-login__wrapper > p[data-v-12f838a8] {\n  font-size: 24px;\n  font-family: \"AppleSDGothicNeo\";\n  color: #ff6969;\n}\n\n/*# sourceMappingURL=index.vue.map */", map: {"version":3,"sources":["index.vue"],"names":[],"mappings":"AAAA;EACE,WAAW;EACX,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,eAAe;EACf,+BAA+B;EAC/B,cAAc;AAChB;;AAEA,oCAAoC","file":"index.vue","sourcesContent":[".not-login__wrapper {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.not-login__wrapper > p {\n  font-size: 24px;\n  font-family: \"AppleSDGothicNeo\";\n  color: #ff6969;\n}\n\n/*# sourceMappingURL=index.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-12f838a8";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
  name: 'ChattingText',
  data() {
    return {
      chatData: new Array(20).fill(1).map((_, index) => ({
        id: index + 1,
        content: '추후 개발 진행될 서비스 입니다.',
        to: index % 3 ? 'admin' : '',
        created_at: '2020년 10월 24일 15시 51분',
      })),
    };
  },
  mounted() {
    this.$refs.infinityScrollRef.scrollTo(
      0,
      this.$refs.infinityScrollRef.scrollHeight
    );
  },
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { ref: "infinityScrollRef", staticClass: "chatting-text__wrapper" },
    [
      !_vm.chatData || !_vm.chatData.length
        ? _c("p", [_vm._v("Frame에 궁금한점이 있으신가요?")])
        : _vm._e(),
      _vm._v(" "),
      _vm._l(_vm.chatData, function(data, index) {
        return _c(
          "div",
          {
            key: data.id,
            class:
              data.to === "admin"
                ? "chat-bubble isAdmin " +
                  (_vm.chatData[index + 1]
                    ? _vm.chatData[index + 1].to !== data.to
                      ? "lastChat"
                      : ""
                    : "")
                : "chat-bubble " +
                  (_vm.chatData[index + 1]
                    ? _vm.chatData[index + 1].to !== data.to
                      ? "lastChat"
                      : ""
                    : "")
          },
          [
            _c("p", [
              _vm._v(_vm._s(data.content)),
              _c("span", { domProps: { textContent: _vm._s(data.created_at) } })
            ])
          ]
        )
      })
    ],
    2
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-bd769b5c_0", { source: ".chatting-text__wrapper[data-v-bd769b5c] {\n  flex: 1 1 0%;\n  max-height: 325px;\n  overflow-y: scroll;\n  display: flex;\n  flex-direction: column;\n}\n.chatting-text__wrapper[data-v-bd769b5c]::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n.chatting-text__wrapper[data-v-bd769b5c]::-webkit-scrollbar-thumb {\n  border-radius: 8px;\n  background-color: #0f4c81;\n}\n.chatting-text__wrapper[data-v-bd769b5c]::-webkit-scrollbar-track-piece {\n  background-color: white;\n}\n.chatting-text__wrapper > p[data-v-bd769b5c] {\n  width: 100%;\n  text-align: center;\n  font-family: \"AppleSDGothicNeo\";\n  font-size: 14px;\n  color: #0f4c81;\n}\n.chatting-text__wrapper > .chat-bubble[data-v-bd769b5c] {\n  width: 100%;\n  margin-top: 4px;\n  display: flex;\n  justify-content: flex-end;\n}\n.chatting-text__wrapper > .chat-bubble.lastChat[data-v-bd769b5c] {\n  margin-bottom: 16px;\n}\n.chatting-text__wrapper > .chat-bubble > p[data-v-bd769b5c] {\n  position: relative;\n  width: fit-content;\n  max-width: 258px;\n  min-height: 36px;\n  word-break: break-all;\n  padding: 10px 12px;\n  box-sizing: border-box;\n  font-size: 14px;\n  font-family: \"AppleSDGothicNeo\";\n  margin: 0;\n  background-color: #0f4c81;\n  color: #ffffff;\n  border-radius: 12px;\n  border-bottom-right-radius: 0;\n}\n.chatting-text__wrapper > .chat-bubble > p:hover > span[data-v-bd769b5c] {\n  display: block;\n}\n.chatting-text__wrapper > .chat-bubble > p > span[data-v-bd769b5c] {\n  display: none;\n  font-size: 11px;\n  color: white;\n  max-width: 80px;\n  background: black;\n  padding: 5px;\n  position: absolute;\n  border-radius: 2px;\n  top: 50%;\n  transform: translateY(-50%);\n  left: -100px;\n}\n.chatting-text__wrapper > .chat-bubble > p > span[data-v-bd769b5c]::after {\n  left: 100%;\n  top: 50%;\n  border-style: solid;\n  border-image: initial;\n  content: \" \";\n  height: 0px;\n  width: 0px;\n  position: absolute;\n  pointer-events: none;\n  border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) black;\n  border-width: 6px;\n  margin-top: -6px;\n}\n.chatting-text__wrapper > .chat-bubble.isAdmin[data-v-bd769b5c] {\n  justify-content: flex-start;\n}\n.chatting-text__wrapper > .chat-bubble.isAdmin > p[data-v-bd769b5c] {\n  background-color: #ededed;\n  color: #000000;\n  border-bottom-right-radius: 12px;\n  border-bottom-left-radius: 0;\n}\n.chatting-text__wrapper > .chat-bubble.isAdmin > p:hover > span[data-v-bd769b5c] {\n  display: block;\n}\n.chatting-text__wrapper > .chat-bubble.isAdmin > p > span[data-v-bd769b5c] {\n  display: none;\n  font-size: 11px;\n  color: white;\n  max-width: 80px;\n  background: black;\n  padding: 5px;\n  position: absolute;\n  border-radius: 2px;\n  top: 50%;\n  transform: translateY(-50%);\n  right: -100px;\n  left: auto;\n}\n.chatting-text__wrapper > .chat-bubble.isAdmin > p > span[data-v-bd769b5c]::after {\n  left: auto;\n  right: 100%;\n  top: 50%;\n  border-style: solid;\n  border-image: initial;\n  content: \" \";\n  height: 0px;\n  width: 0px;\n  position: absolute;\n  pointer-events: none;\n  border-color: rgba(0, 0, 0, 0) black rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);\n  border-width: 6px;\n  margin-top: -6px;\n}\n\n/*# sourceMappingURL=index.vue.map */", map: {"version":3,"sources":["index.vue","/Users/iuchan/Desktop/Frame-Frontend-QnA/src/views/chattingText/index.vue"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,aAAa;EACb,sBAAsB;AACxB;AACA;EACE,WAAW;EACX,YAAY;AACd;AACA;EACE,kBAAkB;EAClB,yBAAyB;AAC3B;AACA;EACE,uBAAuB;AACzB;AACA;EACE,WAAW;EACX,kBAAkB;EAClB,+BAA+B;EAC/B,eAAe;EACf,cAAc;AAChB;AACA;EACE,WAAW;EACX,eAAe;EACf,aAAa;EACb,yBAAyB;AAC3B;AACA;EACE,mBAAmB;AACrB;AACA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,gBAAgB;EAChB,gBAAgB;EAChB,qBAAqB;EACrB,kBAAkB;EAClB,sBAAsB;EACtB,eAAe;EACf,+BAA+B;EAC/B,SAAS;ECQX,yBAAA;EDNE,cAAc;EACd,mBAAmB;EACnB,6BAA6B;AAC/B;AACA;EACE,cAAc;AAChB;AACA;EACE,aAAa;EACb,eAAe;EACf,YAAY;EACZ,eAAe;EACf,iBAAiB;EACjB,YAAY;EACZ,kBAAkB;EAClB,kBAAkB;EAClB,QAAQ;EACR,2BAA2B;EAC3B,YAAY;AACd;AACA;EACE,UAAU;EACV,QAAQ;EACR,mBAAmB;EACnB,qBAAqB;EACrB,YAAY;EACZ,WAAW;EACX,UAAU;EACV,kBAAkB;EAClB,oBAAoB;EACpB,sEAAsE;EACtE,iBAAiB;EACjB,gBAAgB;AAClB;AACA;EACE,2BAA2B;AAC7B;AACA;EACE,yBAAyB;EACzB,cAAc;EACd,gCAAgC;EAChC,4BAA4B;AAC9B;AACA;EACE,cAAc;AAChB;AACA;EACE,aAAa;EACb,eAAe;EACf,YAAY;EACZ,eAAe;EACf,iBAAiB;EACjB,YAAY;EACZ,kBAAkB;EAClB,kBAAkB;EAClB,QAAQ;EACR,2BAA2B;EAC3B,aAAa;EACb,UAAU;AACZ;AACA;EACE,UAAU;EACV,WAAW;EACX,QAAQ;EACR,mBAAmB;EACnB,qBAAqB;EACrB,YAAY;EACZ,WAAW;EACX,UAAU;EACV,kBAAkB;EAClB,oBAAoB;EACpB,sEAAsE;EACtE,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA,oCAAoC","file":"index.vue","sourcesContent":[".chatting-text__wrapper {\n  flex: 1 1 0%;\n  max-height: 325px;\n  overflow-y: scroll;\n  display: flex;\n  flex-direction: column;\n}\n.chatting-text__wrapper::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n.chatting-text__wrapper::-webkit-scrollbar-thumb {\n  border-radius: 8px;\n  background-color: #0f4c81;\n}\n.chatting-text__wrapper::-webkit-scrollbar-track-piece {\n  background-color: white;\n}\n.chatting-text__wrapper > p {\n  width: 100%;\n  text-align: center;\n  font-family: \"AppleSDGothicNeo\";\n  font-size: 14px;\n  color: #0f4c81;\n}\n.chatting-text__wrapper > .chat-bubble {\n  width: 100%;\n  margin-top: 4px;\n  display: flex;\n  justify-content: flex-end;\n}\n.chatting-text__wrapper > .chat-bubble.lastChat {\n  margin-bottom: 16px;\n}\n.chatting-text__wrapper > .chat-bubble > p {\n  position: relative;\n  width: fit-content;\n  max-width: 258px;\n  min-height: 36px;\n  word-break: break-all;\n  padding: 10px 12px;\n  box-sizing: border-box;\n  font-size: 14px;\n  font-family: \"AppleSDGothicNeo\";\n  margin: 0;\n  background-color: #0f4c81;\n  color: #ffffff;\n  border-radius: 12px;\n  border-bottom-right-radius: 0;\n}\n.chatting-text__wrapper > .chat-bubble > p:hover > span {\n  display: block;\n}\n.chatting-text__wrapper > .chat-bubble > p > span {\n  display: none;\n  font-size: 11px;\n  color: white;\n  max-width: 80px;\n  background: black;\n  padding: 5px;\n  position: absolute;\n  border-radius: 2px;\n  top: 50%;\n  transform: translateY(-50%);\n  left: -100px;\n}\n.chatting-text__wrapper > .chat-bubble > p > span::after {\n  left: 100%;\n  top: 50%;\n  border-style: solid;\n  border-image: initial;\n  content: \" \";\n  height: 0px;\n  width: 0px;\n  position: absolute;\n  pointer-events: none;\n  border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) black;\n  border-width: 6px;\n  margin-top: -6px;\n}\n.chatting-text__wrapper > .chat-bubble.isAdmin {\n  justify-content: flex-start;\n}\n.chatting-text__wrapper > .chat-bubble.isAdmin > p {\n  background-color: #ededed;\n  color: #000000;\n  border-bottom-right-radius: 12px;\n  border-bottom-left-radius: 0;\n}\n.chatting-text__wrapper > .chat-bubble.isAdmin > p:hover > span {\n  display: block;\n}\n.chatting-text__wrapper > .chat-bubble.isAdmin > p > span {\n  display: none;\n  font-size: 11px;\n  color: white;\n  max-width: 80px;\n  background: black;\n  padding: 5px;\n  position: absolute;\n  border-radius: 2px;\n  top: 50%;\n  transform: translateY(-50%);\n  right: -100px;\n  left: auto;\n}\n.chatting-text__wrapper > .chat-bubble.isAdmin > p > span::after {\n  left: auto;\n  right: 100%;\n  top: 50%;\n  border-style: solid;\n  border-image: initial;\n  content: \" \";\n  height: 0px;\n  width: 0px;\n  position: absolute;\n  pointer-events: none;\n  border-color: rgba(0, 0, 0, 0) black rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);\n  border-width: 6px;\n  margin-top: -6px;\n}\n\n/*# sourceMappingURL=index.vue.map */","<template>\n  <div class=\"chatting-text__wrapper\" ref=\"infinityScrollRef\">\n    <p v-if=\"!chatData || !chatData.length\">Frame에 궁금한점이 있으신가요?</p>\n    <div\n      v-for=\"(data, index) in chatData\"\n      :key=\"data.id\"\n      :class=\"\n        data.to === 'admin'\n          ? `chat-bubble isAdmin ${\n              chatData[index + 1]\n                ? chatData[index + 1].to !== data.to\n                  ? 'lastChat'\n                  : ''\n                : ''\n            }`\n          : `chat-bubble ${\n              chatData[index + 1]\n                ? chatData[index + 1].to !== data.to\n                  ? 'lastChat'\n                  : ''\n                : ''\n            }`\n      \"\n    >\n      <p>{{ data.content }}<span v-text=\"data.created_at\" /></p>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'ChattingText',\n  data() {\n    return {\n      chatData: new Array(20).fill(1).map((_, index) => ({\n        id: index + 1,\n        content: '추후 개발 진행될 서비스 입니다.',\n        to: index % 3 ? 'admin' : '',\n        created_at: '2020년 10월 24일 15시 51분',\n      })),\n    };\n  },\n  mounted() {\n    this.$refs.infinityScrollRef.scrollTo(\n      0,\n      this.$refs.infinityScrollRef.scrollHeight\n    );\n  },\n};\n</script>\n\n<style lang=\"scss\" scoped>\n@import './style';\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-bd769b5c";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

var chattingImage = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%3E%20%20%3Cg%20id%3D%22prefix__forum-black-48dp%22%20transform%3D%22translate%28-1%20-1%29%22%3E%20%20%20%20%3Cpath%20id%3D%22%ED%8C%A8%EC%8A%A4_49%22%20data-name%3D%22%ED%8C%A8%EC%8A%A4%2049%22%20d%3D%22M0%2C0H40V40H0Z%22%20transform%3D%22translate%281%201%29%22%20fill%3D%22none%22%2F%3E%20%20%20%20%3Cpath%20id%3D%22%ED%8C%A8%EC%8A%A4_50%22%20data-name%3D%22%ED%8C%A8%EC%8A%A4%2050%22%20d%3D%22M34.4%2C9.2H32.6V23.6a1.8%2C1.8%2C0%2C0%2C1-1.8%2C1.8H9.2v1.8a3.611%2C3.611%2C0%2C0%2C0%2C3.6%2C3.6h18L38%2C38V12.8a3.611%2C3.611%2C0%2C0%2C0-3.6-3.6Zm-5.4%2C9V5.6A3.611%2C3.611%2C0%2C0%2C0%2C25.4%2C2H5.6A3.611%2C3.611%2C0%2C0%2C0%2C2%2C5.6V29l7.2-7.2H25.4A3.611%2C3.611%2C0%2C0%2C0%2C29%2C18.2Z%22%20transform%3D%22translate%281%201%29%22%20fill%3D%22%23fff%22%2F%3E%20%20%3C%2Fg%3E%3C%2Fsvg%3E";

var closeImage = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20id%3D%22prefix__clear-black-48dp%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%3E%20%20%20%20%3Cpath%20id%3D%22prefix__%ED%8C%A8%EC%8A%A4_51%22%20d%3D%22M0%200h40v40H0z%22%20data-name%3D%22%ED%8C%A8%EC%8A%A4%2051%22%20style%3D%22fill%3Anone%22%2F%3E%20%20%20%20%3Cpath%20id%3D%22prefix__%ED%8C%A8%EC%8A%A4_52%22%20d%3D%22M34.742%206.1a2.266%202.266%200%200%200-3.208%200L20.408%2017.2%209.281%206.073a2.269%202.269%200%201%200-3.208%203.208L17.2%2020.408%206.073%2031.534a2.269%202.269%200%200%200%203.208%203.208l11.127-11.126%2011.126%2011.126a2.269%202.269%200%200%200%203.208-3.208L23.616%2020.408%2034.742%209.281a2.28%202.28%200%200%200%200-3.181z%22%20data-name%3D%22%ED%8C%A8%EC%8A%A4%2052%22%20transform%3D%22translate%28-.408%20-.407%29%22%20style%3D%22fill%3A%23fff%22%2F%3E%3C%2Fsvg%3E";

var senderImage = "data:image/svg+xml,%3Csvg%20id%3D%22send-24px_1_%22%20data-name%3D%22send-24px%20%281%29%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224.001%22%20height%3D%2224%22%20viewBox%3D%220%200%2024.001%2024%22%3E%20%20%3Cpath%20id%3D%22%ED%8C%A8%EC%8A%A4_53%22%20data-name%3D%22%ED%8C%A8%EC%8A%A4%2053%22%20d%3D%22M0%2C0H24V24H0Z%22%20fill%3D%22none%22%2F%3E%20%20%3Cpath%20id%3D%22%ED%8C%A8%EC%8A%A4_54%22%20data-name%3D%22%ED%8C%A8%EC%8A%A4%2054%22%20d%3D%22M3.727%2C24.342l21.524-9.226a1.234%2C1.234%2C0%2C0%2C0%2C0-2.27L3.727%2C3.62A1.224%2C1.224%2C0%2C0%2C0%2C2.012%2C4.742L2%2C10.429A1.226%2C1.226%2C0%2C0%2C0%2C3.073%2C11.65L20.5%2C13.981%2C3.073%2C16.3A1.248%2C1.248%2C0%2C0%2C0%2C2%2C17.533l.012%2C5.686a1.224%2C1.224%2C0%2C0%2C0%2C1.715%2C1.123Z%22%20transform%3D%22translate%28-2%20-1.515%29%22%20fill%3D%22%230f4c81%22%2F%3E%3C%2Fsvg%3E";

//

var script$2 = {
  name: 'chattingSender',
  data() {
    return {
      senderImage,
    };
  },
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "chatting-sender__wrapper" }, [
    _c("input", {
      attrs: { type: "text", placeholder: "메세지를 입력해주세요." }
    }),
    _vm._v(" "),
    _c("img", { attrs: { src: _vm.senderImage, alt: "전송이미지" } })
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-0053c868_0", { source: ".chatting-sender__wrapper[data-v-0053c868] {\n  width: 100%;\n  height: 30px;\n  margin-top: 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.chatting-sender__wrapper > input[data-v-0053c868] {\n  width: 328px;\n  height: 100%;\n  border: none;\n  outline: none;\n  background-color: #ededed;\n  border-radius: 15px;\n  font-size: 12px;\n  font-family: \"AppleSDGothicNeo\";\n  padding: 9px 16px;\n  color: #000000;\n  box-sizing: border-box;\n}\n.chatting-sender__wrapper > img[data-v-0053c868] {\n  cursor: pointer;\n  width: 24px;\n  height: auto;\n  object-fit: contain;\n}\n\n/*# sourceMappingURL=index.vue.map */", map: {"version":3,"sources":["index.vue","/Users/iuchan/Desktop/Frame-Frontend-QnA/src/views/chattingSender/index.vue"],"names":[],"mappings":"AAAA;EACE,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;AACA;EACE,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,yBAAyB;EACzB,mBAAmB;EACnB,eAAe;EACf,+BAA+B;EAC/B,iBAAiB;EACjB,cAAc;ECGhB,sBAAA;ADDA;AACA;EACE,eAAe;EACf,WAAW;EACX,YAAY;EACZ,mBAAmB;AACrB;;AAEA,oCAAoC","file":"index.vue","sourcesContent":[".chatting-sender__wrapper {\n  width: 100%;\n  height: 30px;\n  margin-top: 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.chatting-sender__wrapper > input {\n  width: 328px;\n  height: 100%;\n  border: none;\n  outline: none;\n  background-color: #ededed;\n  border-radius: 15px;\n  font-size: 12px;\n  font-family: \"AppleSDGothicNeo\";\n  padding: 9px 16px;\n  color: #000000;\n  box-sizing: border-box;\n}\n.chatting-sender__wrapper > img {\n  cursor: pointer;\n  width: 24px;\n  height: auto;\n  object-fit: contain;\n}\n\n/*# sourceMappingURL=index.vue.map */","<template>\n  <div class=\"chatting-sender__wrapper\">\n    <input type=\"text\" placeholder=\"메세지를 입력해주세요.\" />\n    <img :src=\"senderImage\" alt=\"전송이미지\" />\n  </div>\n</template>\n\n<script>\nimport { senderImage } from '../../assets/images';\n\nexport default {\n  name: 'chattingSender',\n  data() {\n    return {\n      senderImage,\n    };\n  },\n};\n</script>\n\n<style lang=\"scss\" scoped>\n@import './style';\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-0053c868";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$3 = {
  name: 'Chatting',
  components: {
    'not-login': __vue_component__,
    'chatting-text': __vue_component__$1,
    'chatting-sender': __vue_component__$2,
  },
  props: {
    isOpen: Boolean,
    isLogin: Boolean,
  },
  watch: {
    isOpen() {
      if (this.isOpen) {
        this.animationRender = true;
      }
    },
  },
  data() {
    return {
      animationRender: this.isOpen,
    };
  },
  methods: {
    onAnimationEnd() {
      if (!this.isOpen) {
        this.animationRender = false;
      }
    },
  },
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.animationRender
    ? _c(
        "div",
        {
          class: _vm.isOpen ? "chatting__wrapper isOpen" : "chatting__wrapper",
          on: { animationend: _vm.onAnimationEnd }
        },
        [
          _c("header", [_vm._v("QnA")]),
          _vm._v(" "),
          _c(
            "main",
            { class: _vm.isOpen ? "isOpen" : "" },
            [
              _vm.isLogin
                ? _c(
                    "div",
                    { staticClass: "message__wrapper" },
                    [_c("chatting-text"), _vm._v(" "), _c("chatting-sender")],
                    1
                  )
                : _c("not-login")
            ],
            1
          )
        ]
      )
    : _vm._e()
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-3cce7132_0", { source: "@keyframes upToDown-data-v-3cce7132 {\n0% {\n    height: 450px;\n}\n30% {\n    height: 42px;\n}\n100% {\n    height: 0;\n    opacity: 0;\n}\n}\n@keyframes downToUp-data-v-3cce7132 {\n0% {\n    height: 42px;\n    opacity: 0.3;\n}\n30% {\n    height: 42px;\n    opacity: 1;\n}\n100% {\n    height: 450px;\n}\n}\n@keyframes fadeIn-data-v-3cce7132 {\n0% {\n    opacity: 0;\n}\n70% {\n    opacity: 0;\n    transform: scale(0.98);\n}\n100% {\n    opacity: 1;\n    transform: scale(1);\n}\n}\n@keyframes fadeOut-data-v-3cce7132 {\n0% {\n    opacity: 1;\n    transform: scale(1);\n}\n70% {\n    opacity: 0;\n    transform: scale(0.98);\n}\n100% {\n    opacity: 0;\n}\n}\n.chatting__wrapper[data-v-3cce7132] {\n  width: 400px;\n  height: 450px;\n  margin-bottom: 10px;\n  border-radius: 12px;\n  border: 2px solid #0f4c81;\n  overflow: hidden;\n  animation: 1s ease-in-out 0s 1 normal forwards running upToDown-data-v-3cce7132;\n  background-color: #ffffff;\n}\n.chatting__wrapper.isOpen[data-v-3cce7132] {\n  animation: 1s ease-in-out 0s 1 normal forwards running downToUp-data-v-3cce7132;\n}\n.chatting__wrapper > header[data-v-3cce7132] {\n  width: 100%;\n  height: 42px;\n  line-height: 42px;\n  background-color: #0f4c81;\n  padding: 0 10px;\n  box-sizing: border-box;\n  font-family: \"AppleSDGothicNeo\";\n  font-size: 20px;\n  color: #ffffff;\n  text-align: left;\n}\n.chatting__wrapper > main[data-v-3cce7132] {\n  width: 100%;\n  height: 408px;\n  padding: 16px;\n  box-sizing: border-box;\n  animation: fadeOut-data-v-3cce7132 1.5s ease-out;\n  background-color: #ffffff;\n}\n.chatting__wrapper > main.isOpen[data-v-3cce7132] {\n  animation: fadeIn-data-v-3cce7132 1.5s ease-out;\n}\n.chatting__wrapper > main > .message__wrapper[data-v-3cce7132] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n/*# sourceMappingURL=index.vue.map */", map: {"version":3,"sources":["index.vue"],"names":[],"mappings":"AAAA;AACE;IACE,aAAa;AACf;AACA;IACE,YAAY;AACd;AACA;IACE,SAAS;IACT,UAAU;AACZ;AACF;AACA;AACE;IACE,YAAY;IACZ,YAAY;AACd;AACA;IACE,YAAY;IACZ,UAAU;AACZ;AACA;IACE,aAAa;AACf;AACF;AACA;AACE;IACE,UAAU;AACZ;AACA;IACE,UAAU;IACV,sBAAsB;AACxB;AACA;IACE,UAAU;IACV,mBAAmB;AACrB;AACF;AACA;AACE;IACE,UAAU;IACV,mBAAmB;AACrB;AACA;IACE,UAAU;IACV,sBAAsB;AACxB;AACA;IACE,UAAU;AACZ;AACF;AACA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,yBAAyB;EACzB,gBAAgB;EAChB,+EAA+D;EAC/D,yBAAyB;AAC3B;AACA;EACE,+EAA+D;AACjE;AACA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,yBAAyB;EACzB,eAAe;EACf,sBAAsB;EACtB,+BAA+B;EAC/B,eAAe;EACf,cAAc;EACd,gBAAgB;AAClB;AACA;EACE,WAAW;EACX,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,gDAAgC;EAChC,yBAAyB;AAC3B;AACA;EACE,+CAA+B;AACjC;AACA;EACE,WAAW;EACX,YAAY;EACZ,aAAa;EACb,sBAAsB;AACxB;;AAEA,oCAAoC","file":"index.vue","sourcesContent":["@keyframes upToDown {\n  0% {\n    height: 450px;\n  }\n  30% {\n    height: 42px;\n  }\n  100% {\n    height: 0;\n    opacity: 0;\n  }\n}\n@keyframes downToUp {\n  0% {\n    height: 42px;\n    opacity: 0.3;\n  }\n  30% {\n    height: 42px;\n    opacity: 1;\n  }\n  100% {\n    height: 450px;\n  }\n}\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  70% {\n    opacity: 0;\n    transform: scale(0.98);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes fadeOut {\n  0% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  70% {\n    opacity: 0;\n    transform: scale(0.98);\n  }\n  100% {\n    opacity: 0;\n  }\n}\n.chatting__wrapper {\n  width: 400px;\n  height: 450px;\n  margin-bottom: 10px;\n  border-radius: 12px;\n  border: 2px solid #0f4c81;\n  overflow: hidden;\n  animation: 1s ease-in-out 0s 1 normal forwards running upToDown;\n  background-color: #ffffff;\n}\n.chatting__wrapper.isOpen {\n  animation: 1s ease-in-out 0s 1 normal forwards running downToUp;\n}\n.chatting__wrapper > header {\n  width: 100%;\n  height: 42px;\n  line-height: 42px;\n  background-color: #0f4c81;\n  padding: 0 10px;\n  box-sizing: border-box;\n  font-family: \"AppleSDGothicNeo\";\n  font-size: 20px;\n  color: #ffffff;\n  text-align: left;\n}\n.chatting__wrapper > main {\n  width: 100%;\n  height: 408px;\n  padding: 16px;\n  box-sizing: border-box;\n  animation: fadeOut 1.5s ease-out;\n  background-color: #ffffff;\n}\n.chatting__wrapper > main.isOpen {\n  animation: fadeIn 1.5s ease-out;\n}\n.chatting__wrapper > main > .message__wrapper {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n/*# sourceMappingURL=index.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-3cce7132";
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$4 = {
  name: 'Messenger',
  components: {
    Chatting: __vue_component__$3,
  },
  data() {
    return {
      isOpen: false,
      isLogin: true,
      chattingImage,
      closeImage,
    };
  },
  methods: {
    toggleModal() {
      this.isOpen = !this.isOpen;
    },
  },
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "messenger__wrapper" },
    [
      _c("chatting", { attrs: { isOpen: _vm.isOpen, isLogin: _vm.isLogin } }),
      _vm._v(" "),
      _c("button", { on: { click: _vm.toggleModal } }, [
        _c("img", {
          attrs: { src: _vm.isOpen ? _vm.closeImage : _vm.chattingImage }
        })
      ])
    ],
    1
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-22b11ba5_0", { source: ".messenger__wrapper[data-v-22b11ba5] {\n  z-index: 1000;\n  position: fixed;\n  right: 40px;\n  bottom: 40px;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.messenger__wrapper > button[data-v-22b11ba5] {\n  all: unset;\n  width: 80px;\n  height: 80px;\n  background-color: #0f4c81;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16);\n  border-radius: 40px;\n  transition: all 0.2s ease-in-out 0s;\n  cursor: pointer;\n}\n.messenger__wrapper > button[data-v-22b11ba5]:hover {\n  background-color: #083d6c;\n}\n\n/*# sourceMappingURL=index.vue.map */", map: {"version":3,"sources":["index.vue"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,eAAe;EACf,WAAW;EACX,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,qBAAqB;AACvB;AACA;EACE,UAAU;EACV,WAAW;EACX,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,2CAA2C;EAC3C,mBAAmB;EACnB,mCAAmC;EACnC,eAAe;AACjB;AACA;EACE,yBAAyB;AAC3B;;AAEA,oCAAoC","file":"index.vue","sourcesContent":[".messenger__wrapper {\n  z-index: 1000;\n  position: fixed;\n  right: 40px;\n  bottom: 40px;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n.messenger__wrapper > button {\n  all: unset;\n  width: 80px;\n  height: 80px;\n  background-color: #0f4c81;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.16);\n  border-radius: 40px;\n  transition: all 0.2s ease-in-out 0s;\n  cursor: pointer;\n}\n.messenger__wrapper > button:hover {\n  background-color: #083d6c;\n}\n\n/*# sourceMappingURL=index.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = "data-v-22b11ba5";
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    createInjector,
    undefined,
    undefined
  );

// Declare install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('Messenger', __vue_component__$4);
}

// Create module definition for Vue.use()
const plugin = {
  install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default __vue_component__$4;
export { install };
