type StorageType = 'local' | 'session';
/**
 * Stores a value in localStorage or sessionStorage, with optional encryption and expiration.
 *
 * @template T - The type of the value being stored.
 * @param key - The key under which the value will be stored.
 * @param value - The value to store.
 * @param options - Optional configuration for storage behavior.
 * @param options.type - The type of storage to use: 'local' or 'session'. Defaults to 'local'.
 * @param options.encrypt - Whether to encrypt the stored value. Defaults to false.
 * @param options.hashKey - A passphrase used to derive the encryption key. Required if encrypt is true.
 * @param options.expiresIn - Time in seconds until the item expires (e.g., 60 = 1 minute).
 *
 * @example
 * setItem('user', { name: 'Alice' }, { encrypt: true, hashKey: 'secret', expiresIn: 60 });
 */
declare const setItem: <T>(key: string, value: T, options?: {
    type?: StorageType;
    encrypt?: boolean;
    hashKey?: string;
    expiresIn?: number;
}) => void;
/**
 * Retrieves a value from localStorage or sessionStorage, with optional decryption and expiration check.
 *
 * @template T - The expected return type of the stored value.
 * @param key - The key of the item to retrieve.
 * @param options - Optional configuration for retrieval behavior.
 * @param options.type - The type of storage to use: 'local' or 'session'. Defaults to 'local'.
 * @param options.encrypt - Whether the stored value is encrypted. Defaults to false.
 * @param options.hashKey - A passphrase used to decrypt the value. Required if encrypt is true.
 *
 * @returns The value of type T, or null if not found, decryption fails, or the item is expired.
 *
 * @example
 * const user = getItem<{ name: string }>('user', { encrypt: true, hashKey: 'secret' });
 */
declare const getItem: <T>(key: string, options?: {
    type?: StorageType;
    encrypt?: boolean;
    hashKey?: string;
}) => T | null;
declare const removeItem: (key: string, type?: StorageType) => void;
/**
 * Removes multiple items from localStorage or sessionStorage.
 * If any key is present in storage, it will be removed.
 *
 * @param keys - Array of keys to remove.
 * @param type - Optional. The type of storage to use: 'local' or 'session'. Defaults to 'local'.
 */
declare const removeItems: (keys: string[], type?: StorageType) => void;
declare const clearStorage: (type?: StorageType) => void;

export { clearStorage, getItem, removeItem, removeItems, setItem };
