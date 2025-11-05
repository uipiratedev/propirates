# Propirates

A modern web application built with Angular 20 and organized as an Nx monorepo.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:4200/
```

## 📦 Tech Stack

- **Framework:** Angular 20 (standalone components)
- **Build Tool:** Nx 22.x (monorepo)
- **Styling:** Tailwind CSS v3.4
- **Testing:** Jest + Cypress
- **Language:** TypeScript (strict mode)

## 🎯 Key Features

- ✅ Monorepo architecture with Nx
- ✅ Role-based access control (RBAC)
- ✅ Centralized logging system
- ✅ HTTP interceptors for auth and error handling
- ✅ Runtime configuration management
- ✅ Lazy-loaded routes
- ✅ Responsive design with Tailwind CSS

## 📚 Documentation

- **[Developer Guide](./DEVELOPER_GUIDE.md)** - Complete development guide
- **[Quick Reference](./QUICK_REFERENCE.md)** - Command cheat sheet
- **[Contributing](./CONTRIBUTING.md)** - Contribution guidelines

## 🛠️ Essential Commands

```bash
npm start                    # Start dev server
npm run build               # Production build
npm test                    # Run tests
npm run lint                # Lint code
```

## 📁 Project Structure

```
propirates/
├── apps/
│   └── public-web/         # Public-facing web app
├── libs/
│   ├── core/              # Core libraries (auth, api, logging, config)
│   ├── shared/            # Shared UI and utilities
│   └── domains/           # Domain-specific features
└── ...
```

## 🚀 Deployment

The project is configured for deployment to Vercel:

```bash
vercel --prod
```

Build output: `dist/apps/public-web/browser/`

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

[Add your license here]

---

**For detailed development instructions, see [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)**
