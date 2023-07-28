import { useState } from "react";
import { useEffect } from "react";
function ChatBox() {
    const [students,SetStudent]=useState([])
    useEffect(() => {
        fetch(`http://localhost:4000/api/getallstudents`)
    
          .then(res => res.json())
          .then(contents => {
            SetStudent(contents);
          })
      }, []
      )
      console.log(students)
    let lessons = [{
        id: '1',
        name: 'Js',
        img: ''
    }
        ,
    {
        id: '2',
        name: 'CSS',
        img: ''

    },
    {
        id: '3',
        name: 'HTML',
        img: ''

    }

    ]
    const [avatar, setAvatart] = useState(lessons);

    const displayAvatar = (e) => {
        const fileName = e.target.files[0];
        const fileNameObj = URL.createObjectURL(fileName);
        setAvatart(pre => [...pre]);
        lessons[1].img = '1';

        console.log('select * from students')
        

    }
    return (
        <div>
            {
                students.map((student) => {
                    return (
                        <div>

                            <table>
                                <tr>
                                    <td>
                                        Name
                                    </td>
                                    <td>
                                        Email
                                    </td>
                                    <td>
                                        SDT
                                    </td>
                                </tr>
                                <tr>
                                    <th>{student.NameStudent}</th>
                                    <th>{student.Email}</th>
                                    <th>{student.SDT}</th>
                                </tr>
                                </table>
                            
                        </div>
                    )
                })
            }

        </div>
    )
}
export default ChatBox;