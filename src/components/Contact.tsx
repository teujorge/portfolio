import EyeFollows from "./EyeFollows";
import { SvgEnvelope } from "~/public/svg/envelope";
import { Position } from "@/utils/position";
import { IconButton } from "./IconButton";

export const Contact = () => {
  const INPUT_STYLES =
    "reveal w-full bg-[var(--background-color)] outline-none border border-transparent rounded-[var(--border-radius)] mt-1.5 mb-2.5 px-3.5 py-2.5 focus:border-[var(--primary-color)]";
  const LABEL_STYLES = "reveal mt-2.5";

  return (
    <div id="contact-me" className="section mb-0 pb-0 overflow-y-hidden">
      <h2>Get In Touch</h2>

      <div className="reveal m-4 p-4 rounded-[var(--border-radius)] bg-[var(--off-background-color)] shadow-md md:p-10">
        <form
          className="flex flex-col justify-center align-content-center w-3/4 md:w-96"
          name="portfolio-contact-form"
          method="POST"
          data-netlify="true"
        >
          <input
            type="hidden"
            name="form-name"
            value="portfolio-contact-form"
          />

          <label className={LABEL_STYLES} htmlFor="name">
            Name:
          </label>
          <input className={INPUT_STYLES} type="text" name="name" required />

          <label className={LABEL_STYLES} htmlFor="email">
            Email:
          </label>
          <input className={INPUT_STYLES} type="email" name="email" required />

          <label className={LABEL_STYLES} htmlFor="message">
            Message:
          </label>
          <textarea
            className={`${INPUT_STYLES} resize-y overflow-y-auto min-h-30`}
            name="message"
            required
          />

          <div className="flex flex-row justify-center items-center mt-5">
            <button className="reveal w-full" type="submit">
              Send
            </button>

            <IconButton
              href={"mailto:mrljorge@outlook.com"}
              src={<SvgEnvelope className="w-6 h-6" />}
              desc="Email App"
              descPos={Position.bot}
            />
          </div>
        </form>
      </div>

      <div className="flex flex-col justify-center items-center text-center transform translate-y-18.75">
        <p className="z-10 italic text-sm transform -translate-y-6.25">
          an engineer who <span className="font-bold">sees</span> the big
          picture and the small details!
        </p>
        <EyeFollows size={150} />
      </div>
    </div>
  );
};
