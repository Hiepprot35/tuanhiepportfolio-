import React, { useEffect, useRef, useState, memo } from 'react';
import Header from './header/header';
function Errorpage()
{
    return(
        <>
        <Header/>
        <div className='container_main'>
            <div>
            <h1>404 Not Found Page</h1>
            </div>
        </div>
        </>
    )

}
export default Errorpage;