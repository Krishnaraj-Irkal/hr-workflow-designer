import { useState } from 'react';
import type { StartNodeData } from '../../types/workflow.types';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { X, Plus, Trash2 } from 'lucide-react';

interface StartNodeFormProps {
  nodeId: string;
  data: StartNodeData;
  onClose: () => void;
}

export const StartNodeForm = ({ nodeId, data, onClose }: StartNodeFormProps) => {
  const updateNode = useWorkflowStore((state) => state.updateNode);
  const [title, setTitle] = useState(data.title || '');
  const [metadata, setMetadata] = useState<Record<string, string>>(data.metadata || {});
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleSave = () => {
    updateNode(nodeId, {
      title,
      metadata,
      label: title,
    });
    onClose();
  };

  const addMetadata = () => {
    if (newKey.trim() && newValue.trim()) {
      setMetadata({ ...metadata, [newKey]: newValue });
      setNewKey('');
      setNewValue('');
    }
  };

  const removeMetadata = (key: string) => {
    const newMetadata = { ...metadata };
    delete newMetadata[key];
    setMetadata(newMetadata);
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Start Node Configuration</h3>
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
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter start title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Metadata (Optional)</label>
          <div className="space-y-2">
            {Object.entries(metadata).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-600">{key}</div>
                  <div className="text-sm">{value}</div>
                </div>
                <button
                  onClick={() => removeMetadata(key)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-2 space-y-2">
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Key"
            />
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Value"
            />
            <button
              onClick={addMetadata}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Metadata
            </button>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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
