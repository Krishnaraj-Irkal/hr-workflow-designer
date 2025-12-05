import { Handle, Position } from '@xyflow/react';
import { Flag } from 'lucide-react';
import type { EndNodeData } from '../../types/workflow.types';

interface EndNodeProps {
  data: EndNodeData;
  selected?: boolean;
}

export const EndNode = ({ data, selected }: EndNodeProps) => {
  return (
    <div
      className={`px-4 py-3 rounded-lg border bg-white min-w-[180px] shadow-sm ${
        selected ? 'ring-2 ring-red-400/60' : 'border-gray-200'
      }`}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-red-500" />

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
          <Flag className="w-4 h-4 text-red-600" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-gray-500 uppercase font-semibold">End</div>
          <div className="font-medium text-sm">{data.endMessage || 'End Node'}</div>
        </div>
      </div>

      {data.showSummary && (
        <div className="mt-2 text-xs text-gray-600">
          Summary enabled
        </div>
      )}
    </div>
  );
};
