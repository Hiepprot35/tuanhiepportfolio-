import { useEffect, useState } from "react";
import UseToken from '../hook/useToken';
import { useRefresh } from "../hook/useRefresh";
import { useLocation } from 'react-router-dom';
import Header from "./header";
import { IsLoading } from "./Loading";
import CreateStudent from './createStudent';
import useAuth from "../hook/useAuth";
const { Buffer } = require('buffer');

export default function Home(props) {
    const { AccessToken, setAccessToken } = UseToken();
    const { auth, setAuth } = useAuth();
    const host='https://tuanhiepprot3api.onrender.com'

    const [isLoading, setIsLoading] = useState(true)
    const refreshAccessToken = useRefresh()
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [classInfo, setClass] = useState([]);
    const DataPerPage = 4;
    const startIndex = (currentPage - 1) * DataPerPage;
    const endIndex = startIndex + DataPerPage
    useEffect(() => {
        fetch(`${host}/api/getAllClass`)
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



    // Function để fetch danh sách sinh viên
    const location = useLocation();
    const user = location.state?.user || {}; // Sử dụng state?.user để tránh lỗi khi state không tồn tại
    const URL = `${host}/getallstudent`;
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
    useEffect(() => {
        getData()
    }, [AccessToken])
    document.title = "Home"
    const currentData = posts.slice(startIndex, endIndex)
    const totalPages = Math.ceil(posts.length / DataPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (

        <>
            <Header  />
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


                                </tr>

                            </thead>
                            <tbody>
                                {
                                    currentData.map((post, index) => {
                                        const bufferString = post.img && Buffer.from(post.img).toString('base64');
                                        return (
                                            <tr key={index}>
                                                <td>{post.MSSV}</td>
                                                <td>{post.Name}</td>
                                                <td>
                                                    <img className="avatarImage" src={`data:image/jpeg;base64,${bufferString}`} alt="{index}" />
                                                </td>

                                                <td>
                                                    {post.Sex}
                                                </td>

                                                {
                                                    getClassName(post.Class)
                                                }




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

            </div>
        </>
    )
}
