const canvas = document.getElementById("neuro");
const pointer = {
  x: 0,
  y: 0,
  targetX: window.innerWidth * 0.5,
  targetY: window.innerHeight * 0.5,
};
let animationFrame = null;

const projects = {
  soc: {
    kicker: "Cyber security + agents",
    title: "Multi-Agent SOC Analyst Assistant",

    description:
      "An agentic Security Operations Center assistant that coordinates triage, investigation, and response through a stateful LangGraph workflow, combining security telemetry, historical behavior, MITRE ATT&CK mapping, and context-aware remediation.",

    diagram: "assets/soc-architecture.png",

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

    url: "https://github.com/Vrinda0211/AgenticAI-MultiAgent-SOC",
  },

  vertex: {
    kicker: "Realtime collaboration",
    title: "Vertex",
    description:
      "A collaborative code editor with concurrent state synchronization, operational transformation for conflicting edits, and a context-aware AI pair programmer.",
    tags: [
      "Python",
      "FastAPI",
      "WebSockets",
      "Operational Transformation",
      "CodeMirror",
      "Gemini API",
    ],
    url: "https://github.com/Vrinda0211/Vertex",
  },

  caskdb: {
    kicker: "Storage systems",
    title: "CaskDB",
    description:
      "A persistent key-value storage engine built around write-ahead logging, crash recovery, sorted memtables, immutable SSTables, and multi-file compaction.",
    tags: ["C++17", "Write-Ahead Logging", "SSTables", "File I/O"],
    url: "https://github.com/Vrinda0211/CaskDB",
  },

  sdn: {
    kicker: "Networks",
    title: "SDN Link Failure Recovery",
    description:
      "A fault-tolerant SDN controller that detects link failures, recomputes shortest paths, invalidates stale flow rules, and reroutes traffic.",
    tags: ["Python", "Ryu", "Mininet", "OpenFlow", "BFS", "SDN"],
    url: "https://github.com/Vrinda0211/SDN-Link-Failure-Recovery",
  },

  codedistill: {
    kicker: "Developer tools",
    title: "CodeDistill",
    description:
      "A Chrome extension that extracts executable code from noisy web content using deterministic text normalization and AI-assisted extraction.",
    tags: ["JavaScript", "Chrome Extension APIs", "Prompt Engineering"],
    url: "https://github.com/Vrinda0211/CodeDistill",
  },

  container: {
    kicker: "Linux systems",
    title: "Lightweight Container Runtime",
    description:
      "A minimal Linux container runtime focused on process lifecycle management and kernel-level resource monitoring.",
    tags: ["C", "Linux Kernel Modules", "System Programming"],
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
      return mat2(
        cos(th),
        sin(th),
        -sin(th),
        cos(th)
      ) * uv;
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

        scale *= 1.2;
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

      color +=
        vec3(0.15, 0.0, 0.6) *
        sin(2.0 * u_scroll_progress + 1.5);

      color +=
        vec3(0.12, 0.35, 0.18) *
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
      animationFrame =
        requestAnimationFrame(render);
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

  const prefersLight =
    window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

  const shouldUseLight =
    storedTheme
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
    shouldUseLight
      ? "light"
      : "dark"
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
    document.querySelector(".scroll-progress");

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

    progress.style.width = `${scrolled}%`;
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

        card.style.transform = `
          perspective(900px)
          rotateX(${y * -5}deg)
          rotateY(${x * 7}deg)
          translateY(-4px)
        `;
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
    document.querySelector(".project-modal");

  const backdrop =
    document.querySelector(".modal-backdrop");

  const closeButton =
    document.querySelector(".modal-close");

  const title =
    document.getElementById("modal-title");

  const kicker =
    document.getElementById("modal-kicker");

  const description =
    document.getElementById(
      "modal-description"
    );

  const tags =
    document.querySelector(".modal-tags");

  const link =
    document.querySelector(".modal-link");

  const overview =
    document.getElementById(
      "modal-overview"
    );

  const workflow =
    document.getElementById(
      "modal-workflow"
    );

  const detection =
    document.getElementById(
      "modal-detection"
    );

  const patterns =
    document.getElementById(
      "modal-patterns"
    );

  const feedback =
    document.getElementById(
      "modal-feedback"
    );

  const response =
    document.getElementById(
      "modal-response"
    );

  const copilot =
    document.getElementById(
      "modal-copilot"
    );

  const observability =
    document.getElementById(
      "modal-observability"
    );

  const diagram =
    document.getElementById(
      "modal-diagram"
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
    !link
  ) {
    return;
  }

  function toggleSection(
    id,
    hasContent
  ) {
    const section =
      document.getElementById(id);

    if (section) {
      section.hidden = !hasContent;
    }
  }

  function openProject(card) {
    const projectId =
      card.dataset.project;

    const project =
      projects[projectId];

    if (!project) return;

    const rect =
      card.getBoundingClientRect();

    /* Main project information */

    kicker.textContent =
      project.kicker;

    title.textContent =
      project.title;

    description.textContent =
      project.description;

    /* Technology tags */

    tags.replaceChildren(
      ...project.tags.map(
        (tag) => {
          const item =
            document.createElement(
              "span"
            );

          item.textContent =
            tag;

          return item;
        }
      )
    );

    /* GitHub link */

    link.href =
      project.url;

    /* Architecture diagram */

    if (
      diagram &&
      project.diagram
    ) {
      diagram.src =
        project.diagram;

      diagram.alt =
        `${project.title} architecture diagram`;

      diagram.hidden = false;

      toggleSection(
        "modal-diagram-section",
        true
      );
    } else {
      if (diagram) {
        diagram.removeAttribute(
          "src"
        );

        diagram.hidden = true;
      }

      toggleSection(
        "modal-diagram-section",
        false
      );
    }

    /* Overview */

    if (overview) {
      overview.textContent =
        project.overview || "";

      toggleSection(
        "modal-overview-section",
        Boolean(project.overview)
      );
    }

    /* Agent workflow */

    if (workflow) {
      workflow.replaceChildren();

      if (project.workflow?.length) {
        project.workflow.forEach(
          (step) => {
            const article =
              document.createElement(
                "article"
              );

            article.className =
              "workflow-card";

            const number =
              document.createElement(
                "span"
              );

            number.className =
              "workflow-number";

            number.textContent =
              step.number;

            const heading =
              document.createElement(
                "h3"
              );

            heading.textContent =
              step.title;

            const text =
              document.createElement(
                "p"
              );

            text.textContent =
              step.text;

            article.append(
              number,
              heading,
              text
            );

            workflow.appendChild(
              article
            );
          }
        );
      }

      toggleSection(
        "modal-workflow-section",
        Boolean(
          project.workflow?.length
        )
      );
    }

    /* Detection capabilities */

    if (detection) {
      detection.replaceChildren();

      if (project.detection?.length) {
        project.detection.forEach(
          (item) => {
            const element =
              document.createElement(
                "span"
              );

            element.className =
              "detection-item";

            element.textContent =
              item;

            detection.appendChild(
              element
            );
          }
        );
      }

      toggleSection(
        "modal-detection-section",
        Boolean(
          project.detection?.length
        )
      );
    }

    /* Attack patterns */

    if (patterns) {
      patterns.replaceChildren();

      if (
        project.attackPatterns?.length
      ) {
        project.attackPatterns.forEach(
          (pattern) => {
            const article =
              document.createElement(
                "article"
              );

            article.className =
              "pattern-card";

            const heading =
              document.createElement(
                "div"
              );

            heading.className =
              "pattern-heading";

            const name =
              document.createElement(
                "h3"
              );

            name.textContent =
              pattern.name;

            const technique =
              document.createElement(
                "span"
              );

            technique.textContent =
              pattern.technique;

            const detail =
              document.createElement(
                "p"
              );

            detail.textContent =
              pattern.detail;

            heading.append(
              name,
              technique
            );

            article.append(
              heading,
              detail
            );

            patterns.appendChild(
              article
            );
          }
        );
      }

      toggleSection(
        "modal-patterns-section",
        Boolean(
          project.attackPatterns?.length
        )
      );
    }

    /* Remaining sections */

    if (feedback) {
      feedback.textContent =
        project.feedback || "";

      toggleSection(
        "modal-feedback-section",
        Boolean(project.feedback)
      );
    }

    if (response) {
      response.textContent =
        project.response || "";

      toggleSection(
        "modal-response-section",
        Boolean(project.response)
      );
    }

    if (copilot) {
      copilot.textContent =
        project.copilot || "";

      toggleSection(
        "modal-copilot-section",
        Boolean(project.copilot)
      );
    }

    if (observability) {
      observability.textContent =
        project.observability || "";

      toggleSection(
        "modal-observability-section",
        Boolean(
          project.observability
        )
      );
    }

    /*
     * Preserve the card-to-modal
     * expansion animation.
     * Final modal dimensions
     * are handled by CSS.
     */

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