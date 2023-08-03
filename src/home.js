import { useEffect, useState } from "react";
import UseToken from './hook/useToken';
import UseRefresh from "./hook/useRefresh";
import { LogOut } from "./logout";
import { IsLoading } from "./Loading";

const { Buffer } = require('buffer');
export default function Home() {
    const refreshAccessToken=UseRefresh();
    const [message, setMessage] = useState(false)
    const { AccessToken, setAccessToken } = UseToken();
    const [isLoading,setIsLoading]=useState(false)

    const URL = `http://localhost:4000/getallstudent`;
    const [posts, setPosts] = useState([]);
    const [isTimeout,setIsTimeout]=useState(false)
    // Function để fetch danh sách sinh viên
    const fetchData = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(URL, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${AccessToken}`
                }
            });

            const data = await response.json();
            if (!data.error) {
                setIsLoading(false)

                console.log(data)
                setPosts(data);
            }
            throw new Error('Failed to fetch data from the server.');
           
        } catch (error) {

            console.error(error)
        }
        
    };
    // useEffect(() => {
    //     fetchData();
    // },[AccessToken]);
    
    useEffect(() => {
        fetchData()
        .then(() => {
            refreshAccessToken();
          });

    },[]);
    return (
       
        <>
        {
                   isLoading && <IsLoading></IsLoading>

        }
        <div>
            <h1>hello</h1>
            {   
                message? <div>Cek</div> : posts.map((post, index) => {
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
