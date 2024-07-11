"use client";

import GoogleLogo from "../components/logos/googleLogo";
import DiscordLogo from "../components/logos/discordLogo";
import GithubLogo from "../components/logos/githubLogo";
import LinkedInLogo from "../components/logos/linkedInLogo";
import ScrollContainer from "../components/scroll/ScrollContainer";
import ScrollItemOne from "../components/scroll/scrollItemOne";

import React from "react";
import { Toaster } from "react-hot-toast";
import ProjectCard from "../components/projects/ProjectCard";
import ScrollItemTwo from "../components/scroll/ScrollItemTwo";

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
