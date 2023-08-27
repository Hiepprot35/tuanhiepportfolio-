import { useEffect, useState } from "react";
import { IsLoading } from "../Loading";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const data = [conversation.user1, conversation.user2];
        const friendId = data.find((m) => m !== currentUser);

        const getUser = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/username?id=${friendId}`);
                const data2 = await res.json();
                setUser(data2);
                setIsLoading(false); // Đánh dấu kết thúc xử lý bất đồng bộ
            } catch (err) {
                console.log(err);
                setIsLoading(false); // Đánh dấu kết thúc xử lý bất đồng bộ trong trường hợp lỗi
            }
        };

        getUser();
    }, [currentUser, conversation]);

    return (
        <>
      
            {isLoading ? <IsLoading /> :
                <div className="conversation">
                    <span className="conversationName">{user[0]?.username}</span>
                </div>
            }
        </>
    );
}
