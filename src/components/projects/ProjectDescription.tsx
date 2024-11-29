import React, { type JSX } from "react";

type ProjectDescriptionProps = {
  title: string;
  desc: string;
  tech: string[];
  icons: JSX.Element[];
};

export const ProjectDescription = ({
  title,
  desc,
  tech,
  icons,
}: ProjectDescriptionProps) => {
  let technologies = "";

  for (let i = 0; i < tech.length - 1; i++) {
    technologies += tech[i] + " • ";
  }
  technologies += tech[tech.length - 1];

  let iconButtons: JSX.Element[] = [];
  icons.forEach((icon) => iconButtons.push(icon));

  return (
    <div className="reveal flex flex-col justify-center items-center mt-12 w-full lg:m-5 lg:p-5 lg:w-[40vw] lg:min-h-screen">
      <h3 className="my-2.5 text-left">{title}</h3>
      <p className="my-2.5">{technologies}</p>
      <p className="my-2.5">{desc}</p>
      <div className="flex my-2.5 w-[fit-content]">
        {icons.map((icon, index) => (
          <React.Fragment key={index}>{icon}</React.Fragment>
        ))}
      </div>
    </div>
  );
};
