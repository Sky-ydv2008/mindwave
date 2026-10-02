export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  TEAM_ADMIN = "TEAM_ADMIN",
  PROJECT_MANAGER = "PROJECT_MANAGER",
  TEAM_MEMBER = "TEAM_MEMBER"
}

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  BLOCKED = "BLOCKED",
  COMPLETED = "COMPLETED"
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT"
}

export enum KnowledgeEntityType {
  PROJECT = "PROJECT",
  PERSON = "PERSON",
  TASK = "TASK",
  FEATURE = "FEATURE",
  REQUIREMENT = "REQUIREMENT",
  DOCUMENT = "DOCUMENT",
  TECHNOLOGY = "TECHNOLOGY",
  REPOSITORY = "REPOSITORY",
  ISSUE = "ISSUE",
  PULL_REQUEST = "PULL_REQUEST",
  MILESTONE = "MILESTONE",
  DECISION = "DECISION"
}

export enum KnowledgeRelationType {
  ASSIGNED_TO = "ASSIGNED_TO",
  DEPENDS_ON = "DEPENDS_ON",
  BLOCKS = "BLOCKS",
  PART_OF = "PART_OF",
  IMPLEMENTS = "IMPLEMENTS",
  DOCUMENTED_IN = "DOCUMENTED_IN",
  DISCUSSED_IN = "DISCUSSED_IN",
  FIXES = "FIXES",
  REQUIRES = "REQUIRES",
  RELATED_TO = "RELATED_TO",
  CREATED_BY = "CREATED_BY",
  APPROVED_BY = "APPROVED_BY"
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: TeamMember[];
  createdAt: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  user: User;
  role: UserRole;
}

export interface Project {
  id: string;
  name: string;
  key: string;
  description?: string;
  teamId: string;
  health: "HEALTHY" | "AT_RISK" | "CRITICAL";
  progress: number;
  createdAt: string;
  members?: User[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  assignee?: User;
  creatorId: string;
  sprintId?: string;
  milestoneId?: string;
  deadline?: string;
  labels: string[];
  dependencies: string[];
  subtasks: Subtask[];
  createdAt: string;
  updatedAt: string;
}

export interface Subtask {
  id: string;
  taskId: string;
  title: string;
  completed: boolean;
}

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  goal?: string;
  startDate: string;
  endDate: string;
  status: "PLANNED" | "ACTIVE" | "COMPLETED";
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderId: string;
  sender: User;
  content: string;
  attachments?: string[];
  reactions?: Record<string, string[]>;
  replyToId?: string;
  createdAt: string;
}

export interface Channel {
  id: string;
  projectId: string;
  name: string;
  isPrivate: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: "TASK_ASSIGNED" | "TASK_UPDATED" | "TASK_OVERDUE" | "MENTION" | "MESSAGE" | "PROJECT_INVITE" | "DEADLINE" | "PULL_REQUEST" | "KNOWLEDGE_ALERT" | "SYSTEM";
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface ProjectDocument {
  id: string;
  projectId: string;
  title: string;
  fileType: "pdf" | "docx" | "txt" | "pptx" | "image";
  fileUrl: string;
  fileSize: number;
  extractedText?: string;
  chunksCount: number;
  uploadedAt: string;
}

export interface KnowledgeEntityItem {
  id: string;
  projectId: string;
  type: KnowledgeEntityType;
  name: string;
  externalId?: string;
  metadata?: Record<string, unknown>;
}

export interface KnowledgeRelationItem {
  id: string;
  projectId: string;
  sourceEntityId: string;
  targetEntityId: string;
  relationType: KnowledgeRelationType;
  confidence: number;
  isConfirmed: boolean;
  evidenceId?: string;
  createdAt: string;
}

export interface KnowledgeFactItem {
  id: string;
  projectId: string;
  subject: string;
  predicate: string;
  object: string;
  confidence: number;
  source: string;
  isConfirmed: boolean;
  evidenceText?: string;
  timestamp: string;
}

export interface KnowledgeRuleItem {
  id: string;
  name: string;
  description: string;
  condition: string;
  action: string;
  isActive: boolean;
  version: number;
}

export interface RequirementTrace {
  requirementId: string;
  requirementName: string;
  features: string[];
  tasks: { id: string; title: string; status: TaskStatus }[];
  pullRequests: { id: string; title: string; status: string }[];
  tests: { name: string; status: "PASSED" | "FAILED" | "PENDING" }[];
  documents: string[];
  coverageStatus: "FULL" | "PARTIAL" | "UNCOVERED";
}

export interface GitHubRepoInfo {
  id: string;
  projectId: string;
  name: string;
  owner: string;
  url: string;
  defaultBranch: string;
  openPRsCount: number;
  lastCommitMessage?: string;
  connectedAt: string;
}

export interface AIAnalysisResult {
  overallHealth: string;
  progressPercentage: number;
  risks: string[];
  blockedWork: string[];
  deadlinesSummary: string;
  requirementCoverage: number;
  suggestedActions: string[];
}

export interface ReasoningTrace {
  id: string;
  query: string;
  intent: string;
  symbolicEntitiesFound: string[];
  vectorChunksUsed: string[];
  rulesApplied: string[];
  response: string;
  timestamp: string;
}
