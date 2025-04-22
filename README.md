# 📦 react-smart-storage

**`react-smart-storage`** is a lightweight, type-safe utility library for simplifying the usage of `localStorage` and `sessionStorage` in React applications using TypeScript.

> 🚀 Clean APIs, ✨ Type-safe, 💡 Beginner-friendly

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
2. Store a value in localStorage (ts)
```bash
setItem('user', { name: 'Deviprasad', role: 'admin' });
```
3. Retrieve the value (ts)
```bash
const user = getItem<{ name: string; role: string }>('user');
console.log(user?.name); // Output: Deviprasad
```
4. Remove a single item (ts)
```bash
removeItem('user');
```
5. Clear all storage (ts)
```bash
clearStorage(); // Clears localStorage by default
```
6. Use sessionStorage instead (ts)
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
---
## 💡 React Example
```bash
import React, { useEffect } from 'react';
import { setItem, getItem } from 'react-smart-storage';

const Profile = () => {
  useEffect(() => {
    setItem('user', { name: 'Deviprasad', role: 'admin' });

    const user = getItem<{ name: string; role: string }>('user');
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

