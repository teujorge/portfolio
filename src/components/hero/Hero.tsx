import { ButtonToProjects } from "./ButtonToProjects";
import { TypeWriter } from "./TypeWriter";

export const Hero = () => {
  return (
    <div className="section flex flex-col justify-center items-center w-full min-h-screen">
      <h1>Matheus Jorge</h1>
      <TypeWriter />
      <div className="mt-20 w-[80%] h-1 rounded-[var(--border-radius)] bg-[var(--primary-color)]" />
      <ButtonToProjects />
    </div>
  );
};
