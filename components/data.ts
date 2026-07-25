// Siraj Haider Portfolio Data
export const personalInfo = {
  name: "Siraj Haider",
  title: "Electrical Engineer (Computer Engineering)",
  education: "BS Computer Engineering at FAST-NUCES Karachi (Graduating June 2026)",
  bio: "Passionate about low-level programming, embedded systems, industrial PLCs, IoT, and DevOps. Building real-world solutions with strong commitment to leadership and mentoring.",
  location: "Karachi, Pakistan",
  email: "sirajhaider880@gmail.com",
  phone: "+92-3263981248"
};

export const experience = [
  {
    role: "Engineering Intern",
    company: "DG Cement Company — Hub, Baluchistan",
    period: "Jun – Aug 2025",
    details: [
      "Rotated through 3 departments to understand end-to-end plant operations from raw material intake to final dispatch.",
      "Monitored PLCs within the plant's Distributed Control System (DCS) to track and optimize 10-12 automated control loops.",
      "Collaborated with 20+ senior engineers to design, wire, and install 1 fully functional PLC panel from schematic review through to testing."
    ]
  },
  {
    role: "Teaching Assistant",
    company: "FAST-NUCES, Karachi",
    period: "2024 – 2025",
    details: [
      "Assisted faculty in 14 weekly lab sessions; graded assignments for 40+ students with detailed feedback and mentored them through challenging coursework."
    ]
  },
  {
    role: "Volunteer Teacher",
    company: "TCF School (NGO)",
    period: "2023 – 2024",
    details: [
      "Taught core subjects to a classroom of 50+ underprivileged children and created practical teaching materials for resource-limited settings."
    ]
  }
];

export const projects = [
  {
    title: "Public Transport IoT Tracker (FYP)",
    subtitle: "Real-time fleet management with LoRa + GPS + Web Dashboard",
    category: "embedded",
    description: "A LoRa-based GPS tracking device built in collaboration with Think Transport for real-time public bus fleet monitoring. The system streams GPS coordinates over a LoRa mesh network to a central server and displays live routes on a React dashboard.",
    architecture: "Hardware: ATmega32 MCU + NEO-6M GPS + LoRa SX1276 radio. Firmware written in C. Cloud gateway aggregates packets via MQTT → Node.js backend → PostgreSQL. React frontend with Leaflet.js map visualization.",
    features: [
      "Real-time GPS coordinates over LoRa mesh",
      "Sub-3s location update latency",
      "React + Leaflet.js web dashboard",
      "MQTT → Node.js data pipeline",
      "Battery-optimized firmware duty cycling",
      "Historical route replay feature",
    ],
    tags: ["C", "ATmega32", "LoRa", "GPS", "MQTT", "Node.js", "React", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "https://github.com/Sirajhaider121",
    accentColor: "#00f0ff",
    metrics: "Live tracking across 5 bus routes",
  },
  {
    title: "Custom Mini OS",
    subtitle: "Bare-metal OS written in C from scratch",
    category: "software",
    description: "A bare-metal operating system kernel built entirely in C and x86 Assembly, featuring a custom bootloader, memory manager with paging, a round-robin process scheduler, and a basic VGA text-mode shell.",
    architecture: "x86 Assembly bootloader → C kernel entry. Segmentation + paging memory model. Round-robin scheduler with context switching via interrupt 0x20. Simple FAT12 filesystem reader. VGA text mode driver.",
    features: [
      "Custom x86 bootloader in Assembly",
      "Memory manager with paging support",
      "Round-robin process scheduler",
      "Interrupt-driven I/O handler",
      "VGA text mode shell & keyboard driver",
      "FAT12 filesystem read support",
    ],
    tags: ["C", "x86 Assembly", "OS Development", "Memory Management", "Kernel"],
    liveUrl: "#",
    githubUrl: "https://github.com/Sirajhaider121",
    accentColor: "#7000ff",
    metrics: "Boots in < 1s, supports 8 concurrent processes",
  },
  {
    title: "Dockerized Web Application",
    subtitle: "Full-stack app containerized end-to-end with Docker Compose",
    category: "web",
    description: "Containerized a full-stack web application using Docker and Docker Compose for environment-agnostic, one-command deployment. The setup includes a React frontend, Node.js API, and PostgreSQL database all orchestrated via Compose.",
    architecture: "Docker Compose with 3 services: React (Nginx), Node.js Express API, PostgreSQL DB. Persistent volumes for DB data. Environment-specific .env injection. Health checks and restart policies for production resilience.",
    features: [
      "One-command docker compose up deployment",
      "Nginx reverse proxy for React frontend",
      "Environment variable injection via .env",
      "Named volumes for persistent DB storage",
      "Health checks and auto-restart policies",
      "Multi-stage Docker build for minimal image size",
    ],
    tags: ["Docker", "Docker Compose", "Node.js", "React", "PostgreSQL", "Nginx", "DevOps"],
    liveUrl: "#",
    githubUrl: "https://github.com/Sirajhaider121",
    accentColor: "#00ff9d",
    metrics: "Image size reduced by 60% with multi-stage builds",
  },
  {
    title: "Water Turbidity Checker",
    subtitle: "Embedded sensor system with real-time LCD readout",
    category: "embedded",
    description: "An ATmega32-based embedded system that reads a turbidity sensor via ADC and displays live water quality readings on a 16x2 LCD. Useful for field water monitoring without any cloud dependency.",
    architecture: "ATmega32 @ 8MHz. Turbidity sensor output → 10-bit ADC channel. ADC readings mapped to NTU scale. HD44780 LCD driver implemented in C. Threshold-based LED alert system.",
    features: [
      "10-bit ADC turbidity sensor reading",
      "Real-time NTU display on 16x2 LCD",
      "Threshold-based LED alert indicators",
      "Low-power sensor polling loop",
      "Pure C firmware, no RTOS",
    ],
    tags: ["C", "ATmega32", "ADC", "Embedded", "LCD", "Hardware"],
    liveUrl: "#",
    githubUrl: "https://github.com/Sirajhaider121",
    accentColor: "#00f0ff",
    metrics: "±2 NTU measurement accuracy",
  },
  {
    title: "Adaptive Traffic & Parking System",
    subtitle: "C++ simulation of intelligent traffic signal controller",
    category: "software",
    description: "A C++ simulation modelling an adaptive traffic signal controller and a parking space allocator, designed to optimize vehicle throughput at intersections and parking lots under real-world constraint scenarios.",
    architecture: "OOP design with Vehicle, Intersection, and ParkingLot classes. Priority queue for emergency vehicle preemption. State machine for signal phase management. Console visualization of live simulation state.",
    features: [
      "Adaptive signal timing based on queue density",
      "Emergency vehicle preemption via priority queue",
      "Dynamic parking slot allocation algorithm",
      "State machine–driven signal phase transitions",
      "Console-based real-time simulation output",
    ],
    tags: ["C++", "OOP", "Data Structures", "Simulation", "Algorithms"],
    liveUrl: "#",
    githubUrl: "https://github.com/Sirajhaider121",
    accentColor: "#ff007f",
    metrics: "30% simulated throughput improvement vs. fixed-timing",
  },
];


export const skills = [
  { category: "Programming", items: ["C++", "Java", "Python", "MySQL"] },
  { category: "DevOps & Tools", items: ["Docker", "Git", "Linux"] },
  { category: "Embedded Systems", items: ["ATmega32", "LoRa Module", "Microcontroller Programming", "Hardware Interfacing"] },
  { category: "Industrial Automation", items: ["PLC Programming", "DCS Monitoring", "PLC Panel Design & Assembly"] },
  { category: "Soft Skills", items: ["Leadership", "Teamwork", "Technical Documentation", "Critical Thinking", "Time Management"] },
  { category: "Languages", items: ["Urdu (Native)", "English (Professional)"] }
];

export const achievements = [
  "Engineering Internship Certificate (DG Cement)",
  "Markhor Conference (Wilderness leadership program)",
  "Competition Head & Organizer (FAST-NUCES)",
  "Volunteer Teaching Acknowledgement (TCF School)"
];
