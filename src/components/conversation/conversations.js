import { useEffect, useState } from "react";
import { IsLoading } from "../Loading";
import "./conversation.css";
import io from 'socket.io-client';

import BlobtoBase64 from "../../function/BlobtoBase64";
export default function Conversation({ conversation, currentUser,mess }) {
    const socket = io.connect(process.env.REACT_APP_DB_HOST); // Replace with your server URL
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [username,setUsername]=useState()
    const [NewestMess,setNewestMesst]=useState()

    // useEffect(() => {
    //     socket.on("getMessage", (data) => {
    //       console.log("Received data:", data);
    //       setArrivalMessage({
    //         sender_id: data.sender_id,
    //         content: data.content,
    //         create_at: Date.now(),
    //       });
    //     });
    //   }, []);
    // useEffect(()=>
    // {
    //     console.log(arrivalMessage)
    // },[arrivalMessage])
    
    useEffect(()=>{

        const getUsername= () => {
            let friendId=conversation.user1;
            if(conversation.user1!=conversation.user2)
            {
                
                const data = [conversation.user1, conversation.user2];
                friendId = data.find((m) => m !== currentUser);
            }
            
            const getUser = async () => {
                try {
                    const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/username?id=${friendId}`);
                    const data2 = await res.json();
                    setUsername(data2)
                } catch (err) {
                    console.log("Không có giá trí");
                }
            };
            getUser()
            
        }
        getUsername()
    },[conversation, currentUser])
    useEffect(()=>{

        const getMess= () => {
            let friendId=conversation.user1;
            if(conversation.user1!=conversation.user2)
            {
                
                const data = [conversation.user1, conversation.user2];
                friendId = data.find((m) => m !== currentUser);
            }
            
            const resApi = async () => {
                try {
                    const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/message/newest/${conversation.id}`);
                    const data2 = await res.json();
                    setNewestMesst(data2)
                } catch (err) {
                    console.log("Không có giá trí");
                }
            };
            resApi()
            
        }
        getMess()
    },[conversation, currentUser,mess])
  
    useEffect( () => {
        
        const studentInfo = async () => {
            if(username)
            {

                const URL2 = `${process.env.REACT_APP_DB_HOST}/api/getStudentbyID/${username[0].username} `;
                
                try {
                    const studentApi = await fetch(URL2);
                    
                    const student = await studentApi.json();
                    
                    setUser(student)
                    setIsLoading(false)
                    
                } catch (error) {
                    console.error(error);
                }
                
            }
            };
        
          studentInfo();

        
      }, [username]);
     
      return (
        <>
            {isLoading ? <IsLoading /> :
                <div className="conversation">
                    <img src={`${BlobtoBase64(user.img)}`} className="avatarImage" alt="uer avatar"></img>
                    <div className="text_conversation">

                    <span className="conversationName">{user.Name}</span>
                    <div>
                        {
                            NewestMess &&
                            <span> {NewestMess?.sender_id}: {NewestMess?.content}</span>
                        }
                    </div>
                    </div>
                </div>
            }
        </>
    );
}
