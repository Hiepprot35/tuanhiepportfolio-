import { useEffect, useState } from "react";


const { Buffer } = require('buffer');

export default function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:4000/getallstudent`)
            .then(res => res.json())
            .then(contents => {
                setPosts(contents);
            })
    }, []
    )
    // const { token, setToken } = UseToken()
    // if (!token) {
    //     return <Login setToken={setToken} />
    // }
    console.log()
    return (
        <div>
            <h1>hello</h1>
            {
                posts.map((post, index) => {
                    console.log(post.img)
                    const bufferString =post.img &&  Buffer.from(post.img).toString('base64');
                    console.log(bufferString)
                    return (
                        <div key={index}>
                            <h1>{post.Name}</h1>
                            <img className="avatarImage" src={`data:image/jpeg;base64,${bufferString}`} alt="{index}" />
                        </div>
                    )
                })
            }
            {/* <button onClick={logout}>Log out</button> */}
            <div className="LogoutElement">
                <button  >
                    LogOut
                </button>
            </div>
        </div>
    )
}
