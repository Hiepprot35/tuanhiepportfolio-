import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import useAuth from '../../hook/useAuth';
import BlobtoBase64 from '../../function/BlobtoBase64';
import Header from '../Layout/header/header';
import { useRefresh } from "../../hook/useRefresh";
import UseToken from '../../hook/useToken';
import { IsLoading } from '../Loading';
import './chatApp.css'
import Conversation from '../conversation/conversations';
import Message from '../message/Message';
const ChatApp = (prop) => {
  const inputMess = useRef(null)
  const { AccessToken, setAccessToken } = UseToken();
  const [guestImg, setGuestImg] = useState();
  const { auth } = useAuth()
  const chatboxRef = useRef(null)
  const [MSSVReceived, setMSSVReceived] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState()
  const [posts, setPosts] = useState([]);
  const [conversations, setConversation] = useState([])
  const refreshAccessToken = useRefresh()
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const ChoosenUser = useRef()
  const [onlineUser, setOnlineUser] = useState()
  const [messages, setMessages] = useState([]);
  const socket = useRef(); // Replace with your server URL
  let isCancel = false
  const URL = `${process.env.REACT_APP_DB_HOST}/getallstudent`;
  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      const message = {
        sender_id: auth.userID,
        content: inputMess.current.value,
        conversation_id: currentChat.id,
      };
      const user12 = [currentChat?.user1, currentChat?.user2]
      const receiverId = user12.find(
        (member) => member !== auth.userID
      );
      socket.current.emit("sendMessage", {
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
        console.log(currentChat)
        const data = await res.json()
        setMessages([...messages, data]);
        inputMess.current.value = "";
      } catch (err) {
        console.log(err);
      }
    }
  }
  useEffect(() => { console.log(conversations) }, [conversations])
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_DB_HOST);
    socket.current.on("getMessage", (data) => {

      setArrivalMessage({
        sender_id: data.sender_id,
        content: data.content,
        create_at: Date.now(),
      });
    });
    return () => {

      socket.current.disconnect();
    }
  }, []
  )
  useEffect(() => {
    socket.current.emit("addUser", auth.userID);
    socket.current.on("getUsers", (data) => {
      setOnlineUser(data)
    })

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
  }, [messages, arrivalMessage])
  useEffect(() => {
    console.log(arrivalMessage)
  }, [arrivalMessage])
  useEffect(() => {
    const studentInfo = async (data) => {
      if (data) {

        const URL2 = `${process.env.REACT_APP_DB_HOST}/api/getStudentbyID/${data} `;
        try {
          const studentApi = await fetch(URL2);
          const student = await studentApi.json();
          setGuestImg(student)
        } catch (error) {
          console.error(error);
        }
      };
    }
    if (MSSVReceived) {
      const data = MSSVReceived[0]?.username;
      studentInfo(data);
    }
  }, [MSSVReceived, currentChat]);
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
    socket.current.emit("sendMessage", {
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
    let receiverId;
    const user12 = [currentChat?.user1, currentChat?.user2];
    currentChat?.user1 !== currentChat?.user2 ? receiverId = user12.find((member) => member !== auth.userID) : receiverId = auth.userID;

    const getUser = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/username?id=${receiverId}`);
        const data2 = await res.json();
        setMSSVReceived(data2);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
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
    console.log(conversations)
  }, [conversations])
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

              {conversations.length!==0  && conversations.map((c, index) => (
                <div onClick={() => setCurrentChat(c)} key={index} className='converrsation_chat' style={currentChat === c ? { backgroundColor: "rgb(245, 243, 243)" } : {}} >
                  <Conversation conversation={c} currentUser={auth.userID} Arrivalmess={arrivalMessage} mess={messages.length} Online={onlineUser} />
                </div>
              ))}
            </div>
            <div className='Main_ChatApp'>
              {
                conversations.length===0?<div className='chatbox_res'>Kết bạn đi anh bạn <a href='/home'>kết bạn</a></div>:
              <>
                  {
                    !currentChat ? <div className='chatbox_res'>Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới</div> :
                      <>
                        <div className='Header_ChatApp'>
                          <a href='cac'>
                            {
                              guestImg &&
                              < >
                                <img className='avatarImage' src={`${BlobtoBase64(guestImg.img)}`}></img>
                                <p> {guestImg.Name}</p>
                              </>
                            }
                          </a>
                        </div>

                        <div className='Body_Chatpp'>
                          <div className='ChatApp' ref={chatboxRef}>
                            <div>
                              {messages.map((message, index) => (
                                <Message key={index} message={message}
                                  guest={currentChat}
                                  my={auth.userID} own={message.sender_id === auth.userID} student={guestImg}></Message>
                              ))
                              }
                            </div>
                          </div>
                          <div className='inputValue'>
                            <div className='feature_field'>
                              <input
                                type='file'></input>
                            </div>
                            <div className='text_field'>

                              <input
                                onKeyPress={handleKeyPress}
                                ref={inputMess}
                                placeholder='Send a messsage'
                                type="text"
                                required
                              // value={inputMessage}
                              // onChange={(e) => setInputMessage(e.target.value)}
                              />
                            </div>
                            <div className='button_field'>

                              <button onClick={handleSubmit} >Send</button>
                            </div>
                          </div>
                        </div>
                      </>
                  }
                </>
              }

            </div>
          </div>
        </>
      }
    </>
  );
};

export default ChatApp;
