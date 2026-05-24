import { useState } from "react";
import { Search, Sparkles, User, Award, CheckSquare, Layers } from "lucide-react";
import { Candidate } from "../types";

interface PublicPortalProps {
  candidates: Candidate[];
  onInstantVote: (candidate: Candidate) => void;
  startLiveSession: () => void;
  turnoutPercent: number;
  selectedHouse: string | null;
  setSelectedHouse: (house: string | null) => void;
}

export default function PublicPortal({
  candidates,
  onInstantVote,
  startLiveSession,
  turnoutPercent,
  selectedHouse,
  setSelectedHouse,
}: PublicPortalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("All");

  // Filter candidates by chosen house, search queries, and role filter
  const filteredCandidates = candidates.filter((c) => {
    // 1. House filtering logic
    const roleLower = c.role.toLowerCase();
    if (roleLower.includes("house")) {
      // If a candidate is in a house role, it must match the active selected house
      if (!selectedHouse || !roleLower.includes(selectedHouse.toLowerCase())) {
        return false;
      }
    }

    // 2. Search queries
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 3. Dropdown role filter
    const matchesFilter =
      selectedRoleFilter === "All" ||
      c.role.toLowerCase() === selectedRoleFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  // Unique roles currently in candidates state to use for filter options, only keeping current house roles
  const filteredRolesCandidates = candidates.filter((c) => {
    const roleLower = c.role.toLowerCase();
    if (roleLower.includes("house")) {
      return selectedHouse ? roleLower.includes(selectedHouse.toLowerCase()) : false;
    }
    return true;
  });
  const uniqueRoles = Array.from(new Set(filteredRolesCandidates.map((c) => c.role)));

  return (
    <div className="w-full relative py-8">
      {!selectedHouse ? (
        /* Choose Your House Banner - Starting Screen */
        <section className="relative py-12 md:py-16 flex flex-col items-center text-center overflow-visible">
          {/* Ambient background glow */}
          <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-50/15 blur-[130px] rounded-full pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 mb-6 select-none">
            <span className="material-symbols-outlined text-[18px] text-amber-500 font-bold">house_siding</span>
            <span className="font-sans text-xs font-extrabold tracking-widest uppercase text-indigo-600">First Step: Select Your House affiliation</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 max-w-4xl text-slate-900">
            Choose Your <span className="bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent font-black">House</span> to Vote
          </h1>

          <p className="font-sans text-lg text-slate-500 max-w-2xl mb-12 leading-relaxed px-4">
            Select your registered house to begin. You will be voting for general positions as well as the representatives representing your house.
          </p>

          {/* 4 House options with premium styling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4 mb-8">
            
            {/* Yellow House */}
            <button
              onClick={() => setSelectedHouse("Yellow")}
              className="group relative flex flex-col items-center bg-white border border-slate-200 hover:border-amber-400 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-center"
            >
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300 shadow-sm border border-amber-100/50">
                <span className="text-3xl">🟡</span>
              </div>
              <h3 className="font-display text-xl font-black text-amber-600 mb-1">Yellow House</h3>
              <p className="text-[10px] font-bold font-sans text-slate-400 tracking-widest uppercase mb-3">Sol Spirit</p>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                Unleashing bright optimism, intellectual focus, and creative solutions across activities.
              </p>
              <div className="mt-auto px-5 py-2.5 bg-amber-500 group-hover:bg-amber-600 text-white font-display text-xs font-bold tracking-wider uppercase rounded-xl transition-colors">
                Select Yellow
              </div>
            </button>

            {/* Green House */}
            <button
              onClick={() => setSelectedHouse("Green")}
              className="group relative flex flex-col items-center bg-white border border-slate-200 hover:border-emerald-400 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-center"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300 shadow-sm border border-emerald-100/50">
                <span className="text-3xl">🟢</span>
              </div>
              <h3 className="font-display text-xl font-black text-emerald-600 mb-1">Green House</h3>
              <p className="text-[10px] font-bold font-sans text-slate-400 tracking-widest uppercase mb-3">Terra Roots</p>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                Eco-aware responsibility, steady balance, and resilient forward growth in representation.
              </p>
              <div className="mt-auto px-5 py-2.5 bg-emerald-600 group-hover:bg-emerald-700 text-white font-display text-xs font-bold tracking-wider uppercase rounded-xl transition-colors">
                Select Green
              </div>
            </button>

            {/* Red House */}
            <button
              onClick={() => setSelectedHouse("Red")}
              className="group relative flex flex-col items-center bg-white border border-slate-200 hover:border-rose-400 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-center"
            >
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-rose-100 transition-all duration-300 shadow-sm border border-rose-100/50">
                <span className="text-3xl">🔴</span>
              </div>
              <h3 className="font-display text-xl font-black text-rose-600 mb-1">Red House</h3>
              <p className="text-[10px] font-bold font-sans text-slate-400 tracking-widest uppercase mb-3">Ignis Fire</p>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                Igniting courageous teamwork, vibrant expression, and dynamic leadership actions.
              </p>
              <div className="mt-auto px-5 py-2.5 bg-rose-500 group-hover:bg-rose-600 text-white font-display text-xs font-bold tracking-wider uppercase rounded-xl transition-colors">
                Select Red
              </div>
            </button>

            {/* Blue House */}
            <button
              onClick={() => setSelectedHouse("Blue")}
              className="group relative flex flex-col items-center bg-white border border-slate-200 hover:border-blue-400 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-center"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300 shadow-sm border border-blue-100/50">
                <span className="text-3xl">🔵</span>
              </div>
              <h3 className="font-display text-xl font-black text-blue-600 mb-1">Blue House</h3>
              <p className="text-[10px] font-bold font-sans text-slate-400 tracking-widest uppercase mb-3">Aqua Flow</p>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                Diving into deep loyalty, serene peace, and focused strategic wisdom in building unity.
              </p>
              <div className="mt-auto px-5 py-2.5 bg-blue-500 group-hover:bg-blue-600 text-white font-display text-xs font-bold tracking-wider uppercase rounded-xl transition-colors">
                Select Blue
              </div>
            </button>

          </div>
        </section>
      ) : (
        <>
          {/* House indicator info banner with Change House flow option */}
          <div className="w-full max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border bg-white shadow-sm transition-all animate-fade-in border-slate-200">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                selectedHouse === "Yellow" ? "bg-amber-50 text-amber-500" :
                selectedHouse === "Green" ? "bg-emerald-50 text-emerald-500" :
                selectedHouse === "Red" ? "bg-rose-50 text-rose-500" : "bg-blue-50 text-blue-550"
              }`}>
                <span className="text-xl animate-bounce">
                  {selectedHouse === "Yellow" ? "🟡" : selectedHouse === "Green" ? "🟢" : selectedHouse === "Red" ? "🔴" : "🔵"}
                </span>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Voter Affiliation</p>
                <h4 className="text-sm font-black text-slate-800">
                  {selectedHouse} House Voter
                </h4>
              </div>
            </div>
            <button
              onClick={() => setSelectedHouse(null)}
              className="text-xs font-extrabold text-[#7445f1] hover:text-[#5833c0] bg-indigo-50/55 hover:bg-indigo-50/90 py-2.5 px-4 rounded-xl transition-all uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] font-bold">swap_horiz</span>
              Switch House
            </button>
          </div>

          {/* Hero section */}
      <section className="relative py-12 md:py-20 flex flex-col items-center text-center overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-50/55 blur-[130px] rounded-full pointer-events-none" />

        {/* Live notification pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 mb-6 pulse-glow select-none">
          <span className="material-symbols-outlined text-[18px] text-amber-500 font-bold fill-1">electric_bolt</span>
          <span className="font-sans text-xs font-extrabold tracking-widest uppercase text-indigo-600">Live Election Now</span>
        </div>

        <h1 className="font-display text-[40px] md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 max-w-4xl text-slate-900">
          The Future of <span className="bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">Community Voice</span> starts with you.
        </h1>

        <p className="font-sans text-lg text-slate-500 max-w-2xl mb-10 leading-relaxed px-4">
          Cast your vote for the leaders of the 2026 Vibe Council. Transparent, instant, and high-energy civic participation powered by our digital ballot engine.
        </p>

        {/* Action button to open Multi-Step Flow */}
        <button
          onClick={startLiveSession}
          className="button-push mb-14 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold font-display uppercase tracking-wider active:scale-95 flex items-center gap-3 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
          Start Multi-Step Voting Wizard
        </button>

        {/* Search & Progress Container */}
        <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-3 flex flex-col sm:flex-row items-center gap-2 shadow-sm">
          <div className="flex items-center gap-2 flex-grow w-full px-2">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none focus:ring-0 w-full text-base text-slate-800 placeholder:text-slate-400"
              placeholder="Search candidate name or vibe check..."
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto flex-shrink-0 self-stretch sm:self-auto justify-end">
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-600 hover:text-slate-900 hover:border-slate-300 focus:ring-0 cursor-pointer"
            >
              <option value="All">All Roles</option>
              {uniqueRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            {searchQuery || selectedRoleFilter !== "All" ? (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRoleFilter("All");
                }}
                className="text-xs text-red-500 px-3 hover:text-red-700 transition-colors font-semibold"
              >
                Reset
              </button>
            ) : null}
          </div>
        </div>

        {/* Turnout Progress Indicator */}
        <div className="mt-14 w-full max-w-2xl px-4">
          <div className="flex justify-between items-end mb-2.5">
            <span className="text-xs font-bold font-sans text-slate-400 uppercase tracking-widest">
              Current Voter Turnout
            </span>
            <span className="text-2xl font-display font-black text-indigo-600">
              {turnoutPercent}%
            </span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 relative rounded-full transition-all duration-1000"
              style={{ width: `${turnoutPercent}%` }}
            >
              {/* Shimmer overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2.5s_infinite] w-[140px]" />
            </div>
          </div>
        </div>

      </section>

      {/* Candidates Catalog Grid */}
      <section className="pb-24">
        {filteredCandidates.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto">
            <Award className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold font-display text-slate-900 mb-2">No Candidates Found</h3>
            <p className="text-sm text-slate-500">
              Try modifying your search or filters to find council candidates.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map((c) => {
              // Custom themes for specific candidates
              const isLeo = c.name === "Leo Sterling";
              const isElena = c.name === "Elena Nova";
              const isMarcus = c.name === "Marcus Stone";
              const isFlora = c.name === "Flora Root";
              
              let accentColorClass = "text-indigo-600";
              let badgeBgClass = "bg-indigo-50 border-indigo-100/80";
              let buttonBgClass = "bg-slate-900 text-white button-push hover:bg-slate-800";
              
              if (isLeo) {
                accentColorClass = "text-amber-600";
                badgeBgClass = "bg-amber-50 border-amber-100/80";
                buttonBgClass = "bg-slate-900 text-white button-push hover:bg-slate-800";
              } else if (isElena) {
                accentColorClass = "text-pink-600";
                badgeBgClass = "bg-pink-50 border-pink-100/80";
                buttonBgClass = "bg-indigo-600 text-white button-push-secondary hover:bg-indigo-700";
              } else if (isMarcus) {
                accentColorClass = "text-emerald-600";
                badgeBgClass = "bg-emerald-50 border-emerald-100/80";
                buttonBgClass = "bg-emerald-600 text-white button-push-tertiary hover:bg-emerald-700";
              } else if (isFlora) {
                accentColorClass = "text-emerald-700";
                badgeBgClass = "bg-emerald-50 border-emerald-100/80";
                buttonBgClass = "bg-emerald-600 text-white button-push-tertiary hover:bg-emerald-700";
              }

              return (
                <div
                  key={c.id}
                  className="glass-card rounded-[2.5rem] p-8 relative flex flex-col justify-between group overflow-hidden border border-slate-200/80 hover:border-slate-300 hover:shadow-lg hover:scale-101 duration-300"
                >
                  {/* Watermark character background */}
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none select-none">
                    <span className="text-8xl">{c.symbol}</span>
                  </div>

                  <div>
                    {/* Header with avatar / names */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full border border-slate-200 p-1 overflow-hidden bg-slate-50 relative">
                        {c.avatar ? (
                          <img
                            src={c.avatar}
                            alt={c.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl font-bold bg-slate-100 rounded-full">
                            {c.symbol}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-display text-slate-950 group-hover:text-indigo-600 transition-colors duration-200">
                          {c.name}
                        </h3>
                        {/* Styled Role tag */}
                        <div className="flex items-center gap-1.5 mt-1.5 px-3 py-1 bg-slate-100/80 rounded-full w-fit border border-slate-200/60">
                          <span className="text-xs">{c.symbol}</span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            {c.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Team Banner Vision */}
                    <div className={`mb-6 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl w-fit ${badgeBgClass} border`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span className={accentColorClass}>{c.tagline}</span>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                      "Focused on integrity and driving sustainable, high-impact improvements across our shared student campus experience."
                    </p>
                  </div>

                  {/* Cast vote action */}
                  <button
                    onClick={() => onInstantVote(c)}
                    className={`w-full py-4 rounded-xl font-display font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 ${buttonBgClass}`}
                  >
                    <span>Cast Vote</span>
                    <span className="material-symbols-outlined text-[18px]">how_to_vote</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
      </>
      )}
    </div>
  );
}
