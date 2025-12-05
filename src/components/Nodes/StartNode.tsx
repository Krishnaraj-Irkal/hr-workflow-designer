import { Handle, Position } from '@xyflow/react';
import { Play } from 'lucide-react';
import type { StartNodeData } from '../../types/workflow.types';

interface StartNodeProps {
  data: StartNodeData;
  selected?: boolean;
}

export const StartNode = ({ data, selected }: StartNodeProps) => {
  return (
    <div
      className={`px-4 py-3 rounded-lg border bg-white min-w-[180px] shadow-sm ${
        selected ? 'ring-2 ring-green-400/60' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
          <Play className="w-4 h-4 text-green-600" fill="currentColor" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-gray-500 uppercase font-semibold">Start</div>
          <div className="font-medium text-sm">{data.title || 'Start Node'}</div>
        </div>
      </div>

      {data.metadata && Object.keys(data.metadata).length > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          {Object.keys(data.metadata).length} metadata field(s)
        </div>
      )}

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-green-500" />
    </div>
  );
};
