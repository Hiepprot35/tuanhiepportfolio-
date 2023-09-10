import { useNavigate, useLocation } from 'react-router-dom';
import ChangeBackground from '../changeBackground';
import { useEffect, useState, useRef } from "react";
import { IsLoading } from '../Loading';
import useAuth from '../../hook/useAuth'
import UseRfLocal from '../../hook/useRFLocal';
import io from 'socket.io-client';
import './login.css'
const host = process.env.REACT_APP_DB_HOST;
const URL = `${host}/api/login`;
const imgLinkBasic =
{
  link: "https://pbs.twimg.com/media/EnOnhlSWEAEeYB3?format=jpg&name=large"
}
export default function Login({ setAccessToken, setIsLogin }) {
  const input_username = useRef(null)
  const input_password = useRef(null)
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setRefreshToken } = UseRfLocal()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState();
  const [loginImgBackground, setLoginImgBackground] = useState(imgLinkBasic);
  const [verifyCode, setverifyCode] = useState();
  const [infoToSendGmail, setinfoToSendGmail] = useState();
  const verifyCodeInput = useRef()
  const [ResApi, setResApi] = useState()
  useEffect(() => {
    const data = {
      "to": infoToSendGmail?.to,
      "subject": 'Verify Tuanhiepprot3'

    }
    const sendEmail = async () => {
      const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const resApi = await res.json()
      setverifyCode(resApi)
    };
    ResApi?.isVerify && sendEmail()
    console.log(data)
  }, [infoToSendGmail])
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(false)
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const data = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {})
    const resoponse = await fetch(URL,
      {
        method: "POST",
        credentials: 'include',
        headers: headers,

        body: JSON.stringify(
          data
        )
      })

    const dataRes = await resoponse.json();
    if (dataRes.AccessToken) {
      const user = dataRes;
      // setAuth({user.RoleID})

      setResApi(dataRes)
      const role = dataRes.Role
      const username = dataRes.Username
      const userID = dataRes.UserID
      if (dataRes?.isVerify === 0) {
        setAccessToken(dataRes.AccessToken);
        setRefreshToken(dataRes.RefreshToken)
      }
      else if (dataRes?.isVerify === 1) {

        setinfoToSendGmail({ to: dataRes.Email })
      }
      setAuth({ role, username, userID })
      setMessage("")
      // navigate('/home', { state: { user } });
    }
    else {
      setIsLoading(false)
      setMessage(dataRes.message)
    }
  }
  //-------------------------------------------------------------------------------//

  //-------------------------------------------------------------------------------//

  //-------------------------------------------------------------------------------//
  const submitVerifycode = () => {

    if (verifyCodeInput.current.value === verifyCode.toString()) {
      setAccessToken(ResApi.AccessToken);
      setRefreshToken(ResApi.RefreshToken)
    }
    else {
      setMessage("Sai mã xác thực")
    }
  }
  const handleBackground = (newImg) => {
    setLoginImgBackground(newImg)
  }

  //-------------------------------------------------------------------------------//


  return (



    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>ĐĂNG NHẬP</title>
      <link rel="stylesheet" href="/css/login.css" />


      <div className="container" style={{ zIndex: -1, backgroundImage: `url(${loginImgBackground.link})` }}>
        <div className="dangnhap_layer">
          <div className="dangnhap_text">
            <h1 id="gsap_id">ĐĂNG NHẬP</h1>
          </div>
          {infoToSendGmail ? (
            <div className="dangnhap_input_div">
              {/* <p>Verify code sent to {infoToSendGmail?.to}</p> */}
              <div className='verifycode_div' style={{ display: "flex" }}>
                <input
                  type="password"
                  name="password"
                  className="dangnhapinput 1"
                  defaultValue=""
                  id="input_mk"
                  ref={verifyCodeInput}
                />
                <label className="username" id="labelPassword" >
                  Verify Code
                </label>

                <button
                  type="submit"
                  className="sumbit"
                  id="sumbit_btn"
                  defaultValue="Đăng nhập"
                  onClick={submitVerifycode}
                  style={{ marginLeft: "1rem" }}
                > Submit </button>
              </div>
            </div>
          )
            :
            <form className="form_dn" onSubmit={handleSubmit}>
              <div className="dangnhap_input_div taikhoan_input">
                <input
                  type="text"
                  name="username"
                  className="dangnhapinput 2"
                  id="input_tk"
                  required
                  ref={input_username}
                />
                <label
                  className="username"
                  id="labelUsername"
                  htmlFor='username'
                >
                  TÊN NGƯỜI DÙNG
                </label>
              </div>
              <div className="dangnhap_input_div">

                <input
                  type="password"
                  name="password"
                  className="dangnhapinput 1"
                  required
                  id="input_mk"
                  ref={input_password}
                />
                <label
                  className="username"
                  id="labelPassword"
                  htmlFor='password'
                >
                  mật khẩu
                </label>
              </div>
              <div className="forget_save_div">
                <div className="forget_pass">
                  <a href='/dangki' className="forget_pass_text">
                    Quên mật khẩu
                  </a>
                </div>
                <div className="checkbox_div">
                  <input type="checkbox" />
                  <span className="checkbox_mk">Lưu mật khẩu</span>
                </div>
              </div>

              <div className="sumbit_button">
                <button
                  type="submit"
                  className="sumbit"
                  id="sumbit_btn"
                  defaultValue="Đăng nhập"
                > Submit </button>
              </div>
              <div className="forget_pass dangky_href">
                <a href="/create" className="forget_pass_text">
                  Đăng ký
                </a>
              </div>
            </form>

          }
          <div className='warning'>
            {message ? (
              <div>
                <h1 className='message'>{message}</h1>
              </div>
            ) : null}
          </div>


        </div>

      </div>
      {

        isLoading && <IsLoading></IsLoading>
      }
    </>

  )

}
// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };

