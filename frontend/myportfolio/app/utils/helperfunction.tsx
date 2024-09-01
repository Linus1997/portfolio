import { Dispatch, SetStateAction, useReducer } from "react";

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

export const getIndex = (current: number, direction: number, length: number) => {
  return (current + direction + length) % length;
};


export const rotateArray = <T extends any>(arr: T[], count: number = 1): T[] => {
  const a = getIndex(0, count, arr.length);
  return [...arr.slice(a, arr.length), ...arr.slice(0, a)];
};



