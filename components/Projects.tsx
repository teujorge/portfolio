import IconApple from "../public/svg/apple-store.svg";
import IconDemo from "../public/svg/magnifying-glass.svg";
import IconGithub from "../public/svg/github.svg";
import IconGoogle from "../public/svg/play-store.svg";
import Image, { StaticImageData } from "next/image";
import ShowAtlasArena from "../public/images/atlas_arena_show.gif";
import ShowFractalViz from "../public/images/fractal_viz_show.gif";
import ShowMovieMatter from "../public/images/movie_matter_show.png";
import ShowWaterTag from "../public/images/water_tag_show.gif";
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
    desc: string[];
    tech: string[];
    icons: JSX.Element[];
  }) => {
    let description = "";
    desc.forEach((line) => (description += line + " "));

    let technologies = "";
    tech.forEach((t) => (technologies += t + " "));

    let iconButtons = "";
    icons.forEach((icon) => (iconButtons += icon));

    return (
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;

          & p {
            margin-top: 20px;
          }

          @media (max-width: 1000px) {
            flex-direction: column;
          }

          @media (max-width: 800px) {
            margin: 10px !important;
          }
        `}
      >
        <h3
          css={css`
            margin-top: 25px;
            width: 150px !important;
            min-width: 150px !important;
            max-width: 150px !important;
            text-align: center;
          `}
        >
          {title}
        </h3>
        <div
          css={css`
            @media (max-width: 800px) {
              margin: 0px !important;
            }
          `}
        >
          <Image
            css={css`
              margin: 10px;
              border-radius: 12px;
            `}
            src={media.src}
            alt={media.alt}
            width={300}
          />
        </div>
        <p>{description}</p>
        <p>{technologies}</p>
        <div
          css={css`
            display: flex;
            margin: 0px !important;
            margin-inline: auto !important;
            width: fit-content;
          `}
        >
          {iconButtons}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>personal projects</h2>

      <Project
        title={"MovieMatter"}
        media={{ src: ShowMovieMatter, alt: "movie-matter-app-preview" }}
        desc={[
          "An app for iOS and Android that shows users relevant movies, tv shows and celebrities using the TMDB API.",
          "Users can login and append to their lists to obtain unique media recommendations.",
        ]}
        tech={["Dart", "Flutter", "API"]}
        icons={[
          <IconButton
            key={"movie-matter-app-store"}
            src={IconApple}
            alt={"movie-matter-app-store"}
            href={"https://apps.apple.com/us/app/moviematter/id1631748579"}
          />,
          <IconButton
            key={"movie-matter-google-store"}
            src={IconGoogle}
            alt={"movie-matter-google-store"}
            href={
              "https://play.google.com/store/apps/details?id=com.mjorge.MovieMatter&pli=1"
            }
          />,
          <IconButton
            key={"movie-matter-github"}
            src={IconGithub}
            alt={"movie-matter-github"}
            href={"https://github.com/teujorge/MovieMatter"}
          />,
        ]}
      />

      {/* 
      <Project
        title={"Co Pilot"}
        media={{ src: EyesImg, alt: "co-pilot-platform-preview" }}
        desc={["[In-Development]"]}
        tech={["NextJS", "DB", "API"]}
        icons={[<p>website</p>, <p>github</p>]}
      />
      */}

      <Project
        title={"Water Tag"}
        media={{ src: ShowWaterTag, alt: "water-tag-prototype" }}
        desc={[
          "Laser tag, but with water!",
          "Carry a water sensitive vest and spray water on your friends in three different game modes.",
        ]}
        tech={["Arduino", "Embedded System"]}
        icons={[
          <IconButton
            key={"water-tag-github"}
            src={IconGithub}
            alt={"water-tag-github"}
            href={"https://github.com/teujorge/Arduino-Water-Belt"}
          />,
        ]}
      />

      <Project
        title={"Atlas Arena"}
        media={{ src: ShowAtlasArena, alt: "atlas-arena-demo" }}
        desc={[
          "[In-Development]",
          "A pixel-art game where you, Atlas, defend your home from endless waves of enemies.",
          "You can choose to a Knight, a Mage or an Archer in this quest to defend your home!",
        ]}
        tech={["Dart", "Flutter", "FlameGame"]}
        icons={[
          <IconButton
            key={"atlas-arena-demo"}
            src={IconDemo}
            alt={"atlas-arena-demo"}
            href={"https://teujorge.github.io/atlas/"}
          />,
          <IconButton
            key={"atlas-arena-github"}
            src={IconGithub}
            alt={"atlas-arena-github"}
            href={"https://github.com/teujorge/atlas"}
          />,
        ]}
      />

      <Project
        title={"Fractal Viz"}
        media={{ src: ShowFractalViz, alt: "fractal-viz-demo" }}
        desc={[
          "[In-Development]",
          "Visualize the Chaos Game!",
          "Use simple shapes and rule sets to create complex fractals",
        ]}
        tech={["Dart", "Flutter", "FlameGame"]}
        icons={[
          <IconButton
            key={"fractal-viz-demo"}
            src={IconDemo}
            alt={"fractal-viz-demo"}
            href={"https://teujorge.github.io/fractals/"}
          />,
          <IconButton
            key={"fractal-viz-github"}
            src={IconGithub}
            alt={"fractal-viz-github"}
            href={"https://github.com/teujorge/fractals"}
          />,
        ]}
      />
    </div>
  );
};
