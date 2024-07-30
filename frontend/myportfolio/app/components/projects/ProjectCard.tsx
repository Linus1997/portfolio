import { ProjectInterface } from "@/app/utils/interfaces";
import { Button, Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface Props{
  project: ProjectInterface|null;
  
  setBoxShadow?: Dispatch<SetStateAction<string>>;
}

const ProjectCard = ({project, setBoxShadow}: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if(imageRef.current && setBoxShadow){
      const computedStyle = window.getComputedStyle(imageRef.current);
      const shadow = computedStyle.getPropertyValue('box-shadow');
      console.log(shadow);
    }
  }, [setBoxShadow])

  return (
   
      <Card
      style={{transformStyle: "flat"}}
        isFooterBlurred
        radius="lg"
        className="border-none m-0 w-full h-full bg-opacity-2 bg-black"
        classNames={{
          body: ["m-0"],
          header: ["bg-transparent bg-opacity-0"]
        }}
      >
        
          
          
           
            <Image
              isBlurred
              width={"100%"}
              height={"100%"}
              ref={imageRef}
              className="m-0 w-full h-full bg-black object-cover self-stretch"
              src={project? project.images[0] : undefined}
              alt="Hangry Frogs game project"
              isZoomed
            
            

            />
           
          
     
        <CardFooter className="">
      
        </CardFooter>
      </Card>
   
  );
};

export default ProjectCard;
