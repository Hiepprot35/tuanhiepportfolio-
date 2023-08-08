import { useEffect, useState } from "react";
import UseToken from './hook/useToken';
import { LogOut } from "./logout";
import { useRefresh } from "./hook/useRefresh";
import { useLocation } from 'react-router-dom';
import Header from "./header";
import { IsLoading } from "./Loading";
import CreateStudent from './createStudent';
const { Buffer } = require('buffer');
export default function Home() {
    const { AccessToken, setAccessToken } = UseToken();
    const [isLoading, setIsLoading] = useState(true)
    const refreshAccessToken = useRefresh()
    const [posts, setPosts] = useState([]);
    // Function để fetch danh sách sinh viên
    const location = useLocation();
    const user = location.state?.user || {}; // Sử dụng state?.user để tránh lỗi khi state không tồn tại
    const URL = `http://localhost:4000/getallstudent`;
    console.log(user)

    useEffect(() => {
        let isCancel = false
        const getInfoUser = async () => {
            try {
                const response = await fetch(URL, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${AccessToken}`
                    }
                });
                if (response.ok && !isCancel) {

                    const data = await response.json()
                    if (data.error) {
                        refreshAccessToken({ setAccessToken })

                    }
                    else {

                        setIsLoading(false)
                        setPosts(data)
                    }
                }
                else {
                    refreshAccessToken({ setAccessToken })

                }

            } catch (error) {

                console.error(error)
            }
        }
        getInfoUser()

        return () => {
            isCancel = true
        }
    }, [AccessToken]);

    document.title = "Home"


    return (

        <>
                <Header user={user} />
            <div>
                {
                    isLoading ? <IsLoading></IsLoading> : 
                    

                        posts.map((post, index) => {
                            const bufferString = post.img && Buffer.from(post.img).toString('base64');
                            return (
                                <div key={index}>
                                <h1>{post.Name}</h1>
                                <img className="avatarImage" src={`data:image/jpeg;base64,${bufferString}`} alt="{index}" />
                            </div>
                        )
                    })
                
                }
                {/* <button onClick={logout}>Log out</button> */}
                <LogOut></LogOut>
               
            </div>
        </>
    )
}
