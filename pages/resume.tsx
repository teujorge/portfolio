/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useState } from "react";

const Resume = () => {
  const [resumeLink, setResumeLink] = useState("");

  useEffect(() => {
    setResumeLink(window.location.origin + "/resume.pdf");
  }, []);

  console.log(resumeLink);

  return (
    <object
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100vw;
        height: 100vh;
      `}
      data={resumeLink}
      type="application/pdf"
    >
      <h1>Oops...</h1>
      <h2
        css={css`
          text-decoration: none;
        `}
      >
        there was an error loading the PDF, you can find it{" "}
        <a
          css={css`
            text-decoration: underline;
            transition: color 0.2s ease;

            :hover {
              color: var(--primary-color);
            }
          `}
          href={resumeLink}
        >
          here!
        </a>
      </h2>
    </object>
  );
};

export default Resume;
