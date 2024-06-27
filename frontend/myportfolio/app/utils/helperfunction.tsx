import { Dispatch, SetStateAction } from "react";

export const clickHandler = (setHasClicked: Dispatch<SetStateAction<boolean>>) => {
    setHasClicked(true);
    setTimeout(()=>{
      setHasClicked(false);
    }, 3000)

  };