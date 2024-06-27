import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const LogoButtonAnimation = ({ children }: Props) => {
  return (
    <motion.div
      className="w-full h-full "
      whileHover={{
        scale: 1.1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        bounce: 0,
        damping: 10,
      }}
    >
      {children}
    </motion.div>
  );
};

export default LogoButtonAnimation;