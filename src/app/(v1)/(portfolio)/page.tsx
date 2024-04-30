import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Projects } from "@/components/projects/Projects";
import { IWasHere } from "@/components/i-was-here/IWasHere";
import { WindowSizeProvider } from "../../../contexts/WindowSize";

export default function Home() {
  return (
    <main>
      <Hero />
      <WindowSizeProvider>
        <Projects />
      </WindowSizeProvider>
      <About />
      <IWasHere />
      <Contact />
    </main>
  );
}
