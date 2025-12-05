import { useState } from 'react';
import type { AutomatedStepNodeData } from '../../types/workflow.types';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { useAutomations } from '../../hooks/useAutomations';
import { X } from 'lucide-react';

interface AutomatedStepNodeFormProps {
  nodeId: string;
  data: AutomatedStepNodeData;
  onClose: () => void;
}

export const AutomatedStepNodeForm = ({
  nodeId,
  data,
  onClose,
}: AutomatedStepNodeFormProps) => {
  const updateNode = useWorkflowStore((state) => state.updateNode);
  const { automations, loading } = useAutomations();
  const [title, setTitle] = useState(data.title || '');
  const [actionId, setActionId] = useState(data.actionId || '');
  const [parameters, setParameters] = useState<Record<string, string>>(
    data.parameters || {}
  );

  const selectedAction = automations.find((a) => a.id === actionId);

  // Parameters are initialized on action change; if editing existing node,
  // initial parameters come from node data.

  const handleActionChange = (newActionId: string) => {
    setActionId(newActionId);
    const action = automations.find((a) => a.id === newActionId);
    if (action) {
      const initialParams: Record<string, string> = {};
      action.params.forEach((param) => {
        initialParams[param] = parameters[param] || '';
      });
      setParameters(initialParams);
    }
  };

  const handleSave = () => {
    updateNode(nodeId, {
      title,
      actionId,
      actionLabel: selectedAction?.label,
      parameters,
      label: title,
    });
    onClose();
  };

  const updateParameter = (key: string, value: string) => {
    setParameters({ ...parameters, [key]: value });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Automated Node Configuration</h3>
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
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter automation title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Action <span className="text-red-500">*</span>
          </label>
          {loading ? (
            <div className="text-sm text-gray-500">Loading actions...</div>
          ) : (
            <select
              value={actionId}
              onChange={(e) => handleActionChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select an action</option>
              {automations.map((action) => (
                <option key={action.id} value={action.id}>
                  {action.label}
                </option>
              ))}
            </select>
          )}
        </div>

        {selectedAction && selectedAction.params.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Action Parameters <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {selectedAction.params.map((param) => (
                <div key={param}>
                  <label className="block text-xs text-gray-600 mb-1 capitalize">
                    {param}
                  </label>
                  <input
                    type="text"
                    value={parameters[param] || ''}
                    onChange={(e) => updateParameter(param, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder={`Enter ${param}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
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
