import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";

let tasks = [
  {
    id: "task-101",
    projectId: "proj-1",
    title: "Design Prisma Schema & JWT Auth Middleware",
    description: "Construct 32 core entity models for User, Task, KnowledgeEntity, and ReasoningTrace with JWT verification",
    status: "COMPLETED",
    priority: "HIGH",
    assigneeId: "user-admin-1",
    assigneeName: "Sky Yadav",
    creatorId: "user-admin-1",
    deadline: new Date(Date.now() + 86400000 * 2).toISOString(),
    labels: ["Backend", "Security", "Prisma"],
    dependencies: [],
    subtasks: [
      { id: "sub-1", title: "Create schema.prisma file", completed: true },
      { id: "sub-2", title: "Implement JWT sign & verify middleware", completed: true }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "task-102",
    projectId: "proj-1",
    title: "Build Knowledge Graph Explorer UI",
    description: "Interactive node-link graph renderer with entity filtering and deep artifact navigation modal",
    status: "IN_PROGRESS",
    priority: "HIGH",
    assigneeId: "user-admin-1",
    assigneeName: "Sky Yadav",
    creatorId: "user-admin-1",
    deadline: new Date(Date.now() + 86400000 * 4).toISOString(),
    labels: ["Frontend", "UI/UX", "Graph"],
    dependencies: ["task-101"],
    subtasks: [
      { id: "sub-3", title: "Create interactive SVG/canvas node rendering", completed: true },
      { id: "sub-4", title: "Connect filter controls by Entity type", completed: false }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "task-103",
    projectId: "proj-1",
    title: "Implement Requirements Traceability Matrix View",
    description: "Display end-to-end requirement -> feature -> task -> pull request -> test -> documentation mapping table",
    status: "TODO",
    priority: "MEDIUM",
    assigneeId: "user-admin-1",
    assigneeName: "Sky Yadav",
    creatorId: "user-admin-1",
    deadline: new Date(Date.now() + 86400000 * 7).toISOString(),
    labels: ["Traceability", "Frontend"],
    dependencies: ["task-102"],
    subtasks: [
      { id: "sub-5", title: "Build coverage summary status badges", completed: false }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "task-104",
    projectId: "proj-1",
    title: "Setup Hybrid RAG & Symbolic Rules Engine",
    description: "Combine precise graph traversal with semantic vector similarity and return transparent evidence traces",
    status: "IN_REVIEW",
    priority: "URGENT",
    assigneeId: "user-admin-1",
    assigneeName: "Sky Yadav",
    creatorId: "user-admin-1",
    deadline: new Date(Date.now() + 86400000 * 1).toISOString(),
    labels: ["AI", "Backend", "Symbolic"],
    dependencies: [],
    subtasks: [
      { id: "sub-6", title: "Implement RuleEvaluator engine", completed: true },
      { id: "sub-7", title: "Format safe non-CoT reasoning trace", completed: true }
    ],
    createdAt: new Date().toISOString()
  }
];

export const getTasks = async (req: AuthenticatedRequest, res: Response) => {
  const { projectId, status } = req.query;
  let result = tasks;
  if (projectId) {
    result = result.filter(t => t.projectId === projectId);
  }
  if (status) {
    result = result.filter(t => t.status === status);
  }
  return res.json({ tasks: result });
};

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  const { projectId, title, description, priority, deadline, labels, dependencies } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Task title is required" });
  }

  const newTask = {
    id: `task-${Date.now()}`,
    projectId: projectId || "proj-1",
    title,
    description: description || "",
    status: "TODO",
    priority: priority || "MEDIUM",
    assigneeId: req.user?.id || "user-admin-1",
    assigneeName: req.user?.name || "Sky Yadav",
    creatorId: req.user?.id || "user-admin-1",
    deadline: deadline || new Date(Date.now() + 86400000 * 5).toISOString(),
    labels: labels || ["General"],
    dependencies: dependencies || [],
    subtasks: [],
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  return res.status(201).json({ task: newTask });
};

export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks[index] = { ...tasks[index], ...req.body };
  return res.json({ task: tasks[index] });
};

export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== id);
  return res.json({ message: "Task deleted successfully" });
};
