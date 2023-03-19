/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DescPos, IconButton } from "./IconButton";
import IconEmail from "../public/svg/envelope";

export const Contact = () => {
  return (
    <div id="contact-section" className="section">
      <h2>get in touch</h2>

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
              padding: 10px;

              background-color: var(--background-color);

              :focus {
                border: 1px solid var(--primary-color);
              }
            }

            textarea {
              resize: vertical;
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
    </div>
  );
};
