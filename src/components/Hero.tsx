import Image from "next/image";
import HeroImage from "~/public/images/hero.png";

export const Hero = () => {
  return (
    <div className="section w-full min-h-screen flex flex-col lg:flex-row items-center justify-center">
      <Image
        src={HeroImage}
        alt="Matheus Jorge"
        className="max-w-[80%] sm:max-w-[60%] lg:max-w-[30%]"
      />
      <h1>Matheus Jorge</h1>
    </div>
  );
};
