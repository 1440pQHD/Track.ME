import { useState } from "react";
import GoalWidget from "./GoalWidget";

export default function Dashboard({ goals, setGoals, onOpenModal, onAddProgress, onDeleteGoal }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updatedGoals = [...goals];
    const draggedItem = updatedGoals.splice(draggedIndex, 1)[0];
    updatedGoals.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    setGoals(updatedGoals);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Your Goal Workspace</h2>
          <p className="text-neutral-400 text-sm mt-1">
            Drag cards by the handle <span className="text-neutral-200 font-mono">⠿</span> to reorder widgets.
          </p>
        </div>

        <button
          onClick={onOpenModal}
          className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-sm transition flex items-center gap-2"
        >
          <span>+</span> Add Custom Goal
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="border border-dashed border-neutral-800 rounded-3xl p-12 text-center text-neutral-500">
          <p className="text-lg">No active goal widgets yet.</p>
          <button
            onClick={onOpenModal}
            className="mt-4 text-emerald-400 underline font-medium hover:text-emerald-300"
          >
            Create one now
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, index) => (
            <GoalWidget
              key={goal.id}
              goal={goal}
              index={index}
              draggedIndex={draggedIndex}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onAddProgress={onAddProgress}
              onDeleteGoal={onDeleteGoal}
            />
          ))}
        </div>
      )}
    </main>
  );
}