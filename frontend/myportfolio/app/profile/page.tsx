"use client";
import { motion, motionValue, useMotionValue, useScroll, useTransform } from "framer-motion";
import { FC, ReactNode, useState } from "react";
import GoogleLogo from "../components/logos/googleLogo";
import DiscordLogo from "../components/logos/discordLogo";
import GithubLogo from "../components/logos/githubLogo";
import LinkedInLogo from "../components/logos/linkedInLogo";

interface Props {
  children: ReactNode;

}

const ScrollContainer: FC<Props> = ({children}) => {
  const {scrollYProgress} = useScroll();
  return (
  <motion.div>
    {children}
  </motion.div>
)
}

const Profile = () => {


  return (
<ScrollContainer>
<div className="flex flex-row gap-10">
<GoogleLogo />

<DiscordLogo />
<GithubLogo />
<LinkedInLogo />
</div>
</ScrollContainer>
  );
};

export default Profile;