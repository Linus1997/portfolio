import DiscordLogo from "../logos/discordLogo";
import GithubLogo from "../logos/githubLogo";

import LinkedInLogo from "../logos/linkedInLogo";
import GoogleLogo from "../logos/googleLogo";

const ScrollItemOne = () => {
  return (
    <div className="flex flex-row gap-x-3 h-fit w-full ">
     <div className="flex-1">
      <GoogleLogo />
      </div>
      <div className="flex-1">
      <DiscordLogo />
      </div>
      <div className="flex-1">
      <GithubLogo />
      </div>
      <div className="flex-1">
      <LinkedInLogo />
      </div>
    </div>
  );
};

export default ScrollItemOne;
