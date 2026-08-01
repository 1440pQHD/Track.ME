import React, { useState, useEffect, useCallback } from "react";
import Dashboard from "./lib/components/Dashboard";
import LandingPage from "./lib/components/LandingPage";
import GoalModal from "./lib/components/GoalModal";
import { TextFlippingBoard } from "./lib/components/ui/text-flipping-board";
import WorkspaceBar from "./lib/components/ui/WorkspaceBar";
import WorkspaceModal from "./lib/components/ui/WorkspaceModal";


export function TextFlippingBoardDemo() {
  const [msgIdx, setMsgIdx] = useState(0);

  const next = useCallback(() => setMsgIdx((i) => (i + 1) % MESSAGES.length), []);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-20">
      <TextFlippingBoard text={MESSAGES[msgIdx]} />
    </div>
  );
}



export default function App() {
  const [workspaces, setWorkspaces] = useState(() => {
    const saved = localStorage.getItem("track-workspaces");
    if(saved) {
      try{
        return JSON.parse(saved);

      } catch (e) {
        console.error("Error parsing the workspace")

      }
    }
    return [
      {
        id: "wrks-1",
        name:"Current project",
        icon: "🚀",
        goals: [
          {id: 1, title: "Complete frontend", current: 6, target: 10},
          {id: 2, title: "Assign IDs", current: 8, target: 10},
          {id: 3, title: "Design enclosure", current: 9, target: 20}
        ]

      }
    ];
  });

  const [activeWsId, setActiveWsId] = useState(() => {
    return localStorage.getItem("track-active-ws") || "wrks-1";
  });

  const [currentView, setCurrentView] = useState("landing");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iswsmodalopen, setiswsmodalopen] = useState(false);

  useEffect(() => {
    localStorage.setItem("track-workspaces", JSON.stringify(workspaces));
  }, [workspaces]);


  useEffect(() => {
    localStorage.setItem("track-active-ws", activeWsId);
  }, [activeWsId]);


  const activeWorkspace = 
  workspaces.find((ws) => ws.id === activeWsId) || workspaces[0];

  const handleAddProgress = (id) => {
    setWorkspaces((prev) => 
    prev.map((ws) =>
      ws.id === activeWorkspace.id
    ? {
        ...ws,
        goals: ws.goals.map((g) => 
        g.id === id && g.current < g.target 
        ? {...g, current: g.current +1 }
        :g
        )
    } 
    : ws
  )
  );
  };

  const handleDeleteGoal = (id) => {
    setWorkspaces((prev) => 
      prev.map((ws) => 
        ws.id === activeWorkspace.id
          ? {...ws, goals: ws.goals.filter((g) => g.id !== id)}
          : ws
      )
    );
  };

  const handleCreateGoal = (title, target) => {
    const newGoal = { id: Date.now(), title, current: 0, target: Number(target) || 10 };
    setWorkspaces((prev) =>
      prev.map((ws) => 
        ws.id === activeWorkspace.id
        ?{...ws, goals: [...ws.goals, newGoal]}
        :ws
      )
    );
  };
  
  const handleCreateWorkspace = (name, icon) => {
    const newWs = {
      id: "ws-" + Date.now(),
      name,
      icon,
      goals: []

    };
    setWorkspaces((prev) =>[...prev, newWs]);
    setActiveWsId(newWs.id);
  };

  const handleDeleteWorkspace = (id) => {
    if (workspaces.length <= 1) return;
    if (confirm("Are you sure you want to delete this workspace? (Not reversible)")) {
      const remaining = workspaces.filter((ws) => ws.id !== id);
      setWorkspaces(remaining);
      setActiveWsId(remaining[0].id);    } 
  };




  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentView("landing")}
          >
            <span className="text-2xl">🚀</span>
            <h1 className="text-xl font-bold tracking-tight">
              Track.<span className="text-emerald-400">ME</span>
            </h1>
          </div>
          

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView(currentView === "about" ? "app" : "about")}
              className="text-sm text-neutral-400 hover:text-white transition"
            >
              {currentView === "landing" ? "About" : "Landing Page"}
            </button>
            <button
              onClick={() => setCurrentView(currentView === "landing" ? "app" : "landing")}
              className="text-sm text-neutral-400 hover:text-white transition"
            >
              {currentView === "landing" ? "Switch to Dashboard" : "Landing Page"}
            </button>

            <button
              onClick={() => {
                if (currentView === "landing") setCurrentView("app");
                else setIsModalOpen(true);
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-sm px-4 py-2 rounded-full font-semibold text-neutral-950 transition active:scale-95"
            >
              {currentView === "landing" ? "Open App" : "+ New Goal"}
            </button>
          </div>
        </nav>
      </header>

      {currentView === "app" && (
        <WorkspaceBar
          workspaces={workspaces}
          activeWorkspaceId={activeWorkspace.id}
          onSelectWorkspace={setActiveWsId}
          onOpenModal={() => setiswsmodalopen(true)}
          onDeleteWorkspace={handleDeleteWorkspace}
        />
      )}

      {currentView === "landing" ? (
        <LandingPage onLaunchApp={() => setCurrentView("app")} />
      ) : (
        <Dashboard
          goals={activeWorkspace.goals}
          setGoals={(updater)=> {
            setWorkspaces((prev) =>
              prev.map((ws)=> {

                if (ws.id !== activeWorkspace.id) return ws;
                const newGoals = typeof updater === "function" ? updater(ws.goals): updater;
                return { ...ws, goals: newGoals };
              })
            );
          }}
          onOpenModal={() => setIsModalOpen(true)}
          onAddProgress={handleAddProgress}
          onDeleteGoal={handleDeleteGoal}
        />
      )}

      <GoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateGoal={handleCreateGoal}
      />
      <WorkspaceModal
        isOpen={iswsmodalopen}
        onClose={() => setiswsmodalopen(false)}
        onCreateWorkspace={handleCreateWorkspace}
        />
    </div>
  );
}