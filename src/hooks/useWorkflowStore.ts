import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Connection,
  type NodeChange,
  type EdgeChange,
} from '@xyflow/react';
import type { WorkflowNode, WorkflowEdge, WorkflowNodeData } from '../types/workflow.types';

interface WorkflowStore {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNode: WorkflowNode | null;

  // Node operations
  setNodes: (nodes: WorkflowNode[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  addNode: (node: WorkflowNode) => void;
  updateNode: (nodeId: string, data: Partial<WorkflowNodeData>) => void;
  deleteNode: (nodeId: string) => void;

  // Edge operations
  setEdges: (edges: WorkflowEdge[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

  // Selection
  setSelectedNode: (node: WorkflowNode | null) => void;

  // Workflow operations
  clearWorkflow: () => void;
  loadWorkflow: (nodes: WorkflowNode[], edges: WorkflowEdge[]) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,

  setNodes: (nodes) => set({ nodes }),

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as WorkflowNode[],
    });
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  updateNode: (nodeId, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } as WorkflowNodeData }
          : node
      ),
    });

    // Also update selected node if it's the one being updated
    const selected = get().selectedNode;
    if (selected && selected.id === nodeId) {
      set({
        selectedNode: {
          ...selected,
          data: { ...selected.data, ...data } as WorkflowNodeData,
        },
      });
    }
  },

  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
      selectedNode: get().selectedNode?.id === nodeId ? null : get().selectedNode,
    });
  },

  setEdges: (edges) => set({ edges }),

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  setSelectedNode: (node) => set({ selectedNode: node }),

  clearWorkflow: () => {
    set({
      nodes: [],
      edges: [],
      selectedNode: null,
    });
  },

  loadWorkflow: (nodes, edges) => {
    set({
      nodes,
      edges,
      selectedNode: null,
    });
  },
}));
