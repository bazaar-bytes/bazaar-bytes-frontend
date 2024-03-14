import { DeveloperCard } from "../components/DeveloperCard";
import erikImage from "../images/erik.png";
import mariannaImage from "../images/marianna.jpeg";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-20 flex-grow flex flex-col m-auto w-full h-full text-left">
      <h1 className=" text-2xl font-bold my-6">About the project</h1>{" "}
      <p>
        Welcome to BazaarBytes, <br />
        your go-to marketplace for buying and selling a wide variety of
        products! At BazaarBytes, we're passionate about connecting buyers and
        sellers in a seamless and efficient manner, creating a vibrant community
        where individuals can discover unique items and turn their passions into
        profits.
        <br />
        <br />
        Our platform is built with the latest technologies, leveraging the power
        of React for dynamic and responsive user interfaces, Express for robust
        server-side functionalities, and MongoDB for scalable and flexible data
        storage.
        <br />
        Find our codebase on:
        <a
          href="https://github.com/bazaar-bytes"
          className="hover:border-b-2 italic"
        >
          GitHub
        </a>
        .
      </p>
      <br />
      <div className="font-bold">Team behind the project</div>
      <div className="flex items-start flex-col my-6  ">
        <DeveloperCard
          name="Marianna Di Vito"
          githubLink="https://github.com/maridivi"
          linkedinLink="https://www.linkedin.com/in/marianna-di-vito-b4178676/"
          image={mariannaImage}
          description="Aspiring web developer with a passion for strength training."
        />

        <DeveloperCard
          name="Erik Busch"
          image={erikImage}
          description="Aspiring software developer with a passion for yoga and riding
              single speed bikes."
          githubLink="https://github.com/EazyErik"
          linkedinLink="https://www.linkedin.com/in/erik-busch-fullstack-development/"
        />
      </div>
    </div>
  );
};
