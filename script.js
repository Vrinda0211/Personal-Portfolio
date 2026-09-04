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
    tags: [
      "C++17",
      "Write-Ahead Logging",
      "SSTables",
      "File I/O",
    ],
    url: "https://github.com/Vrinda0211/CaskDB",
  },

  sdn: {
    kicker: "Networks",
    title: "SDN Link Failure Recovery",
    description:
      "A fault-tolerant SDN controller that detects link failures, recomputes shortest paths, invalidates stale flow rules, and reroutes traffic.",
    tags: [
      "Python",
      "Ryu",
      "Mininet",
      "OpenFlow",
      "BFS",
      "SDN",
    ],
    url: "https://github.com/Vrinda0211/SDN-Link-Failure-Recovery",
  },

  codedistill: {
    kicker: "Developer tools",
    title: "CodeDistill",
    description:
      "A Chrome extension that extracts executable code from noisy web content using deterministic text normalization and AI-assisted extraction.",
    tags: [
      "JavaScript",
      "Chrome Extension APIs",
      "Prompt Engineering",
    ],
    url: "https://github.com/Vrinda0211/CodeDistill",
  },

  container: {
    kicker: "Linux systems",
    title: "Lightweight Container Runtime",
    description:
      "A minimal Linux container runtime focused on process lifecycle management and kernel-level resource monitoring.",
    tags: [
      "C",
      "Linux Kernel Modules",
      "System Programming",
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

    if (!shader) return null;

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