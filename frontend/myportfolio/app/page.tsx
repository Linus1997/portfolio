'use client'

import Image from "next/image";
import Profile from "./profile/page";
import ScrollContainer from "./components/scroll/ScrollContainer";
import ScrollItemTwo from "./components/scroll/ScrollItemTwo";
import { getProjects } from "./utils/helperfunction";


export default function Home() {
  const projects = getProjects();
  
  return (
    <main className=" min-h-screen min-w-screen  p-2  ">
        <ScrollContainer projects={projects}/>


        
    </main>
  );
}
