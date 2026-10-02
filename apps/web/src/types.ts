export type ViewType = 
  | 'dashboard'
  | 'kanban'
  | 'knowledge_graph'
  | 'traceability'
  | 'ai_manager'
  | 'chat'
  | 'github'
  | 'documents'
  | 'analytics'
  | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export interface TaskItem {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'BLOCKED' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assigneeName: string;
  deadline: string;
  labels: string[];
  dependencies: string[];
  subtasks: { id: string; title: string; completed: boolean }[];
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: string;
  externalId?: string;
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  relation: string;
  confidence: number;
  isConfirmed: boolean;
}

export interface TraceabilityItem {
  requirementId: string;
  requirementName: string;
  externalId?: string;
  features: string[];
  tasks: { id: string; title: string; status: string }[];
  pullRequests: { id: string; title: string; status: string }[];
  tests: { name: string; status: 'PASSED' | 'FAILED' | 'PENDING' }[];
  documents: string[];
  coverageStatus: 'FULL' | 'PARTIAL' | 'UNCOVERED';
}
