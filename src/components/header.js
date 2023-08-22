import React, { useEffect, useRef, useState ,memo} from 'react';
import { Buffer } from 'buffer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import { LogOut } from "./logout";
import BlobtoBase64 from '../function/BlobtoBase64';
function Header(props) {
    const [weather, setWeather] = useState({
        city: "",
        weather: "clear",
        temp: "",
        country: "",
    });
    const [city, setCity] = useState("hanoi");
    const { auth } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState()
    const apiKey = "e9f7e8aac0662b6cfe1bb2d11bbb7042";
    // const bufferString = user2 ? Buffer.from(user2.img).toString('base64') : "11111";
    const cityInputRef = useRef(null); // Tạo một tham chiếu useRef
    const host='https://tuanhiepprot3api.onrender.com'

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
            const URL = `${host}/getStudentbyID`;
            try {
                const studentApi = await fetch(URL, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',

                    },
                    body:
                        JSON.stringify(
                            {
                                "username": auth.username
                            }
                        )
                });
                if (isAlivew) {

                    const student = await studentApi.json();

                    setUser(student)
                    setIsLoading(false)
                }
            } catch (error) {
                console.error(error);
            }
        };
        studentInfo();
        return () => {
            isAlivew = false
        }
    }, []);

    return (
        <>
            <div className="header">
                <div className='riotbar-left-content' >
                    <div className='riotbar-branding-switcher'>
                        <ul className='list'>

                            <li>
                                <Link to="/home" className='Link'>Home</Link>

                            </li>
                            <li>
                                <Link to="/create" className='Link'>Create</Link>

                            </li>
                            <li>
                                <Link to="/dangkilop" className='Link'>Đăng ký học</Link>

                            </li>  <li>
                                <Link to="/chuongtrinhdaotao" className='Link'>Chương trình đào tạo</Link>

                            </li>
                            <li>
                                <p className='City cityname'> {weather.city}     </p>

                            </li>
                            <li>
                                <p className='City citytemp'> {weather.temp}*C</p>

                            </li>
                            <li>
                                <img src={`/images/${weather.weather}.png`} alt={weather.weather} />

                            </li>
                        </ul>

                    </div>

                    {/* <div className="">

                    <button onClick={handleSumbit}>
                        <img src='/images/search.png' alt='Weather'></img>
                    </button>
                    <input ref={cityInputRef} type="text" placeholder="Enter city" />
                </div> */}
                    <div className="dangnhap">

                        {isLoading ? (
                            <p>Đang tải...</p>
                        ) : (
                            <>
                                {user &&

                                    <div>
                                        <ul>
                                            <li>
                                            <p style={{ color: 'white' }}> Hello {auth.username}</p>

                                            </li>
                                            <li>
                                            {user.img && <img src={`${BlobtoBase64(user.img)}`} alt='User Avatar'/>}

                                            </li>
                                        </ul>
                                    </div>
                                }

                                <LogOut />
                            </>
                        )}

                    </div>
                </div>
            </div>


        </>
    );
}
export default memo(Header)
