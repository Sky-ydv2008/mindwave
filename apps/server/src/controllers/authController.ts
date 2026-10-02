import { Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../middleware/auth";

const JWT_SECRET = process.env.JWT_SECRET || "mindwave_jwt_secret_key_super_secure_2026";

export const register = async (req: AuthenticatedRequest, res: Response) => {
  const { email, password, name, role } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: "Email, password, and name are required" });
  }

  const user = {
    id: `user-${Date.now()}`,
    email,
    name,
    role: role || "TEAM_MEMBER",
    createdAt: new Date().toISOString()
  };

  const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1d" });
  const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

  return res.status(201).json({
    message: "Registration successful",
    user,
    accessToken,
    refreshToken
  });
};

export const login = async (req: AuthenticatedRequest, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = {
    id: "user-admin-1",
    email: email || "admin@mindweave.ai",
    name: email.split("@")[0] || "Sky Yadav",
    role: email.includes("admin") ? "SUPER_ADMIN" : "TEAM_MEMBER",
    createdAt: new Date().toISOString()
  };

  const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1d" });
  const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

  return res.json({
    message: "Login successful",
    user,
    accessToken,
    refreshToken
  });
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    user: req.user || {
      id: "user-admin-1",
      email: "admin@mindweave.ai",
      name: "Sky Yadav",
      role: "SUPER_ADMIN"
    }
  });
};

export const refreshToken = async (req: AuthenticatedRequest, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  const user = req.user || {
    id: "user-admin-1",
    email: "admin@mindweave.ai",
    name: "Sky Yadav",
    role: "SUPER_ADMIN"
  };

  const newAccessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1d" });
  return res.json({ accessToken: newAccessToken });
};

export const logout = async (req: AuthenticatedRequest, res: Response) => {
  return res.json({ message: "Successfully logged out" });
};
