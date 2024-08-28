import { motion } from "framer-motion";
import testdata from "../../../utils/testdata.json";
import ProjectCard from "../ProjectCard";

const Test = () => {
  return (
    <div className="bg-slate-400 h-96 w-full relative py-7 ">
      <div className=" relative w-[14em] h-[14em] ">
      
        <motion.div
          className=" absolute overflow-hidden outline-8 outline-offset-[-8px] outline-[#0008]"
          style={{
            outline: "20px solid #0008",
            outlineOffset: "-20",
            rotateY: 0,
            rotateX: 0,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            top: 8,
            left: 2,
            bottom: 2,
            right: 8,
            zIndex: 5,
          }}
        >
          <ProjectCard project={testdata[1]} />
        </motion.div>
      </div>
    </div>
  );
};

export default Test;
