import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AdminUser, LoginRequest } from '@shared/schema';

// Environment variables with secure defaults
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secure-jwt-secret-key-change-this-in-production';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '24h';
const BCRYPT_ROUNDS = 12;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 30 * 60 * 1000; // 30 minutes

export interface AuthenticatedRequest extends Request {
  user?: AdminUser;
}

export class AuthService {
  
  /**
   * Hash a password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  /**
   * Verify a password against a hash
   */
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generate a JWT token
   */
  static generateToken(user: AdminUser): string {
    return jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );
  }

  /**
   * Verify a JWT token
   */
  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if user is locked out
   */
  static isAccountLocked(user: AdminUser): boolean {
    if (!user.lockedUntil) return false;
    const lockoutTime = new Date(user.lockedUntil);
    return lockoutTime > new Date();
  }

  /**
   * Calculate lockout expiry time
   */
  static getLockoutExpiry(): string {
    return new Date(Date.now() + LOCKOUT_TIME).toISOString();
  }

  /**
   * Check if should lock account after failed attempts
   */
  static shouldLockAccount(attempts: number): boolean {
    return attempts >= MAX_LOGIN_ATTEMPTS;
  }
}

/**
 * Middleware to authenticate requests
 */
export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      error: 'Access denied. No token provided.' 
    });
  }

  const decoded = AuthService.verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ 
      error: 'Invalid or expired token.' 
    });
  }

  req.user = decoded;
  next();
}

/**
 * Middleware to require admin role
 */
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ 
      error: 'Admin access required.' 
    });
  }
  next();
}

/**
 * Sanitize user data for response (remove sensitive fields)
 */
export function sanitizeUser(user: AdminUser): Partial<AdminUser> {
  const { passwordHash, loginAttempts, lockedUntil, ...sanitized } = user;
  return sanitized;
}

/**
 * Validate login request
 */
export function validateLoginRequest(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      error: 'Username and password are required.' 
    });
  }

  if (username.length < 3 || username.length > 50) {
    return res.status(400).json({ 
      error: 'Username must be between 3 and 50 characters.' 
    });
  }

  if (password.length < 8 || password.length > 100) {
    return res.status(400).json({ 
      error: 'Password must be between 8 and 100 characters.' 
    });
  }

  next();
}