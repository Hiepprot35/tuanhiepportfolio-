

import { useSectionInView } from "../../hook/useSectionInView";

export default function SkillPropage() {
    const { ref } = useSectionInView("Skill");

    return (
        <section  className="IntroduceMyself" id="#skill" ref={ref} style={{ margin: "2rem 0 10rem 0" }}>
            <h2 style={{ fontWeight: "600", fontSize: "2rem", margin: "2rem" }}>My Skill</h2>

        </section>
    )
}