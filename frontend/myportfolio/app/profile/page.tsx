"use client";


import ScrollContainer from "../components/scroll/ScrollContainer";


import React from "react";
import { Toaster } from "react-hot-toast";

import ScrollItemTwo from "../components/scroll/ScrollItemTwo";
import ProjectCarousel from "./ProjectCarousel";

const Profile = () => {
  return (
    <>
      <Toaster />
      <ScrollContainer>
       {/*  <ScrollItemOne /> */}
      
        <ScrollItemTwo />
      </ScrollContainer>
    </>
  );
};

export default Profile;
