## Summary

- What changed and why

## Validation

- [ ] `npm run build`
- [ ] Manual UI check on:
  - [ ] `/`
  - [ ] `/dashboard`
  - [ ] `/dashboard/intelligence`
  - [ ] `/dashboard/digital-twin`

## Contract / UX Impact

- [ ] No backend contract dependency
- [ ] Uses backend/ai-engine contracts and compatibility verified
- [ ] UX copy/states updated for loading, empty, and error cases

## Checklist

- [ ] Hook setup still valid (`scripts/setup-hooks.ps1` / `scripts/setup-hooks.sh`)
- [ ] CI workflow still green (`.github/workflows/ci.yml`)
- [ ] Docs updated when behavior changed
