import { motion, useScroll } from 'framer-motion'
import { useSectionInView } from "../../hook/useSectionInView";
import { useActiveSectionContext } from "../../context/ActiveSectionContextProvider";
import { useRef } from 'react';

export default function IntroduceProPage() {
    const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
    const { ref } = useSectionInView("About");
    const { scrollElement } = useRef()
    const { scrollYProgress } = useScroll({
        target: scrollElement,
        offset: ["0 1", "1.33 1"],
    });
    return (

        <motion.section className="IntroduceMyself" id="#about" ref={ref} style={{ margin: "2rem 0 10rem 0" }}
            initial={{ opacity: 0, x: -100, filter: `("blur(1px)")` }}
            animate={{ opacity: 1, x: 0, filter: `("blur(0px)")}` }}
            transition={{ delay: 0.3 }}
        >



            <motion.div ref={scrollElement} className="img_left"
             style={{transition:"125ms",transform:`translateY(-400*${scrollYProgress})`}}

            >

                <img src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.15752-9/375017206_953787909026543_7249771653964473840_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=EQQkeMUl9zwAX9QpGCQ&_nc_ht=scontent.fsgn2-8.fna&oh=03_AdQkbG-6f6UJ9oJ-47rePyzlHb6Y1v2fqc19wxNil7xWfw&oe=6522F3FD"></img>
            </motion.div>

            <h2 style={{ fontWeight: "600", fontSize: "2rem", margin: "2rem" }}>About me</h2>
            <p>
                <span>
                    In the quiet, smoke-filled air of Sherlock Holmes' room, I sat across from him
                </span>
                <span>
                    , fingers pressed
                    around a warm teacup, reflecting on the mysterious cases he had solved. With his keen countenance and sharp gaze,
                </span>
            </p>
            <p>

                <span style={{ textIndent: "20px" }}>


                    Holmes could unravel the most baffling of enigmas. He employed acute reasoning and meticulous observation to crack every case, and I often wondered just how many more mysteries
                    lay hidden behind his seemingly ordinary demeanor.
                </span>
            </p>

        </motion.section>
    )
}