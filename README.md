# FlowForge — Visual Workflow Builder

FlowForge is a visual workflow builder in progress. It is being developed as a focused front-end project around the core experience of creating and editing node-based workflows.

The current prototype provides an interactive canvas where you can add, move, select, and connect nodes. The longer-term goal is to grow it into a workflow automation product with validation, execution, and run inspection.

## Current prototype

- Interactive workflow canvas built with React Flow (`@xyflow/react`).
- Add nodes from the side panel on desktop or the floating action button on mobile.
- Drag nodes around the canvas and create connections between nodes.
- Select a node to open its inspector panel.
- Responsive editor layout with canvas controls and a dotted background.
- A newly added node is connected to the previously added node.

This is an early UI prototype. Workflow persistence, configurable node properties, validation, workflow execution, authentication, and execution history are planned and are not implemented yet.

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [React Flow](https://reactflow.dev/) (`@xyflow/react`)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Lucide](https://lucide.dev/) icons

## Getting started

### Requirements

- Node.js compatible with the installed Next.js version
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000/workflows](http://localhost:3000/workflows) to view the workflow editor.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project structure

```text
app/
  workflows/       Workflow editor route and canvas styles
  page.tsx         Home route
components/
  ui/Flow.tsx      React Flow canvas and interaction handlers
  navigation/      Navigation components
```

## Product direction

The project is intended to develop toward a compact workflow automation tool. The following are goals, not current features:

1. **Workflow editor:** custom node types, richer editing controls, save and load, and undo/redo.
2. **Node configuration:** typed settings and validation tailored to each node type.
3. **Workflow validation:** detect incomplete or invalid workflows before a run.
4. **Execution engine:** execute a supported set of node types, pass data between steps, and report success or failure.
5. **Execution inspector and history:** inspect step inputs, outputs, errors, and durations, and review previous runs.
6. **Persistence and product experience:** save workflows and provide the surrounding project experience.

The planned direction is to keep workflow rules and execution logic independent from the canvas UI as those capabilities are added.

## Status

FlowForge is under active development. The README describes the current prototype separately from the product direction so planned capabilities are not mistaken for implemented features.
