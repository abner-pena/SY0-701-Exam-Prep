export const DOMAINS = {
  GENERAL_SECURITY: "General Security Concepts",
  THREATS: "Threats, Vulnerabilities & Mitigations",
  ARCHITECTURE: "Security Architecture",
  OPERATIONS: "Security Operations",
  PROGRAM_MANAGEMENT: "Security Program Management & Oversight",
};

export const questions = [
  // ── GENERAL SECURITY CONCEPTS ──────────────────────────────────────────────
  {
    id: 1,
    domain: DOMAINS.GENERAL_SECURITY,
    question: "Which cryptographic algorithm is considered asymmetric?",
    options: ["AES", "RSA", "3DES", "SHA-256"],
    answer: 1,
    explanation:
      "RSA is an asymmetric algorithm that uses a public/private key pair. AES and 3DES are symmetric; SHA-256 is a hashing algorithm.",
  },
  {
    id: 2,
    domain: DOMAINS.GENERAL_SECURITY,
    question:
      "What does AAA stand for in the context of network security?",
    options: [
      "Authentication, Authorization, Accounting",
      "Access, Authentication, Auditing",
      "Authorization, Accounting, Auditing",
      "Authentication, Access, Accountability",
    ],
    answer: 0,
    explanation:
      "AAA stands for Authentication (verifying identity), Authorization (granting access), and Accounting (tracking activity).",
  },
  {
    id: 3,
    domain: DOMAINS.GENERAL_SECURITY,
    question:
      "Which of the following BEST describes the principle of least privilege?",
    options: [
      "Users should have the maximum permissions needed to complete all possible tasks",
      "Users should have only the minimum permissions required to perform their job",
      "All users should share a single privileged account",
      "Privileges should be assigned based on seniority",
    ],
    answer: 1,
    explanation:
      "Least privilege limits access rights to only what is strictly required, reducing the attack surface.",
  },
  {
    id: 4,
    domain: DOMAINS.GENERAL_SECURITY,
    question: "Which hashing algorithm produces a 256-bit digest?",
    options: ["MD5", "SHA-1", "SHA-256", "SHA-512"],
    answer: 2,
    explanation:
      "SHA-256 produces a 256-bit (32-byte) digest. MD5=128-bit, SHA-1=160-bit, SHA-512=512-bit.",
  },
  {
    id: 5,
    domain: DOMAINS.GENERAL_SECURITY,
    question:
      "What is the primary purpose of a digital certificate?",
    options: [
      "Encrypt data at rest",
      "Bind a public key to an identity",
      "Hash passwords for storage",
      "Provide network address translation",
    ],
    answer: 1,
    explanation:
      "A digital certificate (X.509) binds a public key to an entity's identity, enabling trust in public-key cryptography.",
  },
  {
    id: 6,
    domain: DOMAINS.GENERAL_SECURITY,
    question:
      "Which of the following is an example of multi-factor authentication?",
    options: [
      "Username and password",
      "PIN and security question",
      "Password and fingerprint scan",
      "Two different passwords",
    ],
    answer: 2,
    explanation:
      "MFA combines something you know (password) with something you are (fingerprint). Two knowledge factors don't constitute true MFA.",
  },
  {
    id: 7,
    domain: DOMAINS.GENERAL_SECURITY,
    question:
      "What type of control is a security camera?",
    options: [
      "Preventive",
      "Detective",
      "Corrective",
      "Compensating",
    ],
    answer: 1,
    explanation:
      "A security camera is a detective control — it records and identifies events after they occur but does not prevent them.",
  },
  {
    id: 8,
    domain: DOMAINS.GENERAL_SECURITY,
    question:
      "Which concept ensures that a sender cannot deny having sent a message?",
    options: ["Confidentiality", "Integrity", "Non-repudiation", "Availability"],
    answer: 2,
    explanation:
      "Non-repudiation, often achieved with digital signatures, prevents a party from denying they performed an action.",
  },
  {
    id: 9,
    domain: DOMAINS.GENERAL_SECURITY,
    question: "What does PKI stand for?",
    options: [
      "Public Key Infrastructure",
      "Private Key Interface",
      "Public Key Integration",
      "Protected Key Infrastructure",
    ],
    answer: 0,
    explanation:
      "PKI (Public Key Infrastructure) is the framework of hardware, software, policies, and procedures for managing digital certificates and public-key encryption.",
  },
  {
    id: 10,
    domain: DOMAINS.GENERAL_SECURITY,
    question:
      "Which algorithm is used for key exchange in TLS and does NOT provide authentication?",
    options: ["RSA", "Diffie-Hellman (DH)", "ECDSA", "SHA-256"],
    answer: 1,
    explanation:
      "Diffie-Hellman allows two parties to establish a shared secret over an insecure channel without prior shared secrets, but it does not authenticate the parties.",
  },
  {
    id: 11,
    domain: DOMAINS.GENERAL_SECURITY,
    question: "What is a CRL in the context of PKI?",
    options: [
      "Certificate Revocation List",
      "Cryptographic Reference Library",
      "Central Registration Layer",
      "Certificate Registration Log",
    ],
    answer: 0,
    explanation:
      "A CRL (Certificate Revocation List) is a list of digital certificates that have been revoked by the issuing CA before their expiration date.",
  },
  {
    id: 12,
    domain: DOMAINS.GENERAL_SECURITY,
    question:
      "Which of the following provides the STRONGEST password hashing?",
    options: ["MD5", "SHA-1", "bcrypt", "SHA-256"],
    answer: 2,
    explanation:
      "bcrypt is specifically designed for password hashing — it is slow and includes a salt, making brute-force attacks impractical.",
  },

  // ── THREATS, VULNERABILITIES & MITIGATIONS ─────────────────────────────────
  {
    id: 13,
    domain: DOMAINS.THREATS,
    question:
      "An attacker intercepts communication between two parties and alters the messages. What type of attack is this?",
    options: [
      "Replay attack",
      "Man-in-the-Middle (MitM) attack",
      "Denial of Service (DoS)",
      "SQL injection",
    ],
    answer: 1,
    explanation:
      "A Man-in-the-Middle attack occurs when an attacker secretly intercepts and possibly alters communication between two parties.",
  },
  {
    id: 14,
    domain: DOMAINS.THREATS,
    question:
      "Which social engineering attack involves sending fraudulent emails appearing to come from a trusted source?",
    options: ["Vishing", "Smishing", "Phishing", "Whaling"],
    answer: 2,
    explanation:
      "Phishing uses deceptive emails to trick recipients. Vishing uses voice calls, smishing uses SMS, and whaling targets high-profile executives.",
  },
  {
    id: 15,
    domain: DOMAINS.THREATS,
    question:
      "A zero-day vulnerability is BEST described as:",
    options: [
      "A vulnerability that has been patched for zero days",
      "A vulnerability unknown to the vendor with no available patch",
      "A vulnerability found on day zero of deployment",
      "A vulnerability rated as zero severity",
    ],
    answer: 1,
    explanation:
      "A zero-day vulnerability is one unknown to the software vendor or for which no patch yet exists, leaving systems exposed.",
  },
  {
    id: 16,
    domain: DOMAINS.THREATS,
    question:
      "Which attack type involves flooding a target with traffic to make it unavailable?",
    options: [
      "SQL Injection",
      "Cross-Site Scripting",
      "Distributed Denial of Service (DDoS)",
      "Buffer Overflow",
    ],
    answer: 2,
    explanation:
      "A DDoS attack uses multiple compromised systems to overwhelm a target's resources, denying service to legitimate users.",
  },
  {
    id: 17,
    domain: DOMAINS.THREATS,
    question:
      "What type of malware encrypts a victim's files and demands payment for the decryption key?",
    options: ["Worm", "Ransomware", "Rootkit", "Spyware"],
    answer: 1,
    explanation:
      "Ransomware encrypts files and demands a ransom (often cryptocurrency) for decryption. Notable examples include WannaCry and REvil.",
  },
  {
    id: 18,
    domain: DOMAINS.THREATS,
    question:
      "An attacker injects malicious SQL into an input field to manipulate a backend database. This is called:",
    options: [
      "Cross-Site Scripting (XSS)",
      "SQL Injection",
      "Command Injection",
      "LDAP Injection",
    ],
    answer: 1,
    explanation:
      "SQL injection inserts or 'injects' malicious SQL statements into an entry field, potentially allowing attackers to read, modify, or delete database data.",
  },
  {
    id: 19,
    domain: DOMAINS.THREATS,
    question:
      "Which attack embeds malicious scripts into web pages viewed by other users?",
    options: [
      "SQL Injection",
      "Cross-Site Request Forgery (CSRF)",
      "Cross-Site Scripting (XSS)",
      "Clickjacking",
    ],
    answer: 2,
    explanation:
      "XSS injects client-side scripts into web pages. Stored XSS persists in the database; reflected XSS is in the URL response.",
  },
  {
    id: 20,
    domain: DOMAINS.THREATS,
    question:
      "A threat actor uses a USB drive containing malware and leaves it in a parking lot hoping an employee will plug it in. This is called:",
    options: [
      "Watering hole attack",
      "Tailgating",
      "Baiting",
      "Pretexting",
    ],
    answer: 2,
    explanation:
      "Baiting lures victims with something enticing (a found USB drive) to execute malware. It exploits human curiosity.",
  },
  {
    id: 21,
    domain: DOMAINS.THREATS,
    question:
      "Which of the following BEST describes a supply chain attack?",
    options: [
      "Attacking a company's physical supply warehouse",
      "Compromising software or hardware before it reaches the end user",
      "Intercepting packages sent through postal services",
      "Targeting suppliers via phishing emails",
    ],
    answer: 1,
    explanation:
      "Supply chain attacks compromise software/hardware during development or distribution. The SolarWinds attack is a well-known example.",
  },
  {
    id: 22,
    domain: DOMAINS.THREATS,
    question:
      "What is the term for an attacker who follows an authorized person through a secured door without using their own credentials?",
    options: ["Phishing", "Tailgating", "Piggybacking", "Vishing"],
    answer: 1,
    explanation:
      "Tailgating (also called piggybacking in some contexts) involves following an authorized user through a secured entry point without authentication.",
  },
  {
    id: 23,
    domain: DOMAINS.THREATS,
    question:
      "A vulnerability scanner identifies a flaw that does not actually exist. This is called a:",
    options: [
      "True positive",
      "True negative",
      "False positive",
      "False negative",
    ],
    answer: 2,
    explanation:
      "A false positive is an alert for a condition that does not actually exist. False negatives are missed real vulnerabilities — often considered more dangerous.",
  },
  {
    id: 24,
    domain: DOMAINS.THREATS,
    question:
      "Which framework is commonly used to categorize and describe adversary tactics and techniques?",
    options: ["NIST CSF", "MITRE ATT&CK", "CIS Controls", "ISO 27001"],
    answer: 1,
    explanation:
      "MITRE ATT&CK is a globally accessible knowledge base of adversary tactics and techniques based on real-world observations.",
  },
  {
    id: 25,
    domain: DOMAINS.THREATS,
    question: "What does a rootkit primarily do?",
    options: [
      "Encrypts all files on the system",
      "Spreads via email attachments",
      "Hides the presence of malware by modifying the OS",
      "Generates cryptocurrency using victim's CPU",
    ],
    answer: 2,
    explanation:
      "A rootkit modifies the operating system to conceal its own existence and the presence of other malware, making detection extremely difficult.",
  },
  {
    id: 26,
    domain: DOMAINS.THREATS,
    question:
      "Which type of attack uses previously captured network packets to gain unauthorized access?",
    options: [
      "Replay attack",
      "Downgrade attack",
      "Birthday attack",
      "Rainbow table attack",
    ],
    answer: 0,
    explanation:
      "A replay attack captures valid authentication data and retransmits it to gain unauthorized access. Timestamps and nonces help prevent this.",
  },

  // ── SECURITY ARCHITECTURE ──────────────────────────────────────────────────
  {
    id: 27,
    domain: DOMAINS.ARCHITECTURE,
    question:
      "Which network security device monitors and filters traffic based on predetermined security rules?",
    options: ["Hub", "Switch", "Firewall", "Repeater"],
    answer: 2,
    explanation:
      "A firewall monitors and controls incoming and outgoing network traffic based on security rules, acting as a barrier between trusted and untrusted networks.",
  },
  {
    id: 28,
    domain: DOMAINS.ARCHITECTURE,
    question: "What is the purpose of a DMZ in network architecture?",
    options: [
      "To isolate the internet from the internal network entirely",
      "To host public-facing services while isolating the internal network",
      "To provide a dedicated zone for backups",
      "To segregate development from production servers",
    ],
    answer: 1,
    explanation:
      "A DMZ (Demilitarized Zone) is a network segment that hosts public-facing services (web servers, mail servers) while protecting the internal network.",
  },
  {
    id: 29,
    domain: DOMAINS.ARCHITECTURE,
    question:
      "Which Zero Trust principle states 'never trust, always verify'?",
    options: [
      "Grant access based on network location",
      "Continuously validate every user and device regardless of location",
      "Trust internal users implicitly",
      "Use perimeter-based security as primary defense",
    ],
    answer: 1,
    explanation:
      "Zero Trust assumes no implicit trust based on network location. Every request is authenticated, authorized, and continuously validated.",
  },
  {
    id: 30,
    domain: DOMAINS.ARCHITECTURE,
    question: "What does VLAN stand for and what is its primary benefit?",
    options: [
      "Virtual Local Area Network; network segmentation without physical separation",
      "Virtual LAN Aggregator; combining multiple networks",
      "Verified Local Access Node; authenticated network access",
      "Virtual Link Aggregation Network; increased bandwidth",
    ],
    answer: 0,
    explanation:
      "A VLAN (Virtual Local Area Network) logically segments a physical network, improving security and performance without requiring separate physical infrastructure.",
  },
  {
    id: 31,
    domain: DOMAINS.ARCHITECTURE,
    question:
      "Which cloud deployment model is exclusively dedicated to a single organization?",
    options: [
      "Public cloud",
      "Community cloud",
      "Private cloud",
      "Hybrid cloud",
    ],
    answer: 2,
    explanation:
      "A private cloud is provisioned for exclusive use by a single organization, offering greater control and security than public cloud options.",
  },
  {
    id: 32,
    domain: DOMAINS.ARCHITECTURE,
    question:
      "What is the difference between IDS and IPS?",
    options: [
      "IDS blocks threats; IPS only detects them",
      "IDS detects threats; IPS detects and actively blocks them",
      "IDS operates at layer 7; IPS operates at layer 3",
      "They are the same technology with different names",
    ],
    answer: 1,
    explanation:
      "An IDS (Intrusion Detection System) monitors and alerts on suspicious activity. An IPS (Intrusion Prevention System) can also block or prevent detected threats.",
  },
  {
    id: 33,
    domain: DOMAINS.ARCHITECTURE,
    question:
      "Which technology creates an encrypted tunnel over a public network?",
    options: ["NAT", "VPN", "VLAN", "STP"],
    answer: 1,
    explanation:
      "A VPN (Virtual Private Network) creates an encrypted tunnel over a public network, allowing secure communication as if on a private network.",
  },
  {
    id: 34,
    domain: DOMAINS.ARCHITECTURE,
    question:
      "Which cloud service model provides the most control to the customer?",
    options: [
      "SaaS (Software as a Service)",
      "PaaS (Platform as a Service)",
      "IaaS (Infrastructure as a Service)",
      "FaaS (Function as a Service)",
    ],
    answer: 2,
    explanation:
      "IaaS gives customers control over OS, middleware, runtime, and applications — the most control of the three primary cloud service models.",
  },
  {
    id: 35,
    domain: DOMAINS.ARCHITECTURE,
    question:
      "What is the purpose of network segmentation?",
    options: [
      "Increase network speed",
      "Reduce the attack surface by isolating network zones",
      "Simplify network management",
      "Allow all users to access all resources",
    ],
    answer: 1,
    explanation:
      "Network segmentation divides a network into zones so that a breach in one segment cannot easily spread to others, limiting blast radius.",
  },
  {
    id: 36,
    domain: DOMAINS.ARCHITECTURE,
    question:
      "Which type of firewall can inspect the contents of packets, not just headers?",
    options: [
      "Packet filtering firewall",
      "Stateful inspection firewall",
      "Next-Generation Firewall (NGFW)",
      "Circuit-level gateway",
    ],
    answer: 2,
    explanation:
      "A Next-Generation Firewall (NGFW) performs deep packet inspection (DPI), inspecting packet payloads, and includes features like application awareness and IPS.",
  },

  // ── SECURITY OPERATIONS ────────────────────────────────────────────────────
  {
    id: 37,
    domain: DOMAINS.OPERATIONS,
    question:
      "What is the first step in the incident response process?",
    options: ["Eradication", "Containment", "Preparation", "Identification"],
    answer: 2,
    explanation:
      "The NIST incident response lifecycle begins with Preparation — establishing the capability to respond before incidents occur.",
  },
  {
    id: 38,
    domain: DOMAINS.OPERATIONS,
    question:
      "Which tool aggregates and correlates logs from multiple sources to detect security events?",
    options: ["IDS", "SIEM", "DLP", "WAF"],
    answer: 1,
    explanation:
      "A SIEM (Security Information and Event Management) system collects, aggregates, and correlates log data from various sources to identify security incidents.",
  },
  {
    id: 39,
    domain: DOMAINS.OPERATIONS,
    question:
      "During a forensic investigation, what is the order of volatility principle?",
    options: [
      "Collect persistent data first (hard drives), then volatile data (RAM)",
      "Collect volatile data first (RAM, cache) before it is lost",
      "Collect all data simultaneously",
      "Volatility order does not matter in modern investigations",
    ],
    answer: 1,
    explanation:
      "The order of volatility dictates collecting the most volatile data first (CPU registers → RAM → swap → disk). RAM loses data on power-off.",
  },
  {
    id: 40,
    domain: DOMAINS.OPERATIONS,
    question:
      "Which backup strategy involves backing up only the data that has changed since the LAST FULL backup?",
    options: [
      "Full backup",
      "Incremental backup",
      "Differential backup",
      "Mirror backup",
    ],
    answer: 2,
    explanation:
      "A differential backup captures all changes since the last full backup. Incremental backups capture changes since the last backup of any type (full or incremental).",
  },
  {
    id: 41,
    domain: DOMAINS.OPERATIONS,
    question:
      "What does RTO stand for in business continuity planning?",
    options: [
      "Recovery Time Objective",
      "Recovery Transfer Operation",
      "Risk Tolerance Overview",
      "Redundancy Transfer Order",
    ],
    answer: 0,
    explanation:
      "RTO (Recovery Time Objective) is the maximum acceptable time to restore a system or process after a disruption. RPO is the maximum acceptable data loss.",
  },
  {
    id: 42,
    domain: DOMAINS.OPERATIONS,
    question:
      "An administrator runs a scan that attempts to exploit found vulnerabilities to confirm they are real. This is called:",
    options: [
      "Vulnerability scanning",
      "Penetration testing",
      "Threat hunting",
      "Red team exercise",
    ],
    answer: 1,
    explanation:
      "Penetration testing actively attempts to exploit vulnerabilities to assess real impact. Vulnerability scanning only identifies potential weaknesses without exploiting them.",
  },
  {
    id: 43,
    domain: DOMAINS.OPERATIONS,
    question:
      "What is the purpose of a honeypot?",
    options: [
      "Store encryption keys securely",
      "Attract and analyze attacker behavior in an isolated environment",
      "Filter malicious email attachments",
      "Cache frequently accessed web content",
    ],
    answer: 1,
    explanation:
      "A honeypot is a decoy system designed to attract attackers, allowing defenders to study attack methods without risking real systems.",
  },
  {
    id: 44,
    domain: DOMAINS.OPERATIONS,
    question:
      "Which term describes a proactive search for threats that have evaded existing security controls?",
    options: [
      "Vulnerability assessment",
      "Threat hunting",
      "Penetration testing",
      "Red team exercise",
    ],
    answer: 1,
    explanation:
      "Threat hunting is a proactive, human-driven process of searching through networks and datasets to detect threats that automated tools may have missed.",
  },
  {
    id: 45,
    domain: DOMAINS.OPERATIONS,
    question:
      "What is the primary purpose of Data Loss Prevention (DLP) tools?",
    options: [
      "Prevent ransomware from encrypting data",
      "Monitor and prevent unauthorized data exfiltration",
      "Back up data automatically",
      "Encrypt data at rest",
    ],
    answer: 1,
    explanation:
      "DLP solutions monitor, detect, and block unauthorized transfer of sensitive data, preventing data leakage from the organization.",
  },
  {
    id: 46,
    domain: DOMAINS.OPERATIONS,
    question:
      "During an incident, an analyst isolates an infected machine from the network. This phase is called:",
    options: ["Identification", "Containment", "Eradication", "Recovery"],
    answer: 1,
    explanation:
      "Containment limits the spread of an incident. Eradication removes the threat, and recovery restores normal operations.",
  },
  {
    id: 47,
    domain: DOMAINS.OPERATIONS,
    question:
      "Which type of analysis examines malware without executing it?",
    options: [
      "Dynamic analysis",
      "Behavioral analysis",
      "Static analysis",
      "Sandboxing",
    ],
    answer: 2,
    explanation:
      "Static analysis examines malware code/structure without running it (e.g., reviewing strings, disassembly). Dynamic analysis runs the malware in a controlled environment.",
  },
  {
    id: 48,
    domain: DOMAINS.OPERATIONS,
    question:
      "What is the purpose of change management in security operations?",
    options: [
      "Document software bugs",
      "Ensure changes are reviewed, approved, and tested to avoid introducing vulnerabilities",
      "Track employee training completion",
      "Manage cryptographic key rotation",
    ],
    answer: 1,
    explanation:
      "Change management processes ensure that changes to systems are properly planned, reviewed, approved, and tested — reducing the risk of introducing security flaws.",
  },

  // ── SECURITY PROGRAM MANAGEMENT & OVERSIGHT ────────────────────────────────
  {
    id: 49,
    domain: DOMAINS.PROGRAM_MANAGEMENT,
    question:
      "Which of the following is the BEST definition of risk?",
    options: [
      "A vulnerability in a system",
      "The likelihood and impact of a threat exploiting a vulnerability",
      "The probability that an attack will succeed",
      "The potential damage from a natural disaster",
    ],
    answer: 1,
    explanation:
      "Risk = Likelihood × Impact. It represents the potential for loss when a threat exploits a vulnerability.",
  },
  {
    id: 50,
    domain: DOMAINS.PROGRAM_MANAGEMENT,
    question: "What does GDPR primarily regulate?",
    options: [
      "Financial reporting requirements",
      "Personal data processing and privacy for EU residents",
      "Healthcare data in the United States",
      "Payment card industry security standards",
    ],
    answer: 1,
    explanation:
      "GDPR (General Data Protection Regulation) is an EU regulation governing how personal data of EU residents is collected, processed, and stored.",
  },
  {
    id: 51,
    domain: DOMAINS.PROGRAM_MANAGEMENT,
    question:
      "Which US regulation protects healthcare patient information?",
    options: ["PCI DSS", "GLBA", "HIPAA", "SOX"],
    answer: 2,
    explanation:
      "HIPAA (Health Insurance Portability and Accountability Act) sets standards for protecting sensitive patient health information in the US.",
  },
  {
    id: 52,
    domain: DOMAINS.PROGRAM_MANAGEMENT,
    question:
      "Which risk response involves purchasing cyber insurance?",
    options: [
      "Risk avoidance",
      "Risk acceptance",
      "Risk mitigation",
      "Risk transference",
    ],
    answer: 3,
    explanation:
      "Risk transference shifts financial impact to a third party (e.g., insurance). Mitigation reduces risk; avoidance eliminates the activity; acceptance acknowledges and tolerates the risk.",
  },
  {
    id: 53,
    domain: DOMAINS.PROGRAM_MANAGEMENT,
    question:
      "What is the difference between a policy and a procedure?",
    options: [
      "Policies are technical; procedures are managerial",
      "Policies state high-level requirements; procedures describe step-by-step implementation",
      "Procedures are mandatory; policies are optional guidelines",
      "There is no meaningful difference",
    ],
    answer: 1,
    explanation:
      "Policies define the 'what' and 'why' at a high level. Procedures define the 'how' with specific step-by-step instructions.",
  },
  {
    id: 54,
    domain: DOMAINS.PROGRAM_MANAGEMENT,
    question:
      "Which standard provides a framework for information security management systems (ISMS)?",
    options: ["PCI DSS", "ISO 27001", "NIST SP 800-53", "SOC 2"],
    answer: 1,
    explanation:
      "ISO 27001 is the international standard for establishing, implementing, maintaining, and continually improving an ISMS.",
  },
  {
    id: 55,
    domain: DOMAINS.PROGRAM_MANAGEMENT,
    question:
      "A Business Impact Analysis (BIA) is primarily used to:",
    options: [
      "Identify attackers and their motivations",
      "Determine the impact of disruptions on critical business functions",
      "Audit vendor security controls",
      "Train employees on security awareness",
    ],
    answer: 1,
    explanation:
      "A BIA identifies critical business functions and assesses the potential impact of their disruption, informing BCP/DR planning.",
  },
  {
    id: 56,
    domain: DOMAINS.PROGRAM_MANAGEMENT,
    question:
      "Which of the following BEST describes security awareness training?",
    options: [
      "A technical control that blocks malicious emails",
      "An administrative control that educates users to recognize and avoid threats",
      "A physical control that restricts building access",
      "A detective control that monitors user activity",
    ],
    answer: 1,
    explanation:
      "Security awareness training is an administrative (managerial) control — it reduces risk by changing user behavior rather than implementing technical safeguards.",
  },
  {
    id: 57,
    domain: DOMAINS.PROGRAM_MANAGEMENT,
    question:
      "What is the purpose of a third-party risk assessment?",
    options: [
      "Evaluate physical security of company offices",
      "Assess the security posture of vendors and partners that handle your data",
      "Test internal employees for social engineering susceptibility",
      "Determine the cost of a data breach",
    ],
    answer: 1,
    explanation:
      "Third-party risk assessments evaluate vendors and partners to ensure they meet your security requirements, since their weaknesses can become your risks.",
  },
  {
    id: 58,
    domain: DOMAINS.PROGRAM_MANAGEMENT,
    question:
      "PCI DSS applies to organizations that:",
    options: [
      "Operate in the European Union",
      "Store, process, or transmit payment card data",
      "Employ more than 500 people",
      "Operate cloud computing services",
    ],
    answer: 1,
    explanation:
      "PCI DSS (Payment Card Industry Data Security Standard) applies to any entity that stores, processes, or transmits cardholder data.",
  },
  {
    id: 59,
    domain: DOMAINS.PROGRAM_MANAGEMENT,
    question:
      "What does RPO stand for?",
    options: [
      "Recovery Point Objective",
      "Risk Prevention Order",
      "Redundancy Protocol Overview",
      "Remote Process Operation",
    ],
    answer: 0,
    explanation:
      "RPO (Recovery Point Objective) is the maximum acceptable amount of data loss measured in time. It determines how frequently backups must occur.",
  },
  {
    id: 60,
    domain: DOMAINS.PROGRAM_MANAGEMENT,
    question:
      "Which type of security assessment is performed by an external team with no prior knowledge of the target environment?",
    options: [
      "White-box testing",
      "Gray-box testing",
      "Black-box testing",
      "Crystal-box testing",
    ],
    answer: 2,
    explanation:
      "Black-box testing simulates an external attacker with no prior knowledge of the target. White-box provides full knowledge; gray-box provides partial knowledge.",
  },
];
