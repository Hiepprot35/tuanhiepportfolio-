import { useEffect, useState } from "react";
import LogOut from "./logout";
const { Buffer } = require('buffer');
function DataFetch() {
    const [isLogout, setIsLogout] = useState(false);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/getallstudent`)

            .then(res => res.json())
            .then(contents => {
                setPosts(contents);
            })
    }, []
    )
    const logout=()=>
    {
        setIsLogout(!isLogout)

    }
    console.log(isLogout)
    return (

        <div>
            <h1>hello</h1>

            {

                posts.map((post,index) => {
                    const bufferString = Buffer.from(post.img).toString('base64');

                    return (
                        <div key={index}>

                            <h1>{post.Name}</h1>
                            <img className="avatarImage" src={`data:image/jpeg;base64,${bufferString}`} alt="Post Image" />

                        </div>
                    )
                })
            }
            {/* <button onClick={logout}>Log out</button> */}
            <LogOut logout={logout}></LogOut>
        </div>
    )
}
export default DataFetch