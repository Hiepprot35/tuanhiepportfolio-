import { motion } from "framer-motion";
import { Link } from "react-scroll"
import { useSectionInView } from "../../hook/useSectionInView";
export default function AboutPropage() {
    const { ref } = useSectionInView("Home");
    const data = [
        // {

        //     prop: "Name",
        //     value: "Đoàn Tuấn Hiệp"
        // },
        {
            prop: "Gender",
            value: "Male"
        },
        {
            value: "24/07/2001",
            prop: "Birthday"
        },
        {
            value: "tansou57@gmail.com",
            prop: "Email"
        },
        {
            prop:"Phone-number",
            value:"0348912547"
        }
    ]
    return (
        <section id="#home" ref={ref}>
            <div className="Introduce_proPage">

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        type: 'tween',
                        duration: 0.4,
                    }}
                >

                    <img className='avatarImage'
                        style={{ width: "60px ", height: "60px", border: "4px solid white" }}
                        src='./images/avatar.jpg' alt="Avatar"
                    ></img>
                </motion.div>
            </div>
            <motion.div className='Introduce_text'
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}

            >
                <div>

                    <span className='Hello_text'><big>
                        Hello, I'm Doan Tuan Hiep
                        </big>
                        </span>
                    <span className='Hello_text'>
                        <ul style={{ display: "block" }}>
                            {data.map((e, i) => (

                                <li >{e.prop}: <span  style={{ fontWeight: "600" }}>

                                    {e.value}
                                </span>
                                </li>
                            ))}
                        </ul>
                    </span>
                </div>
                <div>

                    <span className='Hello_text' >
                        It is my honor that you visit my website. This's my portfolio.
                    </span>
                </div>
                <span className='Hello_text'><i>"We can complain because rose bushes have thorns, or rejoice because thorn bushes have roses."</i></span>
                <motion.div className='contact_download'
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        delay: 0.3
                    }}
                >
                    <span>

                        <Link to="#contact" offset={-50} smooth={true} duration={800} style={{ backgroundColor: "black", margin: "1rem" }}
                        >
                            Contact me here →
                        </Link>

                    </span>
                    <span>


                        <Link to="#contact" offset={-50} smooth={true} duration={800} style={{ background: "white", color: "black" }}>
                            Download CV
                        </Link>
                    </span>
                    <span>
                        <a className="Icon Facebook" href="https://facebook.com/doyledzvl1">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </span>
                    <span>
                        <a className="Icon Instagram" href="https://facebook.com/doyledzvl1">
                            <i className="fa fa-instagram"></i>
                        </a>
                    </span>
                </motion.div>
            </motion.div>

        </section>
    )
}