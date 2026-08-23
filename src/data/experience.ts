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
      "Developed Python solutions for data processing, database recovery, validation, and automation tasks using SQLite, JSON, and structured datasets.",
      "Evaluated multimodal AI model outputs across image, video, document, and reasoning tasks, identifying instruction-following failures, reasoning errors, and data quality issues.",
      "Designed and executed tests to verify solution correctness, edge cases, and expected outputs before submission.",
      "Applied detailed evaluation rubrics to compare model responses and produce technical justifications for AI model benchmarking and quality assurance.",
    ],
    skills: [
      "Python",
      "SQLite",
      "JSON",
      "AI Evaluation",
      "Data Processing",
      "Testing",
    ],
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
      "Prepared monthly and annual expense reports for individual and business clients, organizing financial information into clear and accurate records.",
      "Entered, categorized, and maintained 50+ financial transactions and records each month using Microsoft Excel.",
      "Reviewed financial records for missing, incorrect, or inconsistent information before reports were finalized.",
      "Organized and validated client expense data to maintain accurate and consistent financial records.",
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
    bullets: [
      "Pursuing a Master of Science in Computer Science with interests in artificial intelligence, computer vision, graphics, and machine learning.",
    ],
    skills: [
      "Computer Science",
      "Artificial Intelligence",
      "Computer Vision",
      "Machine Learning",
      "Systems",
    ],
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
      "Mentored more than 100 students across Computer Organization, Computer Systems, and Comparative Languages courses.",
      "Hosted office hours and provided one-on-one debugging support for programming assignments involving C, x86 assembly, RISC-V, Rust, and Haskell.",
      "Helped students troubleshoot low-level programming, memory, assembly, systems, and programming-language concepts.",
      "Facilitated online course discussions and answered technical questions to reinforce concepts outside the classroom.",
    ],
    skills: [
      "C",
      "x86",
      "RISC-V",
      "Rust",
      "Haskell",
      "Debugging",
      "Mentoring",
    ],
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
      "Contributed to the development and maintenance of a cyber-threat intelligence platform using Java and containerized services.",
      "Diagnosed and resolved CI/CD build failures involving Maven and JUnit, improving build reliability and reducing deployment friction.",
      "Resolved more than 100 dependency vulnerabilities by identifying outdated packages and upgrading affected dependencies.",
      "Supported the migration of Apache Kafka from ZooKeeper-based coordination to KRaft, removing legacy configuration and validating the updated deployment.",
      "Worked with Docker and Docker Compose to configure, test, and troubleshoot services across the development environment.",
    ],
    skills: [
      "Java",
      "Maven",
      "JUnit",
      "Docker",
      "Docker Compose",
      "Apache Kafka",
      "GitLab CI/CD",
    ],
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
      "Developed a robotic system designed to automate trash collection in rural environments.",
      "Built Python and ROS components for robot control, sensor integration, and autonomous operation.",
      "Integrated computer vision and hardware components using OpenCV and Raspberry Pi for environmental perception and remote monitoring.",
      "Researched navigation, obstacle avoidance, and path-planning approaches to improve autonomous operation and reliability.",
    ],
    skills: [
      "Python",
      "ROS",
      "OpenCV",
      "Raspberry Pi",
      "Robotics",
      "Computer Vision",
    ],
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
      "Developed a low-cost smart-home research toolkit using Raspberry Pi, Arduino, and connected sensors.",
      "Integrated RFID-based components for identifying and interacting with objects in the smart-home environment.",
      "Built a Swift mobile application for remote device control and real-time monitoring.",
      "Connected physical hardware with the mobile interface to support experimentation with accessible smart-home technologies.",
    ],
    skills: [
      "Swift",
      "Arduino",
      "Raspberry Pi",
      "RFID",
      "Xcode",
      "IoT",
    ],
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
      "Developed and improved production-facing web interfaces using HTML, CSS, JavaScript, and Alpine.js.",
      "Modernized existing Alpine.js components and fixed front-end issues across existing pages.",
      "Improved search, button, layout, and page interactions to create a more consistent user experience.",
      "Built Playwright automated tests to verify important user flows and prevent regressions after interface changes.",
    ],
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Alpine.js",
      "Playwright",
      "Frontend Development",
    ],
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
      "Completed coursework in data structures and algorithms, artificial intelligence, databases, web development, computer graphics, networks, and computer systems.",
      "Earned Dean's List recognition across multiple semesters while completing research, teaching, internship, and software engineering experiences.",
    ],
    skills: [
      "Algorithms",
      "Artificial Intelligence",
      "Databases",
      "Computer Systems",
      "Software Engineering",
    ],
  },

  {
    start: "Jun 2021",
    end: "Aug 2021",
    title: "Team Member",
    company: "Taco Bell",
    location: "Chantilly, VA",
    type: "Part-time",
    link: "https://www.tacobell.com/",
    bullets: [
      "Served more than 100 customers per day while meeting a two-minute drive-through service target in a fast-paced environment.",
      "Collaborated with team members to maintain efficient service during high-volume periods.",
      "Developed early experience in customer service, communication, teamwork, and working under time constraints.",
    ],
    skills: [
      "Customer Service",
      "Communication",
      "Teamwork",
    ],
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
    skills: [
      "Mathematics",
      "Computer Science",
      "Esports",
    ],
  },
];
