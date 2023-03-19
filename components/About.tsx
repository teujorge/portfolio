import Image from "next/image";
import ProfileImg from "../public/images/profile.jpg";
import { css, keyframes } from "@emotion/react";
/** @jsxImportSource @emotion/react */

export const About = () => {
  const blobAnimation = keyframes`
  0% {
    border-radius: 50% 60% 90% 40%/80% 40% 90% 70%;
  }
  50% {
    border-radius: 70% 50% 30% 70%/30% 90% 50% 60%;
  }
  100% {
    border-radius: 50% 60% 90% 40%/80% 40% 90% 70%;
  }
`;

  return (
    <div className="section">
      <h2>about me</h2>
      <div
        className="reveal"
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          @media (max-width: 1000px) {
            flex-direction: column;
          }

          @media (max-width: 800px) {
            margin: 0px !important;
          }
        `}
      >
        <Image
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px !important;
            margin-inline: auto !important;
            border: 3px solid var(--foreground-color);
            filter: grayscale(1);
            transition: border-radius 0.2s ease, filter 0.5s ease;
            animation: ${blobAnimation} 10s ease-in-out infinite;

            :hover {
              border-radius: 10px;
              filter: grayscale(0);
            }
          `}
          src={ProfileImg}
          alt={"profile-image"}
          width={200}
          height={200}
          priority
        />

        <div
          css={css`
            margin: 30px;

            p {
              margin-top: 20px;
            }

            @media (max-width: 800px) {
              margin: 10px;
            }
          `}
        >
          <p className="reveal">
            Whether I&apos;m designing and building fun games or working on
            complex web apps, I&apos;m constantly pushing myself to develop my
            software skills and take on new challenges. I believe that software
            engineering is more than just a job — it&apos;s a passion. And
            I&apos;m excited to share that passion with you through my
            portfolio. Explore my projects and experience, and let&apos;s
            engineer great things together!
          </p>

          <p className="reveal">
            Here are a few technologies I have enjoyed working with:
          </p>

          <div
            className="reveal"
            css={css`
              display: flex;
              margin: 12px !important;

              & ul {
                margin-left: 16px;
                margin-right: 16px;
              }
            `}
          >
            <ul>
              <li>Python</li>
              <li>Arduino</li>
              <li>Flutter</li>
            </ul>
            <ul>
              <li>React</li>
              <li>NextJS</li>
              <li>TypeScript</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
