import { Sidebar } from './components/Canvas/Sidebar';
import { WorkflowCanvas } from './components/Canvas/WorkflowCanvas';
import { SimulatorModal } from './components/TestPanel/SimulatorModal';
import { useSimulatorStore } from './hooks/useSimulatorStore';
import { useWorkflowStore } from './hooks/useWorkflowStore';
import {
  StartNodeForm,
  TaskNodeForm,
  ApprovalNodeForm,
  AutomatedStepNodeForm,
  EndNodeForm,
} from './components/Forms';
import { Download, Upload, Trash2, Play } from 'lucide-react';

function App() {
  const selectedNode = useWorkflowStore((state) => state.selectedNode);
  const setSelectedNode = useWorkflowStore((state) => state.setSelectedNode);
  const clearWorkflow = useWorkflowStore((state) => state.clearWorkflow);
  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const loadWorkflow = useWorkflowStore((state) => state.loadWorkflow);
  const hasWorkflow = nodes.length > 0;
  const startRun = useSimulatorStore((s) => s.startRun);

  const exportWorkflow = () => {
    const workflow = { nodes, edges };
    const dataStr = JSON.stringify(workflow, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workflow.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importWorkflow = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const workflow = JSON.parse(event.target?.result as string);
            loadWorkflow(workflow.nodes, workflow.edges);
          } catch {
            alert('Invalid workflow file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const renderNodeForm = () => {
    if (!selectedNode) return null;

    const commonProps = {
      nodeId: selectedNode.id,
      onClose: () => setSelectedNode(null),
    };

    switch (selectedNode.data.type) {
      case 'start':
        return <StartNodeForm {...commonProps} data={selectedNode.data} />;
      case 'task':
        return <TaskNodeForm {...commonProps} data={selectedNode.data} />;
      case 'approval':
        return <ApprovalNodeForm {...commonProps} data={selectedNode.data} />;
      case 'automated':
        return <AutomatedStepNodeForm {...commonProps} data={selectedNode.data} />;
      case 'end':
        return <EndNodeForm {...commonProps} data={selectedNode.data} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 py-2 bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm">
        <div className="max-w-8xl mx-auto px-6 py-3 flex items-center justify-between gap-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-white/15 border border-white/20 rounded-2xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                HR Workflow Designer
              </h1>
              <p className="text-sm text-white/80 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                Design and test internal HR workflows
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white rounded-lg border border-white/20">
              <span className="text-sm font-semibold">Nodes {nodes.length} / Edges {edges.length}</span>
            </div>
            <button
              onClick={() => startRun()}
              className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 border border-white/30 rounded-lg text-sm font-medium text-white shadow-sm transition-all"
              title="Run Simulator"
            >
              <Play className="w-4 h-4" />
              Run Simulator
            </button>
            <button
              onClick={importWorkflow}
              className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 border border-white/30 rounded-lg text-sm font-medium text-white shadow-sm transition-all"
              title="Import Workflow"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button
              onClick={exportWorkflow}
              disabled={!hasWorkflow}
              className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 border border-white/30 rounded-lg text-sm font-medium text-white shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              title="Export Workflow"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={clearWorkflow}
              disabled={!hasWorkflow}
              className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 border border-white/30 rounded-lg text-sm font-medium text-white shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              title="Clear Workflow"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4 h-[calc(100vh-88px)]">
          <div className="flex flex-1 min-h-0 gap-4">
            {/* Sidebar */}
            <Sidebar />

            {/* Canvas */}
            <div className="flex-1 flex flex-col gap-4 min-h-0">
              <WorkflowCanvas />
              <SimulatorModal />
            </div>

            {/* Node Configuration Panel */}
            {selectedNode && renderNodeForm()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
