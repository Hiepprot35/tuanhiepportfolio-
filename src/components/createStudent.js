import { useEffect, useRef, useState } from "react";
import { Buffer } from "buffer";
import { useRefresh } from "../hook/useRefresh";
import UseToken from "../hook/useToken";
import Header from "./header";
import useAuth  from '../hook/useAuth'
import SuccessNotification from "./Notification/successNotifi";
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
    const khoaRef = useRef(1)
    const [currentChooseKhoa, setCurrentChooseKhoa] = useState(1);
    const {auth}=useAuth()
    const [khoa, setKhoa] = useState();
    const { AccessToken, setAccessToken } = UseToken();
    const [data, setData] = useState();
    const [isMounted, setIsMounted] = useState(false)
    const [classInfo, setClass] = useState([]);
    const [classFlowKhoa, setClassFlowKhoa] = useState();
    const [avatarURL, setAvatarURL] = useState();
    const [dataimg, setDataimg] = useState();

    const refreshAccessToken = useRefresh();
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
    }, []);
    useEffect(() => {
        fetch('http://localhost:4000/api/getAllKhoa')
            .then(res => res.json())
            .then(contents => {
                setKhoa(contents);
            });
    }, []);

    const sendData = async (data) => {
        try {
            console.log("join")
            const res = await fetch('http://localhost:4000/api/createStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AccessToken}`,

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
        try {
            event.preventDefault();
            const dataInput = Array.from(event.target.elements)
                .filter((input) => input.name)
                .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});
                dataInput.create_by=auth.userID
            // Gán dữ liệu hình ảnh vào trường "img" trong đối tượng data
            if (dataimg) {
                const imgBlob = new Blob([dataimg], { type: dataimg.type });
                const imgBuffer = await blobToBuffer(dataimg);

                dataInput.img = imgBuffer;
            }

            setData(dataInput)
        }
        catch (error) {
            console.error(error);
        }
        setIsMounted(!isMounted)
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const refreshedData = await refreshAccessToken();

                refreshedData.AccessToken ? setAccessToken(refreshedData.AccessToken) : console.log("OKE");
            } catch (error) {
                // Xử lý lỗi nếu cần
            }
        }
        fetchData();
        
    }, [])

   
    const handleChooseKhoa = (e) => {

        setCurrentChooseKhoa(e.target.value)
    }
    useEffect(()=>
    {
        sendData(data)

    },[isMounted])
    useEffect(() => {
        const data2 = classInfo.filter((tab) => tab.KhoaID === parseInt(currentChooseKhoa))
        setClassFlowKhoa(data2);
    }, [currentChooseKhoa])

    return (
        <>
            <Header></Header>
            <div className="CreateStudentForm container_main">
                <>
                    <h2>Thêm sinh viên</h2>
                    <form method="post" action="/create" onSubmit={handleSubmit}>
                  
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
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                SDT
                            </label>
                            <input
                                type="text"
                                name="SDT"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                        </div>
                     
                        <div className="mb-3">
                            <input type="file" name="img" onChange={imgInput} />
                            <img className="avatarImage" src={avatarURL} alt="Avatar"></img>
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
                            <span>Tên khoa</span>
                            <select name="Khoa" ref={khoaRef} value={currentChooseKhoa} onChange={handleChooseKhoa}>
                                {
                                    khoa ? khoa.map((tab) => {
                                        return (
                                            <option key={tab.KhoaID} value={tab.KhoaID} >
                                                {tab.KhoaName}
                                            </option>
                                        )
                                    }) : <div> ok</div>
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <span>Tên lớp</span>
                            <select name="Class" >
                                {
                                    classFlowKhoa && classFlowKhoa.map((tab) => {
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
                            
                            {/* {
                                    isMounted &&
                             <SuccessNotification></SuccessNotification>
                            }    */}

        </>
    )
}
