import CryptoJS from 'crypto-js';

type StorageType = 'local' | 'session';

const getStorage = (type: StorageType): Storage => {
  return type === 'local' ? localStorage : sessionStorage;
};

const getHashedKey = (key: string): string => {
  return CryptoJS.SHA256(key).toString();
};

const encryptData = (value: any, hashKey: string): string => {
  const hashedKey = getHashedKey(hashKey);
  return CryptoJS.AES.encrypt(JSON.stringify(value), hashedKey).toString();
};

const decryptData = <T>(encryptedValue: string, hashKey: string): T | null => {
  const hashedKey = getHashedKey(hashKey);
  const bytes = CryptoJS.AES.decrypt(encryptedValue, hashedKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData ? JSON.parse(decryptedData) as T : null;
};

interface StoredValue<T> {
  value: T;
  expiresAt?: number;
}

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
export const setItem = <T>(
  key: string,
  value: T,
  options?: {
    type?: StorageType;
    encrypt?: boolean;
    hashKey?: string;
    expiresIn?: number;
  }
) => {
  const {
    type = 'local',
    encrypt = false,
    hashKey,
    expiresIn,
  } = options || {};

  const storage = getStorage(type);
  const storedValue: StoredValue<T> = {
    value,
    expiresAt: expiresIn ? Date.now() + expiresIn * 1000 : undefined,
  };

  if (encrypt) {
    if (!hashKey) {
      throw new Error('hashKey is required for encryption');
    }
    const encryptedValue = encryptData(storedValue, hashKey);
    storage.setItem(key, encryptedValue);
  } else {
    storage.setItem(key, JSON.stringify(storedValue));
  }
};

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
export const getItem = <T>(
  key: string,
  options?: {
    type?: StorageType;
    encrypt?: boolean;
    hashKey?: string;
  }
): T | null => {
  const {
    type = 'local',
    encrypt = false,
    hashKey,
  } = options || {};

  const storage = getStorage(type);
  const storedValue = storage.getItem(key);
  if (!storedValue) return null;

  let parsed: StoredValue<T> | null = null;

  try {
    parsed = encrypt
      ? decryptData<StoredValue<T>>(storedValue, hashKey!)
      : JSON.parse(storedValue);
  } catch {
    return null;
  }

  if (!parsed) return null;

  if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
    storage.removeItem(key); // Cleanup if expired
    return null;
  }

  return parsed.value;
};

/**
 * Removes a single item from localStorage or sessionStorage.
 *
 * @param key - The key to remove.
 * @param type - 'local' or 'session'. Defaults to 'local'.
 *
 * @example
 * removeItem('user');
 */
export const removeItem = (key: string, type: StorageType = 'local') => {
  const storage = getStorage(type);
  storage.removeItem(key);
};

/**
 * Removes multiple items from localStorage or sessionStorage.
 *
 * @param keys - Array of keys to remove.
 * @param type - 'local' or 'session'. Defaults to 'local'.
 *
 * @example
 * removeItems(['user', 'settings'], 'session');
 */
export const removeItems = (keys: string[], type: StorageType = 'local') => {
  const storage = getStorage(type);
  keys.forEach((key) => {
    storage.removeItem(key);
  });
};

/**
 * Clears all data from localStorage or sessionStorage.
 *
 * @param type - 'local' or 'session'. Defaults to 'local'.
 *
 * @example
 * clearStorage(); // Clears localStorage
 */
export const clearStorage = (type: StorageType = 'local') => {
  const storage = getStorage(type);
  storage.clear();
};

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
export const getStorageUsage = (type: StorageType = 'local') => {
  const storage = getStorage(type);
  let usedBytes = 0;

  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key) {
      const value = storage.getItem(key);
      if (value) {
        usedBytes += key.length + value.length;
      }
    }
  }

  // Assume 5MB limit (commonly browser default, but varies)
  const maxBytes = 5 * 1024 * 1024;
  const freeBytes = Math.max(0, maxBytes - usedBytes);

  return {
    usedBytes,
    freeBytes,
    maxBytes,
    usedMB: (usedBytes / (1024 * 1024)).toFixed(2),
    freeMB: (freeBytes / (1024 * 1024)).toFixed(2),
    maxMB: (maxBytes / (1024 * 1024)).toFixed(2),
  };
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
export const getStorageUsageSummary = (type: StorageType = 'local') => {
  const { usedMB, maxMB } = getStorageUsage(type);
  const percentage = ((parseFloat(usedMB) / parseFloat(maxMB)) * 100).toFixed(2);

  return `Used ${usedMB}MB of ${maxMB}MB (${percentage}%)`;
};

