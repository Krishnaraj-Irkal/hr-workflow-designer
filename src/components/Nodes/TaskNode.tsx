import { Handle, Position } from '@xyflow/react';
import { CheckSquare } from 'lucide-react';
import type { TaskNodeData } from '../../types/workflow.types';

interface TaskNodeProps {
  data: TaskNodeData;
  selected?: boolean;
}

export const TaskNode = ({ data, selected }: TaskNodeProps) => {
  return (
    <div
      className={`px-4 py-3 rounded-lg border bg-white min-w-[180px] shadow-sm ${
        selected ? 'ring-2 ring-blue-400/60' : 'border-gray-200'
      }`}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-blue-500" />

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <CheckSquare className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-gray-500 uppercase font-semibold">Task</div>
          <div className="font-medium text-sm">{data.title || 'Task Node'}</div>
        </div>
      </div>

      {data.assignee && (
        <div className="mt-2 text-xs text-gray-600">
          Assigned to: {data.assignee}
        </div>
      )}

      {data.dueDate && (
        <div className="text-xs text-gray-500">Due: {data.dueDate}</div>
      )}

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-500" />
    </div>
  );
};
