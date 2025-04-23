"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
var CryptoJS = __toESM(require("crypto-js"));
var getStorage = (type) => {
  return type === "local" ? localStorage : sessionStorage;
};
var getHashedKey = (key) => {
  return CryptoJS.SHA256(key).toString();
};
var encryptData = (value, hashKey) => {
  const hashedKey = getHashedKey(hashKey);
  return CryptoJS.AES.encrypt(JSON.stringify(value), hashedKey).toString();
};
var decryptData = (encryptedValue, hashKey) => {
  const hashedKey = getHashedKey(hashKey);
  const bytes = CryptoJS.AES.decrypt(encryptedValue, hashedKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData ? JSON.parse(decryptedData) : null;
};
var setItem = (key, value, type = "local", encrypt = false, hashKey) => {
  const storage = getStorage(type);
  if (encrypt) {
    if (!hashKey) {
      throw new Error("hashKey is required for encryption");
    }
    const encryptedValue = encryptData(value, hashKey);
    storage.setItem(key, encryptedValue);
  } else {
    storage.setItem(key, JSON.stringify(value));
  }
};
var getItem = (key, type = "local", encrypt = false, hashKey) => {
  const storage = getStorage(type);
  const storedValue = storage.getItem(key);
  if (!storedValue) return null;
  if (encrypt) {
    if (!hashKey) {
      throw new Error("hashKey is required for decryption");
    }
    return decryptData(storedValue, hashKey);
  } else {
    return JSON.parse(storedValue);
  }
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
