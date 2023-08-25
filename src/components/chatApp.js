import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import useAuth from '../hook/useAuth';
import BlobtoBase64 from '../function/BlobtoBase64';
import { useRef } from 'react';
const ChatApp = (prop) => {
  const inputMess = useRef(null)
  const { auth } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState()
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket = io.connect(process.env.REACT_APP_DB_HOST); // Replace with your server URL
  useEffect(() => {
    let isAlivew = true;

    const studentInfo = async () => {
      const URL = `${process.env.REACT_APP_DB_HOST}/api/getStudentbyID`;
      try {
        const studentApi = await fetch(URL, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',

          },
          body:
            JSON.stringify(
              {
                "username": auth.username
              }
            )
        });
        if (isAlivew) {

          const student = await studentApi.json();

          setUser(student)
          console.log(student)
          setIsLoading(false)
        }
      } catch (error) {
        console.error(error);
      }
    };
    studentInfo();
    return () => {
      isAlivew = false
    }
  }, []);
  useEffect(() => {
    socket.on('recevie_messsage', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    setInputMessage(inputMess.current.value)
    socket.emit('SendMessage', {
      UserID: prop.user.userID,
      Message: inputMessage,
      img: user.img
    });
    inputMess.current.focus()
    inputMess.current.value = ''
  };

  return (
    <div className='ChatApp'>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {
              console.log(message) &&
              message.UserID === auth.userID &&
              <div className='box_right'>

                <div className='myChatbox'>

                  {/* <img src={`${BlobtoBase64(message.img)}`} className='avatarImage' alt='User Avatar' /> */}
                  {message.Message}
                </div>
              </div>
            }
            {message.UserID !== auth.userID &&
              <div className='box_left'>
                <img src={`${BlobtoBase64(message.img)}`} className='avatarImage' alt='User Avatar' />

                <div className='guestChatbox'>

                  {message.Message}
                </div>
              </div>
            }

          </div>
        ))}
      </div>
      <input
        ref={inputMess}
        type="text"
        // value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
