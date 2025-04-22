"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  clearStorage: () => clearStorage,
  getItem: () => getItem,
  removeItem: () => removeItem,
  setItem: () => setItem
});
module.exports = __toCommonJS(index_exports);

// src/useStorage.ts
var getStorage = (type) => {
  return type === "local" ? localStorage : sessionStorage;
};
var setItem = (key, value, type = "local") => {
  const storage = getStorage(type);
  storage.setItem(key, JSON.stringify(value));
};
var getItem = (key, type = "local") => {
  const storage = getStorage(type);
  const item = storage.getItem(key);
  return item ? JSON.parse(item) : null;
};
var removeItem = (key, type = "local") => {
  const storage = getStorage(type);
  storage.removeItem(key);
};
var clearStorage = (type = "local") => {
  const storage = getStorage(type);
  storage.clear();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clearStorage,
  getItem,
  removeItem,
  setItem
});
