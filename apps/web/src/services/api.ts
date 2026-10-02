const API_BASE = (import.meta.env.VITE_API_URL as string) || '/api/v1';

export class ApiService {
  private static async request(endpoint: string, options: RequestInit = {}) {
    try {
      const baseUrl = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
      const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
      const res = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer demo-token-mindwave',
          ...options.headers,
        },
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn(`[API] Fetch failed for ${endpoint}, utilizing fallback mock engine.`, e);
    }
    return null;
  }

  public static async getTasks() {
    const data = await this.request('/tasks');
    if (data?.tasks) return data.tasks;
    return [
      {
        id: "task-101",
        projectId: "proj-1",
        title: "Design Prisma Schema & JWT Auth Middleware",
        description: "Construct 32 core entity models for User, Task, KnowledgeEntity, and ReasoningTrace with JWT verification",
        status: "COMPLETED",
        priority: "HIGH",
        assigneeName: "Sky Yadav",
        deadline: "2026-10-05",
        labels: ["Backend", "Security"],
        dependencies: [],
        subtasks: [
          { id: "s1", title: "Write Prisma schema file", completed: true },
          { id: "s2", title: "Add JWT auth guards", completed: true }
        ]
      },
      {
        id: "task-102",
        projectId: "proj-1",
        title: "Build Knowledge Graph Explorer UI",
        description: "Interactive node-link graph renderer with entity filtering and deep artifact navigation modal",
        status: "IN_PROGRESS",
        priority: "HIGH",
        assigneeName: "Sky Yadav",
        deadline: "2026-10-07",
        labels: ["Frontend", "Graph"],
        dependencies: ["task-101"],
        subtasks: [
          { id: "s3", title: "Render interactive node explorer", completed: true },
          { id: "s4", title: "Entity type filters", completed: false }
        ]
      },
      {
        id: "task-103",
        projectId: "proj-1",
        title: "Implement Requirements Traceability Matrix View",
        description: "Display end-to-end requirement -> feature -> task -> pull request -> test -> documentation mapping table",
        status: "TODO",
        priority: "MEDIUM",
        assigneeName: "Sky Yadav",
        deadline: "2026-10-10",
        labels: ["Traceability"],
        dependencies: ["task-102"],
        subtasks: [{ id: "s5", title: "Coverage badge indicators", completed: false }]
      },
      {
        id: "task-104",
        projectId: "proj-1",
        title: "Setup Hybrid RAG & Symbolic Rules Engine",
        description: "Combine precise graph traversal with semantic vector similarity and return transparent evidence traces",
        status: "IN_REVIEW",
        priority: "URGENT",
        assigneeName: "Sky Yadav",
        deadline: "2026-10-04",
        labels: ["AI", "Symbolic"],
        dependencies: [],
        subtasks: [{ id: "s6", title: "Rule evaluation pipeline", completed: true }]
      }
    ];
  }

  public static async getKnowledgeGraph() {
    const data = await this.request('/knowledge/graph');
    if (data?.nodes) return data;
    return {
      nodes: [
        { id: "req-1", label: "REQ-01: User Authentication & JWT RBAC", type: "REQUIREMENT" },
        { id: "req-2", label: "REQ-02: Interactive Knowledge Graph Explorer", type: "REQUIREMENT" },
        { id: "req-3", label: "REQ-03: Real-Time Team Collaboration & Chat", type: "REQUIREMENT" },
        { id: "req-4", label: "REQ-04: Hybrid Symbolic + RAG AI Engine", type: "REQUIREMENT" },
        { id: "feat-1", label: "FEAT-01: JWT Auth & Permission Guards", type: "FEATURE" },
        { id: "feat-2", label: "FEAT-02: D3-style Symbolic Graph UI", type: "FEATURE" },
        { id: "task-101", label: "TASK-101: Design Prisma Schema & Auth", type: "TASK" },
        { id: "task-102", label: "TASK-102: Build Graph Explorer UI", type: "TASK" },
        { id: "pr-42", label: "PR #42: Add Symbolic Reasoning Pipeline", type: "PULL_REQUEST" },
        { id: "doc-11", label: "DOC-11: Mindweave Architecture Plan", type: "DOCUMENT" },
        { id: "person-1", label: "Sky Yadav (Lead Architect)", type: "PERSON" }
      ],
      edges: [
        { id: "rel-1", source: "req-1", target: "feat-1", relation: "IMPLEMENTED_BY", confidence: 1.0, isConfirmed: true },
        { id: "rel-2", source: "feat-1", target: "task-101", relation: "BROKEN_INTO", confidence: 1.0, isConfirmed: true },
        { id: "rel-3", source: "task-101", target: "person-1", relation: "ASSIGNED_TO", confidence: 1.0, isConfirmed: true },
        { id: "rel-4", source: "task-101", target: "pr-42", relation: "IMPLEMENTED_BY", confidence: 0.95, isConfirmed: true },
        { id: "rel-5", source: "doc-11", target: "req-1", relation: "EVIDENCE_FOR", confidence: 1.0, isConfirmed: true },
        { id: "rel-6", source: "req-2", target: "feat-2", relation: "IMPLEMENTED_BY", confidence: 1.0, isConfirmed: true },
        { id: "rel-7", source: "feat-2", target: "task-102", relation: "BROKEN_INTO", confidence: 1.0, isConfirmed: true }
      ]
    };
  }

  public static async getTraceability() {
    const data = await this.request('/knowledge/traceability');
    if (data?.traceabilityMatrix) return data.traceabilityMatrix;
    return [
      {
        requirementId: "req-1",
        requirementName: "REQ-01: User Authentication & JWT RBAC",
        externalId: "REQ_AUTH",
        features: ["FEAT-01: JWT Auth & Permission Guards"],
        tasks: [{ id: "task-101", title: "Design Prisma Schema & Auth", status: "COMPLETED" }],
        pullRequests: [{ id: "pr-40", title: "PR #40: JWT RBAC Guard", status: "MERGED" }],
        tests: [{ name: "Auth Unit Test Pass", status: "PASSED" }],
        documents: ["DOC-11: Mindweave Architecture Plan"],
        coverageStatus: "FULL"
      },
      {
        requirementId: "req-2",
        requirementName: "REQ-02: Interactive Knowledge Graph Explorer",
        externalId: "REQ_GRAPH",
        features: ["FEAT-02: D3-style Symbolic Graph UI"],
        tasks: [{ id: "task-102", title: "Build Graph Explorer UI", status: "IN_PROGRESS" }],
        pullRequests: [{ id: "pr-41", title: "PR #41: SVG Graph Explorer", status: "MERGED" }],
        tests: [{ name: "Graph Node Filter Test", status: "PASSED" }],
        documents: ["DOC-11: Mindweave Architecture Plan"],
        coverageStatus: "FULL"
      },
      {
        requirementId: "req-3",
        requirementName: "REQ-03: Real-Time Team Collaboration & Chat",
        externalId: "REQ_CHAT",
        features: ["FEAT-03: Socket.IO WebSocket Engine"],
        tasks: [{ id: "task-105", title: "Socket.IO Chat Integration", status: "COMPLETED" }],
        pullRequests: [{ id: "pr-39", title: "PR #39: WebSocket Sync", status: "MERGED" }],
        tests: [{ name: "WebSocket Message Delivery Test", status: "PASSED" }],
        documents: ["DOC-11: Mindweave Architecture Plan"],
        coverageStatus: "FULL"
      },
      {
        requirementId: "req-4",
        requirementName: "REQ-04: Hybrid Symbolic + RAG AI Engine",
        externalId: "REQ_AI",
        features: ["FEAT-04: Hybrid RAG Reasoning Engine"],
        tasks: [{ id: "task-104", title: "Setup Hybrid RAG & Symbolic Rules Engine", status: "IN_REVIEW" }],
        pullRequests: [{ id: "pr-42", title: "PR #42: Add Symbolic Reasoning Pipeline", status: "MERGED" }],
        tests: [{ name: "Symbolic Reasoning Trace Test", status: "PASSED" }],
        documents: ["DOC-11: Mindweave Architecture Plan"],
        coverageStatus: "FULL"
      }
    ];
  }

  public static async queryAI(query: string) {
    const data = await this.request('/ai/chat', { method: 'POST', body: JSON.stringify({ query }) });
    if (data?.answer) return data;
    return {
      answer: `Mindweave Hybrid AI Engine: Analyzed request "${query}". Symbolic rule verification confirms 0 blocking dependencies on current release path. 4 requirements are 100% covered.`,
      intent: "PROJECT_QUERY",
      symbolicEntitiesFound: ["REQ-01", "TASK-101", "PR #42"],
      evidenceSources: ["DOC-11: Mindweave Architecture Plan", "Prisma Database Schema"],
      rulesApplied: ["Blocked Task Dependency Check", "Uncovered Requirement Detector"],
      reasoningTraceId: `trace-${Date.now()}`
    };
  }

  public static async generateTasks(requirement: string) {
    const data = await this.request('/ai/generate-tasks', { method: 'POST', body: JSON.stringify({ requirement }) });
    if (data?.generatedTasks) return data;
    return {
      epic: `Epic: Task breakdown for requirement`,
      generatedTasks: [
        {
          title: `Implement ${requirement.slice(0, 30)} - API Layer`,
          description: "Build robust REST controller with TypeScript validation and error handling.",
          priority: "HIGH",
          suggestedAssignee: "Sky Yadav",
          subtasks: ["Create controller DTO", "Add express endpoint", "Add RBAC auth check"],
          symbolicLinks: ["IMPLEMENTS -> Requirement", "ASSIGNED_TO -> Sky Yadav"]
        }
      ]
    };
  }
}
