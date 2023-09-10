import { motion } from "framer-motion";
export default function DivineSection() {
    return (
        <motion.div

            initial={{ opacity: 0, y: 100,rotate:90  }}
            animate={{ opacity: 1, y: 0,rotate:90    }}
            transition={{
                delay: 0.3
            }}
            className="divineSection" style={{
                width: "3rem", height: "2px",
                backgroundColor: "gray ",
                margin: "5rem",
                borderRadius: "5px"
            }}>


        </motion.div>
    )
}