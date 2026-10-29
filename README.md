# FlowForge

FlowForge is a front-end portfolio project exploring a visual workflow automation experience. Users can create workflows, arrange connected nodes on a canvas, configure steps, and save their work in the browser. The project is being built with a front-end-first approach, with backend capabilities planned as a later stage.

The product vision is to let users describe an automation as a connected flow: receive an event, inspect or transform its data, branch on a condition, and understand what happened at each step. The intended experience brings together a visual editor, node settings, workflow validation, and an execution inspector.

## Features in the current prototype

- **Workflow dashboard:** create workflows, view workflow counts and status filters, and delete workflows.
- **Visual editor:** build a node graph with React Flow. Add Webhook, HTTP, Condition, and Action nodes; move and connect nodes; and select nodes to edit their settings.
- **Node configuration:** edit labels and descriptions, configure webhook details and HTTP requests, define conditions, and set up email action templates.
- **Step-level testing:** test an HTTP request, evaluate a condition, or preview email values against input from a connected node. Results appear in the execution log.
- **Template helpers:** use expressions such as `{{name}}` and `{{customer.email}}` to read values from input data.
- **Responsive interface:** navigate and edit workflows on desktop and mobile layouts.
- **Local persistence:** workflow details, nodes, and connections are saved in the browser's `localStorage` under `flowForgeWorkFlows`.

## Prototype limitations

This is currently a front-end prototype, and workflow data is local to the current browser. There is no server-side database, account system, or cross-device synchronization. Step-level test buttons do not run the entire workflow: email actions validate and preview messages but do not send email, and webhook listening is not connected to a live event service. The dashboard's Import workflow control and several editor controls are visual placeholders. Workflow publishing, scheduling, full workflow validation and execution, and persistent execution history are not implemented.

## Product roadmap

The following items describe the intended direction and are not implemented features:

1. **Editor polish:** deletion, minimap, keyboard shortcuts, and undo/redo.
2. **Workflow validation:** flag missing configuration, invalid connections, and incomplete paths before a run.
3. **Execution engine:** implement a limited, UI-independent runner that passes data between nodes, supports condition branches, reports step states, and handles errors.
4. **Execution inspection:** show each step's input, output, status, error, and duration, with a history of runs.
5. **Backend stage:** when backend development is in scope, add server-side workflow persistence, accounts, and selected integrations. The backend stack has not been selected.

The initial node types are Webhook, HTTP Request, Condition, and Action. The project prioritizes a focused, reliable workflow experience over a large catalog of integrations.

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19 and [TypeScript](https://www.typescriptlang.org/)
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

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000/workflows](http://localhost:3000/workflows) to view the dashboard. Select **New workflow** to open the editor.

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
  workflows/             Workflow dashboard and editor routes
components/
  forms/                  Webhook, HTTP, condition, and action settings
  navigation/             Main navigation
  ui/                     React Flow canvas
  workflow/               Custom nodes and execution log
data/                     Sample data
lib/                      Browser storage and condition/template helpers
style/                    React Flow styling
types/                    Workflow and node TypeScript types
```

## Development direction

Keep workflow rules and execution logic independent from the canvas UI as the project grows. For a portfolio presentation, document the implementation decisions, show a realistic workflow demo, and report tests or performance measurements only after they have been run. See the roadmap above for planned capabilities.
