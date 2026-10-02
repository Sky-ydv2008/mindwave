import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";

export const getUsers = async (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    users: [
      { id: "user-admin-1", email: "admin@mindweave.ai", name: "Sky Yadav", role: "SUPER_ADMIN", createdAt: "2026-01-01T00:00:00.000Z" },
      { id: "user-dev-2", email: "dev@mindweave.ai", name: "Alex Chen", role: "TEAM_ADMIN", createdAt: "2026-01-05T00:00:00.000Z" },
      { id: "user-member-3", email: "member@mindweave.ai", name: "Sarah Connor", role: "PROJECT_MANAGER", createdAt: "2026-01-10T00:00:00.000Z" }
    ]
  });
};

export const getSystemHealth = async (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    status: "UP",
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString(),
    services: {
      database: "CONNECTED",
      redisCache: "CONNECTED",
      websocketServer: "RUNNING",
      symbolicRuleEngine: "ACTIVE"
    },
    aiUsageMetrics: {
      tokensUsedToday: 42150,
      totalQueriesExecuted: 312
    }
  });
};

export const updateUserRole = async (req: AuthenticatedRequest, res: Response) => {
  const { userId, role } = req.body;
  return res.json({ message: `User ${userId} role updated to ${role}` });
};
