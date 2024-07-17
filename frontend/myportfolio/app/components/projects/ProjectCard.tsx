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
        isFooterBlurred
        radius="lg"
        className="border-none m-0 w-full h-full bg-opacity-2"
        classNames={{
          body: ["m-0"],
          header: ["bg-transparent bg-opacity-0"]
        }}
      >
        <CardBody className="overflow-visible p-0">
          <motion.div
          className="h-full w-full">
            <Skeleton isLoaded={project? project.images && project.images.length > 0 : false}>
            <Image
              isBlurred
              width={"100%"}
              height={"100%"}
              ref={imageRef}
              className="m-0 w-full h-full object-cover"
              src={project? project.images[0] : undefined}
              alt="Hangry Frogs game project"
            
            isZoomed
            shadow="lg"
            

            />
            </Skeleton>
          </motion.div>
        </CardBody>
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
         <Skeleton isLoaded>
          <p className="text-tiny text-white/80">Available soon.</p>
          <Button
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            Notify me
          </Button>
          </Skeleton>
        </CardFooter>
      </Card>
   
  );
};

export default ProjectCard;
