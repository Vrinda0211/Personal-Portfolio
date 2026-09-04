const canvas = document.getElementById("neuro");

const pointer = {
  x: 0,
  targetX: window.innerWidth * 0.5,
  y: 0,
  targetY: window.innerHeight * 0.5,
};

let animationFrame = null;

const projects = {
  soc: {
    kicker: "Cyber security + agents",
    title: "Multi-Agent SOC Analyst Assistant",
    description:
      "An agentic Security Operations Center assistant that coordinates triage, investigation, and response through a stateful LangGraph workflow, combining security telemetry, historical behavior, MITRE ATT&CK mapping, and context-aware remediation.",
    overview:
      "The Multi-Agent SOC Analyst Assistant automates the analysis of incoming security events by passing them through specialized AI agents for triage, investigation, and response. Each stage enriches the incident with evidence from security logs, IP reputation, historical activity, geographic information, attack-pattern detection, and MITRE ATT&CK knowledge before producing a response recommendation.",
    workflow: [
      {
        number: "01",
        title: "Triage Agent",
        text:
          "Evaluates incoming security events and determines whether they are suspicious enough to investigate. It uses IP reputation, incident history, and geographic information to identify signals such as repeated activity, suspicious countries, administrative targeting, and other risk indicators.",
      },
      {
        number: "02",
        title: "Investigation Agent",
        text:
          "Performs deeper analysis of suspicious incidents using historical authentication and port-scan activity. Detected patterns are mapped to MITRE ATT&CK techniques and the investigation produces an evidence-based attack classification and confidence score.",
      },
      {
        number: "03",
        title: "Response Agent",
        text:
          "Generates prioritized remediation actions using the investigation results and a structured remediation knowledge base. It also evaluates whether the incident should be escalated to a human analyst.",
      },
    ],
    detection: [
      "IP reputation analysis",
      "Incident history correlation",
      "Geographic IP enrichment",
      "Brute-force detection",
      "Port-scan detection",
      "Suspicious-login detection",
      "MITRE ATT&CK mapping",
      "Context-aware escalation",
    ],
    attackPatterns: [
      {
        name: "Brute Force",
        detail:
          "Detected when an IP produces more than five failed authentication attempts.",
        technique: "T1110",
      },
      {
        name: "Port Scan",
        detail:
          "Detected when an IP scans more than ten unique destination ports.",
        technique: "T1046",
      },
      {
        name: "Suspicious Login",
        detail:
          "Detected when a successful login occurs after previous failed attempts.",
        technique: "T1078",
      },
    ],
    feedback:
      "Investigation confidence is evaluated before response. When confidence falls below 60, the workflow can return to triage for another assessment. The retriage loop is bounded to prevent repeated cycling.",
    response:
      "Remediation recommendations are generated from a structured knowledge base containing immediate actions, investigation steps, preventive measures, and escalation conditions. The escalation engine considers severity, investigation confidence, reputation score, administrative targeting, and successful authentication activity.",
    copilot:
      "The SOC Copilot provides analysts with a natural-language interface to incident data stored in SQLite. It can retrieve a specific incident or the broader incident history and use that context to answer analyst questions.",
    observability:
      "Processed incidents are persisted in SQLite, while Grafana dashboards provide visibility into incident activity, MITRE techniques, geographic activity, agent health, and processing performance.",
    tags: [
      "Python",
      "LangGraph",
      "ReAct",
      "FastAPI",
      "SQLite",
      "Grafana",
      "MITRE ATT&CK",
    ],
    sections: [
      {
        type: "image",
        label: "ARCHITECTURE",
        title: "Architecture Diagram",
        description:
          "The multi-agent workflow connects triage, investigation, response, enrichment, persistence, and observability.",
        image: "assets/soc-architecture.png",
      },
      {
        type: "text",
        label: "OVERVIEW",
        content:
          "The Multi-Agent SOC Analyst Assistant automates the analysis of incoming security events by passing them through specialized AI agents for triage, investigation, and response. Each stage enriches the incident with evidence from security logs, IP reputation, historical activity, geographic information, attack-pattern detection, and MITRE ATT&CK knowledge before producing a response recommendation.",
      },
      {
        type: "workflow",
        label: "HOW IT WORKS",
        items: [
          {
            number: "01",
            title: "Triage Agent",
            text:
              "Evaluates incoming security events and determines whether they are suspicious enough to investigate. It uses IP reputation, incident history, and geographic information to identify signals such as repeated activity, suspicious countries, administrative targeting, and other risk indicators.",
          },
          {
            number: "02",
            title: "Investigation Agent",
            text:
              "Performs deeper analysis of suspicious incidents using historical authentication and port-scan activity. Detected patterns are mapped to MITRE ATT&CK techniques and the investigation produces an evidence-based attack classification and confidence score.",
          },
          {
            number: "03",
            title: "Response Agent",
            text:
              "Generates prioritized remediation actions using the investigation results and a structured remediation knowledge base. It also evaluates whether the incident should be escalated to a human analyst.",
          },
        ],
      },
      {
        type: "list",
        label: "FEATURES",
        items: [
          "IP reputation analysis",
          "Incident history correlation",
          "Geographic IP enrichment",
          "Brute-force detection",
          "Port-scan detection",
          "Suspicious-login detection",
          "MITRE ATT&CK mapping",
          "Context-aware escalation",
        ],
      },
      {
        type: "patterns",
        label: "KEY TECHNICAL DETAILS",
        items: [
          {
            name: "Brute Force",
            detail:
              "Detected when an IP produces more than five failed authentication attempts.",
            technique: "T1110",
          },
          {
            name: "Port Scan",
            detail:
              "Detected when an IP scans more than ten unique destination ports.",
            technique: "T1046",
          },
          {
            name: "Suspicious Login",
            detail:
              "Detected when a successful login occurs after previous failed attempts.",
            technique: "T1078",
          },
        ],
      },
      {
        type: "text",
        label: "DESIGN DECISIONS",
        content:
          "Investigation confidence is evaluated before response. When confidence falls below 60, the workflow can return to triage for another assessment. The retriage loop is bounded to prevent repeated cycling.",
      },
      {
        type: "text",
        label: "RESULT",
        content:
          "Remediation recommendations are generated from a structured knowledge base containing immediate actions, investigation steps, preventive measures, and escalation conditions. The escalation engine considers severity, investigation confidence, reputation score, administrative targeting, and successful authentication activity.",
      },
      {
        type: "text",
        label: "AI COPILOT",
        content:
          "The SOC Copilot provides analysts with a natural-language interface to incident data stored in SQLite. It can retrieve a specific incident or the broader incident history and use that context to answer analyst questions.",
      },
      {
        type: "text",
        label: "IMPLEMENTATION",
        content:
          "Processed incidents are persisted in SQLite, while Grafana dashboards provide visibility into incident activity, MITRE techniques, geographic activity, agent health, and processing performance.",
      },
    ],
    url: "https://github.com/Vrinda0211/AgenticAI-MultiAgent-SOC",
  },

  vertex: {
    kicker: "Realtime collaboration",
    title: "Vertex",
    description:
      "A real-time collaborative code editor that allows multiple users to work on the same file simultaneously, with conflict resolution through Operational Transformation and an integrated Gemini-powered AI pair programmer.",
    overview:
      "Vertex is a collaborative browser-based code editor designed around real-time multi-user development. Users can create or join shared rooms, edit code concurrently, see other participants' changes and cursor positions, and work with an AI pair programmer directly inside the editor. The application combines a React and CodeMirror 6 frontend with a FastAPI backend, WebSockets for real-time communication, and Operational Transformation for resolving concurrent edits.",
    workflow: [
      {
        number: "01",
        title: "Create or Join a Room",
        text:
          "Users enter a room through a shared room identifier. The frontend establishes a WebSocket connection with the backend so participants in the same room can exchange editor updates in real time.",
      },
      {
        number: "02",
        title: "Collaborative Editing",
        text:
          "CodeMirror 6 provides the editing experience while local changes are converted into operations and transmitted through the WebSocket connection. Remote updates are applied to connected clients so everyone stays synchronized.",
      },
      {
        number: "03",
        title: "Conflict Resolution",
        text:
          "When multiple users make edits concurrently, Operational Transformation transforms incoming operations against local changes so conflicting edits can be reconciled while maintaining a consistent shared document state.",
      },
      {
        number: "04",
        title: "AI Pair Programmer",
        text:
          "The integrated Gemini-powered assistant allows users to interact with an AI coding partner from within the editor. It can provide coding assistance while the user continues working in the shared environment.",
      },
    ],
    detection: [
      "Real-time multi-user editing",
      "WebSocket synchronization",
      "Operational Transformation",
      "Live cursor positions",
      "Room-based collaboration",
      "CodeMirror 6 editor",
      "Gemini AI pair programmer",
      "Local code saving",
    ],
    attackPatterns: [
      {
        name: "Operational Transformation",
        detail:
          "Concurrent editing operations are transformed against one another so multiple users can modify the same document without simply overwriting each other's changes.",
        technique: "Conflict Resolution",
      },
      {
        name: "WebSocket Synchronization",
        detail:
          "Persistent WebSocket connections allow editor operations, cursor updates, and collaboration events to be exchanged between the server and connected clients in real time.",
        technique: "Realtime Communication",
      },
      {
        name: "Room-Based Collaboration",
        detail:
          "Shared room identifiers allow multiple users to connect to the same collaborative editing session and receive updates belonging to that room.",
        technique: "Session Management",
      },
    ],
    feedback:
      "The project separates local editor state from synchronized collaborative state. This allows local edits to be represented as operations and transformed when necessary before being incorporated into the shared document.",
    response:
      "The backend manages connected users and collaborative sessions while the frontend handles the editing interface, cursor state, and real-time updates. This separation keeps the editor responsive while allowing the server to coordinate shared document state.",
    copilot:
      "Vertex includes a Gemini-powered AI pair programmer directly within the collaborative editor, giving users access to AI-assisted coding without leaving the development environment.",
    observability:
      "The application is structured around a React frontend, CodeMirror 6 editor, FastAPI backend, WebSocket communication, and room-based collaboration. The project also supports saving code locally so work can be retained outside an active collaboration session.",
    tags: [
      "React",
      "FastAPI",
      "WebSockets",
      "Operational Transformation",
      "CodeMirror 6",
      "Gemini API",
    ],
    sections: [
      {
        type: "text",
        label: "OVERVIEW",
        content:
          "Vertex is a collaborative browser-based code editor designed around real-time multi-user development. Users can create or join shared rooms, edit code concurrently, see other participants' changes and cursor positions, and work with an AI pair programmer directly inside the editor. The application combines a React and CodeMirror 6 frontend with a FastAPI backend, WebSockets for real-time communication, and Operational Transformation for resolving concurrent edits.",
      },
      {
        type: "workflow",
        label: "HOW IT WORKS",
        items: [
          {
            number: "01",
            title: "Create or Join a Room",
            text:
              "Users enter a room through a shared room identifier. The frontend establishes a WebSocket connection with the backend so participants in the same room can exchange editor updates in real time.",
          },
          {
            number: "02",
            title: "Collaborative Editing",
            text:
              "CodeMirror 6 provides the editing experience while local changes are converted into operations and transmitted through the WebSocket connection. Remote updates are applied to connected clients so everyone stays synchronized.",
          },
          {
            number: "03",
            title: "Conflict Resolution",
            text:
              "When multiple users make edits concurrently, Operational Transformation transforms incoming operations against local changes so conflicting edits can be reconciled while maintaining a consistent shared document state.",
          },
          {
            number: "04",
            title: "AI Pair Programmer",
            text:
              "The integrated Gemini-powered assistant allows users to interact with an AI coding partner from within the editor. It can provide coding assistance while the user continues working in the shared environment.",
          },
        ],
      },
      {
        type: "list",
        label: "FEATURES",
        items: [
          "Real-time multi-user editing",
          "WebSocket synchronization",
          "Operational Transformation",
          "Live cursor positions",
          "Room-based collaboration",
          "CodeMirror 6 editor",
          "Gemini AI pair programmer",
          "Local code saving",
        ],
      },
      {
        type: "patterns",
        label: "KEY TECHNICAL DETAILS",
        items: [
          {
            name: "Operational Transformation",
            detail:
              "Concurrent editing operations are transformed against one another so multiple users can modify the same document without simply overwriting each other's changes.",
            technique: "Conflict Resolution",
          },
          {
            name: "WebSocket Synchronization",
            detail:
              "Persistent WebSocket connections allow editor operations, cursor updates, and collaboration events to be exchanged between the server and connected clients in real time.",
            technique: "Realtime Communication",
          },
          {
            name: "Room-Based Collaboration",
            detail:
              "Shared room identifiers allow multiple users to connect to the same collaborative editing session and receive updates belonging to that room.",
            technique: "Session Management",
          },
        ],
      },
      {
        type: "text",
        label: "DESIGN DECISIONS",
        content:
          "The project separates local editor state from synchronized collaborative state. This allows local edits to be represented as operations and transformed when necessary before being incorporated into the shared document.",
      },
      {
        type: "text",
        label: "RESULT",
        content:
          "The backend manages connected users and collaborative sessions while the frontend handles the editing interface, cursor state, and real-time updates. This separation keeps the editor responsive while allowing the server to coordinate shared document state.",
      },
      {
        type: "text",
        label: "AI PAIR PROGRAMMER",
        content:
          "Vertex includes a Gemini-powered AI pair programmer directly within the collaborative editor, giving users access to AI-assisted coding without leaving the development environment.",
      },
      {
        type: "text",
        label: "IMPLEMENTATION",
        content:
          "The application is structured around a React frontend, CodeMirror 6 editor, FastAPI backend, WebSocket communication, and room-based collaboration. The project also supports saving code locally so work can be retained outside an active collaboration session.",
      },
    ],
    url: "https://github.com/Vrinda0211/Vertex",
  },

  caskdb: {
    kicker: "Storage systems",
    title: "CaskDB",
    description:
      "A persistent key-value storage engine built around write-ahead logging, crash recovery, sorted memtables, immutable SSTables, and multi-file compaction.",
    overview:
      "CaskDB is a persistent, embeddable key-value storage engine written in C++17. It uses a Bitcask-inspired storage model with a write-ahead log for durability, an in-memory sorted memtable for active state, immutable sorted SSTables for persistence, and compaction to merge multiple on-disk segments.",
    workflow: [
      {
        number: "01",
        title: "Write to the WAL",
        text:
          "Each write is first appended to the write-ahead log and flushed to disk before the in-memory state is updated. This makes acknowledged writes recoverable if the process crashes during an operation.",
      },
      {
        number: "02",
        title: "Update the Memtable",
        text:
          "After the WAL is flushed, the key-value state is updated in an in-memory sorted memtable implemented with std::map. Reads can use this current in-memory state without immediately requiring an on-disk lookup.",
      },
      {
        number: "03",
        title: "Flush to an SSTable",
        text:
          "When the memtable reaches its configured size threshold, its sorted contents are written to an immutable sorted string table. The persisted segment becomes a stable on-disk representation of that portion of the database.",
      },
      {
        number: "04",
        title: "Compact Storage",
        text:
          "Multiple SSTable segments can be merged into one clean sorted file. During compaction, newer values resolve conflicts so obsolete data can be reclaimed and the read path remains predictable.",
      },
    ],
    detection: [
      "Persistent key-value storage",
      "Write-ahead logging",
      "Crash recovery through WAL replay",
      "Sorted in-memory memtable",
      "Immutable SSTables",
      "Multi-file compaction",
    ],
    attackPatterns: [
      {
        name: "Write-Ahead Logging",
        detail:
          "Writes are appended to the WAL and flushed before the in-memory state is changed, allowing the database state to be reconstructed after a crash.",
        technique: "Durability",
      },
      {
        name: "Memtable + SSTable",
        detail:
          "Active data is maintained in a sorted std::map and flushed into immutable sorted files when the configured memtable threshold is reached.",
        technique: "Persistence",
      },
      {
        name: "Multi-File Compaction",
        detail:
          "Multiple persisted segments are merged into a single sorted file while resolving conflicting records by recency and reclaiming obsolete storage.",
        technique: "Storage Maintenance",
      },
    ],
    feedback:
      "The storage engine separates the durability path from the active in-memory state. WAL-first writes provide crash recovery, while immutable SSTables avoid modifying persisted segments in place.",
    response:
      "The implemented engine provides the core operations needed for an embeddable persistent key-value store, including put, get, remove, replay, flushing, and compaction.",
    observability:
      "CaskDB is implemented as a C++17 storage engine with explicit persistence and recovery operations. The current implementation uses a configurable memtable threshold and exposes the storage lifecycle through its KVStore interface.",
    tags: [
      "C++17",
      "Write-Ahead Logging",
      "SSTables",
      "File I/O",
    ],
    sections: [
      {
        type: "text",
        label: "OVERVIEW",
        content:
          "CaskDB is a persistent, embeddable key-value storage engine written in C++17. It uses a Bitcask-inspired storage model with a write-ahead log for durability, an in-memory sorted memtable for active state, immutable sorted SSTables for persistence, and compaction to merge multiple on-disk segments.",
      },
      {
        type: "workflow",
        label: "HOW IT WORKS",
        items: [
          {
            number: "01",
            title: "Write to the WAL",
            text:
              "Each write is first appended to the write-ahead log and flushed to disk before the in-memory state is updated. This makes acknowledged writes recoverable if the process crashes during an operation.",
          },
          {
            number: "02",
            title: "Update the Memtable",
            text:
              "After the WAL is flushed, the key-value state is updated in an in-memory sorted memtable implemented with std::map. Reads can use this current in-memory state without immediately requiring an on-disk lookup.",
          },
          {
            number: "03",
            title: "Flush to an SSTable",
            text:
              "When the memtable reaches its configured size threshold, its sorted contents are written to an immutable sorted string table. The persisted segment becomes a stable on-disk representation of that portion of the database.",
          },
          {
            number: "04",
            title: "Compact Storage",
            text:
              "Multiple SSTable segments can be merged into one clean sorted file. During compaction, newer values resolve conflicts so obsolete data can be reclaimed and the read path remains predictable.",
          },
        ],
      },
      {
        type: "list",
        label: "FEATURES",
        items: [
          "Persistent key-value storage",
          "Write-ahead logging",
          "Crash recovery through WAL replay",
          "Sorted in-memory memtable",
          "Immutable SSTables",
          "Multi-file compaction",
        ],
      },
      {
        type: "patterns",
        label: "KEY TECHNICAL DETAILS",
        items: [
          {
            name: "Write-Ahead Logging",
            detail:
              "Writes are appended to the WAL and flushed before the in-memory state is changed, allowing the database state to be reconstructed after a crash.",
            technique: "Durability",
          },
          {
            name: "Memtable + SSTable",
            detail:
              "Active data is maintained in a sorted std::map and flushed into immutable sorted files when the configured memtable threshold is reached.",
            technique: "Persistence",
          },
          {
            name: "Multi-File Compaction",
            detail:
              "Multiple persisted segments are merged into a single sorted file while resolving conflicting records by recency and reclaiming obsolete storage.",
            technique: "Storage Maintenance",
          },
        ],
      },
      {
        type: "text",
        label: "DESIGN DECISIONS",
        content:
          "CaskDB keeps the write path durability-first by flushing the WAL before updating memory. Immutable SSTables are never modified in place, and compaction provides a controlled way to merge segments, resolve newer values, and reclaim obsolete data.",
      },
      {
        type: "text",
        label: "RESULT",
        content:
          "The implemented engine provides the core operations needed for an embeddable persistent key-value store, including put, get, remove, replay, flushing, and compaction.",
      },
      {
        type: "text",
        label: "IMPLEMENTATION",
        content:
          "CaskDB is implemented in C++17 around a KVStore interface. The current implementation uses a configurable memtable size threshold, WAL replay for recovery, SSTable persistence, and explicit compaction. Features such as tombstones, Bloom filters, sparse indexes, background compaction, and range queries are part of the roadmap rather than the current implementation.",
      },
    ],
    url: "https://github.com/Vrinda0211/CaskDB",
  },

  sdn: {
    kicker: "Networks",
    title: "SDN Link Failure Recovery",
    description:
      "A fault-tolerant SDN controller that detects link failures, recomputes shortest paths, invalidates stale flow rules, and reroutes traffic.",
    overview:
      "This project implements a fault-tolerant Software-Defined Networking controller using Ryu and Mininet. The controller maintains a network graph, detects a failed link through OpenFlow port-status events, recomputes an alternate shortest path using BFS, and installs new forwarding rules so traffic can continue through the backup route.",
    workflow: [
      {
        number: "01",
        title: "Build the Network",
        text:
          "A Mininet topology connects four switches and two hosts with a primary route through s1, s2, and s4 and a backup route through s1, s3, and s4.",
      },
      {
        number: "02",
        title: "Detect Link Failure",
        text:
          "The Ryu controller receives EventOFPPortStatus notifications when a switch port changes state. The failed connection is reflected in the controller's network graph.",
      },
      {
        number: "03",
        title: "Recompute the Path",
        text:
          "After the failed link is removed from the graph, BFS is used to calculate a new shortest path between the affected endpoints. The controller can therefore select the available alternate route.",
      },
      {
        number: "04",
        title: "Flush and Reroute",
        text:
          "Stale flow rules are invalidated and new OpenFlow match-action rules are installed along the recomputed path. Reverse-flow rules are also installed so communication remains bidirectional.",
      },
    ],
    detection: [
      "OpenFlow port-status failure detection",
      "Dynamic network graph updates",
      "BFS shortest-path recomputation",
      "Alternate-path rerouting",
      "Stale flow invalidation",
      "Dynamic OpenFlow rule installation",
      "Reverse-flow installation",
      "Mininet validation",
    ],
    attackPatterns: [
      {
        name: "Port Status Events",
        detail:
          "EventOFPPortStatus provides the controller with notification of switch-port state changes so a failed link can trigger recovery logic.",
        technique: "Failure Detection",
      },
      {
        name: "Graph + BFS",
        detail:
          "The controller updates its network graph after a failure and uses breadth-first search to recompute a shortest available path.",
        technique: "Path Computation",
      },
      {
        name: "OpenFlow Rerouting",
        detail:
          "Old forwarding rules are flushed and new match-action rules are installed along the alternate path, including the reverse direction.",
        technique: "Flow Management",
      },
    ],
    feedback:
      "The recovery process is event-driven rather than dependent on manually changing routes. A link-state change triggers graph maintenance, path recomputation, and flow-rule updates.",
    response:
      "The controller automatically reroutes traffic from the primary s1 → s2 → s4 path to the backup s1 → s3 → s4 path when the s2–s4 connection fails.",
    observability:
      "The project was validated using Mininet connectivity tests, iperf traffic checks, switch flow tables, controller logs, and Wireshark packet captures.",
    tags: [
      "Python",
      "Ryu",
      "Mininet",
      "OpenFlow",
      "BFS",
      "SDN",
    ],
    sections: [
      {
        type: "text",
        label: "OVERVIEW",
        content:
          "This project implements a fault-tolerant Software-Defined Networking controller using Ryu and Mininet. The controller maintains a network graph, detects a failed link through OpenFlow port-status events, recomputes an alternate shortest path using BFS, and installs new forwarding rules so traffic can continue through the backup route.",
      },
      {
        type: "workflow",
        label: "HOW IT WORKS",
        items: [
          {
            number: "01",
            title: "Build the Network",
            text:
              "A Mininet topology connects four switches and two hosts with a primary route through s1, s2, and s4 and a backup route through s1, s3, and s4.",
          },
          {
            number: "02",
            title: "Detect Link Failure",
            text:
              "The Ryu controller receives EventOFPPortStatus notifications when a switch port changes state. The failed connection is reflected in the controller's network graph.",
          },
          {
            number: "03",
            title: "Recompute the Path",
            text:
              "After the failed link is removed from the graph, BFS is used to calculate a new shortest path between the affected endpoints. The controller can therefore select the available alternate route.",
          },
          {
            number: "04",
            title: "Flush and Reroute",
            text:
              "Stale flow rules are invalidated and new OpenFlow match-action rules are installed along the recomputed path. Reverse-flow rules are also installed so communication remains bidirectional.",
          },
        ],
      },
      {
        type: "list",
        label: "FEATURES",
        items: [
          "OpenFlow port-status failure detection",
          "Dynamic network graph updates",
          "BFS shortest-path recomputation",
          "Alternate-path rerouting",
          "Stale flow invalidation",
          "Dynamic OpenFlow rule installation",
          "Reverse-flow installation",
          "Mininet validation",
        ],
      },
      {
        type: "patterns",
        label: "KEY TECHNICAL DETAILS",
        items: [
          {
            name: "Port Status Events",
            detail:
              "EventOFPPortStatus provides the controller with notification of switch-port state changes so a failed link can trigger recovery logic.",
            technique: "Failure Detection",
          },
          {
            name: "Graph + BFS",
            detail:
              "The controller updates its network graph after a failure and uses breadth-first search to recompute a shortest available path.",
            technique: "Path Computation",
          },
          {
            name: "OpenFlow Rerouting",
            detail:
              "Old forwarding rules are flushed and new match-action rules are installed along the alternate path, including the reverse direction.",
            technique: "Flow Management",
          },
        ],
      },
      {
        type: "text",
        label: "DESIGN DECISIONS",
        content:
          "The recovery logic uses the controller's network graph as the source of truth after a topology change. Recomputing the route with BFS keeps the recovery mechanism deterministic and lightweight for the project's small Mininet topology.",
      },
      {
        type: "text",
        label: "RESULT",
        content:
          "When the s2–s4 link fails, the controller detects the failure, removes the unavailable connection from its graph, computes the alternate s1 → s3 → s4 path, and updates forwarding rules so traffic can be rerouted.",
      },
      {
        type: "text",
        label: "IMPLEMENTATION",
        content:
          "The system is implemented with Python, Ryu, Mininet, and OpenFlow. Validation uses pingall for connectivity, iperf for traffic behavior, switch flow tables and controller logs for forwarding-state verification, and Wireshark for packet-level inspection.",
      },
    ],
    url: "https://github.com/Vrinda0211/SDN-Link-Failure-Recovery",
  },

  codedistill: {
    kicker: "Developer tools",
    title: "CodeDistill",
    description:
      "A Chrome extension that extracts executable code from noisy web content using deterministic text normalization and AI-assisted extraction.",
    overview:
      "CodeDistill is a Chrome Extension Manifest V3 developer tool for turning messy web content into clean, copy-ready code. It provides a deterministic Clean Copy path for common prompt and formatting clutter and an AI Copy Clean path powered by Gemini 2.5 Flash for mixed content containing prose, logs, output, and code.",
    workflow: [
      {
        number: "01",
        title: "Capture Web Content",
        text:
          "Users select or copy content from a web page and can invoke CodeDistill through its popup or right-click context menu.",
      },
      {
        number: "02",
        title: "Clean Copy",
        text:
          "The deterministic cleaning path normalizes common web and terminal clutter such as line numbers, dollar signs, Python prompts, continuation prompts, and PowerShell prompts without requiring an API key.",
      },
      {
        number: "03",
        title: "AI Copy Clean",
        text:
          "For mixed or ambiguous content, the extension can send the selected text to Gemini 2.5 Flash with an extraction-focused prompt so useful executable code can be separated from surrounding prose, logs, and output.",
      },
      {
        number: "04",
        title: "Copy the Result",
        text:
          "The cleaned result is returned to the extension and made available for copying. The Gemini API key is stored locally in Chrome storage when the AI mode is configured.",
      },
    ],
    detection: [
      "Deterministic code cleaning",
      "AI-assisted code extraction",
      "Chrome right-click context menu",
      "Manifest V3 extension",
      "Clipboard integration",
      "Local API-key storage",
      "Gemini 2.5 Flash",
    ],
    attackPatterns: [
      {
        name: "Deterministic Cleaning",
        detail:
          "Rule-based normalization removes common line-number and prompt artifacts such as $, >>>, >>, PS>, and related clutter without relying on an external model.",
        technique: "Rule-Based Processing",
      },
      {
        name: "AI Extraction",
        detail:
          "Gemini 2.5 Flash is used when content requires semantic separation of executable code from prose, logs, or output.",
        technique: "Gemini 2.5 Flash",
      },
      {
        name: "Chrome APIs",
        detail:
          "Manifest V3 capabilities including Context Menus, Scripting, Clipboard, and Storage APIs connect the extraction workflow to the browser.",
        technique: "Browser Integration",
      },
    ],
    feedback:
      "CodeDistill separates predictable cleanup from AI-assisted extraction. This keeps common cleaning deterministic and usable without an API key while reserving Gemini for content that benefits from semantic interpretation.",
    response:
      "The extension provides a browser-native workflow for turning noisy copied material into executable code, with both a no-key deterministic path and an AI-assisted path for more complex content.",
    observability:
      "CodeDistill is packaged as a Chrome Extension Manifest V3 and uses browser APIs for context-menu actions, scripting, clipboard access, and local storage.",
    tags: [
      "JavaScript",
      "Chrome Extension APIs",
      "Prompt Engineering",
    ],
    sections: [
      {
        type: "text",
        label: "OVERVIEW",
        content:
          "CodeDistill is a Chrome Extension Manifest V3 developer tool for turning messy web content into clean, copy-ready code. It provides a deterministic Clean Copy path for common prompt and formatting clutter and an AI Copy Clean path powered by Gemini 2.5 Flash for mixed content containing prose, logs, output, and code.",
      },
      {
        type: "workflow",
        label: "HOW IT WORKS",
        items: [
          {
            number: "01",
            title: "Capture Web Content",
            text:
              "Users select or copy content from a web page and can invoke CodeDistill through its popup or right-click context menu.",
          },
          {
            number: "02",
            title: "Clean Copy",
            text:
              "The deterministic cleaning path normalizes common web and terminal clutter such as line numbers, dollar signs, Python prompts, continuation prompts, and PowerShell prompts without requiring an API key.",
          },
          {
            number: "03",
            title: "AI Copy Clean",
            text:
              "For mixed or ambiguous content, the extension can send the selected text to Gemini 2.5 Flash with an extraction-focused prompt so useful executable code can be separated from surrounding prose, logs, and output.",
          },
          {
            number: "04",
            title: "Copy the Result",
            text:
              "The cleaned result is returned to the extension and made available for copying. The Gemini API key is stored locally in Chrome storage when the AI mode is configured.",
          },
        ],
      },
      {
        type: "list",
        label: "FEATURES",
        items: [
          "Deterministic code cleaning",
          "AI-assisted code extraction",
          "Chrome right-click context menu",
          "Manifest V3 extension",
          "Clipboard integration",
          "Local API-key storage",
          "Gemini 2.5 Flash",
        ],
      },
      {
        type: "patterns",
        label: "KEY TECHNICAL DETAILS",
        items: [
          {
            name: "Deterministic Cleaning",
            detail:
              "Rule-based normalization removes common line-number and prompt artifacts such as $, >>>, >>, PS>, and related clutter without relying on an external model.",
            technique: "Rule-Based Processing",
          },
          {
            name: "AI Extraction",
            detail:
              "Gemini 2.5 Flash is used when content requires semantic separation of executable code from prose, logs, or output.",
            technique: "Gemini 2.5 Flash",
          },
          {
            name: "Chrome APIs",
            detail:
              "Manifest V3 capabilities including Context Menus, Scripting, Clipboard, and Storage APIs connect the extraction workflow to the browser.",
            technique: "Browser Integration",
          },
        ],
      },
      {
        type: "text",
        label: "DESIGN DECISIONS",
        content:
          "CodeDistill uses deterministic processing for predictable cleanup so common cases remain fast and independent of an API key. AI extraction is treated as a separate capability for mixed content where rule-based cleanup alone is not sufficient.",
      },
      {
        type: "text",
        label: "RESULT",
        content:
          "The extension provides a browser-native workflow for turning noisy copied material into executable code, with both a no-key deterministic path and an AI-assisted path for more complex content.",
      },
      {
        type: "text",
        label: "IMPLEMENTATION",
        content:
          "CodeDistill is implemented as a Chrome Extension Manifest V3 using JavaScript and Chrome Context Menus, Scripting, Clipboard, and Storage APIs. AI Copy Clean uses Gemini 2.5 Flash and requires internet access plus a valid locally stored Gemini API key.",
      },
    ],
    url: "https://github.com/Vrinda0211/CodeDistill",
  },

  container: {
    kicker: "Linux systems",
    title: "Lightweight Container Runtime",
    description:
      "A minimal Linux container runtime focused on process lifecycle management and kernel-level resource monitoring.",
    overview:
      "This project implements a lightweight Linux container runtime centered on process lifecycle management, multi-container execution, logging, and kernel-level resource monitoring. A supervisor manages container processes and metadata, while a kernel module communicates through IOCTL and monitors RSS memory to support soft warnings and hard memory-limit enforcement.",
    workflow: [
      {
        number: "01",
        title: "Start the Container",
        text:
          "The runtime supervisor creates and manages container processes and maintains metadata so multiple running containers can be tracked through the engine interface.",
      },
      {
        number: "02",
        title: "Capture Container Logs",
        text:
          "Container output is handled through a bounded-buffer producer/consumer logging mechanism so process output can be collected without allowing the log buffer to grow without limit.",
      },
      {
        number: "03",
        title: "Monitor Resources",
        text:
          "A kernel module communicates with user space through an IOCTL interface and monitors resident set size (RSS) memory usage for the managed processes.",
      },
      {
        number: "04",
        title: "Enforce Limits",
        text:
          "The runtime can issue soft memory-limit warnings and enforce a hard memory limit by terminating a process that exceeds the configured resource boundary.",
      },
    ],
    detection: [
      "Container lifecycle management",
      "Multi-container execution",
      "Container metadata tracking",
      "Bounded-buffer logging",
      "Kernel-user IOCTL communication",
      "RSS memory monitoring",
      "Soft memory-limit warnings",
      "Hard memory-limit enforcement",
      "CPU, memory, and I/O workloads",
    ],
    attackPatterns: [
      {
        name: "Process Lifecycle",
        detail:
          "A supervisor manages container processes and their lifecycle, while engine ps exposes metadata for running containers.",
        technique: "Process Management",
      },
      {
        name: "IOCTL Communication",
        detail:
          "The user-space runtime communicates with the kernel module through an IOCTL interface to access kernel-level monitoring functionality.",
        technique: "Kernel Interface",
      },
      {
        name: "RSS Memory Enforcement",
        detail:
          "The kernel module monitors resident set size and supports soft warnings followed by hard enforcement through process termination when the configured limit is exceeded.",
        technique: "Resource Control",
      },
    ],
    feedback:
      "The runtime focuses on demonstrating Linux process and resource-management mechanisms rather than attempting to reproduce the full isolation model of a production container platform.",
    response:
      "The implemented system provides container lifecycle management, multi-container tracking, bounded logging, kernel-assisted RSS monitoring, and memory-limit enforcement.",
    observability:
      "The project includes CPU, memory, and I/O workload programs for exercising the runtime and resource-monitoring behavior, along with process and container metadata exposed by the supervisor.",
    tags: [
      "C",
      "Linux Kernel Modules",
      "System Programming",
    ],
    sections: [
      {
        type: "text",
        label: "OVERVIEW",
        content:
          "This project implements a lightweight Linux container runtime centered on process lifecycle management, multi-container execution, logging, and kernel-level resource monitoring. A supervisor manages container processes and metadata, while a kernel module communicates through IOCTL and monitors RSS memory to support soft warnings and hard memory-limit enforcement.",
      },
      {
        type: "workflow",
        label: "HOW IT WORKS",
        items: [
          {
            number: "01",
            title: "Start the Container",
            text:
              "The runtime supervisor creates and manages container processes and maintains metadata so multiple running containers can be tracked through the engine interface.",
          },
          {
            number: "02",
            title: "Capture Container Logs",
            text:
              "Container output is handled through a bounded-buffer producer/consumer logging mechanism so process output can be collected without allowing the log buffer to grow without limit.",
          },
          {
            number: "03",
            title: "Monitor Resources",
            text:
              "A kernel module communicates with user space through an IOCTL interface and monitors resident set size (RSS) memory usage for the managed processes.",
          },
          {
            number: "04",
            title: "Enforce Limits",
            text:
              "The runtime can issue soft memory-limit warnings and enforce a hard memory limit by terminating a process that exceeds the configured resource boundary.",
          },
        ],
      },
      {
        type: "list",
        label: "FEATURES",
        items: [
          "Container lifecycle management",
          "Multi-container execution",
          "Container metadata tracking",
          "Bounded-buffer logging",
          "Kernel-user IOCTL communication",
          "RSS memory monitoring",
          "Soft memory-limit warnings",
          "Hard memory-limit enforcement",
          "CPU, memory, and I/O workloads",
        ],
      },
      {
        type: "patterns",
        label: "KEY TECHNICAL DETAILS",
        items: [
          {
            name: "Process Lifecycle",
            detail:
              "A supervisor manages container processes and their lifecycle, while engine ps exposes metadata for running containers.",
            technique: "Process Management",
          },
          {
            name: "IOCTL Communication",
            detail:
              "The user-space runtime communicates with the kernel module through an IOCTL interface to access kernel-level monitoring functionality.",
            technique: "Kernel Interface",
          },
          {
            name: "RSS Memory Enforcement",
            detail:
              "The kernel module monitors resident set size and supports soft warnings followed by hard enforcement through process termination when the configured limit is exceeded.",
            technique: "Resource Control",
          },
        ],
      },
      {
        type: "text",
        label: "DESIGN DECISIONS",
        content:
          "The runtime focuses on demonstrating Linux process and resource-management mechanisms rather than attempting to reproduce the full isolation model of a production container platform. Kernel-level monitoring is separated from the user-space supervisor through an explicit IOCTL interface.",
      },
      {
        type: "text",
        label: "RESULT",
        content:
          "The implemented system provides container lifecycle management, multi-container tracking, bounded logging, kernel-assisted RSS monitoring, and memory-limit enforcement.",
      },
      {
        type: "text",
        label: "IMPLEMENTATION",
        content:
          "The runtime is implemented in C with a user-space supervisor and a Linux kernel module connected through IOCTL. CPU, memory, and I/O workload programs are included to exercise the runtime and its resource-monitoring behavior.",
      },
    ],
    url: "https://github.com/Vrinda0211/Container-Runtime",
  },
};

function initNeuralVortex() {
  if (!canvas) return;

  const gl =
    canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl");

  if (!gl) return;

  const vertexSource = `
    precision mediump float;
    attribute vec2 a_position;
    varying vec2 vUv;

    void main() {
      vUv = .5 * (a_position + 1.);
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision mediump float;
    varying vec2 vUv;
    uniform float u_time;
    uniform float u_ratio;
    uniform vec2 u_pointer_position;
    uniform float u_scroll_progress;

    vec2 rotate(vec2 uv, float th) {
      return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
    }

    float neuro_shape(vec2 uv, float t, float p) {
      vec2 sine_acc = vec2(0.);
      vec2 res = vec2(0.);
      float scale = 8.;

      for (int j = 0; j < 15; j++) {
        uv = rotate(uv, 1.);
        sine_acc = rotate(sine_acc, 1.);

        vec2 layer = uv * scale + float(j) + sine_acc - t;

        sine_acc += sin(layer) + 2.4 * p;
        res += (.5 + .5 * cos(layer)) / scale;

        scale *= (1.2);
      }

      return res.x + res.y;
    }

    void main() {
      vec2 uv = .5 * vUv;
      uv.x *= u_ratio;

      vec2 pointer = vUv - u_pointer_position;
      pointer.x *= u_ratio;

      float p = clamp(length(pointer), 0., 1.);
      p = .5 * pow(1. - p, 2.);

      float t = .001 * u_time;
      float noise = neuro_shape(uv, t, p);

      noise = 1.2 * pow(noise, 3.);
      noise += pow(noise, 10.);
      noise = max(.0, noise - .5);
      noise *= (1. - length(vUv - .5));

      vec3 color = vec3(0.5, 0.15, 0.65);

      color = mix(
        color,
        vec3(0.02, 0.7, 0.9),
        0.32 + 0.16 * sin(2.0 * u_scroll_progress + 1.2)
      );

      color += vec3(0.15, 0.0, 0.6) *
        sin(2.0 * u_scroll_progress + 1.5);

      color += vec3(0.12, 0.35, 0.18) *
        smoothstep(0.18, 0.82, vUv.x);

      color = color * noise;

      gl_FragColor = vec4(color, noise);
    }
  `;

  function compileShader(source, type) {
    const shader = gl.createShader(type);

    if (!shader) return;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  const vertexShader = compileShader(
    vertexSource,
    gl.VERTEX_SHADER
  );

  const fragmentShader = compileShader(
    fragmentSource,
    gl.FRAGMENT_SHADER
  );

  if (!vertexShader || !fragmentShader) return;

  const program = gl.createProgram();

  if (!program) return;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

  gl.useProgram(program);

  const vertices = new Float32Array([
    -1,
    -1,
    1,
    -1,
    -1,
    1,
    1,
    1,
  ]);

  const vertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  gl.bufferData(
    gl.ARRAY_BUFFER,
    vertices,
    gl.STATIC_DRAW
  );

  const positionLocation = gl.getAttribLocation(
    program,
    "a_position"
  );

  gl.enableVertexAttribArray(positionLocation);

  gl.vertexAttribPointer(
    positionLocation,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );

  const uTime = gl.getUniformLocation(
    program,
    "u_time"
  );

  const uRatio = gl.getUniformLocation(
    program,
    "u_ratio"
  );

  const uPointerPosition = gl.getUniformLocation(
    program,
    "u_pointer_position"
  );

  const uScrollProgress = gl.getUniformLocation(
    program,
    "u_scroll_progress"
  );

  const reducedMotion = window
    .matchMedia("(prefers-reduced-motion: reduce)")
    .matches;

  function resizeCanvas() {
    const devicePixelRatio = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    canvas.width = Math.floor(
      window.innerWidth * devicePixelRatio
    );

    canvas.height = Math.floor(
      window.innerHeight * devicePixelRatio
    );

    gl.viewport(
      0,
      0,
      canvas.width,
      canvas.height
    );

    gl.uniform1f(
      uRatio,
      canvas.width / canvas.height
    );
  }

  function render() {
    pointer.x +=
      (pointer.targetX - pointer.x) * 0.2;

    pointer.y +=
      (pointer.targetY - pointer.y) * 0.2;

    gl.uniform1f(
      uTime,
      reducedMotion ? 0 : performance.now()
    );

    gl.uniform2f(
      uPointerPosition,
      pointer.x / window.innerWidth,
      1 - pointer.y / window.innerHeight
    );

    gl.uniform1f(
      uScrollProgress,
      window.scrollY / (2 * window.innerHeight)
    );

    gl.drawArrays(
      gl.TRIANGLE_STRIP,
      0,
      4
    );

    if (!reducedMotion) {
      animationFrame = requestAnimationFrame(render);
    }
  }

  function handlePointerMove(event) {
    pointer.targetX = event.clientX;
    pointer.targetY = event.clientY;
  }

  resizeCanvas();
  render();

  window.addEventListener(
    "resize",
    resizeCanvas
  );

  window.addEventListener(
    "pointermove",
    handlePointerMove
  );
}

function initThemeToggle() {
  const toggle =
    document.querySelector(".theme-toggle");

  if (!toggle) return;

  const storedTheme =
    localStorage.getItem("portfolio-theme");

  const prefersLight = window
    .matchMedia("(prefers-color-scheme: light)")
    .matches;

  const shouldUseLight = storedTheme
    ? storedTheme === "light"
    : prefersLight;

  function setTheme(theme) {
    const isLight = theme === "light";

    document.body.classList.toggle(
      "light-theme",
      isLight
    );

    toggle.setAttribute(
      "aria-pressed",
      String(isLight)
    );

    toggle.setAttribute(
      "aria-label",
      isLight
        ? "Toggle dark mode"
        : "Toggle light mode"
    );

    localStorage.setItem(
      "portfolio-theme",
      theme
    );
  }

  setTheme(
    shouldUseLight ? "light" : "dark"
  );

  toggle.addEventListener(
    "click",
    () => {
      setTheme(
        document.body.classList.contains(
          "light-theme"
        )
          ? "dark"
          : "light"
      );
    }
  );
}

function initScrollEffects() {
  const progress =
    document.querySelector(
      ".scroll-progress"
    );

  const revealItems =
    document.querySelectorAll(".reveal");

  function updateProgress() {
    if (!progress) return;

    const maxScroll =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const scrolled =
      maxScroll > 0
        ? (window.scrollY / maxScroll) * 100
        : 0;

    progress.style.width =
      `${scrolled}%`;
  }

  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.16,
      }
    );

  revealItems.forEach((item) =>
    observer.observe(item)
  );

  updateProgress();

  window.addEventListener(
    "scroll",
    updateProgress,
    {
      passive: true,
    }
  );
}

function initTiltCards() {
  const cards =
    document.querySelectorAll(
      ".tilt-card"
    );

  cards.forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        const rect =
          card.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
            rect.width -
          0.5;

        const y =
          (event.clientY - rect.top) /
            rect.height -
          0.5;

        card.style.transform =
          `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 7}deg) translateY(-4px)`;
      }
    );

    card.addEventListener(
      "pointerleave",
      () => {
        card.style.transform = "";
      }
    );
  });
}

function initProjectModal() {
  const modal =
    document.querySelector(
      ".project-modal"
    );

  const backdrop =
    document.querySelector(
      ".modal-backdrop"
    );

  const closeButton =
    document.querySelector(
      ".modal-close"
    );

  const title =
    document.getElementById(
      "modal-title"
    );

  const kicker =
    document.getElementById(
      "modal-kicker"
    );

  const description =
    document.getElementById(
      "modal-description"
    );

  const tags =
    document.querySelector(
      ".modal-tags"
    );

  const sections =
    document.getElementById(
      "modal-project-sections"
    );

  const link =
    document.querySelector(
      ".modal-link"
    );

  const cards =
    document.querySelectorAll(
      ".project-card"
    );

  if (
    !modal ||
    !backdrop ||
    !closeButton ||
    !title ||
    !kicker ||
    !description ||
    !tags ||
    !sections ||
    !link
  ) {
    return;
  }

  function createElement(
    tag,
    className,
    text
  ) {
    const element =
      document.createElement(tag);

    if (className) {
      element.className =
        className;
    }

    if (text !== undefined) {
      element.textContent = text;
    }

    return element;
  }

  function renderTextSection(section) {
    const element =
      createElement(
        "section",
        "modal-section modal-optional-section"
      );

    const label =
      createElement(
        "h3",
        "modal-section-label",
        section.label
      );

    const content =
      createElement(
        "p",
        "",
        section.content
      );

    element.append(
      label,
      content
    );

    return element;
  }

  function renderImageSection(
    section,
    project
  ) {
    const element =
      createElement(
        "section",
        "modal-section modal-diagram-section"
      );

    const label =
      createElement(
        "h3",
        "modal-section-label",
        section.label
      );

    const heading =
      createElement(
        "div",
        "architecture-heading"
      );

    const headingTitle =
      createElement(
        "h3",
        "",
        section.title ||
          "Architecture Diagram"
      );

    const headingDescription =
      createElement(
        "p",
        "",
        section.description || ""
      );

    heading.append(
      headingTitle,
      headingDescription
    );

    const diagram =
      createElement(
        "div",
        "architecture-diagram"
      );

    const image =
      createElement(
        "img",
        "architecture-image"
      );

    image.src = section.image;

    image.alt =
      `${project.title} architecture diagram`;

    image.loading = "eager";
    image.decoding = "async";

    diagram.appendChild(image);

    element.append(
      label,
      heading,
      diagram
    );

    return element;
  }

  function renderWorkflowSection(
    section
  ) {
    const element =
      createElement(
        "section",
        "modal-section modal-optional-section"
      );

    const label =
      createElement(
        "h3",
        "modal-section-label",
        section.label
      );

    const workflow =
      createElement(
        "div",
        "modal-workflow"
      );

    section.items.forEach(
      (step) => {
        const article =
          createElement(
            "article",
            "workflow-card"
          );

        const number =
          createElement(
            "span",
            "workflow-number",
            step.number
          );

        const stepTitle =
          createElement(
            "h3",
            "",
            step.title
          );

        const text =
          createElement(
            "p",
            "",
            step.text
          );

        article.append(
          number,
          stepTitle,
          text
        );

        workflow.appendChild(
          article
        );
      }
    );

    element.append(
      label,
      workflow
    );

    return element;
  }

  function renderListSection(
    section
  ) {
    const element =
      createElement(
        "section",
        "modal-section modal-optional-section"
      );

    const label =
      createElement(
        "h3",
        "modal-section-label",
        section.label
      );

    const grid =
      createElement(
        "div",
        "modal-detection-grid"
      );

    section.items.forEach(
      (item) => {
        grid.appendChild(
          createElement(
            "span",
            "detection-item",
            item
          )
        );
      }
    );

    element.append(
      label,
      grid
    );

    return element;
  }

  function renderPatternsSection(
    section
  ) {
    const element =
      createElement(
        "section",
        "modal-section modal-optional-section"
      );

    const label =
      createElement(
        "h3",
        "modal-section-label",
        section.label
      );

    const grid =
      createElement(
        "div",
        "modal-pattern-grid"
      );

    section.items.forEach(
      (pattern) => {
        const article =
          createElement(
            "article",
            "pattern-card"
          );

        const heading =
          createElement(
            "div",
            "pattern-heading"
          );

        const patternName =
          createElement(
            "h3",
            "",
            pattern.name
          );

        const technique =
          createElement(
            "span",
            "",
            pattern.technique
          );

        const detail =
          createElement(
            "p",
            "",
            pattern.detail
          );

        heading.append(
          patternName,
          technique
        );

        article.append(
          heading,
          detail
        );

        grid.appendChild(
          article
        );
      }
    );

    element.append(
      label,
      grid
    );

    return element;
  }

  function renderSection(
    section,
    project
  ) {
    let element = null;

    if (section.type === "image") {
      element = renderImageSection(
        section,
        project
      );
    }

    if (section.type === "workflow") {
      element = renderWorkflowSection(
        section
      );
    }

    if (section.type === "list") {
      element = renderListSection(
        section
      );
    }

    if (section.type === "patterns") {
      element = renderPatternsSection(
        section
      );
    }

    if (section.type === "text") {
      element = renderTextSection(
        section
      );
    }

    if (
      element &&
      [
        "OVERVIEW",
        "FEATURES",
        "KEY TECHNICAL DETAILS",
        "DESIGN DECISIONS",
      ].includes(section.label)
    ) {
      element.classList.add("modal-section-spaced");
    }

    return element;
  }

  function renderProjectSections(
    project
  ) {
    sections.replaceChildren();

    if (
      !Array.isArray(
        project.sections
      )
    ) {
      return;
    }

    project.sections.forEach(
      (section) => {
        const element =
          renderSection(
            section,
            project
          );

        if (element) {
          sections.appendChild(
            element
          );
        }
      }
    );
  }

  function openProject(card) {
    const projectId =
      card.dataset.project;

    const project =
      projects[projectId];

    if (!project) return;

    const rect =
      card.getBoundingClientRect();

    kicker.textContent =
      project.kicker;

    title.textContent =
      project.title;

    description.textContent =
      project.description;

    tags.replaceChildren(
      ...project.tags.map(
        (tag) =>
          createElement(
            "span",
            "",
            tag
          )
      )
    );

    link.href =
      project.url;

    renderProjectSections(
      project
    );

    modal.style.setProperty(
      "--card-left",
      `${rect.left}px`
    );

    modal.style.setProperty(
      "--card-top",
      `${rect.top}px`
    );

    modal.style.setProperty(
      "--card-width",
      `${rect.width}px`
    );

    modal.style.setProperty(
      "--card-height",
      `${rect.height}px`
    );

    document.body.classList.add(
      "modal-open"
    );

    modal.classList.add(
      "active"
    );

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    closeButton.focus();
  }

  function closeProject() {
    modal.classList.remove(
      "active"
    );

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );
  }

  cards.forEach((card) => {
    card.addEventListener(
      "click",
      () => openProject(card)
    );
  });

  backdrop.addEventListener(
    "click",
    closeProject
  );

  closeButton.addEventListener(
    "click",
    closeProject
  );

  window.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        modal.classList.contains(
          "active"
        )
      ) {
        closeProject();
      }
    }
  );
}

initNeuralVortex();
initThemeToggle();
initScrollEffects();
initTiltCards();
initProjectModal();