# Changelog

All notable changes to TubeBenderReviews.com will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-07

### Added
- Initial release of TubeBenderReviews.com
- Comprehensive tube bender comparison platform
- Expert review system with transparent scoring algorithm
- Advanced filtering and comparison tools
- Total cost of ownership calculator
- Secure admin panel with JWT authentication
- Mobile-responsive design with Tailwind CSS
- SEO optimization with meta tags and structured data
- Professional image management system
- FTC and USPTO compliant legal disclaimers

### Security
- Bcrypt password hashing with 12 rounds
- JWT token authentication with 24-hour expiration
- Rate limiting for login attempts (5 per 15 minutes)
- Account lockout protection (30 minutes after failed attempts)
- Helmet middleware for security headers
- Input validation with Zod schemas
- CORS protection for production environments

### Features
- **Product Database**: 12 tube bender models with detailed specifications
- **Scoring System**: 11-category transparent scoring algorithm
- **Admin Panel**: Full content management capabilities
- **Authentication**: Secure login system with account management
- **Image Management**: Unified image upload and display system
- **Content Editing**: Dynamic content management for reviews and descriptions
- **Contact System**: Spam-proof contact form with verification
- **Legal Compliance**: Comprehensive disclaimers and legal pages

### Technical
- React 18 with TypeScript
- Node.js + Express.js backend
- PostgreSQL database with Drizzle ORM
- Vite for development and production builds
- Radix UI components with shadcn/ui
- TanStack Query for state management
- Wouter for client-side routing

### Deployment
- Apache deployment configuration
- CloudLinux OS compatibility
- GitHub Actions CI/CD pipeline
- Docker containerization support
- Environment variable configuration
- Production build optimization

## [0.9.0] - 2025-07-03

### Added
- Admin authentication system
- Image upload functionality
- Editorial content controls
- Price range management
- Category editor interface

### Fixed
- Admin panel pricing edit functionality
- TypeScript compliance for storage objects
- Scoring algorithm balance issues

## [0.8.0] - 2025-07-02

### Added
- FTC and USPTO compliant legal disclaimers
- Comprehensive contact form with spam protection
- Direct manufacturer contact links
- Apache deployment package

### Removed
- Calculator button from navigation (per requirements)
- Manufacturer affiliation text from footer

## [0.7.0] - 2025-07-01

### Added
- Comprehensive 11-category scoring system
- Visual ranking indicators
- Advanced filtering system
- Immersive hero section with animations
- Category editor for "Best For" descriptions

### Changed
- Converted star ratings to transparent scoring algorithm
- Updated price display format (fractions instead of decimals)
- Improved scoring methodology explanations

### Fixed
- Scoring algorithm balance (113/100 bug resolved)
- Price coloring inconsistencies
- Filter user experience improvements

## [0.6.0] - 2025-07-01

### Added
- Dedicated pages for mandrel, roll, and ram-style benders
- SEO content for different bender types
- Neutral educational content approach

### Removed
- Biased language and opinion-based content
- Synthetic star ratings system

### Changed
- RogueFab bend angle specification to 195 degrees
- Price range clarification for included/separate components

## [0.5.0] - 2025-07-01

### Added
- Initial tube bender comparison platform
- Basic product database
- Comparison table functionality
- Price breakdown system

### Security
- Input validation
- Basic authentication framework
- Rate limiting implementation

---

## Upcoming Features

### [1.1.0] - Planned
- Advanced analytics dashboard
- User review system
- Email notification system
- API rate limiting improvements
- Performance optimizations

### [1.2.0] - Planned
- Multi-language support
- Enhanced search functionality
- Advanced filtering options
- Mobile app development
- Integration with manufacturer APIs

---

**Note**: This changelog follows the [Keep a Changelog](https://keepachangelog.com/) format to provide clear, structured information about changes in each version.