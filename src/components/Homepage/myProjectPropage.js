

import { useSectionInView } from "../../hook/useSectionInView";
import { useRef } from "react";
import { myproject } from "../../lib/data";
import { motion, useScroll } from "framer-motion";
export default function MyProjectPropage() {
    const { ref } = useSectionInView("Project");
    const project = useRef(null)
    const { scrollYProgress } = useScroll({
        target: project,
        offset: ["0 1", "1.33 1"],
    });
    return (
        <section

            style={{ margin: "2rem 0 10rem 0", transition: "125ms" }}

            className="IntroduceMyself" id="#project" ref={ref} >

            <h2 style={{ fontWeight: "600", fontSize: "2rem", margin: "2rem" }}>My project</h2>
            {

                myproject.map((e, i) =>
                (
                    <motion.section key={i} ref={project} style={{ opacity: scrollYProgress, scale: scrollYProgress, margin: "2rem 0 10rem 0", transition: "500ms" }}
                    >
                        {console.log(scrollYProgress)}

                        <div className="project_content">
                            <div className="project_text">

                                <h3>{e.title}</h3>
                                <p>{e.description}</p>
                                <ul>
                                    {e.tags.map((tag, index) => (
                                        <li style={{ padding: "0.4rem", margin: "0.6rem", backgroundColor: "#5e5353c5", color: "white", borderRadius: "1rem" }} key={index}>{tag}</li>

                                    ))}
                                </ul>
                            </div>
                            <a href="https://tuanhiepprot3.netlify.app/">
                                <img src={`${e.img}`} alt="Project" quality={95}></img>
                            </a>
                        </div>
                    </motion.section>
                )

                )

            }
        </section>
    )
}