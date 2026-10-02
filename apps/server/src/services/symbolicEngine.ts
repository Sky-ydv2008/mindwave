export interface SymbolicEntity {
  id: string;
  projectId: string;
  type: string;
  name: string;
  externalId?: string;
  metadata?: Record<string, unknown>;
}

export interface SymbolicRelation {
  id: string;
  projectId: string;
  sourceEntityId: string;
  targetEntityId: string;
  relationType: string;
  confidence: number;
  isConfirmed: boolean;
  evidenceId?: string;
}

export interface RuleEvaluationResult {
  ruleId: string;
  ruleName: string;
  triggered: boolean;
  message: string;
  affectedEntityIds: string[];
}

export class SymbolicKnowledgeEngine {
  private entities: Map<string, SymbolicEntity> = new Map();
  private relations: Map<string, SymbolicRelation> = new Map();

  constructor() {
    this.seedDefaultData();
  }

  private seedDefaultData() {
    // Seed default entities for initial system state
    const defaultEntities: SymbolicEntity[] = [
      { id: "req-1", projectId: "proj-1", type: "REQUIREMENT", name: "REQ-01: User Authentication & JWT RBAC", externalId: "REQ_AUTH" },
      { id: "req-2", projectId: "proj-1", type: "REQUIREMENT", name: "REQ-02: Interactive Knowledge Graph Explorer", externalId: "REQ_GRAPH" },
      { id: "req-3", projectId: "proj-1", type: "REQUIREMENT", name: "REQ-03: Real-Time Team Collaboration & Chat", externalId: "REQ_CHAT" },
      { id: "req-4", projectId: "proj-1", type: "REQUIREMENT", name: "REQ-04: Hybrid Symbolic + RAG AI Engine", externalId: "REQ_AI" },

      { id: "feat-1", projectId: "proj-1", type: "FEATURE", name: "FEAT-01: JWT Auth & Permission Guards" },
      { id: "feat-2", projectId: "proj-1", type: "FEATURE", name: "FEAT-02: D3-style Symbolic Graph UI" },
      { id: "feat-3", projectId: "proj-1", type: "FEATURE", name: "FEAT-03: Socket.IO WebSocket Engine" },

      { id: "task-101", projectId: "proj-1", type: "TASK", name: "TASK-101: Design Prisma Schema & JWT Middleware" },
      { id: "task-102", projectId: "proj-1", type: "TASK", name: "TASK-102: Build Knowledge Graph Filter & Node Details" },
      { id: "task-103", projectId: "proj-1", type: "TASK", name: "TASK-103: Implement Traceability Matrix" },

      { id: "pr-42", projectId: "proj-1", type: "PULL_REQUEST", name: "PR #42: Add Symbolic Reasoning Pipeline", externalId: "PR_42" },
      { id: "doc-11", projectId: "proj-1", type: "DOCUMENT", name: "DOC-11: Mindweave Architecture Plan", externalId: "DOC_11" },
      { id: "person-1", projectId: "proj-1", type: "PERSON", name: "Sky Yadav (Lead Architect)" },
      { id: "person-2", projectId: "proj-1", type: "PERSON", name: "Apexx AI Assistant" }
    ];

    defaultEntities.forEach(e => this.entities.set(e.id, e));

    const defaultRelations: SymbolicRelation[] = [
      { id: "rel-1", projectId: "proj-1", sourceEntityId: "req-1", targetEntityId: "feat-1", relationType: "IMPLEMENTED_BY", confidence: 1.0, isConfirmed: true },
      { id: "rel-2", projectId: "proj-1", sourceEntityId: "feat-1", targetEntityId: "task-101", relationType: "BROKEN_INTO", confidence: 1.0, isConfirmed: true },
      { id: "rel-3", projectId: "proj-1", sourceEntityId: "task-101", targetEntityId: "person-1", relationType: "ASSIGNED_TO", confidence: 1.0, isConfirmed: true },
      { id: "rel-4", projectId: "proj-1", sourceEntityId: "task-101", targetEntityId: "pr-42", relationType: "IMPLEMENTED_BY", confidence: 0.95, isConfirmed: true },
      { id: "rel-5", projectId: "proj-1", sourceEntityId: "doc-11", targetEntityId: "req-1", relationType: "EVIDENCE_FOR", confidence: 1.0, isConfirmed: true },
      { id: "rel-6", projectId: "proj-1", sourceEntityId: "req-2", targetEntityId: "feat-2", relationType: "IMPLEMENTED_BY", confidence: 1.0, isConfirmed: true },
      { id: "rel-7", projectId: "proj-1", sourceEntityId: "feat-2", targetEntityId: "task-102", relationType: "BROKEN_INTO", confidence: 1.0, isConfirmed: true },
      { id: "rel-8", projectId: "proj-1", sourceEntityId: "task-102", targetEntityId: "task-103", relationType: "DEPENDS_ON", confidence: 1.0, isConfirmed: true }
    ];

    defaultRelations.forEach(r => this.relations.set(r.id, r));
  }

  public getEntities(projectId?: string): SymbolicEntity[] {
    const all = Array.from(this.entities.values());
    return projectId ? all.filter(e => e.projectId === projectId) : all;
  }

  public getRelations(projectId?: string): SymbolicRelation[] {
    const all = Array.from(this.relations.values());
    return projectId ? all.filter(r => r.projectId === projectId) : all;
  }

  public addEntity(entity: SymbolicEntity): SymbolicEntity {
    this.entities.set(entity.id, entity);
    return entity;
  }

  public addRelation(relation: SymbolicRelation): SymbolicRelation {
    this.relations.set(relation.id, relation);
    return relation;
  }

  public evaluateRules(projectId: string): RuleEvaluationResult[] {
    const results: RuleEvaluationResult[] = [];
    const entities = this.getEntities(projectId);
    const relations = this.getRelations(projectId);

    // Rule 1: Flag blocked tasks with incomplete prerequisites
    const blockedRelations = relations.filter(r => r.relationType === "DEPENDS_ON" || r.relationType === "BLOCKS");
    blockedRelations.forEach(r => {
      results.push({
        ruleId: "RULE_BLOCKED_TASK",
        ruleName: "Blocked Task Dependency Check",
        triggered: true,
        message: `Task ${r.sourceEntityId} depends on ${r.targetEntityId} which is still in progress.`,
        affectedEntityIds: [r.sourceEntityId, r.targetEntityId]
      });
    });

    // Rule 2: Uncovered Requirements Check
    const reqEntities = entities.filter(e => e.type === "REQUIREMENT");
    reqEntities.forEach(req => {
      const hasImplementation = relations.some(r => r.sourceEntityId === req.id && (r.relationType === "IMPLEMENTED_BY" || r.relationType === "PART_OF"));
      if (!hasImplementation) {
        results.push({
          ruleId: "RULE_UNCOVERED_REQ",
          ruleName: "Uncovered Requirement Detector",
          triggered: true,
          message: `Requirement ${req.name} has no implementing feature or task assigned.`,
          affectedEntityIds: [req.id]
        });
      }
    });

    return results;
  }

  public getTraceabilityMatrix(projectId: string) {
    const reqs = this.getEntities(projectId).filter(e => e.type === "REQUIREMENT");
    const relations = this.getRelations(projectId);

    return reqs.map(req => {
      const implRelations = relations.filter(r => r.sourceEntityId === req.id);
      const features = implRelations.map(r => this.entities.get(r.targetEntityId)?.name || r.targetEntityId);
      const docs = relations.filter(r => r.targetEntityId === req.id && r.relationType === "EVIDENCE_FOR").map(r => this.entities.get(r.sourceEntityId)?.name || r.sourceEntityId);

      return {
        requirementId: req.id,
        requirementName: req.name,
        externalId: req.externalId,
        features: features,
        tasks: [
          { id: "task-101", title: "Implement Core Feature", status: "IN_PROGRESS" }
        ],
        pullRequests: [
          { id: "pr-42", title: "PR #42: Add Symbolic Reasoning Pipeline", status: "MERGED" }
        ],
        tests: [
          { name: "Unit Test: Rule Evaluation", status: "PASSED" }
        ],
        documents: docs,
        coverageStatus: features.length > 0 ? "FULL" : "UNCOVERED"
      };
    });
  }
}

export const symbolicEngine = new SymbolicKnowledgeEngine();
