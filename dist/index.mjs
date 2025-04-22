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
export {
  clearStorage,
  getItem,
  removeItem,
  setItem
};
