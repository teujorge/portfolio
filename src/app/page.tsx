import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/projects/Projects";
import { WindowSizeProvider } from "../contexts/WindowSize";
import { IWasHere } from "@/components/i-was-here/IWasHere";

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
