import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { useRefresh } from "./hook/useRefresh";
import UseToken from "./hook/useToken";
import Header from "./header";
function blobToBuffer(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const buffer = Buffer.from(reader.result);
            resolve(buffer);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsArrayBuffer(blob);
    });
}
export default function CreateStudent() {
    const { AccessToken, setAccessToken } = UseToken();
    const [data,setData]=useState();
    const [isMounted,setIsMounted]=useState(false)
    const [classInfo, setClass] = useState([]);
    const [avatarURL, setAvatarURL] = useState();
    const [dataimg, setDataimg] = useState();
    const refreshAccessToken  = useRefresh();
    const imgInput = (e) => {
        const img = e.target.files[0];
        const imgLink = URL.createObjectURL(img);
        setAvatarURL(imgLink);
        setDataimg(img);
    };
    useEffect(() => {
        fetch('http://localhost:4000/api/getAllClass')
            .then(res => res.json())
            .then(contents => {
                setClass(contents);
            });
    }, [AccessToken]);

    const sendData = async (data) => {
        try {

            const res = await fetch('http://localhost:4000/api/createStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AccessToken}`

                },
                body: JSON.stringify(data)
            });

            const resJson = await res.json()
            console.log(resJson)

        } catch (error) {

            console.error('Error occurred:', error);
        }
    }
    async function handleSubmit(event) {

        event.preventDefault();
        const data = Array.from(event.target.elements)
            .filter((input) => input.name)
            .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});

        // Gán dữ liệu hình ảnh vào trường "img" trong đối tượng data
        if (dataimg) {
            const imgBlob = new Blob([dataimg], { type: dataimg.type });
            const imgBuffer = await blobToBuffer(dataimg);

            data.img = imgBuffer;
        }
        setData(data)
       setIsMounted(!isMounted)
        
    }
   
    useEffect(()=>
    {
        async function fetchData() {
            try {
                const refreshedData = await refreshAccessToken();
               refreshedData.AccessToken? setAccessToken(refreshedData.AccessToken):console.log("OKE");
                
            } catch (error) {
                // Xử lý lỗi nếu cần
            }
        }
        
        fetchData();
    },[isMounted])
    
    useEffect(()=>
    {
        sendData(data)

    },[isMounted])
    return (
        <>
            <Header></Header>
            <div className="CreateStudentForm container_main">
                <>
                    <h2>Thêm sinh viên</h2>
                    <form method="post" action="/create" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                MSSV
                            </label>
                            <input
                                type="text"
                                name="MSSV"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                name="Name"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <div className="mb-3">
                            <input type="file" name="img" onChange={imgInput} />
                            <img className="avatarImage" src={avatarURL}></img>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                name="Address"
                                className="form-control"
                                id="exampleInputPassword1"

                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Birthday
                            </label>
                            <input

                                type="date"
                                name="Birthday"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"

                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Mật khẩu
                            </label>
                            <input
                                type="text"
                                name="password"
                                className="form-control"
                                id="exampleInputPassword1"
                            />
                        </div>
                        <div className="mb-3">
                            <span>Tên lớp</span>
                            <select name="Class" >
                                {
                                    classInfo.map((tab) => {
                                        return (
                                            <option key={tab.CLASSID} value={tab.CLASSID} >
                                                {tab.CLASSNAME}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <span>Giới tính</span>
                            <select id="sex" name="Sex" >
                                <option value={"Nữ"}>Nữ</option>
                                <option value={"Nam"}>Nam</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </>
            </div>


        </>
    )
}
