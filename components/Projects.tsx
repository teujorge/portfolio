/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import IconApple from "../public/svg/apple-store";
import IconDemo from "../public/svg/eye";
import IconGithub from "../public/svg/github";
import IconGoogle from "../public/svg/play-store";
import Image, { StaticImageData } from "next/image";
import ShowAtlasArena from "../public/images/demos/atlas_arena.gif";
import ShowMovieMatter from "../public/images/demos/movie_matter.png";
import ShowCoPilot from "../public/images/demos/co_pilot.gif";
import ShowZidDashboard from "../public/images/demos/zid_dashboard.gif";
import ShowWaterTag from "../public/images/demos/water_tag.gif";
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
}

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

        margin: 20px;
        padding: 20px;
        /* border-radius: 20px; */
        /* background-color: var(--off-background-color); */
        /* box-shadow: 0px 0px 8px var(--shadow-color); */
        width: 40vw;
        min-height: 100vh;

        p {
          margin-top: 20px;
        }

        @media (max-width: 1000px) {
          flex-direction: column;
        }

        @media (max-width: 800px) {
          margin-top: 20px;
          margin-bottom: 10px;
          margin-left: 10px;
          margin-right: 10px;
        }
      `}
    >
      {/* project title */}
      <h3
        // className="reveal"
        css={css`
          margin: 10px;
          text-align: left;

          @media (max-width: 1000px) {
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

const ProjectImage = ({ title, media }: ProjectImageProps) => {
  const IMAGE_WIDTH_L = 400;
  const IMAGE_WIDTH_S = 250;
  const PROJECT_ID = `project-item-${title}`;

  const [imageHeight, setImageHeight] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(0);

  const firstTitle = "Co Pilot";
  const lastTitle = "Water Wars";

  useEffect(() => {
    const projectElement = document.getElementById(PROJECT_ID)!;

    function handleScroll() {
      let percentageInView = inViewPercentage(projectElement);

      if (window.innerWidth <= 1000) percentageInView += 25;

      // determines scale
      let height = Math.max(0, percentageInView); // handle < 0 percentage
      height = Math.min(100, percentageInView); // handle > 100 percentage

      // determines opacity
      let opacity = 1;
      const pastDelta = title === lastTitle ? 200 : 250;
      if (percentageInView > 100) {
        opacity = (pastDelta - percentageInView) / 100;
      } else if (percentageInView < 0) opacity = 0;

      setImageHeight(height);
      setImageOpacity(opacity);
    }

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      css={css`
        position: fixed;
        top: 0px;
        right: 0px;

        overflow: hidden;
        width: 50vw;
        height: 100vh;
        background-color: var(--off-background-color);
        backdrop-filter: blur(20px);

        opacity: ${imageOpacity};
        transform-origin: top;
        transform: scaleY(${imageHeight / 100});

        transition: all 0s ease;

        @media (max-width: 1000px) {
          z-index: 3;

          width: 100vw;
          height: 50vh;
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
          transform: scaleY(${1 / (imageHeight / 100)});

          transition: all 0s ease;

          @media (max-width: 1000px) {
            width: 100vw;
            height: 50vh;
          }
        `}
      >
        {/* image demo */}
        <Image
          // className="reveal"
          css={css`
            object-fit: contain;
            margin: 20px;
            width: ${IMAGE_WIDTH_L}px;
            height: ${IMAGE_WIDTH_L * (media.src.height / media.src.width)}px;

            border: none;
            border-radius: 12px;

            @media (max-width: 1100px) {
              margin: 15px;
              width: ${IMAGE_WIDTH_S}px;
              height: ${IMAGE_WIDTH_S * (media.src.height / media.src.width)}px;
            }
          `}
          src={media.src}
          alt={media.alt}
          unoptimized={true}
        />
      </div>
    </div>
  );
};

export const Projects = () => {
  return (
    <div
      className="section"
      css={css`
        margin-top: 250px;
        margin-bottom: 250px;

        h2 {
          z-index: 2;
        }
      `}
    >
      <h2>Projects</h2>

      <div
        css={css`
          position: relative;

          display: flex;
          flex-direction: row;
          align-items: center;

          margin-top: 50px;
          margin-bottom: 50px;

          width: 90vw;

          @media (max-width: 1000px) {
            flex-direction: column;
          }
        `}
      >
        {/* left column */}
        <div>
          <ProjectDescription
            title={"Co Pilot"}
            desc={`
            [In-Development] This platform connects users with skilled 
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
          />

          <ProjectDescription
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
          />

          <ProjectDescription
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
          />

          <ProjectDescription
            title={"Atlas Arena"}
            desc={`[In-Development] Atlas is a thrilling pixel-art game 
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
                desc={"Demo"}
              />,
              <IconButton
                key={"atlas-arena-github"}
                src={IconGithub}
                href={"https://github.com/teujorge/atlas"}
                desc={"GitHub"}
              />,
            ]}
          />

          <ProjectDescription
            title={"Water Wars"}
            desc={`
            Water Wars is an exciting twist on the classic laser 
            tag game. Players wear water-sensitive vests and use 
            water guns to soak their opponents in three different 
            game modes. With its engaging game play and unique 
            water-based mechanics, Water Wars is perfect for 
            players of all ages.
          `}
            tech={["Arduino", "Embedded System"]}
            icons={[
              <IconButton
                key={"water-wars-github"}
                src={IconGithub}
                href={"https://github.com/teujorge/Arduino-Water-Belt"}
                desc={"GitHub"}
              />,
            ]}
          />
        </div>

        {/* right column */}
        <div>
          <ProjectImage
            title={"Co Pilot"}
            media={{ src: ShowCoPilot, alt: "co-pilot-platform-preview" }}
          />

          <ProjectImage
            title={"Zid Product Manager"}
            media={{ src: ShowZidDashboard, alt: "zid-dashboard-preview" }}
          />

          <ProjectImage
            title={"MovieMatter"}
            media={{ src: ShowMovieMatter, alt: "movie-matter-app-preview" }}
          />

          <ProjectImage
            title={"Atlas Arena"}
            media={{ src: ShowAtlasArena, alt: "atlas-arena-demo" }}
          />

          <ProjectImage
            title={"Water Wars"}
            media={{ src: ShowWaterTag, alt: "water-tag-prototype" }}
          />
        </div>
      </div>
    </div>
  );
};
