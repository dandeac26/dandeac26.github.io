export interface Project {
  title: string;
  image: string;
  githubUrl: string;
  categories: string[];
  description?: string;
}

export const projects: Project[] = [
  {
    title: "Diploma App",
    image: "/images/diploma_app_screens.png",
    githubUrl: "https://github.com/dandeac26/diploma_app#readme",
    categories: ["Android", "Kotlin", "Bachelor Thesis", "Mobile"],
    description:
      "Android application for my diploma project interacting with my backend services.",
  },
  {
    title: "Safe Storage",
    image: "/images/SafeStorage.png",
    githubUrl: "https://github.com/dandeac26/SafeStorage#readme",
    categories: [
      "C Threads",
      "WinAPI",
      "CLI",
      "Thread-Synchronization",
      "ThreadPool",
      "Cybersecurity",
      "Buffer Overflow",
      "Path Traversal",
    ],
    description:
      "A secure storage system implementing thread-safe file operations with protection against buffer overflow and path traversal attacks.",
  },
  {
    title: "Mini Operating System",
    image: "/images/printmbr.png",
    githubUrl: "https://github.com/dandeac26/miniOS#readme",
    categories: [
      "OS Dev",
      "C",
      "Interrupts",
      "Paging",
      "x86 Assembly",
      "Memory Management",
    ],
    description:
      "A minimal operating system built from scratch featuring interrupt handling, paging, and memory management.",
  },
  {
    title: "Automotive Internship at AROBS",
    image: "/images/automotive.png",
    githubUrl:
      "https://github.com/dandeac26/ClimatizationSystem-AutomotiveInternship#readme",
    categories: [
      "Automotive",
      "Embedded C",
      "Agile",
      "Autosar",
      "Makefile",
      "CLI",
    ],
    description:
      "Climatization system developed during an automotive internship using AUTOSAR-compliant embedded C.",
  },
  {
    title: "Energy Management System",
    image: "/images/EMSarchitecture.png",
    githubUrl:
      "https://github.com/dandeac26/EnergyManagementSystem-Microservices#readme",
    categories: ["Java", "Python", "React", "Web", "Microservices", "Docker"],
    description:
      "Microservice-based system to manage and track energy consumption across devices.",
  },
  {
    title: "Queue Management Application",
    image: "/images/QMApp.png",
    githubUrl: "https://github.com/dandeac26/Queue-management-system#readme",
    categories: ["Java Threads", "Thread-Synchronization", "Queues", "GUI"],
    description:
      "Multi-threaded queue management simulation with a graphical user interface.",
  },
  {
    title: "Hill Cipher",
    image: "/images/pic02.jpg",
    githubUrl: "https://github.com/dandeac26/hill_cypher#readme",
    categories: ["C++", "Cryptography", "Cybersecurity"],
    description:
      "Hill cipher implementation with 2x2 matrix key encoding/decoding and brute-force attack.",
  },
  {
    title: "Weather Station",
    image: "/images/pic02.jpg",
    githubUrl: "https://github.com/dandeac26/WeatherStation#readme",
    categories: ["C++", "IoT", "ESP8266", "Hardware"],
    description:
      "ESP8266-based weather station with DHT22 sensor for temperature and humidity monitoring.",
  },
  {
    title: "PawBook",
    image: "/images/pic02.jpg",
    githubUrl: "https://github.com/dandeac26/PawBook#readme",
    categories: ["Kotlin", "Android", "Mobile"],
    description: "Android social networking application for pet owners.",
  },
  {
    title: "Bakery Order System",
    image: "/images/pic02.jpg",
    githubUrl: "https://github.com/dandeac26/Bak3ry#readme",
    categories: ["Java", "GUI", "Order Management"],
    description:
      "Order management Java application with graphical user interface.",
  },
];
