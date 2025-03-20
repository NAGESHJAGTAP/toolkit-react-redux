import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './../Component/apiSlice';

const API_OPTIONS = {
  'Pokémon API': 'https://pokeapi.co/api/v2/pokemon/ditto',
  'GitHub Users': 'https://api.github.com/users/octocat',
  'OpenWeather API': 'https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&current_weather=true',
};

const Api = () => {
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

export default Api;



