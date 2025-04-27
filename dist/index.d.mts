type StorageType = 'local' | 'session';
/**
 * Stores a value in localStorage or sessionStorage with optional encryption and expiration.
 *
 * @template T - Type of the value to store.
 * @param key - The key under which to store the value.
 * @param value - The value to store.
 * @param options - Configuration object.
 * @param options.type - 'local' or 'session'. Defaults to 'local'.
 * @param options.encrypt - Whether to encrypt the value. Defaults to false.
 * @param options.hashKey - Secret key used for encryption. Required if `encrypt` is true.
 * @param options.expiresIn - Expiration time in seconds. Optional.
 *
 * @example
 * setItem('user', { name: 'Alice' }, { encrypt: true, hashKey: 'secret', expiresIn: 3600 });
 */
declare const setItem: <T>(key: string, value: T, options?: {
    type?: StorageType;
    encrypt?: boolean;
    hashKey?: string;
    expiresIn?: number;
}) => void;
/**
 * Retrieves a value from localStorage or sessionStorage with optional decryption and expiration check.
 *
 * @template T - Type of the expected return value.
 * @param key - The key of the item to retrieve.
 * @param options - Configuration object.
 * @param options.type - 'local' or 'session'. Defaults to 'local'.
 * @param options.encrypt - Whether the value is encrypted. Defaults to false.
 * @param options.hashKey - Secret key for decryption. Required if `encrypt` is true.
 * @returns The stored value if found and valid, otherwise `null`.
 *
 * @example
 * const user = getItem<{ name: string }>('user', { encrypt: true, hashKey: 'secret' });
 */
declare const getItem: <T>(key: string, options?: {
    type?: StorageType;
    encrypt?: boolean;
    hashKey?: string;
}) => T | null;
/**
 * Removes a single item from localStorage or sessionStorage.
 *
 * @param key - The key to remove.
 * @param type - 'local' or 'session'. Defaults to 'local'.
 *
 * @example
 * removeItem('user');
 */
declare const removeItem: (key: string, type?: StorageType) => void;
/**
 * Removes multiple items from localStorage or sessionStorage.
 *
 * @param keys - Array of keys to remove.
 * @param type - 'local' or 'session'. Defaults to 'local'.
 *
 * @example
 * removeItems(['user', 'settings'], 'session');
 */
declare const removeItems: (keys: string[], type?: StorageType) => void;
/**
 * Clears all data from localStorage or sessionStorage.
 *
 * @param type - 'local' or 'session'. Defaults to 'local'.
 *
 * @example
 * clearStorage(); // Clears localStorage
 */
declare const clearStorage: (type?: StorageType) => void;
/**
 * Returns storage usage details (used and free space) for localStorage or sessionStorage.
 *
 * @param type - 'local' or 'session'. Defaults to 'local'.
 * @returns An object containing used bytes and estimated free bytes.
 *
 * @example
 * const usage = getStorageUsage(); // Gets localStorage usage
 * const sessionUsage = getStorageUsage('session'); // Gets sessionStorage usage
 */
declare const getStorageUsage: (type?: StorageType) => {
    usedBytes: number;
    freeBytes: number;
    maxBytes: number;
    usedMB: string;
    freeMB: string;
    maxMB: string;
};
/**
 * Returns a human-readable summary of storage usage.
 *
 * @param type - 'local' or 'session'. Defaults to 'local'.
 * @returns A string summary of storage usage.
 *
 * @example
 * const summary = getStorageUsageSummary(); // "Used 0.12MB of 5.00MB (2.4%)"
 */
declare const getStorageUsageSummary: (type?: StorageType) => string;

export { clearStorage, getItem, getStorageUsage, getStorageUsageSummary, removeItem, removeItems, setItem };
