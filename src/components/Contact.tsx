import { Position } from "@/utils/position";
import { SvgEnvelope } from "~/public/svg/envelope";
import EyeFollows from "./EyeFollows";
import { IconButton } from "./IconButton";

export const Contact = () => {
  const INPUT_STYLES =
    "reveal w-full bg-[var(--background-color)] outline-none border border-transparent rounded-[var(--border-radius)] mt-1.5 mb-2.5 px-3.5 py-2.5 focus:border-[var(--primary-color)]";
  const LABEL_STYLES = "reveal mt-2.5 ml-2.5 w-full";

  return (
    <div id="contact-me" className="section mb-0 pb-0 overflow-hidden">
      <h2>Get In Touch</h2>

      <form
        className="reveal flex flex-col items-center justify-center w-full max-w-md m-4 p-4 md:p-8 rounded-[var(--border-radius)] bg-[var(--off-background-color)] shadow-md"
        action="https://api.web3forms.com/submit"
        method="POST"
      >
        <input
          type="hidden"
          name="access_key"
          value={process.env.NEXT_PUBLIC_CONTACT_FORM_ACCESS_KEY}
        />

        <input
          type="hidden"
          name="redirect"
          value={`https://mjorge.me/email-success`}
        />

        <input
          type="hidden"
          name="subject"
          value="New Submission from Web3Forms"
        />

        <label className={LABEL_STYLES} htmlFor="name">
          Name:
        </label>
        <input className={INPUT_STYLES} type="name" name="name" required />

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
          <button className="reveal px-4" type="submit">
            Send
          </button>

          <input type="checkbox" name="botcheck" className="hidden" />

          <IconButton
            href={"mailto:mrljorge@outlook.com"}
            src={<SvgEnvelope className="w-6 h-6" />}
            desc="Email App"
            descPos={Position.bot}
          />
        </div>
      </form>

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
