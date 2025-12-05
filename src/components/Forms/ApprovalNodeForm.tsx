import { useState } from 'react';
import type { ApprovalNodeData } from '../../types/workflow.types';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { X } from 'lucide-react';

interface ApprovalNodeFormProps {
  nodeId: string;
  data: ApprovalNodeData;
  onClose: () => void;
}

export const ApprovalNodeForm = ({ nodeId, data, onClose }: ApprovalNodeFormProps) => {
  const updateNode = useWorkflowStore((state) => state.updateNode);
  const [title, setTitle] = useState(data.title || '');
  const [approverRole, setApproverRole] = useState(data.approverRole || '');
  const [autoApproveThreshold, setAutoApproveThreshold] = useState<number | undefined>(
    data.autoApproveThreshold
  );

  const handleSave = () => {
    updateNode(nodeId, {
      title,
      approverRole,
      autoApproveThreshold,
      label: title,
    });
    onClose();
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Approval Node Configuration</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter approval title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Approver Role <span className="text-red-500">*</span>
          </label>
          <select
            value={approverRole}
            onChange={(e) => setApproverRole(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select approver role</option>
            <option value="Manager">Manager</option>
            <option value="HRBP">HRBP</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
            <option value="C-Level">C-Level</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Auto-approve Threshold (Optional)
          </label>
          <input
            type="number"
            value={autoApproveThreshold ?? ''}
            onChange={(e) =>
              setAutoApproveThreshold(
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter threshold amount"
            min="0"
          />
          <p className="text-xs text-gray-500 mt-1">
            Requests below this amount will be auto-approved
          </p>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
