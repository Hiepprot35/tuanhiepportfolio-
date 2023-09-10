import { motion } from "framer-motion";
import { Link } from "react-scroll"
import { useSectionInView } from "../../hook/useSectionInView";
export default function AboutPropage() {
    const { ref } = useSectionInView("Home");

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
                        src='https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.15752-9/373347575_1724462531308571_5612534916686046992_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=g4IbOChrXEMAX9B5Pft&_nc_ht=scontent.fsgn2-5.fna&oh=03_AdSMnZDs8Ztt567VLGoulgBe17-rl6Yd1SnkA3Zd4OJ5ZQ&oe=6520E62A'
                    ></img>
                </motion.div>
            </div>
            <motion.div className='Introduce_text'
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}

            >
                <div>

                    <span className='Hello_text'>Hello, I'm </span>
                    <span className='Hello_text' style={{ fontWeight: "bold" }}>
                        <i>
                            Hiep Yugi
                        </i>
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