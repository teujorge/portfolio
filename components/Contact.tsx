/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Contact = () => {
  return (
    <div className="section">
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

            label,
            input,
            textarea,
            button {
              font-family: inherit;
              width: 350px;

              background: none;
              outline: none;
              border: 1px solid transparent;
              border-radius: var(--border-radius);

              @media (max-width: 600px) {
                width: 225px;
              }
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

            button {
              cursor: pointer;
              font-size: 14px;
              font-weight: 500;

              margin-top: 20px;
              padding: 10px;

              color: var(--background-color);
              background-color: var(--primary-color);

              :hover {
                background-color: var(--primary-color-high);
              }
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

          <button className="reveal" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
