import { useNavigate,useLocation  } from 'react-router-dom';
import ChangeBackground from './changeBackground';
import { useEffect, useState, useRef } from "react";
import { IsLoading } from './Loading';
import useAuth from '../hook/useAuth'
const URL = 'http://localhost:4000/api/login';
const imgLinkBasic =
{
  link: "https://pbs.twimg.com/media/EnOnhlSWEAEeYB3?format=jpg&name=large"
}
export default function Login({ setAccessToken, setIsLogin }) {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState();
  const [loginImgBackground, setLoginImgBackground] = useState(imgLinkBasic);
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
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
      setAccessToken(dataRes.AccessToken);
      const role=dataRes.Role
      setAuth({role})
      setIsLogin(true)
      navigate(from, { replace: true });

      // navigate('/home', { state: { user } });
    }
    else {
      setIsLoading(false)
      setMessage('Không có tài khoản hoặc mật khẩu')
    }
  }
  //-------------------------------------------------------------------------------//

  function ToggleCss(elements, input) {
    elements.forEach((element, index) => {
      element.addEventListener("click", (e) => {
        // e.stopPropagation(); // Ngăn chặn sự kiện click lan ra các phần tử cha
        element.classList.add("change1"); // Thêm lớp "change1"
        input[index].focus()
      });


    });
  }
  //-------------------------------------------------------------------------------//
  useEffect(() => {
    const labelElement = [...document.getElementsByClassName("username")]
    const InputElement = [...document.getElementsByClassName("dangnhapinput")]
    InputElement.forEach((e, index) => {

      e.addEventListener("focus", (event) => {

        labelElement[index].classList.add("change1")
      })
      e.addEventListener("blur", (event) => {
        if (e.value === "") {
          labelElement[index].classList.remove("change1")
        }
        else {
          e.style.backgroundColor = "white";
        }
      })
    }
    )
    ToggleCss(labelElement, InputElement)
  })
  //-------------------------------------------------------------------------------//

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
          <form className="form_dn" onSubmit={handleSubmit}>
            <div className="dangnhap_input_div">
              <input
                type="text"
                name="username"
                className="dangnhapinput 2"
                defaultValue=""
                id="input_tk"

              />
              <label

                className="username"
                id="labelUsername"
              >
                TÊN NGƯỜI DÙNG
              </label>

            </div>
            <div className="dangnhap_input_div">
              <input

                type="password"
                name="password"
                className="dangnhapinput 1"
                defaultValue=""
                id="input_mk"
              />
              <label
                className="username"
                id="labelPassword"
              >
                mật khẩu
              </label>

            </div>

            <div className="">

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
            <div className='warning'>
              {message ? (
                <div>
                  <h1 className='message'>{message}</h1>
                </div>
              ) : null}
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
              <a href="/dangky" className="forget_pass_text">
                Đăng ký
              </a>
            </div>
          </form>
          {/* <ChangeBackground onChangeBackground={handleBackground}>

          </ChangeBackground> */}

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

