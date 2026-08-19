export default function GoalWidget({
    goal,
    index,
    draggedIndex,
    onDragStart,
    onDragOver,
    onDragEnd,
    onAddProgress,
    onDeleteGoal,
    onEditGoal
}) { 
    
    const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100));
    const isCompleted = goal.current >= goal.target;

    return(
        <div draggable 
        onDragStart={(e) => onDragStart(e, index)} 
        onDragOver={(e) => onDragOver(e, index)}
        onDragEnd={onDragEnd}
        className={`bg-white dark:bg-neutral-900 border transition-all duration-200 p-6 rounded-2xl shadow-xl flex flex-col justify-between select-none ${
        draggedIndex === index
        ? "border-emerald-500 opacity-50 scale-95"
        : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
        }`}
        >
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300">
                        <span className="text-lg font-mono"> ⠿ </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                            Widget
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                                e.stopPropagation();
                                onEditGoal(goal);
                            }}
                            className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-xs font-semibold px-2 py-1 rounded-md transition flex items-center gap-1 border border-neutral-300 dark:border-neutral-700 relative z-10"
                            title="Edit Goal"
                        >
                            Edit
                        </button>
                        <button 
                            type="button"
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteGoal(goal.id);
                            }}
                            className="text-neutral-400 dark:text-neutral-500 hover:text-red-500 dark:hover:text-red-400 text-sm transition relative z-10"
                            title="Delete Goal"
                        >
                            𝕏
                        </button>
                    </div>
                </div>
                
                <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-1">{goal.title}</h3>
                
                <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 my-2">
                    <span>Progress</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        {goal.current} / {goal.target} ({percentage}%)
                    </span>
                </div>

                <div className="w-full bg-neutral-100 dark:bg-neutral-950 rounded-full h-3 overflow-hidden border border-neutral-200 dark:border-neutral-800 my-3">
                    <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                        isCompleted ? "bg-emerald-400 shadow-lg shadow-emerald-400/50" : "bg-emerald-500"
                    }`}
                    style={{ width: `${percentage}%` }} 
                    ></div>
                </div>
            </div>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800/80">
                <button 
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                    e.stopPropagation();
                    onAddProgress(goal.id);
                }}
                disabled={isCompleted}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all relative z-10 ${
                    isCompleted 
                    ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-md shadow-emerald-500/20 active:scale-95"
                }`}
                >
                    {isCompleted ? "Completed 🎉" : "+1 Progress"}
                </button>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">
                {isCompleted ? "Done!" : `${goal.target - goal.current} left`}
                </span> 
            </div>
        </div>
    )
}