# Quick Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation Steps

1. Navigate to the project directory:
```bash
cd hr-workflow-designer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to: **http://localhost:5173**

## Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Project Status

✅ All features implemented and working
- Drag-and-drop workflow canvas
- 5 custom node types with configuration forms
- Mock API integration
- Workflow simulator with validation
- Export/Import functionality

## Quick Test

1. Drag a "Start Node" from the sidebar to the canvas
2. Drag a "Task Node" and connect them
3. Click on each node to configure it
4. Click "Run Simulation" to test the workflow

## Troubleshooting

If you encounter issues:

1. Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Make sure you're using Node.js v18+:
```bash
node --version
```

3. Check if port 5173 is available

## Tech Stack

- React 18 + TypeScript + Vite
- React Flow (@xyflow/react)
- Zustand (state management)
- MSW (Mock Service Worker)
- Tailwind CSS
- Lucide React (icons)

For detailed documentation, see [README.md](./README.md)
