import type { Node, Edge } from '@xyflow/react';

// Node Types
export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

// Base Node Data
export interface BaseNodeData {
  label: string;
  type: NodeType;
}

// Start Node Data
export interface StartNodeData extends BaseNodeData {
  type: 'start';
  title: string;
  metadata?: Record<string, string>;
}

// Task Node Data
export interface TaskNodeData extends BaseNodeData {
  type: 'task';
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields?: Record<string, string>;
}

// Approval Node Data
export interface ApprovalNodeData extends BaseNodeData {
  type: 'approval';
  title: string;
  approverRole: string;
  autoApproveThreshold?: number;
}

// Automated Step Node Data
export interface AutomatedStepNodeData extends BaseNodeData {
  type: 'automated';
  title: string;
  actionId?: string;
  actionLabel?: string;
  parameters?: Record<string, string>;
}

// End Node Data
export interface EndNodeData extends BaseNodeData {
  type: 'end';
  endMessage: string;
  showSummary?: boolean;
}

// Union type for all node data
export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedStepNodeData
  | EndNodeData;

// Workflow Node (extends React Flow Node)
export type WorkflowNode = Node<WorkflowNodeData, string>;

// Workflow Edge
export type WorkflowEdge = Edge;

// Automation Action (from API)
export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

// Simulation Step
export interface SimulationStep {
  nodeId: string;
  nodeTitle: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  message: string;
  timestamp?: string;
}

// Simulation Result
export interface SimulationResult {
  success: boolean;
  steps: SimulationStep[];
  errors?: string[];
}

// Workflow for export/import
export interface WorkflowData {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}
