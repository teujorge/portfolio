"use client";

import gsap from "gsap";
import IconApple from "~/public/svg/apple-store";
import IconDemo from "~/public/svg/eye";
import IconGithub from "~/public/svg/github";
import IconGoogle from "~/public/svg/play-store";
import Image, { StaticImageData } from "next/image";
import ShowAtlasArena from "~/public/images/demos/demo-atlas.webp";
import ShowCoPilot from "~/public/images/demos/demo-co-pilot.webp";
import ShowMovieMatter from "~/public/images/demos/demo-movie-matter.webp";
import ShowZidDashboard from "~/public/images/demos/demo-zid.webp";
import { AppContext, windowSize } from "@/app/app";
import { IconButton } from "./IconButton";
import { inViewPercentage } from "@/utils/inView";
import { RefObject, useContext, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Position } from "@/utils/position";
import React from "react";

interface ProjectDescriptionProps {
  title: string;
  desc: string;
  tech: string[];
  icons: JSX.Element[];
}

interface ProjectImageProps {
  media: { src: StaticImageData; alt: string };
  isMobile: boolean;
  descRef: RefObject<HTMLDivElement>;
  wrapperRef: RefObject<HTMLDivElement>;
}

const ProjectDescription = ({
  title,
  desc,
  tech,
  icons,
}: ProjectDescriptionProps) => {
  let technologies = "";

  for (let i = 0; i < tech.length - 1; i++) {
    technologies += tech[i] + " • ";
  }
  technologies += tech[tech.length - 1];

  let iconButtons: JSX.Element[] = [];
  icons.forEach((icon) => iconButtons.push(icon));

  return (
    <div className="reveal flex flex-col justify-center items-center ml-0 mr-0 mt-12 mb-0 p-3 w-auto lg:m-5 lg:p-5 lg:w-[40vw] lg:min-h-screen">
      <h3 className="m-2.5 text-left">{title}</h3>
      <p className="m-2.5">{desc}</p>
      <p className="m-2.5">{technologies}</p>
      <div className="flex m-2.5 w-[fit-content]">
        {icons.map((icon, index) => (
          <React.Fragment key={index}>{icon}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ProjectImage = ({
  descRef,
  wrapperRef,
  media,
  isMobile,
}: ProjectImageProps) => {
  const projectImageOutWrapperRef = useRef<HTMLDivElement>(null);
  const projectImageInWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;

    const wrapperElement = wrapperRef.current!;
    const projectDescElement = descRef.current!;

    const projectImageOutWrapperElement = projectImageOutWrapperRef.current!;
    const projectImageInWrapperElement = projectImageInWrapperRef.current!;

    const ANIM_DURATION = 0;
    async function handleScroll() {
      let percentageInView = inViewPercentage(projectDescElement);

      // determine height
      let height = 0;
      if (percentageInView > -100 && percentageInView < 200) {
        height = Math.max(0, percentageInView); // handle < 0 percentage
        height = Math.min(100, percentageInView); // handle > 100 percentage
      }

      // determine brightness
      let brightness = 1;
      if (percentageInView > 100) {
        brightness = Math.min(1, 1 - (percentageInView / 100 - 1) / 2); // handle > 100 percentage
      }

      // animate
      gsap.to(projectImageOutWrapperElement, {
        height: `${height}vh`,
        filter: `brightness(${brightness})`,
        duration: ANIM_DURATION,
      });

      // for sticky effect
      const wrapperRect = wrapperElement.getBoundingClientRect();

      // move top when projects section is scrolling into view
      if (wrapperRect.top > 0) {
        gsap.to(projectImageOutWrapperElement, {
          top: wrapperRect.top,
          duration: ANIM_DURATION,
        });
      }

      // move bottom when projects section is scrolling out of view
      else if (wrapperRect.bottom <= windowSize.height) {
        gsap.to(projectImageOutWrapperElement, {
          top: wrapperRect.bottom - windowSize.height,
          duration: ANIM_DURATION,
        });
      }

      // stay on top 0px
      else {
        gsap.to(projectImageOutWrapperElement, {
          top: 0,
          duration: ANIM_DURATION,
        });
      }
    }

    // scroll listener
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.observe({
      target: window,
      type: "scroll",
      onChangeY: handleScroll,
    });
  }, []);

  if (isMobile) {
    return (
      <Image
        className="reveal w-fit h-fit object-contain rounded-[var(--border-radius)] shadow-md"
        style={{
          maxWidth: "calc(90% - 20px)",
          maxHeight: "calc(90% - 20px)",
          boxShadow: "0px 0px 10px var(--shadow-color)",
        }}
        src={media.src}
        alt={media.alt}
        priority
      />
    );
  }

  return (
    <div
      ref={projectImageOutWrapperRef}
      className="fixed right-0 overflow-hidden w-1/2 h-screen"
    >
      <div
        ref={projectImageInWrapperRef}
        className="flex items-center w-full h-screen"
      >
        <Image
          className="object-contain ml-2.5 w-fit h-fit rounded-[var(--border-radius)] shadow-md transition-none"
          style={{
            maxWidth: "90%",
            maxHeight: "90%",
            boxShadow: "0px 0px 10px var(--shadow-color)",
          }}
          src={media.src}
          alt={media.alt}
          priority
        />
      </div>
    </div>
  );
};

export const Projects = () => {
  const { isMobile } = useContext(AppContext);

  const projectsDesktopRef = useRef<HTMLDivElement>(null);

  const descRef1 = useRef<HTMLDivElement>(null);
  const descRef2 = useRef<HTMLDivElement>(null);
  const descRef3 = useRef<HTMLDivElement>(null);
  const descRef4 = useRef<HTMLDivElement>(null);

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
            src={IconDemo}
            href={"https://co-pilot.netlify.app"}
            desc={"Demo"}
            descPos={isMobile ? Position.top : Position.bot}
          />,
          <IconButton
            key={"co-pilot-github"}
            src={IconGithub}
            href={"https://github.com/teujorge/co-pilot-web"}
            desc={"GitHub"}
            descPos={isMobile ? Position.top : Position.bot}
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
            src={IconDemo}
            href={"https://zid-products-staging.netlify.app/login"}
            desc={"Demo"}
            descPos={isMobile ? Position.top : Position.bot}
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
          <IconButton
            key={"movie-matter-app-store"}
            src={IconApple}
            href={"https://apps.apple.com/us/app/moviematter/id1631748579"}
            desc={"Apple Store"}
            descPos={isMobile ? Position.top : Position.bot}
          />,
          <IconButton
            key={"movie-matter-google-store"}
            src={IconGoogle}
            href={
              "https://play.google.com/store/apps/details?id=com.mjorge.MovieMatter&pli=1"
            }
            desc={"Google Store"}
            descPos={isMobile ? Position.top : Position.bot}
          />,
          <IconButton
            key={"movie-matter-github"}
            src={IconGithub}
            href={"https://github.com/teujorge/MovieMatter"}
            desc={"GitHub"}
            descPos={isMobile ? Position.top : Position.bot}
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
            src={IconDemo}
            href={"https://teujorge.github.io/atlas/"}
            desc={"Web Demo"}
            descPos={isMobile ? Position.top : Position.bot}
          />,
          <IconButton
            key={"atlas-arena-beta"}
            src={IconApple}
            href={"https://testflight.apple.com/join/GC3yVQk6"}
            desc={"Beta"}
            descPos={isMobile ? Position.top : Position.bot}
          />,

          <IconButton
            key={"atlas-arena-github"}
            src={IconGithub}
            href={"https://github.com/teujorge/atlas"}
            desc={"GitHub"}
            descPos={isMobile ? Position.top : Position.bot}
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
