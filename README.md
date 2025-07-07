# TubeBenderReviews.com

A comprehensive tube bender comparison platform providing professional-grade insights into industrial equipment analysis, with advanced comparative tools for equipment selection and performance evaluation.

## 🚀 Features

- **Expert Reviews**: Detailed analysis of tube bending equipment with transparent scoring
- **Comparison Engine**: Side-by-side product comparisons with advanced filtering
- **Cost Calculator**: Total cost of ownership analysis based on usage patterns
- **Admin Panel**: Secure content management with authentication
- **Mobile Responsive**: Optimized for all devices
- **SEO Optimized**: Comprehensive search engine optimization

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: Radix UI + Tailwind CSS
- **Authentication**: JWT with bcrypt password hashing
- **Security**: Helmet middleware, rate limiting, input validation

## 📦 Installation

### Prerequisites

- Node.js 20 or higher
- PostgreSQL database (or use in-memory storage for development)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tubebenderreviews.git
cd tubebenderreviews
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/tubebenderreviews

# Authentication
JWT_SECRET=your-secure-jwt-secret-here

# Server Configuration
NODE_ENV=development
PORT=5000

# Admin Setup (for initial deployment)
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=secure-password-here
```

### Database Setup

For PostgreSQL deployment:

1. Create a new database
2. Set the `DATABASE_URL` environment variable
3. Run migrations: `npm run db:push`

For development, the system uses in-memory storage by default.

## 🏗️ Build and Deploy

### Development
```bash
npm run dev          # Start development server
npm run type-check   # Run TypeScript type checking
```

### Production Build
```bash
npm run build        # Build both frontend and backend
npm run start        # Start production server
```

### Deployment Options

#### 1. Traditional VPS/Dedicated Server
```bash
npm run build
npm run start
```

#### 2. Docker Deployment
```bash
docker build -t tubebenderreviews .
docker run -p 5000:5000 tubebenderreviews
```

#### 3. Cloud Platforms
- **Vercel**: `vercel deploy`
- **Netlify**: Connect GitHub repository
- **Railway**: `railway deploy`
- **Heroku**: `git push heroku main`

## 🔐 Security Features

- **Password Security**: Bcrypt hashing with 12 rounds
- **JWT Authentication**: 24-hour token expiration
- **Rate Limiting**: Configurable request limits
- **Account Lockout**: Protection against brute force attacks
- **Security Headers**: Comprehensive Helmet middleware
- **Input Validation**: Zod schema validation
- **CORS Protection**: Configured for production domains

## 📊 Admin Panel

Access the admin panel at `/admin/login` with your configured credentials.

### Features:
- Product management and editing
- Image upload and management
- Content editing (reviews, descriptions)
- User management
- Analytics and reporting

### Initial Setup:
1. Navigate to `/admin/login`
2. Click "First time? Set up admin account"
3. Create your admin credentials
4. Access full admin functionality

## 🎯 SEO and Marketing

The platform is optimized for search engines with:
- Structured data markup
- Optimized meta tags and descriptions
- Fast loading times
- Mobile-first responsive design
- Clean URL structure
- Sitemap generation

## 📈 Performance

- **Frontend**: Vite for fast builds and HMR
- **Backend**: Express.js for optimal performance
- **Database**: Optimized queries with Drizzle ORM
- **Caching**: Built-in response caching
- **Assets**: Optimized images and static files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Email: support@tubebenderreviews.com
- Documentation: See `/docs` folder

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

---

**Built with ❤️ for the metalworking community**