import { clearStorage, getItem, removeItem, removeItems, setItem } from "../src";

describe('Storage Utility', () => {
  const testKey = 'test';
  const testValue = { user: 'Alice' };
  const hashKey = 'secretKey';

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('should store and retrieve unencrypted data in localStorage', () => {
    setItem(testKey, testValue);
    const result = getItem<typeof testValue>(testKey);
    expect(result).toEqual(testValue);
  });

  test('should store and retrieve encrypted data in localStorage', () => {
    setItem(testKey, testValue, { encrypt: true, hashKey });
    const result = getItem<typeof testValue>(testKey, { encrypt: true, hashKey });
    expect(result).toEqual(testValue);
  });

  test('should return null for expired item', () => {
    jest.useFakeTimers().setSystemTime(Date.now());
    setItem(testKey, testValue, { expiresIn: 1 }); // expires in 1 second
    jest.advanceTimersByTime(2000); // move time forward by 2 seconds
    const result = getItem<typeof testValue>(testKey);
    expect(result).toBeNull();
    jest.useRealTimers();
  });

  test('should remove an item', () => {
    setItem(testKey, testValue);
    removeItem(testKey);
    expect(getItem<typeof testValue>(testKey)).toBeNull();
  });

  test('should remove multiple items', () => {
    setItem('a', 1);
    setItem('b', 2);
    removeItems(['a', 'b']);
    expect(getItem('a')).toBeNull();
    expect(getItem('b')).toBeNull();
  });

  test('should clear localStorage', () => {
    setItem('x', 1);
    setItem('y', 2);
    clearStorage();
    expect(getItem('x')).toBeNull();
    expect(getItem('y')).toBeNull();
  });

  test('should work with sessionStorage', () => {
    setItem('sessionTest', 'value', { type: 'session' });
    const result = getItem('sessionTest', { type: 'session' });
    expect(result).toBe('value');
  });

  test('should throw error when encrypting without hashKey', () => {
    expect(() =>
      setItem(testKey, testValue, { encrypt: true })
    ).toThrow('hashKey is required for encryption');
  });
});
