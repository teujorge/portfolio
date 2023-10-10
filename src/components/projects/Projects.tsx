"use client";

import { MOBILE_WIDTH } from "@/app/app";
import { useEffect, useRef, useState } from "react";
import ShowAtlasArena from "~/public/images/demos/demo-atlas.webp";
import ShowCoPilot from "~/public/images/demos/demo-co-pilot.webp";
import ShowMovieMatter from "~/public/images/demos/demo-movie-matter.webp";
import ShowZidDashboard from "~/public/images/demos/demo-zid.webp";
import { SvgEye } from "~/public/svg/eye";
import { SvgGithub } from "~/public/svg/github";
import { SvgPlayStore } from "~/public/svg/play-store";
import { IconButton } from "../IconButton";
import { ProjectDescription } from "./ProjectDescription";
import { ProjectImage } from "./ProjectImage";

export const Projects = () => {
  const iconClassName = "w-6 h-6";

  const projectsDesktopRef = useRef<HTMLDivElement>(null);

  const descRef1 = useRef<HTMLDivElement>(null);
  const descRef2 = useRef<HTMLDivElement>(null);
  const descRef3 = useRef<HTMLDivElement>(null);
  const descRef4 = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < MOBILE_WIDTH) {
        if (!isMobile) setIsMobile(true);
      } else {
        if (isMobile) setIsMobile(false);
      }
    }
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const projectDescriptions = [
    <div ref={descRef1} key={"project-description-co-pilot"}>
      <ProjectDescription
        title={"Co Pilot"}
        desc={`
        This platform connects users with skilled 
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
            src={<SvgEye className={iconClassName} />}
            href={"https://co-pilot.netlify.app"}
            desc={"Demo"}
          />,
          <IconButton
            key={"co-pilot-github"}
            src={<SvgGithub className={iconClassName} />}
            href={"https://github.com/teujorge/co-pilot-web"}
            desc={"GitHub"}
          />,
        ]}
      />
    </div>,

    <div ref={descRef2} key={"project-description-zid"}>
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
            src={<SvgEye className={iconClassName} />}
            href={"https://zid-products-staging.netlify.app/login"}
            desc={"Demo"}
          />,
        ]}
      />
    </div>,

    <div ref={descRef3} key={"project-description-movie-matter"}>
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
          // <IconButton
          //   key={"movie-matter-app-store"}
          //   src={<SvgAppleStore className={iconClassName} />}
          //   href={"https://apps.apple.com/us/app/moviematter/id1631748579"}
          //   desc={"Apple Store"}
          // />,
          <IconButton
            key={"movie-matter-google-store"}
            src={<SvgPlayStore className={iconClassName} />}
            href={
              "https://play.google.com/store/apps/details?id=com.mjorge.MovieMatter&pli=1"
            }
            desc={"Google Store"}
          />,
          <IconButton
            key={"movie-matter-github"}
            src={<SvgGithub className={iconClassName} />}
            href={"https://github.com/teujorge/MovieMatter"}
            desc={"GitHub"}
          />,
        ]}
      />
    </div>,

    <div ref={descRef4} key={"project-description-atlas"}>
      <ProjectDescription
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
            src={<SvgEye className={iconClassName} />}
            href={"https://teujorge.github.io/atlas/"}
            desc={"Web Demo"}
          />,
          // <IconButton
          //   key={"atlas-arena-beta"}
          //   src={<SvgAppleStore className={iconClassName} />}
          //   href={"https://testflight.apple.com/join/GC3yVQk6"}
          //   desc={"Beta"}
          // />,
          <IconButton
            key={"atlas-arena-github"}
            src={<SvgGithub className={iconClassName} />}
            href={"https://github.com/teujorge/atlas"}
            desc={"GitHub"}
          />,
        ]}
      />
    </div>,
  ];

  const projectImages = [
    <ProjectImage
      descRef={descRef1}
      wrapperRef={projectsDesktopRef}
      key={"project-image-co-pilot"}
      media={{ src: ShowCoPilot, alt: "co-pilot-platform-preview" }}
      isMobile={isMobile}
    />,

    <ProjectImage
      descRef={descRef2}
      wrapperRef={projectsDesktopRef}
      key={"project-image-zid"}
      media={{ src: ShowZidDashboard, alt: "zid-dashboard-preview" }}
      isMobile={isMobile}
    />,

    <ProjectImage
      descRef={descRef3}
      wrapperRef={projectsDesktopRef}
      key={"project-image-movie-matter"}
      media={{ src: ShowMovieMatter, alt: "movie-matter-app-preview" }}
      isMobile={isMobile}
    />,

    <ProjectImage
      descRef={descRef4}
      wrapperRef={projectsDesktopRef}
      key={"project-image-atlas"}
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
            className="flex flex-col justify-center items-center"
            style={{
              width: "calc(95vw - 20px)",
            }}
          >
            {desc}
            {projectImages[index]}
            <div className="h-12" />
          </div>
        ))
      ) : (
        // desktop
        <div
          ref={projectsDesktopRef}
          className="relative flex flex-row items-center my-12"
          style={{
            width: "90vw",
          }}
        >
          {/* left column */}
          <div>{projectDescriptions.map((desc, _) => desc)}</div>

          {/* right column */}
          <div>{projectImages.map((image, _) => image)}</div>
        </div>
      )}
    </div>
  );
};
