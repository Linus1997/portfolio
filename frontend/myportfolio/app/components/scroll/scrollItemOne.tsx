import ProfilePicture from "../logos/ProfilePicture";
import DiscordLogo from "../logos/discordLogo";
import GithubLogo from "../logos/githubLogo";
import GoogleLogo from "../logos/googleLogo";
import LinkedInLogo from "../logos/linkedInLogo";




const ScrollItemOne = () => {
  return (
    <div className="flex flex-row gap-10">
      <GoogleLogo />

      <DiscordLogo />
      <ProfilePicture />
      <GithubLogo />
      <LinkedInLogo />
    </div>
  );
};


export default ScrollItemOne;