"use client";
import { useState } from "react";
import SvgPath from "../SvgMotionComponents/SvgPath";
import SvgWrapper from "../SvgMotionComponents/SvgWrapper";
import LogoButtonWrapper from "./LogoButtonWrapper";
import { openNewTab } from "@/app/utils/helperfunction";
import { LINKEDINLINK } from "@/app";

const LinkedInSVG = () => {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <SvgWrapper viewBox="0 0 76.624 65.326" >
      <SvgPath
        isComplete={isComplete}
        fillColor="#0a66c2"
        svgMotionProps={{
          transform: "translate(-1092.136 -213.406)",
          stroke: "#0a66c2",
          d: "M1165,274.515a1.2,1.2,0,0,0,1.21-1.269c0-.9-.543-1.33-1.657-1.33h-1.8v4.712h.677v-2.054h.832l.019.025,1.291,2.029h.724l-1.389-2.1Zm-.783-.472h-.785V272.45h.995c.514,0,1.1.084,1.1.757,0,.774-.593.836-1.314.836",
        }}
      />

      <SvgPath
        isComplete={isComplete}
        fillColor="#0a66c2"
        svgMotionProps={{
          onAnimationComplete: () => {
            setIsComplete(true);
          },
          transform: "translate(-903.776 -57.355)",
          stroke: "#0a66c2",
          d: "M958.98,112.559h-9.6V97.525c0-3.585-.064-8.2-4.993-8.2-5,0-5.765,3.906-5.765,7.939v15.294h-9.6V81.642h9.216v4.225h.129a10.1,10.1,0,0,1,9.093-4.994c9.73,0,11.524,6.4,11.524,14.726ZM918.19,77.416a5.571,5.571,0,1,1,5.57-5.572,5.571,5.571,0,0,1-5.57,5.572m4.8,35.143h-9.61V81.642h9.61Zm40.776-55.2h-55.21a4.728,4.728,0,0,0-4.781,4.67v55.439a4.731,4.731,0,0,0,4.781,4.675h55.21a4.741,4.741,0,0,0,4.8-4.675V62.025a4.738,4.738,0,0,0-4.8-4.67",
        }}
      />

      <SvgPath
        isComplete={isComplete}
        fillColor="#0a66c2"
        svgMotionProps={{
          stroke: "#0a66c2",
          transform: "translate(-1084.362 -207.809)",
          d: "M1156.525,264.22a4.418,4.418,0,1,0,.085,0h-.085m0,8.33a3.874,3.874,0,1,1,3.809-3.938c0,.022,0,.043,0,.065a3.791,3.791,0,0,1-3.708,3.871h-.1",
        }}
      />
    </SvgWrapper>
  );
};
const LinkedInLogo = () => {
  return (
    <LogoButtonWrapper onPress={() => {
      //openNewTab(LINKEDINLINK)

    }}>
      <LinkedInSVG />
    </LogoButtonWrapper>
  );
}

export default LinkedInLogo;
