# GitHub Deployment Instructions

## Quick Setup Guide

### 1. Prepare Repository

Run the deployment preparation script:
```bash
chmod +x deploy-github.sh
./deploy-github.sh
```

This script will:
- Initialize Git repository if needed
- Create `.env.example` file
- Set up PM2 configuration
- Build and test the project
- Stage files for commit

### 2. Create GitHub Repository

1. Create a new repository on GitHub: `https://github.com/new`
2. Repository name: `tubebenderreviews`
3. Description: "Comprehensive tube bender comparison platform"
4. Set to Public or Private as needed
5. Don't initialize with README (we already have one)

### 3. Connect Local Repository to GitHub

```bash
# Add GitHub remote
git remote add origin https://github.com/yourusername/tubebenderreviews.git

# Commit your changes
git add .
git commit -m "Initial deployment setup - TubeBenderReviews.com v1.0.0

- Complete tube bender comparison platform
- React + TypeScript frontend
- Node.js + Express backend
- PostgreSQL database support
- Secure JWT authentication
- Admin panel with image management
- GitHub Actions CI/CD workflows
- Docker deployment support
- Comprehensive documentation"

# Push to GitHub
git push -u origin main
```

### 4. Configure GitHub Secrets

Go to your repository Settings → Secrets and variables → Actions, then add:

#### Required Secrets:
```
DATABASE_URL=postgresql://username:password@host:5432/tubebenderreviews
JWT_SECRET=your-256-bit-secret-key-here
```

#### Optional Deployment Secrets:
```
DEPLOY_HOST=your-server-ip-address
DEPLOY_USER=your-server-username
DEPLOY_KEY=your-ssh-private-key
```

#### Admin Setup Secrets:
```
ADMIN_USERNAME=admin
ADMIN_EMAIL=tbradmin@tubebenderreviews.com
ADMIN_PASSWORD=your-secure-password
```

### 5. GitHub Actions Workflows

The repository includes two workflows:

#### CI Workflow (`.github/workflows/ci.yml`)
- Triggers on push/PR to main and develop branches
- Runs TypeScript type checking
- Builds frontend and backend
- Verifies build artifacts

#### Deploy Workflow (`.github/workflows/deploy.yml`)
- Triggers on push to main branch
- Runs full test suite
- Deploys to production (when configured)

## Deployment Options

### Option 1: Automatic Deployment via GitHub Actions

1. Configure deployment secrets in GitHub
2. Update `.github/workflows/deploy.yml` with your deployment commands
3. Push to main branch triggers automatic deployment

### Option 2: Manual Server Deployment

```bash
# On your server
git clone https://github.com/yourusername/tubebenderreviews.git
cd tubebenderreviews
npm ci --only=production
cp .env.example .env
# Edit .env with your configuration
npm run build
pm2 start ecosystem.config.js --env production
```

### Option 3: Docker Deployment

```bash
# Build and run with Docker
docker build -t tubebenderreviews .
docker run -p 5000:5000 -e DATABASE_URL="your-db-url" tubebenderreviews

# Or use docker-compose
docker-compose up -d
```

### Option 4: Cloud Platform Deployment

#### Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

#### Vercel
```bash
npm i -g vercel
vercel --prod
```

#### Heroku
```bash
heroku create tubebenderreviews
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

## Environment Configuration

### Development (.env.local)
```env
NODE_ENV=development
DATABASE_URL=postgresql://localhost/tubebenderreviews_dev
JWT_SECRET=development-secret-key
PORT=5000
```

### Production (.env)
```env
NODE_ENV=production
DATABASE_URL=postgresql://prod-host/tubebenderreviews
JWT_SECRET=production-256-bit-secret
PORT=5000
ADMIN_USERNAME=admin
ADMIN_EMAIL=tbradmin@tubebenderreviews.com
ADMIN_PASSWORD=secure-production-password
```

## Database Setup

### PostgreSQL Production Setup
```sql
-- Create database
CREATE DATABASE tubebenderreviews;

-- Create user
CREATE USER tbr_user WITH PASSWORD 'secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE tubebenderreviews TO tbr_user;

-- Connect string
DATABASE_URL=postgresql://tbr_user:secure_password@localhost:5432/tubebenderreviews
```

### Database Migration
```bash
# Install dependencies
npm ci

# Push schema to database
npm run db:push

# Verify connection
curl http://localhost:5000/api/health/db
```

## Security Checklist

- [ ] Update default admin password
- [ ] Set strong JWT_SECRET (256-bit)
- [ ] Configure HTTPS/SSL certificates
- [ ] Set up firewall rules
- [ ] Enable database backups
- [ ] Configure monitoring/logging
- [ ] Update environment variables
- [ ] Remove development dependencies in production

## Monitoring and Health Checks

### Health Check Endpoints
```bash
# Basic health check
curl https://tubebenderreviews.com/api/health

# Database health check
curl https://tubebenderreviews.com/api/health/db
```

### PM2 Monitoring
```bash
# View running processes
pm2 list

# View logs
pm2 logs

# Monitor performance
pm2 monit
```

## Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Database Connection Issues**
   - Verify DATABASE_URL format
   - Check network connectivity
   - Ensure database exists
   - Verify user permissions

3. **Authentication Issues**
   - Check JWT_SECRET is set
   - Verify admin credentials
   - Clear browser cookies
   - Check rate limiting

### Logs and Debugging

```bash
# Application logs (PM2)
pm2 logs tubebenderreviews

# Server logs (systemd)
journalctl -u nginx -f

# Database logs
tail -f /var/log/postgresql/postgresql-*.log
```

## Performance Optimization

### Production Optimizations
- Enable gzip compression in Nginx
- Set up CDN for static assets
- Configure database connection pooling
- Enable HTTP/2
- Set proper cache headers

### Scaling Considerations
```bash
# Run multiple instances
pm2 start ecosystem.config.js -i max

# Load balancer configuration
upstream app {
    server 127.0.0.1:5000;
    server 127.0.0.1:5001;
    server 127.0.0.1:5002;
}
```

## Backup Strategy

```bash
# Database backup
pg_dump tubebenderreviews > backup_$(date +%Y%m%d).sql

# Application backup
tar -czf app_backup_$(date +%Y%m%d).tar.gz /path/to/tubebenderreviews

# Automated backup script
0 2 * * * /usr/local/bin/backup_tubebenderreviews.sh
```

## Post-Deployment Checklist

- [ ] Verify application is running
- [ ] Test authentication system
- [ ] Check admin panel access
- [ ] Verify database connectivity
- [ ] Test API endpoints
- [ ] Confirm SSL/HTTPS working
- [ ] Set up monitoring alerts
- [ ] Configure backup schedule
- [ ] Update DNS records
- [ ] Test from different devices/browsers

---

For additional support, see [DEPLOYMENT.md](DEPLOYMENT.md) or create an issue in the repository.