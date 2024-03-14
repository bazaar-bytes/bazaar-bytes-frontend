import erikImage from "../images/erik.png";
import mariannaImage from "../images/marianna.jpeg";

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-grow flex flex-col m-auto w-full">
      <h1 className=" text-2xl font-bold my-6">About this project:</h1>{" "}
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
      <div className="font-bold">Team behind the project:</div>
      <div className="flex items-start flex-col my-6 ">
        <div className="my-6 flex justify-center">
          <div className="avatar">
            <div className="h-24 md:shrink-0 rounded-full ">
              <img src={mariannaImage} />
            </div>
          </div>
          <div className="flex flex-col items-start  ml-4">
            <h2 className="font-bold ml-3">Your name</h2>
            <div className="ml-3">Describe yourself</div>
            <div className="flex ">
              <a href="">
                {" "}
                <button className="btn btn-sm bg-github text-white m-3">
                  GitHub
                </button>
              </a>
              <a className="mr-4" href="">
                <button className="btn btn-sm text-white bg-linkedIn  m-3">
                  {" "}
                  LinkedIn
                </button>
              </a>{" "}
            </div>
          </div>
        </div>

        <div className=" my-6 flex justify-center ">
          <div className="avatar">
            <div className="h-24 rounded-full ">
              <img src={erikImage} />
            </div>
          </div>
          <div className="flex flex-col items-start ml-4">
            <h2 className="font-bold ml-3">Erik Busch</h2>

            <div className="ml-3">
              Aspiring software developer with a passion for yoga and riding
              single speed bikes
            </div>
            <div className="flex ">
              <a href="https://github.com/EazyErik">
                <button className="btn btn-sm bg-github text-white m-3">
                  GitHub
                </button>
              </a>
              <a href="https://www.linkedin.com/in/erik-busch-fullstack-development/">
                <button className="btn btn-sm text-white bg-linkedIn  m-3">
                  {" "}
                  LinkedIn
                </button>
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
