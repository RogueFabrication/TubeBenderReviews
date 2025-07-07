import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCostCalculationSchema, loginSchema, insertAdminUserSchema } from "@shared/schema";
import { z } from "zod";
import { AuthService, authenticateToken, requireAdmin, sanitizeUser, validateLoginRequest, AuthenticatedRequest } from "./auth";
import rateLimit from "express-rate-limit";

const costCalculationRequestSchema = z.object({
  usage: z.enum(["light", "medium", "heavy"]),
  material: z.enum(["mild-steel", "chromoly", "aluminum", "stainless-steel"]),
  timeline: z.enum(["1-2-years", "3-5-years", "5-plus-years"]),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Security rate limiters
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: {
      error: "Too many login attempts from this IP, please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
      error: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Apply general rate limiting to all routes
  app.use('/api', generalLimiter);

  // Authentication Routes
  app.post("/api/auth/login", loginLimiter, validateLoginRequest, async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find user by username
      const user = await storage.getAdminByUsername(username);
      if (!user) {
        return res.status(401).json({ 
          error: "Invalid username or password." 
        });
      }

      // Check if account is locked
      if (AuthService.isAccountLocked(user)) {
        return res.status(423).json({ 
          error: "Account is temporarily locked due to multiple failed login attempts. Please try again later." 
        });
      }

      // Check if account is active
      if (!user.isActive) {
        return res.status(401).json({ 
          error: "Account is disabled. Please contact administrator." 
        });
      }

      // Verify password
      const isValidPassword = await AuthService.verifyPassword(password, user.passwordHash);
      if (!isValidPassword) {
        // Increment login attempts
        const newAttempts = user.loginAttempts + 1;
        const shouldLock = AuthService.shouldLockAccount(newAttempts);
        const lockedUntil = shouldLock ? AuthService.getLockoutExpiry() : undefined;

        await storage.updateAdminLoginAttempts(user.id, newAttempts, lockedUntil);

        return res.status(401).json({ 
          error: shouldLock 
            ? "Account has been temporarily locked due to multiple failed login attempts."
            : "Invalid username or password." 
        });
      }

      // Successful login - reset attempts and update last login
      await storage.updateAdminLastLogin(user.id, new Date().toISOString());

      // Generate JWT token
      const token = AuthService.generateToken(user);

      // Return sanitized user data and token
      res.json({
        message: "Login successful",
        token,
        user: sanitizeUser(user)
      });

    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ 
        error: "Internal server error during login." 
      });
    }
  });

  // Create initial admin user (only if no admins exist)
  app.post("/api/auth/setup", async (req, res) => {
    try {
      // Check if any admin users already exist
      const existingAdmins = await storage.getAllAdmins();
      if (existingAdmins.length > 0) {
        return res.status(409).json({ 
          error: "Admin user already exists. Setup is not allowed." 
        });
      }

      const { username, email, password } = req.body;

      // Validate input
      if (!username || !email || !password) {
        return res.status(400).json({ 
          error: "Username, email, and password are required." 
        });
      }

      if (password.length < 8) {
        return res.status(400).json({ 
          error: "Password must be at least 8 characters long." 
        });
      }

      // Hash password
      const passwordHash = await AuthService.hashPassword(password);

      // Create admin user
      const admin = await storage.createAdmin({
        username,
        email,
        passwordHash,
        role: "admin",
        isActive: true,
        lastLogin: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        loginAttempts: 0,
        lockedUntil: null,
      });

      res.status(201).json({
        message: "Admin user created successfully",
        user: sanitizeUser(admin)
      });

    } catch (error) {
      console.error("Setup error:", error);
      res.status(500).json({ 
        error: "Internal server error during setup." 
      });
    }
  });

  // Check auth status
  app.get("/api/auth/me", authenticateToken, async (req: AuthenticatedRequest, res) => {
    try {
      const user = await storage.getAdminByUsername(req.user!.username);
      if (!user) {
        return res.status(404).json({ 
          error: "User not found." 
        });
      }

      res.json({
        user: sanitizeUser(user)
      });
    } catch (error) {
      console.error("Auth check error:", error);
      res.status(500).json({ 
        error: "Internal server error." 
      });
    }
  });

  // Logout (client-side token removal, but we can log it server-side)
  app.post("/api/auth/logout", authenticateToken, async (req: AuthenticatedRequest, res) => {
    res.json({ 
      message: "Logout successful" 
    });
  });

  // Get all tube benders
  app.get("/api/tube-benders", async (req, res) => {
    try {
      const tubeBenders = await storage.getTubeBenders();
      res.json(tubeBenders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tube benders" });
    }
  });

  // Get tube bender by ID
  app.get("/api/tube-benders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid tube bender ID" });
      }
      
      const tubeBender = await storage.getTubeBender(id);
      if (!tubeBender) {
        return res.status(404).json({ message: "Tube bender not found" });
      }
      
      res.json(tubeBender);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tube bender" });
    }
  });

  // Get recommended tube benders
  app.get("/api/tube-benders/recommended", async (req, res) => {
    try {
      const recommended = await storage.getRecommendedTubeBenders();
      res.json(recommended);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recommended tube benders" });
    }
  });

  // Get tube benders by category
  app.get("/api/tube-benders/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const tubeBenders = await storage.getTubeBendersByCategory(category);
      res.json(tubeBenders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tube benders by category" });
    }
  });

  // Get tube benders by brand
  app.get("/api/tube-benders/brand/:brand", async (req, res) => {
    try {
      const brand = req.params.brand;
      const tubeBenders = await storage.getTubeBendersByBrand(brand);
      res.json(tubeBenders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tube benders by brand" });
    }
  });

  // Update tube bender (admin)
  app.patch("/api/tube-benders/:id", authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid tube bender ID" });
      }
      
      const updated = await storage.updateTubeBender(id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Tube bender not found" });
      }
      
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update tube bender" });
    }
  });

  // Update admin email
  app.patch("/api/admin/email", authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res) => {
    try {
      const { email } = req.body;
      const adminId = req.user!.id;

      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: "Email is required" });
      }

      const result = await storage.updateAdminEmail(adminId, email);
      if (!result) {
        return res.status(404).json({ message: "Admin not found" });
      }

      res.json({ message: "Email updated successfully", user: sanitizeUser(result) });
    } catch (error) {
      console.error('Error updating admin email:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Health check endpoint
  app.get("/api/health", async (req, res) => {
    try {
      res.json({ 
        status: "healthy", 
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development"
      });
    } catch (error) {
      res.status(500).json({ 
        status: "unhealthy", 
        error: "Health check failed" 
      });
    }
  });

  // Database health check
  app.get("/api/health/db", async (req, res) => {
    try {
      // Simple database connectivity test
      const tubeBenders = await storage.getTubeBenders();
      res.json({ 
        status: "healthy", 
        database: "connected",
        records: tubeBenders.length,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ 
        status: "unhealthy", 
        database: "disconnected",
        error: "Database health check failed" 
      });
    }
  });

  // Calculate total cost of ownership
  app.post("/api/cost-calculator", async (req, res) => {
    try {
      const requestData = costCalculationRequestSchema.parse(req.body);
      
      // Get all tube benders for comparison
      const tubeBenders = await storage.getTubeBenders();
      
      // Calculate costs for each tube bender based on usage patterns
      const calculations = tubeBenders.map(bender => {
        const initialCost = parseFloat(bender.priceRange.replace(/[^0-9]/g, '')) || 1000;
        
        // Calculate maintenance costs based on quality and origin
        let maintenanceCost = 0;
        let supportCost = 0;
        let downtimeCost = 0;
        
        const usageMultiplier = requestData.usage === "light" ? 0.5 : requestData.usage === "medium" ? 1 : 1.5;
        const timelineMultiplier = requestData.timeline === "1-2-years" ? 1 : requestData.timeline === "3-5-years" ? 2 : 3;
        
        // US-made equipment typically has lower long-term costs
        if (bender.countryOfOrigin === "USA") {
          maintenanceCost = initialCost * 0.05 * usageMultiplier * timelineMultiplier;
          supportCost = 100 * timelineMultiplier;
          downtimeCost = 50 * usageMultiplier * timelineMultiplier;
        } else {
          maintenanceCost = initialCost * 0.15 * usageMultiplier * timelineMultiplier;
          supportCost = 300 * timelineMultiplier;
          downtimeCost = 200 * usageMultiplier * timelineMultiplier;
        }
        
        const totalCost = initialCost + maintenanceCost + supportCost + downtimeCost;
        
        return {
          id: bender.id,
          name: bender.name,
          brand: bender.brand,
          initialCost,
          maintenanceCost,
          supportCost,
          downtimeCost,
          totalCost,
          countryOfOrigin: bender.countryOfOrigin,
          supportQuality: bender.supportQuality,
          buildQuality: bender.buildQuality
        };
      });
      
      // Sort by total cost
      calculations.sort((a, b) => a.totalCost - b.totalCost);
      
      res.json({
        request: requestData,
        calculations,
        bestValue: calculations[0],
        savings: calculations[calculations.length - 1].totalCost - calculations[0].totalCost
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to calculate costs" });
    }
  });

  // Get all comparisons
  app.get("/api/comparisons", async (req, res) => {
    try {
      const comparisons = await storage.getComparisons();
      res.json(comparisons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comparisons" });
    }
  });

  // Update tube bender category
  app.patch("/api/tube-benders/:id/category", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid tube bender ID" });
      }

      const { category } = req.body;
      if (!category || typeof category !== "string") {
        return res.status(400).json({ message: "Category is required and must be a string" });
      }

      const updated = await storage.updateTubeBenderCategory(id, category.trim());
      if (!updated) {
        return res.status(404).json({ message: "Tube bender not found" });
      }

      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update tube bender category" });
    }
  });

  // Contact form submission with spam protection
  app.post("/api/contact", async (req, res) => {
    try {
      const {
        name,
        email,
        subject,
        message,
        type,
        honeypot,
        mathAnswer,
        timeSpent,
        fingerprint
      } = req.body;

      // Server-side spam validation
      if (honeypot) {
        return res.status(400).json({ error: "Bot detection triggered" });
      }

      if (timeSpent < 10000) {
        return res.status(400).json({ error: "Form submitted too quickly" });
      }

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      if (message.length < 20) {
        return res.status(400).json({ error: "Message too short" });
      }

      // Check for spam patterns
      const spamPatterns = [
        /\b(viagra|cialis|pharmacy|casino|poker|loan|credit|bitcoin|crypto)\b/i,
        /http[s]?:\/\//g,
        /(.)\1{10,}/g,
      ];

      const allText = `${name} ${email} ${subject} ${message}`;
      for (const pattern of spamPatterns) {
        if (pattern.test(allText)) {
          return res.status(400).json({ error: "Message contains prohibited content" });
        }
      }

      // Simple rate limiting - store in memory for demo
      const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
      const rateLimitKey = `contact_${clientIP}`;
      const now = Date.now();
      
      // Allow 3 submissions per hour per IP
      if (!(global as any).rateLimiter) {
        (global as any).rateLimiter = new Map();
      }
      
      const clientHistory = (global as any).rateLimiter.get(rateLimitKey) || [];
      const recentSubmissions = clientHistory.filter((time: number) => now - time < 3600000); // 1 hour
      
      if (recentSubmissions.length >= 3) {
        return res.status(429).json({ error: "Too many submissions. Please try again later." });
      }
      
      recentSubmissions.push(now);
      (global as any).rateLimiter.set(rateLimitKey, recentSubmissions);

      // Log the contact form submission (in production, this would be saved to database or sent via email)
      console.log('Contact Form Submission:', {
        timestamp: new Date().toISOString(),
        type,
        name,
        email,
        subject,
        messageLength: message.length,
        timeSpent,
        fingerprint,
        ip: clientIP
      });

      res.json({ 
        success: true, 
        message: "Contact form submitted successfully" 
      });

    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
