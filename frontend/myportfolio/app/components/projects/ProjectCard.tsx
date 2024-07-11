import { ProjectInterface } from "@/app/utils/interfaces";
import { Button, Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";
import { motion } from "framer-motion";



const ProjectCard = (project: ProjectInterface) => {
  return (
   
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none  bg-opacity-2"
      >
        <CardBody>
          <motion.div>
            <Skeleton isLoaded={project.images && project.images.length > 0}>
            <Image
              className=" object-cover"
              src={project.images[0]}
              alt="Hangry Frogs game project"
              isBlurred
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
