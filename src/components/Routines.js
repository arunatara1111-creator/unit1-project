// Mock data for the core feature (Daily Missions for Children).
// Steps are grounded in CHADD's "ADHD and School" toolkit:
//  - Morning routine follows their sample time-blocked routine (wake, shower,
//    dress, breakfast, hygiene) and their "prep ahead" advice (pack the night before).
//  - Homework routine follows their homework-station guidance: a defined
//    workspace step, a completion-goal-based work block (not just a timer),
//    and a break — rather than one vague "do homework" step.
//  - Bedtime routine follows their "prep ahead for mornings" advice: laying
//    out clothes and packing the backpack happens the night before, so the
//    morning routine has less friction.
// without changing any component below — that's the point of pulling it out here.

export const initialRoutines = [
    {
      id: "morning",
      name: "Morning launch",
      time: "Morning",
      icon: "sun",
      steps: [
        { id: "m1", label: "Wake up", done: true },
        { id: "m2", label: "Shower", done: true },
        { id: "m3", label: "Get dressed", done: true },
        { id: "m4", label: "Eat breakfast", done: true },
        { id: "m5", label: "Brush teeth", done: false },
      ],
    },
    {
      id: "homework",
      name: "Homework mission",
      time: "Afternoon",
      icon: "book",
      steps: [
        { id: "h1", label: "Set up homework station", done: true },
        { id: "h2", label: "Work until today's goal is done", done: true },
        { id: "h3", label: "Take a break", done: false },
        { id: "h4", label: "Pack backpack for tomorrow", done: false },
      ],
    },
    {
      id: "bedtime",
      name: "Bedtime countdown",
      time: "Evening",
      icon: "moon",
      steps: [
        { id: "b1", label: "Pick out tomorrow's clothes", done: false },
        { id: "b2", label: "Set up the launch pad by the door", done: false },
        { id: "b3", label: "Brush teeth", done: false },
        { id: "b4", label: "Lights out", done: false },
      ],
    },
  ];