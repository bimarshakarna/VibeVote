import { Activity, BarChart, Clock, Percent, ShieldCheck } from "lucide-react";
import { Candidate } from "../types";

interface ResultsHubProps {
  candidates: Candidate[];
  totalVotes: number;
}

export default function ResultsHub({ candidates, totalVotes }: ResultsHubProps) {
  // Compute total votes for candidates currently registered
  const candidatesVotesTotal = candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div className="w-full space-y-8 py-8 animate-fade-in">
      
      {/* Visual Chart Card */}
      <div className="glass-card rounded-[2.5rem] p-8 md:p-10 space-y-8 relative overflow-hidden border border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-black text-slate-900">
              Live Vote Distribution
            </h2>
            <p className="font-sans text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
              Active Session Audit • Total: {candidatesVotesTotal.toLocaleString()} Votes Logged
            </p>
          </div>
          
          {/* Pulsing satellite broadcast badge */}
          <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-widest bg-teal-50 border border-teal-200/80 px-4 py-1.5 rounded-full select-none shrink-0 w-fit pulse-glow">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-ping" />
            <span>Broadcasting Live</span>
          </div>
        </div>

        <div className="space-y-6">
          {candidates.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-medium text-sm">
              Register candidates under the Admin board to see real-time metrics.
            </div>
          ) : (
            // Sort by vote count descending
            candidates
              .slice()
              .sort((a, b) => b.votes - a.votes)
              .map((c, index) => {
                // Compute visual percentage weight strictly
                const percent =
                  candidatesVotesTotal > 0
                    ? Math.round((c.votes / candidatesVotesTotal) * 100)
                    : 0;

                // Color themes dynamically cycling or mapped
                let barClass = "from-indigo-400 to-indigo-600";
                let textPercentClass = "text-indigo-600";
                
                if (index === 0) {
                  barClass = "from-emerald-400 to-emerald-600";
                  textPercentClass = "text-emerald-600";
                } else if (index === 1) {
                  barClass = "from-sky-400 to-sky-600";
                  textPercentClass = "text-sky-600";
                } else if (index === 3) {
                  barClass = "from-indigo-500 to-indigo-700";
                  textPercentClass = "text-indigo-700";
                }

                return (
                  <div key={c.id} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-sans tracking-tight">
                      <div className="flex items-center gap-2">
                        <span className="text-xl select-none">{c.symbol}</span>
                        <span className="text-slate-800 font-bold">{c.name}</span>
                        <span className="text-xs text-slate-500 uppercase px-2 py-0.5 bg-slate-50 border border-slate-200/60 rounded-md select-none shrink-0">
                          {c.role}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className={`text-base font-black ${textPercentClass}`}>
                          {percent}%
                        </span>
                        <span className="text-xs text-slate-400 ml-1.5 font-mono">
                          ({c.votes.toLocaleString()})
                        </span>
                      </div>
                    </div>

                    {/* Progress tracking track bar */}
                    <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden border-none">
                      <div
                        className={`h-full bg-gradient-to-r rounded-full transition-all duration-1000 ${barClass}`}
                        style={{ width: `${Math.max(percent, 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>

      {/* Aggregate metrics bento widget grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Polling wait times */}
        <div className="glass-card p-6 md:p-8 rounded-[2rem] text-center border border-slate-200/80 flex flex-col items-center justify-center">
          <Clock className="w-8 h-8 text-indigo-600 mb-3 stroke-[1.5px]" />
          <p className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 select-none">
            Avg Wait Time
          </p>
          <p className="font-display text-4xl font-black text-slate-900">
            2m 4s
          </p>
        </div>

        {/* Voter turnouts stats */}
        <div className="glass-card p-6 md:p-8 rounded-[2rem] text-center border border-slate-200/80 flex flex-col items-center justify-center">
          <Percent className="w-8 h-8 text-emerald-600 mb-3 stroke-[1.5px]" />
          <p className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 select-none">
            Voter Turnout Rate
          </p>
          <p className="font-display text-4xl font-black text-emerald-600">
            78.4%
          </p>
        </div>

        {/* Active polling stations */}
        <div className="glass-card p-6 md:p-8 rounded-[2rem] text-center border border-slate-200/80 flex flex-col items-center justify-center sm:col-span-2 lg:col-span-1">
          <ShieldCheck className="w-8 h-8 text-indigo-500 mb-3 stroke-[1.5px]" />
          <p className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 select-none">
            Polling Stations
          </p>
          <p className="font-display text-4xl font-black text-indigo-600">
            100% SECURE
          </p>
        </div>

      </div>

    </div>
  );
}
