import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";

let channels = [
  { id: "chan-general", projectId: "proj-1", name: "general", isPrivate: false },
  { id: "chan-dev", projectId: "proj-1", name: "dev-discussion", isPrivate: false },
  { id: "chan-symbolic", projectId: "proj-1", name: "symbolic-knowledge", isPrivate: false }
];

let messages = [
  {
    id: "msg-1",
    channelId: "chan-general",
    senderId: "user-admin-1",
    sender: { id: "user-admin-1", name: "Sky Yadav", role: "SUPER_ADMIN" },
    content: "Welcome to Mindweave! The monorepo architecture and symbolic graph engine are online.",
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "msg-2",
    channelId: "chan-general",
    senderId: "user-ai",
    sender: { id: "user-ai", name: "Apexx AI Project Assistant", role: "TEAM_MEMBER" },
    content: "Symbolic rule evaluation completed: 0 critical blocking issues detected across REQ-01 through REQ-04.",
    createdAt: new Date().toISOString()
  }
];

export const getChannels = async (req: AuthenticatedRequest, res: Response) => {
  return res.json({ channels });
};

export const getMessages = async (req: AuthenticatedRequest, res: Response) => {
  const { channelId } = req.query;
  let result = messages;
  if (channelId) {
    result = result.filter(m => m.channelId === channelId);
  }
  return res.json({ messages: result });
};

export const sendMessage = async (req: AuthenticatedRequest, res: Response) => {
  const { channelId, content } = req.body;
  if (!content) {
    return res.status(400).json({ message: "Message content required" });
  }

  const newMessage = {
    id: `msg-${Date.now()}`,
    channelId: channelId || "chan-general",
    senderId: req.user?.id || "user-admin-1",
    sender: {
      id: req.user?.id || "user-admin-1",
      name: req.user?.name || "Sky Yadav",
      role: req.user?.role || "SUPER_ADMIN"
    },
    content,
    createdAt: new Date().toISOString()
  };

  messages.push(newMessage);
  return res.status(201).json({ message: newMessage });
};
