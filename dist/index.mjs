// src/useStorage.ts
import CryptoJS from "crypto-js";
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
var setItem = (key, value, options) => {
  const {
    type = "local",
    encrypt = false,
    hashKey,
    expiresIn
  } = options || {};
  const storage = getStorage(type);
  const storedValue = {
    value,
    expiresAt: expiresIn ? Date.now() + expiresIn * 1e3 : void 0
  };
  if (encrypt) {
    if (!hashKey) {
      throw new Error("hashKey is required for encryption");
    }
    const encryptedValue = encryptData(storedValue, hashKey);
    storage.setItem(key, encryptedValue);
  } else {
    storage.setItem(key, JSON.stringify(storedValue));
  }
};
var getItem = (key, options) => {
  const {
    type = "local",
    encrypt = false,
    hashKey
  } = options || {};
  const storage = getStorage(type);
  const storedValue = storage.getItem(key);
  if (!storedValue) return null;
  let parsed = null;
  try {
    parsed = encrypt ? decryptData(storedValue, hashKey) : JSON.parse(storedValue);
  } catch (e) {
    return null;
  }
  if (!parsed) return null;
  if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
    storage.removeItem(key);
    return null;
  }
  return parsed.value;
};
var removeItem = (key, type = "local") => {
  const storage = getStorage(type);
  storage.removeItem(key);
};
var removeItems = (keys, type = "local") => {
  const storage = getStorage(type);
  keys.forEach((key) => {
    storage.removeItem(key);
  });
};
var clearStorage = (type = "local") => {
  const storage = getStorage(type);
  storage.clear();
};
export {
  clearStorage,
  getItem,
  removeItem,
  removeItems,
  setItem
};
