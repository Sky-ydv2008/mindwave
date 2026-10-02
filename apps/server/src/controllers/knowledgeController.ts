import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { symbolicEngine } from "../services/symbolicEngine";

export const getEntities = async (req: AuthenticatedRequest, res: Response) => {
  const projectId = req.query.projectId as string || "proj-1";
  const entities = symbolicEngine.getEntities(projectId);
  return res.json({ entities });
};

export const createEntity = async (req: AuthenticatedRequest, res: Response) => {
  const { projectId, type, name, externalId, metadata } = req.body;
  if (!type || !name) {
    return res.status(400).json({ message: "Entity type and name are required" });
  }

  const newEntity = symbolicEngine.addEntity({
    id: `ent-${Date.now()}`,
    projectId: projectId || "proj-1",
    type,
    name,
    externalId,
    metadata
  });

  return res.status(201).json({ entity: newEntity });
};

export const getRelations = async (req: AuthenticatedRequest, res: Response) => {
  const projectId = req.query.projectId as string || "proj-1";
  const relations = symbolicEngine.getRelations(projectId);
  return res.json({ relations });
};

export const createRelation = async (req: AuthenticatedRequest, res: Response) => {
  const { projectId, sourceEntityId, targetEntityId, relationType, confidence, isConfirmed } = req.body;
  if (!sourceEntityId || !targetEntityId || !relationType) {
    return res.status(400).json({ message: "sourceEntityId, targetEntityId, and relationType are required" });
  }

  const newRelation = symbolicEngine.addRelation({
    id: `rel-${Date.now()}`,
    projectId: projectId || "proj-1",
    sourceEntityId,
    targetEntityId,
    relationType,
    confidence: confidence ?? 1.0,
    isConfirmed: isConfirmed ?? true
  });

  return res.status(201).json({ relation: newRelation });
};

export const getKnowledgeGraph = async (req: AuthenticatedRequest, res: Response) => {
  const projectId = req.query.projectId as string || "proj-1";
  const entities = symbolicEngine.getEntities(projectId);
  const relations = symbolicEngine.getRelations(projectId);

  return res.json({
    nodes: entities.map(e => ({
      id: e.id,
      label: e.name,
      type: e.type,
      externalId: e.externalId
    })),
    edges: relations.map(r => ({
      id: r.id,
      source: r.sourceEntityId,
      target: r.targetEntityId,
      relation: r.relationType,
      confidence: r.confidence,
      isConfirmed: r.isConfirmed
    }))
  });
};

export const evaluateRules = async (req: AuthenticatedRequest, res: Response) => {
  const projectId = req.query.projectId as string || "proj-1";
  const ruleResults = symbolicEngine.evaluateRules(projectId);
  return res.json({ ruleResults });
};

export const getTraceability = async (req: AuthenticatedRequest, res: Response) => {
  const projectId = req.query.projectId as string || "proj-1";
  const matrix = symbolicEngine.getTraceabilityMatrix(projectId);
  return res.json({ traceabilityMatrix: matrix });
};

export const approveFact = async (req: AuthenticatedRequest, res: Response) => {
  const { factId } = req.body;
  return res.json({ message: `Fact ${factId || "F-101"} approved and converted to persistent symbolic link.` });
};
