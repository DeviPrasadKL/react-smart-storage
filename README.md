# 📦 react-smart-storage

**`react-smart-storage`** is a lightweight, type-safe utility library for simplifying the usage of `localStorage` and `sessionStorage` in React applications using TypeScript. It also supports optional AES encryption for securely storing sensitive data.

> 🚀 Clean APIs, ✨ Type-safe, 🔐 Optional encryption, 💡 Beginner-friendly

---

## 📥 Installation

You can install the package using npm or yarn:

```bash
npm i react-smart-storage
```

🔧 Getting Started
1. Import the helpers (ts)
```bash
import { setItem, getItem, removeItem, clearStorage } from 'react-smart-storage';
```
2. Store a value in localStorage (without encryption) (ts)
```bash
setItem('user', { name: 'Deviprasad', role: 'admin' });
```
3. Retrieve the value (no encryption) (ts)
```bash
const user = getItem<{ name: string; role: string }>('user');
console.log(user?.name); // Output: Deviprasad
```
4. Store an encrypted value (ts)
```bash
const secretKey = 'my-super-secret-key';

setItem('secureUser', { name: 'Deviprasad', role: 'admin' }, 'local', true, secretKey);

```
5. Retrieve the encrypted value (ts)
```bash
const secretKey = 'my-super-secret-key';

const secureUser = getItem<{ name: string; role: string }>('secureUser', 'local', true, secretKey);
console.log(secureUser?.role); // Output: admin

```

6. Remove a specific item (ts)
```bash
removeItem('user');
```
7. Clear all storage (ts)
```bash
clearStorage(); // Clears localStorage by default
```
8. Use sessionStorage instead of localStorage (ts)
```bash
setItem('sessionId', 'abc123', 'session');
const sessionId = getItem<string>('sessionId', 'session');
```
---
📚 API Reference
🔒 StorageType (ts)
```bash
type StorageType = 'local' | 'session';
```
💾 setItem
```bash
setItem<T>(
  key: string,
  value: T,
  type?: StorageType,       // 'local' or 'session' (default is 'local')
  encrypt?: boolean,        // Enable encryption? (default is false)
  hashKey?: string          // Required if encrypt is true
): void;

```
🔍 getItem
```bash
getItem<T>(
  key: string,
  type?: StorageType,       // 'local' or 'session' (default is 'local')
  encrypt?: boolean,        // Is the value encrypted? (default is false)
  hashKey?: string          // Required if encrypt is true
): T | null;

```

❌ removeItem
```bash
removeItem(key: string, type?: StorageType): void;
```

🧹 clearStorage
```bash
clearStorage(type?: StorageType): void;
```

---
## 💡 React Example
```bash
import React, { useEffect } from 'react';
import { setItem, getItem } from 'react-smart-storage';

const Profile = () => {
  useEffect(() => {
    const hashKey = 'my-secret-key';

    setItem('user', { name: 'Deviprasad', role: 'admin' }, 'local', true, hashKey);

    const user = getItem<{ name: string; role: string }>('user', 'local', true, hashKey);
    console.log(user?.role); // Output: admin
  }, []);

  return <div>Welcome, check the console!</div>;
};

export default Profile;

```
✅ Why use this?  
---
🧠 Simple and intuitive API

🔒 Fully TypeScript supported

🚀 Fast and lightweight

📦 Works out of the box

💻 Supports both localStorage and sessionStorage
---
🧑‍💻 Contributing
We welcome contributions! Please read our CONTRIBUTING.md for guidelines on how to help improve the project.

📄 License
MIT © Deviprasad



---

