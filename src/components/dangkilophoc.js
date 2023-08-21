import { useState, useEffect } from "react"
import { useRefresh } from "../hook/useRefresh";
import useAuth from '../hook/useAuth'
import Header from "./header";
import { IsLoading } from "./Loading";
export default function DangKiLopHoc() {
    const { auth } = useAuth()
    const [loading, setLoading] = useState(true)
    const [monHoc, setMonHoc] = useState()
    const [ChooseMonHoc, setChooseMonHoc] = useState()
    const [classMonHoc, setClassMonHoc] = useState()
    const [chooseClass, setChooseClass] = useState();
    const ChooseMonHocChange = (e) => {
        setChooseMonHoc(e.target.value)
        setChooseClass(null)
    }
    useEffect(() => {
        const getApi = async () => {

            const getMonhocFetch = await fetch('http://localhost:4000/api/getMonHoc',
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',

                    }
                })
            const getMonHoc = await getMonhocFetch.json();
            setMonHoc(getMonHoc);
            setLoading(false)
        }
        getApi()
    }, []);
    useEffect(() => {
        const getApi = async () => {

            const getMonhocFetch = await fetch('http://localhost:4000/api/getClassMonHoc',
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify({
                        "MaMonHoc": ChooseMonHoc
                    })
                })
            const getMonHoc = await getMonhocFetch.json();
            setClassMonHoc(getMonHoc)
        }
        getApi()
    }, [ChooseMonHoc]);
  

    function handleDangKy() {
        const sendDataApi = async () => {
          const URL = 'http://localhost:4000/api/dangkihoc';
          try {
            const sendToApi = await fetch(URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                CLASSID: chooseClass,
                MaMonHoc: ChooseMonHoc,
                MSSV: auth.username,
              }),
            });
      
            const data = await sendToApi.json(); // Chuyển phản hồi thành JSON
            console.log('Phản hồi từ máy chủ:', data);
            // Thực hiện các thao tác sau khi đăng ký thành công
          } catch (error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
            // Xử lý lỗi khi gửi yêu cầu
          }
        }
      
        sendDataApi();
      }
      
    return (
        <>
            <Header></Header>
            <div className="container_main">
                <form>
                    <div className="MonHocCombobox_layou">

                        {
                            loading ? <IsLoading></IsLoading> :
                                <div name="monhoc" id="monhoc" >

                                    {
                                        monHoc.map((title, index) => {
                                            return (
                                                <>
                                                    <br />
                                                    <input
                                                        name={`${title.MonHocID}`}
                                                        type="radio"
                                                        id={`CLASS${title.MonHocID}`}
                                                        value={`${title.MonHocID}`}
                                                        checked={ChooseMonHoc === `${title.MonHocID}`} 
                                                        onChange={ChooseMonHocChange}
                                                        />
                                                    <label htmlFor={`CLASS${title.MonHocID}`}>
                                                        {title.MonHocTen}
                                                    </label>
                                                    <br />

                                                </>

                                            )

                                        })
                                    }
                                </div>
                        }
                    </div>
                    {
                        classMonHoc && classMonHoc.map((title, index) => {
                            return (
                                <div key={index}>
                                    <ul>
                                        <li>
                                            <input type="radio"
                                                name={`${title.CLASSID}`}
                                                id={`MONHOC${title.CLASSID}`}
                                                value={`${title.CLASSID}`}
                                                checked={chooseClass === `${title.CLASSID}`}
                                                onChange={(e) => setChooseClass(e.target.value)}
                                            />
                                            <label htmlFor={`MONHOC${title.CLASSID}`} >
                                                {title.CLASSID}
                                                {title.MonHocTen}
                                                {title.SiSo}

                                            </label>
                                        </li>



                                    </ul>

                                </div>
                            )
                        })
                    }

                </form>
                <input
                    type="submit"
                    onClick={handleDangKy}
                />
            </div>
        </>
    )
}