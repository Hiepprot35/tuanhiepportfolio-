import { useEffect, useState } from "react";
import UseToken from '../hook/useToken';
import { useRefresh } from "../hook/useRefresh";
import { useLocation } from 'react-router-dom';
import Header from "./Layout/header/header";
import { IsLoading } from "./Loading";
import useAuth from "../hook/useAuth";
import io from 'socket.io-client';

const { Buffer } = require('buffer');

export default function Home() {
    const socket = io.connect(process.env.REACT_APP_DB_HOST); // Replace with your server URL

    const { AccessToken, setAccessToken } = UseToken();
    const { auth, setAuth } = useAuth();
    const [userID, setuserID] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const refreshAccessToken = useRefresh()
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [classInfo, setClass] = useState([]);
    const DataPerPage = 4;
    const startIndex = (currentPage - 1) * DataPerPage;
    const endIndex = startIndex + DataPerPage
    useEffect(() => {
        fetch(`${process.env.REACT_APP_DB_HOST}/api/getAllClass`)
            .then(res => res.json())
            .then(Classes => {
                setClass(Classes);
            });
    }, [AccessToken]);

    const getClassName = (classID) => {
        for (let i = 0; i < classInfo.length; i++) {
            if (classID === classInfo[i].CLASSID) {
                return (
                    <td>
                        {classInfo[i].CLASSNAME}
                    </td>
                );
            }
        }
        return (
            <td>Class Not Found</td>
        );
    };

   
    const handleAddChat = async (MSSV) => {
        const userID = await getUserID(MSSV)
        console.log(userID)
        try {

            const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/conversations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user1": auth.userID,
                    "user2": userID[0].UserID
                })
            })
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => { console.log(userID) }, [userID])
    // Function để fetch danh sách sinh viên
    const location = useLocation();
    const user = location.state?.user || {}; // Sử dụng state?.user để tránh lỗi khi state không tồn tại
    const URL = `${process.env.REACT_APP_DB_HOST}/getallstudent`;
    let isCancel = false
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
    const getUserID = async (MSSV) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/userID/${MSSV}`)
            const userID = await res.json()
            return userID
            // return userID

        } catch (error) {
            console.log(error)
        }
    }
    // useEffect(() => {
    //     const getInfoUser = async () => {

    //         try {
    //             const response = await fetch(URL, {
    //                 method: "GET",
    //                 headers: {
    //                     'Authorization': `Bearer ${AccessToken}`
    //                 }
    //             });
    //             if (response.ok && !isCancel) {

    //                 const data = await response.json()
    //                 if (data.error) {
    //                     refreshAccessToken()

    //                 }
    //                 else {

    //                     setIsLoading(false)
    //                     setPosts(data)
    //                 }
    //             }
    //             else {

    //                  refreshAccessToken()

    //             }

    //         } catch (error) {

    //             console.error(error)
    //         }
    //     }
    //     getInfoUser()

    //     return () => {
    //         isCancel = true
    //     }
    // }, [AccessToken]);
    useEffect(() => {
        async function fetchData() {
            try {
                const refreshedData = await refreshAccessToken();
                refreshedData.AccessToken ? setAccessToken(refreshedData.AccessToken) : console.log("OKE")

                // Tiếp tục xử lý dữ liệu sau khi làm mới access token
            } catch (error) {
                // Xử lý lỗi nếu cần
            }
        }

        fetchData();
        console.log("ok")
    }, []);
    const [room, setRoom] = useState()
    useEffect(() => {
        getData()
    }, [AccessToken])
    const join_room = (room) => {

        setRoom(room)

    }
    document.title = "Home"
    const currentData = posts.slice(startIndex, endIndex)
    const totalPages = Math.ceil(posts.length / DataPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (

        <>
            <Header />
            <div className="container_main">
                {
                    isLoading ? <IsLoading></IsLoading> :

                        <table>
                            <thead>

                                <tr>
                                    <th>MSSV</th>
                                    <th>Name</th>
                                    <th>Avatar</th>
                                    <th>Giới tính</th>
                                    <th>Lớp</th>
                                    <th>Add mess</th>

                                </tr>

                            </thead>
                            <tbody>
                                {
                                    currentData.map((post, index) => {
                                        const bufferString = post.img && Buffer.from(post.img).toString('base64');
                                        return (
                                            <tr key={index} >
                                                <td>{post.MSSV}</td>
                                                <td>{post.Name}</td>
                                                <td>
                                                    <img className="avatarImage" src={`data:image/jpeg;base64,${bufferString}`}
                                                        alt="{index}"
                                                        onClick={() => join_room(`${post.userID}`)} />
                                                </td>

                                                <td>
                                                    {post.Sex}
                                                </td>

                                                {
                                                    getClassName(post.Class)
                                                }

                                                <td> <button onClick={() => { handleAddChat(post.MSSV) }}> add</button></td>


                                            </tr>
                                        )
                                    })

                                }
                            </tbody>

                        </table>
                }
                <div>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
                {/* <ChatApp user={auth} room={room} /> */}
            </div>

        </>
    )
}
