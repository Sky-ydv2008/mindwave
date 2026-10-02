import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";

export const getRepos = async (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    repos: [
      {
        id: "repo-1",
        projectId: "proj-1",
        name: "Sky-ydv2008/mindwave",
        owner: "Sky-ydv2008",
        url: "https://github.com/Sky-ydv2008/mindwave",
        defaultBranch: "main",
        openPRsCount: 2,
        lastCommitMessage: "feat: implement symbolic rule reasoning engine & RAG trace",
        connectedAt: new Date().toISOString()
      }
    ]
  });
};

export const getCommits = async (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    commits: [
      {
        id: "c-1",
        sha: "a7d9f21",
        message: "feat: add interactive Knowledge Graph Explorer node rendering",
        author: "Sky Yadav",
        committedAt: new Date().toISOString()
      },
      {
        id: "c-2",
        sha: "e4b81c0",
        message: "docs: add Mindweave full implementation architecture plan",
        author: "Sky Yadav",
        committedAt: new Date(Date.now() - 3600000 * 4).toISOString()
      }
    ]
  });
};

export const getPullRequests = async (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    pullRequests: [
      {
        id: "pr-42",
        number: 42,
        title: "Add Hybrid Symbolic + RAG Pipeline and Reasoning Traces",
        status: "MERGED",
        author: "Sky Yadav",
        url: "https://github.com/Sky-ydv2008/mindwave/pull/42",
        createdAt: new Date().toISOString()
      }
    ]
  });
};

export const connectRepo = async (req: AuthenticatedRequest, res: Response) => {
  const { repoUrl, projectId } = req.body;
  return res.status(201).json({
    message: "GitHub repository linked successfully",
    repository: {
      id: `repo-${Date.now()}`,
      projectId: projectId || "proj-1",
      name: repoUrl ? repoUrl.replace("https://github.com/", "") : "Sky-ydv2008/mindwave",
      owner: "Sky-ydv2008",
      url: repoUrl || "https://github.com/Sky-ydv2008/mindwave",
      defaultBranch: "main",
      openPRsCount: 0,
      connectedAt: new Date().toISOString()
    }
  });
};
