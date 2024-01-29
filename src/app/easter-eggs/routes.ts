type RouteProp = {
  href: string;
  title: string;
  description?: string;
};

type EasterEggRoutesType = {
  [key: string]: RouteProp;
};

export const easterEggRoutes: EasterEggRoutesType = {
  montyHall: {
    href: "/easter-eggs/monty-hall",
    title: "Monty Hall",
    description: "Statistics",
  },
  sierpinskiTriangle: {
    href: "/easter-eggs/sierpinski-triangle",
    title: "Sierpiński's Triangle",
    description: "Fractals",
  },
  snake: {
    href: "/easter-eggs/snake-game",
    title: "Snake Game",
    description: "The classic game",
  },
  boids: {
    href: "/easter-eggs/boids",
    title: "Boids Simulation",
    description: "Swarm simulation",
  },
};
