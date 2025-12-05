import { Handle, Position } from '@xyflow/react';
import { Zap } from 'lucide-react';
import type { AutomatedStepNodeData } from '../../types/workflow.types';

interface AutomatedStepNodeProps {
  data: AutomatedStepNodeData;
  selected?: boolean;
}

export const AutomatedStepNode = ({ data, selected }: AutomatedStepNodeProps) => {
  return (
    <div
      className={`px-4 py-3 rounded-lg border bg-white min-w-[180px] shadow-sm ${
        selected ? 'ring-2 ring-orange-400/60' : 'border-gray-200'
      }`}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-orange-500" />

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
          <Zap className="w-4 h-4 text-orange-600" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-gray-500 uppercase font-semibold">Automated</div>
          <div className="font-medium text-sm">{data.title || 'Automated Node'}</div>
        </div>
      </div>

      {data.actionLabel && (
        <div className="mt-2 text-xs text-gray-600">
          Action: {data.actionLabel}
        </div>
      )}

      {data.parameters && Object.keys(data.parameters).length > 0 && (
        <div className="text-xs text-gray-500">
          {Object.keys(data.parameters).length} parameter(s)
        </div>
      )}

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-orange-500" />
    </div>
  );
};
