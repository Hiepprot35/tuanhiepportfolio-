import { motion, useScroll } from 'framer-motion'
import { useSectionInView } from "../../hook/useSectionInView";
import { useActiveSectionContext } from "../../context/ActiveSectionContextProvider";
import { useRef } from 'react';

export default function IntroduceProPage() {
    const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
    const { ref } = useSectionInView("About");
    const scrollElement = useRef(null)
    const { scrollY } = useScroll()
    const { scrollYProgress } = useScroll({
        target: scrollElement,
        offset: ["0 1", "1.33 1"],
    });
    return (

        <motion.section className="IntroduceMyself" id="#about" ref={ref} style={{ margin: "2rem 0 0 0" }}
            initial={{ opacity: 0, x: -100, filter: `${activeSection === "About" ? "blur(0px)" : ("blur(1px)")}` }}
            animate={{ opacity: 1, x: 0, filter: `${activeSection === "About" ? "blur(0px)" : ("blur(1px)")}` }}
            transition={{ delay: 0.3 }}
        >
            <motion.div 
                style={{ opacity: scrollYProgress, transition: "500ms linear" }}

            >



                <motion.section ref={scrollElement} className="img_left"
                >

                    <img alt="HolmesThinking" src="./images/holmes.png"></img>
                </motion.section>

                <h2 style={{ fontWeight: "600", fontSize: "2rem", margin: "2rem" }}>About me</h2>
                <p>
                    <span>
                       Hello, my name is Doan Tuan Hiep. Now, I'm senior student at Thuy Loi University. My major is developer softwave.
                       Desires employment with Company as a Website Developer Intern
                    </span>
                    <span>
                        .I like playing football and watching films. I love books and my favorite character is Holmes
                    </span>
                </p>
                <p>

                    <span style={{ textIndent: "20px" }}>
                       Hope in future, I'll be a good programmer.
                    </span>
                </p>
            </motion.div>

        </motion.section>
    )
}