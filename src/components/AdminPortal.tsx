import React, { useState } from "react";
import { 
  Users, 
  Settings, 
  Trash2, 
  Edit3, 
  PlusCircle, 
  ShieldAlert, 
  CheckCircle,
  TrendingUp,
  History,
  Lock,
  Smile,
  X,
  Search
} from "lucide-react";
import { Candidate, ActivityLog } from "../types";
import { ROLE_OPTIONS, EMOJI_OPTIONS } from "../mockData";
import { EMOJI_NAMES_MAP } from "../utils/emojiData";

interface AdminPortalProps {
  candidates: Candidate[];
  onAddCandidate: (candidate: Omit<Candidate, "votes">) => void;
  onDeleteCandidate: (id: string) => void;
  onUpdateCandidate: (candidate: Candidate) => void;
  onUpdatePIN: (currentPin: string, newPin: string) => boolean;
  activityLogs: ActivityLog[];
  addActivityLog: (event: string, type: "success" | "warning" | "info" | "error") => void;
  onClearVotes: () => void;
}

export default function AdminPortal({
  candidates,
  onAddCandidate,
  onDeleteCandidate,
  onUpdateCandidate,
  onUpdatePIN,
  activityLogs,
  addActivityLog,
  onClearVotes,
}: AdminPortalProps) {
  // Sidebar Tab Control
  const [activeTab, setActiveTab] = useState<"candidates" | "logs">("candidates");

  // Add & Edit Candidate Form States
  const [editingCandidateId, setEditingCandidateId] = useState<string | null>(null);
  const [candidateName, setCandidateName] = useState("");
  const [candidateRole, setCandidateRole] = useState("");
  const [candidateTagline, setCandidateTagline] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("Choose an emoji...");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [emojiSearch, setEmojiSearch] = useState("");
  const [emojiCategory, setEmojiCategory] = useState<string>("All");

  // PIN security states
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [securitySuccess, setSecuritySuccess] = useState<string | null>(null);
  const [securityError, setSecurityError] = useState<string | null>(null);

  // Helper to start editing a candidate
  const startEditCandidate = (c: Candidate) => {
    setEditingCandidateId(c.id);
    setCandidateName(c.name);
    setCandidateRole(c.role);
    setCandidateTagline(c.tagline);
    setSelectedEmoji(c.symbol);
    // Scroll smoothly to form
    const formEl = document.getElementById("admin-form-anchor");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Reset form status
  const resetForm = () => {
    setEditingCandidateId(null);
    setCandidateName("");
    setCandidateRole("");
    setCandidateTagline("");
    setSelectedEmoji("Choose an emoji...");
    setIsEmojiPickerOpen(false);
  };

  // Submit candidate form registration or update
  const handleCandidateSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim() || !candidateRole || selectedEmoji === "Choose an emoji...") {
      addActivityLog("Validation failed during candidate editing", "error");
      alert("Please fill in Candidate Name, select a Role and choose a Vibe Symbol.");
      return;
    }

    if (editingCandidateId) {
      // Find the old candidate to maintain vote count or update
      const existing = candidates.find((c) => c.id === editingCandidateId);
      const updated: Candidate = {
        id: editingCandidateId,
        name: candidateName,
        role: candidateRole,
        symbol: selectedEmoji,
        tagline: candidateTagline || "Dynamic Vision",
        avatar: existing?.avatar || "",
        votes: existing?.votes || 0,
      };
      onUpdateCandidate(updated);
      addActivityLog(`Updated Candidate: ${candidateName} (${candidateRole})`, "success");
    } else {
      const generatedId = `c-${Date.now()}`;
      onAddCandidate({
        id: generatedId,
        name: candidateName,
        role: candidateRole,
        symbol: selectedEmoji,
        tagline: candidateTagline || "Bold Perspective",
        avatar: "", // Will render beautiful fallback character/initials elegantly
      });
      addActivityLog(`Registered Candidate: ${candidateName} under ${candidateRole}`, "success");
    }
    resetForm();
  };

  // Updation for secure admin lock-code
  const handlePinUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSecuritySuccess(null);
    setSecurityError(null);

    if (oldPin.length !== 4 || newPin.length !== 4) {
      setSecurityError("PIN codes must be exactly 4 digits.");
      addActivityLog("Attempted pass-code modification with invalid format length", "warning");
      return;
    }

    const successful = onUpdatePIN(oldPin, newPin);
    if (successful) {
      setSecuritySuccess("PIN Key code modified successfully!");
      addActivityLog("Secure Admin Access PIN code updated", "success");
      setOldPin("");
      setNewPin("");
    } else {
      setSecurityError("Incorrect current passcode. Please inspect inputs.");
      addActivityLog("Admin PIN code update failed - incorrect old PIN", "error");
    }
  };

  // Categorize standard emojis dynamically
  const getEmojiCategory = (emoji: string): string => {
    // Smileys & Emotions, hands, hearts
    const smileys = [
      "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🫣", "🤭", "🫢", "🤫", "🫠", "🤥", "😶", "😐", "😑", "😬", "🫨", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "😵‍💫", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾",
      "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🫰", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃", "🧠", "🫀", "🫁", "🦷", "🦴", "👀", "👁️", "👅", "👄", "💋", "🩸",
      "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❤️‍🔥", "❤️‍🩹", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝"
    ];
    
    const animals = [
      "🦁", "🐺", "🦊", "🦝", "🐱", "🐈", "🐈‍⬛", "🐶", "🐕", "🐩", "🦮", "🐕‍🦺", "🐯", "🐅", "🐆", "🐴", "🫏", "🐎", "🦄", "🫎", "🦌", "🦬", "🐮", "🦛", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦣", "🦏", "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿️", "🦫", "🦔", "🦇", "🐻", "🐻‍❄️", "🐨", "🐼", "🦥", "🦦", "🦨", "🦡", "🐸", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🦭", "🐟", "🐠", "🐡", "🦈", "🐙", "🦑", "🪼", "🦐", "🦞", "🦀",
      "🐝", "🪱", "🐛", "🦋", "🐌", "🐞", "🐜", "🪰", "🪲", "🪳", "🦟", "🦗", "🕷️", "🕸️", "🦂",
      "💐", "🌸", "💮", "🪻", "🌹", "🥀", "🌺", "🌻", "🌼", "🌷", "🌱", "🪴", "🌲", "🌳", "🌴", "🌵", "🌾", "🌿", "☘️", "🍀", "🍁", "🍂", "🍃", "🍄", "🌰", "🪨", "🪵", "🌊", "🌬️", "🌀", "⭐", "🌟", "✨", "⚡", "🔥", "🌈", "☀️", "🌤️", "⛅", "🌥️", "☁️", "🌦️", "🌧️", "🌨️", "🌩️", "🌪️", "🌫️", "❄️", "⛄", "☄️", "🌌", "🌍", "🌎", "🌏", "🪐", "🌙", "🌘", "🌗", "🌖", "🌕"
    ];
    
    const food = [
      "🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🫐", "🥝", "🍅", "🫒", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶️", "🫑", "🧅", "🧄", "🫘", "🥬", "🥦", "🥜", "🥐", "🍞", "🥖", "🫓", "🥨", "🥯", "🥞", " waffle", "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🫔", "🥗", "🍿", "🧈", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🥛", "☕", "🫖", "🍵", "🧉", "🥤", "🧋", "🍶", "🍺", "🍻", "🥂", "🍷", "🥃", "🍸", "🍹", "🍾", "🧊"
    ];

    const sports = [
      "⚽", "🏀", "🏈", "⚾", "🥎", " tennis", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🪃", "🥅", "⛳", "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛼", "🛷", "⛸️", "🥌", "🎿", "⛷️", "🏂", "🏋️", "🤺", "🤼", "🤸", "⛹️", "🤾", "🧗", "🚴", "🚵", "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "🏵️", "🎫", "🎟️", "🎭", "🎨", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🪕", "🎻", "🎲", "♟️", "🎯", "🎳", "🎮", "🎰", "🧩"
    ];

    if (smileys.includes(emoji)) return "Smileys";
    if (animals.includes(emoji)) return "Animals";
    if (food.includes(emoji)) return "Food";
    if (sports.includes(emoji)) return "Sports";
    return "Objects";
  };

  // Category symbols for custom Picker dropdown with descriptive keyword searching
  const filteredEmojis = EMOJI_OPTIONS.filter((emoji) => {
    const isCategoryMatch = emojiCategory === "All" || getEmojiCategory(emoji) === emojiCategory;
    
    // Search matching logic:
    const searchVal = emojiSearch.toLowerCase().trim();
    if (!searchVal) return isCategoryMatch;
    
    // Direct matches, tag matches, or alias checks
    const tags = EMOJI_NAMES_MAP[emoji]?.toLowerCase() || "";
    const isSearchMatch = 
      emoji === searchVal || 
      tags.includes(searchVal);
      
    return isCategoryMatch && isSearchMatch;
  });

  return (
    <div className="w-full relative py-8 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar Navigation Columns */}
        <aside className="w-full lg:w-64 space-y-4 flex-shrink-0">
          <button
            onClick={() => setActiveTab("candidates")}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-sans tracking-wide transition-all uppercase text-xs font-bold ${
              activeTab === "candidates"
                ? "bg-indigo-50 text-indigo-600 border border-indigo-200/80 shadow-sm"
                : "bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Manage Candidates</span>
          </button>

          <button
            onClick={() => setActiveTab("logs")}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl font-sans tracking-wide transition-all uppercase text-xs font-bold ${
              activeTab === "logs"
                ? "bg-indigo-50 text-indigo-600 border border-indigo-200/80 shadow-sm"
                : "bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm"
            }`}
          >
            <History className="w-4 h-4" />
            <span>Activity Logs & Security</span>
          </button>
        </aside>

        {/* Dynamic content canvas */}
        <div className="flex-grow space-y-8">
          
          {activeTab === "candidates" ? (
            <section className="space-y-8" id="admin-form-anchor">
              
              {/* Form container: Add/Edit Candidate */}
              <div className="glass-card rounded-2xl p-8 relative overflow-visible border border-slate-200/80 shadow-sm">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none select-none">
                  <PlusCircle className="w-[120px] h-[120px] text-indigo-600" />
                </div>

                <h2 className="font-display text-2xl font-black text-slate-900 mb-6 font-semibold">
                  {editingCandidateId ? "Edit Candidate Settings" : "Add New Candidate"}
                </h2>

                <form onSubmit={handleCandidateSubmission} className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Candidate Name input */}
                    <div className="space-y-2">
                       <label className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Candidate Name
                      </label>
                      <input
                        type="text"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 placeholder:text-slate-400"
                        placeholder="e.g. Luna Starlight"
                        required
                      />
                    </div>

                    {/* Candidate Select Role options */}
                    <div className="space-y-2">
                       <label className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Role
                      </label>
                      <select
                        value={candidateRole}
                        onChange={(e) => setCandidateRole(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 cursor-pointer focus:ring-1 focus:ring-indigo-600"
                        required
                      >
                        <option value="" disabled>Select Role Selection</option>
                        {ROLE_OPTIONS.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Dynamic customizable party tagline */}
                    <div className="space-y-2">
                       <label className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Party Label & Tagline
                      </label>
                      <input
                        type="text"
                        value={candidateTagline}
                        onChange={(e) => setCandidateTagline(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 placeholder:text-slate-400"
                        placeholder="e.g. Bold Vision, Cosmic Coalition"
                      />
                    </div>

                  </div>

                  {/* Dynamic Emoji selector triggers dropdown */}
                  <div className="space-y-2 max-w-sm">
                     <label className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Vibe Symbol (Emoji Avatar Representation)
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                        className="w-full flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 hover:border-indigo-600 cursor-pointer"
                      >
                        <span className="font-medium text-slate-800 select-none">{selectedEmoji}</span>
                        <Smile className="w-4 h-4 text-indigo-600 shrink-0" />
                      </button>

                      {/* Dropdown popup */}
                      {isEmojiPickerOpen && (
                        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl p-4 z-50 shadow-xl border border-slate-200">
                          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
                            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Select Vibe symbol</span>
                            <button
                              type="button"
                              onClick={() => setIsEmojiPickerOpen(false)}
                              className="text-slate-400 hover:text-slate-700 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Search Input Bar */}
                          <div className="relative mb-3">
                            <input
                              type="text"
                              value={emojiSearch}
                              onChange={(e) => setEmojiSearch(e.target.value)}
                              placeholder="Search emoji (e.g. lion, wolf, star, food)..."
                              className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 hover:border-slate-300 rounded-xl pl-9 pr-8 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans transition-all shadow-sm"
                            />
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
                            {emojiSearch && (
                              <button
                                type="button"
                                onClick={() => setEmojiSearch("")}
                                className="absolute right-3 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 cursor-pointer transition-all"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>

                          {/* Category Tabs list */}
                          <div className="flex gap-1 overflow-x-auto pb-2 mb-3 scrollbar-none border-b border-slate-100 select-none">
                            {[
                              { id: "All", label: "✨ All" },
                              { id: "Smileys", label: "😀 Smileys" },
                              { id: "Animals", label: "🦁 Animals" },
                              { id: "Food", label: "🍔 Food" },
                              { id: "Sports", label: "⚽ Sports" },
                              { id: "Objects", label: "💡 Objects" }
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                type="button"
                                onClick={() => {
                                  setEmojiCategory(tab.id);
                                }}
                                className={`px-2.5 py-1 text-[11px] font-bold font-sans rounded-lg border shrink-0 transition-all cursor-pointer ${
                                  emojiCategory === tab.id
                                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm"
                                    : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700"
                                }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>

                          <div className="grid grid-cols-7 gap-1.5 max-h-52 overflow-y-auto pr-1">
                            {filteredEmojis.map((emoji) => (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => {
                                  setSelectedEmoji(emoji);
                                  setIsEmojiPickerOpen(false);
                                }}
                                className="hover:bg-indigo-50 p-1.5 text-center rounded-lg text-lg hover:scale-110 active:scale-90 transition-all cursor-pointer"
                              >
                                {emoji}
                              </button>
                            ))}
                            {filteredEmojis.length === 0 && (
                              <div className="col-span-7 py-6 text-center text-slate-400 text-xs font-sans">
                                No symbols found in this category
                              </div>
                            )}
                          </div>

                          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono text-right leading-none select-none">
                            Total: {filteredEmojis.length} symbols
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button
                      type="submit"
                      className="button-push bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold font-display uppercase tracking-wider text-xs flex items-center gap-2 cursor-pointer hover:bg-indigo-700 hover:shadow-md"
                    >
                      <PlusCircle className="w-4 h-4 shrink-0" />
                      <span>{editingCandidateId ? "Update Candidate" : "Register Candidate"}</span>
                    </button>

                    {editingCandidateId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 py-3.5 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                </form>
              </div>

              {/* Candidates Inventory list */}
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <span>Active Candidates Registry</span>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 select-none">
                    {candidates.length} Registered
                  </span>
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {candidates.map((c) => (
                    <div
                      key={c.id}
                      className="glass-card rounded-2xl p-6 flex items-center justify-between group hover:border-indigo-200 transition-all border border-slate-200/85"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-2xl border border-indigo-100/80 font-bold select-none">
                          {c.symbol}
                        </div>
                        <div>
                          <p className="font-display text-base font-bold text-slate-900 pr-2">
                            {c.name}
                          </p>
                          <p className="font-sans text-xs font-bold text-indigo-600 uppercase mt-0.5 tracking-wide">
                            {c.role}
                          </p>
                          <p className="font-sans text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <span>Tagline:</span>
                            <span className="italic">"{c.tagline}"</span>
                          </p>
                        </div>
                      </div>

                      {/* Action Triggers */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => startEditCandidate(c)}
                          className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
                          title="Edit candidate profile info"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteCandidate(c.id)}
                          className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                          title="Remove from registrar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </section>
          ) : (
            // Logging and PIN settings dashboard section
            <section className="space-y-8">
              
              {/* PIN Settings card component */}
              <div className="glass-card rounded-2xl p-8 relative overflow-hidden border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200">
                  <Lock className="w-5 h-5 text-indigo-600 shrink-0" />
                  <h3 className="font-display text-lg font-black text-slate-900">
                    Access Control Config
                  </h3>
                </div>

                <form onSubmit={handlePinUpdateSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    <div className="space-y-2">
                      <label className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Current Admin PIN
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={oldPin}
                        onChange={(e) => setOldPin(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-850 focus:outline-none focus:border-indigo-600 placeholder:text-slate-300 tracking-widest font-black"
                        placeholder="••••"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">
                        New Admin PIN
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-850 focus:outline-none focus:border-indigo-600 placeholder:text-slate-300 tracking-widest font-black"
                        placeholder="Enter new 4-digit numeric code"
                        required
                      />
                    </div>

                  </div>

                  {/* Feedback notices */}
                  {securitySuccess && (
                    <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {securitySuccess}
                    </div>
                  )}

                  {securityError && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4" />
                      {securityError}
                    </div>
                  )}

                  <div className="flex justify-start">
                    <button
                      type="submit"
                      className="button-push bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold font-display uppercase tracking-wider text-xs flex items-center gap-2 cursor-pointer hover:bg-indigo-700"
                    >
                      <span>Update Admin PIN</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Danger Zone: Election Maintenance */}
              <div className="glass-card rounded-2xl p-8 relative overflow-hidden border border-red-200 bg-red-50/15 shadow-sm">
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-red-100">
                  <span className="material-symbols-outlined text-red-650 font-bold">dangerous</span>
                  <h3 className="font-display text-lg font-bold text-red-900">
                    Election Maintenance (Danger Zone)
                  </h3>
                </div>
                <p className="font-sans text-xs text-slate-500 mb-6 leading-relaxed">
                  Resetting the election clears all logged votes for candidate registries back to <span className="font-bold">0</span> and resets overall voter turnout. This operation is <span className="font-bold underline text-red-600">irreversible</span> and will execute in real-time on all active client devices.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("WARNING: Are you absolutely sure you want to clear all votes? This will reset all active nominee counts and turnout to zero immediately across all devices!")) {
                        onClearVotes();
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 hover:bg-red-200 active:scale-95 text-xs font-bold font-sans uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-red-200/50"
                  >
                    <Trash2 className="w-4 h-4 shrink-0" />
                    <span>Purge & Reset All Election Votes</span>
                  </button>
                </div>
              </div>

              {/* Activity History Logs list */}
              <div className="glass-card rounded-2xl p-8 border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <History className="w-5 h-5 text-indigo-600 shrink-0" />
                  <h3 className="font-display text-lg font-black text-slate-900">
                    Audit Activity History
                  </h3>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {activityLogs.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">
                      No events registered in this session audit loop yet.
                    </p>
                  ) : (
                    activityLogs.map((log) => {
                      let tagColorClass = "text-indigo-600 bg-indigo-50 border-indigo-200";
                      if (log.type === "success") {
                        tagColorClass = "text-emerald-750 bg-emerald-50 border-emerald-200";
                      } else if (log.type === "warning" || log.type === "error") {
                        tagColorClass = "text-red-700 bg-red-50/70 border-red-200";
                      }

                      return (
                        <div
                          key={log.id}
                          className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50/50 border border-slate-200/80 text-xs hover:bg-slate-100/30"
                        >
                          <div className="space-y-1">
                            <span className="font-mono text-[10px] text-slate-400 mr-3">
                              {log.time}
                            </span>
                            <span className="text-slate-700 font-medium">{log.event}</span>
                          </div>
                          
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest border select-none shrink-0 ml-4 ${tagColorClass}`}>
                            {log.type}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </section>
          )}

        </div>
      </div>
    </div>
  );
}
