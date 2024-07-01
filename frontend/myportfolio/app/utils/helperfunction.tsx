import { Dispatch, SetStateAction } from "react";

export const clickHandler = (setHasClicked: Dispatch<SetStateAction<boolean>>) => {
    setHasClicked(true);
    setTimeout(()=>{
      setHasClicked(false);
    }, 3000)

  };


export  const openNewTab = (url?: string) => {
  if(url)
    window.open(url);
}