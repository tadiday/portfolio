export type ProjectCategory =
  | "Web application"
  | "Mobile application"
  | "Experiment";

export type ProjectIcon = "folder" | "globe" | "gauge" | "receipt";

export type ProjectItem = {
  title: string;
  date: string;
  category: ProjectCategory;
  kind: string;
  role: string;
  description: string;
  tech: readonly string[];
  features: readonly string[];
  challenge: string;
  learning: string;
  github: string;
  website: string;
  preview: string;
  icon: ProjectIcon;
};

export const projects: readonly ProjectItem[] = [
  {
    title: "The Odd One",
    date: "2026",
    category: "Web application",
    kind: "Personal project",
    role: "Full-stack developer",
    description:
      "A real-time multiplayer party game where players answer prompts and try to find the imposter.",
    tech: ["Vue 3", "TypeScript", "Node.js", "WebSockets", "Tailwind"],
    features: [
      "Real-time multiplayer rooms",
      "Multiple game phases and voting",
      "Randomized roles and room settings",
    ],
    challenge:
      "Keeping every player synchronized through reconnects and rapid game-state changes.",
    learning: "Designing event-driven systems and predictable multiplayer state.",
    github: "",
    website: "",
    preview: "",
    icon: "folder",
  },
  {
    title: "Web Portfolio",
    date: "2025",
    category: "Web application",
    kind: "Personal project",
    role: "Designer & developer",
    description:
      "A responsive portfolio built to showcase projects, experience, and research through a focused interactive interface.",
    tech: ["React.js", "TypeScript", "Next.js", "Tailwind", "Motion"],
    features: [
      "Responsive section layouts",
      "Interactive project presentation",
      "Motion and technical UI details",
    ],
    challenge:
      "Balancing expressive visuals with performance, accessibility, and responsive behavior.",
    learning:
      "Building a consistent design system and reusable component architecture.",
    github: "https://github.com/tadiday/Website-Portfolio",
    website: "https://peter-cao.com",
    preview: "/assets/gif/webport.mp4",
    icon: "globe",
  },
  {
    title: "Traffic Dashboard",
    date: "2025",
    category: "Web application",
    kind: "Academic project",
    role: "Full-stack developer",
    description:
      "An interactive traffic visualization dashboard with authentication, data uploads, and dynamic environment displays.",
    tech: ["React.js", "Node.js", "Express", "MySQL", "Chart.js"],
    features: [
      "Secure user authentication",
      "Traffic-data upload workflow",
      "Interactive charts and environments",
    ],
    challenge:
      "Transforming complex simulation output into clear, responsive visualizations.",
    learning:
      "Data visualization, API design, and performance-focused rendering.",
    github: "https://github.com/tadiday/Traffic_Dashboard",
    website: "",
    preview: "/assets/gif/traffic.mp4",
    icon: "gauge",
  },
  {
    title: "Simplisplit",
    date: "2024",
    category: "Mobile application",
    kind: "Product project",
    role: "Mobile developer",
    description:
      "A mobile app that scans bills and helps groups split costs with friends quickly and accurately.",
    tech: ["React Native", "Python", "Flask", "Tailwind"],
    features: [
      "Receipt scanning workflow",
      "Itemized group splitting",
      "Mobile-first interaction design",
    ],
    challenge:
      "Turning imperfect receipt data into a simple and understandable splitting flow.",
    learning: "Mobile UX, API integration, and resilient input handling.",
    github: "",
    website: "",
    preview: "/assets/gif/simplisplit.mp4",
    icon: "receipt",
  },
];

export const archivedProjects = [
  {
    title: "eCommerce Website",
    year: "2024",
    category: "Web application",
    href: "https://github.com/tadiday/eCommerce-Website",
  },
  {
    title: "Todo List",
    year: "2023",
    category: "Web application",
    href: "https://github.com/tadiday/Todo-List",
  },
  {
    title: "Predict Bullying Model",
    year: "2023",
    category: "Machine learning",
    href: "https://github.com/tadiday/Predict-Bullying-Model",
  },
  {
    title: "Food Swipe",
    year: "2022",
    category: "Experiment",
    href: "https://github.com/tadiday/Food-Swipe",
  },
] as const;
