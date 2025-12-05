import type { AutomationAction, SimulationResult, WorkflowData } from '../types/workflow.types';

// Mock automation actions
export const mockAutomationActions: AutomationAction[] = [
  {
    id: 'send_email',
    label: 'Send Email',
    params: ['to', 'subject', 'body'],
  },
  {
    id: 'generate_doc',
    label: 'Generate Document',
    params: ['template', 'recipient'],
  },
  {
    id: 'create_ticket',
    label: 'Create Support Ticket',
    params: ['category', 'priority', 'assignee'],
  },
  {
    id: 'update_database',
    label: 'Update Database Record',
    params: ['table', 'recordId', 'fields'],
  },
  {
    id: 'send_notification',
    label: 'Send Push Notification',
    params: ['userId', 'message', 'priority'],
  },
  {
    id: 'schedule_meeting',
    label: 'Schedule Meeting',
    params: ['attendees', 'duration', 'subject'],
  },
];

// Simulate workflow execution
export const simulateWorkflow = (workflow: WorkflowData): SimulationResult => {
  const { nodes, edges } = workflow;
  const errors: string[] = [];

  // Validation
  const startNodes = nodes.filter((n) => n.data.type === 'start');
  if (startNodes.length === 0) {
    errors.push('Workflow must have at least one Start Node');
  }
  if (startNodes.length > 1) {
    errors.push('Workflow can only have one Start Node');
  }

  const endNodes = nodes.filter((n) => n.data.type === 'end');
  if (endNodes.length === 0) {
    errors.push('Workflow must have at least one End Node');
  }

  // Check for disconnected nodes
  const connectedNodeIds = new Set<string>();
  edges.forEach((edge) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  const disconnectedNodes = nodes.filter(
    (node) => !connectedNodeIds.has(node.id) && nodes.length > 1
  );

  if (disconnectedNodes.length > 0) {
    errors.push(
      `Disconnected nodes found: ${disconnectedNodes.map((n) => n.data.label).join(', ')}`
    );
  }

  if (errors.length > 0) {
    return {
      success: false,
      steps: [],
      errors,
    };
  }

  // Build execution path (simple traversal from start node)
  const steps = nodes.map((node, index) => ({
    nodeId: node.id,
    nodeTitle: node.data.label,
    status: 'completed' as const,
    message: getStepMessage(node.data.type, node.data.label),
    timestamp: new Date(Date.now() + index * 1000).toISOString(),
  }));

  return {
    success: true,
    steps,
    errors: [],
  };
};

function getStepMessage(type: string, label: string): string {
  switch (type) {
    case 'start':
      return `Workflow started: ${label}`;
    case 'task':
      return `Task assigned: ${label}`;
    case 'approval':
      return `Approval requested: ${label}`;
    case 'automated':
      return `Automated action executed: ${label}`;
    case 'end':
      return `Workflow completed: ${label}`;
    default:
      return `Step executed: ${label}`;
  }
}
