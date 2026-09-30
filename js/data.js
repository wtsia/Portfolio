/**
 * Winston Tsia - Portfolio & Systems Engineering Data
 * Single Source of Truth
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Winston Tsia",
    preferredName: "Winston",
    tagline: "Securing IT infrastructure one server at a time.",
    title: "IT/Cybersecurity Professional",
    summary: "Versatile IT/Software professional with a strong foundation in Java, Python, and JavaScript development. I thrive during emergencies, but am even better at preventing one. Leveraging development, IT operations, and cybersecurity skills to protect digital assets and drive innovation. With a background in Computer Science and Mathematics, I bring an analytical, problem-solving mindset to infrastructure engineering, proactive threat mitigation, and software architecture.",
    backgroundNote: "Background in Computer Science & Mathematics with a focus on systems architecture, defensive operations, and algorithmic modeling.",
    contact: {
      website: "https://winstontsia.dev",
      linkedin: "https://www.linkedin.com/in/winstontsia",
      github: "https://github.com/wtsia",
      gitlab: "https://gitlab.com/wtsia",
      mastodon: "https://defcon.social/@wtsia",
      blog: "https://wtsia.github.io/rover/"
    },
    metrics: [
      { label: "Defensive SecOps", value: "Threat Detection" },
      { label: "Infrastructure", value: "Homelab & Proxmox" },
      { label: "Systems & Scripting", value: "Python & Automation" }
    ]
  },

  skillsResume: [
    {
      category: "Cyber Fusion & Security Operations",
      description: "Defensive SecOps, telemetry correlation, and threat remediation.",
      skills: [
        "Incident Response",
        "Vulnerability Management (runZero)",
        "EDR (Endpoint Detection and Response)",
        "SIEM & Log Analysis",
        "MITRE ATT&CK Framework",
        "Risk Management",
        "Threat Identification"
      ]
    },
    {
      category: "Reporting & Automation",
      description: "Scripting, metrics aggregation, data pipelines, and technical analysis.",
      skills: [
        "Python",
        "SQL",
        "PowerShell",
        "Bash",
        "RESTful APIs",
        "JSON",
        "Data Visualization (Metrics & Trend Analysis)",
        "Technical Reporting"
      ]
    },
    {
      category: "Cloud, Architecture & Systems",
      description: "Enterprise cloud platforms, identity hygiene, and governance standards.",
      skills: [
        "Microsoft Azure",
        "Microsoft 365",
        "Identity & Access Management (IAM)",
        "Playbook & Runbook Development",
        "Standard Operating Procedures (SOPs)",
        "Network Segmentation"
      ]
    }
  ],

  certifications: [
    {
      id: "secplus",
      name: "Security+",
      issuer: "CompTIA",
      badge: "assets/certifications/secplus.png",
      validity: "Issued 2026 · Expires 2029",
      description: "Global cybersecurity credential establishing core operational capabilities: threat analysis, vulnerability mitigation, identity and access management, and infrastructure protection.",
      domains: ["SecOps", "Threat Detection", "Identity Management", "Cryptography"]
    },
    {
      id: "az900",
      name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
      issuer: "Microsoft",
      badge: "assets/certifications/az900.png",
      validity: "Issued 2025",
      description: "Foundational cloud computing architecture, security, privacy, compliance, and core Azure cloud services.",
      domains: ["Cloud Architecture", "Azure Services", "IAM & Compliance", "Cloud Security"]
    },
    {
      id: "isc2cc",
      name: "Certified in Cybersecurity (CC)",
      issuer: "ISC2",
      badge: "assets/certifications/isc2cc.png",
      validity: "Issued 2024 · Expires 2027",
      description: "Fundamental principles of information security, incident response, network security concepts, and business continuity.",
      domains: ["Security Principles", "Incident Response", "Network Security", "BC/DR"]
    },
    {
      id: "csm-java",
      name: "Certificate in Java Programming",
      issuer: "College of San Mateo",
      badge: "assets/certifications/csmSeal.png",
      validity: "Issued 2024",
      description: "Object-oriented programming, data structures, algorithms, modular application design, and deterministic problem-solving in Java.",
      domains: ["Java", "OOP", "Data Structures", "Algorithms"]
    },
    {
      id: "csm-cs",
      name: "Certificate in Computer Science Applications and Development",
      issuer: "College of San Mateo",
      badge: "assets/certifications/csmSeal.png",
      validity: "Issued 2024",
      description: "Comprehensive software engineering, relational database modeling, systems programming, and modern application development lifecycles.",
      domains: ["Software Engineering", "Systems Architecture", "Database Modeling"]
    }
  ],

  activePursuits: [
    {
      title: "CompTIA CySA+ Certification",
      status: "In Progress",
      description: "Advancing expertise in cybersecurity analytics, intrusion detection, and proactive threat hunting to complement the existing Security+ credential."
    },
    {
      title: "Digital Forensics & Incident Response (DFIR)",
      status: "Active Research",
      description: "Expanding knowledge in forensic artifact analysis, threat mitigation, and incident management through specialized training and industry summits."
    }
  ],

  projectsAndDevelopment: [
    {
      id: "homelab",
      title: "IT & System Administration Lab (Homelab)",
      category: "Infrastructure & Threat Detection",
      period: "Self-Directed",
      description: "Administration of a Proxmox VE cluster. Administered a Proxmox VE cluster and configured Suricata IDS/IPS, evaluating security alerts, identifying trend outliers, and simulating enterprise SIEM alert categorization.",
      highlights: [
        "Administered high-availability Proxmox VE cluster hosting isolated virtual machines and containers",
        "Configured Suricata IDS/IPS packet inspection engine to capture network intrusions and anomalies",
        "Evaluated security alerts, identified telemetry trend outliers, and simulated enterprise SIEM alert categorization"
      ],
      techStack: ["Proxmox VE", "Suricata IDS/IPS", "Linux", "SIEM Alert Simulation", "Network Telemetry"],
      featured: true
    },
    {
      id: "uscc",
      title: "US Cyber Challenge Camp Participant",
      category: "Professional Development",
      period: "Hands-on CTF Event",
      description: "Participant in intensive cyber defense camp. Gained hands-on experience with OS and mobile forensics, malware analysis, and offensive security concepts during a fast-paced Capture the Flag (CTF) event.",
      highlights: [
        "Executed disk and memory forensic investigations on operating systems and mobile devices",
        "Performed static and dynamic malware artifact analysis during security exercises",
        "Competed in multi-stage Capture the Flag (CTF) challenges covering penetration testing and cryptography"
      ],
      techStack: ["OS Forensics", "Mobile Forensics", "Malware Analysis", "Offensive Concepts", "CTF"],
      featured: true
    },
    {
      id: "network-analyzer",
      title: "Network Topology & Shortest-Path Optimization Engine",
      category: "Algorithms & Networking",
      period: "Engineering Case Study",
      description: "High-performance graph engine modeling computer network communication. Implements shortest-path routing, priority queues, and network partitioning benchmarks using Dijkstra's algorithm and balanced trees.",
      highlights: [
        "Modeled multi-hop network traffic loads with optimized algorithmic complexity",
        "Implemented graph traversal and shortest-path computation with Dijkstra's algorithm",
        "Evaluated bottleneck analysis and fault-tolerant topologies with extensive benchmark reporting"
      ],
      techStack: ["Java", "Data Structures", "Dijkstra's Algorithm", "Graph Theory", "Performance Benchmarking"],
      codeUrl: "https://github.com/wtsia/network-graph",
      reportUrl: "https://github.com/wtsia/network-graph/blob/main/NetworkGraphReport.pdf",
      featured: true
    },
    {
      id: "battlesoft",
      title: "BattleSoft: Real-Time Tactical Browser Game",
      category: "Web Development",
      period: "Browser Game",
      description: "A real-time tactical browser game written in vanilla JavaScript with a discrete state machine loop, modular entity component architecture, zero external dependencies, and real-time collision detection.",
      highlights: [
        "Pure modular state manager with zero third-party framework overhead",
        "Deterministic collision handling and responsive event dispatching"
      ],
      techStack: ["JavaScript", "HTML5", "CSS3", "State Machine", "DOM Architecture"],
      codeUrl: "https://github.com/wtsia/BattleSoft",
      liveUrl: "https://wtsia.github.io/BattleSoft/",
      featured: false
    },
    {
      id: "json-quizzer",
      title: "Schema-Driven Knowledge Assessment Engine (JSON Quizzer)",
      category: "Data Validation & UI",
      period: "Application Development",
      description: "Platform that ingests arbitrary structured JSON assessment schemas into an interactive, timed multi-stage testing suite with client-side validation and state persistence.",
      highlights: [
        "Constructed schema ingestion pipeline with error isolation and schema fallback",
        "Integrated client-side state preservation and dynamic scoring metrics"
      ],
      techStack: ["JavaScript", "JSON", "Local Storage", "HTML5", "CSS3"],
      codeUrl: "https://github.com/wtsia/JSONLocalQuizzer",
      liveUrl: "https://wtsia.github.io/JSONLocalQuizzer/",
      featured: false
    }
  ],

  digitalGarden: {
    blogUrl: "https://wtsia.github.io/rover/",
    engine: "Quartz v5",
    title: "Field Notes & Technical Garden (Rover)",
    subtitle: "Public knowledge base and technical essays syndicated directly from my Quartz v5 digital garden.",
    fallbackPosts: [
      {
        title: "Building a Simulated Security Operations Center",
        link: "https://wtsia.github.io/rover/posts/building-a-simulated-security-operations-center",
        pubDate: "2026-09-27",
        description: "A comprehensive homelab project implementing the Elastic Stack SIEM: foundational log management, telemetry ingestion, and proactive threat detection.",
        tags: ["SIEM & SOC", "Homelab & Proxmox"],
        readingTime: "6 min read"
      },
      {
        title: "Administering Active Directory Domain Services",
        link: "https://wtsia.github.io/rover/posts/administering-active-directory-domain-services",
        pubDate: "2026-09-27",
        description: "Core practices for enterprise Active Directory administration, user/group permission hierarchies, Kerberos authentication, and directory security hygiene.",
        tags: ["Active Directory", "Windows Server"],
        readingTime: "5 min read"
      },
      {
        title: "Deploying A Proxmox VE Server for Homelab Virtualization",
        link: "https://wtsia.github.io/rover/posts/deploying-a-proxmox-ve-server",
        pubDate: "2026-09-27",
        description: "Transforming bare-metal hardware into an enterprise hypervisor using Proxmox VE, bridge networking, ZFS storage pools, and isolated guest VMs.",
        tags: ["Homelab & Proxmox", "Linux"],
        readingTime: "5 min read"
      },
      {
        title: "Deploying Windows Server 2025 On Proxmox VE",
        link: "https://wtsia.github.io/rover/posts/deploying-windows-server-2025-on-proxmox-ve",
        pubDate: "2026-09-27",
        description: "Step-by-step technical guide on deploying Windows Server 2025 on Proxmox VE with VirtIO storage driver integration and virtual disk optimization.",
        tags: ["Windows Server", "Homelab & Proxmox"],
        readingTime: "4 min read"
      }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
