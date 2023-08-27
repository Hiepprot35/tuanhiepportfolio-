import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import useAuth from '../hook/useAuth';
import BlobtoBase64 from '../function/BlobtoBase64';
import Header from './header';
import { useRef } from 'react';
import { useRefresh } from "../hook/useRefresh";
import UseToken from '../hook/useToken';
import { IsLoading } from './Loading';
import { data, post } from 'jquery';
import { Buffer } from 'buffer';
import Conversation from './conversation/conversations';
import Message from './message/Message';
import { json } from 'react-router-dom';
const ChatApp = (prop) => {
  const inputMess = useRef(null)
  const { AccessToken, setAccessToken } = UseToken();
  const [guestImg, setGuestImg] = useState();

  const { auth } = useAuth()
  const chatboxRef = useRef(null)
  const [isClicked, setIsClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState()
  const [posts, setPosts] = useState([]);
  const [conversations, setConversation] = useState([])
  const [guest, setGuest] = useState()
  const refreshAccessToken = useRefresh()
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [messages, setMessages] = useState([]);
  const [isSent, setIsSent] = useState('');
  const socket = io.connect(process.env.REACT_APP_DB_HOST); // Replace with your server URL
  let isCancel = false
  const URL = `${process.env.REACT_APP_DB_HOST}/getallstudent`;
  useEffect(() => {
    socket.on("getMessage", (data) => {
      console.log("Received data:", data);
      setArrivalMessage({
        sender_id: data.sender_id,
        content: data.content,
        create_at: Date.now(),
      });
    });
  }, []);
  

 
  useEffect(() => {
    socket.emit("addUser", auth.userID);

  }, [auth]);
  useEffect(() => {
    if (arrivalMessage) {
      const data = [currentChat?.user1, currentChat?.user2];
      data.includes(arrivalMessage.sender_id) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);


  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/conversations/${auth.userID}`,
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            }
          })

        const respon = await res.json();
        setConversation(respon)
      } catch (error) {

      }
    }
    getConversation()
  }, [])
  useEffect(() => {

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
                            "username": "SV1001001"
                        }
                    )
            });

                const student = await studentApi.json();

                setGuestImg(student)
            
        } catch (error) {
            console.error(error);
        }
    };
    studentInfo();
  
}, [currentChat]);
  const getData = async () => {

    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${AccessToken}`
        }
      });
      if (response.ok) {

        const data = await response.json()


        setIsLoading(false)
        setPosts(data)
      }

    } catch (error) {

      console.error(error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender_id: auth.userID,
      content: inputMess.current.value,
      conversation_id: currentChat.id,
    };
    const user12 = [currentChat?.user1, currentChat?.user2]
    const receiverId = user12.find(
      (member) => member !== auth.userID
    );

    socket.emit("sendMessage", {
      sender_id: auth.userID,
      receiverId,
      content: inputMess.current.value,
    });
    try {
      const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
      });
      const data = await res.json()
      setMessages([...messages, data]);
      inputMess.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/message/${currentChat.id}`);
        setMessages(await res.json());
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

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
    getData()
  }, [])
  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessages((pre) => [...pre, message])
    }
    )
    return () => {
      socket.off('receive_message')
    }
  }, []);

  const sendMessage = () => {
    // if (prop.room !== "") {
    //   socket.emit("join_room", prop.room);
    // }
    socket.emit('send_message', {
      UserID: auth.userID,
      Message: inputMess.current.value,
      img: user.img,
      // room: prop.room
    });

    inputMess.current.focus()
    inputMess.current.value = ''
  };

  useEffect(() => {

    chatboxRef.current && chatboxRef.current.scrollTo({
      top: chatboxRef.current.scrollHeight,
      behavior: 'smooth', // Tạo hiệu ứng cuộn mượt
    }) || <div>cac</div>


  }, [messages]);
  return (
    <>
      <Header></Header>
      {
        <>
          <div className='Container_ChatApp'>
            <div className='Narbar_ChatApp'>
              <input placeholder="Search for friends" className="chatMenuInput" />

              {conversations.map((c, index) => (
                <div onClick={() => setCurrentChat(c)} key={index}>
                  <Conversation conversation={c} currentUser={auth.userID} />
                </div>
              ))}

            </div>
            <div className='Main_ChatApp'>

              <div className='Header_ChatApp'>


              </div>
              <div className='ChatApp' ref={chatboxRef}>
                <div>
                  {messages.map((message, index) => (

                    <Message key={index} message={message} guest={currentChat} my={auth.userID} own={message.sender_id === auth.userID} student={guestImg}></Message>
                  ))
                  }
                </div>


              </div>
              <div className='inputValue'>

                <input
                  ref={inputMess}
                  type="text"
                // value={inputMessage}
                // onChange={(e) => setInputMessage(e.target.value)}
                />
                <button onClick={handleSubmit}>Send</button>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default ChatApp;
