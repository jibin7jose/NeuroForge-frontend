# NeuroForge Frontend

Next.js dashboard for project intelligence, digital twin interview simulation, and readiness insights.

## Requirements

- Node.js 20+
- npm

## Setup

```bash
npm ci
```

## Run

```bash
npm run dev
```

App runs on `http://localhost:3000`.

## Build

```bash
npm run build
```

## Hooks and CI

- Local hooks:
  - `post-commit` auto-pushes current branch
  - `pre-push` runs `npm run -s build`
- Hook setup:
  - PowerShell: `powershell -ExecutionPolicy Bypass -File scripts/setup-hooks.ps1`
  - Shell: `sh scripts/setup-hooks.sh`
- CI workflow: `.github/workflows/ci.yml`

For full contributor workflow, see `CONTRIBUTING.md`.
