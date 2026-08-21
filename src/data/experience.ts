export type ExperienceKind =
  | "Education"
  | "Leadership"
  | "Co-op"
  | "Research"
  | "Internship"
  | "Contract"
  | "Part-time";

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
    start: "May 2026",
    end: "Aug 2026",
    title: "AI Technical Contributor",
    company: "Handshake AI Fellowship",
    location: "Remote",
    type: "Contract",
    link: "https://joinhandshake.com/",
    bullets: [
      "Developed Python solutions for data processing, database recovery, and validation challenges using SQLite, JSON, and automation pipelines while ensuring correctness through comprehensive testing.",
      "Evaluated multimodal AI model outputs across image, video, and document understanding tasks, identifying reasoning errors, instruction-following failures, and data quality issues.",
      "Applied detailed evaluation guidelines to produce high-quality annotations and technical justifications, contributing to AI model benchmarking and quality assurance.",
    ],
    skills: ["Python", "SQLite", "JSON", "AI Evaluation", "Testing"],
  },
  {
    start: "Jan 2026",
    end: "Apr 2026",
    title: "Accounting Assistant",
    company: "Eden Financial & Accounting Services",
    location: "Falls Church, VA",
    type: "Part-time",
    link: "https://edencenter.com/stores/eden-financial-accounting-services/",
    bullets: [
      "Prepared monthly and annual expense reports for business and individual clients, improving record accuracy.",
      "Entered and categorized more than 50 financial records per month for clients using Excel.",
      "Reviewed and validated all team data entries, reducing errors and ensuring accurate financial records.",
    ],
    skills: [
      "Microsoft Excel",
      "Data Entry",
      "Financial Reporting",
      "Quality Assurance",
    ],
  },
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
    type: "Part-time",
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
    link: "https://idpro.icat.vt.edu/",
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
    link: "https://idpro.icat.vt.edu/",
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
  {
    start: "Jun 2021",
    end: "Aug 2021",
    title: "Member",
    company: "Taco Bell",
    location: "Chantilly, VA · On-site",
    type: "Part-time",
    link: "https://www.tacobell.com/",
    bullets: [
      "Greeted more than 100 customers daily and communicated effectively to provide excellent service.",
      "Maintained a friendly environment for employees and customers while supporting additional restaurant responsibilities.",
    ],
    skills: ["Customer Service", "Communication", "Teamwork"],
  },
  {
    start: "Aug 2017",
    end: "Jun 2021",
    title: "Advanced Studies Diploma",
    company: "Centreville High School",
    location: "Clifton, VA",
    type: "Education",
    link: "https://centrevillehs.fcps.edu/",
    bullets: [
      "Participated in Math Honor Society, Computer Science Honor Society, and Centreville Esports.",
    ],
    skills: ["Mathematics", "Computer Science", "Esports"],
  },
];
