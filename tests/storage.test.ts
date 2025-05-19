import { clearStorage, getItem, removeItem, removeItems, setItem } from "../src";

/**
 * Unit tests for the secure storage utility functions.
 */
describe('Storage Utility', () => {
  const testKey = 'test';
  const testValue = { user: 'Alice' };
  const hashKey = 'secretKey';

  // Clear both storages after each test to avoid cross-test pollution
  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  /**
   * Should store and retrieve an unencrypted value from localStorage.
   */
  test('should store and retrieve unencrypted data in localStorage', () => {
    setItem(testKey, testValue);
    const result = getItem<typeof testValue>(testKey);
    expect(result).toEqual(testValue);
  });

  /**
   * Should correctly encrypt and decrypt a value using AES and retrieve it from localStorage.
   */
  test('should store and retrieve encrypted data in localStorage', () => {
    setItem(testKey, testValue, { encrypt: true, hashKey });
    const result = getItem<typeof testValue>(testKey, { encrypt: true, hashKey });
    expect(result).toEqual(testValue);
  });

  /**
   * Should return null and remove the item if it has expired.
   */
  test('should return null for expired item', () => {
    jest.useFakeTimers().setSystemTime(Date.now());
    setItem(testKey, testValue, { expiresIn: 1 }); // expires in 1 second
    jest.advanceTimersByTime(2000); // move forward 2 seconds
    const result = getItem<typeof testValue>(testKey);
    expect(result).toBeNull();
    jest.useRealTimers();
  });

  /**
   * Should remove a single item from localStorage.
   */
  test('should remove an item', () => {
    setItem(testKey, testValue);
    removeItem(testKey);
    expect(getItem<typeof testValue>(testKey)).toBeNull();
  });

  /**
   * Should remove multiple items from localStorage.
   */
  test('should remove multiple items', () => {
    setItem('a', 1);
    setItem('b', 2);
    removeItems(['a', 'b']);
    expect(getItem('a')).toBeNull();
    expect(getItem('b')).toBeNull();
  });

  /**
   * Should clear all items from localStorage.
   */
  test('should clear localStorage', () => {
    setItem('x', 1);
    setItem('y', 2);
    clearStorage();
    expect(getItem('x')).toBeNull();
    expect(getItem('y')).toBeNull();
  });

  /**
   * Should store and retrieve data using sessionStorage when specified.
   */
  test('should work with sessionStorage', () => {
    setItem('sessionTest', 'value', { type: 'session' });
    const result = getItem('sessionTest', { type: 'session' });
    expect(result).toBe('value');
  });

  /**
   * Should throw an error when trying to encrypt without providing a hashKey.
   */
  test('should throw error when encrypting without hashKey', () => {
    expect(() =>
      setItem(testKey, testValue, { encrypt: true })
    ).toThrow('hashKey is required for encryption');
  });
});
