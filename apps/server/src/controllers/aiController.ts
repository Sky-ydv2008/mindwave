import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { aiEngine } from "../services/aiEngine";

export const chatWithAI = async (req: AuthenticatedRequest, res: Response) => {
  const { projectId, query } = req.body;
  if (!query) {
    return res.status(400).json({ message: "Query text is required" });
  }

  const result = await aiEngine.hybridQuery(projectId || "proj-1", query);
  return res.json(result);
};

export const generateTasks = async (req: AuthenticatedRequest, res: Response) => {
  const { requirement } = req.body;
  if (!requirement) {
    return res.status(400).json({ message: "Requirement text is required" });
  }

  const result = await aiEngine.generateTasksFromRequirements(requirement);
  return res.json(result);
};

export const summarize = async (req: AuthenticatedRequest, res: Response) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: "Content to summarize is required" });
  }

  const result = await aiEngine.summarizeContent(content);
  return res.json(result);
};

export const analyzeProject = async (req: AuthenticatedRequest, res: Response) => {
  const projectId = (req.query.projectId as string) || req.body.projectId || "proj-1";
  const result = await aiEngine.analyzeProject(projectId);
  return res.json(result);
};

export const documentQuery = async (req: AuthenticatedRequest, res: Response) => {
  const { documentId, query } = req.body;
  return res.json({
    answer: `Analysis for '${query || "document details"}': The uploaded specification outlines JWT RBAC token standard, WebSocket event synchronization, and structured symbolic fact extraction with evidence tagging.`,
    evidenceSnippets: [
      { page: 2, text: "Backend: Node.js, Express, TypeScript, Socket.IO, Prisma, PostgreSQL..." },
      { page: 6, text: "Each relation should retain source/evidence, timestamp, project scope..." }
    ]
  });
};
