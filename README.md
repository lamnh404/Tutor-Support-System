<div align="center">

# ⚡ React + Vite + TypeScript

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

<p align="center">
  <strong>Modern React frontend with blazing-fast development and production-ready deployment</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-deployment">Deployment</a>
</p>

</div>

---

## ✨ Features

<table>
<tr>
<td>

⚡ **Lightning Fast**
- Sub-100ms HMR with Vite
- Optimized production builds
- Automatic code splitting

</td>
<td>

🔒 **Type Safe**
- Full TypeScript coverage
- Strict mode enabled
- IntelliSense support

</td>
<td>

🐳 **Deploy Ready**
- Docker multi-stage builds
- Nginx optimized (~20MB)
- CI/CD friendly

</td>
</tr>
</table>

---

## 🚀 Quick Start

```bash
# Install and run
npm install
npm run dev
```

> 🌐 Open [http://localhost:5173](http://localhost:5173)

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | 🔥 Start development server |
| `npm run build` | 📦 Build for production |
| `npm run preview` | 👁️ Preview production build |
| `npm run lint` | ✅ Lint code |
| `npm run type-check` | 🔍 Check TypeScript types |

---

## 📂 Project Structure

```
src/
├── 🔌 api/              # API client & endpoints
├── 🧩 components/       # Reusable UI components
│   ├── common/          # Buttons, Inputs, Modals
│   ├── layout/          # Header, Footer, Sidebar
│   └── features/        # Feature-specific components
├── 🌐 contexts/         # React Context providers
├── 🎣 hooks/            # Custom React hooks
├── 📄 pages/            # Route-level pages
├── 🗄️ store/            # State management
├── 📐 types/            # TypeScript definitions
└── 🛠️ utils/            # Helper functions
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Why? |
|:-----:|:----------:|:-----|
| **UI** | React 18 | Modern, concurrent rendering |
| **Language** | TypeScript 5 | Type safety at scale |
| **Build** | Vite 5 | 10-100x faster than webpack |
| **Deploy** | Docker + Nginx | Production-grade performance |

</div>

---

## 💻 Development

### Environment Variables

```bash
# .env.local
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=My App
```

```typescript
// Usage
const apiUrl = import.meta.env.VITE_API_URL;
```

### Code Quality

- ✅ TypeScript strict mode
- ✅ ESLint with React hooks
- ✅ Pre-commit validation

---

## 🐳 Deployment

### Quick Deploy

```bash
docker-compose up -d --build
```

### Manual Deploy

```bash
# Build image
docker build -t frontend:latest .

# Run container
docker run -d -p 80:80 --name app frontend:latest
```

### What's Included

<div align="center">

| Feature | Status |
|---------|:------:|
| Multi-stage builds | ✅ |
| Gzip compression | ✅ |
| SPA routing | ✅ |
| Security headers | ✅ |
| Asset caching | ✅ |

</div>

---

## 📝 Configuration Files

```
├── vite.config.ts          # Build configuration
├── tsconfig.json           # TypeScript settings
├── nginx.conf              # Web server config
├── Dockerfile              # Container build
└── docker-compose.yml      # Orchestration
```

---

## 🤝 Contributing

```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Commit changes
git commit -m "✨ Add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

**Standards:** TypeScript strict • ESLint passing • Documentation

---

<div align="center">

### 📄 License

MIT Licensed

---

**Built with ⚡ by developers, for developers**

[⬆ Back to Top](#-react--vite--typescript)

</div>
