import { Vote, Lock, BarChart3, Activity } from "lucide-react";
import { ViewState } from "../types";

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isAdminLoggedIn: boolean;
  logoutAdmin: () => void;
  startLiveSession: () => void;
  isWizardActive: boolean;
}

export default function Header({
  currentView,
  setView,
  isAdminLoggedIn,
  logoutAdmin,
  startLiveSession,
  isWizardActive,
}: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/75 backdrop-blur-xl border-b border-slate-200/80 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        
        {/* Branding Logo */}
        <div 
          onClick={() => setView("voting")} 
          className="flex items-center gap-2 text-2xl font-bold font-display tracking-tight cursor-pointer select-none"
        >
          <span className="text-slate-900 font-extrabold hover:text-indigo-600 transition-colors duration-200">
            Vibe<span className="text-indigo-600">Vote</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => setView("voting")}
            className={`text-sm font-bold tracking-wide uppercase transition-all duration-200 pb-1 border-b-2 ${
              currentView === "voting" && !isWizardActive
                ? "text-indigo-600 border-indigo-600"
                : "text-slate-500 hover:text-slate-900 border-transparent"
            }`}
          >
            Voting Portal
          </button>
          
          <button
            onClick={startLiveSession}
            className={`flex items-center gap-2 text-sm font-bold tracking-wide uppercase transition-all duration-200 pb-1 border-b-2 ${
              isWizardActive
                ? "text-emerald-600 border-emerald-600"
                : "text-slate-500 hover:text-slate-900 border-transparent"
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-500 pulse-glow" />
            Live Session
          </button>

          <button
            onClick={() => setView("results")}
            className={`text-sm font-bold tracking-wide uppercase transition-all duration-200 pb-1 border-b-2 ${
              currentView === "results"
                ? "text-indigo-600 border-indigo-600"
                : "text-slate-500 hover:text-slate-900 border-transparent"
            }`}
          >
            Live Results
          </button>
        </nav>

        {/* Right side CTA / Auth Info */}
        <div className="flex items-center gap-3">
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setView("admin-portal")}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl font-bold text-xs uppercase hover:bg-indigo-100 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                Admin Dashboard
              </button>
              <button
                onClick={logoutAdmin}
                className="px-4 py-2 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl font-bold text-xs uppercase hover:bg-rose-100 transition-all cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setView("admin")}
              className={`flex items-center gap-2 text-xs font-bold uppercase py-2.5 px-5 rounded-full border transition-all duration-300 ${
                currentView === "admin"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-100 text-slate-700 border-slate-200/80 hover:border-indigo-600 hover:text-indigo-600"
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              Admin Access
            </button>
          )}

          {/* User Status Badge */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 border border-slate-200/60 hover:border-indigo-600 transition-all cursor-pointer">
            <span className="material-symbols-outlined text-slate-700 text-xl">account_circle</span>
          </div>
        </div>

      </div>
    </header>
  );
}
