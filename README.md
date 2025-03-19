# API Explorer

## 📌 Overview
API Explorer is a React application that allows users to fetch and display data from various public APIs dynamically. It utilizes **Redux Toolkit Thunk** for managing API requests efficiently.

## 🚀 Features
- Select any public API from a dropdown menu.
- Fetch and display data dynamically.
- Manage API responses using Redux Toolkit.
- Handle loading and error states effectively.
- Retry fetching in case of errors.

## 🛠️ Tech Stack
- **Frontend:** React (Vite)
- **State Management:** Redux Toolkit & Thunk
- **Backend:** Public APIs
- **UI Styling:** CSS (Basic styling)

## 📂 Project Structure
```
API-Explorer/
│-- src/
│   │-- assets/Component/
│   │   │-- apiSlice.js
│   │-- App.js
│   │-- main.jsx
│-- redux/
│   │-- store.js
│-- index.html
│-- package.json
│-- README.md
```

## 🎯 Installation & Setup
1️⃣ **Clone the repository**
```bash
git clone https://github.com/your-username/API-Explorer.git
cd API-Explorer
```

2️⃣ **Install dependencies**
```bash
npm install
```

3️⃣ **Run the application**
```bash
npm run dev
```

## 📌 How It Works
### **1️⃣ Setup Redux Store**
```javascript
import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './apiSlice';

const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});

export default store;
```

### **2️⃣ Create Redux Slice (`apiSlice.js`)**
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'api/fetchData',
  async (url, { rejectWithValue }) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default apiSlice.reducer;
```

### **3️⃣ Implement API Fetching in React (`App.js`)**
```javascript
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './../src/assets/Component/apiSlice';

const API_OPTIONS = {
  'Pokémon API': 'https://pokeapi.co/api/v2/pokemon/ditto',
  'GitHub Users': 'https://api.github.com/users/octocat',
  'OpenWeather API': 'https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&current_weather=true',
};

const App = () => {
  const [selectedAPI, setSelectedAPI] = useState(Object.keys(API_OPTIONS)[0]);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);

  const handleFetch = () => {
    dispatch(fetchData(API_OPTIONS[selectedAPI]));
  };

  return (
    <div className="container">
      <h1>API Explorer</h1>

      <select value={selectedAPI} onChange={(e) => setSelectedAPI(e.target.value)}>
        {Object.keys(API_OPTIONS).map((api) => (
          <option key={api} value={api}>
            {api}
          </option>
        ))}
      </select>

      <button onClick={handleFetch} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Data'}
      </button>

      {loading && <p>Loading...</p>}
      {error && (
        <p style={{ color: 'red' }}>
          Error: {error} <button onClick={handleFetch}>Retry</button>
        </p>
      )}

      {data && (
        <pre style={{ textAlign: 'left', background: '#eee', padding: '10px' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default App;
```

## 🎨 UI Preview
> The UI consists of:
- A **dropdown** to select an API