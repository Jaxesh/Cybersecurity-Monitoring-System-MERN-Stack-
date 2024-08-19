// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({ timestamp: '', type: '', message: '' });

  useEffect(() => {
    axios.get('/logs')
      .then(response => setLogs(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/logs', newLog)
      .then(response => setLogs([...logs, response.data]))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Cybersecurity Logs</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          value={newLog.timestamp}
          onChange={(e) => setNewLog({ ...newLog, timestamp: e.target.value })}
          required
        />
        <input
          type="text"
          value={newLog.type}
          onChange={(e) => setNewLog({ ...newLog, type: e.target.value })}
          placeholder="Log Type"
          required
        />
        <textarea
          value={newLog.message}
          onChange={(e) => setNewLog({ ...newLog, message: e.target.value })}
          placeholder="Log Message"
          required
        />
        <button type="submit">Add Log</button>
      </form>
      <ul>
        {logs.map(log => (
          <li key={log._id}>
            <strong>{new Date(log.timestamp).toLocaleString()}</strong> - {log.type}: {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
