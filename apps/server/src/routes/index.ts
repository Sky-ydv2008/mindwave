import { Router } from "express";
import { authenticateJWT, requireRole } from "../middleware/auth";
import * as authController from "../controllers/authController";
import * as projectController from "../controllers/projectController";
import * as taskController from "../controllers/taskController";
import * as knowledgeController from "../controllers/knowledgeController";
import * as aiController from "../controllers/aiController";
import * as githubController from "../controllers/githubController";
import * as chatController from "../controllers/chatController";
import * as analyticsController from "../controllers/analyticsController";
import * as adminController from "../controllers/adminController";

const router = Router();

// Auth Routes
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", authenticateJWT, authController.getMe);
router.post("/auth/refresh", authController.refreshToken);
router.post("/auth/logout", authenticateJWT, authController.logout);

// Project Routes
router.get("/projects", authenticateJWT, projectController.getProjects);
router.get("/projects/:id", authenticateJWT, projectController.getProjectById);
router.post("/projects", authenticateJWT, projectController.createProject);
router.put("/projects/:id", authenticateJWT, projectController.updateProject);
router.delete("/projects/:id", authenticateJWT, projectController.deleteProject);

// Task Routes
router.get("/tasks", authenticateJWT, taskController.getTasks);
router.post("/tasks", authenticateJWT, taskController.createTask);
router.put("/tasks/:id", authenticateJWT, taskController.updateTask);
router.delete("/tasks/:id", authenticateJWT, taskController.deleteTask);

// Symbolic Knowledge & Graph Routes
router.get("/knowledge/entities", authenticateJWT, knowledgeController.getEntities);
router.post("/knowledge/entities", authenticateJWT, knowledgeController.createEntity);
router.get("/knowledge/relations", authenticateJWT, knowledgeController.getRelations);
router.post("/knowledge/relations", authenticateJWT, knowledgeController.createRelation);
router.get("/knowledge/graph", authenticateJWT, knowledgeController.getKnowledgeGraph);
router.get("/knowledge/rules/evaluate", authenticateJWT, knowledgeController.evaluateRules);
router.get("/knowledge/traceability", authenticateJWT, knowledgeController.getTraceability);
router.post("/knowledge/facts/approve", authenticateJWT, knowledgeController.approveFact);

// AI Manager & Hybrid RAG Routes
router.post("/ai/chat", authenticateJWT, aiController.chatWithAI);
router.post("/ai/generate-tasks", authenticateJWT, aiController.generateTasks);
router.post("/ai/summarize", authenticateJWT, aiController.summarize);
router.get("/ai/analyze-project", authenticateJWT, aiController.analyzeProject);
router.post("/ai/document-query", authenticateJWT, aiController.documentQuery);

// GitHub Integration Routes
router.get("/github/repos", authenticateJWT, githubController.getRepos);
router.post("/github/connect", authenticateJWT, githubController.connectRepo);
router.get("/github/commits", authenticateJWT, githubController.getCommits);
router.get("/github/pull-requests", authenticateJWT, githubController.getPullRequests);

// Team Chat Routes
router.get("/chat/channels", authenticateJWT, chatController.getChannels);
router.get("/chat/messages", authenticateJWT, chatController.getMessages);
router.post("/chat/messages", authenticateJWT, chatController.sendMessage);

// Analytics Routes
router.get("/analytics/metrics", authenticateJWT, analyticsController.getAnalyticsMetrics);

// Admin Routes (RBAC Protected)
router.get("/admin/users", authenticateJWT, requireRole(["SUPER_ADMIN", "TEAM_ADMIN"]), adminController.getUsers);
router.get("/admin/system", authenticateJWT, requireRole(["SUPER_ADMIN"]), adminController.getSystemHealth);
router.post("/admin/users/role", authenticateJWT, requireRole(["SUPER_ADMIN"]), adminController.updateUserRole);

export default router;
