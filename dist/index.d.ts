type StorageType = 'local' | 'session';
/**
 * Stores a value in localStorage or sessionStorage, with optional encryption.
 *
 * @typeParam T - The type of the value being stored.
 * @param key - The key under which the value will be stored.
 * @param value - The value to store.
 * @param type - Optional. The type of storage to use. Defaults to 'local'.
 * @param encrypt - Optional. Whether to encrypt the value. Defaults to false.
 * @param hashKey - Optional. A passphrase used to derive the encryption key.
 */
declare const setItem: <T>(key: string, value: T, type?: StorageType, encrypt?: boolean, hashKey?: string) => void;
/**
 * Retrieves a value from localStorage or sessionStorage, with optional decryption.
 *
 * @typeParam T - The expected return type of the stored value.
 * @param key - The key of the item to retrieve.
 * @param type - Optional. The type of storage to use. Defaults to 'local'.
 * @param encrypt - Optional. Whether the value is encrypted. Defaults to false.
 * @param hashKey - Optional. A passphrase used to derive the encryption key.
 * @returns The value as T, or null if not found or failed to decrypt.
 */
declare const getItem: <T>(key: string, type?: StorageType, encrypt?: boolean, hashKey?: string) => T | null;
declare const removeItem: (key: string, type?: StorageType) => void;
declare const clearStorage: (type?: StorageType) => void;

export { clearStorage, getItem, removeItem, setItem };
