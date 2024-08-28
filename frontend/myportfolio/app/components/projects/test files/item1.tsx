import { motion } from "framer-motion";
import testdata from "../../../utils/testdata.json";
import ProjectCard from "../ProjectCard";

const item1 = () => {
  return (
    <div className="bg-slate-400 h-96 w-full relative py-7 ">
      <div className=" relative w-[14em] h-[14em] ">
        {/** 1 */}
        <motion.div
          className=" absolute "
          style={{
            backgroundImage: `linear-gradient(20deg,  #515252, #1B3541 )`,
            rotateY: 45,
            rotateX: 6,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 25,
            zIndex: 0,
            bottom: "5%",
            top: 0,
            left: "5%",
            right: 0,
          }}
        />
        {/** 2 */}
        <motion.div
          className=" absolute bg-red-400"
          style={{
            
            rotateY: 45,
            rotateX: 7,
            borderTopLeftRadius: 22.5,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 22.5,
            zIndex: 1,
            bottom: "3.75%",
            top: 2.5,
            left: "3.75%",
            right: "1.25%",
          }}
        />
        {/** 3 */}
        <motion.div
          className=" absolute bg-white"
          style={{
            rotateY: 45,
            rotateX: 8,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            bottom: "2.5%",
            top: 5,
            left: "2.5%",
            right: "2.5%",
            zIndex: 2,
          }}
        />
        {/** 4 */}
        <motion.div
          className="w-full h-full absolute bg-stone-600"
          style={{
            rotateY: 46,
            rotateX: 8,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 15,
            
            zIndex: 4,
          }}
        />
        <motion.div
          className=" absolute w-full h-full"
          style={{
            perspective: "75em",
            rotateY: 0,
            rotateX: 0,
            
        
            zIndex: 5,
          }}
        >
          <ProjectCard project={testdata[1]} />
        </motion.div>
      </div>
    </div>
  );
};

export default item1;
