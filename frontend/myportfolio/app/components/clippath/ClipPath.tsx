import { motion } from "framer-motion";
import { Image } from "@nextui-org/react";
const ClipPath = () => {
  return (
    <motion.div
      className="w-full h-12 bg-slate-300"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 100% )",
      }}


    >

<Image
             isBlurred
             width={"100%"}
             height={"100%"}
             className="m-0 w-full h-full bg-black object-cover self-stretch"
             src={"test5.jpg"}
             alt=""
             isZoomed 
            />

    </motion.div>
  );
};

export default ClipPath;
