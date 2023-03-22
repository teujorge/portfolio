import IconApple from "../public/svg/apple-store";
import IconDemo from "../public/svg/eye";
import IconGithub from "../public/svg/github";
import IconGoogle from "../public/svg/play-store";
import Image, { StaticImageData } from "next/image";
import ShowAtlasArena from "../public/images/demos/atlas_arena.gif";
import ShowMovieMatter from "../public/images/demos/movie_matter.png";
import ShowCoPilot from "../public/images/demos/co_pilot.gif";
import ShowZidDashboard from "../public/images/demos/zid_dashboard.gif";
import { css } from "@emotion/react";
import { IconButton } from "./IconButton";
/** @jsxImportSource @emotion/react */

export const Projects = () => {
  const Project = ({
    title,
    media,
    desc,
    tech,
    icons,
  }: {
    title: string;
    media: { src: StaticImageData; alt: string };
    desc: string;
    tech: string[];
    icons: JSX.Element[];
  }) => {
    const IMAGE_WIDTH_L = 400;
    const IMAGE_WIDTH_S = 250;

    let technologies = "";

    for (let i = 0; i < tech.length - 1; i++) {
      technologies += tech[i] + " - ";
    }
    technologies += tech[tech.length - 1];

    let iconButtons: JSX.Element[] = [];
    icons.forEach((icon) => iconButtons.push(icon));

    return (
      <div
        className="reveal"
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 40px;
          padding: 20px;
          border-radius: 20px;
          background-color: var(--off-background-color);

          box-shadow: 0px 0px 8px var(--shadow-color);

          p {
            margin-top: 20px;
          }

          @media (max-width: 1000px) {
            flex-direction: column;
          }

          @media (max-width: 800px) {
            margin-top: 25px;
            margin-bottom: 15px;
            margin-left: 10px;
            margin-right: 10px;
          }
        `}
      >
        <div>
          {/* project title */}
          <h3
            className="reveal"
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

          {/* image demo */}
          <Image
            className="reveal"
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
                height: ${IMAGE_WIDTH_S *
                (media.src.height / media.src.width)}px;
              }
            `}
            src={media.src}
            alt={media.alt}
            unoptimized={true}
          />
        </div>

        {/* descriptions */}
        <div
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          <p className="reveal">{desc}</p>
          <p className="reveal">{technologies}</p>
          <div
            className="reveal"
            css={css`
              display: flex;
              margin: 10px;
              width: fit-content;
            `}
          >
            {iconButtons}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="projects" className="section">
      <h2>Projects</h2>

      <Project
        title={"Co Pilot"}
        media={{ src: ShowCoPilot, alt: "co-pilot-platform-preview" }}
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

      <Project
        title={"Zid Product Manager"}
        media={{ src: ShowZidDashboard, alt: "zid-dashboard-preview" }}
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

      <Project
        title={"MovieMatter"}
        media={{ src: ShowMovieMatter, alt: "movie-matter-app-preview" }}
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

      <Project
        title={"Atlas Arena"}
        media={{ src: ShowAtlasArena, alt: "atlas-arena-demo" }}
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
    </div>
  );
};
