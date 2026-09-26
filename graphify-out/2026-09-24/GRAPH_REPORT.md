# Graph Report - react-app  (2026-09-21)

## Corpus Check
- 13 files · ~12,034 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 101 nodes · 107 edges · 11 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- dependencies
- devDependencies
- Topography.jsx
- components.json
- package.json
- .oxlintrc.json
- aliases
- tailwind
- compilerOptions
- React + Vite

## God Nodes (most connected - your core abstractions)
1. `tailwind` - 6 edges
2. `aliases` - 6 edges
3. `react` - 5 edges
4. `scripts` - 5 edges
5. `Topography()` - 5 edges
6. `plugins` - 3 edges
7. `rules` - 3 edges
8. `compilerOptions` - 3 edges
9. `Projects` - 3 edges
10. `React + Vite` - 3 edges

## Surprising Connections (you probably didn't know these)
- `plugins` --extends--> `react`  [EXTRACTED]
  .oxlintrc.json → .oxlintrc.json  _Bridges community 5 → community 2_

## Import Cycles
- None detected.

## Communities (11 total, 0 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.10
Nodes (21): @base-ui/react, class-variance-authority, cn, @fontsource-variable/geist, lucide-react, ogl, dependencies, @base-ui/react (+13 more)

### Community 1 - "devDependencies"
Cohesion: 0.13
Nodes (15): oxlint, devDependencies, oxlint, tailwindcss, @tailwindcss/vite, @types/react, @types/react-dom, vite (+7 more)

### Community 2 - "Topography.jsx"
Cohesion: 0.25
Nodes (9): react, App(), Projects, colorModeToFloat(), CTRL_INDICES, ctxMap, hexToRgb(), Topography() (+1 more)

### Community 3 - "components.json"
Cohesion: 0.18
Nodes (10): iconLibrary, menuAccent, menuColor, registries, @react-bits, rsc, rtl, $schema (+2 more)

### Community 4 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 5 - ".oxlintrc.json"
Cohesion: 0.25
Nodes (7): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema, oxc, warn

### Community 6 - "aliases"
Cohesion: 0.33
Nodes (6): aliases, components, hooks, lib, ui, utils

### Community 7 - "tailwind"
Cohesion: 0.33
Nodes (6): tailwind, baseColor, config, css, cssVariables, prefix

### Community 8 - "compilerOptions"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, paths

### Community 9 - "React + Vite"
Cohesion: 0.50
Nodes (3): Expanding the Oxlint configuration, React Compiler, React + Vite

## Knowledge Gaps
- **54 isolated node(s):** `$schema`, `oxc`, `react/rules-of-hooks`, `warn`, `$schema` (+49 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **What connects `$schema`, `oxc`, `react/rules-of-hooks` to the rest of the system?**
  _54 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._