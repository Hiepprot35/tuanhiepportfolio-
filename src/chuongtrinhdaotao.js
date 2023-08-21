import { useState } from "react"
import { useEffect } from "react"
import useAuth from "./hook/useAuth";
import { IsLoading } from "./components/Loading";
import Header from "./components/header";
export default function Chuongtrinhdaotao() {
    const { auth } = useAuth();
    const [dsmon, setDsachMon] = useState();
    const [Loadng, setLoading] = useState(true)
    useEffect(() => {
        const URL = "http://localhost:4000/api/danhsachmontheokhoa";
        const getAPi = async () => {
            const sendApi = await fetch(URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "MSSV": auth.username
                })
            })
            const data = await sendApi.json();
            setDsachMon(data)

            setLoading(false)
        }

        getAPi()
    }, [])
    useEffect(() => {
        console.log(dsmon)
    }, [Loadng])
    return (
        <>
            <Header />
            <div className="container_main">

                {
                    Loadng ? <IsLoading /> :
                        <div>

                            {
                                dsmon.map((title, index) =>
                                    <>
                                        <p key={index}>
                                            {title.MonHocID}
                                            {title.MonHocTen}
                                            {title.TinChi}
                                            {title.KhoaName}
                                            
                                            </p>
                                    </>

                                )
                            }
                        </div>
                }
            </div>
        </>
    )
}