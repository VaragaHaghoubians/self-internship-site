const base = "..";

const state = {
  month: Number(localStorage.getItem("selectedMonth") || 1),
  done: JSON.parse(localStorage.getItem("completedMonths") || "[]"),
  projectGroup: "foundations",
  resourceFilter: "all",
  query: "",
  labId: localStorage.getItem("selectedLab") || "month-01",
  labPassed: JSON.parse(localStorage.getItem("passedLabs") || "[]"),
  lastOutput: "",
  pythonLessonId: localStorage.getItem("selectedPythonLesson") || "py-01",
  pythonLessonsDone: JSON.parse(localStorage.getItem("donePythonLessons") || "[]"),
  pythonLessonOutput: "",
  skillTrack: localStorage.getItem("selectedSkillTrack") || "sql",
  skillLessonId: localStorage.getItem("selectedSkillLesson") || "sql-01",
  skillLessonsDone: JSON.parse(localStorage.getItem("doneSkillLessons") || "[]"),
  skillLessonOutput: "",
  setupDone: JSON.parse(localStorage.getItem("setupChecklistDone") || "[]"),
  evidence: JSON.parse(localStorage.getItem("portfolioEvidence") || "[]"),
  glossaryQuery: "",
  githubRepoBase: localStorage.getItem("githubRepoBase") || "",
  githubBranch: localStorage.getItem("githubBranch") || "main",
  applications: JSON.parse(localStorage.getItem("careerApplications") || "[]"),
  interviewPracticed: JSON.parse(localStorage.getItem("interviewPracticed") || "{}"),
  applyChecks: JSON.parse(localStorage.getItem("applyChecks") || "{}"),
};

const superpowers = [
  {
    title: "Optimization",
    text: "Prediction says what may happen. Optimization decides the best action under constraints.",
    bullets: ["OR-Tools for routing and assignment", "PuLP for linear programs", "Capstone inventory transfer plan"],
  },
  {
    title: "Predictive Maintenance",
    text: "Use sensor and machine data to predict failure before it becomes expensive downtime.",
    bullets: ["NASA CMAPSS style RUL modeling", "IoT temperature and humidity pipeline", "Cold-chain anomaly detection"],
  },
  {
    title: "Enterprise AI Systems",
    text: "Turn models into dashboards, alerts, workflows, and business decisions that managers can use.",
    bullets: ["Django and PostgreSQL platform", "Celery background jobs", "ROI and financial risk panels"],
  },
  {
    title: "Multi-Skill Builder",
    text: "In 2026, single-skill specialists are the most exposed to automation. The most valuable people combine data + engineering + AI + business thinking into one profile.",
    bullets: ["Python + SQL + Docker + Django + IoT + LLMs + Agents — all 12 months", "Every project frames outcomes in cost, risk, or efficiency — not just code", "Automation-first: background jobs, CI/CD, and agents remove manual work"],
  },
  {
    title: "AI-Native Problem Solver",
    text: "AI is raising the minimum standard for every role. Knowing how to use AI to learn faster, review AI output critically, and build on top of AI is now a baseline skill.",
    bullets: ["Use AI as a co-developer — prompt, evaluate, improve, ship", "Evaluate AI outputs: hallucination, bias, cost, and safety awareness", "Build AI products with product thinking: user, value, metric, iteration"],
  },
];

const startChecklistItems = [
  ["read-root", "Read the root roadmap once end to end", "Open the clean README reader and understand the 12-month path before coding."],
  ["install-python", "Install Python 3.11+ and VS Code", "Needed for local project work, even though browser labs cover beginner practice."],
  ["install-git", "Install Git and create a GitHub account", "Every project should become a clean GitHub repo with a README."],
  ["ubuntu-plan", "Prepare Ubuntu VM or Linux environment", "Docker, Redis, cloud workflows, and ML tools are easier on Linux."],
  ["open-python-lab", "Finish Python lesson 1 in this website", "This proves the run/submit/save loop works."],
  ["create-daily-habit", "Save one daily log", "Use daily logs as your internship journal and later resume evidence."],
  ["portfolio-folder", "Create a portfolio evidence habit", "After every deliverable, save metrics, screenshots, command output, and demo links here."],
  ["hardware-list", "Buy or plan ESP32/DHT11 hardware before Month 7", "Hardware is needed later, but you can start the software path now."],
];

const glossary = [
  ["API", "A contract that lets one program talk to another. In this roadmap, FastAPI exposes your ML model through endpoints like /predict."],
  ["Endpoint", "A URL path that accepts a request and returns a response, such as POST /predict."],
  ["CLI", "Command-line interface. A program you run from the terminal using commands and arguments."],
  ["Virtual environment", "An isolated Python environment so each project has its own dependencies."],
  ["Git commit", "A saved snapshot of your code with a message explaining what changed."],
  ["Branch", "A separate line of work in Git, useful for features or experiments."],
  ["SQL", "The language used to query relational databases."],
  ["JOIN", "SQL operation that combines rows from related tables."],
  ["CTE", "Common Table Expression. A named temporary query using WITH, useful for readable SQL."],
  ["Docker image", "A packaged template for running an app with its environment."],
  ["Docker container", "A running instance of a Docker image."],
  ["CI/CD", "Automated testing and deployment workflow, usually triggered by pushing code."],
  ["MVT", "Django pattern: Model, View, Template."],
  ["ORM", "Object Relational Mapper. Lets you work with database rows as Python objects."],
  ["Celery", "Python background task system for long-running jobs like ML inference or file processing."],
  ["Redis", "Fast in-memory service often used as a queue/broker for Celery."],
  ["MQTT", "Lightweight messaging protocol often used for IoT devices."],
  ["ESP32", "WiFi-capable microcontroller used to send sensor readings to your backend."],
  ["MLOps", "Engineering practices for deploying, tracking, monitoring, and maintaining ML systems."],
  ["RAG", "Retrieval-Augmented Generation. Retrieve relevant documents, then ask an LLM to answer using them."],
  ["Embedding", "A numeric vector representation of text, used for similarity search."],
  ["Vector database", "Database optimized for storing embeddings and retrieving similar items."],
  ["Agent", "An LLM system that can call tools, observe results, and decide what to do next."],
  ["OR-Tools", "Google library for operations research problems like routing, assignment, and scheduling."],
  ["PuLP", "Python library for linear programming optimization models."],
  ["RUL", "Remaining Useful Life. Predictive maintenance target estimating how long a machine has before failure."],
  ["MCP", "Model Context Protocol. An open standard by Anthropic for connecting LLM agents to external tools, APIs, and data sources through a uniform interface."],
  ["LangGraph", "A graph-based agent orchestration library built on LangChain. Agents are modeled as nodes in a state machine graph, with conditional edges deciding the next step."],
  ["ReAct", "Reasoning + Acting. A prompting pattern where the LLM alternates between thinking (Reason) and doing (Act/tool call) in a loop until it reaches an answer."],
  ["Chain of Thought", "A prompting technique where the model writes out intermediate reasoning steps before giving a final answer. Significantly improves performance on complex tasks."],
  ["Test-time compute", "Letting a model 'think longer' at inference time (more tokens, more reasoning steps) to improve answer quality. Used by o1, o3, and DeepSeek-R1 style models."],
  ["Computer-use agent", "An AI agent that controls a GUI by observing screenshots and taking mouse/keyboard actions, without needing an API."],
  ["Voice agent", "An AI pipeline that listens to speech (ASR), processes with an LLM, and speaks back (TTS) in near real-time."],
  ["DeepEval", "An open-source LLM evaluation framework. Write unit-test-style assertions for LLM outputs: correctness, faithfulness, hallucination, relevancy."],
  ["RAGAS", "Retrieval-Augmented Generation Assessment. A framework that automatically evaluates RAG pipelines using LLM-as-judge for faithfulness and answer relevancy."],
  ["PromptFoo", "An open-source CLI and library for comparing prompt versions, model outputs, and running adversarial tests at scale."],
  ["Guardrails AI", "A Python library that validates LLM output structure and content: enforces schema, filters toxic content, and retries on validation failure."],
  ["Digital twin", "A software simulation of a physical system (machine, factory, supply chain) that mirrors the real system and lets you test changes before applying them."],
  ["A2A", "Agent-to-Agent protocol. An emerging standard (Google) for one AI agent to call another AI agent, analogous to how MCP connects agents to tools."],
  ["Sandbox", "An isolated code execution environment where untrusted code runs safely. Used in code agents so the LLM-generated code cannot damage the host system."],
  ["LoRA", "Low-Rank Adaptation. A fine-tuning method that adds small trainable matrices to a frozen model, reducing GPU memory and compute cost dramatically."],
  ["vLLM", "A high-throughput LLM serving library using PagedAttention for efficient GPU memory management. Standard tool for production LLM API servers."],
];

const blockers = [
  ["Python import error", "Check that the package is installed in the same environment you are running. In terminal: python -m pip install package_name."],
  ["Code works in browser but not locally", "Browser Python is isolated. Local projects may need files, packages, paths, or environment variables."],
  ["Git push fails", "Check remote URL, branch name, and authentication. Run git status and git remote -v first."],
  ["Docker build fails", "Read the first real error above the final failure. Most issues are wrong file paths, missing requirements, or package install errors."],
  ["FastAPI endpoint not reachable", "Confirm uvicorn is running, the port is correct, and your request path matches the decorator."],
  ["Django migration confusion", "After changing models: python manage.py makemigrations, then python manage.py migrate."],
  ["Celery task not running", "You need Redis/broker running, the Celery worker running, and Django configured to send the task."],
  ["ESP32 cannot connect WiFi", "Check SSID/password, 2.4 GHz network, serial monitor logs, and power cable quality."],
  ["ML metric is bad", "First verify data leakage, target definition, train/test split, missing values, and baseline performance."],
  ["LLM/RAG answer is wrong", "Inspect retrieved chunks before blaming the model. Bad retrieval usually causes bad generation."],
  ["Agent loops infinitely", "Add max_iterations (e.g. 15) and a step counter. Log every tool call. Most infinite loops mean the agent cannot parse a tool result or keeps retrying a failing step."],
  ["Tool call returns wrong format", "Validate tool output before returning it to the agent. Use Pydantic models for tool return types. The LLM will hallucinate if it gets unexpected JSON keys."],
  ["Voice agent has high latency", "Measure each stage separately: ASR latency, LLM latency, TTS latency. Use streaming for TTS and LLM. Target under 800ms end-to-end for a good experience."],
  ["Prompt injection in agent", "An untrusted input (web page, email, document) tells your agent to do something the user did not intend. Always sanitize inputs before passing to the agent and add a validation layer."],
  ["Code agent breaks out of sandbox", "Never run agent-generated code on the host machine without a sandbox (E2B, Docker, Modal). Set CPU and memory limits. Block network access inside the sandbox."],
  ["Fine-tuning makes model worse", "Most fine-tuning failures are data problems: too few examples, wrong format, or contaminated labels. Start with 100 clean, diverse examples before scaling."],
];

// Months that matter most if your focus is AI Agents + Industrial Engineering
// Toggle the 🎯 filter button in each roadmap section to highlight these.
const fastTrackIds = new Set([1, 2, 3, 9, 10, 11, 12, 15, 17, 19, 25, 26, 27, 28, 29, 30]);

const months = [
  {
    id: 1,
    phase: "Phase 1",
    title: "Advanced Python and Version Control",
    focus: "Python OOP, virtual environments, Git, clean READMEs",
    beginner: "This month changes how you think about code. A beginner writes one script that only works once. An engineer creates a small tool with functions, classes, setup instructions, and version history.",
    learn: ["Classes, methods, __init__, inheritance", "venv or conda environments", "Git branches, merges, conflict resolution", "README files that explain setup and usage", "Pandas and NumPy: loading, filtering, groupby, and reshaping DataFrames — the daily tools of every data role", "Matplotlib and Seaborn: distributions, scatter plots, and correlation heatmaps for exploratory data analysis (EDA)"],
    build: "A Python CLI tool that cleans a messy CSV from terminal commands.",
    study: "phase-1-software-engineering/month-01-python-oop-git/resources/",
    references: ["knowledge-base/zero-to-hero-guides/python/", "knowledge-base/zero-to-hero-guides/git/", "knowledge-base/zero-to-hero-guides/linux/"],
    job: "Start building proof that you can write maintainable Python, not just notebooks.",
    weeks: [
      { week: 1, title: "Python OOP basics", tasks: ["Read python_zero_to_hero.py sections 1-5", "Practice classes and __init__", "Complete Python lessons 1-5 on this site", "Load a CSV with Pandas: check .shape, .dtypes, .isnull().sum(), and .describe() — this is your first EDA ritual"] },
      { week: 2, title: "Git & GitHub", tasks: ["Install Git, create GitHub account", "Practice git add, commit, push", "Create your first public repo with a README"] },
      { week: 3, title: "Virtual environments", tasks: ["Create a venv for your project", "Add requirements.txt", "Practice activating and deactivating"] },
      { week: 4, title: "Build CSV cleaner", tasks: ["Write the CLI tool with argparse", "Add classes for loading, cleaning, saving", "Push to GitHub with a clean README"] },
    ],
  },
  {
    id: 2,
    phase: "Phase 1",
    title: "Databases and Web Foundations",
    focus: "Advanced SQL, FastAPI, HTTP basics, ML as an API",
    beginner: "You learn that a model is not useful until another system can call it. SQL gives you reliable data access. FastAPI gives your model a doorway to the outside world. A reality check on priorities: 95% of business problems are solved with clean SQL, a well-designed A/B test, and a logistic regression you can explain coefficient-by-coefficient — none of these need a neural network. Master these boring fundamentals first. They are what hiring managers actually test in DS interviews.",
    learn: ["SQL joins, CTEs, window functions", "GET and POST requests", "FastAPI endpoints and request bodies", "Testing endpoints with curl or Postman", "Hypothesis testing: t-tests, chi-squared, p-values, and statistical significance for real business questions", "A/B test design: defining the metric, minimum detectable effect, sample size calculation, and interpreting ambiguous results"],
    build: "Wrap an ML model in FastAPI with a /predict endpoint that accepts JSON and returns a prediction.",
    study: "phase-1-software-engineering/month-02-databases-web/resources/",
    references: ["projects/foundations/project-1-customer-churn/", "projects/foundations/project-2-sales-analysis/", "knowledge-base/zero-to-hero-guides/sql/"],
    job: "After this month, start applying for Data Analyst and Junior Data Scientist roles for interview practice.",
    weeks: [
      { week: 5, title: "SQL fundamentals", tasks: ["Complete SQL lessons 1-3 on this site", "Practice SELECT, JOIN, GROUP BY", "Query a local SQLite database"] },
      { week: 6, title: "Advanced SQL + statistics", tasks: ["Complete SQL lessons 4-6 on this site", "Practice window functions and CTEs", "Write a business KPI query", "Use Python (scipy.stats) to run a t-test on a grouped SQL result — e.g. compare conversion rates between two user segments"] },
      { week: 7, title: "FastAPI basics", tasks: ["Install FastAPI and uvicorn", "Build a GET and POST endpoint", "Test with the /docs page"] },
      { week: 8, title: "ML as an API", tasks: ["Train a logistic regression with scikit-learn on a tabular dataset and interpret each coefficient", "Save the model with joblib and wrap it in a FastAPI /predict endpoint", "Test with curl or Postman and document the feature inputs"] },
    ],
  },
  {
    id: 3,
    phase: "Phase 2",
    title: "Docker and MLOps Basics",
    focus: "Containers, Docker Compose, MLflow, reproducibility",
    beginner: "Docker packages your app with its environment so it runs the same way elsewhere. MLOps tracks which data, parameters, code, and model produced a result.",
    learn: ["Dockerfile, docker build, docker run", "Ports, volumes, and container logs", "MLflow experiments, metrics, and parameters", "Model versioning and reproducibility", "Scikit-learn pipeline: train/test split, cross-validation, GridSearchCV, and feature importance — the production ML workflow", "Model evaluation: precision, recall, F1, ROC-AUC, and how to explain each metric to a non-technical stakeholder"],
    build: "Train a scikit-learn classification model with experiment tracking in MLflow, then serve it inside a Docker container.",
    study: "phase-2-production-ml/month-03-docker-mlops/resources/",
    references: ["projects/foundations/project-3-house-price-pipeline/", "knowledge-base/zero-to-hero-guides/docker/"],
    job: "This is a common frustration point. Finishing the container matters more than making it elegant.",
    weeks: [
      { week: 9,  title: "Docker basics", tasks: ["Install Docker Desktop", "Run hello-world container", "Complete Docker lessons on this site"] },
      { week: 10, title: "Dockerfile for ML", tasks: ["Write a Dockerfile for your FastAPI app", "Build and run the image locally", "Check the /predict endpoint inside the container"] },
      { week: 11, title: "Scikit-learn + MLflow tracking", tasks: ["Train a scikit-learn classifier (logistic regression vs. random forest) on a real dataset", "Log hyperparameters, accuracy, precision, recall, and F1 to MLflow for each run", "Compare both model runs in the MLflow UI and write one sentence explaining which to deploy and why"] },
      { week: 12, title: "Containerize pipeline", tasks: ["Add Docker Compose for app + any services", "Test the full stack with docker compose up", "Push your image to Docker Hub"] },
    ],
  },
  {
    id: 4,
    phase: "Phase 2",
    title: "Cloud Computing and CI/CD",
    focus: "Linux server, SSH, GitHub Actions, cloud deployment",
    beginner: "Deployment means your app is no longer only on your laptop. CI/CD means every push can be tested and prepared for release automatically.",
    learn: ["AWS EC2 or GCP VM basics", "SSH keys and server security groups", "GitHub Actions workflow files", "Deploying Docker to a remote Linux server"],
    build: "Deploy your Dockerized ML API to a free-tier cloud server with an internet-accessible /predict endpoint.",
    study: "phase-2-production-ml/month-04-cloud-cicd/resources/",
    references: ["projects/foundations/project-4-news-classification/", "knowledge-base/learning-journey/month-03-machine-learning/week-09-ssh-productivity/"],
    job: "After this month, you can credibly apply for junior ML Engineer and core Data Scientist roles.",
    weeks: [
      { week: 13, title: "Linux & SSH", tasks: ["Practice terminal commands from linux guide", "Generate an SSH key pair", "Connect to a free cloud VM via SSH"] },
      { week: 14, title: "Cloud server setup", tasks: ["Launch a free-tier AWS EC2 or GCP instance", "Configure security groups to allow port 8000", "Install Docker on the server via SSH"] },
      { week: 15, title: "GitHub Actions", tasks: ["Write a workflow that runs pytest on push", "Add a build step for your Docker image", "Verify the Actions tab shows green"] },
      { week: 16, title: "Deploy to cloud", tasks: ["Copy your Docker image to the server", "Run the container and test /predict from your phone", "Save the public URL as portfolio evidence"] },
    ],
  },
  {
    id: 5,
    phase: "Phase 3",
    title: "Django Fundamentals",
    focus: "MVT, ORM, migrations, auth, admin",
    beginner: "Django is how you turn data work into a product people can log into and use. Models define data, views handle requests, and templates create pages.",
    learn: ["Models, Views, Templates", "Django ORM and migrations", "URL routing, forms, class-based views", "Django admin and authentication"],
    build: "A CRUD web app such as a project management tracker with create, read, update, and delete flows.",
    study: "phase-3-full-stack-web/month-05-django-fundamentals/resources/",
    references: ["knowledge-base/zero-to-hero-guides/django/django_zero_to_hero.py"],
    job: "This is the second major slow point. Work through one boring CRUD flow before adding dashboards.",
    weeks: [
      { week: 17, title: "Django setup & models", tasks: ["Install Django, start a project", "Define your first model and run migrations", "Register model in admin and add test data"] },
      { week: 18, title: "Views, URLs, templates", tasks: ["Create a ListView and template", "Wire a URL pattern", "Display model data in an HTML table"] },
      { week: 19, title: "Forms & validation", tasks: ["Build a ModelForm for create/edit", "Validate input with clean methods", "Show error messages in the template"] },
      { week: 20, title: "Authentication", tasks: ["Add login/logout using Django's built-in views", "Protect views with login_required", "Show username in the navbar"] },
    ],
  },
  {
    id: 6,
    phase: "Phase 3",
    title: "ML Inside Django",
    focus: "Uploads, Celery, Redis, dashboards, environment variables",
    beginner: "Long-running ML work should not freeze a web page. Celery moves heavy processing to the background while Django keeps serving users.",
    learn: ["CSV or image upload forms", "Celery and Redis background jobs", "Model predictions from Django views", "Chart.js or Plotly dashboards", "Secrets in .env files"],
    build: "A web app where users upload a CSV, a background ML task processes it, and results appear on a dashboard.",
    study: "phase-3-full-stack-web/month-06-ml-into-django/resources/",
    references: ["knowledge-base/zero-to-hero-guides/mis/README.md", "knowledge-base/zero-to-hero-guides/django/django_zero_to_hero.py"],
    job: "After this month, apply for ML Engineer and Backend Engineer (Python) roles.",
    weeks: [
      { week: 21, title: "File uploads", tasks: ["Add a FileField to a model", "Build a CSV upload form", "Save uploaded file and display filename"] },
      { week: 22, title: "Celery & Redis", tasks: ["Install Redis and Celery", "Create a shared_task that sleeps 5s", "Trigger it from a view and confirm it runs in background"] },
      { week: 23, title: "Background ML inference", tasks: ["Move model loading into the Celery task", "Save predictions to the database", "Poll for task completion from the frontend"] },
      { week: 24, title: "Dashboard with charts", tasks: ["Query results and pass to template", "Add a Plotly or Chart.js chart", "Store API key in .env and load with python-dotenv"] },
    ],
  },
  {
    id: 7,
    phase: "Phase 4",
    title: "Microcontrollers and Sensors",
    focus: "ESP32, Arduino C++, DHT11 sensor, serial monitor",
    beginner: "You are not trying to become an electrical engineer. You are learning how physical readings become structured data that software can process.",
    learn: ["Arduino setup and loop functions", "Digital and analog pins", "DHT11 temperature and humidity wiring", "Serial Monitor debugging", "Simple threshold alerts"],
    build: "ESP32 firmware that reads temperature and humidity every 10 seconds and blinks an LED above a threshold.",
    study: "phase-4-iot-hardware/month-07-microcontrollers/resources/",
    references: ["knowledge-base/zero-to-hero-guides/arduino/", "knowledge-base/zero-to-hero-guides/iot/"],
    job: "Keep the hardware scope tiny: one board, one sensor, one reading loop.",
    weeks: [
      { week: 25, title: "Arduino IDE setup", tasks: ["Install Arduino IDE, add ESP32 board support", "Upload the Blink sketch to ESP32", "See the LED blink — confirm toolchain works"] },
      { week: 26, title: "DHT11 sensor wiring", tasks: ["Wire DHT11: VCC→3.3V, DATA→GPIO4, GND→GND", "Upload DHT sensor sketch from arduino guide", "Read temperature and humidity in Serial Monitor"] },
      { week: 27, title: "Serial debugging", tasks: ["Add Serial.print to trace sensor values", "Test with bad readings and handle NaN", "Add a 10-second delay between readings"] },
      { week: 28, title: "LED threshold alert", tasks: ["Add LED wired to a GPIO pin", "Blink LED when temperature exceeds 30°C", "Push firmware to GitHub as portfolio evidence"] },
    ],
  },
  {
    id: 8,
    phase: "Phase 4",
    title: "IoT Data Streaming",
    focus: "HTTP or MQTT, backend ingestion, live charts",
    beginner: "This month connects the physical world to the web. Your sensor sends readings over WiFi, your backend stores them, and the dashboard updates.",
    learn: ["HTTP POST from ESP32", "MQTT publish and subscribe", "Django database ingestion", "Live charts by polling or WebSockets", "Cloud deployment of the IoT stack"],
    build: "A live Django dashboard showing real-time room temperature from the ESP32.",
    study: "phase-4-iot-hardware/month-08-iot-streaming/resources/",
    references: ["knowledge-base/learning-journey/month-04-iot-smart-home/", "knowledge-base/zero-to-hero-guides/iot/"],
    job: "The interview value is the pipeline: sensor -> server -> database -> chart.",
    weeks: [
      { week: 29, title: "ESP32 WiFi & HTTP POST", tasks: ["Add WiFi credentials to firmware", "Post JSON payload to your laptop IP", "Confirm receipt in server terminal"] },
      { week: 30, title: "Backend ingestion endpoint", tasks: ["Create POST /sensor endpoint in FastAPI or Django", "Store reading in SQLite with timestamp", "Add GET /data endpoint that returns last 50 rows"] },
      { week: 31, title: "Database and retrieval", tasks: ["Query readings by time range", "Add basic data validation (reject NaN values)", "Test the full ESP32 → server → database flow"] },
      { week: 32, title: "Live chart dashboard", tasks: ["Build a page that polls /data every 5 seconds", "Plot temperature over time with Plotly or Chart.js", "Deploy the stack to your cloud server"] },
    ],
  },
  {
    id: 9,
    phase: "Phase 5",
    title: "Grand Capstone: Cold-Chain Logistics",
    focus: "IoT, ML, OR-Tools, Django dashboard, ROI",
    beginner: "This is where everything becomes one platform. You show sensor data, predict cooling failure, optimize inventory transfer, and translate risk into dollars.",
    learn: ["ESP32 to MQTT or HTTP to Django", "Anomaly detection or survival analysis", "OR-Tools routing or assignment", "Celery-scheduled inference", "Financial risk dashboard"],
    build: "A custom MIS platform for cold-chain logistics with live sensors, failure probability, optimizer output, and financial risk.",
    study: "phase-5-capstone/month-09-grand-capstone/",
    references: ["projects/advanced/project-5-factory-twin/", "projects/advanced/project-6-predictive-maintenance/", "projects/advanced/project-7-supply-chain/", "knowledge-base/zero-to-hero-guides/optimization/"],
    job: "After this month, lead interviews with Operations Data Scientist or AI Systems Engineer positioning.",
    weeks: [
      { week: 33, title: "Architecture planning", tasks: ["Draw the full system: ESP32 → Django → ML → OR-Tools → Dashboard", "Set up the Django project with all planned models", "Create a GitHub repo with the architecture diagram in README"] },
      { week: 34, title: "Sensor pipeline", tasks: ["Wire up live sensor data flow into Django database", "Add Celery task triggered every 10 minutes", "Confirm data arrives and is stored correctly"] },
      { week: 35, title: "ML anomaly detection", tasks: ["Train anomaly detector on historical sensor data", "Run inference in Celery task", "Save failure probability to database and show on dashboard"] },
      { week: 36, title: "Optimizer & ROI panel", tasks: ["Implement OR-Tools routing or inventory transfer", "Calculate financial risk = probability × spoilage cost", "Present all outputs in one Django dashboard page"] },
    ],
  },
  {
    id: 10,
    phase: "Phase 6",
    title: "NLP and LLM Basics",
    focus: "TF-IDF, transformers, embeddings, prompt patterns, APIs",
    beginner: "Classical NLP teaches the old reliable baseline. LLM APIs teach how modern AI systems generate answers. You need both to judge tradeoffs.",
    learn: ["Tokenization and TF-IDF", "Text classification with scikit-learn", "Transformers, tokens, embeddings, context windows", "Prompting and structured outputs", "LLM API calls in FastAPI"],
    build: "A Dockerized FastAPI endpoint that accepts a question and returns an LLM-generated answer.",
    study: "phase-6-generative-ai/month-10-nlp-llm-basics/resources/",
    references: ["projects/foundations/project-4-news-classification/", "phase-6-generative-ai/README.md"],
    job: "You are now connecting the production platform from earlier months to generative AI.",
    weeks: [
      { week: 37, title: "Text preprocessing & TF-IDF", tasks: ["Tokenize a paragraph and count word frequencies", "Build a TF-IDF classifier on AG News dataset", "Measure accuracy and save confusion matrix"] },
      { week: 38, title: "Transformers & embeddings", tasks: ["Load a small HuggingFace model", "Generate embeddings for 5 sentences", "Find the most similar sentence by cosine distance"] },
      { week: 39, title: "LLM API calls", tasks: ["Get an OpenAI or Anthropic API key", "Make a basic chat completion call in Python", "Try system prompts and structured output"] },
      { week: 40, title: "FastAPI LLM endpoint", tasks: ["Wrap LLM call in a POST /ask endpoint", "Containerize with Docker", "Test with curl and save demo as portfolio evidence"] },
    ],
  },
  {
    id: 11,
    phase: "Phase 6",
    title: "RAG and Vector Databases",
    focus: "Chunking, embeddings, ChromaDB, pgvector, document Q&A",
    beginner: "RAG reduces hallucination by giving the LLM retrieved evidence. The system searches your documents first, then asks the model to answer using that context.",
    learn: ["Document chunking", "Embeddings and similarity search", "ChromaDB, pgvector, or Pinecone", "LangChain or LlamaIndex retrieval", "PDF upload and chat flow"],
    build: "A Django app where users upload a PDF, index it into a vector database, and chat with the document.",
    study: "phase-6-generative-ai/month-11-rag-vector-databases/resources/",
    references: ["phase-6-generative-ai/month-11-rag-vector-databases/resources/rag_pipeline.py"],
    job: "This is a practical LLM engineer portfolio piece because it has documents, retrieval, UI, and backend logic.",
    weeks: [
      { week: 41, title: "Chunking & embedding", tasks: ["Read a PDF with PyPDF2", "Split into 300-token chunks with overlap", "Embed chunks using OpenAI or a local model"] },
      { week: 42, title: "Vector database", tasks: ["Install ChromaDB", "Store embedded chunks with metadata", "Query for the 3 most similar chunks to a question"] },
      { week: 43, title: "RAG pipeline", tasks: ["Retrieve context chunks for a user question", "Inject context into LLM prompt", "Compare answers with and without retrieval"] },
      { week: 44, title: "Django PDF chat app", tasks: ["Add PDF upload form to Django app", "Index on upload, store chunks in ChromaDB", "Build a chat view that runs the full RAG pipeline"] },
    ],
  },
  {
    id: 12,
    phase: "Phase 6",
    title: "Agentic AI",
    focus: "Tool calling, memory, LangGraph, safety, cost limits",
    beginner: "An agent is an LLM wrapped in a loop that can call tools, observe results, and decide the next action. Your earlier APIs become tools.",
    learn: ["ReAct reasoning loop", "OpenAI-style tool calling", "LangChain agents and LangGraph", "Short-term and long-term memory", "Guardrails, timeouts, max steps, cost tracking"],
    build: "An autonomous AI agent that can query SQL, search the web, run Python analysis, and summarize findings from one instruction.",
    study: "phase-6-generative-ai/month-12-agentic-ai/resources/",
    references: ["phase-6-generative-ai/month-12-agentic-ai/resources/agentic_ai.py", "projects/advanced/project-5-factory-twin/"],
    job: "After this month, your portfolio can target LLM Engineer, MLOps Engineer, and AI Systems Engineer roles.",
    weeks: [
      { week: 45, title: "ReAct & tool calling", tasks: ["Read the ReAct paper summary in the guide", "Write 3 Python tool functions (SQL, web, analysis)", "Register tools and call them manually first"] },
      { week: 46, title: "LangChain agent", tasks: ["Build an agent with LangChain AgentExecutor", "Test with a multi-step question", "Log each reasoning step to understand the loop"] },
      { week: 47, title: "Memory & guardrails", tasks: ["Add conversation memory with ConversationBufferMemory", "Set max_iterations=10 to prevent infinite loops", "Add a cost tracker that stops after $0.10"] },
      { week: 48, title: "Final agent demo", tasks: ["Give the agent a real business question", "Record the reasoning trace as a screenshot", "Write a 1-page agent architecture summary for interviews"] },
    ],
  },
];

// ─── Extended Roadmap: Phase 7 + Phase 8 (from 3 PDF roadmaps) ────────────────
const extendedMonths = [
  // ── Phase 7: Advanced AI Systems (Months 13-18) ──
  {
    id: 13,
    phase: "Phase 7",
    label: "Advanced AI Systems",
    title: "LLM Fine-Tuning and Evaluation",
    focus: "LoRA, QLoRA, PEFT, training dynamics, formal model evaluation",
    why: "Prompting alone is not enough for specialized tasks. Fine-tuning adapts a model's weights to your domain data. Evaluation frameworks measure whether your model actually improved.",
    learn: [
      "LoRA and QLoRA: parameter-efficient fine-tuning",
      "Hugging Face PEFT and Trainer API",
      "Dataset preparation, tokenization, and batching",
      "Training dynamics: loss curves, overfitting, learning rate",
      "Evaluation: BLEU, ROUGE, BERTScore, human eval",
      "MT-Bench and LLM-as-judge evaluation patterns",
    ],
    build: "Fine-tune a small open-source LLM (Mistral-7B or similar) on a domain-specific dataset, evaluate it with automated metrics, and compare against the base model.",
    resources: [
      { label: "Hugging Face PEFT", url: "https://github.com/huggingface/peft" },
      { label: "LLM Evaluation Harness", url: "https://github.com/EleutherAI/lm-evaluation-harness" },
      { label: "QLoRA paper", url: "https://arxiv.org/abs/2305.14314" },
      { label: "Fine-tuning guide (HF)", url: "https://huggingface.co/docs/transformers/training" },
    ],
    tags: ["LLM", "Fine-tuning", "LoRA", "Evaluation"],
  },
  {
    id: 14,
    phase: "Phase 7",
    label: "Advanced AI Systems",
    title: "Quantization and Efficient Inference",
    focus: "GPTQ, AWQ, GGUF, vLLM, serving tradeoffs, inference benchmarking",
    why: "Large models are too slow and expensive to run naively. Quantization reduces precision to shrink models and speed up inference without retraining. Serving frameworks handle batching and throughput.",
    learn: [
      "INT8, INT4, FP16 quantization concepts",
      "GPTQ, AWQ, and GGUF formats and tradeoffs",
      "llama.cpp for local quantized inference",
      "vLLM and continuous batching for high-throughput serving",
      "Latency vs. throughput vs. accuracy tradeoffs",
      "Inference benchmarking: tokens/sec, time-to-first-token",
    ],
    build: "Quantize a 7B model with two methods (GPTQ and GGUF), benchmark both on the same prompt set, compare quality and speed, and write a decision guide for which to use in production.",
    resources: [
      { label: "AutoGPTQ", url: "https://github.com/PanQiWei/AutoGPTQ" },
      { label: "llama.cpp", url: "https://github.com/ggerganov/llama.cpp" },
      { label: "vLLM", url: "https://github.com/vllm-project/vllm" },
      { label: "AWQ paper", url: "https://arxiv.org/abs/2306.00978" },
    ],
    tags: ["Quantization", "Inference", "vLLM", "Performance"],
  },
  {
    id: 15,
    phase: "Phase 7",
    label: "Advanced AI Systems",
    title: "Advanced Agent Systems",
    focus: "Evaluation harnesses, observability, retries, multi-agent design",
    why: "Month 12 built a working agent. This month builds a production-grade one. Real agents fail silently, loop infinitely, and produce untraceable outputs. You need evaluation, observability, and failure recovery.",
    learn: [
      "Agent evaluation: AgentBench, GAIA benchmark",
      "Tracing with LangSmith, Arize Phoenix, or OpenTelemetry",
      "Retry logic, circuit breakers, and step limits",
      "Multi-agent patterns: supervisor, peer-to-peer, critic",
      "Long-term memory with vector stores + episodic memory",
      "Human-in-the-loop checkpoints",
    ],
    build: "Add full observability (tracing every tool call and LLM request) and an evaluation suite to your Month 12 agent. Introduce a second agent that acts as critic/reviewer and create a test harness with 20 graded tasks.",
    resources: [
      { label: "LangSmith", url: "https://smith.langchain.com" },
      { label: "LangGraph", url: "https://github.com/langchain-ai/langgraph" },
      { label: "AgentBench", url: "https://github.com/THUDM/AgentBench" },
      { label: "AutoGen multi-agent", url: "https://github.com/microsoft/autogen" },
    ],
    tags: ["Agents", "Observability", "Multi-agent", "Evaluation"],
  },
  {
    id: 16,
    phase: "Phase 7",
    label: "Advanced AI Systems",
    title: "ML System Design and Reliability",
    focus: "Drift detection, SLOs, canary deploys, shadow mode, incident readiness",
    why: "An ML model deployed once will degrade silently over time. Reliability engineering means defining what 'good' looks like, detecting when it breaks, and recovering safely without downtime.",
    learn: [
      "Data drift: distribution shift, covariate shift, concept drift",
      "Evidently AI and Alibi Detect for drift monitoring",
      "SLOs for ML: latency P99, error rate, prediction quality",
      "Canary deployment, A/B testing, and shadow mode",
      "Rollback strategies and safe model promotion",
      "Incident runbooks for ML systems",
    ],
    build: "Add drift detection and alerting to your Month 9 capstone. Implement canary deployment for a model update and write a rollback plan. Define SLOs and create a dashboard showing whether they're met.",
    resources: [
      { label: "Evidently AI", url: "https://github.com/evidentlyai/evidently" },
      { label: "Alibi Detect", url: "https://github.com/SeldonIO/alibi-detect" },
      { label: "ML observability guide", url: "https://github.com/DataTalksClub/mlops-zoomcamp" },
      { label: "Google SRE book (free)", url: "https://sre.google/sre-book/table-of-contents/" },
    ],
    tags: ["MLOps", "Reliability", "Drift", "SLOs"],
  },
  {
    id: 17,
    phase: "Phase 7",
    label: "Advanced AI Systems",
    title: "Industrial AI and Optimization",
    focus: "Digital twins, causal analysis, graph OR, edge AI deployment",
    why: "This month deepens the industrial IE angle. Digital twins simulate physical systems before you change them. Causal analysis avoids optimizing the wrong metric. Edge AI brings inference to the device.",
    learn: [
      "Digital twin concepts and simulation with SimPy",
      "Causal graphs, do-calculus fundamentals, and DoWhy",
      "Graph-based optimization with NetworkX + OR-Tools",
      "Edge AI: TensorFlow Lite, ONNX, CoreML basics",
      "Energy and latency constraints for on-device inference",
      "Industrial AI case studies: predictive quality, yield optimization",
    ],
    build: "Build a digital twin simulation of a production line (SimPy), run causal analysis to identify the true bottleneck, optimize with OR-Tools, and deploy a lightweight anomaly model to ESP32 or a Raspberry Pi.",
    resources: [
      { label: "SimPy (simulation)", url: "https://simpy.readthedocs.io" },
      { label: "DoWhy (causal)", url: "https://github.com/py-why/dowhy" },
      { label: "TensorFlow Lite", url: "https://www.tensorflow.org/lite/guide" },
      { label: "EfficientML.ai", url: "https://hanlab.mit.edu/courses/2024-fall-65940" },
    ],
    tags: ["Digital Twin", "Causal AI", "Edge AI", "Industrial IE"],
  },
  {
    id: 18,
    phase: "Phase 7",
    label: "Advanced AI Systems",
    title: "Advanced Integration Project",
    focus: "Combine Phase 7 topics into one production-grade system",
    why: "Every Phase 7 month is only valuable when it connects to the others. This month builds the integration that proves you can deliver an advanced AI system end to end.",
    learn: [
      "System design for advanced AI products",
      "Combining fine-tuned LLM + RAG + agents + monitoring",
      "Cost control: caching, batching, model routing",
      "Production readiness checklist for AI systems",
      "Technical writing: architecture decision records (ADRs)",
      "Presenting complex systems to non-technical stakeholders",
    ],
    build: "Design and build an advanced AI system that combines at least 3 Phase 7 skills: e.g., a fine-tuned domain model served with quantized inference, wrapped in a monitored agent with drift detection on inputs.",
    resources: [
      { label: "System design primer", url: "https://github.com/donnemartin/system-design-primer" },
      { label: "Chip Huyen's ML Systems Design", url: "https://huyenchip.com/machine-learning-systems-design/toc.html" },
      { label: "Designing ML Systems (book)", url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/" },
      { label: "AI Fairness 360 (IBM fairness toolkit)", url: "https://github.com/Trusted-AI/AIF360" },
    ],
    tags: ["System Design", "Integration", "Production AI", "Architecture"],
  },
  // ── Phase 8: Research and Expert Track (Months 19-24) ──
  {
    id: 19,
    phase: "Phase 8",
    label: "Research & Expert Track",
    title: "Research Methodology",
    focus: "Paper reading, reproduction, experiment design, technical writing",
    why: "Engineering excellence requires understanding where techniques come from. Reading and reproducing papers builds the deep intuition that separates senior engineers from juniors.",
    learn: [
      "How to read an ML paper efficiently (abstract → experiments → method)",
      "Experiment design: hypothesis, baselines, ablations",
      "Reproducing a published result from scratch",
      "Technical writing: blog posts, experiment reports, postmortems",
      "LaTeX and academic writing conventions",
      "Finding and evaluating papers: ArXiv, Semantic Scholar, PapersWithCode",
    ],
    build: "Select one significant paper from the last 2 years (e.g., LoRA, RLHF, or a RAG improvement). Reproduce its key experiment, write a structured summary, and publish it as a public blog post or GitHub repo.",
    resources: [
      { label: "Papers With Code", url: "https://paperswithcode.com" },
      { label: "ArXiv.org", url: "https://arxiv.org/list/cs.LG/recent" },
      { label: "Andrej Karpathy's paper reading guide", url: "https://x.com/karpathy/status/1444157007226306562" },
      { label: "Semantic Scholar", url: "https://www.semanticscholar.org" },
    ],
    tags: ["Research", "Paper Reading", "Technical Writing", "Methodology"],
  },
  {
    id: 20,
    phase: "Phase 8",
    label: "Research & Expert Track",
    title: "Novel Architectures",
    focus: "Transformer variants, multimodal systems, or a novel system idea",
    why: "Understanding architecture-level choices gives you the vocabulary to read the research frontier and design non-standard solutions when off-the-shelf models are not enough.",
    learn: [
      "Transformer internals: attention, positional encoding, layer norms",
      "Variants: BERT, GPT, T5, Mamba (SSM), Mistral, Mixtral (MoE)",
      "Multimodal: CLIP, LLaVA, image/audio tokenization",
      "Efficient attention: Flash Attention, sliding window attention",
      "Building a mini transformer from scratch (educational)",
      "When to design custom vs. use pretrained models",
    ],
    build: "Implement a small transformer from scratch (character-level or word-level LM), train it on a domain dataset, then compare it to a fine-tuned pretrained model. Write an analysis of the tradeoffs.",
    resources: [
      { label: "Karpathy's nanoGPT", url: "https://github.com/karpathy/nanoGPT" },
      { label: "Annotated Transformer", url: "https://nlp.seas.harvard.edu/annotated-transformer/" },
      { label: "Flash Attention", url: "https://github.com/Dao-AILab/flash-attention" },
      { label: "LLaVA multimodal", url: "https://github.com/haotian-liu/LLaVA" },
    ],
    tags: ["Transformers", "Architectures", "Multimodal", "Deep Learning"],
  },
  {
    id: 21,
    phase: "Phase 8",
    label: "Research & Expert Track",
    title: "Large-Scale Systems",
    focus: "Scale, throughput, orchestration, infrastructure design",
    why: "Individual models and apps are just components. Senior engineers design systems that handle millions of requests, coordinate multiple models, and stay reliable under load.",
    learn: [
      "Distributed training: data parallelism, model parallelism, ZeRO",
      "Large-scale serving: load balancing, auto-scaling, request routing",
      "Kubernetes and Helm for ML workloads",
      "Batch inference pipelines vs. real-time serving",
      "Cost modeling for large-scale AI deployments",
      "Observability at scale: centralized logging, distributed tracing",
    ],
    build: "Design (and partially implement) a large-scale inference system that can handle 1000+ requests/min using vLLM, a load balancer, and auto-scaling. Document the architecture with diagrams and cost analysis.",
    resources: [
      { label: "Ray Serve", url: "https://docs.ray.io/en/latest/serve/index.html" },
      { label: "vLLM production", url: "https://github.com/vllm-project/vllm" },
      { label: "ML infrastructure guide", url: "https://github.com/chiphuyen/dmls-book" },
      { label: "Kubernetes for ML", url: "https://kubeflow.org/docs/started/introduction/" },
    ],
    tags: ["Scale", "Infrastructure", "Kubernetes", "Distributed Systems"],
  },
  {
    id: 22,
    phase: "Phase 8",
    label: "Research & Expert Track",
    title: "Open-Source and Thought Leadership",
    focus: "OSS contribution, public writing, engineering communication",
    why: "Your skills are only visible when they are public. Open-source contributions prove that you can work in large codebases with standards. Writing shows you can communicate complex ideas clearly.",
    learn: [
      "Finding good first issues in major ML repos",
      "OSS contribution workflow: fork, branch, PR, review, merge",
      "Writing for technical audiences: tutorials, READMEs, docs",
      "Conference talks and meetup presentations",
      "Building a technical brand: LinkedIn, blog, GitHub profile",
      "Code review skills: giving and receiving feedback",
    ],
    build: "Make a meaningful contribution to one major open-source ML project (not just fixing typos). Simultaneously publish 2 technical blog posts and give one short talk or demo at a local meetup or recorded video.",
    resources: [
      { label: "First timers only", url: "https://www.firsttimersonly.com" },
      { label: "Good first issues (ML)", url: "https://github.com/topics/good-first-issue" },
      { label: "How to write a technical blog", url: "https://simonwillison.net/2022/Nov/6/what-to-blog-about/" },
      { label: "Hashnode (free blogging)", url: "https://hashnode.com" },
    ],
    tags: ["Open Source", "Writing", "Community", "Thought Leadership"],
  },
  {
    id: 23,
    phase: "Phase 8",
    label: "Research & Expert Track",
    title: "Research Contribution",
    focus: "Serious OSS contribution, benchmark suite, or research-style artifact",
    why: "This month produces an artifact that demonstrates research-engineering capability: something original, rigorous, and publicly useful. It is the highest-signal portfolio item possible.",
    learn: [
      "Designing a benchmark: task definition, metrics, baselines, leaderboard",
      "Ablation studies and systematic experimentation",
      "Writing a technical report or workshop paper",
      "Dataset creation and curation for ML",
      "Responsible AI: bias auditing, fairness metrics, safety evaluation",
      "Reproducibility standards: code, data, environment, seeds",
    ],
    build: "Create one of: (a) a benchmark dataset + evaluation suite for a real problem in your domain, (b) a research-style ablation study comparing 3+ approaches with reproducible code, or (c) a substantial OSS tool used by others.",
    resources: [
      { label: "Hugging Face datasets", url: "https://huggingface.co/docs/datasets" },
      { label: "Responsible AI toolkit (Microsoft)", url: "https://github.com/microsoft/responsible-ai-toolbox" },
      { label: "EleutherAI eval harness", url: "https://github.com/EleutherAI/lm-evaluation-harness" },
      { label: "ML reproducibility checklist", url: "https://www.cs.mcgill.ca/~jpineau/ReproducibilityChecklist.pdf" },
    ],
    tags: ["Research", "Benchmarks", "Responsible AI", "Reproducibility"],
  },
  {
    id: 24,
    phase: "Phase 8",
    label: "Research & Expert Track",
    title: "Expert Portfolio",
    focus: "Consolidate all work into a leadership-grade portfolio and interview narrative",
    why: "24 months of work is only valuable if you can present it clearly and confidently. This month packages everything into a narrative that positions you for senior, staff, or research roles.",
    learn: [
      "Portfolio architecture: what to include, what to trim",
      "Writing a senior engineer narrative: impact, ownership, tradeoffs",
      "System design interview preparation",
      "ML design interview: model selection, tradeoffs, production concerns",
      "Salary negotiation and offer evaluation for senior roles",
      "Contributing to team and technical strategy discussions",
    ],
    build: "Build a polished public portfolio: a GitHub profile README that links all 24 months of work, a personal site or blog with project summaries, and a one-page impact summary (not a resume — a narrative of what you built and why it mattered).",
    resources: [
      { label: "ML interview guide", url: "https://github.com/khangich/machine-learning-interview" },
      { label: "System design for ML", url: "https://github.com/chiphuyen/machine-learning-systems-design" },
      { label: "Senior engineer reading list", url: "https://github.com/eugeneyan/applied-ml" },
      { label: "Grokking the ML Interview", url: "https://www.educative.io/courses/grokking-the-machine-learning-interview" },
    ],
    tags: ["Portfolio", "Career", "Interview", "Leadership"],
  },
  // ── Phase 9: Emerging AI 2025-2026 (Months 25-30) ──
  {
    id: 25,
    phase: "Phase 9",
    label: "Emerging AI 2025–2026",
    title: "Agentic Frameworks Deep Dive",
    focus: "LangGraph stateful agents, CrewAI, AutoGen, smolagents, MCP protocol",
    why: "Month 12 introduced agents conceptually. This month masters the production frameworks that teams actually ship. LangGraph handles state machines for complex agent flows. MCP (Model Context Protocol) is the emerging open standard for connecting agents to any tool or data source.",
    learn: [
      "LangGraph: nodes, edges, state machines, conditional branching",
      "CrewAI: role-based multi-agent crews with task delegation",
      "Microsoft AutoGen: conversational multi-agent patterns",
      "smolagents (HuggingFace): lightweight code-first agents",
      "MCP (Model Context Protocol): open standard for agent tool connections",
      "A2A (Agent-to-Agent) protocol basics for agent communication",
    ],
    build: "Build a production multi-agent system using LangGraph: an orchestrator agent that delegates to specialist sub-agents (SQL agent, web search agent, analysis agent). Connect external tools via MCP. Deploy with a FastAPI interface.",
    resources: [
      { label: "LangGraph (GitHub)", url: "https://github.com/langchain-ai/langgraph" },
      { label: "CrewAI (GitHub)", url: "https://github.com/crewAIInc/crewAI" },
      { label: "AutoGen (Microsoft, GitHub)", url: "https://github.com/microsoft/autogen" },
      { label: "smolagents (HuggingFace, GitHub)", url: "https://github.com/huggingface/smolagents" },
      { label: "Model Context Protocol (official site)", url: "https://modelcontextprotocol.io" },
    ],
    tags: ["LangGraph", "CrewAI", "AutoGen", "MCP", "Multi-agent"],
  },
  {
    id: 26,
    phase: "Phase 9",
    label: "Emerging AI 2025–2026",
    title: "Reasoning Models & Structured Thinking",
    focus: "Chain of Thought, Tree of Thoughts, test-time compute, DeepSeek-R1, extended thinking",
    why: "Reasoning models (o1, o3, DeepSeek-R1, Claude extended thinking) spend more compute at inference time to think step-by-step before answering. They outperform standard models on complex planning, math, and multi-step decisions — exactly the kind of problems industrial engineers face.",
    learn: [
      "Chain-of-Thought (CoT) prompting and why it works",
      "Tree of Thoughts (ToT): exploring multiple reasoning paths",
      "Self-consistency: sample multiple CoT paths, pick majority answer",
      "Test-time compute scaling: why thinking longer improves results",
      "DeepSeek-R1 architecture and open-weights reasoning",
      "Anthropic extended thinking API: when to use vs. standard mode",
      "Routing: when to send queries to a reasoning model vs. a fast model",
    ],
    build: "Build a decision-support agent for a multi-constraint industrial scheduling problem. Compare standard GPT-4o vs. o1/o3 or DeepSeek-R1 on the same problem set. Benchmark quality and cost. Write a routing policy that selects the right model based on task complexity.",
    resources: [
      { label: "Chain-of-Thought paper (ArXiv)", url: "https://arxiv.org/abs/2201.11903" },
      { label: "Tree of Thoughts (ArXiv)", url: "https://arxiv.org/abs/2305.10601" },
      { label: "Self-Consistency paper (ArXiv)", url: "https://arxiv.org/abs/2203.11171" },
      { label: "DeepSeek-R1 (GitHub)", url: "https://github.com/deepseek-ai/DeepSeek-R1" },
      { label: "Anthropic extended thinking docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking" },
    ],
    tags: ["Reasoning", "CoT", "DeepSeek-R1", "Test-time compute", "Decision-making"],
  },
  {
    id: 27,
    phase: "Phase 9",
    label: "Emerging AI 2025–2026",
    title: "Voice & Multimodal Agents",
    focus: "Real-time speech pipelines, vision LLMs, multimodal RAG, LiveKit, Whisper",
    why: "Text-only AI misses most of how industrial environments communicate: voice alerts, camera inspection images, sensor dashboards. Multimodal agents that can see, hear, and speak are the next layer of industrial AI.",
    learn: [
      "Real-time ASR (automatic speech recognition) with Whisper and Deepgram",
      "Text-to-speech with ElevenLabs or Kokoro TTS",
      "Real-time voice agent pipeline: audio in → ASR → LLM → TTS → audio out",
      "LiveKit for low-latency voice streaming infrastructure",
      "Vision LLMs: GPT-4V, Claude Vision, LLaVA — image + text prompts",
      "Multimodal RAG: index images + text together, retrieve by query",
      "Latency budgeting: where each millisecond goes in a voice pipeline",
    ],
    build: "Build a voice-enabled industrial assistant: a factory worker speaks a question (e.g., 'What is the anomaly probability for machine 3?'), the system transcribes it, queries your Month 9 capstone database via the LLM, and speaks the answer back. Add a vision check that accepts a photo of a gauge and describes its reading.",
    resources: [
      { label: "OpenAI Whisper (GitHub)", url: "https://github.com/openai/whisper" },
      { label: "Deepgram Python SDK (GitHub)", url: "https://github.com/deepgram/deepgram-python-sdk" },
      { label: "ElevenLabs Python SDK (GitHub)", url: "https://github.com/elevenlabs/elevenlabs-python" },
      { label: "LiveKit (GitHub)", url: "https://github.com/livekit/livekit" },
      { label: "LLaVA multimodal (GitHub)", url: "https://github.com/haotian-liu/LLaVA" },
    ],
    tags: ["Voice agents", "Multimodal", "Whisper", "LiveKit", "Vision LLM"],
  },
  {
    id: 28,
    phase: "Phase 9",
    label: "Emerging AI 2025–2026",
    title: "Computer-Use & Code Agents",
    focus: "GUI automation, code agents, sandboxed execution, OpenHands, E2B",
    why: "Computer-use agents control real GUIs — clicking, typing, reading screens — without APIs. Code agents write, run, and debug code autonomously. These capabilities enable AI to automate entire software workflows, not just single API calls.",
    learn: [
      "Computer-use API (Anthropic): screenshot → action loops",
      "GUI automation: observing screen state, deciding clicks, verifying outcomes",
      "Code agent architecture: write code → execute in sandbox → read output → fix",
      "Sandboxed code execution with E2B (secure cloud containers)",
      "OpenHands (formerly OpenDevin): open-source software engineering agents",
      "Safety: how to limit scope, prevent destructive actions, set guardrails",
      "Agentic code review and refactoring pipelines",
    ],
    build: "Build a code agent that accepts a broken Python ML script, runs it in an E2B sandbox, reads the error, searches for a fix, edits the file, and reruns until the tests pass. Log each reasoning step. Add a hard limit of 10 iterations and a human-approval checkpoint before any file deletion.",
    resources: [
      { label: "Anthropic computer-use docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/computer-use" },
      { label: "OpenHands (GitHub)", url: "https://github.com/All-Hands-AI/OpenHands" },
      { label: "E2B code interpreter (GitHub)", url: "https://github.com/e2b-dev/e2b" },
      { label: "Modal (serverless sandboxes, GitHub)", url: "https://github.com/modal-labs/modal-client" },
    ],
    tags: ["Computer-use", "Code agents", "GUI automation", "OpenHands", "E2B"],
  },
  {
    id: 29,
    phase: "Phase 9",
    label: "Emerging AI 2025–2026",
    title: "Agent Evaluation & Safety",
    focus: "DeepEval, RAGAS, PromptFoo, Guardrails AI, red-teaming, prompt injection defense",
    why: "Agents that cannot be evaluated cannot be trusted in production. Evaluation frameworks measure whether your agent answers correctly, stays on task, and handles adversarial inputs safely. This is the skill most AI engineers skip and the one every hiring team asks about.",
    learn: [
      "LLM evaluation metrics: faithfulness, answer relevancy, context precision",
      "RAGAS: automated RAG pipeline evaluation with LLM-as-judge",
      "DeepEval: unit-test-style assertions for LLM outputs",
      "PromptFoo: compare prompt versions and model outputs at scale",
      "Guardrails AI: structured output validation and input/output filters",
      "Red-teaming agents: prompt injection attacks, jailbreaks, goal hijacking",
      "AgentBench: benchmark suite for evaluating agent task completion",
    ],
    build: "Build a complete eval suite for your Month 12 or Month 25 agent. Write 30 test cases with expected answers. Run with DeepEval and RAGAS. Use PromptFoo to compare two prompt versions. Add Guardrails AI output validation. Write a red-team report with 5 failure modes you found.",
    resources: [
      { label: "DeepEval (GitHub)", url: "https://github.com/confident-ai/deepeval" },
      { label: "RAGAS (GitHub)", url: "https://github.com/explodinggradients/ragas" },
      { label: "PromptFoo (GitHub)", url: "https://github.com/promptfoo/promptfoo" },
      { label: "Guardrails AI (GitHub)", url: "https://github.com/guardrails-ai/guardrails" },
      { label: "AgentBench (GitHub)", url: "https://github.com/THUDM/AgentBench" },
    ],
    tags: ["Evaluation", "DeepEval", "RAGAS", "Safety", "Red-teaming"],
  },
  {
    id: 30,
    phase: "Phase 9",
    label: "Emerging AI 2025–2026",
    title: "Industrial AI Agents (IE Superpower)",
    focus: "Agentic AI for operations, supply chain agents, LLM + OR-Tools orchestration, digital twin integration",
    why: "This is your unique market position: the combination of IE systems thinking + agentic AI almost nobody else has. An industrial AI agent monitors KPIs, detects anomalies, runs optimization, communicates findings by voice, and hands off to a human for approval — this is not a toy project, this is a product.",
    learn: [
      "Designing agent workflows for operational decisions: monitor → detect → diagnose → optimize → communicate",
      "LLM + OR-Tools orchestration: agent decides when to trigger optimizer",
      "Supply chain agents: demand forecasting, vendor negotiation drafts, reorder triggers",
      "Scheduling agents: shift planning, machine assignment, constraint handling via LLM reasoning",
      "Digital twin integration: SimPy simulation as an agent tool",
      "Human-in-the-loop for high-stakes industrial decisions",
      "Responsible deployment: audit logs, decision traceability, rollback",
    ],
    build: "Extend your Month 9 cold-chain capstone into an agentic system: a monitoring agent polls sensors every 10 minutes, a diagnosis agent analyzes anomalies and determines root cause, an optimization agent calls OR-Tools to replan inventory routing, and a communication agent sends a voice or text summary to the operator. Add human approval before any route change.",
    resources: [
      { label: "OR-Tools (Google, GitHub)", url: "https://github.com/google/or-tools" },
      { label: "SimPy (discrete-event simulation, docs)", url: "https://simpy.readthedocs.io" },
      { label: "DoWhy causal analysis (GitHub)", url: "https://github.com/py-why/dowhy" },
      { label: "LangGraph for orchestration (GitHub)", url: "https://github.com/langchain-ai/langgraph" },
      { label: "AutoGen for multi-agent ops (GitHub)", url: "https://github.com/microsoft/autogen" },
    ],
    tags: ["Industrial AI", "Operations", "OR-Tools", "Supply chain", "IE + AI"],
  },
];

// Continuous tracks that run alongside Phase 7 and Phase 8
const continuousTracks = [
  {
    id: "math",
    icon: "🧮",
    title: "Math Foundations",
    desc: "Linear algebra, calculus, probability, statistics, information theory — run this track in parallel every week.",
    resources: [
      { label: "3Blue1Brown (Linear Algebra)", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
      { label: "3Blue1Brown (Calculus)", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr" },
      { label: "Probability for ML (cheatsheet)", url: "https://stanford.edu/~shervine/teaching/cs-229/refresher-probabilities-statistics" },
      { label: "Mathematics for ML (free book)", url: "https://mml-book.github.io" },
      { label: "StatQuest (YouTube)", url: "https://www.youtube.com/@statquest" },
    ],
  },
  {
    id: "papers",
    icon: "📄",
    title: "Weekly Paper Reading",
    desc: "Read at least one ML paper per week. Use Papers With Code to find recent high-impact work. Write a 3-sentence summary after each read.",
    resources: [
      { label: "Papers With Code (trending)", url: "https://paperswithcode.com/latest" },
      { label: "ArXiv CS.LG daily", url: "https://arxiv.org/list/cs.LG/recent" },
      { label: "The Batch (newsletter)", url: "https://www.deeplearning.ai/the-batch/" },
      { label: "ML Paper Explainers (YouTube)", url: "https://www.youtube.com/@YannicKilcher" },
    ],
  },
  {
    id: "writing",
    icon: "✍️",
    title: "Monthly Technical Writing",
    desc: "Write one technical note, blog draft, or postmortem every month. Writing forces clarity and becomes your public portfolio over time.",
    resources: [
      { label: "Simon Willison's blog (inspiration)", url: "https://simonwillison.net" },
      { label: "Hashnode (free blog)", url: "https://hashnode.com" },
      { label: "How to write a postmortem", url: "https://www.atlassian.com/incident-management/postmortem/templates" },
      { label: "Technical writing guide (Google)", url: "https://developers.google.com/tech-writing" },
    ],
  },
  {
    id: "agent-news",
    icon: "🤖",
    title: "Agent Frameworks Watch",
    desc: "The agent ecosystem moves weekly. Follow changelogs, new releases, and benchmark results for LangGraph, CrewAI, AutoGen, smolagents, and MCP. Spend 30 minutes each week scanning what changed and why it matters.",
    resources: [
      { label: "LangChain blog (releases + tutorials)", url: "https://blog.langchain.dev" },
      { label: "AutoGen releases (GitHub)", url: "https://github.com/microsoft/autogen/releases" },
      { label: "MCP changelog (official site)", url: "https://modelcontextprotocol.io" },
      { label: "AI news digest — The Rundown AI", url: "https://www.therundown.ai" },
      { label: "smolagents changelog (GitHub)", url: "https://github.com/huggingface/smolagents/releases" },
    ],
  },
  {
    id: "ie-agents",
    icon: "🏭",
    title: "IE × Agents (Your Superpower)",
    desc: "Every month, pick one real industrial problem (scheduling, routing, maintenance, quality) and sketch how an AI agent could solve it. This builds the pattern library that makes you different from every other AI engineer.",
    resources: [
      { label: "OR-Tools examples (Google, GitHub)", url: "https://github.com/google/or-tools/tree/stable/examples/python" },
      { label: "SimPy examples (docs)", url: "https://simpy.readthedocs.io/en/latest/examples/" },
      { label: "Industrial AI use cases (McKinsey)", url: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-top-trends-in-tech" },
      { label: "Supply chain AI papers (ArXiv)", url: "https://arxiv.org/search/?searchtype=all&query=supply+chain+reinforcement+learning" },
      { label: "INFORMS (operations research journals)", url: "https://www.informs.org/Publications/INFORMS-Journals" },
    ],
  },
];

// ─── Community 12-Month Path ─────────────────────────────────────────────────
// Source: community-curated 12-month DS + Engineering roadmap with verified GitHub repos
const communityPathMonths = [
  {
    id: "cp-1",
    title: "Python + Git + Linux + SQL + MongoDB",
    icon: "🐍",
    focus: "Python fundamentals, NumPy, Pandas, Matplotlib, SQL basics, MongoDB, first ML steps",
    cloneCommands: [
      "git clone https://github.com/Asabeneh/30-Days-Of-Python",
      "git clone https://github.com/jerry-git/learn-python3",
      "git clone https://github.com/jlord/git-it-electron",
      "git clone https://github.com/guipsamora/pandas_exercises",
      "git clone https://github.com/WebDevSimplified/Learn-SQL",
      "git clone https://github.com/s-shemmee/SQL-101",
      "git clone https://github.com/mattdavis0351/mongodb-labs",
      "git clone https://github.com/ageron/handson-ml3",
    ],
    project: "Titanic EDA + basic ML model — analyze, visualize, and predict survival",
    weeks: [
      {
        title: "Python Fundamentals (Days 1–7)",
        desc: "Variables, data types, strings, lists, tuples, dicts, sets, conditionals, loops, functions",
        repos: [
          { label: "Asabeneh/30-Days-Of-Python", url: "https://github.com/Asabeneh/30-Days-Of-Python", desc: "🟢 PRIMARY — 30-day Python challenge. Work through Day 1–11 this week. Read each day's .md file, run the exercises, then retype from scratch." },
          { label: "jerry-git/learn-python3", url: "https://github.com/jerry-git/learn-python3", desc: "Beginner Jupyter notebooks with auto-tests. Do the OOP and classes notebooks — run the tests to check yourself." },
          { label: "rameshovyas/30-Days-of-Python-Exercises", url: "https://github.com/rameshovyas/30-Days-of-Python-Exercises", desc: "Exercise solutions to check yourself — look only after attempting every problem." },
        ],
      },
      {
        title: "Python Intermediate + Git (Days 8–14)",
        desc: "List comprehensions, file I/O, exceptions, OOP, modules, Git workflow",
        repos: [
          { label: "jlord/git-it-electron", url: "https://github.com/jlord/git-it-electron", desc: "🟢 START HERE for Git — interactive desktop app with guided challenges. Download, run it, and complete all challenges with real Git commands." },
          { label: "Asabeneh/30-Days-Of-Python", url: "https://github.com/Asabeneh/30-Days-Of-Python", desc: "Continue from Day 12 (Modules) through Day 22 (OOP inheritance) — covers all Python intermediate topics for this week." },
        ],
      },
      {
        title: "NumPy + Pandas + Matplotlib + SQL (Days 15–21)",
        desc: "Data manipulation, visualization, SQL basics — the data stack",
        repos: [
          { label: "ine-rmotr-curriculum/freecodecamp-intro-to-numpy", url: "https://github.com/ine-rmotr-curriculum/freecodecamp-intro-to-numpy", desc: "🟢 NumPy intro from FreeCodeCamp. Run every notebook cell, then delete and retype from scratch." },
          { label: "ine-rmotr-curriculum/freecodecamp-intro-to-pandas", url: "https://github.com/ine-rmotr-curriculum/freecodecamp-intro-to-pandas", desc: "Pandas intro from FreeCodeCamp. Master groupby, merge, and null handling — core skills for every data project." },
          { label: "guipsamora/pandas_exercises", url: "https://github.com/guipsamora/pandas_exercises", desc: "80+ pandas exercises with solutions. Do 5 per day and check the solution only after trying yourself." },
          { label: "WebDevSimplified/Learn-SQL", url: "https://github.com/WebDevSimplified/Learn-SQL", desc: "SQL fundamentals with examples. Study SELECT, WHERE, GROUP BY, and JOIN this week." },
          { label: "s-shemmee/SQL-101", url: "https://github.com/s-shemmee/SQL-101", desc: "SQL 101 beginner tutorials. Use as a second reference alongside Learn-SQL." },
        ],
      },
      {
        title: "ML Intro + MongoDB + Linux (Days 22–30)",
        desc: "scikit-learn basics, MongoDB queries, Linux commands, month project",
        repos: [
          { label: "ageron/handson-ml3", url: "https://github.com/ageron/handson-ml3", desc: "🟢 Hands-On ML textbook notebooks. Open Chapter 2 (end-to-end ML project) and Chapter 3 (classification) — your ML foundations." },
          { label: "mattdavis0351/mongodb-labs", url: "https://github.com/mattdavis0351/mongodb-labs", desc: "MongoDB query exercises. Open exercises/01_basic-mongo-queries.md and work through all exercises." },
          { label: "tkarim45/Beginner-Data-Science-Projects", url: "https://github.com/tkarim45/Beginner-Data-Science-Projects", desc: "Beginner DS projects. Study project #1 (Titanic), delete all code, then redo it from scratch as your Month 1 project." },
        ],
      },
    ],
  },
  {
    id: "cp-2",
    title: "Java Core + OOP + Data Structures",
    icon: "☕",
    focus: "Java syntax, OOP principles, collections, algorithms, data structures",
    cloneCommands: [
      "git clone https://github.com/in28minutes/java-tutorial-for-beginners",
      "git clone https://github.com/bobocode-projects/java-fundamentals-exercises",
      "git clone https://github.com/TheAlgorithms/Java",
      "git clone https://github.com/DiegoKrupitza/Simple-Java-Exercises-for-Beginners",
    ],
    project: "Bank account system CLI with OOP — create, deposit, withdraw, transfer, statements",
    weeks: [
      {
        title: "Java Basics",
        desc: "Setup JDK + IntelliJ, variables, types, operators, conditionals, loops, arrays",
        repos: [
          { label: "in28minutes/java-tutorial-for-beginners", url: "https://github.com/in28minutes/java-tutorial-for-beginners", desc: "🟢 START HERE — Java tutorial from in28minutes. Study the src/ folder section by section — all Java basics covered." },
          { label: "DiegoKrupitza/Simple-Java-Exercises-for-Beginners", url: "https://github.com/DiegoKrupitza/Simple-Java-Exercises-for-Beginners", desc: "Simple Java exercises for beginners. Do 5 exercises per day to practice syntax and problem-solving." },
          { label: "manjunath5496/Beginner-Java-Exercises", url: "https://github.com/manjunath5496/Beginner-Java-Exercises", desc: "Beginner Java exercises with arrays and loops. Use for Week 1 Days 6–7 to reinforce array handling." },
        ],
      },
      {
        title: "Java OOP",
        desc: "Classes, objects, constructors, inheritance, interfaces, polymorphism, exceptions",
        repos: [
          { label: "in28minutes/java-a-course-for-beginners", url: "https://github.com/in28minutes/java-a-course-for-beginners", desc: "🟢 Java OOP course from in28minutes. Follow the course structure for all OOP concepts — classes through polymorphism." },
          { label: "bobocode-projects/java-fundamentals-exercises", url: "https://github.com/bobocode-projects/java-fundamentals-exercises", desc: "Java fundamentals exercises from bobocode. Do the interfaces and abstract classes sections this week." },
        ],
      },
      {
        title: "Java Collections + Functional",
        desc: "ArrayList, HashMap, Generics, Streams, Lambda expressions, File I/O, threads intro",
        repos: [
          { label: "bobocode-projects/java-fundamentals-exercises", url: "https://github.com/bobocode-projects/java-fundamentals-exercises", desc: "Do the generics, streams, and lambda exercises this week. Check your solutions against the provided answers." },
        ],
      },
      {
        title: "Java DSA + Project Week",
        desc: "LinkedList, Stack, Queue, Tree, sorting algorithms, OOP capstone project",
        repos: [
          { label: "TheAlgorithms/Java", url: "https://github.com/TheAlgorithms/Java", desc: "🟢 Every Java algorithm implemented cleanly. Study DataStructures/ and Sorts/ — read, understand, then reimplement without looking." },
          { label: "parthasarathy27/Java_beginner_practice", url: "https://github.com/parthasarathy27/Java_beginner_practice", desc: "Java beginner practice projects. Study the bank account example for your Month 2 project — then build your own from scratch." },
        ],
      },
    ],
  },
  {
    id: "cp-3",
    title: "Advanced Python + Design Patterns + APIs",
    icon: "⚙️",
    focus: "Advanced OOP, design patterns, Flask REST API development",
    cloneCommands: [
      "git clone https://github.com/hamedasgari20/Python-Django-FastAPI-advanced-topics",
      "git clone https://github.com/KodeWorker/Python-Design-Patterns",
      "git clone https://github.com/pallets/flask",
    ],
    project: "REST API for a Todo app with Flask + SQLite — full CRUD with endpoints and authentication",
    weeks: [
      {
        title: "Advanced OOP",
        desc: "Metaclasses, dunder methods, properties, descriptors, class decorators",
        repos: [
          { label: "hamedasgari20/Python-Django-FastAPI-advanced-topics", url: "https://github.com/hamedasgari20/Python-Django-FastAPI-advanced-topics", desc: "🟢 Advanced Python, Django, and FastAPI topics. Start with the Python advanced OOP section — metaclasses, descriptors, and advanced class patterns." },
        ],
      },
      {
        title: "Design Patterns",
        desc: "Singleton, Factory, Observer, Decorator, Strategy, Command patterns",
        repos: [
          { label: "KodeWorker/Python-Design-Patterns", url: "https://github.com/KodeWorker/Python-Design-Patterns", desc: "🟢 Python design patterns with clean examples. Read each pattern, understand the use case, then implement it from scratch." },
        ],
      },
      {
        title: "Flask REST APIs",
        desc: "Routes, templates, forms, REST endpoints, authentication, error handling",
        repos: [
          { label: "hamedasgari20/Python-Django-FastAPI-advanced-topics", url: "https://github.com/hamedasgari20/Python-Django-FastAPI-advanced-topics", desc: "Flask section — routes, blueprints, and REST APIs. Follow the examples and build alongside them." },
          { label: "pallets/flask", url: "https://github.com/pallets/flask", desc: "Flask official source code. Browse /examples/ to see how real Flask apps are structured." },
        ],
      },
      {
        title: "Project Week",
        desc: "Build a full CRUD REST API for a Todo app with Flask + SQLite",
        repos: [
          { label: "hamedasgari20/Python-Django-FastAPI-advanced-topics", url: "https://github.com/hamedasgari20/Python-Django-FastAPI-advanced-topics", desc: "Study the API examples, then build your own Todo API from scratch — do not copy any code." },
        ],
      },
    ],
  },
  {
    id: "cp-4",
    title: "Web Development: HTML/CSS/JS + React",
    icon: "🌐",
    focus: "HTML5, CSS3, JavaScript DOM, async/await, React components and hooks",
    cloneCommands: [
      "git clone https://github.com/bradtraversy/50projects50days",
      "git clone https://github.com/ianshulx/React-projects-for-beginners",
      "git clone https://github.com/ImranNawar/web_small_projects",
    ],
    project: "Personal portfolio website (HTML/CSS/JS) + React To-Do App with state management",
    weeks: [
      {
        title: "HTML5 + CSS3",
        desc: "Structure, semantic elements, styling, flexbox, grid, responsive design",
        repos: [
          { label: "bradtraversy/50projects50days", url: "https://github.com/bradtraversy/50projects50days", desc: "🟢 50 HTML/CSS/JS projects in 50 days. Do Projects 1–10 this week — build each from scratch without copying any code." },
        ],
      },
      {
        title: "JavaScript + DOM",
        desc: "DOM manipulation, events, fetch API, async/await, LocalStorage",
        repos: [
          { label: "bradtraversy/50projects50days", url: "https://github.com/bradtraversy/50projects50days", desc: "Projects 11–25 this week. Focus on projects that use fetch, events, and async JavaScript." },
          { label: "ImranNawar/web_small_projects", url: "https://github.com/ImranNawar/web_small_projects", desc: "Small web projects for practice. Use as extra exercises alongside the 50 days projects." },
        ],
      },
      {
        title: "React Basics",
        desc: "Components, props, state, hooks (useState, useEffect), React Router",
        repos: [
          { label: "ianshulx/React-projects-for-beginners", url: "https://github.com/ianshulx/React-projects-for-beginners", desc: "🟢 React beginner projects. Study each project's component structure, then rebuild it from scratch." },
        ],
      },
      {
        title: "Project Week",
        desc: "Build portfolio website + React To-Do App",
        repos: [
          { label: "bradtraversy/50projects50days", url: "https://github.com/bradtraversy/50projects50days", desc: "Study the most polished projects for portfolio inspiration — adapt them into your own style." },
          { label: "ianshulx/React-projects-for-beginners", url: "https://github.com/ianshulx/React-projects-for-beginners", desc: "Study the To-Do project completely, delete everything, and rewrite it from scratch." },
        ],
      },
    ],
  },
  {
    id: "cp-5",
    title: "Advanced ML + Feature Engineering",
    icon: "🧠",
    focus: "Feature engineering, ensemble methods, XGBoost, unsupervised learning, full ML pipeline",
    cloneCommands: [
      "git clone https://github.com/ageron/handson-ml3",
      "git clone https://github.com/dipanjanS/practical-machine-learning-with-python",
    ],
    project: "End-to-end ML pipeline: data → clean → feature engineer → train → evaluate → save model",
    weeks: [
      {
        title: "Feature Engineering",
        desc: "Encoding categorical features, scaling, feature selection, handling missing values",
        repos: [
          { label: "ageron/handson-ml3", url: "https://github.com/ageron/handson-ml3", desc: "🟢 Open Chapter 2 (end-to-end ML project) — this is the most complete feature engineering guide. Study every pipeline step." },
        ],
      },
      {
        title: "Ensemble Methods",
        desc: "Random Forest, Gradient Boosting, XGBoost, stacking, blending",
        repos: [
          { label: "ageron/handson-ml3", url: "https://github.com/ageron/handson-ml3", desc: "Open Chapter 7 (ensemble learning and random forests) — understand bagging, boosting, and voting classifiers in depth." },
        ],
      },
      {
        title: "Unsupervised Learning",
        desc: "K-Means, PCA, DBSCAN, anomaly detection, dimensionality reduction",
        repos: [
          { label: "ageron/handson-ml3", url: "https://github.com/ageron/handson-ml3", desc: "Open Chapter 9 (unsupervised learning) — implement K-Means and PCA on a real dataset from scratch." },
        ],
      },
      {
        title: "Project Week",
        desc: "Full end-to-end ML pipeline with feature engineering",
        repos: [
          { label: "dipanjanS/practical-machine-learning-with-python", url: "https://github.com/dipanjanS/practical-machine-learning-with-python", desc: "🟢 Practical ML with Python textbook code. Study Chapters 3–5, then delete everything and rebuild with your own dataset." },
        ],
      },
    ],
  },
  {
    id: "cp-6",
    title: "Deep Learning: TensorFlow + PyTorch + CV",
    icon: "🔥",
    focus: "Neural networks, CNNs, transfer learning, computer vision, image classification",
    cloneCommands: [
      "git clone https://github.com/mrdbourke/tensorflow-deep-learning",
      "git clone https://github.com/mrdbourke/pytorch-deep-learning",
      "git clone https://github.com/udacity/deep-learning-v2-pytorch",
    ],
    project: "Dog vs Cat classifier with transfer learning (ResNet50) — real computer vision pipeline",
    weeks: [
      {
        title: "TensorFlow + Keras",
        desc: "Neural network basics, regression, classification, CNNs with Keras",
        repos: [
          { label: "mrdbourke/tensorflow-deep-learning", url: "https://github.com/mrdbourke/tensorflow-deep-learning", desc: "🟢 TF Zero to Mastery by Daniel Bourke. Do Notebooks 00–04 — the most practical free TF course available." },
        ],
      },
      {
        title: "PyTorch Basics",
        desc: "Tensors, autograd, training loop, model saving and loading",
        repos: [
          { label: "mrdbourke/pytorch-deep-learning", url: "https://github.com/mrdbourke/pytorch-deep-learning", desc: "🟢 PyTorch Zero to Mastery by Daniel Bourke. Do Notebooks 00–03 — same high-quality practical style as the TF course." },
        ],
      },
      {
        title: "Computer Vision",
        desc: "CNN architectures, transfer learning, image augmentation, classification",
        repos: [
          { label: "udacity/deep-learning-v2-pytorch", url: "https://github.com/udacity/deep-learning-v2-pytorch", desc: "Udacity Deep Learning with PyTorch. Open convolutional-neural-networks/ folder and run the CNN examples." },
        ],
      },
      {
        title: "Project Week",
        desc: "Dog vs Cat classifier with ResNet50 transfer learning",
        repos: [
          { label: "mrdbourke/tensorflow-deep-learning", url: "https://github.com/mrdbourke/tensorflow-deep-learning", desc: "Open Notebook 04 (transfer learning part 1 feature extraction). Study it completely, then close it and reimplement yourself." },
        ],
      },
    ],
  },
  {
    id: "cp-7",
    title: "NLP + Transformers + Hugging Face",
    icon: "💬",
    focus: "Text preprocessing, RNNs/LSTMs, BERT, GPT basics, Hugging Face pipelines",
    cloneCommands: [
      "git clone https://github.com/jonkrohn/DLTFpT",
      "git clone https://github.com/huggingface/transformers",
    ],
    project: "Sentiment analysis API — Hugging Face model + Flask endpoint + local deployment",
    weeks: [
      {
        title: "Text Preprocessing + Embeddings",
        desc: "Tokenization, TF-IDF, word2vec, GloVe, text cleaning pipeline",
        repos: [
          { label: "jonkrohn/DLTFpT", url: "https://github.com/jonkrohn/DLTFpT", desc: "🟢 Deep Learning with TF and PyTorch textbook code. Open the NLP notebooks for text preprocessing and embedding examples." },
        ],
      },
      {
        title: "RNNs + LSTMs",
        desc: "Sequence modeling, language modeling, text generation, sentiment analysis",
        repos: [
          { label: "udacity/deep-learning-v2-pytorch", url: "https://github.com/udacity/deep-learning-v2-pytorch", desc: "Open recurrent-neural-networks/ folder — study the RNN and LSTM examples, then rebuild from scratch." },
        ],
      },
      {
        title: "Transformers + BERT + GPT",
        desc: "Attention mechanism, BERT fine-tuning, GPT inference, Hugging Face pipelines",
        repos: [
          { label: "huggingface/transformers", url: "https://github.com/huggingface/transformers", desc: "🟢 HuggingFace Transformers official. Open examples/pytorch/ and run the text-classification example — then modify it for your own task." },
        ],
      },
      {
        title: "Project Week",
        desc: "Sentiment analysis API combining Flask + Hugging Face model",
        repos: [
          { label: "huggingface/transformers", url: "https://github.com/huggingface/transformers", desc: "Use the pipeline() API to load a sentiment model, wrap it in Flask, and test it with curl." },
        ],
      },
    ],
  },
  {
    id: "cp-8",
    title: "Data Engineering: Airflow + Spark + Kafka",
    icon: "⚡",
    focus: "Pipeline orchestration, distributed computing, streaming data, end-to-end data platform",
    cloneCommands: [
      "git clone https://github.com/airscholar/e2e-data-engineering",
      "git clone https://github.com/apache/airflow",
    ],
    project: "End-to-end pipeline: Kafka → Spark → Postgres → Dashboard",
    weeks: [
      {
        title: "Apache Airflow",
        desc: "DAGs, operators, sensors, scheduling, XCom, task dependencies",
        repos: [
          { label: "airscholar/e2e-data-engineering", url: "https://github.com/airscholar/e2e-data-engineering", desc: "🟢 End-to-end data engineering project. Study the architecture first, then run each component: Airflow DAG, Kafka, Spark, Postgres." },
          { label: "apache/airflow", url: "https://github.com/apache/airflow", desc: "Apache Airflow official. Browse /airflow/example_dags/ to see real DAG patterns before writing your own." },
        ],
      },
      {
        title: "Apache Spark + PySpark",
        desc: "RDDs, DataFrames, transformations, actions, Spark SQL, partitioning",
        repos: [
          { label: "airscholar/e2e-data-engineering", url: "https://github.com/airscholar/e2e-data-engineering", desc: "Study the PySpark section — how Spark reads from Kafka and writes to Postgres." },
        ],
      },
      {
        title: "Apache Kafka",
        desc: "Producers, consumers, topics, partitions, consumer groups, streaming basics",
        repos: [
          { label: "airscholar/e2e-data-engineering", url: "https://github.com/airscholar/e2e-data-engineering", desc: "Study the Kafka producers and consumers. Follow the Docker Compose setup to run Kafka locally." },
        ],
      },
      {
        title: "Project Week",
        desc: "Full pipeline: Kafka → Spark → Postgres → Dashboard",
        repos: [
          { label: "airscholar/e2e-data-engineering", url: "https://github.com/airscholar/e2e-data-engineering", desc: "🟢 Full reference project. Study every file, understand every connection, then rebuild it from scratch with different data." },
        ],
      },
    ],
  },
  {
    id: "cp-9",
    title: "MLOps + Docker + CI/CD",
    icon: "🚀",
    focus: "MLflow experiment tracking, DVC data versioning, Docker, Kubernetes basics, production ML",
    cloneCommands: [
      "git clone https://github.com/hdegen/MLOps-end-to-end",
      "git clone https://github.com/AlexIoannides/kubernetes-mlops",
    ],
    project: "Package Month 5 ML model → Docker container → REST API → Kubernetes deployment",
    weeks: [
      {
        title: "Docker for ML",
        desc: "Images, containers, Dockerfile, docker-compose, multi-service apps",
        repos: [
          { label: "hdegen/MLOps-end-to-end", url: "https://github.com/hdegen/MLOps-end-to-end", desc: "🟢 MLOps end-to-end project. Start with the Docker section — Dockerfile for the ML service and docker-compose for the full stack." },
        ],
      },
      {
        title: "MLflow Tracking",
        desc: "Experiments, runs, parameters, metrics, model registry, serving",
        repos: [
          { label: "hdegen/MLOps-end-to-end", url: "https://github.com/hdegen/MLOps-end-to-end", desc: "Study the MLflow tracking section. Log experiments, compare runs, and promote a model to the registry." },
        ],
      },
      {
        title: "DVC + Data Versioning",
        desc: "Version datasets alongside code, pipelines, remote storage, reproducibility",
        repos: [
          { label: "hdegen/MLOps-end-to-end", url: "https://github.com/hdegen/MLOps-end-to-end", desc: "Study the DVC section — how to version datasets and define ML pipelines as DVC stages." },
        ],
      },
      {
        title: "Project Week",
        desc: "Package ML model → Docker → REST API → Kubernetes",
        repos: [
          { label: "AlexIoannides/kubernetes-mlops", url: "https://github.com/AlexIoannides/kubernetes-mlops", desc: "🟢 Kubernetes MLOps tutorial. Study how ML models are deployed in Kubernetes — then do it with your own model." },
        ],
      },
    ],
  },
  {
    id: "cp-10",
    title: "System Design + Cloud Basics",
    icon: "☁️",
    focus: "Scalability, CAP theorem, databases at scale, AWS/GCP basics, system design interviews",
    cloneCommands: [
      "git clone https://github.com/donnemartin/system-design-primer",
      "git clone https://github.com/ByteByteGoHq/system-design-101",
    ],
    project: "Design a URL shortener, chat system, or recommendation engine — full technical document",
    weeks: [
      {
        title: "System Design Fundamentals",
        desc: "Scalability, load balancing, CAP theorem, consistency vs. availability",
        repos: [
          { label: "donnemartin/system-design-primer", url: "https://github.com/donnemartin/system-design-primer", desc: "🟢 The #1 system design resource. Read the README top to bottom — the most comprehensive free guide available." },
        ],
      },
      {
        title: "Databases at Scale",
        desc: "SQL vs NoSQL, sharding, replication, caching, CDN, message queues",
        repos: [
          { label: "ByteByteGoHq/system-design-101", url: "https://github.com/ByteByteGoHq/system-design-101", desc: "🟢 System Design 101 from ByteByteGo. Visual explanations of database scaling, caching, and API design patterns." },
        ],
      },
      {
        title: "Cloud Basics (AWS/GCP)",
        desc: "EC2, S3, RDS, Lambda, IAM, auto-scaling, free tier exploration",
        repos: [
          { label: "miztiik/AWS-Demos", url: "https://github.com/miztiik/AWS-Demos", desc: "AWS demos and tutorials. Pick 3–5 demos that match your use case and deploy them on your free-tier account." },
        ],
      },
      {
        title: "System Design Practice",
        desc: "Design URL shortener, chat system, recommendation engine from scratch",
        repos: [
          { label: "donnemartin/system-design-primer", url: "https://github.com/donnemartin/system-design-primer", desc: "Study the URL shortener and Twitter design — design your own before reading the solution." },
          { label: "ByteByteGoHq/system-design-101", url: "https://github.com/ByteByteGoHq/system-design-101", desc: "Use the visual diagrams to explain your design — great for interview prep and portfolio documentation." },
        ],
      },
    ],
  },
  {
    id: "cp-11",
    title: "DSA + Interview Prep + LeetCode",
    icon: "💻",
    focus: "Arrays, trees, graphs, dynamic programming, recursion, mock interviews, LeetCode patterns",
    cloneCommands: [
      "git clone https://github.com/TheAlgorithms/Python",
      "git clone https://github.com/jwasham/coding-interview-university",
      "git clone https://github.com/thepranaygupta/Data-Structures-and-Algorithms",
    ],
    project: "Solve 2 LeetCode problems per day + one system design practice per week",
    weeks: [
      {
        title: "Arrays, Strings, Hashmaps",
        desc: "Two-pointer, sliding window, prefix sums, hash table patterns",
        repos: [
          { label: "TheAlgorithms/Python", url: "https://github.com/TheAlgorithms/Python", desc: "🟢 Every algorithm in Python. Study sorts/, data_structures/, and graphs/ — read, understand, retype without looking." },
          { label: "jwasham/coding-interview-university", url: "https://github.com/jwasham/coding-interview-university", desc: "Complete coding interview university by John Washam — the most thorough free CS interview guide. Follow the study plan." },
        ],
      },
      {
        title: "Trees + Graphs",
        desc: "Binary trees, BST, BFS, DFS, topological sort, shortest path",
        repos: [
          { label: "jwasham/coding-interview-university", url: "https://github.com/jwasham/coding-interview-university", desc: "Study the Trees and Graphs sections. Implement BFS and DFS from scratch before touching LeetCode." },
        ],
      },
      {
        title: "DP + Recursion + Backtracking",
        desc: "Memoization, tabulation, classic DP patterns, recursive tree problems",
        repos: [
          { label: "thepranaygupta/Data-Structures-and-Algorithms", url: "https://github.com/thepranaygupta/Data-Structures-and-Algorithms", desc: "🟢 Complete DSA implementations in Python. Study the dynamic programming folder and implement each pattern yourself." },
        ],
      },
      {
        title: "Mock Interviews + System Design",
        desc: "2 LeetCode problems per day + system design practice",
        repos: [
          { label: "donnemartin/system-design-primer", url: "https://github.com/donnemartin/system-design-primer", desc: "Use for system design interview practice. Explain designs out loud as if in an interview." },
          { label: "TheAlgorithms/Python", url: "https://github.com/TheAlgorithms/Python", desc: "Check your LeetCode solutions against these implementations — learn alternative approaches." },
        ],
      },
    ],
  },
  {
    id: "cp-12",
    title: "Capstone Projects + Portfolio + Job Applications",
    icon: "🏆",
    focus: "Integrate all 11 months into 3 capstone projects, polish GitHub profile, apply to jobs",
    cloneCommands: [],
    project: "3 capstone projects: Full ML Web App + Data Pipeline + NLP App, plus polished GitHub",
    weeks: [
      {
        title: "Full ML Web App",
        desc: "Train model → Flask API → React frontend → Docker → deploy on AWS",
        repos: [
          { label: "mrdbourke/tensorflow-deep-learning", url: "https://github.com/mrdbourke/tensorflow-deep-learning", desc: "Use your best DL model from Month 6 as the core of this app." },
          { label: "donnemartin/system-design-primer", url: "https://github.com/donnemartin/system-design-primer", desc: "Design the architecture before building — draw the diagram and document it in your README." },
        ],
      },
      {
        title: "Data Pipeline Capstone",
        desc: "Real data ingestion → Airflow DAG → Spark → Postgres → dashboard",
        repos: [
          { label: "airscholar/e2e-data-engineering", url: "https://github.com/airscholar/e2e-data-engineering", desc: "Use this as your pipeline architecture reference — then build a completely original version with different data." },
        ],
      },
      {
        title: "NLP Application Capstone",
        desc: "Upload text → sentiment + summary → Hugging Face → FastAPI → deployment",
        repos: [
          { label: "huggingface/transformers", url: "https://github.com/huggingface/transformers", desc: "Combine Month 7 NLP skills with Month 3 API skills — build a text analysis API with multiple endpoints." },
        ],
      },
      {
        title: "Portfolio + Job Applications",
        desc: "Polish GitHub profile, write READMEs, update LinkedIn, apply to data roles",
        repos: [
          { label: "nilbuild/developer-roadmap", url: "https://github.com/nilbuild/developer-roadmap", desc: "Developer roadmap — use to identify remaining skill gaps and plan what to learn after this program." },
          { label: "ossu/computer-science", url: "https://github.com/ossu/computer-science", desc: "OSSU full CS curriculum — reference for skills you want to deepen after the 12-month program." },
          { label: "jwasham/coding-interview-university", url: "https://github.com/jwasham/coding-interview-university", desc: "Final interview prep — work through the coding and system design questions in the last 2 weeks before applying." },
        ],
      },
    ],
  },
];

function renderCommunityPath() {
  const section = document.getElementById("communityPathContent");
  if (!section) return;

  section.innerHTML = `
    <div class="cp-rules">
      <div class="cp-rule-card">
        <span class="cp-rule-num">1</span>
        <p><strong>Type the code — never copy-paste.</strong> Typing forces your brain to process every line. You will make mistakes and fix them — that is where learning happens.</p>
      </div>
      <div class="cp-rule-card">
        <span class="cp-rule-num">2</span>
        <p><strong>Push to your own GitHub daily.</strong> Your 12-month commit history is your resume. Employers can see the streak — every day counts.</p>
      </div>
      <div class="cp-rule-card">
        <span class="cp-rule-num">3</span>
        <p><strong>When stuck, look at the solution — understand it, close it, rewrite from scratch.</strong> Never copy-paste the solution. Understanding then reproducing is what builds real skill.</p>
      </div>
    </div>
    <div class="cp-overview">
      <h3 class="cp-overview-title">12-Month Overview</h3>
      <div class="cp-overview-grid">
        ${communityPathMonths.map((m, idx) => `
          <a class="cp-overview-pill" href="#cp-detail-${m.id}">
            <span class="cp-pill-num">M${idx + 1}</span>
            <span class="cp-pill-icon">${m.icon}</span>
            <span>${m.title.split(":")[0].split("+")[0].trim()}</span>
          </a>
        `).join("")}
      </div>
    </div>
    <div class="cp-months-list">
      ${communityPathMonths.map((m, idx) => `
        <div class="cp-month-card" id="cp-detail-${m.id}">
          <div class="cp-month-header">
            <div class="cp-month-num-badge">Month ${idx + 1}</div>
            <span class="cp-icon" aria-hidden="true">${m.icon}</span>
            <div class="cp-month-title-block">
              <h3 class="cp-month-title">${m.title}</h3>
              <p class="cp-focus">${m.focus}</p>
            </div>
          </div>

          ${m.cloneCommands.length ? `
            <details class="cp-clone-block">
              <summary>📥 Clone all repos for this month</summary>
              <pre class="cp-clone-pre">${m.cloneCommands.map(c => c).join("\n")}</pre>
            </details>
          ` : ""}

          <div class="cp-weeks">
            ${m.weeks.map((w, wi) => `
              <details class="cp-week" ${wi === 0 ? "open" : ""}>
                <summary class="cp-week-summary">
                  <span class="cp-week-num-badge">W${wi + 1}</span>
                  <strong>${w.title}</strong>
                  <span class="cp-week-desc">${w.desc}</span>
                </summary>
                <div class="cp-week-repos">
                  ${w.repos.map(r => `
                    <a class="cp-repo-card" href="${r.url}" target="_blank" rel="noreferrer">
                      <span class="cp-repo-icon">⭐</span>
                      <div class="cp-repo-info">
                        <strong>${r.label}</strong>
                        <p>${r.desc}</p>
                      </div>
                    </a>
                  `).join("")}
                </div>
              </details>
            `).join("")}
          </div>

          <div class="cp-project-box">
            <span class="cp-project-label">📦 Monthly Project</span>
            <p>${m.project}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderExtendedRoadmap() {
  const section = document.getElementById("extendedRoadmapContent");
  if (!section) return;

  const phase7 = extendedMonths.filter(m => m.phase === "Phase 7");
  const phase8 = extendedMonths.filter(m => m.phase === "Phase 8");

  const phaseHtml = (months, phaseId, phaseLabel, phaseDesc) => `
    <div class="ext-phase">
      <div class="ext-phase-header">
        <div class="ext-phase-badge">${phaseId}</div>
        <div>
          <strong>${phaseLabel}</strong>
          <span>${phaseDesc}</span>
        </div>
      </div>
      <div class="ext-month-grid">
        ${months.map(m => {
          const isFt = fastTrackIds.has(m.id);
          return `
          <div class="ext-month-card${isFt ? ' is-fast-track' : ''}" data-fast-track="${isFt}">
            ${isFt ? '<span class="ft-priority-badge">🎯 AI Agents Priority</span>' : ''}
            <div class="ext-month-top">
              <span class="ext-month-num">Month ${m.id}</span>
              <div class="ext-month-tags">${m.tags.map(t => `<span class="ext-tag">${t}</span>`).join("")}</div>
            </div>
            <h4>${m.title}</h4>
            <p class="ext-focus">${m.focus}</p>
            <p class="ext-why">${m.why}</p>
            <div class="ext-learn-list">
              <strong>You will learn:</strong>
              <ul>${m.learn.map(l => `<li>${l}</li>`).join("")}</ul>
            </div>
            <div class="ext-deliverable">
              <strong>Deliverable:</strong> ${m.build}
            </div>
            <div class="ext-resources">
              ${m.resources.map(r => `<a class="ext-res-link" href="${r.url}" target="_blank" rel="noreferrer">↗ ${r.label}</a>`).join("")}
            </div>
          </div>
        `;}).join("")}
      </div>
    </div>
  `;

  const tracksHtml = `
    <div class="ext-continuous">
      <h3 class="ext-continuous-title">🔄 Continuous Tracks (run alongside Phase 7 & 8)</h3>
      <div class="ext-tracks-grid">
        ${continuousTracks.map(t => `
          <div class="ext-track-card">
            <div class="ext-track-icon">${t.icon}</div>
            <h4>${t.title}</h4>
            <p>${t.desc}</p>
            <div class="ext-track-links">
              ${t.resources.map(r => `<a href="${r.url}" target="_blank" rel="noreferrer">↗ ${r.label}</a>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  const phase9 = extendedMonths.filter(m => m.phase === "Phase 9");

  section.innerHTML = `
    <div class="ext-intro">
      <p>Your 12-month core roadmap covers software engineering, production ML, IoT, and generative AI. The extended roadmap adds <strong>18 more months</strong> of advanced and emerging topics. Phase 7–8 (from the 3 PDF roadmaps you shared) build research and senior engineering depth. Phase 9 covers the emerging 2025–2026 skills — agentic frameworks, reasoning models, voice/multimodal agents, and your IE superpower track — that are in demand right now.</p>
      <div class="ft-toggle-row">
        <button class="ft-toggle" id="ftToggleExt" aria-pressed="false">
          🎯 Show AI Agents Priority only
        </button>
        <span class="ft-toggle-hint">Highlights the months most critical for your AI Agents + IE focus. Nothing is deleted — toggle off to see all.</span>
      </div>
    </div>
    ${phaseHtml(phase7, "Phase 7", "Advanced AI Systems", "Months 13–18 · LLM fine-tuning, quantization, advanced agents, ML reliability, industrial AI")}
    ${phaseHtml(phase8, "Phase 8", "Research & Expert Track", "Months 19–24 · Research methodology, novel architectures, large-scale systems, open-source, expert portfolio")}
    ${phaseHtml(phase9, "Phase 9", "Emerging AI 2025–2026", "Months 25–30 · Agentic frameworks (LangGraph/MCP), reasoning models, voice agents, computer-use, agent eval, IE × Agents superpower")}
    ${tracksHtml}
  `;

  // bind the extended roadmap fast-track toggle
  const extToggle = document.getElementById("ftToggleExt");
  if (extToggle) {
    extToggle.addEventListener("click", () => {
      const extSection = document.getElementById("extendedRoadmapContent");
      const active = extSection.classList.toggle("ft-active");
      extToggle.classList.toggle("is-active", active);
      extToggle.setAttribute("aria-pressed", active);
      extToggle.textContent = active ? "✅ Showing Priority only — click to show all" : "🎯 Show AI Agents Priority only";
    });
  }
}

const monthGithubLinks = {
  1: [
    { label: "trekhleb/learn-python", url: "https://github.com/trekhleb/learn-python", desc: "🟢 START HERE — 30 Python topic scripts. Clone the repo, open each .py file, read it line by line, then re-type it yourself from scratch." },
    { label: "jerry-git/learn-python3", url: "https://github.com/jerry-git/learn-python3", desc: "Jupyter notebooks with exercises and auto-tests. Do the OOP and classes notebooks in Week 1 — run the tests to check yourself." },
    { label: "Asabeneh/30-Days-Of-Python", url: "https://github.com/Asabeneh/30-Days-Of-Python", desc: "30-day Python challenge — beginner to advanced. Clone it and work through Day 1–11 in your first week: variables, lists, loops, functions." },
    { label: "jlord/git-it-electron", url: "https://github.com/jlord/git-it-electron", desc: "Interactive Git desktop app — completes real Git challenges on your machine. Download and run it in Week 2 to learn git add, commit, push, branch." },
    { label: "guipsamora/pandas_exercises", url: "https://github.com/guipsamora/pandas_exercises", desc: "80+ pandas exercises with solutions. Clone it in Week 3 and do 5 exercises per day — check the solution only after trying yourself." },
    { label: "TheAlgorithms/Python", url: "https://github.com/TheAlgorithms/Python", desc: "Reference — every algorithm in clean Python. When you write a class this month, search here to see how pros write the same thing." },
    { label: "satwikkansal/wtfpython", url: "https://github.com/satwikkansal/wtfpython", desc: "Python surprises and gotchas explained with examples. Read 2-3 entries per day — it builds real understanding fast." },
    { label: "realpython/python-guide", url: "https://github.com/realpython/python-guide", desc: "The Hitchhiker's Guide to Python. Read the 'Writing Great Python Code' and 'Virtual Environments' chapters this month." },
    { label: "rougier/numpy-100", url: "https://github.com/rougier/numpy-100", desc: "100 NumPy exercises from beginner to advanced. Solve 10 per day in Weeks 3-4 — these build the vectorized thinking that underpins every ML framework." },
    { label: "jakevdp/PythonDataScienceHandbook", url: "https://github.com/jakevdp/PythonDataScienceHandbook", desc: "Python Data Science Handbook — free full textbook as runnable Jupyter notebooks. Read Chapter 3 (Pandas) and Chapter 4 (Matplotlib) in Weeks 3-4. This is the single best EDA reference." },
    { label: "mwaskom/seaborn", url: "https://github.com/mwaskom/seaborn", desc: "Seaborn statistical visualization. Read the tutorial in /doc/tutorial/ — reproduce each chart type (distributions, regressions, heatmaps) using a dataset you loaded with Pandas." },
  ],
  2: [
    { label: "XD-DENG/SQL-exercise", url: "https://github.com/XD-DENG/SQL-exercise", desc: "🟢 START HERE for SQL — real practice questions with answers. Do all exercises in the /SQL_exercise_01 through /04 folders in Weeks 5-6." },
    { label: "WebDevSimplified/Learn-SQL", url: "https://github.com/WebDevSimplified/Learn-SQL", desc: "SQL fundamentals by Web Dev Simplified. Clone and work through every .sql file — clear beginner-friendly explanations of SELECT, JOIN, GROUP BY." },
    { label: "s-shemmee/SQL-101", url: "https://github.com/s-shemmee/SQL-101", desc: "SQL 101 beginner tutorials with examples. Use as a second reference alongside the other SQL repos to reinforce each concept." },
    { label: "tiangolo/fastapi", url: "https://github.com/tiangolo/fastapi", desc: "FastAPI official repo. Open the /docs/en/docs/tutorial/ folder and follow every page as a step-by-step guide in Weeks 7-8." },
    { label: "tiangolo/full-stack-fastapi-template", url: "https://github.com/tiangolo/full-stack-fastapi-template", desc: "Clone this and explore the folder structure. This is how a real production FastAPI project looks — study it before building yours." },
    { label: "pydantic/pydantic", url: "https://github.com/pydantic/pydantic", desc: "Data validation used inside FastAPI. Read the README examples and practice defining models with type hints." },
    { label: "smpetersgithub/AdvancedSQLPuzzles", url: "https://github.com/smpetersgithub/AdvancedSQLPuzzles", desc: "Advanced SQL puzzles with window functions and CTEs — do these in Week 6 after the basics." },
    { label: "AllenDowney/ThinkStats2", url: "https://github.com/AllenDowney/ThinkStats2", desc: "Think Stats 2 — free statistics textbook with Python notebooks. Do Chapters 1-7 in Weeks 5-6 to build hypothesis testing and A/B testing intuition alongside your SQL work. Stats for programmers, not statisticians." },
    { label: "rasbt/python-machine-learning-book", url: "https://github.com/rasbt/python-machine-learning-book", desc: "Python Machine Learning 3rd edition notebooks. Read Chapter 6 (model evaluation and hyperparameter tuning) in Week 8 before writing your /predict endpoint — learn precision/recall/ROC before you deploy." },
  ],
  3: [
    { label: "DataTalksClub/mlops-zoomcamp", url: "https://github.com/DataTalksClub/mlops-zoomcamp", desc: "🟢 START HERE — free MLOps course. Do Module 1 (intro) in Week 9 and Module 2 (experiment tracking with MLflow) in Week 11." },
    { label: "mlflow/mlflow", url: "https://github.com/mlflow/mlflow", desc: "MLflow official. Open /examples/sklearn_elasticnet_wine/ and run it — that is your first experiment tracking exercise." },
    { label: "hdegen/MLOps-end-to-end", url: "https://github.com/hdegen/MLOps-end-to-end", desc: "End-to-end MLOps project with Docker, MLflow, and DVC. Study the Dockerfile and docker-compose first — then the MLflow tracking section." },
    { label: "docker/awesome-compose", url: "https://github.com/docker/awesome-compose", desc: "Real Docker Compose examples. Clone and run the /flask/ or /fastapi/ example to understand multi-service apps before writing your own." },
    { label: "GokuMohandas/Made-With-ML", url: "https://github.com/GokuMohandas/Made-With-ML", desc: "Full ML engineering course on GitHub. Read the MLOps and reproducibility sections as a reference for how production teams work." },
    { label: "scikit-learn/scikit-learn", url: "https://github.com/scikit-learn/scikit-learn", desc: "scikit-learn official. Open /examples/classification/plot_classifier_comparison.py and run it — your first multi-model comparison. Then open /examples/model_selection/ for cross-validation patterns before Week 11." },
  ],
  4: [
    { label: "actions/starter-workflows", url: "https://github.com/actions/starter-workflows", desc: "🟢 START HERE — official GitHub Actions templates. Copy /ci/python-package.yml into your repo and edit it for Week 15." },
    { label: "bregman-arie/devops-exercises", url: "https://github.com/bregman-arie/devops-exercises", desc: "500+ DevOps questions with answers. Study the Linux, CI/CD, and Cloud sections — treat it like a daily quiz while you set up servers." },
    { label: "open-guides/og-aws", url: "https://github.com/open-guides/og-aws", desc: "Practical AWS guide written by engineers. Read the EC2 and IAM sections before launching your first cloud server in Week 14." },
    { label: "learnbyexample/cli-computing", url: "https://github.com/learnbyexample/cli-computing", desc: "Linux command line and shell scripting guide with exercises. Work through the chapters during the SSH and server setup week to build terminal fluency fast." },
  ],
  5: [
    { label: "wsvincent/djangox", url: "https://github.com/wsvincent/djangox", desc: "🟢 START HERE — production Django starter with auth. Clone it, run it, and read every file before building your own project." },
    { label: "django/django", url: "https://github.com/django/django", desc: "Django official source. Browse /django/contrib/auth/ to understand login internals. Browse /django/views/generic/ for class-based views." },
    { label: "wsvincent/awesome-django", url: "https://github.com/wsvincent/awesome-django", desc: "Curated list of Django packages and tutorials. Use it to find a package for anything you need during this month." },
    { label: "cookiecutter/cookiecutter-django", url: "https://github.com/cookiecutter/cookiecutter-django", desc: "How real large Django projects are structured. Study the settings/, templates/, and apps/ layout as a reference for your own." },
    { label: "encode/django-rest-framework", url: "https://github.com/encode/django-rest-framework", desc: "DRF — if you want to add an API layer. Read the /examples/ folder to see ModelViewSet and serializers in practice." },
  ],
  6: [
    { label: "ageron/handson-ml3", url: "https://github.com/ageron/handson-ml3", desc: "🟢 START HERE — Hands-On ML textbook notebooks. Do Chapter 3 (classification) and Chapter 6 (decision trees) as your ML theory base." },
    { label: "dipanjanS/practical-machine-learning-with-python", url: "https://github.com/dipanjanS/practical-machine-learning-with-python", desc: "Practical ML with Python textbook code. Study Chapters 3–5 for feature engineering, ensemble methods, and model evaluation — then redo exercises with your own dataset." },
    { label: "scikit-learn/scikit-learn", url: "https://github.com/scikit-learn/scikit-learn", desc: "scikit-learn official. Open /examples/classification/ and run a classifier — then integrate that exact pattern into your Django view." },
    { label: "celery/celery", url: "https://github.com/celery/celery", desc: "Celery background tasks. Read /docs/getting-started/first-steps-with-celery.rst and build the example — then swap in your ML task." },
    { label: "plotly/plotly.py", url: "https://github.com/plotly/plotly.py", desc: "Interactive charts. Open /doc/python/bar-charts.md and /line-charts.md — recreate each example, then plug in your ML results." },
    { label: "joke2k/django-environ", url: "https://github.com/joke2k/django-environ", desc: "Load .env secrets in Django. Read the README and add it to your project so API keys never get committed to GitHub." },
  ],
  7: [
    { label: "espressif/arduino-esp32", url: "https://github.com/espressif/arduino-esp32", desc: "🟢 START HERE — official ESP32 core. Browse /libraries/WiFi/examples/ and /libraries/HTTPClient/examples/ — these are your Week 29 firmware base." },
    { label: "adafruit/DHT-sensor-library", url: "https://github.com/adafruit/DHT-sensor-library", desc: "DHT11/DHT22 sensor library. Open /examples/DHTtester/DHTtester.ino and upload it directly — that is your Week 26 exercise." },
    { label: "espressif/esp-idf", url: "https://github.com/espressif/esp-idf", desc: "ESP-IDF advanced firmware. Browse /examples/protocols/http_request/ when you need to understand how HTTP POST works on the chip." },
    { label: "micropython/micropython", url: "https://github.com/micropython/micropython", desc: "MicroPython — write Python on ESP32 instead of C++. Read /ports/esp32/README.md if you prefer Python for firmware." },
  ],
  8: [
    { label: "eclipse/paho.mqtt.python", url: "https://github.com/eclipse/paho.mqtt.python", desc: "🟢 START HERE — MQTT Python client. Open /examples/ and run subscribe.py on your laptop to receive messages from the ESP32." },
    { label: "eclipse/mosquitto", url: "https://github.com/eclipse/mosquitto", desc: "Mosquitto MQTT broker. Read the README to install and run on your server — then test it with mosquitto_pub from the terminal." },
    { label: "hobbyquaker/awesome-mqtt", url: "https://github.com/hobbyquaker/awesome-mqtt", desc: "Curated MQTT tools, brokers, and clients. Browse to pick the right tool for each part of your sensor-to-dashboard pipeline." },
    { label: "dpallot/simple-websocket-server", url: "https://github.com/dpallot/simple-websocket-server", desc: "Simple WebSocket server in Python. Study if you want live push updates to your dashboard instead of polling every 5 seconds." },
  ],
  9: [
    { label: "google/or-tools", url: "https://github.com/google/or-tools", desc: "🟢 START HERE — Google optimization library. Open /ortools/linear_solver/samples/simple_lp_program.py and run it — that is your first optimizer." },
    { label: "coin-or/pulp", url: "https://github.com/coin-or/pulp", desc: "PuLP linear programming. Open /examples/transportation_problem.py — this is the exact pattern for your inventory transfer optimizer." },
    { label: "plotly/dash", url: "https://github.com/plotly/dash", desc: "Dash for dashboards. Read /docs/tutorial/ — use it to build the financial risk panel if you want something beyond Django templates." },
    { label: "uqfoundation/pathos", url: "https://github.com/uqfoundation/pathos", desc: "Parallel processing in Python. Use if your Celery ML tasks need to process many sensor records faster during capstone week 34." },
  ],
  10: [
    { label: "huggingface/transformers", url: "https://github.com/huggingface/transformers", desc: "🟢 START HERE — open /examples/pytorch/text-classification/ and run the AG News example. That is your Week 38 task done." },
    { label: "huggingface/datasets", url: "https://github.com/huggingface/datasets", desc: "Load any NLP dataset in one line. Read the quickstart in the README — use it to load AG News for the classifier in Week 37." },
    { label: "mrdbourke/tensorflow-deep-learning", url: "https://github.com/mrdbourke/tensorflow-deep-learning", desc: "TF Deep Learning Zero to Mastery — for DL foundations before NLP. Open Notebook 00 (TF fundamentals) if you skipped deep learning basics." },
    { label: "jonkrohn/DLTFpT", url: "https://github.com/jonkrohn/DLTFpT", desc: "Deep Learning with TensorFlow and PyTorch textbook notebooks. Open the NLP section for text preprocessing, word embeddings, and sequence models." },
    { label: "karpathy/nanoGPT", url: "https://github.com/karpathy/nanoGPT", desc: "Small GPT from scratch by Karpathy. Read model.py to understand how transformers actually work — the best 1-hour learning investment." },
    { label: "openai/openai-python", url: "https://github.com/openai/openai-python", desc: "OpenAI Python SDK. Open /examples/ and run the basic chat completion — then build it into your FastAPI /ask endpoint." },
    { label: "anthropics/anthropic-sdk-python", url: "https://github.com/anthropics/anthropic-sdk-python", desc: "Claude SDK — alternative to OpenAI. Read /examples/ to see how to call Claude from Python for structured LLM outputs." },
  ],
  11: [
    { label: "langchain-ai/langchain", url: "https://github.com/langchain-ai/langchain", desc: "🟢 START HERE — open /docs/docs/tutorials/rag.ipynb and follow the RAG tutorial step by step. That is Weeks 41-43." },
    { label: "chroma-core/chroma", url: "https://github.com/chroma-core/chroma", desc: "ChromaDB vector database. Read the README quickstart — run the basic add/query example before integrating it with LangChain." },
    { label: "run-llama/llama_index", url: "https://github.com/run-llama/llama_index", desc: "LlamaIndex — simpler RAG API. Read /llama_index/core/readers/ for PDF loading patterns used in your Week 44 Django app." },
    { label: "imartinez/privateGPT", url: "https://github.com/imartinez/privateGPT", desc: "Full local RAG system. Read the source code as a complete architecture reference for your Django PDF chat app." },
    { label: "pgvector/pgvector", url: "https://github.com/pgvector/pgvector", desc: "PostgreSQL vector extension. Study for Week 44 when you move from ChromaDB to storing embeddings in your Django database." },
  ],
  12: [
    { label: "langchain-ai/langgraph", url: "https://github.com/langchain-ai/langgraph", desc: "🟢 START HERE — open /examples/ and run the ReAct agent example. That is your Week 45 starting point for the agentic AI build." },
    { label: "microsoft/autogen", url: "https://github.com/microsoft/autogen", desc: "Microsoft multi-agent framework. Read /notebook/agentchat_two_users.ipynb to understand how multi-agent systems coordinate." },
    { label: "LangChain Tutorials (Official Docs)", url: "https://python.langchain.com/docs/tutorials/", desc: "LangChain official tutorials — real agent examples with tools and memory. Read one tutorial per day as your Week 46-47 daily practice." },
    { label: "crewAIInc/crewAI", url: "https://github.com/crewAIInc/crewAI", desc: "CrewAI multi-role agents. Study how roles and tasks are orchestrated — useful reference for Week 47 guardrails and memory." },
    { label: "e2b-dev/awesome-ai-agents", url: "https://github.com/e2b-dev/awesome-ai-agents", desc: "Curated list of every major AI agent framework. Browse it in Week 45 to understand the landscape before choosing your tools." },
  ],
};

const learningLibrary = [
  {
    category: "📊 Statistics & A/B Testing",
    id: "stats",
    months: "Months 1–2 — the boring fundamentals that pay your salary in DS/MLE roles",
    items: [
      { type: "book", label: "Think Stats 2 — Allen Downey", url: "https://allendowney.github.io/ThinkStats/", desc: "🟢 START HERE — free online, Python code included. Statistics for programmers, not mathematicians. Read Chapters 1-9 in Month 2 alongside your SQL work." },
      { type: "book", label: "Practical Statistics for Data Scientists", url: "https://www.oreilly.com/library/view/practical-statistics-for/9781492072935/", desc: "Focused on A/B testing, resampling, hypothesis testing, regression, and classification. More practical than academic — ideal for internship prep." },
      { type: "book", label: "Causal Inference: The Mixtape — Scott Cunningham", url: "https://mixtape.scunning.com/", desc: "Free online — the clearest introduction to causal inference, difference-in-differences, and regression discontinuity. Read Chapters 1-3 in Month 4 to level up from 'correlation' to 'causation'." },
      { type: "book", label: "Statistical Rethinking — Richard McElreath", url: "https://xcelab.net/rm/", desc: "Bayesian data analysis using a story-telling approach with code. For Month 3-4 when you're ready to think beyond p-values." },
      { type: "tool", label: "scipy.stats — Statistical Functions", url: "https://docs.scipy.org/doc/scipy/reference/stats.html", desc: "Month 2 — t-tests, chi-squared, Mann-Whitney, ANOVA. Import from scipy.stats and run the one-sample t-test example. Every data scientist uses this weekly." },
      { type: "tool", label: "statsmodels — Statistical Models", url: "https://www.statsmodels.org/", desc: "Month 2 — OLS regression, logistic regression, time series. Read the Getting Started guide and run the OLS regression example. Gives you coefficient p-values, CI, and R-squared in one call." },
      { type: "tool", label: "Seaborn — Statistical Data Visualization", url: "https://seaborn.pydata.org/", desc: "Month 1-2 — plot distributions, regressions, and correlations in 3 lines. Read seaborn.pydata.org/tutorial/ — especially displot, regplot, heatmap. Your EDA default before Matplotlib." },
      { type: "course", label: "Statistics for Data Science (StatQuest)", url: "https://www.youtube.com/c/joshstarmer", desc: "Josh Starmer's StatQuest YouTube channel — best free statistics explanations ever made. Watch the p-value, t-test, linear regression, and logistic regression videos in Month 2." },
    ],
  },
  {
    category: "📐 Math & Foundations",
    id: "math",
    months: "Months 1–3 — study alongside coding",
    items: [
      { type: "book", label: "Mathematics for Machine Learning", url: "https://mml-book.github.io/book/mml-book.pdf", desc: "Free PDF — the only math book you need. Read chapters on linear algebra and probability in Month 1." },
      { type: "course", label: "MIT 18.06 Linear Algebra (Gilbert Strang)", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", desc: "Free MIT course. Watch 2 lectures per week in Month 1 — the best linear algebra explanation ever recorded." },
      { type: "video", label: "3Blue1Brown — Essence of Linear Algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", desc: "15-minute animated videos. Watch the whole playlist in one weekend — makes matrices visual and intuitive." },
      { type: "video", label: "3Blue1Brown — Essence of Calculus", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNPOjrTGVgfzC6U7hoxuKx", desc: "Animated calculus series. Watch in Month 2 to understand gradients and backpropagation visually." },
      { type: "book", label: "Convex Optimization — Boyd & Vandenberghe", url: "https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf", desc: "Free PDF — reference for optimization theory used in OR-Tools and PuLP in Months 4 and 9." },
      { type: "course", label: "Stanford CS229 Math Prerequisites", url: "https://cs229.stanford.edu/syllabus-fall2020.html", desc: "The exact math checklist Stanford requires before ML. Use as a self-assessment in Month 1." },
    ],
  },
  {
    category: "📚 Free Books",
    id: "books",
    months: "Read 1 chapter per day alongside the matching month",
    items: [
      { type: "book", label: "Hands-On ML with Scikit-Learn, Keras & TensorFlow", url: "https://github.com/ageron/handson-ml3", desc: "🟢 YOUR MAIN ML TEXTBOOK — notebooks included. Read Chapter 1-4 in Month 1-2, Chapter 5-9 in Month 3-6, Chapter 10+ in Month 10-12." },
      { type: "book", label: "Python for Data Analysis — Wes McKinney", url: "https://wesmckinney.com/book/", desc: "Free online. The pandas author's official book — read Chapters 1-6 in Month 1-2 alongside your SQL work." },
      { type: "book", label: "Deep Learning — Goodfellow, Bengio, Courville", url: "https://www.deeplearningbook.org/", desc: "Free online — the deep learning bible. Read Part 1 (Applied Math) in Month 1, Part 2 (Deep Networks) in Month 10." },
      { type: "book", label: "Speech and Language Processing — Jurafsky & Martin", url: "https://web.stanford.edu/~jurafsky/slp3/", desc: "Free PDF — NLP theory. Read Chapters 6-7 (neural text classification) in Month 10, Chapters 10-11 in Month 11." },
      { type: "book", label: "Designing Machine Learning Systems — Chip Huyen", url: "https://huyenchip.com/books/", desc: "Production ML bible. Read Chapter 1-4 in Month 3 (Docker/MLOps), Chapter 7-9 in Month 4 (deployment)." },
      { type: "book", label: "Hands-On Large Language Models — Alammar & Grootendorst", url: "https://www.llm-book.com/", desc: "The best practical LLM book. Read alongside Month 10-11 — covers embeddings, RAG, and fine-tuning with code." },
      { type: "book", label: "Build a Large Language Model from Scratch — Raschka", url: "https://www.manning.com/books/build-a-large-language-model-from-scratch", desc: "Build GPT step by step. Read in Month 10 — the best way to understand how LLMs actually work." },
      { type: "book", label: "Reinforcement Learning: An Introduction — Sutton & Barto", url: "http://incompleteideas.net/book/RLbook2020.pdf", desc: "Free PDF — RL theory. Read Chapters 1-3 in Month 12 to understand the ReAct agent loop theoretically." },
      { type: "book", label: "Probabilistic ML: Advanced Topics — Kevin Murphy", url: "https://probml.github.io/pml-book/book2.html", desc: "Advanced reference. Browse the Gaussian Processes and Bayesian chapters when you need theory for Month 6 ML work." },
    ],
  },
  {
    category: "🎓 Free Courses",
    id: "courses",
    months: "Pick one course per phase — don't do all at once",
    items: [
      { type: "course", label: "Machine Learning Specialization — DeepLearning.AI", url: "https://www.coursera.org/specializations/machine-learning-introduction", desc: "🟢 START HERE for ML — Andrew Ng's updated course. Do Course 1 in Month 2, Course 2-3 in Month 6. Free to audit." },
      { type: "course", label: "Deep Learning Specialization — DeepLearning.AI", url: "https://www.coursera.org/specializations/deep-learning", desc: "5-course deep learning path by Andrew Ng. Do Courses 1-2 in Month 10, Courses 3-5 in Month 11-12." },
      { type: "course", label: "MLOps Specialization — DeepLearning.AI", url: "https://www.deeplearning.ai/courses/machine-learning-in-production/", desc: "Production ML course. Do Module 1 in Month 3 (Docker), Module 3-4 in Month 4 (CI/CD and deployment)." },
      { type: "course", label: "Generative AI with LLMs — DeepLearning.AI", url: "https://www.coursera.org/learn/generative-ai-with-llms", desc: "3-week course on LLMs, fine-tuning, and RLHF. Do this in Week 37-38 of Month 10. Free to audit." },
      { type: "course", label: "Hugging Face NLP Course", url: "https://huggingface.co/learn/llm-course/en/chapter1/1", desc: "🟢 Free and practical — the best NLP + LLM course available. Do Chapters 1-4 in Month 10, Chapters 5-9 in Month 11." },
      { type: "course", label: "Multi AI Agent Systems with CrewAI — DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/", desc: "Free short course. Do this in Week 46 of Month 12 — directly applies to the multi-agent system you're building." },
      { type: "course", label: "Finetuning Large Language Models — DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/finetuning-large-language-models/", desc: "Free 1-hour course. Do in Month 11 Week 43 — adds fine-tuning skill to your RAG pipeline." },
      { type: "course", label: "fast.ai Practical Deep Learning", url: "https://course.fast.ai/", desc: "Top-down, code-first deep learning course. Start Lesson 1 in Month 10 — very practical, no PhD required." },
      { type: "course", label: "Stanford CS224N — NLP with Deep Learning", url: "https://web.stanford.edu/class/cs224n/", desc: "Stanford's NLP course (lecture videos on YouTube). Watch Lectures 1-4 in Month 10 for transformer theory." },
      { type: "course", label: "MLOps Zoomcamp — DataTalks.Club", url: "https://github.com/DataTalksClub/mlops-zoomcamp", desc: "Free MLOps course with code. 9 modules — do Module 1-2 in Month 3, Module 4-5 in Month 4. Best free MLOps course." },
      { type: "course", label: "Full Stack LLM Bootcamp — FSDL", url: "https://fullstackdeeplearning.com/llm-bootcamp/spring-2023/", desc: "Free bootcamp covering LLM apps from scratch. Watch the lectures in Month 10-11 for practical LLM engineering." },
    ],
  },
  {
    category: "📄 Key Papers to Read",
    id: "papers",
    months: "Read each paper when you reach the matching month",
    items: [
      { type: "paper", label: "Attention Is All You Need (Vaswani et al., 2017)", url: "https://arxiv.org/abs/1706.03762", desc: "The transformer paper — read in Month 10 Week 38 before touching HuggingFace. 15-page paper that changed everything." },
      { type: "paper", label: "BERT: Pre-training Deep Bidirectional Transformers (Devlin, 2019)", url: "https://arxiv.org/abs/1810.04805", desc: "Read after the transformer paper in Month 10 — shows how pre-training works for text classification tasks." },
      { type: "paper", label: "Language Models are Few-Shot Learners — GPT-3 (Brown, 2020)", url: "https://arxiv.org/abs/2005.14165", desc: "GPT-3 paper — read in Month 10 Week 39 when you make your first OpenAI API call. Explains in-context learning." },
      { type: "paper", label: "ReAct: Synergizing Reasoning and Acting (Yao et al., 2023)", url: "https://arxiv.org/abs/2210.03629", desc: "🟢 READ THIS in Month 12 Week 45 — the exact reasoning loop your agentic AI system will follow." },
      { type: "paper", label: "Retrieval-Augmented Generation for NLP Tasks (Lewis, 2020)", url: "https://arxiv.org/abs/2005.11401", desc: "The original RAG paper — read in Month 11 Week 41 before building your RAG pipeline. Short and practical." },
      { type: "paper", label: "Toolformer: Language Models Can Use Tools (Schick, 2023)", url: "https://arxiv.org/abs/2302.04761", desc: "Read in Month 12 Week 45 — explains how LLMs learn to call external tools, directly relevant to your agent." },
      { type: "paper", label: "Reflexion: Language Agents with Verbal RL (Shinn, 2023)", url: "https://arxiv.org/abs/2303.11366", desc: "Read in Month 12 Week 47 — explains how agents learn from their own mistakes, useful for guardrails design." },
      { type: "paper", label: "Tree of Thoughts: Deliberate Problem Solving (Yao, 2023)", url: "https://arxiv.org/abs/2305.10601", desc: "Read in Month 12 — shows advanced agent reasoning patterns beyond simple ReAct." },
      { type: "paper", label: "Direct Preference Optimization — DPO (Rafailov, 2023)", url: "https://arxiv.org/abs/2305.18290", desc: "Read in Month 11-12 — the modern replacement for RLHF when fine-tuning LLMs. Important for Month 11 fine-tuning work." },
      { type: "paper", label: "LLaMA: Open and Efficient Foundation LMs (Touvron, 2023)", url: "https://arxiv.org/abs/2302.13971", desc: "Read in Month 10 — explains how open-source LLMs work and why they can run locally without OpenAI." },
      { type: "paper", label: "Precise Zero-Shot Dense Retrieval — HyDE (Gao, 2023)", url: "https://arxiv.org/abs/2212.10496", desc: "Read in Month 11 Week 43 — advanced RAG technique for better document retrieval in your pipeline." },
    ],
  },
  {
    category: "🛠️ Tools & Official Docs",
    id: "tools",
    months: "Open the docs page when you start using each tool",
    items: [
      { type: "tool", label: "Python Official Docs", url: "https://www.python.org/", desc: "Month 1 — bookmark the Python 3 docs. Use Ctrl+F to search functions when you forget syntax." },
      { type: "tool", label: "pandas Documentation", url: "https://pandas.pydata.org/", desc: "Month 1-2 — the official pandas docs. Read the '10 minutes to pandas' guide first." },
      { type: "tool", label: "scikit-learn Documentation", url: "https://scikit-learn.org/", desc: "Month 2-6 — read the User Guide section matching what you're building (classification, pipelines, etc.)." },
      { type: "tool", label: "FastAPI Documentation", url: "https://fastapi.tiangolo.com/", desc: "Month 2 — follow the official Tutorial - User Guide from the start. One of the best docs ever written." },
      { type: "tool", label: "Docker Documentation", url: "https://www.docker.com/", desc: "Month 3 — read the Get Started guide, then the Dockerfile reference when you hit issues." },
      { type: "tool", label: "MLflow Documentation", url: "https://mlflow.org/", desc: "Month 3 — read the Tracking and Projects quickstarts to set up experiment logging." },
      { type: "tool", label: "Weights & Biases (wandb)", url: "https://wandb.ai/site/", desc: "Month 3-6 — alternative to MLflow. Better visualizations. Free for individuals — try it for experiment tracking." },
      { type: "tool", label: "PyTorch Documentation", url: "https://pytorch.org/", desc: "Month 10 — read the 60-minute blitz tutorial. Then the tensor and autograd guides before touching transformers." },
      { type: "tool", label: "Hugging Face Transformers Docs", url: "https://huggingface.co/docs/transformers/index", desc: "Month 10-11 — read the Quick Tour and Task guides for text classification, summarization, and embeddings." },
      { type: "tool", label: "LangChain Documentation", url: "https://www.langchain.com/", desc: "Month 11 — read the RAG tutorial first, then the Agents tutorial in Month 12." },
      { type: "tool", label: "LangGraph Documentation", url: "https://www.langchain.com/langgraph", desc: "Month 12 — read the How-To guides for stateful graphs and agent loops." },
      { type: "tool", label: "OR-Tools Documentation", url: "https://developers.google.com/optimization", desc: "Month 9 — read the Linear Optimization and Routing sections for the capstone optimizer." },
      { type: "tool", label: "Plotly Documentation", url: "https://plotly.com/", desc: "Month 6 & 9 — read the Python Express quickstart for charts in your Django dashboard and capstone." },
      { type: "tool", label: "ChromaDB Documentation", url: "https://www.trychroma.com/", desc: "Month 11 — read the Getting Started guide to set up vector storage for your RAG pipeline." },
      { type: "tool", label: "SimPy Discrete-Event Simulation", url: "https://simpy.readthedocs.io/", desc: "Month 9 — use for factory simulation in the capstone. Read the Car example and Bank Checkout tutorial." },
      { type: "tool", label: "DVC — Data Version Control", url: "https://dvc.org/", desc: "Month 3-4 — version your datasets alongside your code. Read the Get Started guide." },
      { type: "tool", label: "Evidently AI — ML Monitoring", url: "https://www.evidentlyai.com/", desc: "Month 4-6 — monitor your ML models for data drift. Read the Quickstart for classification models." },
      { type: "tool", label: "Tableau Public (free)", url: "https://public.tableau.com/", desc: "Month 2-6 — drag-and-drop BI dashboards. Download the free Desktop version, connect to a CSV or SQLite, and build one dashboard. Tableau appears in most Data Scientist and DA job postings." },
      { type: "tool", label: "Apache Spark / PySpark", url: "https://spark.apache.org/docs/latest/api/python/", desc: "Nice-to-have Month 4+ — distributed data processing at scale. Read the DataFrame API quickstart and run a group-by on a large CSV. Frequently appears in data engineering and senior DS postings." },
      { type: "tool", label: "Snowflake (free trial)", url: "https://www.snowflake.com/en/", desc: "Nice-to-have Month 4+ — cloud data warehouse used at 70%+ of large tech companies. Sign up for the 30-day free trial and practice querying with SQL. Common in data engineering and analytics roles." },
      { type: "tool", label: "Apache Airflow", url: "https://airflow.apache.org/", desc: "Month 3-4 — workflow orchestration for data pipelines. Read the Quickstart guide and build a simple DAG. Appears frequently in MLE and data engineering internship postings alongside Docker/Kubernetes." },
    ],
  },
  {
    category: "🗄️ Vector Databases",
    id: "vectordbs",
    months: "Month 11 — pick ONE and master it",
    items: [
      { type: "tool", label: "ChromaDB — Local Vector DB", url: "https://www.trychroma.com/", desc: "🟢 START HERE — easiest to set up locally with no account needed. Perfect for Month 11 RAG pipeline." },
      { type: "tool", label: "pgvector — PostgreSQL Extension", url: "https://github.com/pgvector/pgvector", desc: "Add vector search to your existing Django PostgreSQL database — the production choice for Month 11." },
      { type: "tool", label: "Pinecone — Cloud Vector DB", url: "https://www.pinecone.io/", desc: "Cloud-hosted vector database — use if you want a hosted solution without managing your own server." },
      { type: "tool", label: "Weaviate — Open Source Vector DB", url: "https://weaviate.io/", desc: "Open source with a GraphQL API. Use as an alternative to ChromaDB for more complex search needs." },
      { type: "tool", label: "Qdrant — High-Performance Vector DB", url: "https://qdrant.tech/", desc: "Fast Rust-based vector DB with a Python client. Good production choice with better performance than Chroma." },
      { type: "tool", label: "Milvus — Distributed Vector DB", url: "https://milvus.io/", desc: "Enterprise-grade distributed vector database. Study this for the expert-level capstone extension work." },
    ],
  },
  {
    category: "🐙 GitHub Repos to Study",
    id: "github",
    months: "Star and clone each when you reach the matching month",
    items: [
      { type: "github", label: "ageron/handson-ml3", url: "https://github.com/ageron/handson-ml3", desc: "🟢 CLONE THIS FIRST — the Hands-On ML book notebooks. Run one notebook per week from Month 2 onwards." },
      { type: "github", label: "langchain-ai/langchain", url: "https://github.com/langchain-ai/langchain", desc: "Month 11-12 — the main RAG and agent framework. Browse /cookbook/ for ready-to-run examples." },
      { type: "github", label: "vllm-project/vllm", url: "https://github.com/vllm-project/vllm", desc: "Month 12 — fast LLM inference engine. Study if you want to serve your own model without OpenAI API." },
      { type: "github", label: "ggerganov/llama.cpp", url: "https://github.com/ggerganov/llama.cpp", desc: "Month 10-12 — run LLMs locally on CPU. Use to test your RAG pipeline without API costs." },
      { type: "github", label: "luo-junyu/awesome-agent-papers", url: "https://github.com/luo-junyu/awesome-agent-papers", desc: "Month 12 — curated list of every important agent paper. Browse by category to find what to read next." },
      { type: "github", label: "e2b-dev/awesome-ai-agents", url: "https://github.com/e2b-dev/awesome-ai-agents", desc: "Month 12 — curated list of all AI agent frameworks. Use to compare LangGraph, AutoGen, CrewAI, and others." },
      { type: "github", label: "microsoft/autogen", url: "https://github.com/microsoft/autogen", desc: "Month 12 — Microsoft multi-agent framework. Read /notebook/ for multi-agent conversation examples." },
      { type: "github", label: "crewAIInc/crewAI", url: "https://github.com/crewAIInc/crewAI", desc: "Month 12 — role-based multi-agent framework. Easier than AutoGen for structured agent workflows." },
      { type: "github", label: "mlflow/mlflow", url: "https://github.com/mlflow/mlflow", desc: "Month 3 — experiment tracking. Clone and run /examples/sklearn_elasticnet_wine/ as your first tracking exercise." },
      { type: "github", label: "pydantic/pydantic-ai", url: "https://github.com/pydantic/pydantic-ai", desc: "Month 12 — new agent framework from the Pydantic team. Cleaner than LangChain for structured agent outputs." },
      { type: "github", label: "DataTalksClub/mlops-zoomcamp", url: "https://github.com/DataTalksClub/mlops-zoomcamp", desc: "Month 3-4 — free MLOps course with all code. Clone and run the notebooks for each module." },
      { type: "github", label: "GokuMohandas/Made-With-ML", url: "https://github.com/GokuMohandas/Made-With-ML", desc: "Month 3-4 — full ML engineering course on GitHub. Read the MLOps and Data sections as reference." },
    ],
  },
];

function renderLearningLibrary() {
  const section = document.getElementById("learningLibraryContent");
  if (!section) return;
  const activeTab = section.dataset.tab || "math";
  const category = learningLibrary.find(c => c.id === activeTab) || learningLibrary[0];

  const typeIcon = { book: "📖", course: "🎓", paper: "📄", tool: "🔧", github: "🐙", video: "🎬" };
  const typeColor = { book: "lib-book", course: "lib-course", paper: "lib-paper", tool: "lib-tool", github: "lib-github", video: "lib-video" };

  section.innerHTML = `
    <div class="lib-tabs" role="tablist">
      ${learningLibrary.map(c => `
        <button class="lib-tab ${c.id === activeTab ? "lib-tab-active" : ""}" data-cat="${c.id}" type="button" role="tab">
          ${c.category}
        </button>
      `).join("")}
    </div>
    <p class="lib-months">⏰ When to use: <strong>${category.months}</strong></p>
    <div class="lib-grid">
      ${category.items.map(item => `
        <a class="lib-card ${typeColor[item.type] || ""}" href="${item.url}" target="_blank" rel="noreferrer">
          <div class="lib-card-top">
            <span class="lib-type-badge">${typeIcon[item.type] || "🔗"} ${item.type}</span>
          </div>
          <strong class="lib-card-name">${item.label}</strong>
          <p class="lib-card-desc">${item.desc}</p>
        </a>
      `).join("")}
    </div>
  `;

  section.querySelectorAll(".lib-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      section.dataset.tab = btn.dataset.cat;
      renderLearningLibrary();
    });
  });
}

const folders = [
  ["knowledge-base/", "Your reference library: resources, learning journey, and zero-to-hero guides.", "knowledge-base/RESOURCES.md"],
  ["knowledge-base/learning-journey/", "A numbered week-by-week program with small tasks and code examples.", "knowledge-base/learning-journey/README.md"],
  ["knowledge-base/zero-to-hero-guides/", "Deep reference guides for Python, SQL, Docker, Django, IoT, MIS, optimization, and more.", "knowledge-base/zero-to-hero-guides/README.md"],
  ["projects/foundations/", "Projects 1-4: churn, sales, house prices, and news classification.", "projects/foundations/project-1-customer-churn/README.md"],
  ["projects/advanced/", "Projects 5-7: factory twin, predictive maintenance, and supply chain optimization.", "projects/advanced/project-5-factory-twin/PREREQUISITES.md"],
  ["phase folders", "Execution folders for Months 1-12, each with resources and deliverable locations.", "README.md"],
];

const projects = [
  {
    group: "foundations",
    title: "Telecom Customer Churn",
    role: "Data Scientist",
    month: "Month 2",
    time: "8-12 hours",
    outcome: "EDA, hypothesis tests, churn classifier, feature importance, and business recommendations.",
    skills: ["pandas", "scipy", "classification", "business storytelling"],
    path: "projects/foundations/project-1-customer-churn/README.md",
    instructions: "projects/foundations/project-1-customer-churn/INSTRUCTIONS.md",
    prerequisites: "projects/foundations/project-1-customer-churn/PREREQUISITES.md",
    code: "projects/foundations/project-1-customer-churn/customer_churn_analysis.py",
  },
  {
    group: "foundations",
    title: "Retail Sales Performance",
    role: "Data Analyst",
    month: "Month 2",
    time: "6-9 hours",
    outcome: "Clean sales data, answer management questions, build KPI summaries and visual reports.",
    skills: ["groupby", "date parsing", "visualization", "managerial insights"],
    path: "projects/foundations/project-2-sales-analysis/README.md",
    instructions: "projects/foundations/project-2-sales-analysis/INSTRUCTIONS.md",
    prerequisites: "projects/foundations/project-2-sales-analysis/PREREQUISITES.md",
    code: "projects/foundations/project-2-sales-analysis/sales_performance_analysis.py",
  },
  {
    group: "foundations",
    title: "House Price ML Pipeline",
    role: "ML Engineer",
    month: "Month 3",
    time: "10-14 hours",
    outcome: "A reproducible scikit-learn pipeline with preprocessing, validation, model selection, and serialization.",
    skills: ["Pipeline", "ColumnTransformer", "cross-validation", "joblib"],
    path: "projects/foundations/project-3-house-price-pipeline/README.md",
    instructions: "projects/foundations/project-3-house-price-pipeline/INSTRUCTIONS.md",
    prerequisites: "projects/foundations/project-3-house-price-pipeline/PREREQUISITES.md",
    code: "projects/foundations/project-3-house-price-pipeline/house_price_pipeline.py",
  },
  {
    group: "foundations",
    title: "News Classification NLP",
    role: "AI Engineer",
    month: "Month 4",
    time: "12-18 hours",
    outcome: "Compare TF-IDF baseline with transformer fine-tuning on AG News classification.",
    skills: ["TF-IDF", "BERT", "Hugging Face", "model comparison"],
    path: "projects/foundations/project-4-news-classification/README.md",
    instructions: "projects/foundations/project-4-news-classification/INSTRUCTIONS.md",
    prerequisites: "projects/foundations/project-4-news-classification/PREREQUISITES.md",
    code: "projects/foundations/project-4-news-classification/news_classification_nlp.py",
  },
  {
    group: "advanced",
    title: "Agentic Factory Digital Twin",
    role: "AI Systems Engineer",
    month: "Month 9",
    time: "Advanced reference",
    outcome: "SimPy factory simulation, anomaly detection, and an LLM agent that reasons and acts.",
    skills: ["SimPy", "IsolationForest", "tool calling", "factory simulation"],
    path: "projects/advanced/project-5-factory-twin/PREREQUISITES.md",
    instructions: null,
    prerequisites: "projects/advanced/project-5-factory-twin/PREREQUISITES.md",
    code: "projects/advanced/project-5-factory-twin/project1_factory_twin.py",
  },
  {
    group: "advanced",
    title: "Predictive Maintenance",
    role: "Senior ML Engineer",
    month: "Month 9",
    time: "Capstone reference",
    outcome: "Remaining Useful Life model with window features, XGBoost, and diagnostic RAG notes.",
    skills: ["CMAPSS", "RUL", "rolling features", "XGBoost"],
    path: "projects/advanced/project-6-predictive-maintenance/PREREQUISITES.md",
    instructions: null,
    prerequisites: "projects/advanced/project-6-predictive-maintenance/PREREQUISITES.md",
    code: "projects/advanced/project-6-predictive-maintenance/project2_predictive_maintenance.py",
  },
  {
    group: "advanced",
    title: "Generative Supply Chain Optimizer",
    role: "Operations Data Scientist",
    month: "Month 9",
    time: "Strong IE demo",
    outcome: "NetworkX graph, demand forecast, PuLP optimizer, and LLM risk monitoring.",
    skills: ["NetworkX", "Prophet", "PuLP", "risk agent"],
    path: "projects/advanced/project-7-supply-chain/PREREQUISITES.md",
    instructions: null,
    prerequisites: "projects/advanced/project-7-supply-chain/PREREQUISITES.md",
    code: "projects/advanced/project-7-supply-chain/project3_supply_chain.py",
  },
  // ── AI-Native Projects (2026 market positioning) ──
  {
    group: "ai-native",
    title: "AI Automation Workflow",
    role: "Automation Engineer / AI Workflow Designer",
    month: "Month 6–7",
    time: "12–18 hours",
    outcome: "An end-to-end automation pipeline: trigger → data transform → AI decision → action → notification. Zero manual steps in the critical path.",
    skills: ["Celery + Redis", "LLM API (structured output)", "webhook triggers", "FastAPI", "business logic encoding"],
    path: "projects/foundations/project-1-customer-churn/README.md",
    instructions: null,
    prerequisites: "projects/foundations/project-1-customer-churn/PREREQUISITES.md",
    code: "projects/foundations/project-1-customer-churn/customer_churn_analysis.py",
    description: [
      "Choose a real repetitive workflow (e.g. daily report generation, data quality check, alert routing, or document summarisation).",
      "Build a trigger (scheduled Celery task or webhook) that starts the pipeline automatically.",
      "Add an AI step: call an LLM with structured output (JSON) to make a classification, summarise text, or flag an anomaly.",
      "Connect the output to an action: send a Slack message, write to a database, or update a dashboard.",
      "Document the before/after: how many minutes per day does this save? What was done manually before?",
      "Bonus: add an approval step where the AI flags something for human review before acting.",
    ],
  },
  {
    group: "ai-native",
    title: "AI Business Analyst Tool",
    role: "AI Product Engineer / Data + AI Engineer",
    month: "Month 4–6",
    time: "10–14 hours",
    outcome: "A FastAPI or Django tool that accepts raw business data (CSV or text), runs statistical analysis, and returns AI-written insights with cited numbers.",
    skills: ["pandas", "scipy.stats", "LLM API", "FastAPI", "structured prompts", "product thinking"],
    path: "projects/foundations/project-2-sales-analysis/README.md",
    instructions: null,
    prerequisites: "projects/foundations/project-2-sales-analysis/PREREQUISITES.md",
    code: "projects/foundations/project-2-sales-analysis/sales_performance_analysis.py",
    description: [
      "Upload a CSV of business data (sales, operations, HR — anything real or realistic).",
      "Run statistical analysis: trends, outliers, correlations, period-over-period change.",
      "Build a prompt that gives the LLM the actual numbers and asks for: (1) key insight, (2) possible cause, (3) recommended action.",
      "Return structured output: JSON with insight, confidence, and supporting data points.",
      "Build a minimal frontend (1 HTML page) to show results clearly — no data science background needed to read it.",
      "Write a 1-page product brief: the problem you solved, who uses it, and how you would measure whether it works.",
    ],
  },
  {
    group: "ai-native",
    title: "Multi-Skill AI Portfolio Capstone",
    role: "AI Product Engineer — strongest portfolio item",
    month: "Month 12",
    time: "20–30 hours",
    outcome: "A deployed AI product combining data + ML + API + agent + real business value. Something another person can use, with documented ROI.",
    skills: ["Django or FastAPI", "scikit-learn or LLM", "AI agent with tools", "CI/CD", "deployment", "ROI calculation"],
    path: "projects/advanced/project-5-factory-twin/PREREQUISITES.md",
    instructions: null,
    prerequisites: "projects/advanced/project-5-factory-twin/PREREQUISITES.md",
    code: "projects/advanced/project-5-factory-twin/project1_factory_twin.py",
    description: [
      "Pick a real problem from your IE or DS background that no existing free tool fully solves.",
      "Build a full product: data ingestion → processing → ML or LLM layer → API → simple UI.",
      "Add an AI agent that can answer questions about the data, flag anomalies, or recommend actions.",
      "Deploy it publicly (Render, Railway, or Hugging Face Spaces — all free tier).",
      "Write the ROI case: what does this replace, how long did it take manually before, and what is the measurable improvement?",
      "This is the project you show in every interview. It proves you are multi-skill, product-aware, and business-focused — not just a coder.",
    ],
  },
];

const resources = [
  ["Roadmap", "Main 12-month roadmap and operating strategy", "all", "README.md"],
  ["Curated bookmarks", "Hand-picked links by IE superpower and phase", "resources", "knowledge-base/RESOURCES.md"],
  ["Learning journey order", "Numbered weekly plan from terminal basics through capstone", "journey", "knowledge-base/learning-journey/README.md"],
  ["Capstone roadmap", "Advanced Month 5-9 capstone sequence", "capstone", "knowledge-base/learning-journey/CAPSTONE_ROADMAP.md"],
  ["Python guide", "Zero-to-hero Python reference", "guide", "knowledge-base/zero-to-hero-guides/python/README.md"],
  ["SQL guide", "SQL analytics and data engineering practice", "guide", "knowledge-base/zero-to-hero-guides/sql/sql_zero_to_hero.sql"],
  ["Docker guide", "Container commands and explanations", "guide", "knowledge-base/zero-to-hero-guides/docker/README.md"],
  ["Django guide", "Full-stack web framework reference", "guide", "knowledge-base/zero-to-hero-guides/django/django_zero_to_hero.py"],
  ["Arduino guide", "Embedded basics and sensor examples", "guide", "knowledge-base/zero-to-hero-guides/arduino/README.md"],
  ["IoT guide", "Hardware-to-web data pipeline reference", "guide", "knowledge-base/zero-to-hero-guides/iot/README.md"],
  ["Optimization guide", "OR-Tools, PuLP, and IE optimization patterns", "guide", "knowledge-base/zero-to-hero-guides/optimization/README.md"],
  ["MIS guide", "Enterprise data architecture, BI, and automation", "guide", "knowledge-base/zero-to-hero-guides/mis/README.md"],
  ["Supply chain guide", "Demand, inventory, and route optimization pillars", "guide", "knowledge-base/zero-to-hero-guides/supply-chain/README.md"],
  ["Month 1 resources", "Python, Linux, Git, and setup files", "month", "phase-1-software-engineering/month-01-python-oop-git/resources/"],
  ["Month 2 resources", "Data cleaning, SQL, NumPy, pandas, APIs, stats", "month", "phase-1-software-engineering/month-02-databases-web/resources/"],
  ["Month 3 resources", "Docker, ML scripts, regression, random forest, ML deployment", "month", "phase-2-production-ml/month-03-docker-mlops/resources/"],
  ["Month 4 resources", "Cloud and CI/CD shell guide", "month", "phase-2-production-ml/month-04-cloud-cicd/resources/"],
  ["Month 5 resources", "Django zero-to-hero implementation file", "month", "phase-3-full-stack-web/month-05-django-fundamentals/resources/"],
  ["Month 6 resources", "ML script for Django integration", "month", "phase-3-full-stack-web/month-06-ml-into-django/resources/"],
  ["Month 7 resources", "Arduino and serial data files", "month", "phase-4-iot-hardware/month-07-microcontrollers/resources/"],
  ["Month 8 resources", "ESP32, Flask server, dashboard, IoT guide", "month", "phase-4-iot-hardware/month-08-iot-streaming/resources/"],
  ["Month 9 capstone", "Cold-chain starter code and advanced references", "capstone", "phase-5-capstone/month-09-grand-capstone/"],
  ["Month 10 resources", "NLP, LLM basics, news classification reference", "month", "phase-6-generative-ai/month-10-nlp-llm-basics/resources/"],
  ["Month 11 resources", "RAG pipeline implementation", "month", "phase-6-generative-ai/month-11-rag-vector-databases/resources/rag_pipeline.py"],
  ["Month 12 resources", "Agentic AI implementation guide", "month", "phase-6-generative-ai/month-12-agentic-ai/resources/agentic_ai.py"],
  ["Project 1", "Customer churn prediction", "project", "projects/foundations/project-1-customer-churn/README.md"],
  ["Project 2", "Retail sales performance analysis", "project", "projects/foundations/project-2-sales-analysis/README.md"],
  ["Project 3", "House price ML pipeline", "project", "projects/foundations/project-3-house-price-pipeline/README.md"],
  ["Project 4", "News classification with NLP and transformers", "project", "projects/foundations/project-4-news-classification/README.md"],
  ["Project 5", "Factory digital twin", "project", "projects/advanced/project-5-factory-twin/PREREQUISITES.md"],
  ["Project 6", "Predictive maintenance", "project", "projects/advanced/project-6-predictive-maintenance/PREREQUISITES.md"],
  ["Project 7", "Supply chain optimizer", "project", "projects/advanced/project-7-supply-chain/PREREQUISITES.md"],
];

const monthWorkspacePaths = {
  1: "phase-1-software-engineering/month-01-python-oop-git/resources/",
  2: "phase-1-software-engineering/month-02-databases-web/resources/",
  3: "phase-2-production-ml/month-03-docker-mlops/resources/",
  4: "phase-2-production-ml/month-04-cloud-cicd/resources/",
  5: "phase-3-full-stack-web/month-05-django-fundamentals/resources/",
  6: "phase-3-full-stack-web/month-06-ml-into-django/resources/",
  7: "phase-4-iot-hardware/month-07-microcontrollers/resources/",
  8: "phase-4-iot-hardware/month-08-iot-streaming/resources/",
  9: "phase-5-capstone/month-09-grand-capstone/",
  10: "phase-6-generative-ai/month-10-nlp-llm-basics/resources/",
  11: "phase-6-generative-ai/month-11-rag-vector-databases/resources/",
  12: "phase-6-generative-ai/month-12-agentic-ai/resources/",
};

const labTasks = [
  {
    id: "month-01",
    group: "Month task",
    title: "CSV Cleaner CLI Core",
    source: "phase-1-software-engineering/month-01-python-oop-git/resources/python_zero_to_hero.py",
    prompt: "Write a function clean_rows(rows) that receives a list of dictionaries, removes rows with empty name or amount, trims whitespace, converts amount to float, and returns the cleaned list.",
    expected: "The test data should return 2 cleaned rows and print total=42.5.",
    starter: `def clean_rows(rows):
    cleaned = []
    # TODO: remove bad rows, trim text, convert amount to float
    return cleaned

sample = [
    {"name": " Alice ", "amount": "10.5"},
    {"name": "", "amount": "7"},
    {"name": "Bob", "amount": "32"},
    {"name": "Cara", "amount": ""},
]
result = clean_rows(sample)
print("rows=", len(result))
print("total=", sum(row["amount"] for row in result))`,
    tests: `assert len(result) == 2
assert result[0]["name"] == "Alice"
assert result[1]["name"] == "Bob"
assert abs(sum(row["amount"] for row in result) - 42.5) < 0.001
print("TESTS PASSED: CSV cleaner works")`,
    checks: [
      ["Defines clean_rows", /def\s+clean_rows\s*\(/],
      ["Uses a loop", /for\s+\w+\s+in\s+rows/],
      ["Converts amount to float", /float\s*\(/],
      ["Skips empty values", /continue|if\s+not|!=\s*["']/],
      ["Printed total=42.5", /total=\s*42\.5|total=\s*42\.50/, "output"],
    ],
  },
  {
    id: "month-02",
    group: "Month task",
    title: "FastAPI Prediction Shape",
    source: "phase-1-software-engineering/month-02-databases-web/resources/",
    prompt: "Sketch the core FastAPI endpoint for a prediction service. It should define an app, an input model, and a POST /predict endpoint returning a prediction field.",
    expected: "The code should show FastAPI, BaseModel, @app.post('/predict'), and a returned prediction.",
    starter: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# TODO: define input schema

# TODO: define POST /predict endpoint
`,
    checks: [
      ["Imports FastAPI", /from\s+fastapi\s+import\s+FastAPI/],
      ["Uses BaseModel", /BaseModel/],
      ["Creates app", /app\s*=\s*FastAPI\s*\(/],
      ["Defines POST /predict", /@app\.post\s*\(\s*["']\/predict["']\s*\)/],
      ["Returns prediction", /return\s+.*prediction/s],
    ],
  },
  {
    id: "month-03",
    group: "Month task",
    title: "Dockerfile for ML API",
    source: "phase-2-production-ml/month-03-docker-mlops/resources/Dockerfile",
    prompt: "Write a Dockerfile for a Python FastAPI ML service. Include base image, workdir, copy requirements, install dependencies, copy code, expose a port, and run uvicorn.",
    expected: "The Dockerfile should be enough for docker build and docker run to start an API server.",
    starter: `FROM python:3.11-slim

# TODO: add WORKDIR, COPY, RUN pip install, EXPOSE, CMD
`,
    checks: [
      ["Uses Python base image", /FROM\s+python:/i],
      ["Sets WORKDIR", /WORKDIR\s+/i],
      ["Copies requirements", /COPY\s+.*requirements/i],
      ["Installs dependencies", /pip\s+install/i],
      ["Exposes API port", /EXPOSE\s+\d+/i],
      ["Runs uvicorn", /uvicorn/i],
    ],
  },
  {
    id: "month-04",
    group: "Month task",
    title: "GitHub Actions CI",
    source: "phase-2-production-ml/month-04-cloud-cicd/resources/cloud_and_cicd_guide.sh",
    prompt: "Write the important parts of a GitHub Actions workflow that checks out code, sets up Python, installs dependencies, and runs tests.",
    expected: "A YAML-like workflow with checkout, setup-python, pip install, and pytest.",
    starter: `name: tests
on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      # TODO
`,
    checks: [
      ["Uses checkout action", /actions\/checkout/],
      ["Sets up Python", /setup-python/],
      ["Installs requirements", /pip\s+install.*requirements|pip\s+install\s+-r/i],
      ["Runs tests", /pytest|python\s+-m\s+pytest/],
    ],
  },
  {
    id: "month-05",
    group: "Month task",
    title: "Django CRUD Model",
    source: "phase-3-full-stack-web/month-05-django-fundamentals/resources/django_zero_to_hero.py",
    prompt: "Write a small Django model for a project task tracker. Include a title, status, created timestamp, and __str__ method.",
    expected: "A Task model that Django can migrate and display in admin.",
    starter: `from django.db import models

# TODO: create Task model
`,
    checks: [
      ["Imports models", /from\s+django\.db\s+import\s+models/],
      ["Defines Task model", /class\s+Task\s*\(\s*models\.Model\s*\)/],
      ["Has title field", /title\s*=\s*models\./],
      ["Has status field", /status\s*=\s*models\./],
      ["Has created timestamp", /created.*DateTimeField|auto_now_add/],
      ["Defines __str__", /def\s+__str__\s*\(/],
    ],
  },
  {
    id: "month-06",
    group: "Month task",
    title: "Celery ML Task",
    source: "phase-3-full-stack-web/month-06-ml-into-django/resources/ml_script.py",
    prompt: "Write the skeleton of a Celery task that receives an uploaded CSV path, loads it, runs a prediction function, saves results, and returns a status dictionary.",
    expected: "A shared_task function with pandas loading, prediction call, saved output, and status return.",
    starter: `from celery import shared_task
import pandas as pd

# TODO: write process_uploaded_csv
`,
    checks: [
      ["Uses shared_task", /@shared_task/],
      ["Accepts a CSV path", /def\s+\w+\s*\([^)]*csv_path/],
      ["Reads CSV", /pd\.read_csv\s*\(/],
      ["Calls prediction or model logic", /predict|model|inference/i],
      ["Returns status dictionary", /return\s+\{[^}]*status/s],
    ],
  },
  {
    id: "month-07",
    group: "Month task",
    title: "ESP32 Sensor Loop",
    source: "phase-4-iot-hardware/month-07-microcontrollers/resources/arduino_zero_to_hero.ino",
    prompt: "Write Arduino-style code that initializes Serial, reads temperature and humidity from a DHT sensor in loop, prints both values, and delays 10 seconds.",
    expected: "C++/Arduino sketch with setup, loop, DHT read calls, Serial output, and delay(10000).",
    starter: `void setup() {
  // TODO
}

void loop() {
  // TODO
}`,
    checks: [
      ["Defines setup", /void\s+setup\s*\(/],
      ["Defines loop", /void\s+loop\s*\(/],
      ["Starts Serial", /Serial\.begin\s*\(/],
      ["Reads temperature", /readTemperature|temperature/i],
      ["Reads humidity", /readHumidity|humidity/i],
      ["Waits 10 seconds", /delay\s*\(\s*10000\s*\)/],
    ],
  },
  {
    id: "month-08",
    group: "Month task",
    title: "IoT Ingestion Endpoint",
    source: "phase-4-iot-hardware/month-08-iot-streaming/resources/flask_server.py",
    prompt: "Sketch a backend endpoint that receives JSON sensor readings with temperature and humidity, validates them, stores or appends them, and returns ok.",
    expected: "Endpoint code with POST, JSON extraction, temperature/humidity fields, storage step, and success response.",
    starter: `# Use Flask, FastAPI, or Django-style pseudocode.
# TODO: write POST endpoint for sensor readings
`,
    checks: [
      ["Defines POST endpoint", /post|POST|@.*\.post/i],
      ["Reads JSON/body data", /json|request\.data|request\.get_json|body/i],
      ["Handles temperature", /temperature|temp/i],
      ["Handles humidity", /humidity/i],
      ["Stores reading", /save|create|append|insert|objects\.create/i],
      ["Returns success", /ok|success|status/i],
    ],
  },
  {
    id: "month-09",
    group: "Month task",
    title: "Cold-Chain Risk Function",
    source: "phase-5-capstone/month-09-grand-capstone/deliverable/cold_chain_capstone.py",
    prompt: "Write a pure Python function financial_risk(probability, spoilage_cost) that returns the expected dollar risk. Then print the risk for 0.78 and 12000.",
    expected: "The output should include 9360.0.",
    starter: `def financial_risk(probability, spoilage_cost):
    # TODO
    return 0

risk = financial_risk(0.78, 12000)
print(risk)`,
    tests: `assert financial_risk(0.78, 12000) == 9360
assert financial_risk(0.5, 200) == 100
print("TESTS PASSED: financial risk calculation works")`,
    checks: [
      ["Defines financial_risk", /def\s+financial_risk\s*\(/],
      ["Multiplies probability by cost", /probability\s*\*\s*spoilage_cost|spoilage_cost\s*\*\s*probability/],
      ["Prints 9360", /9360/, "output"],
    ],
  },
  {
    id: "month-10",
    group: "Month task",
    title: "LLM API Endpoint",
    source: "phase-6-generative-ai/month-10-nlp-llm-basics/resources/nlp_and_llm_basics.py",
    prompt: "Sketch a FastAPI endpoint that accepts a question, calls an LLM client, and returns an answer field. Keep secrets in environment variables.",
    expected: "Endpoint shape with question input, client call, environment variable, and returned answer.",
    starter: `import os
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# TODO
`,
    checks: [
      ["Uses environment variable", /os\.getenv|os\.environ/],
      ["Defines question schema", /question/],
      ["Defines API endpoint", /@app\.post|@app\.get/],
      ["Calls a model/client", /client|openai|chat|responses|generate/i],
      ["Returns answer", /answer/],
    ],
  },
  {
    id: "month-11",
    group: "Month task",
    title: "RAG Pipeline Steps",
    source: "phase-6-generative-ai/month-11-rag-vector-databases/resources/rag_pipeline.py",
    prompt: "Write pseudocode or Python skeleton for a RAG pipeline: load document, chunk text, embed chunks, store vectors, retrieve relevant chunks, generate answer.",
    expected: "All six RAG stages should appear in order.",
    starter: `def answer_with_rag(question, document_path):
    # TODO: load document
    # TODO: chunk text
    # TODO: embed chunks
    # TODO: store vectors
    # TODO: retrieve context
    # TODO: generate answer
    pass
`,
    checks: [
      ["Loads document", /load|open|pdf/i],
      ["Chunks text", /chunk|split/i],
      ["Embeds chunks", /embed|embedding/i],
      ["Stores vectors", /vector|chroma|pgvector|store/i],
      ["Retrieves context", /retrieve|similarity|search/i],
      ["Generates answer", /generate|answer|llm/i],
    ],
  },
  {
    id: "month-12",
    group: "Month task",
    title: "Agent Tool Registry",
    source: "phase-6-generative-ai/month-12-agentic-ai/resources/agentic_ai.py",
    prompt: "Define three agent tools as Python functions: query_sql, search_web, and run_analysis. Then create a tools list that registers them.",
    expected: "Three callable tools and a list/dictionary the agent could use.",
    starter: `def query_sql(question):
    pass

def search_web(query):
    pass

def run_analysis(script_name):
    pass

# TODO: register tools
`,
    checks: [
      ["Defines query_sql", /def\s+query_sql\s*\(/],
      ["Defines search_web", /def\s+search_web\s*\(/],
      ["Defines run_analysis", /def\s+run_analysis\s*\(/],
      ["Creates tools registry", /tools\s*=\s*\[|tools\s*=\s*\{/],
      ["Includes all tools in registry", /query_sql[\s\S]*search_web[\s\S]*run_analysis|run_analysis[\s\S]*search_web[\s\S]*query_sql/],
    ],
  },
  {
    id: "project-01",
    group: "Project submission",
    title: "Submit Project 1: Customer Churn",
    source: "projects/foundations/project-1-customer-churn/README.md",
    prompt: "Paste your project submission note. Include saved output files, metrics, tests, and business recommendations.",
    expected: "A complete submission should mention figures, statistical tests, model metrics, feature importance, and recommendations.",
    starter: `Project path:
Dataset used:
Figures saved:
Statistical tests completed:
Model metrics:
Feature importance:
Business recommendations:
What I would improve next:
`,
    checks: [
      ["Mentions dataset", /dataset|telco|churn/i],
      ["Mentions figures", /figure|plot|chart|png/i],
      ["Mentions statistical tests", /chi|t-test|hypothesis|statistical/i],
      ["Mentions model metrics", /f1|auc|accuracy|precision|recall/i],
      ["Mentions recommendations", /recommend|business|retain|retention/i],
    ],
  },
  {
    id: "project-02",
    group: "Project submission",
    title: "Submit Project 2: Sales Analysis",
    source: "projects/foundations/project-2-sales-analysis/README.md",
    prompt: "Paste your project submission note for the retail sales analysis.",
    expected: "A complete submission should answer business questions with KPIs, trends, profit findings, and saved charts.",
    starter: `Project path:
Dataset used:
KPI summary:
Most profitable categories:
Regional findings:
Discount/profit finding:
Charts saved:
Manager summary:
`,
    checks: [
      ["Mentions KPIs", /kpi|revenue|profit|margin/i],
      ["Mentions categories", /category|sub-category|product/i],
      ["Mentions regions", /region|state|market/i],
      ["Mentions discount impact", /discount/i],
      ["Mentions manager summary", /summary|manager|recommend/i],
    ],
  },
  {
    id: "project-03",
    group: "Project submission",
    title: "Submit Project 3: House Price Pipeline",
    source: "projects/foundations/project-3-house-price-pipeline/README.md",
    prompt: "Paste your project submission note for the end-to-end ML pipeline.",
    expected: "A complete submission should prove reproducibility: pipeline, validation, saved model, and prediction output.",
    starter: `Project path:
Pipeline steps:
Models compared:
Validation metric:
Best model:
Saved model file:
Prediction output:
Reproducibility notes:
`,
    checks: [
      ["Mentions pipeline", /pipeline|columntransformer|preprocess/i],
      ["Mentions validation", /cross-validation|cv|rmse|mae/i],
      ["Mentions model comparison", /linear|ridge|lasso|random forest|xgboost/i],
      ["Mentions saved model", /joblib|pkl|pickle|saved model/i],
      ["Mentions predictions", /prediction|submission|output/i],
    ],
  },
  {
    id: "project-04",
    group: "Project submission",
    title: "Submit Project 4: News Classification",
    source: "projects/foundations/project-4-news-classification/README.md",
    prompt: "Paste your NLP project submission note.",
    expected: "A complete submission should compare classical NLP and transformer results.",
    starter: `Project path:
Dataset used:
TF-IDF baseline metric:
Transformer metric:
Confusion matrix saved:
Comparison conclusion:
What I learned:
`,
    checks: [
      ["Mentions TF-IDF baseline", /tf-idf|tfidf|baseline/i],
      ["Mentions transformer", /bert|transformer|hugging/i],
      ["Mentions metric", /accuracy|f1|precision|recall/i],
      ["Mentions comparison", /compare|better|worse|baseline/i],
      ["Mentions saved result", /confusion|figure|model|output/i],
    ],
  },
  {
    id: "project-05",
    group: "Project submission",
    title: "Submit Project 5: Factory Twin",
    source: "projects/advanced/project-5-factory-twin/PREREQUISITES.md",
    prompt: "Paste your factory twin submission note.",
    expected: "A complete submission should include simulation, anomaly detection, agent tool use, and corrective action evidence.",
    starter: `Project path:
Simulation design:
Anomaly detection method:
Agent tools:
Corrective action:
Evidence/output:
Limitations:
`,
    checks: [
      ["Mentions simulation", /simpy|simulation|factory|machine/i],
      ["Mentions anomaly detection", /anomaly|isolationforest|detect/i],
      ["Mentions agent tools", /agent|tool|react|llm/i],
      ["Mentions corrective action", /reroute|adjust|correct|action/i],
      ["Mentions evidence", /output|log|screenshot|result/i],
    ],
  },
  {
    id: "project-06",
    group: "Project submission",
    title: "Submit Project 6: Predictive Maintenance",
    source: "projects/advanced/project-6-predictive-maintenance/PREREQUISITES.md",
    prompt: "Paste your predictive maintenance submission note.",
    expected: "A complete submission should include RUL target, rolling features, model metric, and maintenance interpretation.",
    starter: `Project path:
Dataset:
RUL target definition:
Rolling/window features:
Model and metric:
Diagnostic report:
Maintenance decision:
`,
    checks: [
      ["Mentions CMAPSS or RUL", /cmapss|rul|remaining useful life/i],
      ["Mentions rolling features", /rolling|window|diff|sensor/i],
      ["Mentions model", /xgboost|regressor|random forest|model/i],
      ["Mentions metric", /rmse|score|mae/i],
      ["Mentions maintenance decision", /maintenance|diagnostic|failure|decision/i],
    ],
  },
  {
    id: "project-07",
    group: "Project submission",
    title: "Submit Project 7: Supply Chain Optimizer",
    source: "projects/advanced/project-7-supply-chain/PREREQUISITES.md",
    prompt: "Paste your supply chain optimizer submission note.",
    expected: "A complete submission should include network model, forecast, optimization result, and business impact.",
    starter: `Project path:
Network model:
Demand forecast:
Optimization formulation:
Best route/facility decision:
Cost or service impact:
Risk agent behavior:
`,
    checks: [
      ["Mentions network model", /networkx|graph|node|edge|route/i],
      ["Mentions forecast", /forecast|prophet|demand/i],
      ["Mentions optimization", /pulp|linear programming|optimizer|constraint/i],
      ["Mentions cost or service impact", /cost|service|impact|savings/i],
      ["Mentions risk agent", /agent|risk|disruption|monitor/i],
    ],
  },
];

let pyodideReady = null;

const pythonLessons = [
  {
    id: "py-01",
    day: "Lesson 1",
    title: "Print and comments",
    explain: "print() sends text or numbers to the output. Comments start with # and explain your thinking. This is the first habit: run tiny code and inspect exactly what happened.",
    goals: ["Use print() three times", "Print text inside quotes", "Print a number", "Leave one useful comment"],
    starter: `# Lesson 1: print and comments
# Write your first outputs below.

print("Hello Python")
print("My name is ...")
print(2026)
`,
    expected: "Your output should include Hello Python, your name line, and a number.",
    tests: `assert "Hello Python" in _lesson_output
assert len([line for line in _lesson_output.splitlines() if line.strip()]) >= 3
print("TESTS PASSED: print basics complete")`,
    checks: [
      ["Uses print at least three times", /print\s*\([^)]*\)[\s\S]*print\s*\([^)]*\)[\s\S]*print\s*\([^)]*\)/],
      ["Has a comment", /#/],
      ["Output includes Hello Python", /Hello Python/, "output"],
    ],
  },
  {
    id: "py-02",
    day: "Lesson 2",
    title: "Variables and types",
    explain: "A variable is a name for a value. Use strings for text, integers for whole numbers, floats for decimals, and booleans for True or False.",
    goals: ["Create name, gpa, student_id, and is_enrolled", "Print each value", "Print at least one type() result"],
    starter: `# Lesson 2: variables and types

name = "Alex"
gpa = 3.8
student_id = 12345
is_enrolled = True

print(name)
print(gpa)
print(student_id)
print(is_enrolled)
print(type(name))
`,
    expected: "Your output should show values and at least one Python type.",
    tests: `assert isinstance(name, str)
assert isinstance(gpa, float)
assert isinstance(student_id, int)
assert is_enrolled is True
assert "<class 'str'>" in _lesson_output
print("TESTS PASSED: variables and types complete")`,
    checks: [
      ["Defines name", /name\s*=/],
      ["Defines gpa", /gpa\s*=/],
      ["Defines student_id", /student_id\s*=/],
      ["Defines is_enrolled", /is_enrolled\s*=\s*True/],
      ["Uses type()", /type\s*\(/],
    ],
  },
  {
    id: "py-03",
    day: "Lesson 3",
    title: "Strings and f-strings",
    explain: "Strings are text. You will clean strings constantly in data work. Practice length, uppercase, strip, split, slicing, and f-strings.",
    goals: ["Create full_name and subject", "Print length and uppercase", "Clean a messy sentence", "Use an f-string"],
    starter: `# Lesson 3: strings

full_name = "Alex Morgan"
subject = "Data Science"

print(len(full_name))
print(full_name.upper())

sentence = "  Python is amazing for data science  "
clean_sentence = sentence.strip().upper()
print(clean_sentence)

print(f"My name is {full_name} and I study {subject}")
`,
    expected: "Your output should include uppercase text and an f-string sentence.",
    tests: `assert isinstance(full_name, str)
assert clean_sentence == "PYTHON IS AMAZING FOR DATA SCIENCE"
assert "My name is" in _lesson_output and "I study" in _lesson_output
print("TESTS PASSED: string basics complete")`,
    checks: [
      ["Uses len()", /len\s*\(/],
      ["Uses upper()", /\.upper\s*\(/],
      ["Uses strip()", /\.strip\s*\(/],
      ["Uses f-string", /f["']/],
    ],
  },
  {
    id: "py-04",
    day: "Lesson 4",
    title: "Numbers and math",
    explain: "Python handles normal arithmetic and math functions. This is the foundation for data analysis, statistics, and machine learning calculations.",
    goals: ["Import math", "Calculate circle area", "Calculate exam average", "Calculate train and test rows"],
    starter: `# Lesson 4: numbers and math
import math

radius = 7
area = math.pi * radius ** 2
print(round(area, 2))

exam_1 = 87
exam_2 = 93
average = (exam_1 + exam_2) / 2
print(average)

rows = 1000
train_rows = int(rows * 0.8)
test_rows = rows - train_rows
print(train_rows, test_rows)
`,
    expected: "Your output should include about 153.94, 90.0, and 800 200.",
    tests: `assert round(area, 2) == 153.94
assert average == 90
assert train_rows == 800
assert test_rows == 200
print("TESTS PASSED: math basics complete")`,
    checks: [
      ["Imports math", /import\s+math/],
      ["Uses exponent", /\*\*/],
      ["Calculates average", /average\s*=/],
      ["Calculates train_rows", /train_rows\s*=/],
    ],
  },
  {
    id: "py-05",
    day: "Lesson 5",
    title: "Lists",
    explain: "Lists store multiple values in order. In data work, lists are your first collection before you move to arrays, Series, and DataFrames.",
    goals: ["Create a list of scores", "Append one score", "Print first and last values", "Calculate average score"],
    starter: `# Lesson 5: lists

scores = [87, 93, 78]
scores.append(90)

print(scores[0])
print(scores[-1])

average_score = sum(scores) / len(scores)
print(average_score)
`,
    expected: "Your output should include the first score, last score, and average.",
    tests: `assert len(scores) == 4
assert scores[-1] == 90
assert average_score == sum(scores) / len(scores)
print("TESTS PASSED: lists complete")`,
    checks: [
      ["Creates scores list", /scores\s*=\s*\[/],
      ["Uses append()", /\.append\s*\(/],
      ["Uses indexing", /\[[0-9-]+\]/],
      ["Uses sum and len", /sum\s*\([\s\S]*len\s*\(/],
    ],
  },
  {
    id: "py-06",
    day: "Lesson 6",
    title: "If statements",
    explain: "If statements let your program make decisions. Models, dashboards, alerts, and data validation all depend on this idea.",
    goals: ["Create a score", "Use if/elif/else", "Print pass, excellent, or needs practice"],
    starter: `# Lesson 6: if statements

score = 88

if score >= 90:
    result = "excellent"
elif score >= 60:
    result = "pass"
else:
    result = "needs practice"

print(result)
`,
    expected: "For score 88, the output should be pass.",
    tests: `assert result == "pass"
print("TESTS PASSED: if statements complete")`,
    checks: [
      ["Uses if", /if\s+/],
      ["Uses elif", /elif\s+/],
      ["Uses else", /else\s*:/],
      ["Prints result", /print\s*\(\s*result\s*\)/],
    ],
  },
  {
    id: "py-07",
    day: "Lesson 7",
    title: "Loops",
    explain: "Loops repeat work. Data cleaning is often a loop: inspect each item, keep what is valid, transform it, and store the result.",
    goals: ["Loop over raw names", "Strip whitespace", "Skip empty names", "Store cleaned names"],
    starter: `# Lesson 7: loops

raw_names = [" Alice ", "", " Bob ", "Cara "]
clean_names = []

for name in raw_names:
    name = name.strip()
    if name:
        clean_names.append(name)

print(clean_names)
`,
    expected: "The output should be ['Alice', 'Bob', 'Cara'].",
    tests: `assert clean_names == ["Alice", "Bob", "Cara"]
print("TESTS PASSED: loops complete")`,
    checks: [
      ["Uses for loop", /for\s+\w+\s+in\s+/],
      ["Uses strip()", /\.strip\s*\(/],
      ["Uses append()", /\.append\s*\(/],
      ["Output includes Alice", /Alice/, "output"],
    ],
  },
  {
    id: "py-08",
    day: "Lesson 8",
    title: "Functions",
    explain: "Functions package logic so you can reuse and test it. This is the bridge from small scripts to real software.",
    goals: ["Define calculate_average(scores)", "Return the average", "Call the function", "Print the result"],
    starter: `# Lesson 8: functions

def calculate_average(scores):
    return sum(scores) / len(scores)

result = calculate_average([80, 90, 100])
print(result)
`,
    expected: "The output should be 90.0.",
    tests: `assert calculate_average([80, 90, 100]) == 90
assert calculate_average([10, 20]) == 15
print("TESTS PASSED: functions complete")`,
    checks: [
      ["Defines function", /def\s+calculate_average\s*\(/],
      ["Uses return", /return\s+/],
      ["Calls function", /calculate_average\s*\(\s*\[/],
      ["Output includes 90", /90/, "output"],
    ],
  },
  {
    id: "py-09",
    day: "Lesson 9",
    title: "Dictionaries",
    explain: "Dictionaries store named fields. They look like one row of structured data: name, age, GPA, status, prediction, probability.",
    goals: ["Create a student dictionary", "Read fields by key", "Add a new key", "Print a formatted summary"],
    starter: `# Lesson 9: dictionaries

student = {
    "name": "Alex",
    "gpa": 3.8,
    "major": "Data Science",
}

student["is_enrolled"] = True

print(student["name"])
print(f"{student['name']} studies {student['major']} with GPA {student['gpa']}")
`,
    expected: "The output should include the student name and a formatted summary.",
    tests: `assert student["name"] == "Alex"
assert student["is_enrolled"] is True
assert "GPA" in _lesson_output
print("TESTS PASSED: dictionaries complete")`,
    checks: [
      ["Creates dictionary", /student\s*=\s*\{/],
      ["Uses key access", /\[[\"']name[\"']\]/],
      ["Adds is_enrolled", /is_enrolled/],
      ["Uses f-string", /f["']/],
    ],
  },
  {
    id: "py-10",
    day: "Lesson 10",
    title: "Mini data cleaner",
    explain: "This combines strings, lists, loops, dictionaries, if statements, and functions. It is the first real shape of data engineering work.",
    goals: ["Define clean_rows(rows)", "Remove rows with missing name or amount", "Convert amount to float", "Return cleaned rows and total"],
    starter: `# Lesson 10: mini data cleaner

def clean_rows(rows):
    cleaned = []
    for row in rows:
        name = row["name"].strip()
        amount = row["amount"].strip()
        if not name or not amount:
            continue
        cleaned.append({
            "name": name,
            "amount": float(amount),
        })
    return cleaned

sample = [
    {"name": " Alice ", "amount": "10.5"},
    {"name": "", "amount": "7"},
    {"name": "Bob", "amount": "32"},
    {"name": "Cara", "amount": ""},
]

cleaned_rows = clean_rows(sample)
total = sum(row["amount"] for row in cleaned_rows)
print(cleaned_rows)
print(total)
`,
    expected: "The cleaner should keep Alice and Bob, then print total 42.5.",
    tests: `assert len(cleaned_rows) == 2
assert cleaned_rows[0]["name"] == "Alice"
assert cleaned_rows[1]["amount"] == 32.0
assert total == 42.5
print("TESTS PASSED: mini data cleaner complete")`,
    checks: [
      ["Defines clean_rows", /def\s+clean_rows\s*\(/],
      ["Uses loop", /for\s+\w+\s+in\s+rows/],
      ["Uses strip()", /\.strip\s*\(/],
      ["Converts to float", /float\s*\(/],
      ["Output includes 42.5", /42\.5/, "output"],
    ],
  },
  {
    id: "py-11",
    day: "Lesson 11",
    title: "List comprehensions",
    explain: "List comprehensions are a compact way to build a new list from an existing one. They replace many filter-and-transform loops with one readable line. Data engineers use them to clean columns, build feature lists, and filter rows.",
    goals: ["Square each number with a comprehension", "Filter only even numbers", "Extract words longer than 3 chars"],
    starter: `# Lesson 11: list comprehensions

numbers = [1, 2, 3, 4, 5, 6]

squares = [n ** 2 for n in numbers]
print(squares)

evens = [n for n in numbers if n % 2 == 0]
print(evens)

words = ["AI", "data", "science", "ML", "model"]
long_words = [w for w in words if len(w) > 3]
print(long_words)
`,
    expected: "Output should show squares, evens, and long words.",
    tests: `assert squares == [1, 4, 9, 16, 25, 36]
assert evens == [2, 4, 6]
assert long_words == ["data", "science", "model"]
print("TESTS PASSED: list comprehensions complete")`,
    checks: [
      ["Uses comprehension for squares", /\[.*\*\*\s*2.*for.*in/],
      ["Uses filter comprehension", /\[.*for.*in.*if.*\]/],
      ["Output includes 36", /36/, "output"],
      ["Output includes data", /data/, "output"],
    ],
  },
  {
    id: "py-12",
    day: "Lesson 12",
    title: "Tuples and sets",
    explain: "Tuples are immutable sequences — useful for fixed config, geographic coordinates, and function return values. Sets store unique values — useful for deduplication, intersection, and membership checks.",
    goals: ["Create a tuple of column names", "Create a set of categories", "Find unique values and intersection"],
    starter: `# Lesson 12: tuples and sets

columns = ("name", "age", "salary", "department")
print(columns[0], columns[-1])

raw_tags = ["python", "sql", "python", "docker", "sql", "ml"]
unique_tags = set(raw_tags)
print(sorted(unique_tags))

required = {"python", "sql"}
missing = required - unique_tags
print("Missing skills:", missing)
`,
    expected: "Output should show first/last column, sorted unique tags, and missing skills (should be empty).",
    tests: `assert columns[0] == "name"
assert "python" in unique_tags
assert "sql" in unique_tags
assert len(unique_tags) == 4
print("TESTS PASSED: tuples and sets complete")`,
    checks: [
      ["Creates tuple", /columns\s*=\s*\(/],
      ["Creates set", /set\s*\(/],
      ["Uses set subtraction or difference", /missing\s*=|-/],
      ["Output includes docker", /docker/, "output"],
    ],
  },
  {
    id: "py-13",
    day: "Lesson 13",
    title: "Error handling",
    explain: "try/except lets your program survive unexpected input without crashing. Data pipelines must handle missing values, wrong types, and file errors — error handling is not optional.",
    goals: ["Convert a string to float safely", "Handle ZeroDivisionError", "Use a fallback default value"],
    starter: `# Lesson 13: error handling

def safe_float(value, default=0.0):
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

print(safe_float("42.5"))
print(safe_float("N/A"))
print(safe_float(None))

def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None

print(safe_divide(10, 2))
print(safe_divide(10, 0))
`,
    expected: "Output should show 42.5, 0.0, 0.0, 5.0, None.",
    tests: `assert safe_float("42.5") == 42.5
assert safe_float("N/A") == 0.0
assert safe_float(None) == 0.0
assert safe_divide(10, 2) == 5.0
assert safe_divide(10, 0) is None
print("TESTS PASSED: error handling complete")`,
    checks: [
      ["Uses try", /\btry\s*:/],
      ["Uses except", /\bexcept\b/],
      ["Handles ValueError or TypeError", /ValueError|TypeError/],
      ["Handles ZeroDivisionError", /ZeroDivisionError/],
      ["Output includes 42.5", /42\.5/, "output"],
    ],
  },
  {
    id: "py-14",
    day: "Lesson 14",
    title: "File I/O",
    explain: "Every data project starts with reading files. Python's open() reads and writes text and CSV files. This is your first step toward real data pipelines.",
    goals: ["Write a CSV string to a file", "Read the file back", "Count lines and extract headers"],
    starter: `# Lesson 14: file I/O
import os

csv_content = """name,amount,category
Alice,10.5,A
Bob,32.0,B
Cara,7.0,A
"""

with open("test_data.csv", "w") as f:
    f.write(csv_content)

with open("test_data.csv", "r") as f:
    lines = f.readlines()

print("Lines:", len(lines))
print("Header:", lines[0].strip())
print("First row:", lines[1].strip())

os.remove("test_data.csv")
`,
    expected: "Output should show 4 lines, the header, and the first data row.",
    tests: `assert len(lines) == 4
assert lines[0].strip() == "name,amount,category"
assert "Alice" in lines[1]
print("TESTS PASSED: file I/O complete")`,
    checks: [
      ["Opens file for writing", /open\s*\([^)]*[\"']w[\"']/],
      ["Opens file for reading", /open\s*\([^)]*[\"']r[\"']/],
      ["Uses readlines or read", /readlines|\.read\s*\(/],
      ["Output includes header", /name,amount,category/, "output"],
    ],
  },
  {
    id: "py-15",
    day: "Lesson 15",
    title: "Classes and OOP",
    explain: "A class bundles data (attributes) and behavior (methods) together. In production ML, you wrap your pipeline steps, models, and data sources in classes so they can be tested and swapped.",
    goals: ["Define a SensorReading class", "Add __init__ with device, temp, humidity", "Add a method to check if temp is above threshold", "Create instances and call methods"],
    starter: `# Lesson 15: classes and OOP

class SensorReading:
    def __init__(self, device, temperature, humidity):
        self.device = device
        self.temperature = temperature
        self.humidity = humidity

    def is_alert(self, max_temp=30):
        return self.temperature > max_temp

    def __repr__(self):
        return f"SensorReading({self.device}, {self.temperature}C, {self.humidity}%)"

reading1 = SensorReading("ESP32-01", 24.5, 60)
reading2 = SensorReading("ESP32-02", 32.1, 55)

print(reading1)
print(reading2)
print("Alert:", reading1.is_alert())
print("Alert:", reading2.is_alert())
`,
    expected: "Output should show both readings and alert status — True for the 32.1C reading.",
    tests: `assert reading1.temperature == 24.5
assert reading2.is_alert() is True
assert reading1.is_alert() is False
assert reading1.device == "ESP32-01"
print("TESTS PASSED: classes complete")`,
    checks: [
      ["Defines class", /class\s+SensorReading/],
      ["Has __init__", /def\s+__init__\s*\(/],
      ["Has is_alert method", /def\s+is_alert\s*\(/],
      ["Creates instances", /SensorReading\s*\(/],
      ["Output includes Alert: True", /Alert:\s*True/, "output"],
    ],
  },
  {
    id: "py-16",
    day: "Lesson 16",
    title: "Inheritance",
    explain: "Inheritance lets a child class reuse and extend a parent class. In ML pipelines, BaseTransformer, BaseModel, and BaseLoader patterns all use inheritance.",
    goals: ["Create a base DataLoader class", "Create a CSVLoader subclass", "Override the load method", "Call super()"],
    starter: `# Lesson 16: inheritance

class DataLoader:
    def __init__(self, source):
        self.source = source

    def load(self):
        raise NotImplementedError("Subclass must implement load()")

    def describe(self):
        return f"Loader for {self.source}"

class CSVLoader(DataLoader):
    def __init__(self, filepath, delimiter=","):
        super().__init__(filepath)
        self.delimiter = delimiter

    def load(self):
        return f"Loading CSV from {self.source} with delimiter '{self.delimiter}'"

loader = CSVLoader("sales_data.csv")
print(loader.describe())
print(loader.load())
`,
    expected: "Output should show the describe and load messages.",
    tests: `assert loader.source == "sales_data.csv"
assert loader.delimiter == ","
assert "sales_data.csv" in loader.load()
print("TESTS PASSED: inheritance complete")`,
    checks: [
      ["Defines base class", /class\s+DataLoader/],
      ["Defines child class", /class\s+CSVLoader\s*\(\s*DataLoader\s*\)/],
      ["Calls super()", /super\s*\(\s*\)/],
      ["Overrides load", /def\s+load\s*\(\s*self\s*\)/],
      ["Output includes sales_data", /sales_data/, "output"],
    ],
  },
  {
    id: "py-17",
    day: "Lesson 17",
    title: "Lambda, map, filter",
    explain: "Lambda functions are anonymous one-liners. map() transforms a list, filter() selects items. These appear in data pipelines, pandas apply calls, and functional-style preprocessing.",
    goals: ["Use lambda to scale a value", "Use map() to apply a function", "Use filter() to select rows"],
    starter: `# Lesson 17: lambda, map, filter

double = lambda x: x * 2
print(double(5))

prices = [100, 250, 75, 400, 30]
discounted = list(map(lambda p: round(p * 0.9, 2), prices))
print(discounted)

expensive = list(filter(lambda p: p > 100, prices))
print(expensive)

# Equivalent with comprehensions (both are valid)
discounted2 = [round(p * 0.9, 2) for p in prices]
assert discounted == discounted2
print("Comprehension matches map:", discounted == discounted2)
`,
    expected: "Output should show 10, discounted prices, and prices above 100.",
    tests: `assert double(5) == 10
assert discounted[0] == 90.0
assert expensive == [250, 400]
print("TESTS PASSED: lambda map filter complete")`,
    checks: [
      ["Uses lambda", /lambda\s+\w+\s*:/],
      ["Uses map()", /map\s*\(/],
      ["Uses filter()", /filter\s*\(/],
      ["Output includes 90.0", /90\.0/, "output"],
      ["Output includes 250", /250/, "output"],
    ],
  },
  {
    id: "py-18",
    day: "Lesson 18",
    title: "Working with CSV via csv module",
    explain: "The csv module is the standard way to read and write spreadsheet-like data before you use pandas. Understand it so you can work with files anywhere — even without pandas installed.",
    goals: ["Write rows to CSV with csv.writer", "Read them back with csv.DictReader", "Filter rows by a condition"],
    starter: `# Lesson 18: csv module
import csv, io

rows = [
    {"product": "Laptop", "units": 10, "revenue": 8000},
    {"product": "Mouse", "units": 50, "revenue": 750},
    {"product": "Monitor", "units": 8, "revenue": 3200},
]

output = io.StringIO()
writer = csv.DictWriter(output, fieldnames=["product", "units", "revenue"])
writer.writeheader()
writer.writerows(rows)

content = output.getvalue()
reader = csv.DictReader(io.StringIO(content))
loaded = [dict(row) for row in reader]

high_revenue = [r for r in loaded if int(r["revenue"]) >= 1000]
print("All rows:", len(loaded))
print("High revenue:", len(high_revenue))
print("Top product:", high_revenue[0]["product"])
`,
    expected: "Output should show 3 total rows, 2 high-revenue rows, and Laptop as top product.",
    tests: `assert len(loaded) == 3
assert len(high_revenue) == 2
assert high_revenue[0]["product"] == "Laptop"
print("TESTS PASSED: csv module complete")`,
    checks: [
      ["Imports csv", /import\s+csv/],
      ["Uses DictWriter", /DictWriter/],
      ["Uses DictReader", /DictReader/],
      ["Filters by condition", /if\s+int\s*\([^)]*revenue/],
      ["Output includes Laptop", /Laptop/, "output"],
    ],
  },
  {
    id: "py-19",
    day: "Lesson 19",
    title: "Decorators",
    explain: "A decorator wraps a function to add behavior without modifying its code. Django views, FastAPI routes, Celery tasks, and MLflow tracking all use decorators. Understanding them removes confusion when reading real-world code.",
    goals: ["Write a timing decorator", "Apply it with @", "Decorate a slow function"],
    starter: `# Lesson 19: decorators
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = round(time.time() - start, 4)
        print(f"{func.__name__} ran in {elapsed}s")
        return result
    return wrapper

@timer
def process_data(rows):
    total = sum(rows)
    return total

result = process_data([1, 2, 3, 4, 5])
print("Result:", result)
`,
    expected: "Output should show the function ran and the result is 15.",
    tests: `assert result == 15
print("TESTS PASSED: decorators complete")`,
    checks: [
      ["Defines decorator function", /def\s+timer\s*\(/],
      ["Defines wrapper inside", /def\s+wrapper\s*\(/],
      ["Returns wrapper", /return\s+wrapper/],
      ["Uses @ syntax", /@timer/],
      ["Output includes Result: 15", /Result:\s*15/, "output"],
    ],
  },
  {
    id: "py-20",
    day: "Lesson 20",
    title: "Generators and iterators",
    explain: "Generators produce values lazily — one at a time, without loading everything into memory. They are essential for processing large datasets, streaming sensor readings, and memory-efficient ML pipelines.",
    goals: ["Write a generator that yields rows", "Use next() to read one row at a time", "Use a for loop over the generator"],
    starter: `# Lesson 20: generators

def row_generator(data):
    for index, row in enumerate(data):
        yield {"index": index, "value": row}

sensor_data = [22.1, 23.4, 21.8, 25.0, 24.6]
gen = row_generator(sensor_data)

first = next(gen)
print("First:", first)

for row in gen:
    print(row)
`,
    expected: "Output should show the first row then the remaining 4 rows.",
    tests: `gen2 = row_generator(sensor_data)
all_rows = list(gen2)
assert len(all_rows) == 5
assert all_rows[0]["index"] == 0
assert all_rows[0]["value"] == 22.1
print("TESTS PASSED: generators complete")`,
    checks: [
      ["Defines generator", /def\s+row_generator\s*\(/],
      ["Uses yield", /\byield\b/],
      ["Uses next()", /next\s*\(/],
      ["Uses enumerate", /enumerate\s*\(/],
      ["Output includes index", /index/, "output"],
    ],
  },
];

const skillTracks = [
  {
    id: "sql",
    label: "SQL",
    source: "knowledge-base/zero-to-hero-guides/sql/sql_zero_to_hero.sql",
    lessons: [
      {
        id: "sql-01",
        title: "SELECT, WHERE, ORDER BY",
        mode: "sql",
        explain: "SQL is how you ask structured questions of tables. Start by selecting useful columns, filtering rows, and sorting the result.",
        goals: ["Select name and revenue", "Filter revenue above 1000", "Sort from highest to lowest"],
        starter: `SELECT name, revenue
FROM sales
WHERE revenue > 1000
ORDER BY revenue DESC;`,
        setup: `CREATE TABLE sales (name TEXT, region TEXT, revenue INTEGER, profit INTEGER);
INSERT INTO sales VALUES
('Alpha','North',1200,240),
('Beta','South',800,120),
('Gamma','North',2200,510),
('Delta','West',1500,260);`,
        expected: "Should return Gamma, Delta, and Alpha in that order.",
        checks: [
          ["Uses SELECT", /select/i],
          ["Uses WHERE", /where/i],
          ["Filters revenue above 1000", /revenue\s*>\s*1000/i],
          ["Sorts descending", /order\s+by[\s\S]*desc/i],
          ["Output includes Gamma", /Gamma/, "output"],
        ],
      },
      {
        id: "sql-02",
        title: "GROUP BY KPIs",
        mode: "sql",
        explain: "Business dashboards usually start with grouped KPIs. GROUP BY lets you summarize rows by region, product, month, or customer segment.",
        goals: ["Group by region", "Calculate total revenue", "Calculate total profit", "Name output columns"],
        starter: `SELECT region,
       SUM(revenue) AS total_revenue,
       SUM(profit) AS total_profit
FROM sales
GROUP BY region
ORDER BY total_revenue DESC;`,
        setup: `CREATE TABLE sales (name TEXT, region TEXT, revenue INTEGER, profit INTEGER);
INSERT INTO sales VALUES
('Alpha','North',1200,240),
('Beta','South',800,120),
('Gamma','North',2200,510),
('Delta','West',1500,260);`,
        expected: "North should have total revenue 3400 and total profit 750.",
        checks: [
          ["Uses GROUP BY", /group\s+by/i],
          ["Uses SUM revenue", /sum\s*\(\s*revenue\s*\)/i],
          ["Uses SUM profit", /sum\s*\(\s*profit\s*\)/i],
          ["Output includes North", /North/, "output"],
          ["Output includes 3400", /3400/, "output"],
        ],
      },
      {
        id: "sql-03",
        title: "JOIN two tables",
        mode: "sql",
        explain: "JOIN connects related tables. This is essential for real databases, because customers, orders, products, and payments live in separate tables.",
        goals: ["Join orders to customers", "Show customer name and amount", "Filter only shipped orders"],
        starter: `SELECT customers.name, orders.amount
FROM orders
JOIN customers ON customers.id = orders.customer_id
WHERE orders.status = 'shipped';`,
        setup: `CREATE TABLE customers (id INTEGER, name TEXT);
CREATE TABLE orders (id INTEGER, customer_id INTEGER, amount INTEGER, status TEXT);
INSERT INTO customers VALUES (1,'Alice'),(2,'Bob');
INSERT INTO orders VALUES (101,1,500,'shipped'),(102,2,700,'pending'),(103,1,300,'shipped');`,
        expected: "Should return Alice with 500 and Alice with 300.",
        checks: [
          ["Uses JOIN", /join/i],
          ["Uses ON condition", /\son\s+/i],
          ["Filters shipped", /shipped/i],
          ["Output includes Alice", /Alice/, "output"],
          ["Output includes 500", /500/, "output"],
        ],
      },
      {
        id: "sql-04",
        title: "Window functions",
        mode: "sql",
        explain: "Window functions compute values across related rows without collapsing them like GROUP BY does. ROW_NUMBER ranks each row. RANK gives tied rows the same rank. LAG looks at the previous row — perfect for comparing month-over-month revenue.",
        goals: ["Rank sales by revenue", "Use ROW_NUMBER()", "Use LAG() to compare previous row"],
        starter: `SELECT name, region, revenue,
       ROW_NUMBER() OVER (ORDER BY revenue DESC) AS rank_num,
       LAG(revenue) OVER (ORDER BY revenue DESC) AS prev_revenue
FROM sales;`,
        setup: `CREATE TABLE sales (name TEXT, region TEXT, revenue INTEGER, profit INTEGER);
INSERT INTO sales VALUES
('Alpha','North',1200,240),
('Beta','South',800,120),
('Gamma','North',2200,510),
('Delta','West',1500,260);`,
        expected: "Should show each row ranked with its previous row's revenue.",
        checks: [
          ["Uses ROW_NUMBER or RANK", /row_number|rank/i],
          ["Uses OVER clause", /over\s*\(/i],
          ["Uses ORDER BY inside window", /over\s*\(\s*order\s+by/i],
          ["Output includes Gamma", /Gamma/, "output"],
          ["Output includes rank", /1/, "output"],
        ],
      },
      {
        id: "sql-05",
        title: "CTEs (WITH clause)",
        mode: "sql",
        explain: "A Common Table Expression (CTE) is a named temporary query you can reference like a table. It makes complex queries readable by breaking them into named steps — the same way you break code into functions.",
        goals: ["Write a CTE with WITH", "Filter high revenue in the CTE", "Query the CTE result"],
        starter: `WITH high_value AS (
  SELECT name, region, revenue
  FROM sales
  WHERE revenue > 1000
)
SELECT region, COUNT(*) AS deals, SUM(revenue) AS total
FROM high_value
GROUP BY region
ORDER BY total DESC;`,
        setup: `CREATE TABLE sales (name TEXT, region TEXT, revenue INTEGER, profit INTEGER);
INSERT INTO sales VALUES
('Alpha','North',1200,240),
('Beta','South',800,120),
('Gamma','North',2200,510),
('Delta','West',1500,260);`,
        expected: "North should appear with 2 deals and total 3400.",
        checks: [
          ["Uses WITH", /\bwith\b/i],
          ["Names the CTE", /with\s+\w+\s+as\s*\(/i],
          ["Queries the CTE", /from\s+high_value/i],
          ["Uses COUNT", /count\s*\(/i],
          ["Output includes North", /North/, "output"],
        ],
      },
      {
        id: "sql-06",
        title: "HAVING and subqueries",
        mode: "sql",
        explain: "HAVING filters groups after aggregation (WHERE filters rows before). Subqueries let you nest one query inside another — useful when you need to compare against an aggregate like the average.",
        goals: ["Use HAVING to filter groups", "Write a subquery in WHERE", "Find regions above average revenue"],
        starter: `SELECT region, SUM(revenue) AS total_revenue
FROM sales
GROUP BY region
HAVING SUM(revenue) > (SELECT AVG(revenue) FROM sales);`,
        setup: `CREATE TABLE sales (name TEXT, region TEXT, revenue INTEGER, profit INTEGER);
INSERT INTO sales VALUES
('Alpha','North',1200,240),
('Beta','South',800,120),
('Gamma','North',2200,510),
('Delta','West',1500,260);`,
        expected: "Should return regions whose total revenue exceeds the average single-row revenue.",
        checks: [
          ["Uses HAVING", /having/i],
          ["Uses subquery", /select.*from.*sales/i],
          ["Uses AVG", /avg\s*\(/i],
          ["Groups by region", /group\s+by\s+region/i],
          ["Output includes North", /North/, "output"],
        ],
      },
    ],
  },
  {
    id: "git",
    label: "Git/Linux",
    source: "knowledge-base/zero-to-hero-guides/git/git_commands.sh",
    lessons: [
      {
        id: "git-01",
        title: "First Git workflow",
        mode: "text",
        explain: "A professional workflow is status, add, commit, and push. You should know the command sequence before you rely on tools.",
        goals: ["Check status", "Stage files", "Commit with a message", "Push to GitHub"],
        starter: `git status
git add .
git commit -m "Complete Python lesson 1"
git push origin main`,
        expected: "A correct answer includes status, add, commit, and push in a sensible order.",
        checks: [
          ["Checks status", /git\s+status/],
          ["Stages files", /git\s+add/],
          ["Commits with message", /git\s+commit\s+-m/],
          ["Pushes branch", /git\s+push/],
        ],
      },
      {
        id: "git-02",
        title: "Create a feature branch",
        mode: "text",
        explain: "Branches let you work on a feature without touching the stable main branch.",
        goals: ["Create or switch to a branch", "Use a meaningful branch name", "Show how to merge back"],
        starter: `git checkout -b feature/csv-cleaner
git status
git add .
git commit -m "Build CSV cleaner"
git checkout main
git merge feature/csv-cleaner`,
        expected: "A correct answer creates a branch, commits work, returns to main, and merges.",
        checks: [
          ["Creates branch", /checkout\s+-b|switch\s+-c/],
          ["Uses feature name", /feature|csv|cleaner/i],
          ["Commits work", /commit\s+-m/],
          ["Merges back", /merge/],
        ],
      },
      {
        id: "linux-01",
        title: "Navigate project folders",
        mode: "text",
        explain: "Linux terminal fluency starts with knowing where you are, listing files, moving folders, and creating project directories.",
        goals: ["Print current directory", "List files", "Create a folder", "Move into it"],
        starter: `pwd
ls
mkdir python-practice
cd python-practice`,
        expected: "A correct answer includes pwd, ls, mkdir, and cd.",
        checks: [
          ["Uses pwd", /\bpwd\b/],
          ["Uses ls", /\bls\b/],
          ["Uses mkdir", /\bmkdir\b/],
          ["Uses cd", /\bcd\b/],
        ],
      },
    ],
  },
  {
    id: "docker",
    label: "Docker",
    source: "knowledge-base/zero-to-hero-guides/docker/docker_zero_to_hero.sh",
    lessons: [
      {
        id: "docker-01",
        title: "Minimal Dockerfile",
        mode: "text",
        explain: "A Dockerfile describes how to package your app. For a FastAPI service, you need Python, dependencies, source code, a port, and a start command.",
        goals: ["Use Python base image", "Set WORKDIR", "Install requirements", "Run uvicorn"],
        starter: `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
        expected: "A valid Dockerfile shape for a FastAPI app.",
        checks: [
          ["Uses Python base image", /FROM\s+python:/i],
          ["Sets WORKDIR", /WORKDIR/i],
          ["Installs requirements", /pip\s+install\s+-r\s+requirements/i],
          ["Exposes port", /EXPOSE\s+8000/i],
          ["Runs uvicorn", /uvicorn/i],
        ],
      },
      {
        id: "docker-02",
        title: "Build and run image",
        mode: "text",
        explain: "After writing a Dockerfile, build an image and run a container with port mapping.",
        goals: ["Build image with a tag", "Run container", "Map port 8000", "Name the container"],
        starter: `docker build -t ml-api .
docker run --name ml-api-container -p 8000:8000 ml-api`,
        expected: "Build command and run command with port mapping.",
        checks: [
          ["Builds image", /docker\s+build/],
          ["Uses tag", /-t\s+/],
          ["Runs container", /docker\s+run/],
          ["Maps port", /-p\s+8000:8000/],
        ],
      },
    ],
  },
  {
    id: "fastapi",
    label: "FastAPI",
    source: "phase-1-software-engineering/month-02-databases-web/resources/",
    lessons: [
      {
        id: "fastapi-01",
        title: "Prediction endpoint",
        mode: "text",
        explain: "FastAPI wraps a model behind an HTTP endpoint. The input schema protects your app from random unstructured data.",
        goals: ["Create app", "Define BaseModel input", "Create POST /predict", "Return prediction"],
        starter: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class PredictionInput(BaseModel):
    value: float

@app.post("/predict")
def predict(data: PredictionInput):
    prediction = data.value * 2
    return {"prediction": prediction}`,
        expected: "A POST /predict endpoint returning a prediction field.",
        checks: [
          ["Imports FastAPI", /FastAPI/],
          ["Uses BaseModel", /BaseModel/],
          ["Defines /predict", /@app\.post\s*\(\s*["']\/predict/],
          ["Returns prediction", /return\s+\{[\s\S]*prediction/],
        ],
      },
    ],
  },
  {
    id: "django",
    label: "Django",
    source: "knowledge-base/zero-to-hero-guides/django/django_zero_to_hero.py",
    lessons: [
      {
        id: "django-01",
        title: "Task model",
        mode: "text",
        explain: "Django models define database tables as Python classes. This is the start of every CRUD app.",
        goals: ["Import models", "Create Task model", "Add title and status", "Add created timestamp", "Define __str__"],
        starter: `from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    status = models.CharField(max_length=30, default="todo")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title`,
        expected: "A model that Django can migrate and show in admin.",
        checks: [
          ["Imports models", /django\.db\s+import\s+models/],
          ["Defines Task model", /class\s+Task\s*\(\s*models\.Model\s*\)/],
          ["Has title", /title\s*=\s*models\.CharField/],
          ["Has timestamp", /DateTimeField|auto_now_add/],
          ["Defines __str__", /def\s+__str__/],
        ],
      },
      {
        id: "django-02",
        title: "CRUD view idea",
        mode: "text",
        explain: "A CRUD app needs URLs and views. Class-based views are a clean beginner path for list/create/update/delete pages.",
        goals: ["Use ListView", "Use CreateView", "Connect Task model", "Set template or success_url"],
        starter: `from django.views.generic import ListView, CreateView
from .models import Task

class TaskListView(ListView):
    model = Task
    template_name = "tasks/task_list.html"

class TaskCreateView(CreateView):
    model = Task
    fields = ["title", "status"]
    success_url = "/tasks/"`,
        expected: "List and create views for the Task model.",
        checks: [
          ["Uses ListView", /ListView/],
          ["Uses CreateView", /CreateView/],
          ["References Task model", /model\s*=\s*Task/],
          ["Defines fields", /fields\s*=/],
          ["Defines success_url", /success_url/],
        ],
      },
      {
        id: "django-03",
        title: "URL routing",
        mode: "text",
        explain: "Django's URL dispatcher maps URL patterns to view functions. Every page in your app needs a URL pattern. Think of urls.py as a switchboard — each path() call connects an address to a function.",
        goals: ["Import path and include", "Define URL patterns", "Connect to a view function", "Use app_name namespace"],
        starter: `from django.urls import path
from . import views

app_name = "tasks"

urlpatterns = [
    path("", views.TaskListView.as_view(), name="list"),
    path("create/", views.TaskCreateView.as_view(), name="create"),
    path("<int:pk>/", views.TaskDetailView.as_view(), name="detail"),
    path("<int:pk>/delete/", views.TaskDeleteView.as_view(), name="delete"),
]`,
        expected: "A urls.py with path patterns covering list, create, detail, and delete.",
        checks: [
          ["Imports path", /from\s+django\.urls\s+import\s+path/],
          ["Defines urlpatterns", /urlpatterns\s*=/],
          ["Has list URL", /path\s*\(\s*["']["']/],
          ["Has create URL", /create/],
          ["Uses as_view()", /\.as_view\s*\(\s*\)/],
        ],
      },
      {
        id: "django-04",
        title: "Forms and validation",
        mode: "text",
        explain: "Django forms validate user input before it reaches your database. ModelForm is the fastest path — it generates form fields directly from a model. Always call form.is_valid() before saving.",
        goals: ["Create a ModelForm for Task", "Add clean method for validation", "Show how to use in a view"],
        starter: `from django import forms
from .models import Task

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ["title", "status"]

    def clean_title(self):
        title = self.cleaned_data.get("title", "").strip()
        if len(title) < 3:
            raise forms.ValidationError("Title must be at least 3 characters.")
        return title`,
        expected: "A ModelForm with a clean method that validates title length.",
        checks: [
          ["Imports forms", /from\s+django\s+import\s+forms/],
          ["Uses ModelForm", /forms\.ModelForm/],
          ["Defines Meta class", /class\s+Meta/],
          ["Has clean method", /def\s+clean_/],
          ["Raises ValidationError", /ValidationError/],
        ],
      },
      {
        id: "django-05",
        title: "User authentication",
        mode: "text",
        explain: "Django ships with a full authentication system. login_required protects views. LoginView and LogoutView handle the flow. You only need to create templates and wire the URLs.",
        goals: ["Use login_required decorator", "Protect a view", "Access request.user", "Show username on page"],
        starter: `from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView
from .models import Task

# Function-based view protection
@login_required
def dashboard(request):
    tasks = Task.objects.filter(created_by=request.user)
    return render(request, "dashboard.html", {"tasks": tasks, "user": request.user})

# Class-based view protection
class MyTaskListView(LoginRequiredMixin, ListView):
    model = Task
    login_url = "/accounts/login/"`,
        expected: "Both function and class-based views protected with authentication.",
        checks: [
          ["Uses login_required", /login_required/],
          ["Uses LoginRequiredMixin", /LoginRequiredMixin/],
          ["Accesses request.user", /request\.user/],
          ["Filters by user", /filter\s*\(.*user/],
          ["Sets login_url", /login_url/],
        ],
      },
    ],
  },
  {
    id: "ml",
    label: "ML",
    source: "phase-2-production-ml/month-03-docker-mlops/resources/",
    lessons: [
      {
        id: "ml-01",
        title: "Train/test split",
        mode: "python",
        explain: "Before training a model, split data so you can evaluate on examples the model did not see.",
        goals: ["Create feature and target lists", "Split 80/20 manually", "Print train and test sizes"],
        starter: `X = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
y = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

split = int(len(X) * 0.8)
X_train = X[:split]
X_test = X[split:]
y_train = y[:split]
y_test = y[split:]

print(len(X_train), len(X_test))`,
        expected: "Output should be 8 2.",
        tests: `assert len(X_train) == 8
assert len(X_test) == 2
print("TESTS PASSED: split complete")`,
        checks: [
          ["Creates X_train", /X_train\s*=/],
          ["Creates X_test", /X_test\s*=/],
          ["Uses 0.8 split", /0\.8/],
          ["Output includes 8 2", /8\s+2/, "output"],
        ],
      },
      {
        id: "ml-02",
        title: "Evaluate regression errors",
        mode: "python",
        explain: "A model is only useful if you measure its errors. MAE is the average absolute mistake.",
        goals: ["Create actual and predicted lists", "Calculate absolute errors", "Calculate MAE"],
        starter: `actual = [100, 200, 300]
predicted = [110, 190, 330]

errors = [abs(a - p) for a, p in zip(actual, predicted)]
mae = sum(errors) / len(errors)
print(mae)`,
        expected: "Output should be 16.666...",
        tests: `assert round(mae, 2) == 16.67
print("TESTS PASSED: MAE complete")`,
        checks: [
          ["Uses zip", /zip\s*\(/],
          ["Uses abs", /abs\s*\(/],
          ["Calculates mae", /mae\s*=/],
          ["Output includes 16", /16/, "output"],
        ],
      },
      {
        id: "ml-03",
        title: "Confusion matrix",
        mode: "python",
        explain: "For classification problems, accuracy alone is misleading. A confusion matrix breaks down True Positives, False Positives, True Negatives, and False Negatives — showing where your model is wrong and why it matters for business decisions.",
        goals: ["Create actual and predicted labels", "Build confusion matrix manually", "Calculate precision and recall"],
        starter: `actual    = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0]
predicted = [1, 0, 1, 0, 0, 1, 1, 0, 1, 0]

TP = sum(1 for a, p in zip(actual, predicted) if a == 1 and p == 1)
TN = sum(1 for a, p in zip(actual, predicted) if a == 0 and p == 0)
FP = sum(1 for a, p in zip(actual, predicted) if a == 0 and p == 1)
FN = sum(1 for a, p in zip(actual, predicted) if a == 1 and p == 0)

precision = TP / (TP + FP)
recall    = TP / (TP + FN)
accuracy  = (TP + TN) / len(actual)

print(f"TP={TP} TN={TN} FP={FP} FN={FN}")
print(f"Precision: {round(precision, 2)}")
print(f"Recall:    {round(recall, 2)}")
print(f"Accuracy:  {round(accuracy, 2)}")`,
        expected: "Output should show TP=4 TN=4 FP=1 FN=1, precision 0.8, recall 0.8, accuracy 0.8.",
        tests: `assert TP == 4
assert TN == 4
assert FP == 1
assert FN == 1
assert round(precision, 2) == 0.8
assert round(recall, 2) == 0.8
print("TESTS PASSED: confusion matrix complete")`,
        checks: [
          ["Calculates TP", /TP\s*=/],
          ["Calculates FP", /FP\s*=/],
          ["Calculates precision", /precision\s*=/],
          ["Calculates recall", /recall\s*=/],
          ["Output includes Precision", /Precision/, "output"],
        ],
      },
      {
        id: "ml-04",
        title: "Feature importance",
        mode: "python",
        explain: "Feature importance tells you which inputs drive the prediction most. In business terms it answers: which customer signals predict churn? Which sensor readings predict failure? You can compute a simple version manually using correlation.",
        goals: ["Create feature dict", "Rank features by absolute correlation", "Print ranked importance"],
        starter: `target  = [1, 0, 1, 1, 0, 0, 1, 0]
feat_a  = [8, 2, 9, 7, 3, 1, 8, 2]
feat_b  = [1, 1, 0, 1, 0, 1, 1, 0]
feat_c  = [4, 4, 5, 4, 4, 5, 4, 5]

def correlation(x, y):
    n = len(x)
    mean_x = sum(x) / n
    mean_y = sum(y) / n
    cov = sum((xi - mean_x) * (yi - mean_y) for xi, yi in zip(x, y)) / n
    std_x = (sum((xi - mean_x) ** 2 for xi in x) / n) ** 0.5
    std_y = (sum((yi - mean_y) ** 2 for yi in y) / n) ** 0.5
    return cov / (std_x * std_y) if std_x and std_y else 0

features = {"feat_a": feat_a, "feat_b": feat_b, "feat_c": feat_c}
importance = {name: round(abs(correlation(vals, target)), 3) for name, vals in features.items()}
ranked = sorted(importance.items(), key=lambda x: x[1], reverse=True)

for name, score in ranked:
    print(f"{name}: {score}")`,
        expected: "feat_a should rank first as it has the strongest correlation with the target.",
        tests: `assert ranked[0][0] == "feat_a"
assert ranked[-1][0] == "feat_c"
print("TESTS PASSED: feature importance complete")`,
        checks: [
          ["Defines correlation function", /def\s+correlation\s*\(/],
          ["Builds importance dict", /importance\s*=/],
          ["Sorts by importance", /sorted\s*\(/],
          ["Uses reverse=True", /reverse\s*=\s*True/],
          ["Output includes feat_a", /feat_a/, "output"],
        ],
      },
      {
        id: "ml-05",
        title: "Cross-validation logic",
        mode: "python",
        explain: "A single train/test split can be lucky or unlucky. Cross-validation splits data K times, trains and evaluates each fold, then averages the scores. This gives a reliable estimate of real-world performance.",
        goals: ["Split data into K folds", "Train and evaluate each fold", "Average the scores"],
        starter: `data = list(range(10))
labels = [0,1,0,1,0,1,0,1,0,1]
K = 5
fold_size = len(data) // K
scores = []

for fold in range(K):
    test_start = fold * fold_size
    test_end   = test_start + fold_size
    X_test  = data[test_start:test_end]
    y_test  = labels[test_start:test_end]
    X_train = data[:test_start] + data[test_end:]
    y_train = labels[:test_start] + labels[test_end:]
    # Simulate: predict majority class from training labels
    majority = 1 if sum(y_train) > len(y_train) / 2 else 0
    accuracy = sum(1 for y in y_test if y == majority) / len(y_test)
    scores.append(accuracy)
    print(f"Fold {fold+1}: accuracy={accuracy:.2f}")

print(f"Mean CV accuracy: {sum(scores)/len(scores):.2f}")`,
        expected: "Should show 5 fold accuracies and a mean cross-validation score.",
        tests: `assert len(scores) == K
assert all(0 <= s <= 1 for s in scores)
print("TESTS PASSED: cross-validation complete")`,
        checks: [
          ["Sets K folds", /K\s*=\s*5/],
          ["Loops over folds", /for\s+fold\s+in\s+range\s*\(\s*K\s*\)/],
          ["Builds test set", /X_test\s*=/],
          ["Appends scores", /scores\.append/],
          ["Prints mean", /Mean|mean/i, "output"],
        ],
      },
    ],
  },
  {
    id: "iot",
    label: "Arduino/IoT",
    source: "knowledge-base/zero-to-hero-guides/iot/README.md",
    lessons: [
      {
        id: "iot-01",
        title: "ESP32 sensor loop",
        mode: "text",
        explain: "Embedded code has two core functions: setup runs once, loop runs forever. Keep the first sensor program simple.",
        goals: ["Define setup", "Define loop", "Start Serial", "Read temperature and humidity", "Delay 10 seconds"],
        starter: `void setup() {
  Serial.begin(115200);
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  Serial.println(temperature);
  Serial.println(humidity);
  delay(10000);
}`,
        expected: "Arduino-style sketch shape for reading and printing sensor values.",
        checks: [
          ["Defines setup", /void\s+setup/],
          ["Defines loop", /void\s+loop/],
          ["Starts Serial", /Serial\.begin/],
          ["Reads temperature", /readTemperature|temperature/i],
          ["Reads humidity", /readHumidity|humidity/i],
          ["Delays 10 seconds", /delay\s*\(\s*10000\s*\)/],
        ],
      },
      {
        id: "iot-02",
        title: "POST sensor JSON",
        mode: "text",
        explain: "The IoT value comes from sending sensor readings to your backend as structured JSON.",
        goals: ["Create JSON with temperature and humidity", "Use HTTP POST", "Send to an API endpoint"],
        starter: `String payload = "{\\"temperature\\":24.5,\\"humidity\\":60}";
http.begin("http://your-server.com/api/sensor/");
http.addHeader("Content-Type", "application/json");
int code = http.POST(payload);`,
        expected: "Shows JSON payload and HTTP POST to a backend endpoint.",
        checks: [
          ["Includes temperature", /temperature/i],
          ["Includes humidity", /humidity/i],
          ["Uses JSON content type", /application\/json/i],
          ["Uses POST", /\.POST\s*\(/],
          ["Uses endpoint URL", /http:\/\/|https:\/\//],
        ],
      },
    ],
  },
  {
    id: "ai",
    label: "RAG/Agents",
    source: "phase-6-generative-ai/README.md",
    lessons: [
      {
        id: "rag-01",
        title: "RAG pipeline order",
        mode: "text",
        explain: "RAG makes an LLM answer using retrieved evidence. The order matters: load, chunk, embed, store, retrieve, generate.",
        goals: ["Load document", "Chunk text", "Embed chunks", "Store vectors", "Retrieve context", "Generate answer"],
        starter: `def answer_with_rag(question, document_path):
    document = load_document(document_path)
    chunks = split_into_chunks(document)
    embeddings = embed(chunks)
    vector_store = store_vectors(chunks, embeddings)
    context = retrieve(vector_store, question)
    answer = generate_answer(question, context)
    return answer`,
        expected: "A correct RAG pipeline skeleton in the right order.",
        checks: [
          ["Loads document", /load_document|load|open/i],
          ["Chunks text", /chunk|split/i],
          ["Embeds chunks", /embed/i],
          ["Stores vectors", /store|vector/i],
          ["Retrieves context", /retrieve|search/i],
          ["Generates answer", /generate|answer/i],
        ],
      },
      {
        id: "agent-01",
        title: "Agent tools",
        mode: "text",
        explain: "Agents become useful when they can call tools. Your earlier APIs and scripts become tool functions.",
        goals: ["Define SQL tool", "Define web search tool", "Define analysis tool", "Register tools"],
        starter: `def query_sql(question):
    return "query result"

def search_web(query):
    return "search result"

def run_analysis(script_name):
    return "analysis result"

tools = [query_sql, search_web, run_analysis]`,
        expected: "Three tool functions and a tools registry.",
        checks: [
          ["Defines query_sql", /def\s+query_sql/],
          ["Defines search_web", /def\s+search_web/],
          ["Defines run_analysis", /def\s+run_analysis/],
          ["Registers tools", /tools\s*=/],
        ],
      },
    ],
  },
];

function link(path) {
  if (!path || path === "README.md") {
    return "docs/README.md.html";
  }
  if (path.endsWith("/")) {
    return `docs/${path}index.html`;
  }
  return `docs/${path}.html`;
}

function saveProgress() {
  localStorage.setItem("completedMonths", JSON.stringify(state.done));
  localStorage.setItem("selectedMonth", String(state.month));
}

function saveMissionState() {
  localStorage.setItem("setupChecklistDone", JSON.stringify(state.setupDone));
  localStorage.setItem("portfolioEvidence", JSON.stringify(state.evidence));
  localStorage.setItem("githubRepoBase", state.githubRepoBase);
  localStorage.setItem("githubBranch", state.githubBranch);
}

function saveLabState() {
  localStorage.setItem("selectedLab", state.labId);
  localStorage.setItem("passedLabs", JSON.stringify(state.labPassed));
}

function getCurrentLab() {
  return labTasks.find((task) => task.id === state.labId) || labTasks[0];
}

function getDraftKey(id) {
  return `labDraft:${id}`;
}

function getOutputKey(id) {
  return `labOutput:${id}`;
}

function getSubmissionKey(id) {
  return `labSubmission:${id}`;
}

function getSavedSubmission(id) {
  try {
    return JSON.parse(localStorage.getItem(getSubmissionKey(id)) || "null");
  } catch {
    return null;
  }
}

function getPythonLesson() {
  return pythonLessons.find((lesson) => lesson.id === state.pythonLessonId) || pythonLessons[0];
}

function getPythonDraftKey(id) {
  return `pythonLessonDraft:${id}`;
}

function getPythonOutputKey(id) {
  return `pythonLessonOutput:${id}`;
}

function getPythonSubmissionKey(id) {
  return `pythonLessonSubmission:${id}`;
}

function savePythonLessonState() {
  localStorage.setItem("selectedPythonLesson", state.pythonLessonId);
  localStorage.setItem("donePythonLessons", JSON.stringify(state.pythonLessonsDone));
}

function getSavedPythonSubmission(id) {
  try {
    return JSON.parse(localStorage.getItem(getPythonSubmissionKey(id)) || "null");
  } catch {
    return null;
  }
}

function getSkillTrack() {
  return skillTracks.find((track) => track.id === state.skillTrack) || skillTracks[0];
}

function getSkillLesson() {
  const track = getSkillTrack();
  return track.lessons.find((lesson) => lesson.id === state.skillLessonId) || track.lessons[0];
}

function getSkillDraftKey(id) {
  return `skillLessonDraft:${id}`;
}

function getSkillOutputKey(id) {
  return `skillLessonOutput:${id}`;
}

function getSkillSubmissionKey(id) {
  return `skillLessonSubmission:${id}`;
}

function saveSkillLessonState() {
  localStorage.setItem("selectedSkillTrack", state.skillTrack);
  localStorage.setItem("selectedSkillLesson", state.skillLessonId);
  localStorage.setItem("doneSkillLessons", JSON.stringify(state.skillLessonsDone));
}

function getSavedSkillSubmission(id) {
  try {
    return JSON.parse(localStorage.getItem(getSkillSubmissionKey(id)) || "null");
  } catch {
    return null;
  }
}

function formatSavedTime(value) {
  if (!value) return "not submitted yet";
  return new Date(value).toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function normalizeGitHubRepoBase(value) {
  const trimmed = String(value || "").trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  return trimmed
    .replace(/\/(?:tree|blob)\/[^/]+.*$/i, "")
    .replace(/\.git$/i, "");
}

function detectGitHubRepoBaseFromLocation() {
  // Auto-detection is disabled: this site is hosted at github.io/self-internship-site
  // but the study content lives in a SEPARATE private repo (self-internship, not self-internship-site).
  // Auto-detecting the wrong repo causes all GitHub links to 404.
  // Users must set their private repo URL explicitly via Mission Control.
  return "";
}

function getEffectiveGitHubRepoBase() {
  return normalizeGitHubRepoBase(state.githubRepoBase) || detectGitHubRepoBaseFromLocation();
}

function encodeGitHubPath(path) {
  return String(path || "")
    .split("/")
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join("/");
}

function isLikelyFilePath(path) {
  const last = String(path || "").split("/").filter(Boolean).pop() || "";
  return /\.[a-z0-9]+$/i.test(last) || ["Dockerfile", "Makefile"].includes(last);
}

function githubLink(path) {
  const repo = getEffectiveGitHubRepoBase();
  if (!repo || !path) return "";
  const branch = (state.githubBranch || "main").trim() || "main";
  const mode = isLikelyFilePath(path) ? "blob" : "tree";
  return `${repo}/${mode}/${branch}/${encodeGitHubPath(path)}`;
}

function monthSourceCatalog(month) {
  const items = [
    { label: "Main study guide", path: month.study },
    ...month.references.map((item) => ({ label: "Reference", path: item })),
  ];
  const workspacePath = monthWorkspacePaths[month.id];
  if (workspacePath) items.push({ label: `Month ${month.id} workspace`, path: workspacePath });
  return items;
}

function weekSourceCatalog(monthId, week) {
  const workspacePath = monthWorkspacePaths[monthId] || "";
  const catalogs = {
    1: {
      1: [
        { label: "Python zero-to-hero", path: "knowledge-base/zero-to-hero-guides/python/python_zero_to_hero.py" },
        { label: "Month 1 resources", path: workspacePath },
      ],
      2: [
        { label: "Git commands guide", path: "knowledge-base/zero-to-hero-guides/git/git_commands.sh" },
        { label: "Month 1 resources", path: workspacePath },
      ],
      3: [
        { label: "Python practice resources", path: workspacePath },
        { label: "Roadmap", path: "README.md" },
      ],
      4: [
        { label: "Project 1 guide", path: "projects/foundations/project-1-customer-churn/README.md" },
        { label: "Month 1 resources", path: workspacePath },
      ],
    },
    2: {
      5: [
        { label: "SQL zero-to-hero", path: "knowledge-base/zero-to-hero-guides/sql/sql_zero_to_hero.sql" },
        { label: "Month 2 resources", path: workspacePath },
      ],
      6: [
        { label: "SQL guide", path: "knowledge-base/zero-to-hero-guides/sql/sql_zero_to_hero.sql" },
        { label: "Month 2 resources", path: workspacePath },
      ],
      7: [
        { label: "Month 2 resources", path: workspacePath },
        { label: "Project 2 guide", path: "projects/foundations/project-2-sales-analysis/README.md" },
      ],
      8: [
        { label: "FastAPI/API materials", path: workspacePath },
        { label: "Project 3 guide", path: "projects/foundations/project-3-house-price-pipeline/README.md" },
      ],
    },
    3: {
      9: [
        { label: "Docker guide", path: "knowledge-base/zero-to-hero-guides/docker/README.md" },
        { label: "Month 3 resources", path: workspacePath },
      ],
      10: [
        { label: "Docker guide", path: "knowledge-base/zero-to-hero-guides/docker/docker_zero_to_hero.sh" },
        { label: "Month 3 resources", path: workspacePath },
      ],
      11: [
        { label: "Month 3 resources", path: workspacePath },
        { label: "Project 3 guide", path: "projects/foundations/project-3-house-price-pipeline/README.md" },
      ],
      12: [
        { label: "Month 3 resources", path: workspacePath },
        { label: "Project 3 guide", path: "projects/foundations/project-3-house-price-pipeline/README.md" },
      ],
    },
    4: {
      13: [
        { label: "Linux/Git guide", path: "knowledge-base/zero-to-hero-guides/git/git_commands.sh" },
        { label: "Month 4 resources", path: workspacePath },
      ],
      14: [
        { label: "Month 4 resources", path: workspacePath },
        { label: "Docker guide", path: "knowledge-base/zero-to-hero-guides/docker/README.md" },
      ],
      15: [
        { label: "Month 4 resources", path: workspacePath },
        { label: "Project 3 guide", path: "projects/foundations/project-3-house-price-pipeline/README.md" },
      ],
      16: [
        { label: "Month 4 resources", path: workspacePath },
        { label: "Deployment notes", path: "knowledge-base/learning-journey/README.md" },
      ],
    },
    5: {
      17: [
        { label: "Django guide", path: "knowledge-base/zero-to-hero-guides/django/django_zero_to_hero.py" },
        { label: "Month 5 resources", path: workspacePath },
      ],
      18: [
        { label: "Django guide", path: "knowledge-base/zero-to-hero-guides/django/django_zero_to_hero.py" },
        { label: "Month 5 resources", path: workspacePath },
      ],
      19: [
        { label: "Month 5 resources", path: workspacePath },
        { label: "Django guide", path: "knowledge-base/zero-to-hero-guides/django/django_zero_to_hero.py" },
      ],
      20: [
        { label: "Month 5 resources", path: workspacePath },
        { label: "Project structure", path: "phase-3-full-stack-web/month-05-django-fundamentals/" },
      ],
    },
    6: {
      21: [
        { label: "Month 6 resources", path: workspacePath },
        { label: "Django guide", path: "knowledge-base/zero-to-hero-guides/django/django_zero_to_hero.py" },
      ],
      22: [
        { label: "Month 6 resources", path: workspacePath },
        { label: "Capstone roadmap", path: "knowledge-base/learning-journey/CAPSTONE_ROADMAP.md" },
      ],
      23: [
        { label: "Month 6 resources", path: workspacePath },
        { label: "Project 3 guide", path: "projects/foundations/project-3-house-price-pipeline/README.md" },
      ],
      24: [
        { label: "Month 6 resources", path: workspacePath },
        { label: "Project 4 guide", path: "projects/foundations/project-4-news-classification/README.md" },
      ],
    },
    7: {
      25: [
        { label: "Arduino guide", path: "knowledge-base/zero-to-hero-guides/arduino/README.md" },
        { label: "Month 7 resources", path: workspacePath },
      ],
      26: [
        { label: "Arduino guide", path: "knowledge-base/zero-to-hero-guides/arduino/README.md" },
        { label: "Month 7 resources", path: workspacePath },
      ],
      27: [
        { label: "Month 7 resources", path: workspacePath },
        { label: "IoT guide", path: "knowledge-base/zero-to-hero-guides/iot/README.md" },
      ],
      28: [
        { label: "Month 7 resources", path: workspacePath },
        { label: "ESP32 project files", path: "phase-4-iot-hardware/month-07-microcontrollers/" },
      ],
    },
    8: {
      29: [
        { label: "IoT guide", path: "knowledge-base/zero-to-hero-guides/iot/README.md" },
        { label: "Month 8 resources", path: workspacePath },
      ],
      30: [
        { label: "Month 8 resources", path: workspacePath },
        { label: "IoT guide", path: "knowledge-base/zero-to-hero-guides/iot/README.md" },
      ],
      31: [
        { label: "Month 8 resources", path: workspacePath },
        { label: "IoT dashboard files", path: "phase-4-iot-hardware/month-08-iot-streaming/" },
      ],
      32: [
        { label: "Month 8 resources", path: workspacePath },
        { label: "Project 6 reference", path: "projects/advanced/project-6-predictive-maintenance/PREREQUISITES.md" },
      ],
    },
    9: {
      33: [
        { label: "Capstone folder", path: workspacePath },
        { label: "Capstone roadmap", path: "knowledge-base/learning-journey/CAPSTONE_ROADMAP.md" },
      ],
      34: [
        { label: "Capstone folder", path: workspacePath },
        { label: "IoT guide", path: "knowledge-base/zero-to-hero-guides/iot/README.md" },
      ],
      35: [
        { label: "Capstone folder", path: workspacePath },
        { label: "Optimization guide", path: "knowledge-base/zero-to-hero-guides/optimization/README.md" },
      ],
      36: [
        { label: "Capstone folder", path: workspacePath },
        { label: "Project 6 reference", path: "projects/advanced/project-6-predictive-maintenance/PREREQUISITES.md" },
      ],
    },
    10: {
      37: [
        { label: "Month 10 resources", path: workspacePath },
        { label: "Project 4 guide", path: "projects/foundations/project-4-news-classification/README.md" },
      ],
      38: [
        { label: "Month 10 resources", path: workspacePath },
        { label: "AI guide folder", path: "phase-6-generative-ai/month-10-nlp-llm-basics/" },
      ],
      39: [
        { label: "Month 10 resources", path: workspacePath },
        { label: "OpenAI integration notes", path: "phase-6-generative-ai/month-10-nlp-llm-basics/" },
      ],
      40: [
        { label: "Month 10 resources", path: workspacePath },
        { label: "AI portfolio files", path: "phase-6-generative-ai/month-10-nlp-llm-basics/" },
      ],
    },
    11: {
      41: [
        { label: "RAG pipeline", path: "phase-6-generative-ai/month-11-rag-vector-databases/resources/rag_pipeline.py" },
        { label: "Month 11 resources", path: workspacePath },
      ],
      42: [
        { label: "Month 11 resources", path: workspacePath },
        { label: "RAG folder", path: "phase-6-generative-ai/month-11-rag-vector-databases/" },
      ],
      43: [
        { label: "Month 11 resources", path: workspacePath },
        { label: "RAG folder", path: "phase-6-generative-ai/month-11-rag-vector-databases/" },
      ],
      44: [
        { label: "Month 11 resources", path: workspacePath },
        { label: "Project 6 reference", path: "projects/advanced/project-6-predictive-maintenance/PREREQUISITES.md" },
      ],
    },
    12: {
      45: [
        { label: "Agentic AI file", path: "phase-6-generative-ai/month-12-agentic-ai/resources/agentic_ai.py" },
        { label: "Month 12 resources", path: workspacePath },
      ],
      46: [
        { label: "Month 12 resources", path: workspacePath },
        { label: "Agentic AI folder", path: "phase-6-generative-ai/month-12-agentic-ai/" },
      ],
      47: [
        { label: "Month 12 resources", path: workspacePath },
        { label: "Project 5 reference", path: "projects/advanced/project-5-factory-twin/PREREQUISITES.md" },
      ],
      48: [
        { label: "Month 12 resources", path: workspacePath },
        { label: "Project 7 reference", path: "projects/advanced/project-7-supply-chain/PREREQUISITES.md" },
      ],
    },
  };
  return catalogs[monthId]?.[week.week] || (workspacePath ? [{ label: "Month workspace", path: workspacePath }] : []);
}

function renderSourceLinks(items, options = {}) {
  const { title = "Source links", compact = false } = options;
  if (!items?.length) return "";
  const blocks = items
    .map((item) => {
      const github = githubLink(item.path);
      const githubHtml = github
        ? `<a class="file-link" href="${github}" target="_blank" rel="noreferrer">GitHub</a>`
        : `<span class="muted-note">Set private repo URL in Mission Control ↑ to enable this link.</span>`;
      return `
        <div class="source-link-row ${compact ? "compact" : ""}">
          <div>
            <strong>${item.label}</strong>
            <div class="resource-path">${item.path}</div>
          </div>
          <div class="source-link-actions">
            <a class="file-link" href="${link(item.path)}">Local</a>
            ${githubHtml}
          </div>
        </div>
      `;
    })
    .join("");
  return `
    <div class="source-panel ${compact ? "compact" : ""}">
      <h4>${title}</h4>
      ${blocks}
    </div>
  `;
}

function getRunInstruction(mode) {
  if (mode === "sql") return "Press Run lesson to execute the query in a small SQLite database inside the browser.";
  if (mode === "python") return "Press Run lesson to execute the code in the browser Python runner.";
  return "Press Run lesson for a structure review. Some professional tools cannot fully execute inside a browser.";
}

function renderLearningSteps({ mode = "python", goals = [], expected = "", saved }) {
  const firstGoal = goals[0] || "Read the explanation and understand the goal.";
  return `
    <div class="lesson-roadmap" aria-label="Lesson workflow">
      <article>
        <span>Learn</span>
        <p>Read the idea first. Focus on what problem this skill solves.</p>
      </article>
      <article>
        <span>Practice</span>
        <p>${firstGoal}</p>
      </article>
      <article>
        <span>Run</span>
        <p>${getRunInstruction(mode)}</p>
      </article>
      <article>
        <span>Submit</span>
        <p>Submit when the output looks right. Your answer is saved automatically.</p>
      </article>
      <article>
        <span>Check</span>
        <p>${saved ? `Last saved: ${formatSavedTime(saved.submittedAt)}.` : expected}</p>
      </article>
    </div>
  `;
}

function renderSuperpowers() {
  document.getElementById("superpowers").innerHTML = superpowers
    .map((item) => `
      <article class="power reveal">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <ul>${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
      </article>
    `)
    .join("");
}

function renderMonths() {
  const rail = document.getElementById("monthRail");
  rail.innerHTML = months
    .map((month) => {
      const active = month.id === state.month ? "is-active" : "";
      const done = state.done.includes(month.id) ? "is-done" : "";
      const locked = !isMonthUnlocked(month.id) ? "is-locked" : "";
      const ft = fastTrackIds.has(month.id);
      return `
        <button class="month-button ${active} ${done} ${locked}" type="button" role="tab" aria-selected="${month.id === state.month}" data-month="${month.id}" data-fast-track="${ft}">
          <span class="month-number">${locked ? "🔒" : month.id}</span>
          <span><strong>${month.title}</strong><span>${month.phase}${ft ? ' <em class="ft-badge">🎯 Priority</em>' : ''}</span></span>
          <span class="check-dot" aria-hidden="true">${state.done.includes(month.id) ? "OK" : ""}</span>
        </button>
      `;
    })
    .join("");

  rail.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.month = Number(button.dataset.month);
      saveProgress();
      renderMonths();
      renderMonthDetail();
    });
  });
}

function renderMonthDetail() {
  const month = months.find((item) => item.id === state.month);

  // ── Progressive unlock gate ──────────────────────────────────────────────
  if (!isMonthUnlocked(month.id)) {
    const prevMonth = months.find(m => m.id === month.id - 1);
    document.getElementById("monthDetail").innerHTML = `
      <div class="locked-month-detail">
        <div class="lock-glyph">🔒</div>
        <h3>${month.phase} — ${month.title}</h3>
        <p class="lock-note">
          Complete <strong>Month ${month.id - 1}${prevMonth ? ": " + prevMonth.title : ""}</strong> first.
          Scroll to it in the list on the left, work through it, then click
          <em>"Mark month complete"</em> at the bottom to unlock this one.
        </p>
        <button class="goto-prev-btn" data-goto="${month.id - 1}">← Go to Month ${month.id - 1}</button>
      </div>
    `;
    document.querySelector(".goto-prev-btn").addEventListener("click", (e) => {
      state.month = Number(e.currentTarget.dataset.goto);
      saveProgress();
      renderMonths();
      renderMonthDetail();
    });
    return;
  }
  // ── End unlock gate ──────────────────────────────────────────────────────

  const done = state.done.includes(month.id);
  const monthSourcesHtml = renderSourceLinks(monthSourceCatalog(month), { title: "Month source links" });
  const weeksHtml = month.weeks ? `
    <div class="weeks-section">
      <h4>Week-by-week plan</h4>
      <div class="weeks-grid">
        ${month.weeks.map((w) => `
          <div class="week-card">
            <div class="week-header">
              <span class="week-num">W${w.week}</span>
              <strong>${w.title}</strong>
            </div>
            <ul class="week-tasks">
              ${w.tasks.map((t) => `<li>${t}</li>`).join("")}
            </ul>
            ${renderSourceLinks(weekSourceCatalog(month.id, w), { title: "Week source links", compact: true })}
          </div>
        `).join("")}
      </div>
    </div>
  ` : "";
  document.getElementById("monthDetail").innerHTML = `
    <div class="month-meta">
      <span class="pill">${month.phase}</span>
      <span class="pill">Month ${month.id}</span>
      <span class="pill">${month.focus}</span>
    </div>
    <h3>${month.title}</h3>
    <p class="beginner-note">${month.beginner}</p>
    <div class="month-columns">
      <section>
        <h4>Skills to master</h4>
        <ul>${month.learn.map((item) => `<li>${item}</li>`).join("")}</ul>
      </section>
      <section>
        <h4>Study first</h4>
        <ul>
          <li><a href="${link(month.study)}">${month.study}</a></li>
          ${month.references.map((item) => `<li><a href="${link(item)}">${item}</a></li>`).join("")}
        </ul>
      </section>
    </div>
    ${weeksHtml}
    <div class="deliverable-box">
      <h4>Deliverable</h4>
      <p>${month.build}</p>
      <p><strong>Job signal:</strong> ${month.job}</p>
    </div>
    ${monthSourcesHtml}
    ${monthGithubLinks[month.id] ? `
    <div class="github-links-section">
      <h4>📦 GitHub sources for this month</h4>
      <p class="github-links-note">Open each repo, read the README, and star it. Your own repo (marked 📁) is where you save your work.</p>
      <div class="github-links-grid">
        ${monthGithubLinks[month.id].map(link => `
          <a class="github-link-card ${link.desc.includes('YOUR REPO') ? 'github-link-yours' : ''}" href="${link.url}" target="_blank" rel="noreferrer">
            <span class="github-link-icon">${link.desc.includes('YOUR REPO') ? '📁' : '⭐'}</span>
            <div>
              <strong>${link.label}</strong>
              <span>${link.desc}</span>
            </div>
          </a>
        `).join("")}
      </div>
    </div>
    ` : ""}
    <div class="month-actions">
      <button class="mark-button" id="markMonth" type="button">${done ? "Mark month incomplete" : "Mark month complete"}</button>
      <a class="file-link" href="${link(month.study)}">Open study folder</a>
    </div>
  `;

  document.getElementById("markMonth").addEventListener("click", () => {
    if (state.done.includes(month.id)) {
      // Un-marking: just remove from done list
      state.done = state.done.filter((id) => id !== month.id);
    } else {
      // Marking complete: add to done, then auto-advance to next month
      state.done = [...state.done, month.id].sort((a, b) => a - b);
      const nextId = month.id + 1;
      const nextMonth = months.find(m => m.id === nextId);
      if (nextMonth) {
        state.month = nextId;
        // Brief visual flash on the newly unlocked button after re-render
        setTimeout(() => {
          const btn = document.querySelector(`.month-button[data-month="${nextId}"]`);
          if (btn) { btn.classList.add("just-unlocked"); setTimeout(() => btn.classList.remove("just-unlocked"), 800); }
        }, 50);
      }
    }
    saveProgress();
    renderMonths();
    renderMonthDetail();
    updateCompletedCount();
    updateFocusStrip();
  });
}

function updateCompletedCount() {
  const count = state.done.length;
  const total = months.length;
  const pct = Math.round((count / total) * 100);
  const el = document.getElementById("completedCount");
  if (el) el.textContent = count;
  const bar = document.getElementById("progressBar");
  const barLabel = document.getElementById("progressLabel");
  const barWrap = document.getElementById("progressBarWrap");
  if (bar) bar.style.width = pct + "%";
  if (barLabel) barLabel.textContent = `${count} / ${total} months complete — ${pct}%`;
  if (barWrap) {
    barWrap.title = `${pct}% of the 12-month roadmap marked complete`;
  }
}

// ── Progressive unlock helpers ─────────────────────────────────────────────
function isMonthUnlocked(monthId) {
  if (monthId === 1) return true;
  return state.done.includes(monthId - 1);
}

function currentActiveMonthId() {
  for (const m of months) {
    if (!state.done.includes(m.id)) return m.id;
  }
  return months[months.length - 1].id;
}

function updateFocusStrip() {
  const activeId = currentActiveMonthId();
  const activeMonth = months.find(m => m.id === activeId);
  const label = document.getElementById("focusMonthLabel");
  const pct = document.getElementById("focusPct");
  if (label && activeMonth) {
    label.textContent = `Month ${activeId}: ${activeMonth.title}`;
  }
  if (pct) {
    const count = state.done.length;
    const total = months.length;
    pct.textContent = `${count} / ${total} months done`;
  }
}

function renderMissionControl() {
  const today = new Date();
  const dateKey = today.toISOString().slice(0, 10);
  const todayDate = document.getElementById("todayDate");
  if (todayDate) todayDate.textContent = dateKey;

  const checklist = document.getElementById("startChecklist");
  if (checklist) {
    checklist.innerHTML = startChecklistItems
      .map(([id, title, detail]) => `
        <label class="check-item">
          <input type="checkbox" data-setup="${id}" ${state.setupDone.includes(id) ? "checked" : ""} />
          <span><strong>${title}</strong><small>${detail}</small></span>
        </label>
      `)
      .join("");
    checklist.querySelectorAll("input").forEach((input) => {
      input.addEventListener("change", () => {
        const id = input.dataset.setup;
        state.setupDone = input.checked
          ? [...new Set([...state.setupDone, id])]
          : state.setupDone.filter((item) => item !== id);
        saveMissionState();
        updateMissionCounts();
      });
    });
  }

  const goal = document.getElementById("dailyGoal");
  const log = document.getElementById("dailyLog");
  if (goal && log) {
    goal.value = localStorage.getItem(`dailyGoal:${dateKey}`) || "";
    log.value = localStorage.getItem(`dailyLog:${dateKey}`) || "";
  }

  const githubInput = document.getElementById("githubRepoBase");
  const githubBranchInput = document.getElementById("githubBranch");
  const githubStatus = document.getElementById("githubRepoStatus");
  const manualRepo = normalizeGitHubRepoBase(state.githubRepoBase);
  if (githubInput) githubInput.value = state.githubRepoBase;
  if (githubBranchInput) githubBranchInput.value = state.githubBranch || "main";
  if (githubStatus) {
    githubStatus.textContent = manualRepo
      ? `✅ GitHub links active — branch: ${state.githubBranch || "main"}. Click the sample link below to verify your repo is correct.`
      : "⚠️ No private study repo set. Create a repo on GitHub (e.g. self-internship), paste the URL above, and click Save. GitHub buttons throughout the site will then open your files directly.";
  }

  renderEvidence();
  updateMissionCounts();
}

function updateMissionCounts() {
  const startCount = document.getElementById("startChecklistCount");
  if (startCount) startCount.textContent = `${state.setupDone.length}/${startChecklistItems.length}`;
  const evidenceCount = document.getElementById("evidenceCount");
  if (evidenceCount) evidenceCount.textContent = `${state.evidence.length} saved`;
}

function bindMissionControl() {
  const today = new Date().toISOString().slice(0, 10);
  const goal = document.getElementById("dailyGoal");
  const log = document.getElementById("dailyLog");
  const status = document.getElementById("dailyLogStatus");
  if (goal && log) {
    const saveDaily = () => {
      localStorage.setItem(`dailyGoal:${today}`, goal.value);
      localStorage.setItem(`dailyLog:${today}`, log.value);
      if (status) status.textContent = `Saved daily log for ${today}.`;
    };
    goal.addEventListener("input", saveDaily);
    log.addEventListener("input", saveDaily);
    document.getElementById("saveDailyLog").addEventListener("click", saveDaily);
    document.getElementById("clearDailyLog").addEventListener("click", () => {
      goal.value = "";
      log.value = "";
      localStorage.removeItem(`dailyGoal:${today}`);
      localStorage.removeItem(`dailyLog:${today}`);
      if (status) status.textContent = `Cleared daily log for ${today}.`;
    });
  }

  document.getElementById("addEvidence")?.addEventListener("click", () => {
    const title = document.getElementById("evidenceTitle").value.trim();
    const detail = document.getElementById("evidenceDetail").value.trim();
    if (!title && !detail) return;
    state.evidence = [
      {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        title: title || "Untitled evidence",
        detail,
        createdAt: new Date().toISOString(),
      },
      ...state.evidence,
    ];
    document.getElementById("evidenceTitle").value = "";
    document.getElementById("evidenceDetail").value = "";
    saveMissionState();
    renderEvidence();
    updateMissionCounts();
  });

  const githubInput = document.getElementById("githubRepoBase");
  const githubBranchInput = document.getElementById("githubBranch");
  const saveGithubButton = document.getElementById("saveGithubRepoBase");
  const clearGithubButton = document.getElementById("clearGithubRepoBase");
  const githubStatus = document.getElementById("githubRepoStatus");
  const githubPreview = document.getElementById("githubLinkPreview");
  const githubPreviewAnchor = document.getElementById("githubLinkPreviewAnchor");

  // Restore saved values into inputs
  if (githubBranchInput) githubBranchInput.value = state.githubBranch || "main";

  const updateGithubPreview = () => {
    if (!githubPreview || !githubPreviewAnchor) return;
    const repo = normalizeGitHubRepoBase(githubInput?.value || state.githubRepoBase);
    const branch = (githubBranchInput?.value || state.githubBranch || "main").trim() || "main";
    if (repo) {
      const sampleUrl = `${repo}/tree/${branch}/knowledge-base/`;
      githubPreviewAnchor.href = sampleUrl;
      githubPreviewAnchor.textContent = sampleUrl;
      githubPreview.style.display = "block";
    } else {
      githubPreview.style.display = "none";
    }
  };

  const saveGithubRepo = () => {
    state.githubRepoBase = normalizeGitHubRepoBase(githubInput?.value || "");
    state.githubBranch = (githubBranchInput?.value || "main").trim() || "main";
    saveMissionState();
    if (githubInput) githubInput.value = state.githubRepoBase;
    if (githubBranchInput) githubBranchInput.value = state.githubBranch;
    if (githubStatus) {
      githubStatus.textContent = state.githubRepoBase
        ? `✅ Saved! GitHub buttons now point to: ${state.githubRepoBase} (branch: ${state.githubBranch}). Click the sample link below to verify your repo exists.`
        : "URL cleared. GitHub buttons are disabled until you add a repo URL.";
    }
    updateGithubPreview();
    renderMonthDetail();
    renderProjects();
    renderFolders();
    renderResources();
  };

  const clearGithubRepo = () => {
    if (githubInput) githubInput.value = "";
    if (githubBranchInput) githubBranchInput.value = "main";
    state.githubRepoBase = "";
    state.githubBranch = "main";
    saveMissionState();
    if (githubStatus) githubStatus.textContent = "URL cleared. Paste your private study repo URL and click Save to re-enable GitHub buttons.";
    if (githubPreview) githubPreview.style.display = "none";
    renderMonthDetail();
    renderProjects();
    renderFolders();
    renderResources();
  };

  githubInput?.addEventListener("input", updateGithubPreview);
  githubBranchInput?.addEventListener("input", updateGithubPreview);
  githubInput?.addEventListener("change", saveGithubRepo);
  githubBranchInput?.addEventListener("change", saveGithubRepo);
  saveGithubButton?.addEventListener("click", saveGithubRepo);
  clearGithubButton?.addEventListener("click", clearGithubRepo);

  // Show preview on load if URL is already set
  updateGithubPreview();

  document.getElementById("exportProgress")?.addEventListener("click", exportProgress);
  document.getElementById("importProgress")?.addEventListener("change", importProgress);
}

function renderEvidence() {
  const list = document.getElementById("evidenceList");
  if (!list) return;
  if (!state.evidence.length) {
    list.innerHTML = `<p class="muted-note">No evidence saved yet. Add command output, metrics, demo URLs, screenshot paths, or summary notes.</p>`;
    return;
  }
  list.innerHTML = state.evidence
    .slice(0, 8)
    .map((item) => `
      <div class="evidence-item">
        <strong>${item.title}</strong>
        <small>${formatSavedTime(item.createdAt)}</small>
        <p>${item.detail}</p>
        <button class="file-link as-button" type="button" data-remove-evidence="${item.id}">Remove</button>
      </div>
    `)
    .join("");
  list.querySelectorAll("[data-remove-evidence]").forEach((button) => {
    button.addEventListener("click", () => {
      state.evidence = state.evidence.filter((item) => item.id !== button.dataset.removeEvidence);
      saveMissionState();
      renderEvidence();
      updateMissionCounts();
    });
  });
}

function exportProgress() {
  const data = {};
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    data[key] = localStorage.getItem(key);
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const linkElement = document.createElement("a");
  linkElement.href = url;
  linkElement.download = `self-internship-progress-${new Date().toISOString().slice(0, 10)}.json`;
  linkElement.click();
  URL.revokeObjectURL(url);
  document.getElementById("backupStatus").textContent = "Progress backup exported.";
}

function importProgress(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      Object.entries(data).forEach(([key, value]) => localStorage.setItem(key, String(value)));
      document.getElementById("backupStatus").textContent = "Progress imported. Refreshing page...";
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      document.getElementById("backupStatus").textContent = `Import failed: ${error.message || error}`;
    }
  };
  reader.readAsText(file);
}

function renderReference() {
  renderGlossary();
  const blockerList = document.getElementById("blockerList");
  if (blockerList) {
    blockerList.innerHTML = blockers
      .map(([title, detail], index) => `
        <details ${index < 2 ? "open" : ""}>
          <summary>${title}</summary>
          <p>${detail}</p>
        </details>
      `)
      .join("");
  }
}

function renderGlossary() {
  const list = document.getElementById("glossaryList");
  if (!list) return;
  const query = state.glossaryQuery.trim().toLowerCase();
  const filtered = glossary.filter(([term, definition]) => !query || `${term} ${definition}`.toLowerCase().includes(query));
  list.innerHTML = filtered
    .map(([term, definition]) => `
      <article class="resource-item">
        <div>
          <span class="pill">term</span>
          <h3>${term}</h3>
          <p>${definition}</p>
        </div>
      </article>
    `)
    .join("") || `<p>No glossary terms match your search.</p>`;
}

function bindReference() {
  document.getElementById("glossarySearch")?.addEventListener("input", (event) => {
    state.glossaryQuery = event.target.value;
    renderGlossary();
  });
}

function renderFolders() {
  document.getElementById("folderMap").innerHTML = folders
    .map(([title, text, path]) => `
      <article class="folder">
        <h3>${title}</h3>
        <p>${text}</p>
        ${renderSourceLinks([{ label: title, path }], { title: "Folder links", compact: true })}
      </article>
    `)
    .join("");
}

function renderProjectTabs() {
  const tabs = [
    ["foundations", "Foundations"],
    ["advanced", "Advanced"],
    ["ai-native", "🤖 AI-Native 2026"],
  ];
  document.getElementById("projectTabs").innerHTML = tabs
    .map(([id, label]) => `<button class="tab-button ${state.projectGroup === id ? "is-active" : ""}" type="button" data-group="${id}">${label}</button>`)
    .join("");
  document.querySelectorAll("#projectTabs button").forEach((button) => {
    button.addEventListener("click", () => {
      state.projectGroup = button.dataset.group;
      renderProjectTabs();
      renderProjects();
    });
  });
}

function renderProjects() {
  document.getElementById("projectGrid").innerHTML = projects
    .filter((project) => project.group === state.projectGroup)
    .map((project) => {
      const docLinks = [
        { label: "📋 README (overview)", path: project.path },
        project.instructions ? { label: "📝 INSTRUCTIONS (step-by-step)", path: project.instructions } : null,
        { label: "✅ PREREQUISITES (what to install)", path: project.prerequisites },
        { label: "🐍 Starter code (.py)", path: project.code },
      ].filter(Boolean);
      return `
        <article class="project reveal">
          <div class="project-header-row">
            <p class="role">${project.role}</p>
            <span class="project-month-pill">${project.month}</span>
          </div>
          <h3>${project.title}</h3>
          <p>${project.outcome}</p>
          <p class="project-time"><strong>⏱ Time:</strong> ${project.time}</p>
          <ul class="project-skills">${project.skills.map((skill) => `<li>${skill}</li>`).join("")}</ul>
          ${project.description ? `<ol class="project-steps">${project.description.map(s=>`<li>${s}</li>`).join("")}</ol>` : ""}
          ${renderSourceLinks(docLinks, { title: "Project files", compact: true })}
        </article>
      `;
    })
    .join("");
}

function renderPythonLessonList() {
  const list = document.getElementById("pythonLessonList");
  if (!list) return;
  list.innerHTML = pythonLessons
    .map((lesson) => {
      const active = lesson.id === state.pythonLessonId ? "is-active" : "";
      const done = state.pythonLessonsDone.includes(lesson.id) ? "is-done" : "";
      const saved = getSavedPythonSubmission(lesson.id);
      return `
        <button class="python-lesson ${active} ${done}" type="button" data-lesson="${lesson.id}">
          <span>${lesson.day}</span>
          <strong>${lesson.title}</strong>
          <small>${saved ? `Saved ${formatSavedTime(saved.submittedAt)}` : "Not completed"}</small>
        </button>
      `;
    })
    .join("");

  list.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.pythonLessonId = button.dataset.lesson;
      savePythonLessonState();
      renderPythonLessonList();
      renderPythonLesson();
    });
  });
}

function renderPythonLesson() {
  const lesson = getPythonLesson();
  const saved = getSavedPythonSubmission(lesson.id);
  const draft = localStorage.getItem(getPythonDraftKey(lesson.id)) || saved?.code || lesson.starter;
  const output = saved?.output || localStorage.getItem(getPythonOutputKey(lesson.id)) || "";
  state.pythonLessonOutput = output;

  document.getElementById("pythonLessonHeader").innerHTML = `
    <div class="lesson-meta">
      <span class="pill">${lesson.day}</span>
      <span class="pill">Runnable Python</span>
      <span class="pill">${saved ? `Saved: ${formatSavedTime(saved.submittedAt)}` : "Not submitted yet"}</span>
    </div>
    <h3>${lesson.title}</h3>
    <p>${lesson.expected}</p>
    ${renderLearningSteps({ mode: "python", goals: lesson.goals, expected: lesson.expected, saved })}
  `;
  document.getElementById("pythonLessonExplain").innerHTML = `
    <span class="mini-step">Learn</span>
    <h3>What you are learning</h3>
    <p>${lesson.explain}</p>
    <h4>Practice goals</h4>
    <ul>${lesson.goals.map((goal) => `<li>${goal}</li>`).join("")}</ul>
    <h4>When to submit</h4>
    <p>${lesson.expected}</p>
  `;
  document.getElementById("pythonLessonEditor").value = draft;
  document.getElementById("pythonLessonOutput").textContent = saved
    ? `${saved.output || "Saved lesson has no runtime output."}\n\nSaved result: ${saved.passed ? "PASSED" : "NEEDS FIXES"} on ${formatSavedTime(saved.submittedAt)}.`
    : output || "Run the lesson to see output.";
  renderPythonLessonChecks(saved?.results || []);
  updatePythonLessonCount();
}

function renderPythonLessonChecks(results) {
  const element = document.getElementById("pythonLessonChecks");
  if (!element) return;
  if (!results.length) {
    element.innerHTML = `<p class="muted-note">No checks yet. Run or submit the lesson.</p>`;
    return;
  }
  element.innerHTML = results
    .map((result) => `
      <div class="check-row ${result.pass ? "pass" : "fail"}">
        <span>${result.pass ? "PASS" : "FIX"}</span>
        <p>${result.label}</p>
      </div>
    `)
    .join("");
}

function updatePythonLessonCount() {
  const count = document.getElementById("pythonLessonCount");
  if (count) count.textContent = state.pythonLessonsDone.length;
}

function bindPythonLessonLab() {
  const editor = document.getElementById("pythonLessonEditor");
  if (!editor) return;

  editor.addEventListener("input", () => {
    const lesson = getPythonLesson();
    localStorage.setItem(getPythonDraftKey(lesson.id), editor.value);
  });

  document.getElementById("runPythonLesson").addEventListener("click", async () => {
    await runPythonLesson(false);
  });

  document.getElementById("submitPythonLesson").addEventListener("click", async () => {
    await runPythonLesson(true);
  });

  document.getElementById("resetPythonLesson").addEventListener("click", () => {
    const lesson = getPythonLesson();
    editor.value = lesson.starter;
    localStorage.setItem(getPythonDraftKey(lesson.id), lesson.starter);
    localStorage.removeItem(getPythonOutputKey(lesson.id));
    state.pythonLessonOutput = "";
    document.getElementById("pythonLessonOutput").textContent = "Starter restored.";
    renderPythonLessonChecks(getSavedPythonSubmission(lesson.id)?.results || []);
  });

  document.getElementById("nextPythonLesson").addEventListener("click", () => {
    const index = pythonLessons.findIndex((lesson) => lesson.id === state.pythonLessonId);
    const next = pythonLessons[Math.min(index + 1, pythonLessons.length - 1)];
    state.pythonLessonId = next.id;
    savePythonLessonState();
    renderPythonLessonList();
    renderPythonLesson();
    document.getElementById("python-lab").scrollIntoView({ behavior: "smooth" });
  });
}

function evaluatePythonLessonChecks(lesson, code, output) {
  const source = `${code}\n${output}`;
  return lesson.checks.map(([label, pattern, target]) => ({
    label,
    pass: pattern.test(target === "output" ? output : source),
  }));
}

async function runPythonLesson(shouldSubmit) {
  const lesson = getPythonLesson();
  const code = document.getElementById("pythonLessonEditor").value;
  localStorage.setItem(getPythonDraftKey(lesson.id), code);
  document.getElementById("pythonLessonStatus").textContent = "Running lesson...";

  let output = "";
  try {
    const pyodide = await ensurePyodide();
    const wrapped = `
import sys, io, traceback
_stdout = io.StringIO()
_old_stdout = sys.stdout
sys.stdout = _stdout
try:
${indentPython(code)}
    _lesson_output = _stdout.getvalue()
${indentPython(lesson.tests || "")}
except Exception:
    traceback.print_exc(file=_stdout)
finally:
    sys.stdout = _old_stdout
_python_lesson_output = _stdout.getvalue()
`;
    pyodide.runPython(wrapped);
    output = pyodide.globals.get("_python_lesson_output") || "Code ran with no printed output.";
    document.getElementById("pythonLessonStatus").textContent = "Lesson ran. Output saved.";
  } catch (error) {
    output = String(error.message || error);
    document.getElementById("pythonLessonStatus").textContent = "Runner could not complete the lesson.";
  }

  state.pythonLessonOutput = output;
  localStorage.setItem(getPythonOutputKey(lesson.id), output);
  document.getElementById("pythonLessonOutput").textContent = output;

  const results = evaluatePythonLessonChecks(lesson, code, output);
  renderPythonLessonChecks(results);

  if (shouldSubmit) {
    const passed = results.every((result) => result.pass) && !/Traceback|AssertionError|SyntaxError/.test(output);
    if (passed && !state.pythonLessonsDone.includes(lesson.id)) {
      state.pythonLessonsDone = [...state.pythonLessonsDone, lesson.id].sort();
    }
    if (!passed) {
      state.pythonLessonsDone = state.pythonLessonsDone.filter((id) => id !== lesson.id);
    }
    const saved = {
      id: lesson.id,
      title: lesson.title,
      code,
      output,
      results,
      passed,
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem(getPythonSubmissionKey(lesson.id), JSON.stringify(saved));
    savePythonLessonState();
    renderPythonLessonList();
    updatePythonLessonCount();
    document.getElementById("pythonLessonStatus").textContent = passed
      ? "Lesson submitted and saved. You can move to the next lesson."
      : "Lesson saved, but it needs fixes before completion.";
  }
}

function renderSkillTrackTabs() {
  const tabs = document.getElementById("skillTrackTabs");
  if (!tabs) return;
  tabs.innerHTML = skillTracks
    .map((track) => `<button class="tab-button ${track.id === state.skillTrack ? "is-active" : ""}" type="button" data-track="${track.id}">${track.label}</button>`)
    .join("");
  tabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.skillTrack = button.dataset.track;
      state.skillLessonId = getSkillTrack().lessons[0].id;
      saveSkillLessonState();
      renderSkillTrackTabs();
      renderSkillLessonList();
      renderSkillLesson();
    });
  });
}

function renderSkillLessonList() {
  const list = document.getElementById("skillLessonList");
  if (!list) return;
  const track = getSkillTrack();
  list.innerHTML = track.lessons
    .map((lesson) => {
      const active = lesson.id === state.skillLessonId ? "is-active" : "";
      const done = state.skillLessonsDone.includes(lesson.id) ? "is-done" : "";
      const saved = getSavedSkillSubmission(lesson.id);
      return `
        <button class="skill-lesson ${active} ${done}" type="button" data-skill-lesson="${lesson.id}">
          <span>${track.label}</span>
          <strong>${lesson.title}</strong>
          <small>${saved ? `Saved ${formatSavedTime(saved.submittedAt)}` : "Not completed"}</small>
        </button>
      `;
    })
    .join("");
  list.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.skillLessonId = button.dataset.skillLesson;
      saveSkillLessonState();
      renderSkillLessonList();
      renderSkillLesson();
    });
  });
}

function renderSkillLesson() {
  const track = getSkillTrack();
  const lesson = getSkillLesson();
  const saved = getSavedSkillSubmission(lesson.id);
  const draft = localStorage.getItem(getSkillDraftKey(lesson.id)) || saved?.code || lesson.starter;
  const output = saved?.output || localStorage.getItem(getSkillOutputKey(lesson.id)) || "";
  state.skillLessonOutput = output;

  document.getElementById("skillLessonHeader").innerHTML = `
    <div class="lesson-meta">
      <span class="pill">${track.label}</span>
      <span class="pill">${lesson.mode === "sql" ? "Runnable SQLite" : lesson.mode === "python" ? "Runnable Python" : "Structure check"}</span>
      <span class="pill">${saved ? `Saved: ${formatSavedTime(saved.submittedAt)}` : "Not submitted yet"}</span>
    </div>
    <h3>${lesson.title}</h3>
    <p>${lesson.expected}</p>
    ${renderLearningSteps({ mode: lesson.mode, goals: lesson.goals, expected: lesson.expected, saved })}
  `;
  document.getElementById("skillLessonExplain").innerHTML = `
    <span class="mini-step">Learn</span>
    <h3>What you are learning</h3>
    <p>${lesson.explain}</p>
    <h4>Practice goals</h4>
    <ul>${lesson.goals.map((goal) => `<li>${goal}</li>`).join("")}</ul>
    <h4>Run mode</h4>
    <p>${getRunInstruction(lesson.mode)}</p>
    <h4>When to submit</h4>
    <p>${lesson.expected}</p>
  `;
  document.getElementById("skillLessonEditor").value = draft;
  document.getElementById("skillLessonOutput").textContent = saved
    ? `${saved.output || "Saved lesson has no runtime output."}\n\nSaved result: ${saved.passed ? "PASSED" : "NEEDS FIXES"} on ${formatSavedTime(saved.submittedAt)}.`
    : output || "Run or submit the lesson.";
  document.getElementById("skillSourceLink").href = link(track.source);
  renderSkillLessonChecks(saved?.results || []);
  updateSkillLessonCount();
}

function renderSkillLessonChecks(results) {
  const element = document.getElementById("skillLessonChecks");
  if (!element) return;
  if (!results.length) {
    element.innerHTML = `<p class="muted-note">No checks yet. Run or submit the lesson.</p>`;
    return;
  }
  element.innerHTML = results
    .map((result) => `
      <div class="check-row ${result.pass ? "pass" : "fail"}">
        <span>${result.pass ? "PASS" : "FIX"}</span>
        <p>${result.label}</p>
      </div>
    `)
    .join("");
}

function updateSkillLessonCount() {
  const count = document.getElementById("skillLessonCount");
  if (count) count.textContent = state.skillLessonsDone.length;
}

function bindSkillLessonLab() {
  const editor = document.getElementById("skillLessonEditor");
  if (!editor) return;
  editor.addEventListener("input", () => {
    localStorage.setItem(getSkillDraftKey(getSkillLesson().id), editor.value);
  });
  document.getElementById("runSkillLesson").addEventListener("click", async () => {
    await runSkillLesson(false);
  });
  document.getElementById("submitSkillLesson").addEventListener("click", async () => {
    await runSkillLesson(true);
  });
  document.getElementById("resetSkillLesson").addEventListener("click", () => {
    const lesson = getSkillLesson();
    editor.value = lesson.starter;
    localStorage.setItem(getSkillDraftKey(lesson.id), lesson.starter);
    localStorage.removeItem(getSkillOutputKey(lesson.id));
    state.skillLessonOutput = "";
    document.getElementById("skillLessonOutput").textContent = "Starter restored.";
    renderSkillLessonChecks(getSavedSkillSubmission(lesson.id)?.results || []);
  });
  document.getElementById("nextSkillLesson").addEventListener("click", () => {
    const track = getSkillTrack();
    const index = track.lessons.findIndex((lesson) => lesson.id === state.skillLessonId);
    const next = track.lessons[Math.min(index + 1, track.lessons.length - 1)];
    state.skillLessonId = next.id;
    saveSkillLessonState();
    renderSkillLessonList();
    renderSkillLesson();
    document.getElementById("skill-labs").scrollIntoView({ behavior: "smooth" });
  });
}

function evaluateSkillLessonChecks(lesson, code, output) {
  const source = `${code}\n${output}`;
  return lesson.checks.map(([label, pattern, target]) => ({
    label,
    pass: typeof pattern === "boolean" ? pattern : pattern.test(target === "output" ? output : source),
  }));
}

async function runSqlLesson(lesson, sql) {
  const pyodide = await ensurePyodide();
  const wrapped = `
import sqlite3, io, sys, traceback
_stdout = io.StringIO()
_old_stdout = sys.stdout
sys.stdout = _stdout
try:
    conn = sqlite3.connect(":memory:")
    cur = conn.cursor()
    cur.executescript(${JSON.stringify("${setup}")})
    rows = cur.execute(${JSON.stringify("${sql}")}).fetchall()
    names = [description[0] for description in cur.description] if cur.description else []
    if names:
        print(" | ".join(names))
    for row in rows:
        print(" | ".join(str(value) for value in row))
except Exception:
    traceback.print_exc(file=_stdout)
finally:
    sys.stdout = _old_stdout
    _sql_output = _stdout.getvalue()
`;
  const runnable = wrapped
    .replace(JSON.stringify("${setup}"), JSON.stringify(lesson.setup || ""))
    .replace(JSON.stringify("${sql}"), JSON.stringify(sql));
  pyodide.runPython(runnable);
  return pyodide.globals.get("_sql_output") || "Query ran with no rows.";
}

async function runSkillLesson(shouldSubmit) {
  const lesson = getSkillLesson();
  const code = document.getElementById("skillLessonEditor").value;
  localStorage.setItem(getSkillDraftKey(lesson.id), code);
  document.getElementById("skillLessonStatus").textContent = "Running skill lesson...";

  let output = "";
  try {
    if (lesson.mode === "python") {
      const pyodide = await ensurePyodide();
      const wrapped = `
import sys, io, traceback
_stdout = io.StringIO()
_old_stdout = sys.stdout
sys.stdout = _stdout
try:
${indentPython(code)}
    _lesson_output = _stdout.getvalue()
${indentPython(lesson.tests || "")}
except Exception:
    traceback.print_exc(file=_stdout)
finally:
    sys.stdout = _old_stdout
_skill_output = _stdout.getvalue()
`;
      pyodide.runPython(wrapped);
      output = pyodide.globals.get("_skill_output") || "Code ran with no printed output.";
    } else if (lesson.mode === "sql") {
      output = await runSqlLesson(lesson, code);
    } else {
      output = "This skill is checked by structure because the browser cannot run this tool directly.";
    }
    document.getElementById("skillLessonStatus").textContent = "Lesson checked. Output saved.";
  } catch (error) {
    output = String(error.message || error);
    document.getElementById("skillLessonStatus").textContent = "Runner could not complete the lesson.";
  }

  state.skillLessonOutput = output;
  localStorage.setItem(getSkillOutputKey(lesson.id), output);
  document.getElementById("skillLessonOutput").textContent = output;
  const results = evaluateSkillLessonChecks(lesson, code, output);
  renderSkillLessonChecks(results);

  if (shouldSubmit) {
    const passed = results.every((result) => result.pass) && !/Traceback|AssertionError|SyntaxError/.test(output);
    if (passed && !state.skillLessonsDone.includes(lesson.id)) {
      state.skillLessonsDone = [...state.skillLessonsDone, lesson.id].sort();
    }
    if (!passed) {
      state.skillLessonsDone = state.skillLessonsDone.filter((id) => id !== lesson.id);
    }
    const saved = {
      id: lesson.id,
      title: lesson.title,
      code,
      output,
      results,
      passed,
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem(getSkillSubmissionKey(lesson.id), JSON.stringify(saved));
    saveSkillLessonState();
    renderSkillLessonList();
    updateSkillLessonCount();
    document.getElementById("skillLessonStatus").textContent = passed
      ? "Skill lesson submitted and saved."
      : "Skill lesson saved, but it needs fixes.";
  }
}

function renderLabList() {
  const list = document.getElementById("labList");
  list.innerHTML = labTasks
    .map((task) => {
      const active = task.id === state.labId ? "is-active" : "";
      const passed = state.labPassed.includes(task.id) ? "is-done" : "";
      const saved = getSavedSubmission(task.id);
      return `
        <button class="lab-task ${active} ${passed}" type="button" data-lab="${task.id}">
          <span>${task.group}</span>
          <strong>${task.title}</strong>
          <small>${saved ? `Saved ${formatSavedTime(saved.submittedAt)}` : "Not submitted"}</small>
        </button>
      `;
    })
    .join("");

  list.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.labId = button.dataset.lab;
      state.lastOutput = "";
      saveLabState();
      renderLabList();
      renderLabWorkspace();
    });
  });
}

function renderLabWorkspace() {
  const task = getCurrentLab();
  const saved = getSavedSubmission(task.id);
  const draft = localStorage.getItem(getDraftKey(task.id)) || saved?.code || task.starter;
  const savedOutput = saved?.output || localStorage.getItem(getOutputKey(task.id)) || "";
  state.lastOutput = savedOutput;
  document.getElementById("labHeader").innerHTML = `
    <div>
      <div class="lesson-meta">
        <span class="pill">${task.group}</span>
        <span class="pill">${task.group === "Project submission" ? "Evidence check" : "Task check"}</span>
        <span class="pill">${saved ? `Saved submission: ${formatSavedTime(saved.submittedAt)}` : "No saved submission yet"}</span>
      </div>
      <h3>${task.title}</h3>
      <p>${task.prompt}</p>
      <p><strong>Expected:</strong> ${task.expected}</p>
      ${renderLearningSteps({
        mode: /Python|pandas|csv|script/i.test(task.title) ? "python" : "text",
        goals: [task.prompt],
        expected: task.expected,
        saved,
      })}
    </div>
  `;
  document.getElementById("codeEditor").value = draft;
  document.getElementById("labOutput").textContent = saved
    ? `${saved.output || "Saved submission has no runtime output."}\n\nSaved result: ${saved.passed ? "PASSED" : "NEEDS FIXES"} on ${formatSavedTime(saved.submittedAt)}. You do not need to run again unless you change the work.`
    : state.lastOutput || "Run Python for executable tasks, or submit directly for structure and evidence checks.";
  document.getElementById("labSourceLink").href = link(task.source);
  renderCheckResults(saved?.results || []);
}

function renderCheckResults(results) {
  const element = document.getElementById("checkResults");
  if (!results.length) {
    element.innerHTML = "";
    return;
  }
  element.innerHTML = results
    .map((result) => `
      <div class="check-row ${result.pass ? "pass" : "fail"}">
        <span>${result.pass ? "PASS" : "FIX"}</span>
        <p>${result.label}</p>
      </div>
    `)
    .join("");
}

function bindLabEditor() {
  const editor = document.getElementById("codeEditor");
  editor.addEventListener("input", () => {
    localStorage.setItem(getDraftKey(getCurrentLab().id), editor.value);
  });

  document.getElementById("resetCode").addEventListener("click", () => {
    const task = getCurrentLab();
    editor.value = task.starter;
    localStorage.setItem(getDraftKey(task.id), task.starter);
    localStorage.removeItem(getOutputKey(task.id));
    state.lastOutput = "";
    const saved = getSavedSubmission(task.id);
    document.getElementById("labOutput").textContent = saved
      ? `Starter restored. Your previous saved submission is still kept from ${formatSavedTime(saved.submittedAt)}. Submit again when you want to replace it.`
      : "Starter restored.";
    renderCheckResults(saved?.results || []);
  });

  document.getElementById("submitCode").addEventListener("click", () => {
    submitCurrentLab();
  });

  document.getElementById("runCode").addEventListener("click", async () => {
    await runCurrentPython();
  });
}

function updateLabPassedCount() {
  document.getElementById("labPassedCount").textContent = state.labPassed.length;
}

function submitCurrentLab() {
  const task = getCurrentLab();
  const code = document.getElementById("codeEditor").value;
  localStorage.setItem(getDraftKey(task.id), code);
  const source = `${code}\n${state.lastOutput}`;
  const results = task.checks.map(([label, pattern, target]) => ({
    label,
    pass: pattern.test(target === "output" ? state.lastOutput : source),
  }));
  const passed = results.every((result) => result.pass);

  if (passed && !state.labPassed.includes(task.id)) {
    state.labPassed = [...state.labPassed, task.id].sort();
  }
  if (!passed) {
    state.labPassed = state.labPassed.filter((id) => id !== task.id);
  }

  const savedOutput = state.lastOutput || "";
  const savedSubmission = {
    id: task.id,
    title: task.title,
    group: task.group,
    code,
    output: savedOutput,
    results,
    passed,
    submittedAt: new Date().toISOString(),
  };
  localStorage.setItem(getSubmissionKey(task.id), JSON.stringify(savedSubmission));
  localStorage.setItem(getOutputKey(task.id), savedOutput);
  saveLabState();
  renderLabList();
  renderCheckResults(results);
  updateLabPassedCount();

  const summary = passed
    ? "Submission saved and passed all checks. You do not need to run it again unless you edit it."
    : "Submission saved but needs fixes. Address every FIX row, then submit again to replace the saved result.";
  document.getElementById("labOutput").textContent = savedOutput
    ? `${savedOutput}\n\n${summary}\nSaved at ${formatSavedTime(savedSubmission.submittedAt)}.`
    : `${summary}\nSaved at ${formatSavedTime(savedSubmission.submittedAt)}.`;
}

async function ensurePyodide() {
  if (window.pyodide) return window.pyodide;
  if (!pyodideReady) {
    document.getElementById("pythonStatus").textContent = "Python runner: loading Pyodide from CDN";
    pyodideReady = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
      script.onload = async () => {
        try {
          window.pyodide = await loadPyodide();
          document.getElementById("pythonStatus").textContent = "Python runner: ready";
          resolve(window.pyodide);
        } catch (error) {
          reject(error);
        }
      };
      script.onerror = () => reject(new Error("Could not load Pyodide. Check internet access or run the code locally in Python."));
      document.head.appendChild(script);
    });
  }
  return pyodideReady;
}

function indentPython(code) {
  return code
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");
}

async function runCurrentPython() {
  const task = getCurrentLab();
  const code = document.getElementById("codeEditor").value;
  localStorage.setItem(getDraftKey(task.id), code);

  if (task.group === "Project submission" || /Dockerfile|GitHub Actions|ESP32|Arduino|Django|FastAPI|Celery|RAG|Agent/.test(task.title)) {
    document.getElementById("labOutput").textContent = "This task is checked by structure, not executed in the browser. Use Submit check.";
    state.lastOutput = "";
    localStorage.setItem(getOutputKey(task.id), state.lastOutput);
    return;
  }

  try {
    const pyodide = await ensurePyodide();
    const testBlock = task.tests ? `\n${task.tests}` : "";
    const wrapped = `
import sys, io, traceback
_stdout = io.StringIO()
_old_stdout = sys.stdout
sys.stdout = _stdout
try:
${indentPython(`${code}${testBlock}`)}
except Exception:
    traceback.print_exc(file=_stdout)
finally:
    sys.stdout = _old_stdout
_lab_output = _stdout.getvalue()
`;
    pyodide.runPython(wrapped);
    state.lastOutput = pyodide.globals.get("_lab_output") || "";
    localStorage.setItem(getOutputKey(task.id), state.lastOutput);
    document.getElementById("labOutput").textContent = state.lastOutput || "Code ran with no printed output.";
  } catch (error) {
    state.lastOutput = String(error.message || error);
    localStorage.setItem(getOutputKey(task.id), state.lastOutput);
    document.getElementById("pythonStatus").textContent = "Python runner: unavailable";
    document.getElementById("labOutput").textContent = `${state.lastOutput}\n\nFallback: run this code locally with python, then paste the output here is not required; Submit check still validates structure.`;
  }
}

function renderResourceChips() {
  const chips = [
    ["all", "All"],
    ["Guide", "Guides"],
    ["github", "GitHub"],
    ["Python", "Python"],
    ["SQL", "SQL"],
    ["Arduino", "Arduino"],
    ["Shell", "Shell"],
    ["Docker", "Docker"],
    ["Java", "Java"],
    ["month", "Months"],
    ["project", "Projects"],
    ["capstone", "Capstone"],
  ];
  document.getElementById("resourceChips").innerHTML = chips
    .map(([id, label]) => `<button class="chip ${state.resourceFilter === id ? "is-active" : ""}" type="button" data-filter="${id}">${label}</button>`)
    .join("");
  document.querySelectorAll("#resourceChips button").forEach((button) => {
    button.addEventListener("click", () => {
      state.resourceFilter = button.dataset.filter;
      renderResourceChips();
      renderResources();
    });
  });
}

function renderResources() {
  const query = state.query.trim().toLowerCase();
  const manifestResources = (window.DOCS_MANIFEST || []).map((item) => [
    item.title,
    `${item.kind} file from the workspace`,
    item.kind,
    item.path,
    item.url,
  ]);
  const githubResources = Object.entries(monthGithubLinks).flatMap(([monthId, links]) =>
    links.map((item) => [
      `Month ${monthId}: ${item.label}`,
      item.desc,
      "github",
      item.url,
      item.url,
    ])
  );
  const allResources = [
    ...resources.map(([title, note, tag, path]) => [title, note, tag, path, link(path)]),
    ...manifestResources,
    ...githubResources,
  ];
  const seen = new Set();
  const filtered = allResources.filter(([title, note, tag, path]) => {
    const tagMatch = state.resourceFilter === "all" || state.resourceFilter === tag;
    const queryMatch = !query || `${title} ${note} ${path}`.toLowerCase().includes(query);
    const unique = !seen.has(path);
    seen.add(path);
    return unique && tagMatch && queryMatch;
  });

  document.getElementById("resourceList").innerHTML = filtered
    .map(([title, note, tag, path, precomputedUrl]) => {
      // Use pre-computed URL: github resources already have a full https:// URL stored
      // as the 5th element; workspace resources have their docs/ path pre-computed.
      // Falling back to link(path) would wrongly produce "docs/https://..." for github entries.
      const localUrl = precomputedUrl || link(path);
      return `
      <article class="resource-item">
        <div>
          <span class="pill">${tag}</span>
          <h3>${title}</h3>
          <p>${note}</p>
          <div class="resource-path">${path}</div>
        </div>
        <div class="source-link-actions">
          <a class="file-link" href="${localUrl}" target="_blank" rel="noreferrer">Open</a>
        </div>
      </article>
    `}).join("") || `<p>No resources match your search.</p>`;
}

function bindSearch() {
  document.getElementById("resourceSearch").addEventListener("input", (event) => {
    state.query = event.target.value;
    renderResources();
  });
}

function bindTheme() {
  const saved = localStorage.getItem("siteTheme");
  if (saved) document.documentElement.dataset.theme = saved;
  document.getElementById("themeToggle").addEventListener("click", () => {
    const current = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = current;
    localStorage.setItem("siteTheme", current);
  });
}

function bindFastTrackToggle() {
  // Main 12-month roadmap toggle
  const mainToggle = document.getElementById("ftToggleMain");
  const rail = document.getElementById("monthRail");
  if (mainToggle && rail) {
    mainToggle.addEventListener("click", () => {
      const active = rail.classList.toggle("ft-active");
      mainToggle.classList.toggle("is-active", active);
      mainToggle.setAttribute("aria-pressed", active);
      mainToggle.textContent = active
        ? "✅ Showing Priority only — click to show all"
        : "🎯 Show AI Agents Priority only";
    });
  }
  // Extended roadmap toggle is bound inside renderExtendedRoadmap()
}

function bindNavMenu() {
  const btn = document.getElementById("navMenuBtn");
  const panel = document.getElementById("navPanel");
  const overlay = document.getElementById("navOverlay");
  if (!btn || !panel || !overlay) return;

  function openMenu() {
    panel.classList.add("is-open");
    overlay.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    panel.classList.remove("is-open");
    overlay.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
  }

  function toggleMenu() {
    if (panel.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  btn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);

  // Close menu when a nav link is clicked
  panel.querySelectorAll(".nav-item").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function init() {
  renderSuperpowers();
  renderMissionControl();
  renderLearningLibrary();
  renderExtendedRoadmap();
  renderCommunityPath();
  renderReference();
  renderMonths();
  renderMonthDetail();
  updateCompletedCount();
  renderFolders();
  renderProjectTabs();
  renderProjects();
  renderPythonLessonList();
  renderPythonLesson();
  renderSkillTrackTabs();
  renderSkillLessonList();
  renderSkillLesson();
  renderLabList();
  renderLabWorkspace();
  updateLabPassedCount();
  updatePythonLessonCount();
  updateSkillLessonCount();
  renderResourceChips();
  renderResources();
  renderReality2026();
  renderCareerHub();
  bindSearch();
  bindTheme();
  bindNavMenu();
  bindFastTrackToggle();
  bindMissionControl();
  bindReference();
  bindPythonLessonLab();
  bindSkillLessonLab();
  bindLabEditor();
  updateFocusStrip();
}


// ─── 2026 Job Market Data ────────────────────────────────────────────────────

const reality2026 = [
  {
    icon: "⚠️",
    type: "warning",
    title: "What is actually happening",
    points: [
      "Repetitive, predictable, entry-level tasks are being automated — not entire jobs, but the routine parts.",
      "Roles most exposed: junior frontend/backend devs doing only basic tasks, data entry, basic content writing, document review, screening-only recruiters.",
      "The pattern: if your job can be described as 'follow these instructions every day', AI can do a large portion of it.",
      "This is not happening overnight. But the pressure is real and growing in 2025–2026.",
    ],
  },
  {
    icon: "📈",
    type: "opportunity",
    title: "The skills that will matter more",
    points: [
      "AI Engineering — building with LLMs, RAG, agents, and evaluation frameworks.",
      "Automation — connecting systems, removing manual steps, building reliable pipelines.",
      "System Design — understanding how parts fit together, not just writing individual functions.",
      "Product Thinking — knowing who uses the thing you build and what value it creates.",
      "Business Awareness — framing technical work in cost, risk, time, and revenue terms.",
      "Multi-skill profile — combining data + engineering + AI + business in one person.",
    ],
  },
  {
    icon: "🎯",
    type: "insight",
    title: "The real insight",
    points: [
      "Being junior used to mean learning one tool and doing simple tasks. That is no longer enough.",
      "Now, even junior people need to use AI to learn faster, review AI-generated output critically, improve it, and create real value.",
      "AI can write code, but it still needs people who define the problem, design the solution, evaluate the output, and connect tools to real business decisions.",
      "The future is harder for passive, single-skill workers — and much more promising for multi-skilled, AI-native, problem-oriented people.",
    ],
  },
  {
    icon: "🚀",
    type: "action",
    title: "How this internship positions you",
    points: [
      "Month 1–4: You build the boring fundamentals that AI tools actually need humans to understand — SQL, statistics, A/B testing, ML evaluation.",
      "Month 5–8: You build full-stack production systems — not demos, real deployed apps with background jobs, CI/CD, and monitoring.",
      "Month 9–12: You build AI agents, RAG systems, and end-to-end industrial AI — the exact emerging roles hiring in 2025–2026.",
      "Throughout: every project is framed by business value. You will never just build code. You will always answer: what problem does this solve and what does it cost without it?",
    ],
  },
];

const emergingRoles2026 = [
  {
    title: "AI Engineer",
    demand: 5,
    badge: "Most in demand 2025–2026",
    description: "Builds AI-powered applications using LLM APIs, RAG pipelines, agents, and evaluation frameworks.",
    skills: ["LangChain / LangGraph", "RAG pipeline", "prompt engineering", "LLM API", "agent evaluation", "vector databases"],
    roadmapPath: "Months 10–12 → Phase 9",
    salary: "$95k–$160k (US)",
    howToPosition: "Build a RAG system + AI agent in Months 11–12, deploy them publicly, and write clearly about what they do and how you measured quality.",
  },
  {
    title: "Automation Engineer",
    demand: 5,
    badge: "Growing fast",
    description: "Designs and builds automated workflows that replace repetitive manual processes. Uses Python, APIs, AI, and workflow tools to connect systems.",
    skills: ["Python automation", "API integration", "Celery / Airflow", "LLM for structured extraction", "CI/CD"],
    roadmapPath: "Months 4–6 — Celery, CI/CD, background tasks",
    salary: "$85k–$140k",
    howToPosition: "Build an end-to-end automation that replaces a real manual process. Show the before/after: time saved, error rate reduced, human steps removed.",
  },
  {
    title: "AI Workflow Designer",
    demand: 4,
    badge: "New role — rising",
    description: "Maps business processes, identifies automation opportunities, and designs AI-powered solutions. Combines business analysis with technical implementation.",
    skills: ["Process mapping", "LLM integration", "business analysis", "prompt engineering", "stakeholder comms"],
    roadmapPath: "Months 9–12 — capstone + agent system + IE background",
    salary: "$80k–$130k",
    howToPosition: "Your IE background is a superpower here. Document a real industrial process, build a prototype, and quantify the value in hours saved or errors prevented.",
  },
  {
    title: "Data + AI Engineer",
    demand: 5,
    badge: "Most complete skillset",
    description: "Combines data engineering (pipelines, SQL, cloud) with AI (ML models, LLMs, embeddings) to build production-grade data products.",
    skills: ["SQL + Python", "dbt or Spark", "MLflow", "LLM APIs", "cloud (AWS/GCP)", "vector databases"],
    roadmapPath: "Months 1–4 (data foundation) + Months 10–12 (AI layer) = full stack",
    salary: "$100k–$165k",
    howToPosition: "Show a project that has a real data pipeline AND an AI reasoning layer on top of it. That combination is rare and very in demand.",
  },
  {
    title: "AI Product Engineer",
    demand: 4,
    badge: "High-leverage role",
    description: "Builds AI products from idea to deployed MVP — combines engineering with product thinking, user understanding, and iteration.",
    skills: ["Python / FastAPI / Django", "LLM API", "product thinking", "user stories", "metrics", "deployment"],
    roadmapPath: "Months 5–6 (full-stack) + Months 10–12 (AI) = complete AI product builder",
    salary: "$95k–$155k",
    howToPosition: "Build a small AI product that solves a real problem. Write a 1-page product brief: the user, the problem, the solution, and how you measure success.",
  },
  {
    title: "MLOps / AI Platform Engineer",
    demand: 4,
    badge: "Infrastructure for AI",
    description: "Builds and maintains the infrastructure that ML models and AI systems run on. CI/CD, model registries, monitoring, and deployment automation.",
    skills: ["Docker + Kubernetes", "MLflow", "CI/CD (GitHub Actions)", "Evidently AI", "cloud platforms"],
    roadmapPath: "Months 3–4 (Docker, CI/CD) + Month 4 (cloud) + Month 12 (agent monitoring)",
    salary: "$100k–$160k",
    howToPosition: "Show your full CI/CD + Docker + monitoring stack running together. A working deployment pipeline with monitoring beats any certificate.",
  },
];

function renderReality2026() {
  const grid = document.getElementById("reality2026Grid");
  if (!grid) return;
  grid.innerHTML = reality2026.map(card => `
<div class="r26-card r26-${card.type}">
  <div class="r26-card-header">
    <span class="r26-icon">${card.icon}</span>
    <h3>${card.title}</h3>
  </div>
  <ul class="r26-points">
    ${card.points.map(p => `<li>${p}</li>`).join("")}
  </ul>
</div>`).join("");
}

// ─── Career Hub Data ─────────────────────────────────────────────────────────

const interviewQuestions = {
  behavioral: [
    { id:"b1", q:"Tell me about yourself.", tip:"30-second summary: background → master's → self-internship → what you built → why this role.", answer:"I have a background in industrial engineering and recently completed a master's in data science. I've been running a structured 12-month self-internship building ML pipelines, a full-stack dashboard, and an AI agent. I'm looking for an internship where I can apply those skills to real data problems." },
    { id:"b2", q:"Tell me about a project where you solved a hard problem.", tip:"STAR: Situation → Task → Action → Result. Use a specific project with real numbers.", answer:"In my predictive maintenance project I needed to detect anomalies in temperature sensor data with <5% false positives. I built an Isolation Forest model, tuned it with cross-validation, and deployed it as a FastAPI endpoint. False positive rate dropped to 2.8%." },
    { id:"b3", q:"Describe a time you failed and what you learned.", tip:"Be honest. Focus 70% on what you learned and changed afterward.", answer:"I underestimated how long Docker setup would take in Month 3 — spent 2 weeks debugging instead of 1. I learned to always containerize from day one. I now start every project with a working Dockerfile before writing application code." },
    { id:"b4", q:"Why do you want to work here specifically?", tip:"Research the company. Mention one specific project, blog post, or product and connect it to something you built.", answer:"Customize per company. Find one specific initiative and connect it to a project in your portfolio." },
    { id:"b5", q:"Where do you see yourself in 3 years?", tip:"Be honest about the learning goal. Companies hire interns who want to grow.", answer:"I want to be an ML Engineer or AI Systems Engineer working on production systems. This internship is my way of proving I can contribute immediately in a team environment." },
    { id:"b6", q:"How do you handle tight deadlines with incomplete data?", tip:"Mention: scoping down, communicating early, delivering a simpler version on time.", answer:"I scope down to what's achievable, communicate the tradeoff to stakeholders early, and deliver a working baseline on time. I'd rather ship a working logistic regression on time than a broken neural net late." },
  ],
  sql: [
    { id:"s1", q:"Find the top 3 customers by total revenue in the last 30 days.", tip:"Use SUM(), GROUP BY, ORDER BY DESC, LIMIT, and a WHERE clause on the date column.", answer:"SELECT customer_id, SUM(revenue) AS total_revenue\nFROM orders\nWHERE order_date >= CURRENT_DATE - INTERVAL '30 days'\nGROUP BY customer_id\nORDER BY total_revenue DESC\nLIMIT 3;" },
    { id:"s2", q:"Calculate a 7-day rolling average of daily sales.", tip:"Use AVG() OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW).", answer:"SELECT date,\n  SUM(sales) AS daily_sales,\n  AVG(SUM(sales)) OVER (\n    ORDER BY date\n    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n  ) AS rolling_7d_avg\nFROM sales\nGROUP BY date\nORDER BY date;" },
    { id:"s3", q:"Find users who placed their second order within 7 days of their first.", tip:"Use ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date), then filter on date difference.", answer:"WITH ranked AS (\n  SELECT user_id, order_date,\n    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date) AS rn\n  FROM orders\n)\nSELECT r1.user_id\nFROM ranked r1\nJOIN ranked r2 ON r1.user_id = r2.user_id AND r2.rn = 2\nWHERE r1.rn = 1 AND r2.order_date - r1.order_date <= 7;" },
    { id:"s4", q:"Show month-over-month growth rate of signups.", tip:"Use LAG() to get previous month's count, then (current - previous) / previous * 100.", answer:"WITH monthly AS (\n  SELECT DATE_TRUNC('month', signup_date) AS month, COUNT(*) AS signups\n  FROM users GROUP BY 1\n)\nSELECT month, signups,\n  LAG(signups) OVER (ORDER BY month) AS prev_month,\n  ROUND(100.0 * (signups - LAG(signups) OVER (ORDER BY month))\n    / NULLIF(LAG(signups) OVER (ORDER BY month), 0), 1) AS pct_growth\nFROM monthly;" },
    { id:"s5", q:"Find products that were never purchased.", tip:"LEFT JOIN orders ON product_id, then WHERE orders.product_id IS NULL.", answer:"SELECT p.product_id, p.name\nFROM products p\nLEFT JOIN orders o ON p.product_id = o.product_id\nWHERE o.product_id IS NULL;" },
    { id:"s6", q:"Detect and remove duplicate rows, keeping only one.", tip:"Use ROW_NUMBER() OVER (PARTITION BY all_key_columns ORDER BY id), then DELETE WHERE rn > 1.", answer:"WITH dupes AS (\n  SELECT id,\n    ROW_NUMBER() OVER (PARTITION BY email, name ORDER BY id) AS rn\n  FROM users\n)\nDELETE FROM users WHERE id IN (SELECT id FROM dupes WHERE rn > 1);" },
  ],
  stats: [
    { id:"st1", q:"What is a p-value and how do you interpret it?", tip:"Never say 'probability the null hypothesis is true'. Say: probability of data this extreme IF the null is true.", answer:"A p-value is the probability of observing a result as extreme as your data (or more) assuming the null hypothesis is true. If p < 0.05 we reject the null at 5% significance. It does NOT tell you the probability that your hypothesis is correct." },
    { id:"st2", q:"How would you design an A/B test for a new feature?", tip:"Cover: randomization unit, metric choice, sample size calculation, duration, and analysis method.", answer:"1) Define the metric (e.g., conversion rate). 2) Choose randomization unit (user-level). 3) Run power analysis: 80% power, α=0.05, MDE=5%. 4) Run for full weeks to avoid weekday bias. 5) Analyze with two-proportion z-test. 6) Check for novelty effects and segment results." },
    { id:"st3", q:"What is the difference between Type I and Type II error?", tip:"Type I = false positive. Type II = false negative. There is a tradeoff between them.", answer:"Type I error (α): rejecting the null when it is true — a false positive. Type II error (β): failing to reject the null when it is false — a false negative. Statistical power = 1 - β. Lowering α reduces false positives but increases false negatives." },
    { id:"st4", q:"Explain the Central Limit Theorem and why it matters.", tip:"CLT lets you use normal-based tests even when the underlying data is not normal.", answer:"The CLT states that the sampling distribution of the mean approaches normal as sample size grows, regardless of the original distribution. This is why t-tests work even on non-normal data — as long as n ≥ 30." },
    { id:"st5", q:"What is the difference between correlation and causation?", tip:"Always mention confounders. Ice cream sales and drowning — both caused by summer heat.", answer:"Correlation measures linear relationship. Causation means one variable directly causes another. Ice cream sales and drowning deaths are correlated — both are caused by summer. To establish causation, use randomized experiments (A/B tests) or causal inference methods (DoWhy, propensity scoring)." },
    { id:"st6", q:"When would you use the median instead of the mean?", tip:"Outliers pull the mean but not the median. Income data is the canonical example.", answer:"Use the median when data is skewed or has outliers. Median household income is more representative than mean income because a few billionaires don't distort it." },
  ],
  ml: [
    { id:"ml1", q:"Explain the bias-variance tradeoff.", tip:"High bias = underfitting. High variance = overfitting. Goal is the sweet spot in between.", answer:"Bias is error from wrong model assumptions (too simple). Variance is sensitivity to training data noise (too complex). To reduce bias: add complexity or features. To reduce variance: regularize, add data, use ensembles. Cross-validation helps find the balance." },
    { id:"ml2", q:"How do you handle imbalanced classes?", tip:"Cover: class weights, SMOTE, threshold tuning, and why accuracy is misleading here.", answer:"1) class_weight='balanced' in sklearn. 2) Oversample minority with SMOTE. 3) Undersample majority. 4) Lower decision threshold. 5) Use precision-recall AUC, not accuracy — accuracy is misleading on imbalanced data." },
    { id:"ml3", q:"When would you choose logistic regression over a random forest?", tip:"Start simple. Logistic regression is interpretable and often surprisingly competitive.", answer:"Start with logistic regression: fast, interpretable, works well when the relationship is roughly linear. Use random forest when you expect nonlinear interactions and interpretability is less critical. Always compare both — logistic regression often beats complex models on small clean datasets." },
    { id:"ml4", q:"What is cross-validation and why do you use it?", tip:"Prevents overfitting to a single train/test split. k-fold = k different test sets → more reliable estimate.", answer:"k-fold CV splits data into k folds, trains on k-1, tests on the held-out fold, repeats k times. Gives a more reliable generalization estimate than a single split — especially important when your dataset is small." },
    { id:"ml5", q:"Explain precision and recall. When do you optimize for each?", tip:"Precision = avoid false alarms. Recall = catch everything. The right choice depends on what failure costs more.", answer:"Precision = TP / (TP + FP). Recall = TP / (TP + FN). Optimize precision when false positives are costly (spam filter). Optimize recall when false negatives are costly (cancer screening)." },
    { id:"ml6", q:"How do you prevent overfitting?", tip:"Four main approaches: more data, regularization, simpler model, early stopping.", answer:"1) More training data. 2) Regularization (L1, L2, dropout). 3) Simpler model. 4) Early stopping. 5) Cross-validation to detect it. 6) Feature selection. 7) Ensembles like bagging reduce variance." },
  ],
  coding: [
    { id:"c1", q:"What coding patterns are most tested for DS/ML internships?", tip:"Focus on Medium LeetCode. DS interviews rarely test advanced algorithms.", answer:"Most DS internship coding rounds test: 1) Array/string manipulation (sliding window, two pointers). 2) Hash maps for counting/grouping. 3) Sorting + searching. 4) SQL (1-2 questions). 5) Stats in code. Aim for 50 Medium problems total, not 500." },
    { id:"c2", q:"How do you approach a new coding problem in an interview?", tip:"Talk out loud. Clarify before coding. Brute force first, then optimize.", answer:"1) Restate in your own words. 2) Ask 2-3 clarifying questions (edge cases, input size). 3) State brute force + complexity. 4) Think aloud about optimization. 5) Code solution. 6) Test with examples including edge cases. 7) State time and space complexity." },
    { id:"c3", q:"Write a function to find duplicate values in a list.", tip:"Use Counter for O(n) solution. Avoid nested loops (O(n²)).", answer:"from collections import Counter\n\ndef find_duplicates(lst):\n    counts = Counter(lst)\n    return [item for item, count in counts.items() if count > 1]\n\n# O(n) time, O(n) space" },
    { id:"c4", q:"How would you process a 10GB CSV that doesn't fit in memory?", tip:"Chunking with pandas, Dask, or Spark. Never load everything at once.", answer:"# Option 1: pandas chunking\nfor chunk in pd.read_csv('large.csv', chunksize=100_000):\n    process(chunk)\n\n# Option 2: Dask (lazy, parallel)\nimport dask.dataframe as dd\ndf = dd.read_csv('large.csv')\nresult = df.groupby('col').sum().compute()\n\n# Option 3: PySpark for truly massive files" },
    { id:"c5", q:"Return the k most frequent elements in a list.", tip:"Counter + most_common(k) is O(n log k). Clean and idiomatic Python.", answer:"from collections import Counter\n\ndef top_k_frequent(nums, k):\n    return [item for item, _ in Counter(nums).most_common(k)]\n\n# Counter.most_common(k) uses a heap: O(n log k)" },
  ],
};

const applyMilestones = [
  {
    month: 2,
    roles: ["Data Analyst", "Research Analyst", "Business Intelligence Analyst"],
    companies: "Startups, consulting firms, retail analytics, healthcare analytics",
    skills: ["Python with Pandas, NumPy, Matplotlib, Seaborn", "SQL — GROUP BY, JOINs, window functions", "Hypothesis testing & A/B testing basics", "Git & GitHub with public repos and READMEs", "Documented EDA project with visualizations"],
    resume: ["Python proficiency (Pandas/NumPy/Matplotlib)", "GitHub: EDA project with clear README", "SQL skills — list specific functions used", "A/B testing design and hypothesis testing", "Frame as: 'Self-directed data science project'"],
    red_flags: ["No public GitHub repos with real projects", "Resume lists tools without projects to prove them", "Can't explain what a p-value means or what SQL JOIN does"],
  },
  {
    month: 4,
    roles: ["Junior Data Scientist", "ML Intern", "AI/ML Research Intern"],
    companies: "Tech companies, ML teams at mid-size companies, university research labs",
    skills: ["scikit-learn pipeline: preprocessing → model → evaluation", "Model evaluation: precision, recall, AUC, confusion matrix", "FastAPI endpoint serving a trained model", "Docker (containerized ML environment)", "Feature engineering and selection", "2+ ML projects with documented metrics"],
    resume: ["ML project with real metrics: 'Achieved 87% AUC on customer churn'", "FastAPI endpoint serving a trained model", "Docker container for reproducible environment", "2 portfolio repos with clean READMEs", "Business problem framing — not just tool names"],
    red_flags: ["Only reporting accuracy with no other metrics", "Model trained but never deployed even locally", "Can't explain bias-variance tradeoff"],
  },
  {
    month: 6,
    roles: ["ML Engineer Intern", "Data Engineer Intern", "Backend Python Intern"],
    companies: "Tech companies with ML products, MLOps teams, data platform teams",
    skills: ["Django + PostgreSQL full-stack web app", "Celery background task pipeline", "CI/CD basics (GitHub Actions)", "MLflow or equivalent experiment tracking", "Production-style code: tests, logging, error handling", "System design awareness for ML pipelines"],
    resume: ["Django app with auth, database models, and API endpoints", "Background job pipeline (Celery + Redis)", "3+ portfolio projects — demonstrable or deployed", "Mention production concerns: logging, error handling, tests", "Link to live demo or recorded demo video"],
    red_flags: ["Only Jupyter notebooks, no deployed or served apps", "No tests at all — can't describe how you'd test an endpoint", "Never thought about what happens when the model fails in production"],
  },
  {
    month: 9,
    roles: ["Operations Data Scientist", "AI Systems Engineer", "Industrial AI Intern"],
    companies: "Manufacturing, logistics, supply chain, aerospace, energy companies",
    skills: ["End-to-end capstone project with quantified results", "IoT data pipeline from sensor to dashboard", "Optimization with OR-Tools or PuLP", "Business value narrative: cost saved, risk reduced", "Stakeholder-ready visualizations", "Full technical documentation"],
    resume: ["Capstone: business problem → approach → quantified result", "IoT pipeline from sensor to storage to dashboard", "Optimization model: what you optimized and the result", "GitHub repo with full documentation", "Frame your IE background as competitive differentiator"],
    red_flags: ["Can't explain what business problem your capstone solves", "No quantified results — 'I built a model' is not enough", "Portfolio looks like coursework, not independent work"],
  },
  {
    month: 12,
    roles: ["LLM Engineer Intern", "MLOps Engineer", "AI Systems Engineer", "GenAI Intern"],
    companies: "AI-first companies, LLM product teams, enterprise AI teams",
    skills: ["RAG pipeline: chunking, embedding, retrieval, reranking", "LLM API integration (OpenAI, Anthropic, or open-weights)", "AI agent with tool use and memory", "Prompt evaluation and quality measurement", "Vector database (Chroma, Pinecone, or Weaviate)", "Agent safety and guardrails basics"],
    resume: ["RAG system: describe retrieval quality vs. baseline", "AI agent: tools used, what it automates, evaluation score", "Prompt evaluation: how you measured output quality", "Link to working demo with clear setup instructions", "Show you understand LLM limitations: hallucination, context limits"],
    red_flags: ["Used the ChatGPT API but can't explain how RAG works", "Agent has no memory, no error handling, no evaluation", "Can't explain when NOT to use an LLM"],
  },
];

const jobSearchTimeline = [
  {
    season: "Summer Internships (June–August)",
    icon: "☀️",
    urgency: "high",
    apply: "September – November",
    deadline: "Most positions close by December. Big tech closes October–November.",
    platforms: ["LinkedIn", "Handshake (university job board)", "Company career pages directly", "Indeed", "Glassdoor"],
    tips: ["Apply to 50–100 roles — not 5, not 500.", "Prioritize company career pages over job boards — apply directly.", "Personalize the first 2 sentences of your cover letter per company.", "Follow up by email after 2 weeks if no response.", "Message the recruiter on LinkedIn after applying."],
  },
  {
    season: "Fall Internships (September–December)",
    icon: "🍂",
    urgency: "medium",
    apply: "June – August",
    deadline: "Rolling — some companies hire fall interns year-round.",
    platforms: ["LinkedIn", "AngelList / Wellfound (startups)", "Handshake", "Company career pages"],
    tips: ["Less competitive than summer — good for your first internship.", "Startups hire fall interns more readily than big tech.", "State your availability window clearly: e.g. Sept 1 – Dec 15."],
  },
  {
    season: "Spring Internships (January–April)",
    icon: "🌱",
    urgency: "low",
    apply: "October – December",
    deadline: "Rolling. Less common but growing.",
    platforms: ["LinkedIn", "Handshake", "Company career pages"],
    tips: ["Least common season — focus here if summer applications were unsuccessful.", "Research labs and startups are the best bet for spring terms."],
  },
  {
    season: "Year-Round / Rolling",
    icon: "🔄",
    urgency: "ongoing",
    apply: "Always open",
    deadline: "No deadline — first come, first hired.",
    platforms: ["Y Combinator job board (ycombinator.com/jobs)", "AngelList / Wellfound", "Remote-first job boards", "LinkedIn — filter: Internship + Remote"],
    tips: ["Startups with <100 employees often hire rolling year-round.", "Remote internships open your market globally — don't limit to your city.", "YC-backed startups: fast-moving, real responsibilities, great resume signal."],
  },
];

const resumeGuide = [
  { month:1, add:["Python proficiency (Pandas, NumPy, Matplotlib, Seaborn)", "Git / GitHub — daily commit habit established", "Self-directed EDA project on a real dataset"], avoid:"Don't list 'Python' without a GitHub project to prove it." },
  { month:2, add:["Statistical analysis and hypothesis testing", "A/B test design (power analysis, significance testing)", "SQL: GROUP BY, JOINs, window functions", "EDA project with documented findings and charts"], avoid:"Don't call it 'academic work' — frame as a self-initiated data project." },
  { month:3, add:["scikit-learn pipeline: preprocessing → model → evaluation", "Model evaluation metrics: AUC, F1, confusion matrix, recall", "Predictive modeling project with quantified outcome", "Docker containerized development environment"], avoid:"Don't report accuracy alone — always add precision, recall, and AUC." },
  { month:4, add:["FastAPI REST endpoint serving a trained model", "MLflow experiment tracking", "2nd ML project in a different domain", "Bullet: 'Built FastAPI endpoint serving predictions at Xms P99 latency'"], avoid:"Don't say 'used FastAPI' — say what you served and how it performed." },
  { month:5, add:["Django web application with PostgreSQL database", "Authentication system", "REST API with documented endpoints", "Production patterns: logging, error handling, input validation"], avoid:"Must solve a real problem — even a simple one. 'Tutorial project' is a red flag." },
  { month:6, add:["Celery + Redis background job pipeline", "CI/CD pipeline (GitHub Actions)", "Full-stack project with live demo or recorded video", "3+ portfolio projects complete — list all with links"], avoid:"Don't hide your IE background. Frame it: 'Optimized [process] using ML, reducing [metric] by X%'." },
  { month:7, add:["IoT data pipeline: sensor → API → storage → dashboard", "Time-series anomaly detection on live sensor data", "Hardware + software integration (ESP32 / DHT11)"], avoid:"Keep hardware boring. The value is the data pipeline, not the sensor count." },
  { month:8, add:["Real-time streaming (Redis pub/sub or MQTT)", "Monitoring and alerting system", "Advanced dashboard with live data (Grafana or custom)", "Performance metrics for your pipeline"], avoid:"Don't list 'Django' in multiple bullets — consolidate into one strong statement." },
  { month:9, add:["Capstone: cold-chain or equivalent end-to-end system", "OR-Tools/PuLP optimization with quantified result (e.g. '18% cost reduction')", "Business value narrative: cost saved, risk reduced, efficiency gained", "Full documentation, demo video, and public GitHub repo"], avoid:"The capstone is your strongest bullet. Lead with business outcome, not tech stack." },
  { month:10, add:["LLM API integration (OpenAI, Anthropic, or Hugging Face)", "NLP pipeline (tokenization, embeddings, classification)", "Prompt engineering techniques and results"], avoid:"Don't just say 'used ChatGPT API' — explain what you built on top of it." },
  { month:11, add:["RAG pipeline: chunking, embedding, retrieval, reranking", "Vector database (Chroma, Pinecone, or Weaviate)", "Retrieval quality measurement: recall@k, MRR", "Document Q&A system with evaluation results"], avoid:"Describe the quality improvement from RAG vs. no RAG — recruiters want numbers." },
  { month:12, add:["AI agent with tool use, memory, and error handling", "Agent evaluation suite: 20+ test cases with pass rate", "Prompt safety / guardrails implementation", "7 portfolio projects complete — ready for senior internship or junior roles"], avoid:"'I built an AI agent' is not enough. Describe what it automates and how you measured quality." },
];

const linkedinChecklist = [
  { section:"Headline", text:"Don't write just 'Student'. Write: 'Data Science MS | Building ML pipelines, AI agents, and full-stack dashboards | Seeking 2026 internship'" },
  { section:"About / Summary", text:"3–4 sentences: background → what you're building → what you're looking for. Include keywords: Python, scikit-learn, SQL, FastAPI, Docker, LLM." },
  { section:"Experience — Self-Internship", text:"Add your self-internship as a position: Title = 'Data Science Self-Internship', Company = 'Self-directed'. Dates = start month to present. Add 3–5 bullet points with outcomes." },
  { section:"Education", text:"Add your master's degree with GPA (if ≥3.5), relevant courses, and thesis/capstone if applicable." },
  { section:"Projects", text:"Add your top 3 portfolio projects with links to GitHub. Use action verbs: Built, Deployed, Reduced, Automated, Improved." },
  { section:"Skills (add 25)", text:"Prioritize: Python, SQL, Machine Learning, Docker, FastAPI, pandas, NumPy, scikit-learn, PyTorch/TensorFlow, LangChain, LLMs, Git, Linux, Django, REST APIs." },
  { section:"Open to Work", text:"Turn on 'Open to Work' for Internship roles. Add job titles: Data Scientist, ML Engineer, Data Analyst, AI Engineer, Data Science Intern." },
  { section:"Connections — weekly habit", text:"Connect with 5 new people per week: professors, alumni, data scientists at target companies, speakers from podcasts or conference talks you've watched." },
];

const networkingGuide = [
  {
    title:"Cold message template (LinkedIn DM)",
    content:`Hi [Name], I'm a data science master's student building AI and ML systems through a structured self-internship. I've been following [Company]'s work on [specific project/blog post] and would love to ask 2–3 questions about your experience on the team in a 15-min chat — no pressure if you're busy. Thanks, [Your Name]`,
    tip:"Keep it under 80 words. Mention ONE specific thing about them or their company. Generic messages get ignored.",
  },
  {
    title:"After applying — recruiter follow-up email",
    content:`Subject: Following up — [Role] application\n\nHi [Recruiter Name], I applied for the [Role] position on [Date]. I'm very interested because [1 specific reason]. I have experience in [2 skills from the JD] and my portfolio: [GitHub link]. Thank you for your time.`,
    tip:"Send 5–7 business days after applying if no response. Send once — don't chase.",
  },
  {
    title:"Informational interview request",
    content:`Hi [Name], I admire your work at [Company]. I'm a master's student specializing in [area] and exploring roles at AI/ML companies. Would you be open to a 15-minute call? I have specific questions ready and won't take more of your time than that.`,
    tip:"30–40% response rate if personalized. Follow up once after a week, then let it go.",
  },
  {
    title:"Career fair 30-second pitch",
    content:`Hi, I'm [Name], an industrial engineering and data science grad student. I've been building ML pipelines, AI agents, and a full-stack industrial dashboard for the past [X] months. I'm looking for a [specific role] internship. Do you have openings on the [specific] team?`,
    tip:"Bring 10 physical resumes. Have your GitHub open on your phone ready to show projects.",
  },
  {
    title:"How many applications to send",
    content:`Week 1–2: Research 50 target companies (big tech + mid-size + startups).\nWeek 3–4: Apply to 25 roles.\nMonth 2: Apply to 25 more. Track all in your Application Tracker.\n\nExpected rate: 5–10% callback. 50 applications → 3–5 phone screens → 1–2 offers.\nAfter 100 applications, stop applying and focus entirely on interview prep.`,
    tip:"Quality > quantity up to ~100 applications. Customize the first paragraph of each cover letter.",
  },
];

// ─── Career Hub Render ────────────────────────────────────────────────────────

let careerActiveTab = localStorage.getItem("careerActiveTab") || "applications";

function renderCareerHub() {
  const tabsEl = document.getElementById("careerHubTabs");
  const contentEl = document.getElementById("careerHubContent");
  if (!tabsEl || !contentEl) return;

  const tabs = [
    { id:"applications", label:"📋 Applications" },
    { id:"interview",    label:"🎤 Interview Prep" },
    { id:"apply-ready",  label:"✅ Ready to Apply?" },
    { id:"timeline",     label:"📅 When to Apply" },
    { id:"resume",       label:"📄 Resume Guide" },
    { id:"linkedin",     label:"🔗 LinkedIn & Network" },
    { id:"emerging",     label:"🤖 Emerging Roles 2026" },
  ];

  tabsEl.innerHTML = tabs.map(t =>
    `<button class="career-tab ${t.id === careerActiveTab ? "is-active" : ""}" data-tab="${t.id}">${t.label}</button>`
  ).join("");

  renderCareerTabContent(contentEl);

  tabsEl.querySelectorAll(".career-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      careerActiveTab = btn.dataset.tab;
      localStorage.setItem("careerActiveTab", careerActiveTab);
      tabsEl.querySelectorAll(".career-tab").forEach(b => b.classList.toggle("is-active", b.dataset.tab === careerActiveTab));
      renderCareerTabContent(contentEl);
    });
  });
}

function renderCareerTabContent(contentEl) {
  if (!contentEl) return;
  switch (careerActiveTab) {
    case "applications": contentEl.innerHTML = renderApplicationTrackerHTML(); bindApplicationTracker(contentEl); break;
    case "interview":    contentEl.innerHTML = renderInterviewPrepHTML();     bindInterviewPrep(contentEl);     break;
    case "apply-ready":  contentEl.innerHTML = renderApplyReadyHTML();        bindApplyReady(contentEl);        break;
    case "timeline":     contentEl.innerHTML = renderJobTimelineHTML();       break;
    case "resume":       contentEl.innerHTML = renderResumeGuideHTML();       break;
    case "linkedin":     contentEl.innerHTML = renderLinkedInGuideHTML();     bindApplyReady(contentEl);        break;
    case "emerging":     contentEl.innerHTML = renderEmergingRolesHTML();     break;
  }
}

// ── Application Tracker ───────────────────────────────────────────────────────

function statusClass(s) {
  return { "Saved":"st-saved","Applied":"st-applied","Phone Screen":"st-phone","Technical":"st-tech","Final Round":"st-final","Offer":"st-offer","Rejected":"st-rejected" }[s] || "";
}

function renderApplicationTrackerHTML() {
  const apps = state.applications || [];
  const total = apps.length;
  const applied = apps.filter(a => a.status !== "Saved").length;
  const active  = apps.filter(a => ["Phone Screen","Technical","Final Round"].includes(a.status)).length;
  const offers  = apps.filter(a => a.status === "Offer").length;
  const statusOptions = ["Saved","Applied","Phone Screen","Technical","Final Round","Offer","Rejected"];

  return `
<div class="app-tracker">
  <div class="app-form-card">
    <h3>Add Application</h3>
    <div class="app-form">
      <input id="appCompany"  type="text"  placeholder="Company name" />
      <input id="appRole"     type="text"  placeholder="Role (e.g. Data Science Intern)" />
      <input id="appDate"     type="date"  value="${new Date().toISOString().slice(0,10)}" />
      <select id="appStatus">${statusOptions.map(s=>`<option>${s}</option>`).join("")}</select>
      <input id="appNotes"    type="text"  placeholder="Notes (optional)" style="grid-column:1/-1" />
      <button class="mark-button" id="addAppBtn" style="grid-column:1/-1">+ Add application</button>
    </div>
  </div>
  <div class="app-stats-row">
    <div class="app-stat"><span class="app-stat-num">${total}</span><span>Tracked</span></div>
    <div class="app-stat"><span class="app-stat-num">${applied}</span><span>Applied</span></div>
    <div class="app-stat"><span class="app-stat-num">${active}</span><span>In progress</span></div>
    <div class="app-stat"><span class="app-stat-num ${offers>0?"st-offer":""}">${offers}</span><span>Offers 🎉</span></div>
  </div>
  <div class="app-table-wrap">
    ${apps.length === 0
      ? `<p class="muted-note" style="text-align:center;padding:32px">No applications yet — add your first one above.</p>`
      : `<table class="app-table">
          <thead><tr><th>Company</th><th>Role</th><th>Date</th><th>Status</th><th>Notes</th><th>Update</th><th></th></tr></thead>
          <tbody>
            ${apps.map(app=>`
              <tr>
                <td><strong>${app.company}</strong></td>
                <td>${app.role}</td>
                <td>${app.dateApplied||"—"}</td>
                <td><span class="app-status-pill ${statusClass(app.status)}">${app.status}</span></td>
                <td class="app-notes-cell">${app.notes||"—"}</td>
                <td>
                  <select class="app-status-sel" data-id="${app.id}">
                    ${statusOptions.map(s=>`<option ${s===app.status?"selected":""}>${s}</option>`).join("")}
                  </select>
                </td>
                <td><button class="app-del-btn" data-id="${app.id}" title="Remove">✕</button></td>
              </tr>`).join("")}
          </tbody>
        </table>`
    }
  </div>
</div>`;
}

function bindApplicationTracker(contentEl) {
  const el = contentEl || document.getElementById("careerHubContent");
  el.querySelector("#addAppBtn")?.addEventListener("click", () => {
    const company = el.querySelector("#appCompany").value.trim();
    const role    = el.querySelector("#appRole").value.trim();
    if (!company || !role) { alert("Please enter a company name and role."); return; }
    state.applications = state.applications || [];
    state.applications.unshift({
      id: `app-${Date.now()}`,
      company, role,
      dateApplied: el.querySelector("#appDate").value,
      status:      el.querySelector("#appStatus").value,
      notes:       el.querySelector("#appNotes").value.trim(),
    });
    localStorage.setItem("careerApplications", JSON.stringify(state.applications));
    el.innerHTML = renderApplicationTrackerHTML();
    bindApplicationTracker(el);
  });
  el.querySelectorAll(".app-del-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.applications = state.applications.filter(a => a.id !== btn.dataset.id);
      localStorage.setItem("careerApplications", JSON.stringify(state.applications));
      el.innerHTML = renderApplicationTrackerHTML();
      bindApplicationTracker(el);
    });
  });
  el.querySelectorAll(".app-status-sel").forEach(sel => {
    sel.addEventListener("change", () => {
      const app = state.applications.find(a => a.id === sel.dataset.id);
      if (app) {
        app.status = sel.value;
        localStorage.setItem("careerApplications", JSON.stringify(state.applications));
        el.innerHTML = renderApplicationTrackerHTML();
        bindApplicationTracker(el);
      }
    });
  });
}

// ── Interview Prep ────────────────────────────────────────────────────────────

function renderInterviewPrepHTML() {
  const activeTrack = localStorage.getItem("interviewTrack") || "behavioral";
  const practiced   = state.interviewPracticed || {};
  const tracks = [
    { id:"behavioral", label:"💬 Behavioral" },
    { id:"sql",        label:"🗄️ SQL" },
    { id:"stats",      label:"📊 Stats & A/B" },
    { id:"ml",         label:"🤖 ML Concepts" },
    { id:"coding",     label:"💻 Coding" },
  ];
  const qs = interviewQuestions[activeTrack] || [];
  const done = qs.filter(q => practiced[q.id]).length;

  return `
<div class="interview-prep">
  <div class="interview-tracks" id="interviewTracks">
    ${tracks.map(t=>`<button class="interview-track-btn ${t.id===activeTrack?"is-active":""}" data-track="${t.id}">${t.label}</button>`).join("")}
  </div>
  <div class="interview-progress">Practiced: <strong>${done} / ${qs.length}</strong> in this category</div>
  <div class="interview-questions" id="interviewQuestions">
    ${qs.map(q => {
      const isDone = !!practiced[q.id];
      return `
<details class="interview-q ${isDone?"is-practiced":""}" data-qid="${q.id}">
  <summary>
    <span class="q-num">${isDone?"✅":"○"}</span>
    <span class="q-text">${q.q}</span>
  </summary>
  <div class="q-body">
    <p class="q-tip"><strong>💡 Tip:</strong> ${q.tip}</p>
    <pre class="q-answer">${q.answer}</pre>
    <button class="mark-button practice-btn" data-qid="${q.id}">${isDone?"Unmark":"Mark as practiced ✅"}</button>
  </div>
</details>`;
    }).join("")}
  </div>
</div>`;
}

function bindInterviewPrep(contentEl) {
  const el = contentEl || document.getElementById("careerHubContent");
  el.querySelector("#interviewTracks")?.querySelectorAll(".interview-track-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      localStorage.setItem("interviewTrack", btn.dataset.track);
      el.innerHTML = renderInterviewPrepHTML();
      bindInterviewPrep(el);
    });
  });
  el.querySelectorAll(".practice-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      state.interviewPracticed = state.interviewPracticed || {};
      const id = btn.dataset.qid;
      state.interviewPracticed[id] ? delete state.interviewPracticed[id] : (state.interviewPracticed[id] = true);
      localStorage.setItem("interviewPracticed", JSON.stringify(state.interviewPracticed));
      el.innerHTML = renderInterviewPrepHTML();
      bindInterviewPrep(el);
    });
  });
}

// ── Ready to Apply ────────────────────────────────────────────────────────────

function renderApplyReadyHTML() {
  const checks = state.applyChecks || {};
  return `
<div class="apply-ready">
  <p class="muted-note" style="margin-bottom:20px">Check off skills and resume bullets as you complete them. Progress is saved automatically.</p>
  ${applyMilestones.map(m => {
    const totalItems = m.skills.length + m.resume.length;
    const doneItems  = [...m.skills.map((_,i)=>`m${m.month}-skill-${i}`), ...m.resume.map((_,i)=>`m${m.month}-resume-${i}`)].filter(k=>checks[k]).length;
    const pct = Math.round(100*doneItems/totalItems);
    return `
<details class="apply-milestone" ${m.month <= 3 ? "open" : ""}>
  <summary>
    <div class="milestone-summary-left">
      <span class="milestone-month-badge">After Month ${m.month}</span>
      <span class="milestone-roles-text">${m.roles.join(" · ")}</span>
    </div>
    <div class="milestone-pct">${pct}%</div>
  </summary>
  <div class="milestone-body">
    <div class="milestone-cols">
      <div class="milestone-col">
        <h4>✅ Skills needed</h4>
        <ul class="check-list">
          ${m.skills.map((s,i)=>{const k=`m${m.month}-skill-${i}`;return`<li><label><input type="checkbox" class="apply-check" data-key="${k}" ${checks[k]?"checked":""}> ${s}</label></li>`;}).join("")}
        </ul>
      </div>
      <div class="milestone-col">
        <h4>📄 Resume bullets to add</h4>
        <ul class="check-list">
          ${m.resume.map((r,i)=>{const k=`m${m.month}-resume-${i}`;return`<li><label><input type="checkbox" class="apply-check" data-key="${k}" ${checks[k]?"checked":""}> ${r}</label></li>`;}).join("")}
        </ul>
      </div>
    </div>
    <div class="milestone-footer">
      <div class="milestone-red-flags">
        <h4>🚩 Red flags to avoid</h4>
        <ul>${m.red_flags.map(r=>`<li>${r}</li>`).join("")}</ul>
      </div>
      <div class="milestone-companies"><strong>Target companies:</strong> ${m.companies}</div>
    </div>
  </div>
</details>`; }).join("")}
</div>`;
}

function bindApplyReady(contentEl) {
  const el = contentEl || document.getElementById("careerHubContent");
  el.querySelectorAll(".apply-check").forEach(cb => {
    cb.addEventListener("change", () => {
      state.applyChecks = state.applyChecks || {};
      cb.checked ? (state.applyChecks[cb.dataset.key] = true) : delete state.applyChecks[cb.dataset.key];
      localStorage.setItem("applyChecks", JSON.stringify(state.applyChecks));
    });
  });
}

// ── Job Search Timeline ───────────────────────────────────────────────────────

function renderJobTimelineHTML() {
  return `
<div class="job-timeline">
  ${jobSearchTimeline.map(item=>`
<div class="timeline-card tl-${item.urgency}">
  <div class="timeline-card-header">
    <span class="tl-icon">${item.icon}</span>
    <div>
      <h3>${item.season}</h3>
      <p class="tl-window">📅 Apply window: <strong>${item.apply}</strong> — ${item.deadline}</p>
    </div>
  </div>
  <div class="tl-body">
    <div class="tl-platforms">
      <strong>Where to apply:</strong>
      <div class="tl-tags">${item.platforms.map(p=>`<span class="tl-tag">${p}</span>`).join("")}</div>
    </div>
    <ul class="tl-tips">${item.tips.map(t=>`<li>${t}</li>`).join("")}</ul>
  </div>
</div>`).join("")}
</div>`;
}

// ── Resume Guide ──────────────────────────────────────────────────────────────

function renderResumeGuideHTML() {
  return `
<div class="resume-guide">
  <div class="resume-intro-box">
    <strong>Add one bullet to your resume each month.</strong> Don't wait until Month 12. Use action verbs + metrics. "Built X that achieved Y."
  </div>
  <div class="resume-month-grid">
    ${resumeGuide.map(m=>`
<div class="resume-month-card">
  <div class="resume-month-label">Month ${m.month}</div>
  <ul class="resume-add-list">${m.add.map(a=>`<li>${a}</li>`).join("")}</ul>
  <div class="resume-avoid-box">⚠️ ${m.avoid}</div>
</div>`).join("")}
  </div>
</div>`;
}

// ── Emerging Roles 2026 ───────────────────────────────────────────────────────

function renderEmergingRolesHTML() {
  return `
<div class="emerging-roles">
  <div class="emerging-intro">
    <p><strong>These roles are rising fast in 2025–2026.</strong> Your 12-month roadmap directly builds the skills for every one of them. Pick the ones that match your interests and use them as your job search target titles.</p>
  </div>
  <div class="emerging-grid">
    ${emergingRoles2026.map(role => `
<div class="emerging-card">
  <div class="emerging-card-header">
    <div>
      <h3>${role.title}</h3>
      <span class="emerging-badge">${role.badge}</span>
    </div>
    <div class="emerging-demand" title="Demand level">${"⭐".repeat(role.demand)}</div>
  </div>
  <p class="emerging-desc">${role.description}</p>
  <div class="emerging-skills">
    ${role.skills.map(s => `<span class="emerging-skill-tag">${s}</span>`).join("")}
  </div>
  <div class="emerging-meta">
    <div class="emerging-meta-item"><strong>📍 Roadmap path:</strong> ${role.roadmapPath}</div>
    <div class="emerging-meta-item"><strong>💰 Salary range:</strong> ${role.salary}</div>
  </div>
  <div class="emerging-position-box">
    <strong>How to position yourself:</strong> ${role.howToPosition}
  </div>
</div>`).join("")}
  </div>
</div>`;
}

// ── LinkedIn & Networking ─────────────────────────────────────────────────────

function renderLinkedInGuideHTML() {
  const checks = state.applyChecks || {};
  return `
<div class="linkedin-guide">
  <div class="linkedin-checklist-section">
    <h3>LinkedIn Profile Checklist</h3>
    <p class="muted-note" style="margin-bottom:16px">Check off each section as you complete it.</p>
    ${linkedinChecklist.map((item,i)=>{
      const k = `linkedin-${i}`;
      return `
<label class="linkedin-item ${checks[k]?"is-done":""}">
  <input type="checkbox" class="apply-check" data-key="${k}" ${checks[k]?"checked":""}>
  <div class="linkedin-item-text">
    <strong>${item.section}</strong>
    <p>${item.text}</p>
  </div>
</label>`;}).join("")}
  </div>
  <div class="networking-section">
    <h3>Networking Templates &amp; Strategy</h3>
    ${networkingGuide.map(item=>`
<details class="networking-item">
  <summary>${item.title}</summary>
  <div class="networking-body">
    <pre class="networking-template">${item.content}</pre>
    <p class="networking-tip">💡 <em>${item.tip}</em></p>
  </div>
</details>`).join("")}
  </div>
</div>`;
}

init();
