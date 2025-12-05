import { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type NodeTypes,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import {
  StartNode,
  TaskNode,
  ApprovalNode,
  AutomatedStepNode,
  EndNode,
} from '../Nodes';
import type { WorkflowNodeData } from '../../types/workflow.types';

const nodeTypes: NodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedStepNode,
  end: EndNode,
};

const WorkflowCanvasInner = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const onNodesChange = useWorkflowStore((state) => state.onNodesChange);
  const onEdgesChange = useWorkflowStore((state) => state.onEdgesChange);
  const onConnect = useWorkflowStore((state) => state.onConnect);
  const addNode = useWorkflowStore((state) => state.addNode);
  const setSelectedNode = useWorkflowStore((state) => state.setSelectedNode);
  const hasNodes = nodes.length > 0;

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const nodeId = `${type}-${Date.now()}`;

      let nodeData: WorkflowNodeData;

      switch (type) {
        case 'start':
          nodeData = {
            label: 'Start',
            type: 'start',
            title: 'Start',
            metadata: {},
          };
          break;
        case 'task':
          nodeData = {
            label: 'Task',
            type: 'task',
            title: 'New Task',
            description: '',
            assignee: '',
            dueDate: '',
            customFields: {},
          };
          break;
        case 'approval':
          nodeData = {
            label: 'Approval',
            type: 'approval',
            title: 'Approval Required',
            approverRole: '',
            autoApproveThreshold: undefined,
          };
          break;
        case 'automated':
          nodeData = {
            label: 'Automated',
            type: 'automated',
            title: 'Automated Action',
            actionId: '',
            actionLabel: '',
            parameters: {},
          };
          break;
        case 'end':
          nodeData = {
            label: 'End',
            type: 'end',
            endMessage: 'Workflow Complete',
            showSummary: false,
          };
          break;
        default:
          return;
      }

      const newNode = {
        id: nodeId,
        type,
        position,
        data: nodeData,
      };

      addNode(newNode);
    },
    [screenToFlowPosition, addNode]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: any) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  return (
    <div ref={reactFlowWrapper} className="flex-1 h-full min-h-[420px] relative rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
      {!hasNodes && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center space-y-2 max-w-md">
            <p className="text-sm font-semibold text-[#3b7ad9]">Drop nodes here to begin</p>
            <h3 className="text-3xl font-bold text-[#2a5fbf]">Build your flow</h3>
            <p className="text-sm text-gray-600">Drag from the Node Library or import a saved workflow to see it come alive.</p>
          </div>
        </div>
      )}
      <ReactFlow
        className="min-h-full"
        nodes={nodes as any}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode="Delete"
      >
        <Background variant={BackgroundVariant.Dots} gap={14} size={1} />
        <Controls position="bottom-left" className="shadow-sm border border-gray-300 rounded-md bg-white" />
        <MiniMap
          position="bottom-right"
          className="border border-gray-300 shadow-sm bg-white"
          nodeColor={(node) => {
            switch (node.type) {
              case 'start':
                return '#16a34a';
              case 'task':
                return '#2563eb';
              case 'approval':
                return '#7c3aed';
              case 'automated':
                return '#f97316';
              case 'end':
                return '#ef4444';
              default:
                return '#94a3b8';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
};

export const WorkflowCanvas = () => {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner />
    </ReactFlowProvider>
  );
};
