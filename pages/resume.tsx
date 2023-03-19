import { useEffect, useState } from "react";

const Resume = () => {
  const [resumeLink, setResumeLink] = useState("");
  useEffect(() => {
    setResumeLink(window.location.origin + "/resume.pdf");
  }, []);

  return (
    <object data={resumeLink} type="application/pdf" width="100%" height="100%">
      <p>
        Alternative text - include a link <a href={resumeLink}>to the PDF!</a>
      </p>
    </object>
  );
};

export default Resume;
