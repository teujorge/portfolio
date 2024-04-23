"use client";

import Link from "next/link";
import assert from "assert";
import ShowMovieMatter from "~/public/images/demos/movie-matter.webp";
import ShowPollistDashboard from "~/public/images/demos/pollist.webp";
import { useRef } from "react";
import { SvgEye } from "~/public/svg/eye";
import { SvgGithub } from "~/public/svg/github";
import { IconButton } from "../IconButton";
import { MOBILE_WIDTH } from "@/app/(v1)/app";
import { ProjectImage } from "./ProjectImage";
import { SvgPlayStore } from "~/public/svg/play-store";
import { SvgAppleStore } from "~/public/svg/apple-store";
import { useWindowSize } from "@/contexts/WindowSize";
import { ProjectDescription } from "./ProjectDescription";

export const Projects = () => {
  const iconClassName = "w-6 h-6";

  const projectsDesktopRef = useRef<HTMLDivElement>(null);

  const descRef1 = useRef<HTMLDivElement>(null);
  const descRef2 = useRef<HTMLDivElement>(null);
  const descRef3 = useRef<HTMLDivElement>(null);

  const windowSize = useWindowSize();
  const isMobile = windowSize.width < MOBILE_WIDTH;

  const projectDescriptions = [
    <div ref={descRef1} key={"project-description-dtek-swift"}>
      <ProjectDescription
        title={"Dtek Swift"}
        desc={
          "A cutting-edge retail technology solution designed to enhance the shopping experience by utilizing AI, computer vision, and data analytics. This innovative system aims to streamline the checkout process, reduce waiting times, and address common retail challenges such as stock mismanagement and crowded checkouts. SWIFT offers plug-and-play integration for minimal operational disruption, making it an efficient tool for retailers looking to improve efficiency, customer satisfaction, and gain valuable insights into their operations."
        }
        tech={["Flutter", "Firebase"]}
        icons={[
          <IconButton
            key={"dtek-swift-website"}
            src={<SvgEye className={iconClassName} />}
            href={"https://dtek.ai"}
            desc={"Website"}
          />,
        ]}
      />
    </div>,

    <div ref={descRef2} key={"project-description-pollist"}>
      <ProjectDescription
        title={"Pollist"}
        desc={
          "A dynamic social media app focused on polls, enabling users to easily create, share, and vote on polls across any topic. With an endless scroll feature on the home page, it offers a seamless browsing experience. It delivers real-time updates on poll results, along with a suite of social features such as commenting, liking, and following, all with prompt notifications. User profiles display their created polls and voting history, with privacy options for sensitive votes, fostering a vibrant community of poll enthusiasts."
        }
        tech={["Next.Js", "React", "Supabase", "Clerk"]}
        icons={[
          <IconButton
            key={"zid-platform"}
            src={<SvgEye className={iconClassName} />}
            href={"https://pollist.org"}
            desc={"Website"}
          />,
          <IconButton
            key={"pollist-github"}
            src={<SvgGithub className={iconClassName} />}
            href={"https://github.com/teujorge/pollist"}
            desc={"GitHub"}
          />,
        ]}
      />
    </div>,

    <div ref={descRef3} key={"project-description-movie-matter"}>
      <ProjectDescription
        title={"MovieMatter"}
        desc={
          "This media hub app is a must-have for movie and TV show enthusiasts. Using the TMDB API, the app provides users with personalized recommendations for movies, TV shows, and celebrities. The app also allows users to create personalized lists of their favorite media, making it easy to keep track of what they've watched and what they want to see next."
        }
        tech={["Dart", "Flutter", "API"]}
        icons={[
          <IconButton
            key={"movie-matter-google-store"}
            src={<SvgPlayStore className={iconClassName} />}
            href={
              "https://play.google.com/store/apps/details?id=com.mjorge.MovieMatter&pli=1"
            }
            desc={"Google Store"}
          />,
          <IconButton
            key={"movie-matter-apple-store"}
            src={<SvgAppleStore className={iconClassName} />}
            href={
              "https://apps.apple.com/br/app/moviematter/id1631748579?l=en-GB"
            }
            desc={"Apple Store"}
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
  ];

  const projectImages = [
    <ProjectImage
      descRef={descRef1}
      wrapperRef={projectsDesktopRef}
      key={"project-image-co-pilot"}
      media={undefined}
      isMobile={isMobile}
    >
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover border-8 rounded-[var(--border-radius)] border-black"
      >
        <source src="/raw/dtek-swift.mp4" type="video/mp4" />
      </video>
    </ProjectImage>,

    <ProjectImage
      descRef={descRef2}
      wrapperRef={projectsDesktopRef}
      key={"project-image-pollist"}
      media={{ src: ShowPollistDashboard, alt: "pollist-dashboard-preview" }}
      isMobile={isMobile}
      className="w-full h-full flex flex-col"
    >
      <iframe
        src="https://pollist.org"
        className="w-full h-full"
        title="pollist-preview"
      />
      <div className="flex items-center justify-center w-full h-fit p-3 bg-white group">
        <div className="animate-bounce group-hover:animate-none flex-row flex flex-wrap items-center justify-center w-full h-fit text-black">
          <p className="text-center">
            For the best experience, please visit the{" "}
            <Link
              href="https://pollist.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              website
            </Link>
          </p>
        </div>
      </div>
    </ProjectImage>,

    <ProjectImage
      descRef={descRef3}
      wrapperRef={projectsDesktopRef}
      key={"project-image-movie-matter"}
      media={{ src: ShowMovieMatter, alt: "movie-matter-app-preview" }}
      isMobile={isMobile}
    >
      {null}
    </ProjectImage>,
  ];

  assert(
    projectDescriptions.length === projectImages.length,
    "projectDescriptions and projectImages must have the same length"
  );

  return (
    <div id="projects-section" className="section">
      <h2>Projects</h2>

      {isMobile ? (
        // mobile
        projectDescriptions.map((desc, index) => (
          <div
            key={`project-${index}`}
            className="flex flex-col justify-center items-center w-full"
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
          className="relative flex flex-row items-center my-12 w-[90vw]"
        >
          {/* left column */}
          <div>{projectDescriptions.map((desc, _) => desc)}</div>

          {/* right column */}
          <div className="sticky top-0 bottom-0 w-full h-screen">
            {projectImages.map((image, _) => image)}
          </div>
        </div>
      )}
    </div>
  );
};
