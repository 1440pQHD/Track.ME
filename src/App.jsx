import { useState } from "react";

function App() {
  // Added the missing state variable causing the reference error
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Complete MVP frontend",
      current: 6,
      target: 10
    },
    {
      id: 2,
      title: "Design enclosure",
      current: 2,
      target: 10
    }
  ]);

  const handleAddProgress = (id) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === id && goal.current < goal.target) {
          return { ...goal, current: goal.current + 1 };
        }
        return goal;
      })
    );
  };

  const features = [
    {
      icon: "🎯",
      title: "Define goals",
      description: "You can set specific, and measurable targets for your hackathon goals"
    },
    {
      icon: "📈",
      title: "Track the progress",
      description: "Add progress and watch the visuals grow"
    },
    {
      icon: "🏆",
      title: "Celebrate milestones",
      description: "Reach milestones and stay motivated and hungry for more"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <h1 className="text-xl font-bold tracking-tight">
              Track.<span className="text-emerald-400">ME</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="#features" className="text-sm text-neutral-300 hover:text-white transition">
              Features
            </a>
            <button className="bg-neutral-800 hover:bg-neutral-700 text-sm px-4 py-2 rounded-full transition">
              View Demo
            </button>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-sm px-4 py-2 rounded-full font-semibold text-neutral-950 transition">
              {isLoggedIn ? 'Dashboard' : 'Get Started'}
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <section className="text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full text-emerald-300 text-sm mb-6">
            <span>🌟</span>
            <span>Built for Stardance 2026</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight max-w-4xl">
            Track your hackathon <span className="text-emerald-400">milestones!</span> from the start until<span className="text-emerald-400"> ship</span>
          </h2>
          <p className="mt-8 text-xl text-neutral-400 max-w-2xl leading-relaxed">
            A minimalist style goal tracker with unique pressure. Define your MVP, add progress each day, and focus on progressing.
          </p>
          
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <button className="transform transition-all duration-300 hover:scale-105 bg-emerald-500 hover:bg-emerald-600 text-lg px-8 py-4 rounded-full font-bold text-neutral-950 shadow-lg shadow-emerald-500/20">
              Create Your First Goal
            </button>
            <button className="bg-neutral-800 hover:bg-neutral-700 text-lg px-8 py-4 rounded-full transition">
              Explore live tracker
            </button>
          </div>
        </section>

        <section id="features" className="py-24 md:py-32 mt-16 border-t border-neutral-900">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold tracking-tight">Stay on track, <span className="text-emerald-400">motivated</span>.</h3>
            <p className="text-neutral-400 mt-4 text-lg">Simple tool providing great focus.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group transform transition-all duration-300 hover:-translate-y-2 bg-neutral-900 p-8 rounded-3xl border border-neutral-800 hover:border-emerald-700 shadow-xl">
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h4 className="text-2xl font-semibold tracking-tight text-white group-hover:text-emerald-300 transition">
                  {feature.title}
                </h4>
                <p className="mt-4 text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 mt-16">
          <div className="max-w-lg">
            <h3 className="text-4xl font-bold tracking-tight leading-snug">
              Visualise your <span className="text-emerald-400">momentum</span>
            </h3>
            <p className="text-neutral-400 mt-6 text-lg leading-relaxed">
              Watch your progress bar fill as you finish tasks. Click the button to test live updates! 🤑 
            </p>
          </div>

          <div className="w-full max-w-md flex flex-col gap-4">
            {goals.map((goal) => {
              const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100));
              const isCompleted = goal.current >= goal.target;

              return (
                <div key={goal.id} className="bg-neutral-950 border border-neutral-800 p-6 rounded-2xl shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">{goal.title}</span>
                    <span className="text-emerald-400 font-mono text-sm">
                      {goal.current} / {goal.target} ({percentage}%)
                    </span>
                  </div>

                  <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden my-3">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        isCompleted ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => handleAddProgress(goal.id)}
                      disabled={isCompleted}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                        isCompleted
                          ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-md shadow-emerald-500/20 active:scale-95'
                      }`}
                    >
                      {isCompleted ? '🎉 Completed!' : '+1 Task'}
                    </button>

                    <span className="text-xs text-neutral-500">
                      {isCompleted ? 'Goal Reached' : `${goal.target - goal.current} tasks left`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-900 bg-neutral-900/50 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center text-neutral-500 text-sm">
          <p>&copy; 2026 Noah Nikolas Markakis | Built during Hack Club's Stardance challenge.</p>
          <p className="mt-2">Good Luck with your projects!</p>
        </div>
      </footer>
    </div>
  );
}

export default App;