import { IoLogoGithub } from "react-icons/io";

const GitHubBadges = () => {
  return (
    <div className="fixed right-0 bottom-0 m-4">
      <a href="https://github.com/phamgiaphuc" target="_blank">
        <IoLogoGithub className="w-12 h-12 hover:transistion hover:ease-in-out hover:scale-110 hover:duration-500" />
      </a>
    </div>
  )
}

export default GitHubBadges