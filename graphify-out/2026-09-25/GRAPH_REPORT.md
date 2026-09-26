# Graph Report - react-app  (2026-09-25)

## Corpus Check
- 23 files · ~59,217 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 134 nodes · 141 edges · 13 communities
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
- App.jsx
- compilerOptions
- React + Vite
- App.jsx
- 2026-09-25T08-14-41Z__v2-html.md

## God Nodes (most connected - your core abstractions)
1. `AV Design Studio — Contour` - 11 edges
2. `react` - 7 edges
3. `tailwind` - 6 edges
4. `aliases` - 6 edges
5. `scripts` - 5 edges
6. `Topography()` - 5 edges
7. `Topography()` - 4 edges
8. `plugins` - 3 edges
9. `rules` - 3 edges
10. `compilerOptions` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Topography()` --references--> `css`  [EXTRACTED]
  src/v2/Topography.jsx → components.json

## Import Cycles
- None detected.

## Communities (13 total, 0 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.10
Nodes (21): @base-ui/react, class-variance-authority, cn, @fontsource-variable/geist, lucide-react, ogl, dependencies, @base-ui/react (+13 more)

### Community 1 - "devDependencies"
Cohesion: 0.13
Nodes (15): oxlint, devDependencies, oxlint, tailwindcss, @tailwindcss/vite, @types/react, @types/react-dom, vite (+7 more)

### Community 2 - "Topography.jsx"
Cohesion: 0.27
Nodes (7): App(), Projects, colorModeToFloat(), CTRL_INDICES, ctxMap, hexToRgb(), Topography()

### Community 3 - "components.json"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+8 more)

### Community 4 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 5 - ".oxlintrc.json"
Cohesion: 0.25
Nodes (7): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema, oxc, warn

### Community 6 - "aliases"
Cohesion: 0.17
Nodes (11): AV Design Studio — Contour, Colors, Components, Do's and Don'ts, Elevation & Depth, Layout, Motion, Overview (+3 more)

### Community 7 - "App.jsx"
Cohesion: 0.27
Nodes (5): react, App(), COPY_ANNOUNCEMENT, COPY_LABEL, Projects

### Community 8 - "compilerOptions"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, paths

### Community 9 - "React + Vite"
Cohesion: 0.50
Nodes (3): Expanding the Oxlint configuration, React Compiler, React + Vite

### Community 11 - "App.jsx"
Cohesion: 0.20
Nodes (11): tailwind, baseColor, config, css, cssVariables, prefix, colorModeToFloat(), CTRL_INDICES (+3 more)

### Community 12 - "2026-09-25T08-14-41Z__v2-html.md"
Cohesion: 0.22
Nodes (8): Design Health Score, Design Specificity Verdict, Minor Observations, Overall Impression, Persona Red Flags, Priority Issues, Questions to Consider, What's Working

## Knowledge Gaps
- **75 isolated node(s):** `$schema`, `oxc`, `react/rules-of-hooks`, `warn`, `$schema` (+70 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `tailwind` connect `App.jsx` to `components.json`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `react` connect `App.jsx` to `Topography.jsx`, `App.jsx`, `.oxlintrc.json`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `Topography()` connect `App.jsx` to `App.jsx`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **What connects `$schema`, `oxc`, `react/rules-of-hooks` to the rest of the system?**
  _75 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._