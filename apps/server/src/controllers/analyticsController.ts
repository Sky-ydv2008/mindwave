import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";

export const getAnalyticsMetrics = async (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    taskMetrics: {
      total: 16,
      completed: 12,
      inProgress: 2,
      inReview: 1,
      blocked: 1,
      completionRatePercentage: 75
    },
    sprintVelocity: [
      { sprint: "Sprint 1", velocity: 32 },
      { sprint: "Sprint 2", velocity: 45 },
      { sprint: "Sprint 3", velocity: 52 }
    ],
    knowledgeMetrics: {
      requirementCoveragePercentage: 100,
      unresolvedDependenciesCount: 1,
      orphanedArtifactsCount: 0,
      knowledgeFreshnessScore: 98,
      evidenceCoveragePercentage: 94
    },
    githubActivity: {
      totalCommits: 48,
      mergedPRs: 14,
      openPRs: 2
    }
  });
};
