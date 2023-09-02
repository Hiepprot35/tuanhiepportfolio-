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
import getTime from '../../function/getTime';

const ChatApp = ({ messageId }) => {
  document.title = "Message"
  const inputMess = useRef()
  const { AccessToken, setAccessToken } = UseToken();
  const [guestImg, setGuestImg] = useState();
  const { auth } = useAuth()
  const chatboxRef = useRef(null)
  const [MSSVReceived, setMSSVReceived] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState()
  const [conversations, setConversation] = useState([])
  const refreshAccessToken = useRefresh()
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const ChoosenUser = useRef()
  const [userSeenAt, setuserSeenAt] = useState()
  const [clicked, setClicket] = useState()
  const [onlineUser, setOnlineUser] = useState()
  const [messages, setMessages] = useState([]);
  const [seenMess, setSeenMess] = useState([])
  const [isSeen, setisSeen] = useState(false)
  const data = []
  useEffect(() => {
    if (messageId) {
      const senApi = async () => {


        try {
          const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/conversations/mess/${messageId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"id":auth.userID})
          });
          const data = await res.json()
          setCurrentChat(data)
        } catch (err) {
          console.log(err);
        }
      }
      senApi()
    }
  }, [])
  console.log(()=>
  {          console.log(currentChat);
  },[currentChat])
  const socket = useRef(); // Replace with your server URL
  let isCancel = false
  const ListusersOnline = onlineUser && onlineUser.map(item => item.userId) || [];

  const URL = `${process.env.REACT_APP_DB_HOST}/getallstudent`;
  const ClickChat = (data) => {
    setCurrentChat(data);

  }
  useEffect(() => {
    inputMess.current && inputMess.current.focus()
  }, [currentChat])
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
        const data = await res.json()
        console.log(data)
        setMessages([...messages, data]);
        inputMess.current.value = "";
      } catch (err) {
        console.log(err);
      }
    }
  }

  const clickConversation = async (data) => {
    const user12 = [data?.user1, data?.user2]
    const receiverId = user12.find(
      (member) => member !== auth.userID
    );
    const sentToApi = {
      conversation_id: data?.id,
      sender_id: receiverId

    }
    const resFunctiongetNewestMessSeen = async () => {

      try {
        const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/message/seen`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sentToApi)
        });
      } catch (err) {
        console.log(err);
      }
    }
    resFunctiongetNewestMessSeen()


    const sendSocket = {
      sender_id: auth.userID,
      receiverId,
    }
    socket.current.emit("UserSeen", sendSocket)
    console.log(sendSocket)

  }



  useEffect(() => {
    socket.current = io(process.env.REACT_APP_DB_HOST);
    socket.current.on("getMessage", (data) => {

      setArrivalMessage({
        sender_id: data.sender_id,
        content: data.content,
        created_at: Date.now(),
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
    socket.current.on("getUserSeen", (data) => {
      setisSeen(
        data
      )

    })
  }, [auth]);
  // useEffect(() => {


  //   , [auth])
  useEffect(() => {
    if (arrivalMessage) {
      const data = [currentChat?.user1, currentChat?.user2];
      data.includes(arrivalMessage.sender_id) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    const getConversation = async () => {
      const URL = `${process.env.REACT_APP_DB_HOST}/api/conversations/${auth.userID}`
      try {

        const res = await fetch(URL,
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            }
          })

        const respon = await res.json();
        setConversation(respon)
        data = [respon]
      } catch (error) {

      }
    }
    getConversation()
  }, [messages, arrivalMessage])
  useEffect(() => {

    console.log(conversations)
  }, [conversations])
  useEffect(() => {


    const getNewstMess = async () => {
      try {

        console.log(`${process.env.REACT_APP_DB_HOST}/api/message/newest/seen/${currentChat.id}/${auth.userID}`)
        const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/message/newest/seen/${currentChat.id}/${auth.userID}`)
        const getMess = await res.json();
        setuserSeenAt(getMess)
      } catch (error) {
        console.log(error)
      }

    }
    getNewstMess()

  }, [currentChat, messages, isSeen])

  useEffect(() => {
    const studentInfo = async (data, userID) => {
      if (data) {

        const URL2 = `${process.env.REACT_APP_DB_HOST}/api/getStudentbyID/${data} `;
        try {
          const studentApi = await fetch(URL2);
          const student = await studentApi.json();
          student.userID = userID
          setGuestImg(student)
        } catch (error) {
          console.error(error);
        }
      };
    }
    if (MSSVReceived) {
      const data = MSSVReceived[0]?.username;
      const userid = MSSVReceived[0]?.UserID;
      studentInfo(data, userid);
    }
  }, [MSSVReceived, currentChat]);

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
      inputMess.current.focus()
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(()=>{
  //   senewMessAllUsert(getUserSeen)
  // },[getUserSeen,currentChat])
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

              {conversations && Array.isArray(conversations) && conversations.length !== 0 && conversations.map((c, index) => (

                <div onClick={() => { ClickChat(c) }} key={index} className='converrsation_chat' style={currentChat === c ? { backgroundColor: "rgb(245, 243, 243)" } : {}} >

                  <Conversation conversation={c} currentUser={auth.userID} Arrivalmess={arrivalMessage} mess={messages.length} Online={onlineUser} />
                </div>
              ))}
            </div>
            <div className='Main_ChatApp'>
              {
                conversations.length === 0 ? <div className='chatbox_res'>Kết bạn đi anh bạn <a href='/home'>kết bạn</a></div> :
                  <>
                    {
                      !currentChat ? <div className='chatbox_res'>Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới</div> :
                        <>
                          <div className='Header_ChatApp'>
                            <a href='cac'>
                              {
                                guestImg &&
                                <>
                                  <div className='header_online'>
                                    <div className='avatar_dot'>

                                      <img className='avatarImage' alt='Avatar' src={`${BlobtoBase64(guestImg.img)}`}></img>
                                      <span className={`dot ${ListusersOnline.includes(guestImg.userID) ? "activeOnline" : {}}`}>  </span>
                                    </div>

                                    <div className='header_text'>

                                      <div style={{ fontSize: "1.5rem", color: "black", fontWeight: "bold" }}> {guestImg.Name}</div>
                                      {
                                        <>{ListusersOnline.includes(guestImg.userID) ? <>Đang hoạt động</> : <>Không hoạt động</>}</>
                                      }
                                    </div>
                                  </div>
                                </>
                              }
                            </a>
                          </div>

                          <div className='Body_Chatpp'>
                            <div className='ChatApp' ref={chatboxRef}>
                              <div>
                                {messages.map((message, index) => (
                                  <div className='message_content' key={index}>




                                    <Message key={index} message={message}
                                      my={auth.userID} own={message.sender_id === auth.userID} student={guestImg} Online={onlineUser} seen={seenMess} listSeen={userSeenAt} ></Message>

                                  </div>

                                ))}


                              </div>
                              <div className='inputValue'>
                                <div className='feature_field'>
                                  <input
                                    type='file'></input>
                                </div>
                                <div className='text_field'>

                                  <input
                                    onKeyPress={handleKeyPress}
                                    onClick={() => clickConversation(currentChat)}
                                    onFocus={() => clickConversation(currentChat)}
                                    ref={inputMess}
                                    placeholder='Send a messsage'
                                    type="text"
                                    required
                                  // value={inputMessage}
                                  // onChange={(e) => setInputMessage(e.target.value)}
                                  />
                                </div>
                                <div className='button_field'>

                                  {
                                    <button className='play_in_cheo' onClick={handleSubmit} >Send</button>
                                  }
                                </div>
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
