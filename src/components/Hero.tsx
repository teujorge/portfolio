import Image from "next/image";
import HeroImage from "~/public/images/me/tennis-close.webp";

export const Hero = () => {
  return (
    <div className="section w-full min-h-screen flex flex-col lg:flex-row items-center justify-center">
      <Image
        priority
        src={HeroImage}
        alt="Matheus Jorge"
        className="max-w-[80%] sm:max-w-[60%] lg:max-w-[30%] rounded-full"
      />
      <h1>Matheus Jorge</h1>
    </div>
  );
};
