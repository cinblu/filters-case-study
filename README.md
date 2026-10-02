# Crafting a modular filtering framework: case study

Nahid Noushathu's portfolio case study for the Filters Framework: one filtering pattern for four data-heavy products, now an open-source, agent-ready component system.

- The component itself: https://filter-components-nu.vercel.app ([source](https://github.com/cinblu/filter-components))
- Portfolio: https://nahidnoushathu.framer.website

The interactive pieces use the real component, installed from its registry:

```bash
npx shadcn@latest add https://filter-components-nu.vercel.app/r/filter-bar-tanstack.json
```

## Development

```bash
pnpm install
pnpm dev        # http://localhost:5100
pnpm typecheck
pnpm lint
pnpm build
```
