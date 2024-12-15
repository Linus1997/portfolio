
import ProjectCarousel from "../projects/ProjectCarousel";


const target0 = {
  borderTopLeftRadius: 2 + "%",
  borderTopRightRadius: 2 + "%",

  borderBottomLeftRadius: 1 + "%",
  borderBottomRightRadius: 1 + "%",

  top: 3 + "%",
  left: 0 + "%",
  bottom: 0 + "%",
  right: 0 + "%",
}
const target1 = {
  borderTopLeftRadius: 2 + "%",
  borderTopRightRadius: 2 + "%",
  borderBottomLeftRadius: 1 + "%",
  borderBottomRightRadius: 1 + "%",
  top: 12 + "%",
  left: 12.8 + "%",
  bottom: 0 + "%",
  right: 0 + "%",
}


const target5 = {
  borderTopLeftRadius: 2 + "%",
  borderTopRightRadius: 2 + "%",
  borderBottomLeftRadius: 1 + "%",
  borderBottomRightRadius: 1 + "%",
  top: 12 + "%",
  left: 0 + "%",
  bottom: 0 + "%",
  right: 12.8 + "%",
}


const ScrollItemTwo = () => {

  return (
    <div className="relative bg-white flex flex-col">
      <ProjectCarousel />
     
    </div>
  );
};

export default ScrollItemTwo;
