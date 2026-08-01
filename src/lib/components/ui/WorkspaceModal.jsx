import React, { useState } from "react";

export default function WorkspaceModal ({ isOpen, onClose, onCreateWorkspace }) {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("🎯");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        onCreateWorkspace(name.trim(), icon || "📁");
        setName("");
        setIcon("🎯");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl max-w-md w-full shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Create new workspace</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                            Workspace icon
                        </label>
                        <input
                            type="text"
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            placeholder="🚀"
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                            maxLength={2}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase text-neutral-400 mb-1">
                            Workspace name
                        </label>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. RC plane, ESP32 website, eat Mcnuggets"
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                            autoFocus
                            required
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold py-2.5 rounded-xl text-sm transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold py-2.5 rounded-xl text-sm transition"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}