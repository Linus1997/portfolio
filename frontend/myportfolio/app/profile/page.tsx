"use client";


import ScrollContainer from "../components/scroll/ScrollContainer";


import React from "react";
import { Toaster } from "react-hot-toast";

import ScrollItemTwo from "../components/scroll/ScrollItemTwo";
import ScrollItemOne from "../components/scroll/scrollItemOne";
import Signature from "../components/pageLoader/Signature";


const Profile = () => {
  return (
    <>
      <Toaster />
      <ScrollContainer>
        {/* <ScrollItemOne />
      <Signature ></Signature> */}
        <ScrollItemTwo />
      </ScrollContainer>
    </>
  );
};

export default Profile;
