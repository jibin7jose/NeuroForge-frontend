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

## Quality Gates

```bash
npm run quality:gates
```

## Hooks and CI

- Local hooks:
  - `post-commit` auto-pushes current branch (set `SKIP_POST_COMMIT_PUSH=1` to bypass)
  - `pre-push` runs `npm run quality:gates` (set `SKIP_PRE_PUSH_CHECKS=1` to bypass)
- Hook setup:
  - PowerShell: `powershell -ExecutionPolicy Bypass -File scripts/setup-hooks.ps1`
  - Shell: `sh scripts/setup-hooks.sh`
- CI workflow: `.github/workflows/ci.yml`

For full contributor workflow, see `CONTRIBUTING.md`.
