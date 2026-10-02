import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";

let projects = [
  {
    id: "proj-1",
    key: "MW",
    name: "Mindweave Platform Engine",
    description: "AI-powered collaborative intelligence, symbolic knowledge layer, RAG, and GitHub workspace",
    teamId: "team-apex",
    health: "HEALTHY",
    progress: 88,
    createdAt: new Date().toISOString()
  },
  {
    id: "proj-2",
    key: "NEXUS",
    name: "Nexus Distributed Autonomous Agent System",
    description: "Multi-agent autonomous execution and workflow automation platform",
    teamId: "team-apex",
    health: "AT_RISK",
    progress: 62,
    createdAt: new Date().toISOString()
  }
];

export const getProjects = async (req: AuthenticatedRequest, res: Response) => {
  return res.json({ projects });
};

export const getProjectById = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  return res.json({ project });
};

export const createProject = async (req: AuthenticatedRequest, res: Response) => {
  const { name, key, description, teamId } = req.body;
  if (!name || !key) {
    return res.status(400).json({ message: "Project name and key are required" });
  }

  const newProject = {
    id: `proj-${Date.now()}`,
    key: key.toUpperCase(),
    name,
    description: description || "",
    teamId: teamId || "team-apex",
    health: "HEALTHY",
    progress: 0,
    createdAt: new Date().toISOString()
  };

  projects.push(newProject);
  return res.status(201).json({ project: newProject });
};

export const updateProject = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Project not found" });
  }

  projects[index] = { ...projects[index], ...req.body };
  return res.json({ project: projects[index] });
};

export const deleteProject = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  projects = projects.filter(p => p.id !== id);
  return res.json({ message: "Project deleted successfully" });
};
