import { FaGithub, FaLinkedin } from "react-icons/fa";

export const DeveloperCard = ({
  image,
  githubLink,
  linkedinLink,
  name,
  description,
}) => {
  return (
    <div className="my-6 flex justify-center gap-6">
      <div className="avatar">
        <div className="h-24 md:shrink-0 rounded-full ">
          <img src={image} />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <h2 className="font-bold ">{name}</h2>
        <div>{description}</div>
        <div className="flex gap-3 ">
          <a href={githubLink} className="hover:opacity-80">
            {" "}
            <FaGithub size={26} />
          </a>
          <a href={linkedinLink} className="hover:opacity-80">
            {" "}
            <FaLinkedin size={26} />
          </a>{" "}
        </div>
      </div>
    </div>
  );
};
