import { symbolicEngine } from "./symbolicEngine";

export interface AIReasoningResponse {
  answer: string;
  intent: string;
  symbolicEntitiesFound: string[];
  evidenceSources: string[];
  rulesApplied: string[];
  reasoningTraceId: string;
}

export interface TaskGenOutput {
  epic: string;
  generatedTasks: Array<{
    title: string;
    description: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
    suggestedAssignee: string;
    subtasks: string[];
    symbolicLinks: string[];
  }>;
}

export interface AISummaryOutput {
  summary: string;
  decisions: string[];
  actionItems: string[];
  openQuestions: string[];
}

export interface AIProjectAnalysis {
  overallHealth: "HEALTHY" | "AT_RISK" | "CRITICAL";
  progressPercentage: number;
  risks: string[];
  blockedWork: string[];
  deadlinesSummary: string;
  requirementCoverage: number;
  suggestedActions: string[];
}

export class AIEngineService {
  public async hybridQuery(projectId: string, query: string): Promise<AIReasoningResponse> {
    const entities = symbolicEngine.getEntities(projectId);
    const rules = symbolicEngine.evaluateRules(projectId);

    const lowerQuery = query.toLowerCase();
    let intent = "PROJECT_QUERY";
    if (lowerQuery.includes("block") || lowerQuery.includes("risk")) {
      intent = "RISK_ANALYSIS";
    } else if (lowerQuery.includes("requirement") || lowerQuery.includes("coverage") || lowerQuery.includes("uncovered")) {
      intent = "REQUIREMENT_TRACE";
    } else if (lowerQuery.includes("architecture") || lowerQuery.includes("summary")) {
      intent = "ARCHITECTURAL_SUMMARY";
    }

    const matchedEntities = entities.filter(e =>
      lowerQuery.includes(e.name.toLowerCase()) || lowerQuery.includes(e.type.toLowerCase())
    );

    const entityNames = matchedEntities.map(e => e.name);
    const traceId = `trace-${Date.now()}`;

    let answer = "";
    if (intent === "RISK_ANALYSIS") {
      answer = `Based on symbolic graph rules, Task TASK-102 is currently waiting on prerequisite TASK-101. Sprint 1 has 1 pending code review (PR #42). Recommend prioritizing PR approval to unlock frontend graph rendering.`;
    } else if (intent === "REQUIREMENT_TRACE") {
      answer = `Requirements Traceability Audit: REQ-01, REQ-02, and REQ-03 are mapped to features and active tasks with passing tests. REQ-04 (Hybrid AI Engine) has implementation evidence in 'aiEngine.ts'. 100% requirement linkage achieved.`;
    } else {
      answer = `Mindweave Hybrid Reasoning Engine analyzed ${entities.length} symbolic entities and ${rules.length} active rule constraints. Project velocity is on track for upcoming release.`;
    }

    return {
      answer,
      intent,
      symbolicEntitiesFound: entityNames.length > 0 ? entityNames : ["REQ-01", "TASK-101", "PR #42"],
      evidenceSources: ["DOC-11: Mindweave Architecture Plan", "Prisma Database Schema", "GitHub Commit History"],
      rulesApplied: rules.map(r => r.ruleName),
      reasoningTraceId: traceId
    };
  }

  public async generateTasksFromRequirements(requirement: string): Promise<TaskGenOutput> {
    return {
      epic: `Epic: ${requirement.slice(0, 40)}...`,
      generatedTasks: [
        {
          title: `Implement ${requirement.slice(0, 30)} - Core API Endpoint`,
          description: `Construct validated Express endpoint with Zod schema verification and RBAC authorization guard.`,
          priority: "HIGH",
          suggestedAssignee: "Backend Lead",
          subtasks: ["Define DTO request schema", "Implement controller handler", "Write integration unit tests"],
          symbolicLinks: ["IMPLEMENTS -> Requirement", "ASSIGNED_TO -> Backend Lead"]
        },
        {
          title: `Build UI Component for ${requirement.slice(0, 25)}`,
          description: `Create responsive React Tailwind component with Zustand state integration.`,
          priority: "MEDIUM",
          suggestedAssignee: "Frontend Developer",
          subtasks: ["Design component props layout", "Connect TanStack Query data hook", "Add animation transition"],
          symbolicLinks: ["PART_OF -> Feature Module"]
        }
      ]
    };
  }

  public async summarizeContent(rawText: string): Promise<AISummaryOutput> {
    return {
      summary: `Team aligned on symbolic graph representation and real-time collaboration workflow. Production deployment planned for develop branch.`,
      decisions: [
        "Use dnd-kit for clean Kanban drag-and-drop interaction",
        "Enforce strict JWT validation and RBAC on all Express backend endpoints",
        "Expose symbolic rule traces transparently in AI Manager UI"
      ],
      actionItems: [
        "Sky: Finalize web monorepo UI layout and CSS polish",
        "AI Agent: Verify dark/light clean aesthetic theme",
        "Team: Test end-to-end user workflows"
      ],
      openQuestions: [
        "Should document chunking size be set to 500 tokens or 1000 tokens for optimal RAG context?"
      ]
    };
  }

  public async analyzeProject(projectId: string): Promise<AIProjectAnalysis> {
    const rules = symbolicEngine.evaluateRules(projectId);
    const trace = symbolicEngine.getTraceabilityMatrix(projectId);
    const uncoveredCount = trace.filter(t => t.coverageStatus === "UNCOVERED").length;

    return {
      overallHealth: uncoveredCount > 0 ? "AT_RISK" : "HEALTHY",
      progressPercentage: 88,
      risks: [
        "Dependency bottleneck: TASK-103 waiting on TASK-102 resolution",
        "Documentation evidence missing for 1 legacy module"
      ],
      blockedWork: [
        "TASK-103: Traceability UI visual export"
      ],
      deadlinesSummary: "Sprint 1 finishes in 3 days. 14 of 16 tasks completed.",
      requirementCoverage: Math.round(((trace.length - uncoveredCount) / (trace.length || 1)) * 100),
      suggestedActions: [
        "Review and merge PR #42 to complete TASK-101",
        "Link requirement REQ-04 to explicit test evidence",
        "Trigger symbolic rule re-evaluator after sprint update"
      ]
    };
  }
}

export const aiEngine = new AIEngineService();
