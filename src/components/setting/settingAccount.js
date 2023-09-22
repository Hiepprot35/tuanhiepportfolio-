import Header from "../Layout/header/header";
import useAuth from "../../hook/useAuth";
import { useEffect, useState } from "react";
import FormInput from "../Layout/FormInput/FormInput";
import './settingAccount.css'
import { motion } from "framer-motion";
import PropertyUser from "./propertyUser";
export default function SettingAccount() {
    const [userInfo, setUserInfo] = useState();
    const [inputs, setInputs] = useState();
    const [clicked, setClicked] = useState(false);
    const [choosenProperty, setChoosenProperty] = useState({ key: "", value: "" })
    const { auth } = useAuth();
    useEffect(() => {
        const getData = async (data) => {
            try {
                const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/getStudentbyID/${auth.username}`);

                const resJson = await res.json()
                setUserInfo(resJson)
            } catch (error) {

                console.error('Error occurred:', error);
            }
        }
        getData()
    }
        , [])
    useEffect(() => {
        if (userInfo) {

            const keys = Object.keys(userInfo);
            const map = keys.map((key) => ({ key, value: userInfo[key] }));
            setInputs(map)
        }
    }, [userInfo])
    useEffect(() => { console.log(choosenProperty) }, [choosenProperty])
    const clickProperty = (data) => {
        setClicked(true)
        setChoosenProperty({ "key": data.key, "value": data.value });
    }
    return (

        <>
            <Header></Header>
            <div className="column_form" style={{ width: "100%" }}>
                <div className="main_layout">
                    <h2>
                        Thông tin cá nhân
                    </h2>
                    <div className="thongtin_coban">
                        <h3>
                            Thông tin cơ bản
                        </h3>

                        {
                            inputs && inputs.map((e, index) => (
                                index < 5 && (
                                    <div className=" layout1" key={index} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                    }}>
                                        <div className="property_user" onClick={() => clickProperty(e)}>

                                                <div style={{display:"flex"}}>
                                                    <div>
                                                        {e.key}
                                                    </div>
                                                    <div>
                                                        {e.value}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>--</p>
                                                </div>
                                            </div>

                                        <br></br>
                                    </div>
                                )
                            ))
                        }
                    </div>
                    {clicked && choosenProperty &&
                        <PropertyUser propertyUser={choosenProperty} setClicked={setClicked}></PropertyUser>
                    }
                </div>

            </div >
        </>
    )
}