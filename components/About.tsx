import Image from "next/image";
import ProfileImg from "../public/images/profile.jpg";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

export const About = () => {
  return (
    <div>
      <h2>about me</h2>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          justify-content: center;

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
            padding: 3px;
            border-radius: 50%;
            background-color: black;
            filter: grayscale(1);
            transition: border-radius 0.2s ease, filter 0.5s ease;

            &:hover {
              border-radius: 10px;
              filter: grayscale(0);
            }

            @media (prefers-color-scheme: dark) {
              background-color: white;
            }
          `}
          src={ProfileImg}
          alt={"profile-image"}
          width={200}
          height={200}
        />

        <div
          css={css`
            margin-top: 10px !important;

            & p {
              margin-top: 20px;
            }

            @media (max-width: 800px) {
              margin: 10px !important;
            }
          `}
        >
          <p>Hello! I am Matheus.</p>

          <p>
            I enjoy developing products using technology, whether that be
            physical or virtual.
          </p>

          <p>
            I strive to make a contribution to society through technology and
            engineering in order to bring comfort to the world. I am constantly
            looking to further develop my technical, communication and
            interpersonal skills. Shortly, I am a mechanical engineer by trade
            but I am now focused on accruing software expertise by working on a
            variety of interesting projects on a daily basis.
          </p>

          <p>Here are a few technologies I have enjoyed working with:</p>

          <div
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
              <li>Typescript</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
