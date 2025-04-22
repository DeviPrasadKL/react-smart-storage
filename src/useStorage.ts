/**
 * Defines the type of storage to use.
 * - 'local' for localStorage
 * - 'session' for sessionStorage
 */
type StorageType = 'local' | 'session';

/**
 * Returns the appropriate storage object based on the type.
 *
 * @param type - The type of storage to use ('local' or 'session').
 * @returns The corresponding Storage object.
 */
const getStorage = (type: StorageType): Storage => {
  return type === 'local' ? localStorage : sessionStorage;
};

/**
 * Stores a value in localStorage or sessionStorage.
 *
 * @typeParam T - The type of the value being stored.
 * @param key - The key under which the value will be stored.
 * @param value - The value to store.
 * @param type - Optional. The type of storage to use. Defaults to 'local'.
 */
export const setItem = <T>(key: string, value: T, type: StorageType = 'local') => {
  const storage = getStorage(type);
  storage.setItem(key, JSON.stringify(value));
};

/**
 * Retrieves a value from localStorage or sessionStorage.
 *
 * @typeParam T - The expected return type of the stored value.
 * @param key - The key of the item to retrieve.
 * @param type - Optional. The type of storage to use. Defaults to 'local'.
 * @returns The parsed value if found, or null if the key doesn't exist.
 */
export const getItem = <T>(key: string, type: StorageType = 'local'): T | null => {
  const storage = getStorage(type);
  const item = storage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

/**
 * Removes a specific item from localStorage or sessionStorage.
 *
 * @param key - The key of the item to remove.
 * @param type - Optional. The type of storage to use. Defaults to 'local'.
 */
export const removeItem = (key: string, type: StorageType = 'local') => {
  const storage = getStorage(type);
  storage.removeItem(key);
};

/**
 * Clears all items from localStorage or sessionStorage.
 *
 * @param type - Optional. The type of storage to clear. Defaults to 'local'.
 */
export const clearStorage = (type: StorageType = 'local') => {
  const storage = getStorage(type);
  storage.clear();
};
