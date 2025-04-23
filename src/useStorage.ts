import CryptoJS from 'crypto-js';

type StorageType = 'local' | 'session';

const getStorage = (type: StorageType): Storage => {
  return type === 'local' ? localStorage : sessionStorage;
};

// 🔐 Internally hash the key using SHA256
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
export const setItem = <T>(
  key: string,
  value: T,
  type: StorageType = 'local',
  encrypt: boolean = false,
  hashKey?: string
) => {
  const storage = getStorage(type);

  if (encrypt) {
    if (!hashKey) {
      throw new Error('hashKey is required for encryption');
    }
    const encryptedValue = encryptData(value, hashKey);
    storage.setItem(key, encryptedValue);
  } else {
    storage.setItem(key, JSON.stringify(value));
  }
};

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
export const getItem = <T>(
  key: string,
  type: StorageType = 'local',
  encrypt: boolean = false,
  hashKey?: string
): T | null => {
  const storage = getStorage(type);
  const storedValue = storage.getItem(key);

  if (!storedValue) return null;

  if (encrypt) {
    if (!hashKey) {
      throw new Error('hashKey is required for decryption');
    }
    return decryptData<T>(storedValue, hashKey);
  } else {
    return JSON.parse(storedValue) as T;
  }
};

export const removeItem = (key: string, type: StorageType = 'local') => {
  const storage = getStorage(type);
  storage.removeItem(key);
};

export const clearStorage = (type: StorageType = 'local') => {
  const storage = getStorage(type);
  storage.clear();
};
