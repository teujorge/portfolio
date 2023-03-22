/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Skills = () => {
  return (
    <div className="section">
      <h2>My Skillset</h2>

      <p className="reveal">
        Here are a few technologies I have enjoy working with:
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
          <li>GitHub</li>
          <li>RESTful APIs</li>
          <li>Firebase</li>
          <li>Command Line</li>
          <li>VS Code</li>
          <li>Responsive Websites</li>
          <li>Figma</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>TypeScript</li>
          <li>React</li>
          <li>NextJS</li>
        </ul>
      </div>
    </div>
  );
};
