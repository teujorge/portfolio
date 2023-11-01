"use client";

export const ButtonToProjects = () => {
  return (
    <button
      onClick={() =>
        document
          .getElementById("projects-section")
          ?.scrollIntoView({ behavior: "smooth" })
      }
      className="mt-5"
    >
      View Projects
    </button>
  );
};
