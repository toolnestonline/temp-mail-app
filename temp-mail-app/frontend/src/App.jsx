import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [inbox, setInbox] = useState([]);

  const generateEmail = async () => {
    const res = await axios.post('http://localhost:5000/api/mail/generate');
    setEmail(res.data.email);
  };

  useEffect(() => {
    if (email) {
      const interval = setInterval(async () => {
        const res = await axios.get(`http://localhost:5000/api/mail/inbox/${email}`);
        setInbox(res.data);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [email]);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">📬 Temporary Email</h1>
      <button onClick={generateEmail} className="bg-blue-500 text-white px-4 py-2 rounded">
        Generate Email
      </button>
      {email && (
        <div className="mt-4">
          <p>Your email: <strong>{email}</strong></p>
          <h2 className="text-xl mt-4">Inbox:</h2>
          <ul>
            {inbox.map((msg, i) => (
              <li key={i} className="border-b py-2">
                <strong>{msg.subject}</strong><br/>
                <span className="text-sm text-gray-500">From: {msg.sender} - {new Date(msg.time).toLocaleString()}</span><br/>
                <p>{msg.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;