/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FormEvent } from "react";

export const Contact = () => {
  function submitContactForm(event: FormEvent) {
    event.preventDefault();

    console.log(event);
  }

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

          @media (max-width: 700px) {
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

              width: 300px;
            }

            label {
              margin-top: 10px;
            }

            input,
            textarea {
              margin-top: 10px;
              margin-bottom: 10px;
              padding: 10px;
            }

            button {
              margin-top: 20px;
              padding: 10px;
            }
          `}
          name="portfolio-contact-form"
          method="POST"
          data-netlify="true"
          onSubmit={submitContactForm}
        >
          <label className="reveal">Name:</label>
          <input className="reveal" type="text" name="name" />

          <label className="reveal">Email:</label>
          <input className="reveal" type="email" name="email" />

          <label className="reveal">Message:</label>
          <textarea className="reveal" name="message" />

          <button className="reveal" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
