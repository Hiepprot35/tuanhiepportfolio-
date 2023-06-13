import { useState } from "react";

function ChatBox()
{
    const lessons=[{
        id:'1',
        name:'Js'
    }
,
    {
        id:'2',
        name:'CSS'
    },
    {
        id:'3',
        name:'HTML'
    }

]
return(
    <div>
        {
            lessons.map((lesson)=>
            {
                return(<h1>{lesson.name}</h1>
            )})
        }
    </div>
)
}
export default ChatBox;