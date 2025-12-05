import { useState } from 'react';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import type { SimulationResult } from '../../types/workflow.types';
import { Play, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

export const WorkflowSimulator = () => {
  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateWorkflow = async () => {
    setIsSimulating(true);
    setResult(null);

    try {
      const workflow = { nodes, edges };
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workflow),
      });

      const data: SimulationResult = await response.json();
      setResult(data);
    } catch (_error) {
      setResult({
        success: false,
        steps: [],
        errors: ['Failed to simulate workflow. Please try again.'],
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 h-80 flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Workflow Simulator</h3>
          <p className="text-sm text-gray-500">Validate structure and preview execution before shipping.</p>
        </div>
        <button
          onClick={simulateWorkflow}
          disabled={isSimulating || nodes.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-[#2d75e8] text-white rounded-lg hover:bg-[#2666ca] disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed shadow-sm"
        >
          <Play className="w-4 h-4" />
          {isSimulating ? 'Simulating...' : 'Run Simulation'}
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
          Nodes: {nodes.length}
        </span>
        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
          Edges: {edges.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {nodes.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center space-y-2">
              <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p className="text-gray-500">Add nodes to the canvas to simulate a workflow</p>
              <p className="text-xs text-gray-500">Tip: start with Start + Task + End to see the happy path.</p>
            </div>
          </div>
        )}

        {isSimulating && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-2 text-blue-500 animate-spin" />
              <p className="text-gray-600">Simulating workflow...</p>
            </div>
          </div>
        )}

        {result && !isSimulating && (
          <div className="space-y-4">
            {result.errors && result.errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-900 mb-2">Validation Errors</h4>
                    <ul className="space-y-1">
                      {result.errors.map((error, index) => (
                        <li key={index} className="text-sm text-red-700">
                          - {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {result.success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-green-900">
                    Workflow simulation completed successfully!
                  </span>
                </div>
              </div>
            )}

            {result.steps && result.steps.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Execution Steps:</h4>
                <div className="space-y-2">
                  {result.steps.map((step, index) => (
                    <div
                      key={step.nodeId}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{step.nodeTitle}</div>
                        <div className="text-xs text-gray-600 mt-1">{step.message}</div>
                        {step.timestamp && (
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(step.timestamp).toLocaleTimeString()}
                          </div>
                        )}
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.success && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Workflow Summary</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>- Total nodes: {nodes.length}</p>
                  <p>- Total connections: {edges.length}</p>
                  <p>- Execution steps: {result.steps.length}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
