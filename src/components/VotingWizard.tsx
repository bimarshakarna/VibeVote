import { useState } from "react";
import { 
  Sparkles, 
  ChevronRight, 
  HelpCircle, 
  CheckCircle,
  Activity,
  ArrowRight,
  UserCheck
} from "lucide-react";
import { Candidate } from "../types";
import { CATEGORIES, ROLE_OPTIONS } from "../mockData";

interface VotingWizardProps {
  candidates: Candidate[];
  selectedHouse: string | null;
  onCompleteBallot: (votesMap: { [role: string]: string }) => void;
  onExit: () => void;
}

export default function VotingWizard({
  candidates,
  selectedHouse,
  onCompleteBallot,
  onExit,
}: VotingWizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [ballotVotes, setBallotVotes] = useState<{ [role: string]: string }>({});

  // Dynamic steps based on chosen house
  const wizardSteps = ROLE_OPTIONS.map((role, idx) => ({
    role,
    category: CATEGORIES[idx]
  })).filter(step => {
    const roleLower = step.role.toLowerCase();
    if (roleLower.includes("house")) {
      return selectedHouse ? roleLower.includes(selectedHouse.toLowerCase()) : false;
    }
    return true; // Keep global roles
  });

  const currentRoleValue = wizardSteps[currentStepIndex]?.role || "";
  const currentCategoryTitle = wizardSteps[currentStepIndex]?.category || "";

  // Candidates registered for the current role
  let roleCandidates = candidates.filter(
    (c) => c.role.toLowerCase() === currentRoleValue.toLowerCase()
  );

  // Fallback defaults if no candidates are active in the system for this role
  if (roleCandidates.length === 0) {
    if (currentRoleValue.toLowerCase() === "green house captain") {
      roleCandidates = [
        {
          id: "gh-flora-default",
          name: "Flora Root",
          role: "Green house captain",
          symbol: "🌱",
          tagline: "Earth First",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
          votes: 120
        },
        {
          id: "gh-willow-default",
          name: "Willow Branch",
          role: "Green house captain",
          symbol: "🍁",
          tagline: "Sustainable Life",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
          votes: 95
        }
      ];
    } else {
      // General fallbacks
      roleCandidates = [
        {
          id: `standby-1-${currentStepIndex}`,
          name: `Alex "Volt" Chen`,
          role: currentRoleValue,
          symbol: "⚡",
          tagline: "Innovation Party",
          avatar: "",
          votes: 0
        },
        {
          id: `standby-2-${currentStepIndex}`,
          name: `Sarah "Cosmic" Starlight`,
          role: currentRoleValue,
          symbol: "🌟",
          tagline: "Cosmic Coalition",
          avatar: "",
          votes: 0
        }
      ];
    }
  }

  // Handle voting for a candidate in the current step
  const handleVote = (candidateId: string) => {
    // Record vote
    const updatedVotes = { ...ballotVotes, [currentRoleValue]: candidateId };
    setBallotVotes(updatedVotes);
    
    // Confetti effect trigger can be handled visually
    triggerConfettiBurst();

    advanceStep(updatedVotes);
  };

  // Skip the current step
  const handleSkip = () => {
    advanceStep(ballotVotes);
  };

  // Move flow forward
  const advanceStep = (updatedVotes: { [role: string]: string }) => {
    if (currentStepIndex < wizardSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Completed last step, trigger ballot submission
      onCompleteBallot(updatedVotes);
    }
  };

  // Visually simulate beautiful confetti flying vectors
  const triggerConfettiBurst = () => {
    const burstCount = 20;
    const bodyWidth = window.innerWidth;
    const bodyHeight = window.innerHeight;

    for (let i = 0; i < burstCount; i++) {
      const dot = document.createElement("div");
      dot.className = "confetti";
      dot.style.position = "absolute";
      dot.style.width = "8px";
      dot.style.height = "8px";
      dot.style.borderRadius = "50%";
      dot.style.pointerEvents = "none";
      dot.style.zIndex = "999";
      dot.style.opacity = "0";
      
      // Randomly color pink or green
      dot.style.backgroundColor = i % 2 === 0 ? "#b8c3ff" : "#00e297";
      dot.style.left = `${bodyWidth / 2}px`;
      dot.style.top = `${bodyHeight / 2}px`;

      const destX = (Math.random() - 0.5) * 500;
      const destY = (Math.random() - 0.5) * 500;
      
      dot.style.setProperty("--x", `${destX}px`);
      dot.style.setProperty("--y", `${destY}px`);
      
      document.body.appendChild(dot);

      dot.style.animation = "fly 0.8s ease-out forwards";
      setTimeout(() => dot.remove(), 850);
    }
  };

  // Compute exact percentage completed
  const progressPercent = ((currentStepIndex + 1) / wizardSteps.length) * 100;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center py-6 px-4 animate-fade-in relative min-h-[calc(100vh-120px)]">
      
      {/* Step Indicator Header Dashboard */}
      <div className="w-full max-w-4xl mt-4 mb-10 space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-indigo-600 animate-pulse" />
            <span className="font-display text-lg font-black text-slate-900">
              Step {currentStepIndex + 1}: <span className="text-indigo-600">{currentCategoryTitle}</span>
            </span>
          </div>
          
          <span className="font-sans text-xs font-bold text-indigo-600 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 select-none">
            {currentStepIndex + 1} of {wizardSteps.length} Categories
          </span>
        </div>

        {/* Progress track */}
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Candidates Selection Box Container */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {roleCandidates.map((c) => (
          <div
            key={c.id}
            className="glass-card rounded-[2.5rem] p-8 relative flex flex-col justify-between group overflow-hidden border border-slate-200/80 hover:border-slate-300 hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(15,23,42,0.04)]"
          >
            {/* Ambient Watermark logo */}
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-25 transition-opacity duration-300 emoji-float pointer-events-none select-none">
              <span className="text-8xl">{c.symbol}</span>
            </div>

            <div className="flex flex-col items-center text-center">
              {/* Profile card picture/emoji */}
              <div className="w-24 h-24 rounded-full border border-slate-200 p-1.5 overflow-hidden mb-6 bg-slate-50 relative">
                {c.avatar ? (
                  <img
                    src={c.avatar}
                    alt={c.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl bg-slate-100 rounded-full font-bold select-none">
                    {c.symbol}
                  </div>
                )}
              </div>

              <h3 className="font-display text-xl font-bold text-slate-900 mb-2 leading-tight">
                {c.name}
              </h3>

              {/* Dynamic taglines */}
              <div className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-50 rounded-full border border-indigo-100/60 mb-6">
                <span className="text-xs select-none">{c.symbol}</span>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{c.tagline}</span>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs italic font-medium">
                "Consistent dedication to transparent decisions, empowering and representing every single student voice."
              </p>
            </div>

            {/* Live voting dispatcher */}
            <button
              onClick={() => handleVote(c.id)}
              className="w-full py-4 bg-indigo-600 text-white font-display font-extrabold text-sm tracking-widest rounded-2xl button-push flex items-center justify-center gap-2 uppercase hover:bg-indigo-700 cursor-pointer"
            >
              <span>Cast Vote</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Skip Vote trigger panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl border-t border-slate-200 pt-8 gap-4 mt-auto">
        <button
          onClick={onExit}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer uppercase tracking-widest hover:scale-105"
        >
          Exit Session
        </button>

        <button
          onClick={handleSkip}
          className="ghost-button border border-slate-200 px-8 py-3 bg-white text-indigo-600 hover:text-indigo-700 hover:border-indigo-400 text-xs font-bold rounded-full flex items-center gap-2 select-none tracking-widest cursor-pointer uppercase transition-all"
        >
          <span>Skip Vote</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
