# React + Vite + TypeScript Frontend

This is a **React frontend project** built with **Vite** and **TypeScript**, containerized with **Docker**, and served via **Nginx**.

---

## Project Structure

```
./
├── docker-compose.yml         # Docker Compose configuration
├── Dockerfile                 # Docker image build instructions
├── eslint.config.js           # ESLint configuration (flat config)
├── index.html                 # Entry HTML for Vite
├── nginx.conf                 # Nginx server configuration
├── package.json               # NPM/Yarn dependencies & scripts
├── package-lock.json          # Lockfile for reproducible installs
├── public/                    # Static assets served as-is
│   ├── background.png
│   └── vite.svg
├── README.md                  # Project documentation
├── src/                       # Source code
│   ├── ai_data/               # AI datasets / resources
│   ├── api/                   # API request functions
│   ├── App.css                # Root component styles
│   ├── App.tsx                # Root React component
│   ├── assets/                # Images, fonts, icons
│   ├── components/            # Reusable React components
│   ├── contexts/              # React Context providers
│   ├── data.json              # Sample or mock data
│   ├── hooks/                 # Custom React hooks
│   ├── index.css              # Global styles
│   ├── main.tsx               # React entry point
│   ├── pages/                 # Route/page components
│   ├── store/                 # State management (Redux/Zustand)
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility/helper functions
│   └── vite-env.d.ts          # Vite TypeScript environment definitions
├── tsconfig.app.json          # TypeScript config for app
├── tsconfig.json              # Base TypeScript config
├── tsconfig.node.json         # TS config for Node (Vite tooling)
└── vite.config.ts             # Vite configuration
```

---

## Getting Started

### 1. Install dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 2. Run development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view in your browser.

### 3. Build for production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` folder.

### 4. Run with Docker

```bash
# Build the Docker image
docker build -t my-frontend .

# Run container
docker run -p 80:80 my-frontend
```

### 5. Using Docker Compose

```bash
docker-compose up --build
```

---

## ESLint

This project uses **TypeScript-aware ESLint** with React hooks rules.
To lint your code:

```bash
npx eslint "src/**/*.{ts,tsx}" --fix
```

---

## Features / Conventions

* **React + TypeScript** for type-safe frontend development.
* **Vite** for fast builds & HMR (Hot Module Replacement).
* **Docker + Nginx** for containerized production deployment.
* **ESLint + Prettier** for code quality and consistent style.
* **Project structure** organized by features (components, pages, hooks, utils, etc.).

---

## Notes

* SPA routing is handled by React Router (fallback served via `nginx.conf`).
* Static assets in `public/` are copied as-is to the build folder.
* Use `tsconfig.eslint.json` (if created) for type-aware linting without affecting build config.

---

## References

* [Vite Documentation](https://vitejs.dev/)
* [React Documentation](https://reactjs.org/)
* [TypeScript Documentation](https://www.typescriptlang.org/)
* [typescript-eslint](https://typescript-eslint.io/)
* [Nginx Docs](https://nginx.org/en/docs/)
