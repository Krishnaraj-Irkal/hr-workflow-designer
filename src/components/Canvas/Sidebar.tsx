import { Play, CheckSquare, ShieldCheck, Zap, Flag, Grip } from 'lucide-react';
import type { NodeType } from '../../types/workflow.types';


const nodeTypes = [
  { type: 'start' as NodeType, label: 'Start Node', icon: Play, color: 'green', desc: 'Begin workflow' },
  { type: 'task' as NodeType, label: 'Task Node', icon: CheckSquare, color: 'blue', desc: 'Assign task' },
  { type: 'approval' as NodeType, label: 'Approval Node', icon: ShieldCheck, color: 'purple', desc: 'Require approval' },
  { type: 'automated' as NodeType, label: 'Automated Step', icon: Zap, color: 'orange', desc: 'System action' },
  { type: 'end' as NodeType, label: 'End Node', icon: Flag, color: 'red', desc: 'Complete workflow' },
];

export const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; bgHover: string; border: string; text: string; icon: string }> = {
      green: { bg: 'bg-green-50', bgHover: 'hover:bg-green-100', border: 'border-green-200', text: 'text-green-700', icon: 'text-green-600' },
      blue: { bg: 'bg-blue-50', bgHover: 'hover:bg-blue-100', border: 'border-blue-200', text: 'text-blue-700', icon: 'text-blue-600' },
      purple: { bg: 'bg-purple-50', bgHover: 'hover:bg-purple-100', border: 'border-purple-200', text: 'text-purple-700', icon: 'text-purple-600' },
      orange: { bg: 'bg-orange-50', bgHover: 'hover:bg-orange-100', border: 'border-orange-200', text: 'text-orange-700', icon: 'text-orange-600' },
      red: { bg: 'bg-red-50', bgHover: 'hover:bg-red-100', border: 'border-red-200', text: 'text-red-700', icon: 'text-red-600' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <aside className="w-80 min-w-[260px] bg-[#f1f4fa]h-full overflow-y-auto space-y-4">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.16em] text-gray-500">Palette</p>
        <h2 className="text-lg font-bold text-gray-900">Node Library</h2>
        <p className="text-sm text-gray-600">Drag a node to the canvas to start a flow</p>
      </div>

      <div className="space-y-3 pt-1">
        {nodeTypes.map((node, index) => {
          const Icon = node.icon;
          const colors = getColorClasses(node.color);
          return (
            <div
              key={node.type}
              draggable
              onDragStart={(e) => onDragStart(e, node.type)}
              className={`group relative flex items-center gap-3 p-3.5 bg-white border border-gray-200 rounded-xl cursor-move transition-all hover:shadow hover:-translate-y-0.5 active:scale-95 animate-fade-in`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm border border-gray-200" style={{ backgroundColor: '#f7f8fb' }}>
                <Icon className={`w-5 h-5 ${colors.icon}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">
                  {node.label}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {node.desc}
                </div>
              </div>
              <Grip className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">i</div>
          <h3 className="text-sm font-bold text-gray-900">Quick Tips</h3>
        </div>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-xs text-gray-800">
            <span className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-1.5 flex-shrink-0"></span>
            Click a node to configure its properties
          </li>
          <li className="flex items-start gap-2 text-xs text-gray-800">
            <span className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-1.5 flex-shrink-0"></span>
            Drag from connection points to link nodes
          </li>
          <li className="flex items-start gap-2 text-xs text-gray-800">
            <span className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-1.5 flex-shrink-0"></span>
            Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200 font-mono text-[10px]">Delete</kbd> to remove items
          </li>
        </ul>
      </div>
    </aside>
  );
};
