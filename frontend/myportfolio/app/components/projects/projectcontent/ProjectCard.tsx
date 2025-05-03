import { ProjectInterface } from "@/app/utils/interfaces";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Skeleton,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";


interface Props {
  project: ProjectInterface | null;
  index: number;
  setBoxShadow?: Dispatch<SetStateAction<string>>;
}

const ProjectCard = ({ project, setBoxShadow }: Props) => {
  const [onPress, setOnPress] = useState(false);

  return (
    <motion.div className=" absolute h-full w-full pointer-events-auto border rounded-2xl">

      <motion.img
        className=" absolute  m-0 w-full h-full bg-black  self-stretch pointer-events-none border rounded-lg"
        width={"100%"}
        height={"100%"}
        src={project ? project.images[0] : undefined}
        style={{top: 0, bottom:0, left:0 , right: 0}}
        whileHover={{}}
        alt="Hangry Frogs game project"
      />


      <button
        className="absolute z-10  h-11 mb-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-md hover:bg-white/20 transition"
        onClick={(e) => {
          e.stopPropagation(); 
          setOnPress((prev) => !prev);
          console.log("Clicked item");
        }}
        style={{ strokeWidth: onPress ? 222 : 22,

        left:0, right:0,
        bottom: 0,
         }}
      >
        Show Details
      </button>
    </motion.div>
  );
};

export default ProjectCard;
