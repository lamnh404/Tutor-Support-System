<div align="center">

# 🚀 React + Vite + TypeScript Frontend

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-Optimized-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/)

**A cutting-edge, production-ready React frontend featuring lightning-fast HMR, enterprise-grade architecture, and containerized deployment.**

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Deployment](#-deployment) • [Documentation](#-documentation)

---

</div>

## ✨ Features

<table>
<tr>
<td width="50%">

### ⚡ Performance
- **Sub-100ms HMR** - Vite-powered instant updates
- **Optimized Builds** - Tree-shaking & code-splitting
- **Lazy Loading** - Route-based code splitting
- **Asset Optimization** - Automatic minification

</td>
<td width="50%">

### 🔒 Type Safety
- **Full TypeScript Coverage** - Strict mode enabled
- **Type-Safe APIs** - End-to-end type checking
- **IntelliSense Support** - Enhanced DX
- **Compile-Time Validation** - Catch errors early

</td>
</tr>
<tr>
<td width="50%">

### 🏗️ Architecture
- **Feature-Based Structure** - Scalable organization
- **State Management** - Redux/Zustand ready
- **Context API** - Efficient global state
- **Custom Hooks** - Reusable logic

</td>
<td width="50%">

### 🐳 DevOps
- **Multi-Stage Docker Builds** - Optimized images
- **Nginx Production Server** - High performance
- **Docker Compose** - Orchestration ready
- **CI/CD Ready** - Easy integration

</td>
</tr>
</table>

---

## 📁 Architecture

```
project-root/
│
├── 📦 Configuration Files
│   ├── docker-compose.yml         # Multi-container orchestration
│   ├── Dockerfile                 # Multi-stage production build
│   ├── nginx.conf                 # SPA-optimized server config
│   ├── vite.config.ts             # Vite build configuration
│   ├── tsconfig.json              # TypeScript base config
│   ├── tsconfig.app.json          # App TypeScript settings
│   ├── tsconfig.node.json         # Node/tooling TS settings
│   ├── eslint.config.js           # Flat config ESLint setup
│   └── package.json               # Dependencies & scripts
│
├── 🌐 Public Assets
│   └── public/                    # Static files (served as-is)
│       ├── background.png
│       └── vite.svg
│
└── 💻 Source Code
    └── src/
        ├── 🤖 ai_data/            # AI/ML datasets & resources
        ├── 🌐 api/                # API client & request handlers
        │   ├── client.ts          # HTTP client configuration
        │   ├── endpoints/         # API endpoint definitions
        │   └── types.ts           # Request/Response types
        │
        ├── 🧩 components/         # Reusable UI components
        │   ├── common/            # Shared components
        │   ├── layout/            # Layout components
        │   └── features/          # Feature-specific components
        │
        ├── 🔄 contexts/           # React Context providers
        │   ├── AuthContext.tsx    # Authentication context
        │   ├── ThemeContext.tsx   # Theme management
        │   └── index.ts           # Context exports
        │
        ├── 🎣 hooks/              # Custom React hooks
        │   ├── useAuth.ts         # Authentication hook
        │   ├── useFetch.ts        # Data fetching hook
        │   └── index.ts           # Hook exports
        │
        ├── 📄 pages/              # Route-level components
        │   ├── Home/              # Home page
        │   ├── Dashboard/         # Dashboard page
        │   └── index.ts           # Page exports
        │
        ├── 🗄️ store/              # State management
        │   ├── index.ts           # Store configuration
        │   ├── slices/            # Redux slices
        │   └── hooks.ts           # Typed hooks
        │
        ├── 📐 types/              # TypeScript definitions
        │   ├── index.ts           # Type exports
        │   ├── models.ts          # Data models
        │   └── api.ts             # API types
        │
        ├── 🛠️ utils/              # Helper functions
        │   ├── format.ts          # Formatters
        │   ├── validation.ts      # Validators
        │   └── constants.ts       # Constants
        │
        ├── 🎨 assets/             # Images, fonts, icons
        ├── 🚀 main.tsx            # Application entry point
        ├── 📱 App.tsx             # Root component
        ├── App.css                # Root styles
        ├── index.css              # Global styles
        └── vite-env.d.ts          # Vite type definitions
```

---

## 🚀 Quick Start

### Prerequisites

```bash
# Required
Node.js >= 18.x
npm >= 9.x (or yarn >= 1.22.x)

# Optional (for Docker)
Docker >= 20.x
Docker Compose >= 2.x
```

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd <project-directory>

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

🎉 **Your app is now running at** [http://localhost:5173](http://localhost:5173)

---

## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🔥 Start development server with HMR |
| `npm run build` | 📦 Create optimized production build |
| `npm run preview` | 👀 Preview production build locally |
| `npm run lint` | 🔍 Run ESLint checks |
| `npm run lint:fix` | 🔧 Auto-fix linting issues |
| `npm run type-check` | ✅ TypeScript type validation |

### Development Workflow

```bash
# Start development with hot reload
npm run dev

# Run type checking (in separate terminal)
npm run type-check -- --watch

# Lint and fix code
npm run lint:fix

# Build for production
npm run build

# Test production build locally
npm run preview
```

### Code Quality

**ESLint Configuration** - TypeScript-aware rules with React hooks validation
```bash
# Run linter
npx eslint "src/**/*.{ts,tsx}"

# Auto-fix issues
npx eslint "src/**/*.{ts,tsx}" --fix
```

**Type Safety** - Strict TypeScript configuration for maximum safety
```bash
# Check types without building
npm run type-check

# Build with type checking
npm run build
```

---

## 🐳 Deployment

### Docker (Production)

#### Standard Docker Build

```bash
# Build optimized production image
docker build -t my-frontend:latest .

# Run container (exposed on port 80)
docker run -d \
  -p 80:80 \
  --name frontend \
  --restart unless-stopped \
  my-frontend:latest
```

#### Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart
```

### Multi-Stage Build Benefits

✅ **Minimal Image Size** - ~20MB with Nginx Alpine  
✅ **No Dev Dependencies** - Production-only packages  
✅ **Optimized Layers** - Smart caching for faster builds  
✅ **Security** - Reduced attack surface  

### Nginx Configuration

The included `nginx.conf` provides:
- ✅ SPA fallback routing (all routes → `index.html`)
- ✅ Gzip compression for assets
- ✅ Cache headers for static files
- ✅ Security headers (CSP, X-Frame-Options, etc.)

---

## 🏗️ Architecture Patterns

### State Management Strategy

```typescript
// Centralized Redux store with TypeScript
src/store/
  ├── index.ts              # Store configuration
  ├── slices/
  │   ├── authSlice.ts      # Authentication state
  │   ├── uiSlice.ts        # UI state
  │   └── dataSlice.ts      # Application data
  └── hooks.ts              # Typed useSelector/useDispatch
```

### API Layer Design

```typescript
// Type-safe API client with interceptors
src/api/
  ├── client.ts             # Axios instance with config
  ├── interceptors.ts       # Request/Response interceptors
  ├── endpoints/
  │   ├── auth.ts           # Authentication endpoints
  │   ├── users.ts          # User management
  │   └── data.ts           # Data endpoints
  └── types.ts              # API types & interfaces
```

### Component Organization

```typescript
// Feature-based component structure
src/components/
  ├── common/               # Shared UI components
  │   ├── Button/
  │   ├── Input/
  │   └── Modal/
  ├── layout/               # Layout components
  │   ├── Header/
  │   ├── Sidebar/
  │   └── Footer/
  └── features/             # Feature-specific components
      ├── Auth/
      ├── Dashboard/
      └── Profile/
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` files for different environments:

```bash
# .env.development
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=My App (Dev)
VITE_ENABLE_ANALYTICS=false

# .env.production
VITE_API_URL=https://api.example.com
VITE_APP_NAME=My App
VITE_ENABLE_ANALYTICS=true
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

### TypeScript Configuration

| File | Purpose |
|------|---------|
| `tsconfig.json` | Base configuration (shared settings) |
| `tsconfig.app.json` | Application code settings |
| `tsconfig.node.json` | Node.js/tooling settings (Vite config) |

### Vite Configuration

Key features in `vite.config.ts`:
- ⚡ Path aliases (`@/` → `src/`)
- 📦 Optimized chunk splitting
- 🔌 Plugin configuration
- 🌐 Proxy for API calls

---

## 📚 Tech Stack

### Core Technologies

<table>
<tr>
<td align="center" width="25%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="48" height="48" alt="React" />
<br><strong>React 18</strong>
<br>UI Library
</td>
<td align="center" width="25%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript" />
<br><strong>TypeScript 5</strong>
<br>Type Safety
</td>
<td align="center" width="25%">
<img src="https://vitejs.dev/logo.svg" width="48" height="48" alt="Vite" />
<br><strong>Vite 5</strong>
<br>Build Tool
</td>
<td align="center" width="25%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" width="48" height="48" alt="Docker" />
<br><strong>Docker</strong>
<br>Containerization
</td>
</tr>
</table>

### Development Tools

- **ESLint** - Linting with TypeScript support
- **TypeScript-ESLint** - Type-aware lint rules
- **React Hooks ESLint** - Hooks validation
- **Vite** - Lightning-fast HMR

### Production Stack

- **Nginx** - High-performance web server
- **Docker Multi-Stage** - Optimized builds
- **Alpine Linux** - Minimal base image

---

## 🤝 Contributing

```bash
# 1. Fork the repository
# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Commit changes
git commit -m 'Add amazing feature'

# 4. Push to branch
git push origin feature/amazing-feature

# 5. Open Pull Request
```

### Code Standards

- ✅ TypeScript strict mode
- ✅ ESLint passing
- ✅ No console.log in production
- ✅ Component documentation
- ✅ Unit tests for utilities

---

## 📖 Documentation

### Additional Resources

- [Vite Documentation](https://vitejs.dev/) - Build tool & configuration
- [React Documentation](https://react.dev/) - React features & patterns
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide
- [typescript-eslint](https://typescript-eslint.io/) - TypeScript linting
- [Nginx Configuration](https://nginx.org/en/docs/) - Server optimization

### Useful Commands

```bash
# Analyze bundle size
npm run build -- --mode analyze

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json && npm install

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with ❤️ using modern web technologies

- React Team for the amazing library
- Vite Team for the blazing-fast tooling
- TypeScript Team for type safety
- Open Source Community for inspiration

---

<div align="center">

**[⬆ Back to Top](#-react--vite--typescript-frontend)**

Made with ⚡ by ProMTP

</div>
