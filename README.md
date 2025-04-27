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

4. Store a value with expiration (no encryption) (ts)
```bash
setItem('guest', { name: 'Visitor' }, {
  expiresIn: 60, // expires in 60 seconds
});
```

5. Store an encrypted value (ts)
```bash
const secretKey = 'my-super-secret-key';

setItem('secureUser', { name: 'Deviprasad', role: 'admin' }, {
  type: 'local',
  encrypt: true,
  hashKey: secretKey
});
```

6. Retrieve the encrypted value (ts)
```bash
const secretKey = 'my-super-secret-key';

const secureUser = getItem<{ name: string; role: string }>('secureUser', {
  encrypt: true,
  hashKey: secretKey
});
console.log(secureUser?.role); // Output: admin
```

7. Use sessionStorage instead of localStorage (ts)
```bash
setItem('sessionId', 'abc123', { type: 'session' });
const sessionId = getItem<string>('sessionId', { type: 'session' });
```

8. Remove a specific item (ts)
```bash
removeItem('user');
```
9. Remove multiple keys at once (ts)
```bash
removeItems(['user', 'sessionId', 'preferences']); // Removes multiple keys
```

10. Clear all storage (ts)
```bash
clearStorage(); // Defaults to localStorage
clearStorage('session'); // Clears sessionStorage
```

11. Get Storage Usage Details (ts)
```bash
const usage = getStorageUsage(); 
console.log(usage);
// { usedBytes: 1234, freeBytes: 5241646, maxBytes: 5242880, usedMB: "0.00", freeMB: "4.99", maxMB: "5.00" }
```

12. Get Storage Usage Summary (ts)
```bash
const summary = getStorageUsageSummary();
console.log(summary);
// Output: "Used 0.12MB of 5.00MB (2.4%)"
```

---
## 💡 React Example
```bash
import React, { useEffect } from 'react';
import { setItem, getItem, removeItem, clearStorage, removeItems, getStorageUsageSummary, getStorageUsage } from 'react-smart-storage';

export default function Storage() {

    const hashKey = '3c7e8e1b4b32f5b7a19cb06b2e67d2ea6bd4fe6aeb9c9c352c8cd7ecff59b6b1';

    useEffect(() => {
        setItem('user', { name: 'Deviprasad', role: 'admin', password: 'sample@123' });
        setItem('role', { isAdmin: true, loggedIn: 1 });
    }, []);

    const setData = () => {
        setItem('encryption', { isAdmin: true, loggedIn: 1 }, {
            type: 'local', // local is default, replace with "session" for session storage
            encrypt: true,
            hashKey: hashKey,
            expiresIn: 20
        });
        console.log('Encrypted data set');
    };

    const getData = () => {
        const encryptedData = getItem('encryption', { type: 'local', encrypt: true, hashKey: hashKey });
        const nonEncryptedData = getItem('user');
        console.log('Decrypted Data:', encryptedData);
        console.log('Decrypted Data:', nonEncryptedData);
    };

    const removeMultipleKeys = () => {
        // local is default, replace with "session" for session storage
        removeItems(['role', 'user'], 'local');
    }

    const getUsageData = () => {
        // Gives the storage usage assuming 5MB limit (commonly browser default, but varies)
        const storageSummary = getStorageUsageSummary();
        const storageUsage = getStorageUsage();
        console.log("Summaay = ", storageSummary);
        console.log("Usage Details = ", storageUsage);
    }

    return (
        <>
            <h2>Smart storage</h2>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "center",
                    flexWrap: 'wrap',
                    gap: '0.4rem'
                }}>
                <button onClick={setData}>Set encrypted data</button>
                <button onClick={getData}>Get encrypted data</button>
                <button onClick={removeMultipleKeys}>Remove Multiple keys</button>
                <button onClick={() => removeItem('user')}>Remove User</button>
                <button onClick={() => clearStorage()}>Clear data</button>
                <button onClick={getUsageData}>Get Usage</button>
            </div>
        </>
    );
}

```
---

## ✅ Why use this?  

🧠 Simple and intuitive API

🔒 Optional AES encryption support

⏳ Built-in expiration support for auto-cleanup

📊 Detailed storage usage info — Know exactly how much space you’re using and what's free.

✨ Fully TypeScript supported

🚀 Fast and lightweight

📦 Works out of the box

💻 Supports both localStorage and sessionStorage

---
## 🧑‍💻 Contributing
We welcome contributions! Please read our CONTRIBUTING.md for guidelines on how to help improve the project.

📄 License
MIT © Deviprasad



---

