export type ExperienceKind = "Education" | "Leadership" | "Co-op" | "Research" | "Internship";

export type ExperienceItem = {
  start: string;
  end: string;
  title: string;
  company: string;
  location: string;
  type: ExperienceKind;
  link: string;
  bullets: readonly string[];
  skills: readonly string[];
};

export const experiences: readonly ExperienceItem[] = [
  {
    start: "Jan 2026",
    end: "Present",
    title: "M.S. in Computer Science",
    company: "George Mason University",
    location: "Fairfax, VA",
    type: "Education",
    link: "https://cs.gmu.edu/",
    bullets: ["Currently pursuing a Master of Science in Computer Science."],
    skills: ["Computer Science"],
  },
  {
    start: "May 2023",
    end: "May 2025",
    title: "Undergraduate Teaching Assistant",
    company: "Virginia Tech · CS Department",
    location: "Blacksburg, VA",
    type: "Leadership",
    link: "https://cs.vt.edu/",
    bullets: [
      "Hosted office hours, troubleshot technical issues, and provided personalized guidance to students.",
      "Supported Computer Organization, Computer Systems, and Comparative Languages courses.",
      "Facilitated online discussions to strengthen student engagement and understanding.",
    ],
    skills: ["C", "x86", "RISC-V", "Rust", "Haskell"],
  },
  {
    start: "Aug 2024",
    end: "Dec 2024",
    title: "Software Engineer Co-op",
    company: "Peraton",
    location: "Blacksburg, VA",
    type: "Co-op",
    link: "https://www.peraton.com/",
    bullets: [
      "Contributed to the development and maintenance of a cyber-threat intelligence platform.",
      "Improved build processes, resolved issues, and updated dependencies to strengthen reliability.",
      "Collaborated across teams to document and deliver secure functionality improvements.",
    ],
    skills: ["Java", "JavaScript", "Maven", "JUnit", "Docker"],
  },
  {
    start: "Jan 2024",
    end: "Dec 2024",
    title: "Rural Trash Collection",
    company: "Virginia Tech · IDPro",
    location: "Blacksburg, VA",
    type: "Research",
    link: "https://idpro.enge.vt.edu/",
    bullets: [
      "Developed an automated trash collection robot with remote monitoring and operation.",
      "Integrated sensors for autonomous navigation, obstacle avoidance, and safe collection.",
      "Researched path-planning algorithms to improve functionality and reliability.",
    ],
    skills: ["Python", "ROS", "OpenCV", "Raspberry Pi"],
  },
  {
    start: "Sep 2023",
    end: "Dec 2023",
    title: "SMART Research",
    company: "Virginia Tech · IDPro",
    location: "Blacksburg, VA",
    type: "Research",
    link: "https://idpro.enge.vt.edu/",
    bullets: [
      "Designed a Raspberry Pi and Arduino residential toolkit for home automation.",
      "Built a Swift mobile application for remote control and real-time device monitoring.",
    ],
    skills: ["Swift", "Arduino", "Raspberry Pi", "Xcode"],
  },
  {
    start: "Sep 2023",
    end: "Nov 2023",
    title: "Frontend Developer Intern",
    company: "Card Isle",
    location: "Blacksburg, VA",
    type: "Internship",
    link: "https://cardisle.com/",
    bullets: [
      "Added website features and improved interface layouts for a more engaging experience.",
      "Redesigned search, button, and page interactions using Alpine.js.",
      "Built Playwright tests to verify functionality and reliability.",
    ],
    skills: ["Alpine.js", "Playwright", "Node.js", "CSS"],
  },
  {
    start: "Aug 2021",
    end: "May 2025",
    title: "B.S. in Computer Science",
    company: "Virginia Tech",
    location: "Blacksburg, VA",
    type: "Education",
    link: "https://cs.vt.edu/",
    bullets: [
      "Studied algorithms, artificial intelligence, databases, web development, graphics, networks, and computer systems.",
      "Earned Dean’s List recognition and Virginia Tech merit-based scholarships.",
    ],
    skills: ["Algorithms", "AI", "Databases", "Systems"],
  },
];
