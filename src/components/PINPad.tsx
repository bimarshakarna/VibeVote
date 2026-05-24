import { useState, useEffect } from "react";
import { ShieldAlert, Asterisk, XCircle } from "lucide-react";

interface PINPadProps {
  onSuccess: () => void;
  onCancel: () => void;
  correctPin: string;
}

export default function PINPad({ onSuccess, onCancel, correctPin }: PINPadProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Maximum pin limit is 4 digits
  const maxPinLength = 4;

  const handleInput = (num: string) => {
    if (pin.length < maxPinLength) {
      setPin((prev) => prev + num);
      setError(false);
    }
  };

  const handleClear = () => {
    setPin("");
    setError(false);
  };

  useEffect(() => {
    if (pin.length === maxPinLength) {
      // Small timeout to let dot animation complete
      const timer = setTimeout(() => {
        if (pin === correctPin) {
          onSuccess();
        } else {
          setError(true);
          setIsShaking(true);
          setPin("");
          // Clear shake after dynamic duration
          setTimeout(() => setIsShaking(false), 500);
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [pin, correctPin, onSuccess]);

  return (
    <div className="flex-grow flex items-center justify-center p-6 relative min-h-[calc(100vh-140px)]">
      {/* Dynamic atmospheric blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-50/50 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-emerald-50/50 blur-[120px] rounded-full" />
      </div>

      {/* Admin Entry Panel */}
      <div
        className={`relative w-full max-w-[420px] bg-white border border-slate-200/90 rounded-[2.5rem] p-10 md:p-12 shadow-sm flex flex-col items-center gap-8 ${
          isShaking ? "shake border-red-500/60 shadow-lg" : ""
        }`}
      >
        {/* Branding Title */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mb-2 hover:scale-105 transition-transform duration-300">
            <span className="material-symbols-outlined text-[32px] text-indigo-600 select-none font-bold">lock_person</span>
          </div>
          <h1 className="font-display text-2xl font-black text-slate-900 tracking-tight">
            VibeVote Admin Access
          </h1>
          <p className="font-sans text-xs font-semibold text-slate-500 text-center px-4 leading-normal">
            Enter the 4-digit Admin PIN code to view candidate metrics and register new ballots.
          </p>
        </div>

        {/* PIN slots indicator dots */}
        <div className="flex gap-4 mb-2">
          {Array.from({ length: maxPinLength }).map((_, index) => {
            const isFilled = index < pin.length;
            return (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  isFilled
                    ? "bg-indigo-600 border-indigo-600 scale-110 shadow-sm"
                    : error
                    ? "border-red-500 bg-red-100/50 scale-95"
                    : "border-slate-200 bg-slate-50"
                }`}
              />
            );
          })}
        </div>

        {/* Error Feedback */}
        <div className="h-6 -mt-2.5 transition-opacity duration-300 text-center">
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-xs font-extrabold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              Access Denied. Try again.
            </div>
          )}
        </div>

        {/* Tactile Numeric Keypad Grid */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-[280px]">
          {/* Numbers 1-9 */}
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <button
              key={num}
              onClick={() => handleInput(num)}
              className="w-16 h-16 mx-auto flex items-center justify-center font-display text-2xl font-black text-slate-850 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            >
              {num}
            </button>
          ))}

          {/* Bottom row actions */}
          <button
            onClick={onCancel}
            className="text-xs font-bold text-slate-500 hover:text-slate-950 transition-colors cursor-pointer text-center flex items-center justify-center uppercase tracking-widest hover:scale-105"
          >
            Cancel
          </button>

          <button
            onClick={() => handleInput("0")}
            className="w-16 h-16 mx-auto flex items-center justify-center font-display text-2xl font-black text-slate-850 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
          >
            0
          </button>

          <button
            onClick={handleClear}
            className="w-16 h-16 mx-auto flex items-center justify-center font-sans text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full hover:bg-emerald-100/80 active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
          >
            Clear
          </button>
        </div>

        {/* Guarding Shield Logo Footer */}
        <div className="mt-4 pt-6 border-t border-slate-200 w-full text-center">
          <span className="font-sans text-[10px] font-bold tracking-widest text-slate-400 uppercase select-none">
            Secured by VibeVote Shell
          </span>
        </div>

      </div>
    </div>
  );
}
