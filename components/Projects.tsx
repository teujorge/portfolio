/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import IconApple from "../public/svg/apple-store";
import IconDemo from "../public/svg/eye";
import IconGithub from "../public/svg/github";
import IconGoogle from "../public/svg/play-store";
import Image, { StaticImageData } from "next/image";
import ShowAtlasArena from "../public/images/demos/demo-atlas.webp";
import ShowMovieMatter from "../public/images/demos/demo-movie-matter.webp";
import ShowCoPilot from "../public/images/demos/demo-co-pilot.webp";
import ShowZidDashboard from "../public/images/demos/demo-zid.webp";
import { IconButton } from "./IconButton";
import { useEffect, useState } from "react";
import { inViewPercentage } from "@/utils/inView";

interface ProjectDescriptionProps {
  title: string;

  desc: string;
  tech: string[];
  icons: JSX.Element[];
}

interface ProjectImageProps {
  title: string;
  media: { src: StaticImageData; alt: string };
  isMobile: boolean;
}

const MOBILE_WIDTH = 1000;

const ProjectDescription = ({
  title,
  desc,
  tech,
  icons,
}: ProjectDescriptionProps) => {
  const PROJECT_ID = `project-item-${title}`;

  let technologies = "";

  for (let i = 0; i < tech.length - 1; i++) {
    technologies += tech[i] + " - ";
  }
  technologies += tech[tech.length - 1];

  let iconButtons: JSX.Element[] = [];
  icons.forEach((icon) => iconButtons.push(icon));

  return (
    <div
      id={PROJECT_ID}
      // className="reveal"
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding: 20px;
        width: 40vw;
        min-height: 100vh;

        p {
          margin-top: 20px;
        }

        @media (max-width: ${MOBILE_WIDTH}px) {
          width: auto;
          min-height: 0px;
        }
      `}
    >
      {/* project title */}
      <h3
        // className="reveal"
        css={css`
          margin: 10px;
          text-align: left;

          @media (max-width: ${MOBILE_WIDTH}px) {
            text-align: center;
          }
        `}
      >
        {title}
      </h3>

      <p
      // className="reveal"
      >
        {desc}
      </p>
      <p
      // className="reveal"
      >
        {technologies}
      </p>
      <div
        // className="reveal"
        css={css`
          display: flex;
          margin: 10px;
          width: fit-content;
        `}
      >
        {iconButtons}
      </div>
    </div>
  );
};

const ProjectImage = ({ title, media, isMobile }: ProjectImageProps) => {
  const PROJECT_ID = `project-item-${title}`;
  const PROJECT_IMAGE_ID = `project-image-wrapper-${title}`;

  const [imageHeight, setImageHeight] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(0);

  const firstTitle = "Co Pilot";
  const lastTitle = "Atlas Arena";

  useEffect(() => {
    if (isMobile) return;

    const projectDescElement = document.getElementById(PROJECT_ID)!;

    const projectImageWrapperElement =
      document.getElementById(PROJECT_IMAGE_ID)!;

    function handleScroll() {
      let percentageInView = inViewPercentage(projectDescElement);

      // determines scale
      let height = Math.max(0, percentageInView); // handle < 0 percentage
      height = Math.min(100, percentageInView); // handle > 100 percentage

      // determines opacity
      let opacity = 1;

      if (percentageInView > 100) opacity = (200 - percentageInView) / 100;
      else if (percentageInView < 0) opacity = 0;

      // first project item
      if (title === firstTitle) {
        const projectDescRect = projectDescElement.getBoundingClientRect();

        // move top when projects section is scrolling into view
        if (projectDescRect.top > 0) {
          projectImageWrapperElement.style.top = `${projectDescRect.top}px`;
        }

        // stay on top 0px
        else {
          projectImageWrapperElement.style.top = "0px";
        }
      }

      // second project item
      else if (title === lastTitle) {
        const projectDescRect = projectDescElement.getBoundingClientRect();

        // move bottom when projects section is scrolling out of view
        if (projectDescRect.bottom <= window.innerHeight) {
          projectImageWrapperElement.style.top = `${
            projectDescRect.bottom - window.innerHeight
          }px`;

          console.log(projectImageWrapperElement.style);
        }

        // stay on top 0px
        else {
          projectImageWrapperElement.style.top = "0px";
        }
      }

      // stay on top 0px
      else {
        projectImageWrapperElement.style.top = "0px";
      }

      setImageHeight(height);
      setImageOpacity(opacity);
    }

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      // className={isMobile ? "reveal" : ""}
      id={`project-image-wrapper-${title}`}
      css={css`
        position: ${isMobile ? "relative" : "fixed"};
        right: 0px;

        overflow: hidden;
        width: 50vw;
        height: 100vh;

        opacity: ${isMobile ? 1 : imageOpacity};
        transform-origin: top;
        transform: scaleY(${isMobile ? 1 : imageHeight / 100});

        transition: all 0s;

        @media (max-width: ${MOBILE_WIDTH}px) {
          z-index: 3;

          width: 100vw;
          height: 40vh;
        }
      `}
    >
      {/* anti scale */}
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;

          width: 50vw;
          height: 100vh;

          transform-origin: top;
          transform: scaleY(${isMobile ? 1 : 1 / (imageHeight / 100)});

          transition: all 0s;

          @media (max-width: ${MOBILE_WIDTH}px) {
            width: 100vw;
            height: 40vh;
          }
        `}
      >
        {/* image demo */}
        <Image
          css={css`
            object-fit: contain;

            margin: 50px;

            width: fit-content;
            max-width: 90%;
            height: fit-content;
            max-height: 90%;

            border-radius: 12px;
            /* box-shadow: 0px 0px 10px var(--shadow-color); */

            @media (max-width: 1100px) {
              margin: 45px;

              max-width: calc(90% - 20px);
              max-height: calc(90% - 20px);
            }
          `}
          src={media.src}
          alt={media.alt}
        />
      </div>
    </div>
  );
};

export const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const _isMobile = window.innerWidth <= MOBILE_WIDTH;
      console.log(_isMobile, isMobile);
      if (isMobile !== _isMobile) setIsMobile(_isMobile);
    };
    handleResize(); // set initial state

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const projectDescriptions = [
    <ProjectDescription
      key={"project-description-co-pilot"}
      title={"Co Pilot"}
      desc={`
        [In-Redesign] This platform connects users with skilled 
        freelancers to efficiently complete their projects. With 
        intuitive tools and a streamlined user experience, users 
        can easily create and collaborate on projects, as well as 
        submit project proposals and receive bids from qualified 
        freelancers. Authentication through Google and seamless 
        payment processing via Stripe make it easy to get started 
        and manage projects from start to finish.
      `}
      tech={["NextJS", "DB", "API"]}
      icons={[
        <IconButton
          key={"co-pilot-platform"}
          src={IconDemo}
          href={"https://co-pilot.netlify.app"}
          desc={"Demo"}
        />,
        <IconButton
          key={"co-pilot-github"}
          src={IconGithub}
          href={"https://github.com/teujorge/co-pilot-web"}
          desc={"GitHub"}
        />,
      ]}
    />,

    <ProjectDescription
      key={"project-description-zid"}
      title={"Zid Product Manager"}
      desc={`
        The Zid Platform Dashboard is a powerful web application 
        designed to help users manage their products with ease. The 
        dashboard provides centralized location for viewing and 
        editing product details and includes robust filtering 
        options for quick and efficient navigation.
      `}
      tech={["React", "DB", "API"]}
      icons={[
        <IconButton
          key={"zid-platform"}
          src={IconDemo}
          href={"https://zid-products-staging.netlify.app/login"}
          desc={"Demo"}
        />,
      ]}
    />,
    <ProjectDescription
      key={"project-description-movie-matter"}
      title={"MovieMatter"}
      desc={`
        This media hub app is a must-have for movie and TV show 
        enthusiasts. Using the TMDB API, the app provides users with 
        personalized recommendations for movies, TV shows, and 
        celebrities. The app also allows users to create personalized 
        lists of their favorite media, making it easy to keep track 
        of what they've watched and what they want to see next.
      `}
      tech={["Dart", "Flutter", "API"]}
      icons={[
        <IconButton
          key={"movie-matter-app-store"}
          src={IconApple}
          href={"https://apps.apple.com/us/app/moviematter/id1631748579"}
          desc={"Apple Store"}
        />,
        <IconButton
          key={"movie-matter-google-store"}
          src={IconGoogle}
          href={
            "https://play.google.com/store/apps/details?id=com.mjorge.MovieMatter&pli=1"
          }
          desc={"Google Store"}
        />,
        <IconButton
          key={"movie-matter-github"}
          src={IconGithub}
          href={"https://github.com/teujorge/MovieMatter"}
          desc={"GitHub"}
        />,
      ]}
    />,

    <ProjectDescription
      key={"project-description-atlas"}
      title={"Atlas Arena"}
      desc={`[In-Beta] Atlas is a thrilling pixel-art game 
        where players take on the role of Atlas, defending their 
        home from endless waves of enemies. Players can choose to be 
        a Knight, a Mage, or an Archer, each with unique abilities 
        and skills to master. The game features challenging game 
        play, with increasingly difficult levels and a variety of 
        enemies to defeat.
      `}
      tech={["Dart", "Flutter", "FlameGame"]}
      icons={[
        <IconButton
          key={"atlas-arena-demo"}
          src={IconDemo}
          href={"https://teujorge.github.io/atlas/"}
          desc={"Web Demo"}
        />,
        <IconButton
          key={"atlas-arena-beta"}
          src={IconApple}
          href={"https://testflight.apple.com/join/GC3yVQk6"}
          desc={"Beta"}
        />,

        <IconButton
          key={"atlas-arena-github"}
          src={IconGithub}
          href={"https://github.com/teujorge/atlas"}
          desc={"GitHub"}
        />,
      ]}
    />,
  ];

  const projectImages = [
    <ProjectImage
      key={"project-image-co-pilot"}
      title={"Co Pilot"}
      media={{ src: ShowCoPilot, alt: "co-pilot-platform-preview" }}
      isMobile={isMobile}
    />,

    <ProjectImage
      key={"project-image-zid"}
      title={"Zid Product Manager"}
      media={{ src: ShowZidDashboard, alt: "zid-dashboard-preview" }}
      isMobile={isMobile}
    />,

    <ProjectImage
      key={"project-image-movie-matter"}
      title={"MovieMatter"}
      media={{ src: ShowMovieMatter, alt: "movie-matter-app-preview" }}
      isMobile={isMobile}
    />,

    <ProjectImage
      key={"project-image-atlas"}
      title={"Atlas Arena"}
      media={{ src: ShowAtlasArena, alt: "atlas-arena-demo" }}
      isMobile={isMobile}
    />,
  ];

  return (
    <div id="projects-section" className="section">
      <h2>Projects</h2>

      {isMobile ? (
        // mobile
        projectDescriptions.map((desc, index) => (
          <div
            key={`project-${index}`}
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            `}
          >
            {desc}
            {projectImages[index]}
            <div
              css={css`
                height: 50px;
              `}
            />
          </div>
        ))
      ) : (
        // desktop
        <div
          css={css`
            position: relative;

            display: flex;
            flex-direction: row;
            align-items: center;

            margin-top: 50px;
            margin-bottom: 50px;

            width: 90vw;
          `}
        >
          {/* left column */}
          <div>{projectDescriptions.map((desc, index) => desc)}</div>

          {/* right column */}
          <div>{projectImages.map((image, index) => image)}</div>
        </div>
      )}
    </div>
  );
};
