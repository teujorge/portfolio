import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/hero/Hero";
import { Projects } from "@/components/projects/Projects";
import { WindowSizeProvider } from "../contexts/WindowSize";

export default function Home() {
  return (
    <main>
      <Hero />
      <WindowSizeProvider>
        <Projects />
      </WindowSizeProvider>
      <About />
      <Contact />
    </main>
  );
}
