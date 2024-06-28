import { Tooltip } from "@nextui-org/react";
import ProfilePicture from "../logos/ProfilePicture";
import DiscordLogo from "../logos/discordLogo";
import GithubLogo from "../logos/githubLogo";

import LinkedInLogo from "../logos/linkedInLogo";
import GoogleLogo from "../logos/googleLogo";
import Signature from "../pageLoader/Signature";







const ScrollItemOne = () => {
  return (
    <div className="flex flex-row gap-x-3 h-fit w-full bg-white">
      
      <GoogleLogo />
      
      <DiscordLogo />
   
      <GithubLogo />
      <LinkedInLogo />
    </div>
  );
};


export default ScrollItemOne;