import React, { useEffect, useRef, useState } from 'react';
import { Buffer } from 'buffer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useAuth } from './context/userContext'
import { LogOut } from "./logout";

export default function Header(props) {
    const [weather, setWeather] = useState({
        city: "",
        weather: "clear",
        temp: "",
        country: "",
    });
    const { user2, setUser2 } = useAuth();
    const [city, setCity] = useState("hanoi");
    const apiKey = "e9f7e8aac0662b6cfe1bb2d11bbb7042";
    const bufferString = user2 ? Buffer.from(user2.img).toString('base64') : "11111";
    const cityInputRef = useRef(null); // Tạo một tham chiếu useRef

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
    return (
        <>
            <div className="header_container">

                <div className='left header' style={{ display: "flex", alignItems: "center" }}>
                    <Link to="/create">Create</Link>
                    <Link to="/home">Home</Link>

                    <p> {weather.city}     </p>
                    <p> {weather.temp} độ C</p>
                    <img src={`/images/${weather.weather}.png`} alt={weather.weather} />
                </div>
                <div className="center header">

                    <button onClick={handleSumbit}>
                        <img src='/images/search.png'></img>
                    </button>
                    <input ref={cityInputRef} type="text" placeholder="Enter city" />
                </div>
                <div className="right header">
                    {
                        user2 &&

                        <>

                            <h1>
                                {user2.Name}
                            </h1>

                            <img className="avatarImage" src={`data:image/jpeg;base64,${bufferString}`} alt="Avatar"></img>
                        </>

                    }
                    


                </div>
                <LogOut></LogOut>
            </div>

        </>
    );
}
