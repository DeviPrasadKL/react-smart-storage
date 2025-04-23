// src/useStorage.ts
import * as CryptoJS from "crypto-js";
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
export {
  clearStorage,
  getItem,
  removeItem,
  setItem
};
