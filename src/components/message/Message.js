import { useState, useEffect,useRef } from "react";
import BlobtoBase64 from "../../function/BlobtoBase64";
import './message.css';
import { format } from "timeago.js";
import { IsLoading } from "../Loading";
export default function Message({ message, own, student }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading,setIsLoading]=useState(true)
    const [guestImg, setGuestImg] = useState();
    const [myImg, setMyImg] = useState();
    const [mssvUser, setMssvUser] = useState();
    const time=useRef(null)
    // const format=(time)=>
    // {
    //     const d=new Date()
    //     const currentTime=d.getTime();

    // }
    const handleMouseEnter = () => {
        setIsHovered(true);
        time.current.style.opacity=1;
      };
    
      const handleMouseLeave = () => {
        time.current.style.opacity=0;
      };
    const getdate = (data) => {
        const timestamp = data;
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0 (0 - 11)
        const day = date.getUTCDate();
        return `${day} - T${month}`
    }
    return (
        <>

            <div className="containerMessage">
                
                {
                    message?
               
                
                <div className={own ? "message own" : "message"}>

                    <div className="messageTop">

                        {
                            !own &&
                            student.img &&
                            <img
                            className="messageImg"
                            
                            src={`${BlobtoBase64(student?.img)}`} alt="sender" />
                        }
                        {
                        message.content !=null?
                            <p className="messageText"  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{message.content }</p>:<></>
                        }
                    </div>
                   
                   <div className="messageBottom" ref={time}>{format(message.created_at)}</div>
                   
                </div>:<IsLoading/>
                 }
            </div>
        </>
    );
}
