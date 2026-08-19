import React, { useState } from "react";

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [inputCode, setInputCode] = useState("");

  if (!isOpen) return null;

  // Generate a random 8-character uppercase alphanumeric code
  const handleGenerateNew = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setInputCode(code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    onLogin(inputCode.trim().toUpperCase());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-md p-6 shadow-2xl text-white space-y-6">
        
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">Cloud Sync Access</h2>
          <p className="text-sm text-neutral-400">
            Enter your sync code to load your workspaces across devices, or generate a new one.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              Sync Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="e.g. A8K2M9P1"
                maxLength={12}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white font-mono uppercase tracking-widest placeholder:text-neutral-700 placeholder:normal-case placeholder:tracking-normal focus:outline-none focus:border-neutral-600 transition"
              />
              <button
                type="button"
                onClick={handleGenerateNew}
                className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-4 py-3 rounded-xl text-xs font-medium transition whitespace-nowrap"
              >
                Generate
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={!inputCode.trim()}
              className="flex-1 bg-white text-neutral-950 hover:bg-neutral-200 font-medium py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Connect & Sync
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium px-5 py-3 rounded-xl transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}