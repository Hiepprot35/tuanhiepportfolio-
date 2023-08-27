import { useState, useEffect } from "react";
import BlobtoBase64 from "../../function/BlobtoBase64";
import './message.css';
import { format } from "timeago.js";

export default function Message({ message, own, guest, student }) {

    const [guestImg, setGuestImg] = useState();
    const [myImg, setMyImg] = useState();
    const [mssvUser,setMssvUser]=useState();
 
  
    
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                {
                    !own &&
                    <img
                    className="messageImg"

                    src={ BlobtoBase64(student?.img)} alt="sender" />
                }
                <p className="messageText">{message.content}</p>
            </div>
            <div className="messageBottom">{format(message.created_at)}</div>
        </div>
    );
}
