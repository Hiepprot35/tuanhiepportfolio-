import { useState, useEffect } from "react";
import BlobtoBase64 from "../../function/BlobtoBase64";
import './message.css';
import { format } from "timeago.js";

export default function Message({ message, own, guest, my }) {
    const [isLoading, setIsLoading] = useState(true)

    const [guestImg, setGuestImg] = useState();
    const [myImg, setMyImg] = useState();
    const [mssvUser,setMssvUser]=useState();
 
    const data = [guest.user1, guest.user2];
    const notOwn = data.find((m) => m !== my);
    useEffect(() => {

        const getUser = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/username?id=${notOwn}`);
                const data2 = await res.json();
                setMssvUser(data2);
                setIsLoading(false); // Đánh dấu kết thúc xử lý bất đồng bộ
            } catch (err) {
                console.log(err);
                setIsLoading(false); // Đánh dấu kết thúc xử lý bất đồng bộ trong trường hợp lỗi
            }
        };

        getUser();
    }, []);
   console.log(message)
    
    
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                {
                    // <img src={own ? BlobtoBase64(myImg?.img) : BlobtoBase64(guestImg?.img)} alt="sender" />
                }
                <p className="messageText">{message.content}</p>
            </div>
            <div className="messageBottom">{format(message.created_at)}</div>
        </div>
    );
}
