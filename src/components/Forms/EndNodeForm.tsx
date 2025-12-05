import { useState } from 'react';
import type { EndNodeData } from '../../types/workflow.types';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { X } from 'lucide-react';

interface EndNodeFormProps {
  nodeId: string;
  data: EndNodeData;
  onClose: () => void;
}

export const EndNodeForm = ({ nodeId, data, onClose }: EndNodeFormProps) => {
  const updateNode = useWorkflowStore((state) => state.updateNode);
  const [endMessage, setEndMessage] = useState(data.endMessage || '');
  const [showSummary, setShowSummary] = useState(data.showSummary || false);

  const handleSave = () => {
    updateNode(nodeId, {
      endMessage,
      showSummary,
      label: endMessage,
    });
    onClose();
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">End Node Configuration</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            End Message <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={endMessage}
            onChange={(e) => setEndMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter completion message"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showSummary"
            checked={showSummary}
            onChange={(e) => setShowSummary(e.target.checked)}
            className="w-4 h-4 text-red-500 focus:ring-red-500 rounded"
          />
          <label htmlFor="showSummary" className="text-sm font-medium">
            Show workflow summary
          </label>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
