/**
 * Defines the type of storage to use.
 * - 'local' for localStorage
 * - 'session' for sessionStorage
 */
type StorageType = 'local' | 'session';
/**
 * Stores a value in localStorage or sessionStorage.
 *
 * @typeParam T - The type of the value being stored.
 * @param key - The key under which the value will be stored.
 * @param value - The value to store.
 * @param type - Optional. The type of storage to use. Defaults to 'local'.
 */
declare const setItem: <T>(key: string, value: T, type?: StorageType) => void;
/**
 * Retrieves a value from localStorage or sessionStorage.
 *
 * @typeParam T - The expected return type of the stored value.
 * @param key - The key of the item to retrieve.
 * @param type - Optional. The type of storage to use. Defaults to 'local'.
 * @returns The parsed value if found, or null if the key doesn't exist.
 */
declare const getItem: <T>(key: string, type?: StorageType) => T | null;
/**
 * Removes a specific item from localStorage or sessionStorage.
 *
 * @param key - The key of the item to remove.
 * @param type - Optional. The type of storage to use. Defaults to 'local'.
 */
declare const removeItem: (key: string, type?: StorageType) => void;
/**
 * Clears all items from localStorage or sessionStorage.
 *
 * @param type - Optional. The type of storage to clear. Defaults to 'local'.
 */
declare const clearStorage: (type?: StorageType) => void;

export { clearStorage, getItem, removeItem, setItem };
