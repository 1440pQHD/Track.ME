import React, { useState, useEffect } from "react";

export default function EditGoalModal({ isOpen, onClose, goal, onSave }) {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(10);

  useEffect(() => {
    if (goal) {
      setTitle(goal.title || "");
      setTarget(goal.target || 10);
    }
  }, [goal]);

  if (!isOpen || !goal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ ...goal, title: title.trim(), target: Number(target) || 1 });
    onClose();
  };

    return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 transition-all">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    Edit goal
                </h2>
                <button 
                    onClick={onClose}
                    className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-sm font-semibold">
                        X
                    </button>

            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                        Goal title
                    </label>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-emerald-500"
                        required
                        />
                     

                </div>
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2  text-sm rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2  text-sm font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-600 text-neutral-950 transition active:scale-95">
                                Save changed
                            </button>
                        
                </div>
            </form>
        </div>
    </div>
);

}