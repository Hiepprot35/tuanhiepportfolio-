import React, { useEffect, useRef, useState, memo } from 'react';
import { Buffer } from 'buffer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import useAuth from '../../../hook/useAuth';
import { LogOut } from "../../logout";
import BlobtoBase64 from '../../../function/BlobtoBase64';
import './header.css'
import { motion } from "framer-motion";

import { header_Student } from '../../../lib/data';
function Header(props) {
    const [weather, setWeather] = useState({
        city: "",
        weather: "clear",
        temp: "",
        country: "",
    });
    const Menu_profile_header = useRef()
    const [city, setCity] = useState("hanoi");
    const { auth } = useAuth();
    const [chooseHeader, setChooseHeader] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState()
    const apiKey = "e9f7e8aac0662b6cfe1bb2d11bbb7042";
    // const bufferString = user2 ? Buffer.from(user2.img).toString('base64') : "11111";
    const cityInputRef = useRef(null); // Tạo một tham chiếu useRef
    const host = process.env.REACT_APP_DB_HOST;

    const handleSumbit = () => {
        setCity(cityInputRef.current.value);
    };
    useEffect(() => {
        let isMounted = true;
        const tempApi = async (city) => {
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            try {
                const temRes = await fetch(URL);
                if (temRes.ok && isMounted) {
                    const tem = await temRes.json();
                    setWeather({
                        city: tem.name,
                        weather: tem.weather[0].main,
                        temp: tem.main.temp,
                        country: tem.sys.country,
                    });
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };
        tempApi(city);
        return () => {
            isMounted = false;
        };
    }, [city]);
    useEffect(() => {
        let isAlivew = true;

        const studentInfo = async () => {
            const URL = `${host}/api/getStudentbyID/${auth.username}`;
            try {
                const studentApi = await fetch(URL);

                const student = await studentApi.json();

                setUser(student)
                setIsLoading(false)

            } catch (error) {
                console.error(error);
            }
        };
        studentInfo();
        return () => {
            isAlivew = false
        }
    }, []);
    useEffect(() => {
        console.log(header_Student)
    }, [])
    return (
        <>
            <div className="header_user">
                <div className='header_container'>
                    <div>
                        <ul className='list'>


                            {/* {
                            auth.role == 1 ?
                                <li>
                                    <a href="/create" className='Link'>Create</a>
                                </li> : <><a href={`/profile/${auth.username}`} className='Link'>Thay đổi thông tin cá nhân</a>
                                </>
                        } */}
                            {
                                header_Student.map((element, index) => (


                                    <li key={index}>
                                        {
                                            element.role.includes(auth.role) &&
                                            <Link to={element.hash} className={`Link ${element.hash == props.hash ? "ActiveLink" : "notActive"}`} onClick={() => setChooseHeader(element.name)}>{element.name}</Link>

                                        }

                                    </li>
                                ))
                            }
                            <li>
                                <div style={{ display: "flex" }}>

                                    <p className='City cityname'> {weather.city}     </p>
                                    <p className='City citytemp'> {weather.temp}*C</p>
                                    <img src={`/images/${weather.weather}.png`} alt={weather.weather} />
                                </div>

                            </li>
                        </ul>
                    </div>

                    {/* <div className="">

                    <button onClick={handleSumbit}>
                        <img src='/images/search.png' alt='Weather'></img>
                    </button>
                    <input ref={cityInputRef} type="text" placeholder="Enter city" />
                </div> */}
                    <div className="header_home_user">

                        {isLoading ? (
                            <>
                                <p>Admin</p>
                                <LogOut />

                            </>
                        ) : (
                            <>
                                {user &&
                                    <>
                                        <div >
                                            {/* <li>
                                                <p className='username_header'> Hello {auth.username}</p>
                                                
                                            </li> */}
                                            {user.img && <img onClick={(e) => {
                                                Menu_profile_header.current.classList.toggle("show_menu_profile");
                                                e.target.classList.toggle('click_avatar');



                                            }} src={`${BlobtoBase64(user.img)}`} alt='User Avatar' />}

                                        </div>
                                        <div className='Menu_profile_header' ref={Menu_profile_header}>

                                            <div className='avatar_link'>
                                                <div >

                                                    <a className='Menu_a_link_profile' href={`/profile/${user.MSSV}`}>
                                                        <div className='avatar_name'>


                                                            <img src={`${BlobtoBase64(user.img)}`} alt='User Avatar' />
                                                            <span>{user.Name}</span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <hr style={{ borderColor: "black" }}></hr>
                                                <div className='ShowAll_User'>

                                                    <a href='/setting'>

                                                        <span>Cài đặt thông tin cá nhân</span>
                                                    </a>
                                                </div>
                                            </div>

                                            <LogOut />

                                        </div>
                                    </>
                                }

                            </>
                        )}

                    </div>
                </div>
            </div>


        </>
    );
}
export default memo(Header)
