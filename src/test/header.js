import { useState, useEffect } from "react";

function Header() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(
        ()=>{
            window.addEventListener('resize', () => {
                setWidth(window.innerWidth)});
        }
    )
        return (

            <div className="Header_divs">
                <h1>{width}</h1>
            </div>

        )
    }
export default Header;