"use client";
import { motion, motionValue, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import GoogleLogo from "../components/logos/googleLogo";
import DiscordLogo from "../components/logos/discordLogo";
import GithubLogo from "../components/logos/githubLogo";
import LinkedInLogo from "../components/logos/linkedInLogo";

const Profile = () => {

  return (
<>
<GoogleLogo />
<DiscordLogo />
<GithubLogo />
<LinkedInLogo />
</>
  );
};

export default Profile;