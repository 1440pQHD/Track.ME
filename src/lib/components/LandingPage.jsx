import { TextFlippingBoard } from "./ui/text-flipping-board";
import { useState, useEffect } from "react";







export default function LandingPage({ onLaunchApp}) {

    const MESSAGES = [
    "TO DO IS TO BE\n-FRIEDRICH NIETZE",
    "TRACK YOUR\nMILESTONES",
    "DEATH TO\nPROCRASINATION",
    "SHIP PROJECTS\nON TIME"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentIndex((previousIndex) => (previousIndex + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(timer);
    }, []);

    const features = [
    {
      icon: "🎯",
      title: "Define goals",
      description: "You can set specific, and measurable targets for your project goals"
    },
    {
      icon: "📈",
      title: "Track the progress",
      description: "Add progress and watch the bard fill"
    },
    {
      icon: "🏆",
      title: "Celebrate milestones",
      description: "Reach milestones and stay motivated for more"
    }
    ];
return (
    <main className="max-w-7xl mx-auto px-6 py-20">
        <section className="text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full text-emerald-300 text-sm mb-6">
                <span>Made for Stardance 2026</span>
            </div>

            <div className="mb-8 w-full max-w-4xl mx-auto flex justify-center scale-90 md:scale-100">
             <TextFlippingBoard 
                text={MESSAGES[currentIndex]} 
             />
            </div>
        
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight max-w-4xl">
                Track your project <span className="text-emerald-400">milestones!</span>
            </h2>
            <p className="mt-6 text-xl text-neutral-400 max-w-2xl">
                Organize your goals as movable widgets. Stay focused from start to finish
            </p>

            <div className="mt-10 flex gap-4">
                <button onClick={onLaunchApp}
                className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold px-8 py-4 rounded-full text-lg shadow-lg shadow-emerald-500/20 transition active:scale-95">
                    Launch widget workspace
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
        <footer className="border-t border-neutral-900 bg-neutral-900/50 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center text-neutral-500 text-sm">
          <p>&copy; 2026 Noah Nikolas Markakis | Built during Hack Club's Stardance challenge.</p>
          <p className="mt-2">Good Luck with your projects!</p>
        </div>
      </footer>
    </main>
    
);
};