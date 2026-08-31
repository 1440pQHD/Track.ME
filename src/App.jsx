import React, { useState, useEffect, useCallback } from "react";
import Dashboard from "./lib/components/Dashboard";
import LandingPage from "./lib/components/LandingPage";
import GoalModal from "./lib/components/GoalModal";
import { TextFlippingBoard } from "./lib/components/ui/text-flipping-board";
import WorkspaceBar from "./lib/components/ui/WorkspaceBar";
import WorkspaceModal from "./lib/components/ui/WorkspaceModal";
import AuthModal from "./lib/components/AuthModal";
import confetti from "canvas-confetti";
import About from "./lib/components/About";
import EditGoalModal from "./lib/components/EditGoalModal";
import EditWorkspaceModal from "./lib/components/EditWorkspaceModal";
const API_BASE_URL = "/api"; // Change this to the IP adress of the Node.JS server you are running (I'm using a vps so everything is on the same machine)
import logo from "./assets/logo.png";
import logoLight from "./assets/logo_light.png";

document.title="Track.ME"

const MESSAGES = [
  "Track your daily goals effortlessly.",
  "Sync across all your devices instantly.",
  "Stay organized and achieve more."
];

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
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("trackme_theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");

    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("trackme_theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("trackme_theme", "light");
    }
  }, [isDark]);

  const [syncCode, setSyncCode] = useState(() => {
    const saved = localStorage.getItem("trackme_sync_code");
    return saved && saved !== "null" && saved !== "undefined" ? saved : null;
  });

  const [isAuthOpen, setIsAuthOpen] = useState(!syncCode);

  const [workspaces, setWorkspaces] = useState([
    {
      id: "wrks-1",
      name: "Current project",
      icon: "🚀",
      goals: [
        { id: 1, title: "Complete frontend", current: 6, target: 10 },
        { id: 2, title: "Assign IDs", current: 8, target: 10 },
        { id: 3, title: "Design enclosure", current: 9, target: 20 }
      ]
    }
  ]);

  const [activeWsId, setActiveWsId] = useState("wrks-1");
  const [currentView, setCurrentView] = useState(() => {
    const saved = localStorage.getItem("trackme_current_view");
    return saved && ["landing", "app", "about"].includes(saved) ? saved: "landing";

  });

  useEffect(() => {
    localStorage.setItem("trackme_current_view", currentView);

  }, [currentView]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iswsmodalopen, setiswsmodalopen] = useState(false);

  useEffect(() => {
    if (!syncCode || syncCode === "null") return;

    async function loadWorkspaces() {
      try {
        const res = await fetch(`${API_BASE_URL}/sync/${syncCode}`);
        if (res.ok) {
          const data = await res.json();
          if (data.workspaces && data.workspaces.length > 0) {
            setWorkspaces(data.workspaces);
            setActiveWsId(data.workspaces[0].id);
          }
        } else if (res.status === 404) {
          console.warn("Sync code not found on server, initializing default state.");
          saveWorkspacesToApi(workspaces);
        }
      } catch (err) {
        console.error("Failed to connect to backend server:", err);
      }
    }

    loadWorkspaces();
  }, [syncCode]);

  const saveWorkspacesToApi = async (updatedWorkspaces) => {
    setWorkspaces(updatedWorkspaces);
    if (!syncCode || syncCode === "null") return;

    try {
      await fetch(`${API_BASE_URL}/sync/${syncCode}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaces: updatedWorkspaces })
      });
    } catch (err) {
      console.error("Failed to sync updates with server:", err);
    }
  };

  const [editingGoal, setEditingGoal] = useState(null);
const [editingWorkspace, setEditingWorkspace] = useState(null);

  const handleUpdateGoal = (updatedGoal) =>{
  const updated = workspaces.map((ws) => {
      if (ws.id !== activeWorkspace.id) return ws;
      return {
        ...ws,
        goals: ws.goals.map((g) => (g.id === updatedGoal.id ? updatedGoal: g ))
      };
    });
    saveWorkspacesToApi(updated);
  };
  const handleUpdateWorkspace = (updatedWs) => {
    const updated = workspaces.map((ws) =>
      ws.id === updatedWs.id ? updatedWs : ws
    );
    saveWorkspacesToApi(updated);
  };


  const handleLogin = async (code) => {
    try {
      const checkRes = await fetch(`${API_BASE_URL}/sync/${code}`);

      if (checkRes.status === 404) {
        const regRes = await fetch(`${API_BASE_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sync_code: code,
            initial_workspaces: workspaces
          }),
        });

        if (!regRes.ok) {
          throw new Error("Failed to register new sync code on server.");
        }
      } else if (checkRes.ok) {
        const data = await checkRes.json();
        if (data.workspaces && data.workspaces.length > 0) {
          setWorkspaces(data.workspaces);
          setActiveWsId(data.workspaces[0].id);
        }
      }

      localStorage.setItem("trackme_sync_code", code);
      setSyncCode(code);
      setIsAuthOpen(false);
    } catch (err) {
      console.error("Authentication error:", err);
    }
  };

  useEffect(() => {
    localStorage.setItem("track-active-ws", activeWsId);
  }, [activeWsId]);

  const activeWorkspace =
    workspaces.find((ws) => ws.id === activeWsId) || workspaces[0];

  const handleAddProgress = (id) => {
    const updated = workspaces.map((ws) => {
      if (ws.id !== activeWorkspace.id) return ws;

      return {
        ...ws,
        goals: ws.goals.map((g) => {
          if (g.id === id && g.current < g.target) {
            const nextCurrent = g.current + 1;
            if (nextCurrent === g.target) {
              confetti({
                particleCount: 100,
                angle: 90,
                gravity: 0.5,
                spread: 120,
                origin: { y: 0.6 },
                colors: ["#a864fd", "#29cdff", "#ff718d", "#78ff44", "#ffffff"],
              });
            }
            return { ...g, current: nextCurrent };
          }
          return g;
        }),
      };
    });
    saveWorkspacesToApi(updated);
  };

  const handleDeleteGoal = (id) => {
    const updated = workspaces.map((ws) =>
      ws.id === activeWorkspace.id
        ? { ...ws, goals: ws.goals.filter((g) => g.id !== id) }
        : ws
    );
    saveWorkspacesToApi(updated);
  };

  const handleCreateGoal = (title, target) => {
    const newGoal = { id: Date.now(), title, current: 0, target: Number(target) || 10 };
    const updated = workspaces.map((ws) =>
      ws.id === activeWorkspace.id
        ? { ...ws, goals: [...ws.goals, newGoal] }
        : ws
    );
    saveWorkspacesToApi(updated);
  };

  const handleCreateWorkspace = (name, icon) => {
    const newWs = {
      id: "ws-" + Date.now(),
      name,
      icon,
      goals: []
    };
    const updated = [...workspaces, newWs];
    saveWorkspacesToApi(updated);
    setActiveWsId(newWs.id);
  };

  const handleDeleteWorkspace = (id) => {
    if (workspaces.length <= 1) return;
    if (confirm("Are you sure you want to delete this workspace? (Not reversible)")) {
      const remaining = workspaces.filter((ws) => ws.id !== id);
      saveWorkspacesToApi(remaining);
      setActiveWsId(remaining[0].id);
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${
      isDark
      ? "bg-neutral-950 text-neutral-100"
      : "bg-neutral-50 text-neutral-900"
    }`}
    >
      <header className={` border-b sticky top-0 z-40 backdrop-blur-sm transtion-colors duration-200 ${ 
        isDark
          ? "border-neutral-800 bg-neutral-950/80"
          : "border-neutral-200 bg-white/80"
      }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentView("landing")}
          >
            <div className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentView("landing")}
            >
              <img
                src={isDark ? logo : logoLight}
                alt="Track.ME"
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
          
            <button
              onClick={() => setIsAuthOpen(true)}
              className="text-xs font-mono bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg text-emerald-400 hover:border-neutral-700 transition"
            >
              {syncCode && syncCode !== "null" ? `SYNC: ${syncCode}` : "LOG IN / SYNC"}
            </button>
            <button 
              onClick={()=> setIsDark(!isDark)}
              className={`p-2 rounded-lg border text-sm transition-colors ${
                isDark
                  ? "bg-neutral-900 border-neutral-800 text-yellow-400 hover:border-neutral-700"
                  : "bg-neutral-100 border-neutral-300 text-neutral-700 hover:bg-neutral-200"
              }`}
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
              >
                {isDark ? "🌕" : "☀️"}
              </button>

            

                    <button
                      onClick={() => setCurrentView(currentView === "landing" ? "app" : "landing")}
                      className={`text-sm transition underline underline-offset-4 ${
                        isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      {currentView === "landing" ? "Switch to Dashboard" : "Landing Page"}
                    </button>

                    <button
                      onClick={() => setCurrentView("about")}
                      className={`text-sm transition ${
                        currentView === "about"
                          ? "text-emerald-500 dark:text-emerald-400 font-medium underline decoration-emerald-400"
                          : isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      About
                    </button>

                    <button
                      onClick={() => {
                        if (currentView === "app") {
                          setIsModalOpen(true);
                        } else {
                          setCurrentView("app");
                        }
                      }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-sm px-4 py-2 rounded-full font-semibold text-neutral-950 transition active:scale-95"
                    >
          {currentView === "app" ? "+ New Goal" : "Open App"}
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
          onEditWorkspace={(ws) => setEditingWorkspace(ws)}
        />
      )}

      {currentView === "landing" ? (
        <LandingPage onLaunchApp={() => setCurrentView("app")} isDark={isDark} />
      ) : currentView === "about" ? (
        <About isDark={isDark} />
      ) : (
        <Dashboard
          goals={activeWorkspace.goals}
          setGoals={(updater) => {
            const updated = workspaces.map((ws) => {
              if (ws.id !== activeWorkspace.id) return ws;
              const newGoals = typeof updater === "function" ? updater(ws.goals) : updater;
              return { ...ws, goals: newGoals };
            });
            saveWorkspacesToApi(updated);
          }}
          onOpenModal={() => setIsModalOpen(true)}
          onAddProgress={handleAddProgress}
          onDeleteGoal={handleDeleteGoal}
          onEditGoal={(goal) => setEditingGoal(goal)}
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

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => (syncCode && syncCode !== "null" ? setIsAuthOpen(false) : null)}
        onLogin={handleLogin}
      />

      <EditGoalModal
        isOpen={!!editingGoal}
        goal={editingGoal}
        onClose={() => setEditingGoal(null)}
        onSave={handleUpdateGoal}
      />

      <EditWorkspaceModal
        isOpen={!!editingWorkspace}
        workspace={editingWorkspace}
        onClose={()=> setEditingWorkspace(null)}
        onSave={handleUpdateWorkspace}
      />
    </div>
  );
}