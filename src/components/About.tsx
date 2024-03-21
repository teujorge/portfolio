import { Education } from "./education/Education";
import { Experience } from "./experience/Experience";
import { IWasHere } from "./i-was-here/IWasHere";

export const About = () => {
  return (
    <div className="section">
      <h2>About Me</h2>

      <p className="pt-3 pb-16">
        Whether I&apos;m designing and building fun games or working on complex
        web apps, I&apos;m constantly pushing myself to develop my software
        skills and take on new challenges. I believe that software engineering
        is more than just a job — it&apos;s a passion. And I&apos;m excited to
        share that passion with you through my portfolio. Explore my projects
        and experiences, and let&apos;s engineer great things together!
      </p>

      <Experience />
      <Education />
    </div>
  );
};
