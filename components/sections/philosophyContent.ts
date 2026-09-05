export type PhilosophyStatement = {
  number: string;
  title: string;
  body: string;
};

export const philosophyStatements: readonly PhilosophyStatement[] = [
  {
    number: "01",
    title: "START WITH THE IDEA",
    body: "Start with the idea. Understand the problem, the people, and the opportunity before writing the first line of code.",
  },
  {
    number: "02",
    title: "TURN IT INTO A PRODUCT",
    body: "Shape the idea into a product people actually want to use — combining strategy, interface, experience, and technology.",
  },
  {
    number: "03",
    title: "BUILD FOR SCALABILITY",
    body: "Start small without building yourself into a corner. Create foundations that can grow with users, features, and the business.",
  },
  {
    number: "04",
    title: "ENGINEER FOR EVOLUTION",
    body: "Technology changes. Products change. We build software that can adapt, extend, and evolve instead of becoming obsolete.",
  },
  {
    number: "05",
    title: "BUILD THE RELATIONSHIP",
    body: "Launch isn't the finish line. We aim to become a long-term technical partner as the product and business continue to grow.",
  },
];
