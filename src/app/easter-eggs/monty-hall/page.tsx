import { MontyHallSimulation } from "./components/MontyHallSimulation";

export default function MontyHallProblem() {
  return (
    <main className="flex flex-col items-center justify-center px-10 sm:px-16 w-full lg:w-3/4">
      {/* title */}
      <h2>Monty Hall</h2>
      {/* description */}
      <p>
        The Monty Hall problem is a statistics problem that can be solved using
        a simulation. The problem is as follows:
        <br />
        Suppose you&apos;re on a game show, and you&apos;re given the choice of
        three doors: Behind one door is a car; behind the others, goats. You
        pick a door, say No. 1, and the host, who knows what&apos;s behind the
        doors, opens another door, say No. 3, which has a goat. He then says to
        you, <q>Do you want to pick door No. 2?</q> Is it to your advantage to
        switch your choice? Let&apos;s find out!
      </p>
      <MontyHallSimulation />
    </main>
  );
}
