globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, getRequestHeaders, setResponseHeader, createError, createApp, createRouter as createRouter$1, lazyEventHandler, toNodeListener } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { u as useRuntimeConfig } from './config.mjs';
import { hash } from 'ohash';
import { withoutBase, parseURL, withQuery, joinURL, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.node.req.url?.endsWith(".json") || event.node.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/background.png": {
    "type": "image/png",
    "etag": "\"195cc7-T6qWvdPWltH8hVe+6XVgq5kh9n4\"",
    "mtime": "2023-02-06T09:14:19.486Z",
    "size": 1662151,
    "path": "../public/background.png"
  },
  "/background_finish.png": {
    "type": "image/png",
    "etag": "\"1d797e-JT+aK5/aN8RNPrj2w75wnaqsffw\"",
    "mtime": "2023-02-12T19:15:18.005Z",
    "size": 1931646,
    "path": "../public/background_finish.png"
  },
  "/background_generator.png": {
    "type": "image/png",
    "etag": "\"1d6f78-Q0r/FiEbUYOaLtJVwqJBT3UUKCI\"",
    "mtime": "2023-02-14T14:21:40.288Z",
    "size": 1929080,
    "path": "../public/background_generator.png"
  },
  "/background_index.png": {
    "type": "image/png",
    "etag": "\"1eecd1-1Cvo+Um8C6dWGzqUnEOQjIg4Jys\"",
    "mtime": "2023-02-14T12:59:27.413Z",
    "size": 2026705,
    "path": "../public/background_index.png"
  },
  "/background_text_MIR.svg": {
    "type": "image/svg+xml",
    "etag": "\"2aae-NAwCPbkyVPRN+7tLrgBfTaXlGQk\"",
    "mtime": "2023-02-14T12:58:25.971Z",
    "size": 10926,
    "path": "../public/background_text_MIR.svg"
  },
  "/background_text_v-mire.svg": {
    "type": "image/svg+xml",
    "etag": "\"1c2f-RxbYSrFm6gaPCjBwCeIdovuCOXk\"",
    "mtime": "2023-02-14T12:56:51.711Z",
    "size": 7215,
    "path": "../public/background_text_v-mire.svg"
  },
  "/bg_start.png": {
    "type": "image/png",
    "etag": "\"1a4410-OMosWX0oH1s3m33YbonSiT6QUbk\"",
    "mtime": "2023-02-07T16:51:05.848Z",
    "size": 1721360,
    "path": "../public/bg_start.png"
  },
  "/button_arrow.svg": {
    "type": "image/svg+xml",
    "etag": "\"fa-tm6vN3lfPtz7WyxsVOfkZTaZPYY\"",
    "mtime": "2023-02-09T11:46:11.245Z",
    "size": 250,
    "path": "../public/button_arrow.svg"
  },
  "/button_random.svg": {
    "type": "image/svg+xml",
    "etag": "\"af8-LR8Pk8Obnce8FhqRaG6I3QFt7/s\"",
    "mtime": "2023-02-09T11:44:43.968Z",
    "size": 2808,
    "path": "../public/button_random.svg"
  },
  "/button_text_next.svg": {
    "type": "image/svg+xml",
    "etag": "\"2259-uq/bYjGdGROoB6wdNZ6qcWWeXnY\"",
    "mtime": "2023-02-09T11:54:18.642Z",
    "size": 8793,
    "path": "../public/button_text_next.svg"
  },
  "/button_text_prev.svg": {
    "type": "image/svg+xml",
    "etag": "\"252f-H4lxOZh1Uz+JkIKLNZxmn4fK42E\"",
    "mtime": "2023-02-09T11:53:49.695Z",
    "size": 9519,
    "path": "../public/button_text_prev.svg"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-n8egyE9tcb7sKGr/pYCaQ4uWqxI\"",
    "mtime": "2023-02-03T13:45:14.000Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/finish_description.svg": {
    "type": "image/svg+xml",
    "etag": "\"1c58-NelKa0hzHPuBjPuZ8YBT+gZ7Ld0\"",
    "mtime": "2023-02-10T11:31:47.528Z",
    "size": 7256,
    "path": "../public/finish_description.svg"
  },
  "/generator_bg-1.png": {
    "type": "image/png",
    "etag": "\"1da647-0XAXMpvKTNxaOJa9ivsDXDKJK7M\"",
    "mtime": "2023-02-10T10:44:59.210Z",
    "size": 1943111,
    "path": "../public/generator_bg-1.png"
  },
  "/generator_bg.png": {
    "type": "image/png",
    "etag": "\"1dcf-dQ3wt7s5ETsnmlXQ/QYxqtCjhwQ\"",
    "mtime": "2023-02-07T18:47:38.947Z",
    "size": 7631,
    "path": "../public/generator_bg.png"
  },
  "/radiobutton_checked.svg": {
    "type": "image/svg+xml",
    "etag": "\"f7-dZeVFxzXRUcWOl7VIiWF0MVBOLo\"",
    "mtime": "2023-02-07T17:30:21.227Z",
    "size": 247,
    "path": "../public/radiobutton_checked.svg"
  },
  "/backgrounds/background-0.png": {
    "type": "image/png",
    "etag": "\"3fe1a-/ITorUBc34UjmP3c270eCBm6vzg\"",
    "mtime": "2023-02-09T18:14:57.975Z",
    "size": 261658,
    "path": "../public/backgrounds/background-0.png"
  },
  "/backgrounds/background-1.png": {
    "type": "image/png",
    "etag": "\"454ca-1IVYvP++IpxBXBNykU7rWQh2FNQ\"",
    "mtime": "2023-02-09T18:14:57.997Z",
    "size": 283850,
    "path": "../public/backgrounds/background-1.png"
  },
  "/backgrounds/background-2.png": {
    "type": "image/png",
    "etag": "\"54ee2-GfXQly8gQuDzsPiDWMT146pJkeQ\"",
    "mtime": "2023-02-09T18:14:58.020Z",
    "size": 347874,
    "path": "../public/backgrounds/background-2.png"
  },
  "/backgrounds/background-3.png": {
    "type": "image/png",
    "etag": "\"25940-5/3aTTfQ7V8xZAraNwQbymGhCmE\"",
    "mtime": "2023-02-09T18:14:58.043Z",
    "size": 153920,
    "path": "../public/backgrounds/background-3.png"
  },
  "/backgrounds/background-4.png": {
    "type": "image/png",
    "etag": "\"3d8cb-eRtIw07AI/+wfreS+fGi03kR1dU\"",
    "mtime": "2023-02-09T18:14:58.065Z",
    "size": 252107,
    "path": "../public/backgrounds/background-4.png"
  },
  "/backgrounds/background-5.png": {
    "type": "image/png",
    "etag": "\"4e8c3-1j7JV85ENGb97J1YuJ0EMcLja4A\"",
    "mtime": "2023-02-09T18:14:58.088Z",
    "size": 321731,
    "path": "../public/backgrounds/background-5.png"
  },
  "/backgrounds/background-6.png": {
    "type": "image/png",
    "etag": "\"3dad0-7/0wdz3gSsG2/MaEcIMt69je6Kw\"",
    "mtime": "2023-02-09T18:14:58.111Z",
    "size": 252624,
    "path": "../public/backgrounds/background-6.png"
  },
  "/backgrounds/background-7.png": {
    "type": "image/png",
    "etag": "\"433fe-dfcClZ2wMGhS72C4rN82UgIIC4M\"",
    "mtime": "2023-02-09T18:14:58.137Z",
    "size": 275454,
    "path": "../public/backgrounds/background-7.png"
  },
  "/fonts/GT-Eesti-Pro-Text-Book-2.ttf": {
    "type": "font/ttf",
    "etag": "\"33228-j6MZGl+7VtBhUAz9KmBrJ4imxxg\"",
    "mtime": "2018-07-26T12:45:34.000Z",
    "size": 209448,
    "path": "../public/fonts/GT-Eesti-Pro-Text-Book-2.ttf"
  },
  "/fonts/GT-Eesti-Pro-Text-Light-2.ttf": {
    "type": "font/ttf",
    "etag": "\"32538-sWhG1Eg+tfBeHxhCCaRLUZLDado\"",
    "mtime": "2018-07-26T12:45:34.000Z",
    "size": 206136,
    "path": "../public/fonts/GT-Eesti-Pro-Text-Light-2.ttf"
  },
  "/fonts/GT-Eesti-Pro-Text-Regular-2.ttf": {
    "type": "font/ttf",
    "etag": "\"32ae4-PQ2Skey/EYCrYAkKzY5Va7itmms\"",
    "mtime": "2018-07-26T12:45:34.000Z",
    "size": 207588,
    "path": "../public/fonts/GT-Eesti-Pro-Text-Regular-2.ttf"
  },
  "/stickers/sticker-0.png": {
    "type": "image/png",
    "etag": "\"2bd44-O8b7FLebmeHIehHYOVyckjY968U\"",
    "mtime": "2023-02-09T18:14:57.687Z",
    "size": 179524,
    "path": "../public/stickers/sticker-0.png"
  },
  "/stickers/sticker-1.png": {
    "type": "image/png",
    "etag": "\"2315c-LIjKI8eC8+hHXba6bT6ZAHUNAS4\"",
    "mtime": "2023-02-09T18:14:57.712Z",
    "size": 143708,
    "path": "../public/stickers/sticker-1.png"
  },
  "/stickers/sticker-10.png": {
    "type": "image/png",
    "etag": "\"513e2-LxPS1/ccQxK3BADUPYKbxkrsfmo\"",
    "mtime": "2023-02-09T18:14:57.906Z",
    "size": 332770,
    "path": "../public/stickers/sticker-10.png"
  },
  "/stickers/sticker-11.png": {
    "type": "image/png",
    "etag": "\"462c6-rUI8wxeUuy0f+EOMvq5FLa+OiEs\"",
    "mtime": "2023-02-09T18:14:57.929Z",
    "size": 287430,
    "path": "../public/stickers/sticker-11.png"
  },
  "/stickers/sticker-12.png": {
    "type": "image/png",
    "etag": "\"438e1-OxXbXQGGpyRTxW+VuqMxaSfNiro\"",
    "mtime": "2023-02-09T18:14:57.953Z",
    "size": 276705,
    "path": "../public/stickers/sticker-12.png"
  },
  "/stickers/sticker-2.png": {
    "type": "image/png",
    "etag": "\"1e55e-lQKfahPRMQXai+aSImvHONbr1O4\"",
    "mtime": "2023-02-09T18:14:57.732Z",
    "size": 124254,
    "path": "../public/stickers/sticker-2.png"
  },
  "/stickers/sticker-3.png": {
    "type": "image/png",
    "etag": "\"3a1b9-eaKgOHovM7p4kJIW0ON/mCsVgfo\"",
    "mtime": "2023-02-09T18:14:57.755Z",
    "size": 238009,
    "path": "../public/stickers/sticker-3.png"
  },
  "/stickers/sticker-4.png": {
    "type": "image/png",
    "etag": "\"12206-wwM+KsvNGm05r3lrhg2LbbN9pj0\"",
    "mtime": "2023-02-09T18:14:57.776Z",
    "size": 74246,
    "path": "../public/stickers/sticker-4.png"
  },
  "/stickers/sticker-5.png": {
    "type": "image/png",
    "etag": "\"141f7-afmABb3En619jb9tslcQnns8ZJU\"",
    "mtime": "2023-02-09T18:14:57.796Z",
    "size": 82423,
    "path": "../public/stickers/sticker-5.png"
  },
  "/stickers/sticker-6.png": {
    "type": "image/png",
    "etag": "\"13b15-epaOwyefc0zxGavgJuR/RDj8ajE\"",
    "mtime": "2023-02-09T18:14:57.817Z",
    "size": 80661,
    "path": "../public/stickers/sticker-6.png"
  },
  "/stickers/sticker-7.png": {
    "type": "image/png",
    "etag": "\"1256a-VCW8TdcBq0vtXgzRsqyqNb8NxP0\"",
    "mtime": "2023-02-09T18:14:57.837Z",
    "size": 75114,
    "path": "../public/stickers/sticker-7.png"
  },
  "/stickers/sticker-8.png": {
    "type": "image/png",
    "etag": "\"374eb-rMVFFByZRnuXjRFHEvhrKmmNQWg\"",
    "mtime": "2023-02-09T18:14:57.859Z",
    "size": 226539,
    "path": "../public/stickers/sticker-8.png"
  },
  "/stickers/sticker-9.png": {
    "type": "image/png",
    "etag": "\"16cad-nG7ZFkLLkPRyl0GR1XiNOCgpgeY\"",
    "mtime": "2023-02-09T18:14:57.881Z",
    "size": 93357,
    "path": "../public/stickers/sticker-9.png"
  },
  "/_nuxt/composables.3d4f6468.js": {
    "type": "application/javascript",
    "etag": "\"61-61aaPv8y9xzW9qu3jJ/hMlVUlWM\"",
    "mtime": "2023-02-15T09:40:30.381Z",
    "size": 97,
    "path": "../public/_nuxt/composables.3d4f6468.js"
  },
  "/_nuxt/customButton.9fe83974.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"332-w7zUvLaXo0Yxz01Y8u+I4V86BEg\"",
    "mtime": "2023-02-15T09:40:30.381Z",
    "size": 818,
    "path": "../public/_nuxt/customButton.9fe83974.css"
  },
  "/_nuxt/customButton.e743fb08.js": {
    "type": "application/javascript",
    "etag": "\"13f-B0YoYoUmbsTNlG7mh52T34L1ZG0\"",
    "mtime": "2023-02-15T09:40:30.382Z",
    "size": 319,
    "path": "../public/_nuxt/customButton.e743fb08.js"
  },
  "/_nuxt/default.185a710d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"58b-tjJo4bpQi+ZxdrS/tDgWNGmMRfM\"",
    "mtime": "2023-02-15T09:40:30.381Z",
    "size": 1419,
    "path": "../public/_nuxt/default.185a710d.css"
  },
  "/_nuxt/default.99e45848.js": {
    "type": "application/javascript",
    "etag": "\"67b-nzup3T/WE0ELtRMDH5XX2yJAd3g\"",
    "mtime": "2023-02-15T09:40:30.382Z",
    "size": 1659,
    "path": "../public/_nuxt/default.99e45848.js"
  },
  "/_nuxt/entry.31175190.js": {
    "type": "application/javascript",
    "etag": "\"20b67-AuTUlwblNYZuykPzEIG0tX+PTLY\"",
    "mtime": "2023-02-15T09:40:30.382Z",
    "size": 133991,
    "path": "../public/_nuxt/entry.31175190.js"
  },
  "/_nuxt/error-404.20d5db40.js": {
    "type": "application/javascript",
    "etag": "\"8ca-rsAAjOXf+vTUCQADHExoldqbnTM\"",
    "mtime": "2023-02-15T09:40:30.381Z",
    "size": 2250,
    "path": "../public/_nuxt/error-404.20d5db40.js"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2023-02-15T09:40:30.381Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2023-02-15T09:40:30.381Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/error-500.c08c7fde.js": {
    "type": "application/javascript",
    "etag": "\"773-vhAWm9TTLNShQq0RWf81cb1/bbM\"",
    "mtime": "2023-02-15T09:40:30.382Z",
    "size": 1907,
    "path": "../public/_nuxt/error-500.c08c7fde.js"
  },
  "/_nuxt/error-component.eb44ffbc.js": {
    "type": "application/javascript",
    "etag": "\"470-6E+lcBEQ6g7At06E3dppkzdZmao\"",
    "mtime": "2023-02-15T09:40:30.381Z",
    "size": 1136,
    "path": "../public/_nuxt/error-component.eb44ffbc.js"
  },
  "/_nuxt/finish.9c78b3f9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"678-mIM7uUtj9BWy8F3k/SQtfF6NJ90\"",
    "mtime": "2023-02-15T09:40:30.381Z",
    "size": 1656,
    "path": "../public/_nuxt/finish.9c78b3f9.css"
  },
  "/_nuxt/finish.eb7acc34.js": {
    "type": "application/javascript",
    "etag": "\"7f9-Sxt/GU0C1vKKbJJ2JEo22hYrGk0\"",
    "mtime": "2023-02-15T09:40:30.382Z",
    "size": 2041,
    "path": "../public/_nuxt/finish.eb7acc34.js"
  },
  "/_nuxt/generator.5110f7ad.js": {
    "type": "application/javascript",
    "etag": "\"4ed2-Wb9GHGYAIOroyRdOFCX7fsbBiN0\"",
    "mtime": "2023-02-15T09:40:30.382Z",
    "size": 20178,
    "path": "../public/_nuxt/generator.5110f7ad.js"
  },
  "/_nuxt/generator.56a10c03.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1ef0-R10pUx6wU5VpUyzCWJ06OhMH724\"",
    "mtime": "2023-02-15T09:40:30.381Z",
    "size": 7920,
    "path": "../public/_nuxt/generator.56a10c03.css"
  },
  "/_nuxt/index.0d181675.js": {
    "type": "application/javascript",
    "etag": "\"f3a-a/qF5k6omaxYO4IQeWwFoxfC7iE\"",
    "mtime": "2023-02-15T09:40:30.381Z",
    "size": 3898,
    "path": "../public/_nuxt/index.0d181675.js"
  },
  "/_nuxt/index.9af9a11a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1344-l9COhy1KMqdDRA+Yrwj3+IL3mJA\"",
    "mtime": "2023-02-15T09:40:30.379Z",
    "size": 4932,
    "path": "../public/_nuxt/index.9af9a11a.css"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_1sAldl = () => import('./renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_1sAldl, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_1sAldl, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
