import { useState } from "react";

export default function GoalModal({ isOpen, onClose, onCreateGoal }) {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(10);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreateGoal(title, Number(target) || 1);
    setTitle("");
    setTarget(10);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md p-6 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Create New Goal</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">
              Goal Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Build authentication backend"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">
              Target Tasks / Count
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              required
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition text-sm font-mono"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-neutral-800 hover:bg-neutral-800 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition"
            >
              Add Goal Widget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}