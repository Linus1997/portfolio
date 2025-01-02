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

  setBoxShadow?: Dispatch<SetStateAction<string>>;
}

const ProjectCard = ({ project, setBoxShadow }: Props) => {
 

  return (
    <motion.div className="h-full w-full relative ">

      <motion.img
        className=" absolute  m-0 w-full h-full bg-black  self-stretch"
        width={"100%"}
        height={"100%"}
        src={project ? project.images[0] : undefined}
        style={{}}
        whileHover={{}}
        alt="Hangry Frogs game project"
      />
    </motion.div>
  );
};

export default ProjectCard;
