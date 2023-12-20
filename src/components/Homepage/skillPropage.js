

import { useSectionInView } from "../../hook/useSectionInView";
import './skillCss.scss'
import { motion, useScroll } from "framer-motion";
import { useActiveSectionContext } from "../../context/ActiveSectionContextProvider";
export default function SkillPropage() {
    const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

    const { ref } = useSectionInView("Skill");
    const data = [
        {
            value: "HTML"
        },
        {
            value: "SQL"
        },
        {
            value: "Javascript"
        },
        {
            value: "CSS"
        }, {
            value: "NodeJS"
        }, {
            value: "Express"
        }
    ]
    return (
        <motion.section className="IntroduceMyself" id="#skill" ref={ref} style={{ margin: "2rem 0 10rem 0" }}
            initial={{ opacity: 0, x: -100, filter: `${activeSection === "Skill" ? "blur(0px)" : ("blur(1px)")}` }}
            animate={{ opacity: 1, x: 0, filter: `${activeSection === "Skill" ? "blur(0px)" : ("blur(1px)")}` }}
            transition={{ delay: 0.3 }}
        >
            <h2 style={{ fontWeight: "600", fontSize: "2rem", margin: "2rem" }}>My Skill</h2>

            <div className="Skill_section center_ele">
                {
                    data.map((e, i) => (
                        <div className="Skill_name center_ele">

                            {e.value}
                        </div>
                    ))
                }
            </div>
        </motion.section>
    )
}