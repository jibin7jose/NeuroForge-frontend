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
- PowerShell (current session): `$env:SKIP_PRE_PUSH_CHECKS=1`
- PowerShell (single push): `$env:SKIP_PRE_PUSH_CHECKS=1; git push`
- CMD (single push): `set SKIP_PRE_PUSH_CHECKS=1 && git push`
- Bash (single push): `SKIP_PRE_PUSH_CHECKS=1 git push`

To unset the bypass variable:
- PowerShell: `Remove-Item Env:SKIP_PRE_PUSH_CHECKS -ErrorAction SilentlyContinue`
- CMD: `set SKIP_PRE_PUSH_CHECKS=`
- Bash: `unset SKIP_PRE_PUSH_CHECKS`

## CI

GitHub Actions workflow:
- `.github/workflows/ci.yml`

Runs on push/PR to `master` and executes build checks.
