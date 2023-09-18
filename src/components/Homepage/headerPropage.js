import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-scroll";
import clsx from "clsx";
import { links } from '../../lib/data'
import { useActiveSectionContext } from "../../context/ActiveSectionContextProvider";
export default function HeaderPropage(props) {
    const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
    const handleLinkClick = (name) => {
        setActiveSection(name);
        setTimeOfLastClick(Date.now());

    };
    return (
        <header>
            <motion.div
                className="Header_homepage"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <nav>
                    <ul>
                        {props.links.map((link) => (
                            <li key={link.hash}
                                className={clsx({ "active": link.name === activeSection })}

                            >
                                <Link
                                    to={link.hash}
                                    smooth={true} duration={500}
                                    offset={-100}
                                    onClick={() => handleLinkClick(link.name)}
                                >
                                    {link.name}
                                    {link.name === activeSection && (
                                        <motion.span
                                            style={{ backgroundColor: "gray", position: "absolute", inset: "1rem", borderRadius: "0.4rem", zIndex: "-2" }}
                                            layoutId="activeSection"
                                            transition={{
                                                type: "tween",
                                                stiffness: 300,
                                                damping: 60,
                                            }}
                                        ></motion.span>
                                    )}

                                </Link>
                            </li>

                        ))}
                    </ul>
                </nav>
            </motion.div>
        </header>
    );
}
