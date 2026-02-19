# Contributing

## Setup

1. Install dependencies:
   - `npm ci`
2. Configure local hooks:
   - PowerShell: `powershell -ExecutionPolicy Bypass -File scripts/setup-hooks.ps1`
   - Shell: `sh scripts/setup-hooks.sh`

## Local quality gates

- `post-commit` hook auto-pushes to current branch.
- `pre-push` hook runs:
  - `npm run -s build`

To bypass pre-push checks for an emergency push:
- PowerShell: `$env:SKIP_PRE_PUSH_CHECKS=1`
- Shell: `export SKIP_PRE_PUSH_CHECKS=1`

## CI

GitHub Actions workflow:
- `.github/workflows/ci.yml`

Runs on push/PR to `master` and executes build checks.
