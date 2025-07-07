# Deployment Guide

This guide covers various deployment options for TubeBenderReviews.com.

## Quick Start

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/tubebenderreviews

# Authentication
JWT_SECRET=your-256-bit-secret-key-here

# Server Configuration
NODE_ENV=production
PORT=5000

# Admin Setup (for initial deployment)
ADMIN_USERNAME=admin
ADMIN_EMAIL=tbradmin@tubebenderreviews.com
ADMIN_PASSWORD=your-secure-password-here
```

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## Deployment Options

### 1. Traditional VPS/Dedicated Server

#### Prerequisites
- Ubuntu 20.04+ or similar Linux distribution
- Node.js 20+
- PostgreSQL 14+
- Nginx (recommended)
- PM2 (for process management)

#### Setup Steps

1. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js 20
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PostgreSQL
   sudo apt install postgresql postgresql-contrib
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install nginx
   ```

2. **Setup Database**
   ```bash
   # Create database and user
   sudo -u postgres createdb tubebenderreviews
   sudo -u postgres createuser --interactive
   ```

3. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/yourusername/tubebenderreviews.git
   cd tubebenderreviews
   
   # Install dependencies
   npm ci --only=production
   
   # Build application
   npm run build
   
   # Configure environment
   cp .env.example .env
   # Edit .env with your configuration
   
   # Start with PM2
   pm2 start ecosystem.config.js --env production
   pm2 startup
   pm2 save
   ```

4. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/tubebenderreviews
   server {
       listen 80;
       server_name tubebenderreviews.com www.tubebenderreviews.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Enable SSL with Let's Encrypt**
   ```bash
   # Install Certbot
   sudo snap install --classic certbot
   
   # Generate SSL certificate
   sudo certbot --nginx -d tubebenderreviews.com -d www.tubebenderreviews.com
   ```

### 2. Docker Deployment

#### Docker Compose Setup

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/tubebenderreviews
      - JWT_SECRET=your-secret-key
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=tubebenderreviews
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
```

#### Deploy with Docker

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Scale application
docker-compose up -d --scale app=3
```

### 3. Cloud Platform Deployments

#### Railway

1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically on push

#### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Heroku

```bash
# Install Heroku CLI
# Create Heroku app
heroku create tubebenderreviews

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your-secret-key

# Deploy
git push heroku main
```

#### AWS EC2

1. Launch EC2 instance (Ubuntu 20.04)
2. Configure security groups (ports 80, 443, 22)
3. Follow VPS deployment steps above
4. Configure Route 53 for DNS
5. Set up CloudFront for CDN

#### DigitalOcean Droplet

1. Create droplet (Ubuntu 20.04)
2. Add SSH keys
3. Configure firewall
4. Follow VPS deployment steps
5. Set up domain and SSL

### 4. GitHub Actions Deployment

The repository includes GitHub Actions workflows for CI/CD:

#### Required Secrets

Add these secrets to your GitHub repository:

```
DEPLOY_HOST=your-server-ip
DEPLOY_USER=your-server-username
DEPLOY_KEY=your-ssh-private-key
DATABASE_URL=your-production-database-url
JWT_SECRET=your-jwt-secret
```

#### Automatic Deployment

Push to `main` branch triggers automatic deployment:

```bash
git push origin main
```

## Database Migration

### PostgreSQL Setup

```sql
-- Create database
CREATE DATABASE tubebenderreviews;

-- Create user
CREATE USER tbr_user WITH PASSWORD 'secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE tubebenderreviews TO tbr_user;
```

### Migration Commands

```bash
# Push schema changes
npm run db:push

# Generate migration
npm run db:generate

# View database
npm run db:studio
```

## Monitoring and Maintenance

### PM2 Monitoring

```bash
# View running processes
pm2 list

# Monitor logs
pm2 logs

# Monitor performance
pm2 monit

# Restart application
pm2 restart all
```

### Health Checks

The application includes health check endpoints:

```bash
# Basic health check
curl http://localhost:5000/api/health

# Database health check
curl http://localhost:5000/api/health/db
```

### Backup Strategy

```bash
# Database backup
pg_dump tubebenderreviews > backup_$(date +%Y%m%d).sql

# Restore database
psql tubebenderreviews < backup_20250107.sql
```

## SSL/TLS Configuration

### Nginx SSL Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name tubebenderreviews.com;
    
    ssl_certificate /etc/letsencrypt/live/tubebenderreviews.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tubebenderreviews.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Security Considerations

### Firewall Configuration

```bash
# UFW firewall setup
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

### Security Headers

The application includes security headers via Helmet middleware:

- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- X-XSS-Protection

### Rate Limiting

Rate limiting is configured for:
- API endpoints: 100 requests/15 minutes
- Login attempts: 5 attempts/15 minutes
- Account lockout: 30 minutes after 5 failed attempts

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find process using port
   sudo lsof -i :5000
   
   # Kill process
   sudo kill -9 <PID>
   ```

2. **Database Connection Issues**
   ```bash
   # Check PostgreSQL status
   sudo systemctl status postgresql
   
   # Restart PostgreSQL
   sudo systemctl restart postgresql
   ```

3. **Build Failures**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Remove node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

### Log Locations

- Application logs: `pm2 logs`
- Nginx logs: `/var/log/nginx/`
- PostgreSQL logs: `/var/log/postgresql/`

## Performance Optimization

### Database Optimization

```sql
-- Create indexes for better performance
CREATE INDEX idx_tube_benders_brand ON tube_benders(brand);
CREATE INDEX idx_tube_benders_rating ON tube_benders(rating);
```

### Caching Strategy

- Static assets: Nginx caching
- API responses: Redis caching (optional)
- Database queries: Connection pooling

### CDN Setup

Configure CloudFront or similar CDN for static assets:

```javascript
// In production, serve static files from CDN
const staticUrl = process.env.CDN_URL || '/static';
```

## Scaling Considerations

### Horizontal Scaling

```bash
# Run multiple instances with PM2
pm2 start ecosystem.config.js -i max
```

### Load Balancing

```nginx
# Nginx load balancer configuration
upstream app_servers {
    server 127.0.0.1:5000;
    server 127.0.0.1:5001;
    server 127.0.0.1:5002;
}

server {
    location / {
        proxy_pass http://app_servers;
    }
}
```

---

For additional help, consult the [README.md](README.md) or create an issue in the repository.