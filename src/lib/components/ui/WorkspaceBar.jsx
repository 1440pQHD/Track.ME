import React from "react";

export default function WorkspaceBar({
  workspaces,
  activeWorkspaceId,
  onSelectWorkspace,
  onOpenModal,
  onDeleteWorkspace
}) {
  return (
    <div className="border-b border-neutral-800 bg-neutral-900/30 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-xs uppercase font-semibold text-neutral-500 mr-2">
            Workspaces:
          </span>
          {workspaces.map((ws) => {
            const isActive = ws.id === activeWorkspaceId;
            return (
              <button
                key={ws.id}
                onClick={() => onSelectWorkspace(ws.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-500/10 border border-emerald-500/40 text-emerald-400"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                }`}
              >
                <span>{ws.icon}</span>
                <span>{ws.name}</span>
                <span className="ml-1 text-xs px-1.5 py-0.2 rounded-full bg-neutral-800 text-neutral-400">
                  {ws.goals.length}
                </span>
              </button>
            );
          })}

          <button
            onClick={onOpenModal}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm border border-dashed border-neutral-800 text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/40 transition whitespace-nowrap"
          >
            <span>+</span>
            <span>New workspace</span>
          </button>
        </div>

        {workspaces.length > 1 && (
          <button
            onClick={() => onDeleteWorkspace(activeWorkspaceId)}
            className="text-xs text-rose-400/60 hover:text-rose-400 transition whitespace-nowrap"
          >
            Delete workspace
          </button>
        )}
      </div>
    </div>
  );
}