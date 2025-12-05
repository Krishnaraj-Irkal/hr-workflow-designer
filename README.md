# HR Workflow Designer

A visual workflow designer module for creating and testing internal HR workflows such as onboarding, leave approval, and document verification.

## 📋 Overview

This project is a functional prototype that demonstrates:

- Deep knowledge of React and React Flow
- Modular, scalable front-end architecture
- Mock API integration with MSW
- Configurable nodes with custom edit forms
- Workflow simulation and testing capabilities

## 🚀 Features

### 1. **Visual Workflow Canvas**
- Drag-and-drop interface built with React Flow
- 5 node types: Start, Task, Approval, Automated Step, and End
- Connect nodes with edges to create workflow paths
- Delete nodes and edges with keyboard shortcuts
- Visual feedback with mini-map and background grid

### 2. **Node Types**

- **Start Node**: Workflow entry point with optional metadata
- **Task Node**: Human tasks with assignee, due date, and custom fields
- **Approval Node**: Approval steps with configurable approver roles
- **Automated Step Node**: System actions fetched from mock API (send email, generate document, etc.)
- **End Node**: Workflow completion with optional summary

### 3. **Dynamic Node Configuration Forms**
- Click any node to open its configuration panel
- Form fields dynamically adjust based on node type
- Real-time updates to node data
- Validation for required fields
- Support for metadata and custom fields

### 4. **Mock API Integration**
- `GET /api/automations` - Fetches available automation actions
- `POST /api/simulate` - Simulates workflow execution
- Powered by Mock Service Worker (MSW)

### 5. **Workflow Simulator**
- Test workflows before deployment
- Validates workflow structure (start/end nodes, connections)
- Step-by-step execution visualization
- Error reporting for invalid workflows

### 6. **Export/Import**
- Export workflows as JSON
- Import previously saved workflows
- Clear canvas to start fresh

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Workflow Canvas**: React Flow (@xyflow/react)
- **State Management**: Zustand
- **Mock API**: Mock Service Worker (MSW)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
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

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

### Creating a Workflow

1. **Add Nodes**: Drag node types from the left sidebar onto the canvas
2. **Connect Nodes**: Click and drag from a node's handle to another node
3. **Configure Nodes**: Click on any node to open its configuration panel
4. **Edit Properties**: Fill in the node details in the right panel
5. **Save Changes**: Click "Save" to apply configuration changes

### Testing a Workflow

1. Build your workflow on the canvas
2. Click "Run Simulation" in the Simulator panel at the bottom
3. Review the validation results and execution steps
4. Fix any errors highlighted by the simulator

### Export/Import

- **Export**: Click the "Export" button to download your workflow as JSON
- **Import**: Click the "Import" button to load a saved workflow
- **Clear**: Click "Clear" to remove all nodes and start over

## 🏗️ Architecture

### Folder Structure

```
src/
├── components/
│   ├── Canvas/
│   │   ├── WorkflowCanvas.tsx    # Main React Flow canvas
│   │   └── Sidebar.tsx           # Draggable node sidebar
│   ├── Nodes/                    # Custom node components
│   │   ├── StartNode.tsx
│   │   ├── TaskNode.tsx
│   │   ├── ApprovalNode.tsx
│   │   ├── AutomatedStepNode.tsx
│   │   └── EndNode.tsx
│   ├── Forms/                    # Node configuration forms
│   │   ├── StartNodeForm.tsx
│   │   ├── TaskNodeForm.tsx
│   │   ├── ApprovalNodeForm.tsx
│   │   ├── AutomatedStepNodeForm.tsx
│   │   └── EndNodeForm.tsx
│   └── TestPanel/
│       └── WorkflowSimulator.tsx # Workflow testing interface
├── hooks/
│   ├── useWorkflowStore.ts       # Zustand store for state
│   └── useAutomations.ts         # Hook for fetching automations
├── api/
│   ├── mocks.ts                  # Mock data and simulation logic
│   ├── handlers.ts               # MSW request handlers
│   └── browser.ts                # MSW worker setup
├── types/
│   └── workflow.types.ts         # TypeScript interfaces
└── utils/                        # Utility functions (future)
```

### Key Design Decisions

#### 1. **State Management with Zustand**
- Lightweight and performant
- Simple API without boilerplate
- Perfect for medium-sized applications
- Centralized workflow state

#### 2. **React Flow for Canvas**
- Industry-standard workflow visualization library
- Built-in drag-and-drop, zoom, and pan
- Customizable nodes and edges
- Excellent TypeScript support

#### 3. **MSW for API Mocking**
- Intercepts network requests at service worker level
- Realistic API simulation
- No backend required for prototype
- Easy to replace with real API later

#### 4. **TypeScript Throughout**
- Type-safe node data structures
- Better IDE autocomplete
- Catch errors at compile time
- Self-documenting code

#### 5. **Component Composition**
- Each node type is a separate component
- Forms are modular and reusable
- Easy to add new node types
- Clear separation of concerns

## 🎨 Design Patterns

### Custom Hook Pattern
```typescript
const useAutomations = () => {
  // Encapsulates API fetching logic
  // Returns loading state and data
}
```

### Controlled Components
All forms use controlled inputs with local state, then update global state on save.

### Type Discrimination
Union types with discriminated `type` field ensure type safety across node types.

## 🔄 Workflow Validation

The simulator validates:
- Exactly one Start Node exists
- At least one End Node exists
- No disconnected nodes (except single-node workflows)
- Valid connections between nodes

## 🚧 What I Completed

✅ Full React Flow canvas with drag-and-drop
✅ All 5 node types with custom designs
✅ Dynamic configuration forms for each node
✅ Mock API with MSW
✅ Workflow simulator with validation
✅ Export/Import functionality
✅ TypeScript types throughout
✅ Responsive UI with Tailwind CSS

## 📈 Future Enhancements (Given More Time)

- **Undo/Redo**: Command pattern for action history
- **Node Templates**: Pre-configured node patterns
- **Auto-layout**: Automatic node positioning
- **Conditional Branching**: Decision nodes with if/else logic
- **Node Versioning**: Track changes to node configurations
- **Workflow Validation Rules**: Custom validation per workflow type
- **Real-time Collaboration**: Multi-user editing
- **Workflow Analytics**: Execution metrics and reporting
- **Dark Mode**: Theme switcher
- **Keyboard Shortcuts**: Productivity enhancements
- **Node Search**: Find nodes by name/type
- **Zoom to Fit**: Auto-fit workflow to canvas

## 🐛 Known Limitations

- No authentication/authorization (not required per spec)
- No backend persistence (prototype uses local state)
- Simulation is mock-based, not actual workflow execution
- No cycle detection in workflows
- Limited error handling for edge cases

## 🧪 Testing Approach

For production, I would add:
- Unit tests for components with React Testing Library
- Integration tests for workflow simulation
- E2E tests with Playwright/Cypress
- Visual regression tests for nodes

## 💡 Assumptions

1. Workflows are acyclic (no loops)
2. One start node per workflow
3. Nodes can have multiple incoming/outgoing connections
4. Simulation is synchronous (no actual API calls)
5. Browser support: Modern evergreen browsers

## 📝 Notes

- This prototype is optimized for clarity and extensibility
- Code is production-ready in structure but would need hardening for real use
- Focus was on architecture and functionality over pixel-perfect design
- MSW provides realistic API mocking without backend dependency

## 👤 Developer Notes

Developed with a focus on:
- Clean code architecture
- Type safety
- Scalability
- Developer experience
- Code maintainability

Time invested: ~4-5 hours

---

## 📄 License

This project is created as part of a technical assessment.

## 🤝 Contact

For questions or feedback about this implementation, please reach out to the development team.
