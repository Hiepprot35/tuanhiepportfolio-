import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatApp = (prop) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket = io.connect('https://tuanhiepprot3api.onrender.com/'); // Replace with your server URL

  useEffect(() => {
    socket.on('recevie_messsage', (message) => {
      setMessages([...messages,message]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit('SendMessage',{
      UserID:prop.user.userID,
      Message:inputMessage});
    setInputMessage('');
  };

  return (
    <div className='ChatApp'>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.UserID}: {message.Message}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
