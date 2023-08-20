import { useState, useEffect } from "react"
import { useRefresh } from "../hook/useRefresh";
import useAuth from '../hook/useAuth'
import Header from "./header";
import { IsLoading } from "./Loading";
export default function DangKiLopHoc() {
    const { auth } = useAuth()
    const [change,setChange]=useState(false)
    const [loading, setLoading] = useState(true)
    const [monHoc, setMonHoc] = useState()
    const [MaMonHoc, setMaMonHoc] = useState()
    const [classMonHoc,setClassMonHoc]=useState()
    const ChooseMonHoc = (e) => {
        setMaMonHoc(e.target.value)
        setChange(!change)
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
                        "MaMonHoc": MaMonHoc
                    })
                })
            const getMonHoc = await getMonhocFetch.json();
                setClassMonHoc(getMonHoc)
        }
        getApi()
    }, [change]);
    useEffect(()=>
    {
        console.log(classMonHoc)
    },[change])
    return (
        <>
            <Header></Header>
            <div className="container_main">
                <div className="MonHocCombobox_layou">
                    <label >Chọn môn học:</label>
                    {
                        loading ? <IsLoading></IsLoading> :
                            <select name="monhoc" id="monhoc" onChange={ChooseMonHoc}>

                                {
                                    monHoc.map((title, index) => {
                                        return (

                                            <option key={index} value={`${title.MonHocID}`}>{title.MonHocTen}</option>
                                        )

                                    })
                                }
                            </select>
                    }
                </div>
              {
                classMonHoc&&classMonHoc.map((title,index)=>
                {
                    return(
                        <div  key={index}>
                            <ul>
                                <li>{title.CLASSID}</li>
                                <li>{title.MonHocTen}</li>
                                <li>{title.SiSo}</li>


                            </ul>
                       
                        </div>
                    )
                })
              }
            </div>
        </>
    )
}