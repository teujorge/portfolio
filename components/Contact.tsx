/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import EyeFollows from "./EyeFollows";
import IconEmail from "../public/svg/envelope";
import { DescPos, IconButton } from "./IconButton";

export const Contact = () => {
  return (
    <div
      id="contact-section"
      className="section"
      css={css`
        margin-bottom: 0px;
        padding-bottom: 0px;
        overflow-y: hidden;
      `}
    >
      <h2>Get In Touch</h2>

      <div
        className="reveal"
        css={css`
          margin: 20px;
          padding: 40px;

          border-radius: var(--border-radius);
          background-color: var(--off-background-color);
          box-shadow: 0px 0px 8px var(--shadow-color);

          @media (max-width: 600px) {
            padding: 20px;
          }
        `}
      >
        <form
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;

            width: 350px;
            @media (max-width: 600px) {
              width: 225px;
            }

            label,
            input,
            textarea,
            button {
              font-family: inherit;
              width: 100%;

              background: none;
              outline: none;
              border: 1px solid transparent;
              border-radius: var(--border-radius);
            }

            label {
              margin-top: 10px;
            }

            input,
            textarea {
              margin-top: 5px;
              margin-bottom: 10px;
              padding-top: 10px;
              padding-bottom: 10px;
              padding-left: 14px;
              padding-right: 14px;

              background-color: var(--background-color);

              :focus {
                border: 1px solid var(--primary-color);
              }
            }

            textarea {
              resize: vertical;
              overflow-y: overlay;
              min-height: 120px;
            }

            textarea::-webkit-scrollbar {
              width: 0px;
            }
          `}
          name="portfolio-contact-form"
          method="POST"
          data-netlify="true"
        >
          <input
            type="hidden"
            name="form-name"
            value="portfolio-contact-form"
          />

          <label className="reveal" htmlFor="name">
            Name:
          </label>
          <input className="reveal" type="text" name="name" required />

          <label className="reveal" htmlFor="email">
            Email:
          </label>
          <input className="reveal" type="email" name="email" required />

          <label className="reveal" htmlFor="message">
            Message:
          </label>
          <textarea className="reveal" name="message" required />

          <div
            css={css`
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;

              margin-top: 20px;

              button {
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;

                padding: 10px;
                margin-right: 5px;

                color: var(--background-color);
                background-color: var(--primary-color);

                :hover {
                  background-color: var(--primary-color-high);
                }
              }
            `}
          >
            <button className="reveal" type="submit">
              Send
            </button>

            <IconButton
              href={"mailto:mrljorge@outlook.com"}
              src={IconEmail}
              size={40}
              desc="Email App"
              descPos={DescPos.bot}
            />
          </div>
        </form>
      </div>

      {/* eye */}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;

          transform: translateY(75px);
        `}
      >
        <p
          css={css`
            z-index: 1;
            font-style: italic;
            font-size: 0.8rem;

            transform: translateY(-25px);

            span {
              font-style: normal;
              font-weight: bold;
            }
          `}
        >
          an engineer who <span>sees</span> the big picture and the small
          details!
        </p>
        <EyeFollows size={150} />
      </div>
    </div>
  );
};
