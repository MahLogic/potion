# Contributing to MahLogic Potion

Thank you for your interest in contributing to **MahLogic Potion**!  
Potion is a Notion-inspired, open-source workspace designed for developers and privacy-focused teams who want to self-host their tools.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Database Management](#database-management)
- [Coding Guidelines](#coding-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)
- [Areas of Contribution](#areas-of-contribution)
- [Community](#community)
- [Need Help?](#need-help)

---

## Getting Started

1. **Fork the Repository**

   - Click the 'Fork' button at the top of this repo
   - Clone your fork locally:
     ```bash
     git clone https://github.com/YOUR-USERNAME/potion.git
     cd potion
     ```

2. **Set Up Development Environment**

   - Install [Bun](https://bun.sh)
   - Run:
     ```bash
     bun install
     cp .env.example .env
     bun docker:up
     bun db:push
     ```

---

## Development Workflow

```bash
# Start database and dev server
bun docker:up
bun dev
```

- Create a new branch:

  ```bash
  git checkout -b feature/your-feature
  ```

- After your changes:

  ```bash
  git add .
  git commit -m "feat: add X feature"
  git push origin your-feature
  ```

- Submit a pull request with full details and screenshots (if UI-related).

---

## Database Management

Potion uses PostgreSQL + Drizzle ORM.

- **Common tasks**:

  ```bash
  bun db:push      # Sync schema
  bun db:generate  # Create migration files
  bun db:migrate   # Apply migrations
  bun db:studio    # View/edit data
  ```

- Database schema lives in `packages/db/src/`.

---

## Coding Guidelines

### General

- Clean, readable, maintainable TypeScript
- No `any` types — use clear interfaces
- Comment only when necessary (write self-explanatory code)

### TypeScript

- Always prefer explicit types
- Async/await > Promises
- Strict null checks

### React

- Use functional components + hooks
- Keep components small and reusable
- Use Tailwind for styling

---

## Testing

- Write unit tests for core logic
- Add integration tests for full workflows
- Ensure no breaking changes
- Manual UI testing is appreciated

---

## Documentation

- Update `README.md` and relevant docs if your change affects setup or usage
- Add JSDoc or inline comments for complex logic

---

## Areas of Contribution

- ✨ New Features
- 🐛 Bug Fixes
- 🎨 UI Improvements
- 🔒 Security (coming soon)
- ⚡ Performance
- 📝 Docs (coming soon)
- 🧪 Tests (coming soon)
- 🔌 Plugin System (coming soon)

---

## Community

- Open discussions in GitHub Issues
- Respect other contributors
- Help review pull requests if you're experienced

---

## Need Help?

If you're stuck or unsure:

1. Check existing issues or open a new one
2. Ping @kellymahalngu on X/Twitter
3. We’re building this together — don’t hesitate to ask!

---

Thank you for contributing to **MahLogic Potion**!
Your support makes open-source possible. 🧪🚀
