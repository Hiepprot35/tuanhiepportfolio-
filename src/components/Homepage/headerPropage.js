import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-scroll";
import clsx from "clsx";
import { links } from '../../lib/data'
import { useActiveSectionContext } from "../../context/ActiveSectionContextProvider";
export default function HeaderPropage() {
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
                        {links.map((link) => (
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
                                        <span
                                            className="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-800"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
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
