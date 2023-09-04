import { useState, useEffect, useRef } from "react";
import BlobtoBase64 from "../../function/BlobtoBase64";
import './message.css';
import getTime from "../../function/getTime";
import { IsLoading } from "../Loading";
export default function Message({ message, own, student, Online, listSeen }) {
    const [isLoading, setIsLoading] = useState(true)
    const [guestImg, setGuestImg] = useState();
    const [myImg, setMyImg] = useState();
    const [mssvUser, setMssvUser] = useState();
    const time = useRef(null)
    const seen_text = useRef(null)

    const ListusersOnline = Online && Online.map(item => item.userId) || [];
 
    return (
        <>
            {
            }
            <div className="containerMessage">

                {
                    message ?


                        <div className={own ? "message own" : "message"}>
                            { }
                            <div className="Mess_seen_container">
                                <div className="messageTop">

                                    {
                                        !own &&
                                        student?.img && message.content !== null &&
                                        <>
                                            <div className='avatar_dot'>

                                                <img
                                                    className="avatarImage"

                                                    src={`${BlobtoBase64(student?.img)}`} alt="sender" />
                                                <span className={`dot ${ListusersOnline.includes(student?.userID) ? "activeOnline" : {}}`}> </span>

                                            </div>
                                        </>
                                    }
                                    {
                                        message.content != null ?
                                            <div className="Mess_seen_text">
                                                <p className="messageText">{message.content}</p>
                                                <p className="messageBottom" ref={time}>{getTime(message.created_at)}</p>

                                            </div>
                                            : <></>

                                    }
                                </div>
                                {
                                    message?.id === listSeen?.id && listSeen &&

                                    <div className="Seen_field">
                                        <img                                       
                                            className="avatarImage"
                                            style={{ width: "20px", height: "20px" }}
                                            src={`${BlobtoBase64(student?.img)}`} alt="sender" />
                                        <p ref={seen_text} style={{ fontSize: "0.9rem", color: "gray" }} >
                                            Seen at {getTime(listSeen?.Seen_at)}
                                        </p>


                                    </div>
                                }
                            </div>

                        </div> : <IsLoading />
                }
            </div >
        </>
    );
}
