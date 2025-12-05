import { Handle, Position } from '@xyflow/react';
import { ShieldCheck } from 'lucide-react';
import type { ApprovalNodeData } from '../../types/workflow.types';

interface ApprovalNodeProps {
  data: ApprovalNodeData;
  selected?: boolean;
}

export const ApprovalNode = ({ data, selected }: ApprovalNodeProps) => {
  return (
    <div
      className={`px-4 py-3 rounded-lg border bg-white min-w-[180px] shadow-sm ${
        selected ? 'ring-2 ring-purple-400/60' : 'border-gray-200'
      }`}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-purple-500" />

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
          <ShieldCheck className="w-4 h-4 text-purple-600" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-gray-500 uppercase font-semibold">Approval</div>
          <div className="font-medium text-sm">{data.title || 'Approval Node'}</div>
        </div>
      </div>

      {data.approverRole && (
        <div className="mt-2 text-xs text-gray-600">
          Approver: {data.approverRole}
        </div>
      )}

      {data.autoApproveThreshold !== undefined && (
        <div className="text-xs text-gray-500">
          Auto-approve: {data.autoApproveThreshold}
        </div>
      )}

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-500" />
    </div>
  );
};
