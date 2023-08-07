import { useEffect, useState } from "react";
import UseToken from './hook/useToken';
import UseRefresh from "./hook/useRefresh";
import { LogOut } from "./logout";
import { IsLoading } from "./Loading";

const { Buffer } = require('buffer');

export default function Home({ user }) {
    const [count, setCount] = useState(0)

    const refreshAccessToken = UseRefresh();
    const { AccessToken, setAccessToken } = UseToken();
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const URL = `http://localhost:4000/getallstudent`;

    console.log(document.cookie)

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await fetch(URL, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${AccessToken}`
                    }
                });

                if (response.ok && isMounted) {
                    const jsonData = await response.json();
                    if (!jsonData.error) {

                        setPosts(jsonData);
                        setIsLoading(false)
                    }
                    else {
                        refreshAccessToken({ setAccessToken })
                    }
                    console.log(jsonData)
                }
            } catch (error) {

                console.error(error);

            }
        };
        fetchData()
        return () => {
            isMounted = false

        }
    }, []);

    return (
        <div>
            {isLoading ? (
                <IsLoading />
            ) : (
                posts.map((post, index) => {
                    const bufferString = post.img && Buffer.from(post.img).toString('base64');
                    return (
                        <div key={index}>
                            <h1>{post.Name}</h1>
                            <img className="avatarImage" src={`data:image/jpeg;base64,${bufferString}`} alt={index} />
                        </div>
                    );
                })
            )}
            <LogOut />
            <button onClick={() => setCount(pre => pre + 1)}>Click</button>
        </div>
    );
}
