import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import useAuth from '../hook/useAuth';
import BlobtoBase64 from '../function/BlobtoBase64';
import { useRef } from 'react';
import { data } from 'jquery';
const ChatApp = (prop) => {
  const inputMess = useRef(null)
  const { auth } = useAuth()
  const chatboxRef=useRef(null)
  const [isClicked, setIsClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState()
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket = io.connect(process.env.REACT_APP_DB_HOST); // Replace with your server URL
  const joinRoom = () => {
    
  };
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
    socket.on('receive_message', (message) => {
      setMessages((pre)=>[...pre,message])
    }
    )
    return ()=>
    {
      socket.off('receive_message')
    }
    }, []);
  
  const sendMessage = () => {
    if (prop.room !== "") {
      socket.emit("join_room", prop.room);
    }
    socket.emit('send_message', {
      UserID: prop.user.userID,
      Message: inputMess.current.value,
      img: user.img,
      room: prop.room
    });
    
    inputMess.current.focus()
    inputMess.current.value = ''
  };
  useEffect(() => {
    chatboxRef.current.scrollTo({
      top: chatboxRef.current.scrollHeight,
      behavior: 'smooth', // Tạo hiệu ứng cuộn mượt
    });
  }, [messages]);
  return (
    <div className='Main_ChatApp'>
    <div className='ChatApp' ref={chatboxRef}>
      <div>
        {messages.map((message, index) => (
          <div key={index}>

             {
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
      

    </div>
    <div className='inputValue'>

      <input
        ref={inputMess}
        type="text"
        // value={inputMessage}
        // onChange={(e) => setInputMessage(e.target.value)}
        />
      <button onClick={sendMessage}>Send</button>
        </div>
    </div>
  );
};

export default ChatApp;
