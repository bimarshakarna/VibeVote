import { useState, useEffect } from "react";
import { CheckCircle2, ShieldAlert, Sparkles, Award } from "lucide-react";
import { ViewState, Candidate, ActivityLog } from "./types";
import { INITIAL_CANDIDATES } from "./mockData";
import Header from "./components/Header";
import PublicPortal from "./components/PublicPortal";
import PINPad from "./components/PINPad";
import AdminPortal from "./components/AdminPortal";
import ResultsHub from "./components/ResultsHub";
import VotingWizard from "./components/VotingWizard";

// Firestore Imports
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "./firebase";

export default function App() {
  // --- Persistent State Triggers ---
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [adminPin, setAdminPin] = useState<string>("1337");
  const [turnoutPercent, setTurnoutPercent] = useState<number>(68);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  // Administrator login session flag
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("vibevote_admin_logged_in") === "true";
  });

  // Navigation Panel Views
  const [view, setView] = useState<ViewState>("voting");

  // Wizard flow active indicator
  const [isWizardActive, setIsWizardActive] = useState(false);

  // Vote Submission Success Modal State
  const [voteSuccessModal, setVoteSuccessModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
  }>({
    isOpen: false,
    title: "",
    description: "",
  });

  // Dynamic state sync with localStorage for local UI state
  useEffect(() => {
    localStorage.setItem("vibevote_admin_logged_in", String(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  // Selected house state (Yellow, Green, Red)
  const [selectedHouse, setSelectedHouse] = useState<string | null>(() => {
    return localStorage.getItem("vibevote_selected_house") || null;
  });

  // Sync selected house with localStorage
  useEffect(() => {
    if (selectedHouse) {
      localStorage.setItem("vibevote_selected_house", selectedHouse);
    } else {
      localStorage.removeItem("vibevote_selected_house");
    }
  }, [selectedHouse]);

  // 1. Real-time Firestore Sync for Candidates
  useEffect(() => {
    const path = "candidates";
    let isSeeding = false;
    const unsubscribe = onSnapshot(
      collection(db, path),
      async (snapshot) => {
        if (snapshot.empty && !isSeeding) {
          isSeeding = true;
          try {
            const batch = writeBatch(db);
            INITIAL_CANDIDATES.forEach((c) => {
              const dRef = doc(db, path, c.id);
              batch.set(dRef, c);
            });
            await batch.commit();
            addActivityLog("Secure VibeVote candidate registry seeded successfully", "success");
          } catch (err) {
            console.error("Failed to seed initial candidates database:", err);
          } finally {
            isSeeding = false;
          }
        } else {
          const list: Candidate[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as Candidate);
          });
          
          // Sort candidates by custom order role alignment
          const roleOrder = ["Head boy", "Head girl", "Sports captain", "Event manager"];
          list.sort((a, b) => {
            const rA = roleOrder.indexOf(a.role);
            const rB = roleOrder.indexOf(b.role);
            if (rA !== rB) return rA - rB;
            return a.name.localeCompare(b.name);
          });
          setCandidates(list);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );
    return () => unsubscribe();
  }, []);

  // 2. Real-time Firestore Sync for Settings document
  useEffect(() => {
    const sPath = "settings";
    const unsubscribe = onSnapshot(
      doc(db, sPath, "config"),
      async (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data.adminPin) setAdminPin(data.adminPin);
          if (data.turnoutPercent !== undefined) setTurnoutPercent(data.turnoutPercent);
        } else {
          try {
            await setDoc(doc(db, sPath, "config"), {
              adminPin: "1337",
              turnoutPercent: 68.0
            });
          } catch (err) {
            console.error("Failed to auto-generate config document:", err);
          }
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, `${sPath}/config`);
      }
    );
    return () => unsubscribe();
  }, []);

  // 3. Real-time Firestore Sync for Activity logs
  useEffect(() => {
    const lPath = "logs";
    const q = query(collection(db, lPath), orderBy("timestamp", "desc"), limit(30));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: ActivityLog[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            time: data.time || new Date().toLocaleTimeString(),
            event: data.event,
            type: data.type
          } as ActivityLog);
        });
        setActivityLogs(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, lPath);
      }
    );
    return () => unsubscribe();
  }, []);

  // --- Helper Database Sync Actions ---

  // Write new log to the audit trace list in Firestore
  const addActivityLog = async (
    event: string,
    type: "success" | "warning" | "info" | "error" = "info"
  ) => {
    const lId = `l-${Date.now()}`;
    const logData = {
      event,
      type,
      time: new Date().toLocaleTimeString(),
      timestamp: Date.now()
    };
    try {
      await setDoc(doc(db, "logs", lId), logData);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `logs/${lId}`);
    }
  };

  // Turn off Admin access
  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setView("voting");
    addActivityLog("Administrator logged out successfully", "info");
  };

  // Authorize PIN entries
  const handlePinSuccess = () => {
    setIsAdminLoggedIn(true);
    setView("admin-portal");
    addActivityLog("Admin validated pass-code successfully", "success");
  };

  // Modify Admin PIN key values in Settings
  const handleUpdatePIN = (currentPin: string, newPin: string): boolean => {
    if (currentPin === adminPin) {
      updateDoc(doc(db, "settings", "config"), { adminPin: newPin })
        .then(() => {
          addActivityLog("Admin PIN successfully updated in Firestore", "success");
        })
        .catch((error) => {
          handleFirestoreError(error, OperationType.UPDATE, "settings/config");
        });
      return true;
    }
    return false;
  };

  // Delete active candidates from Firestore
  const handleDeleteCandidate = async (id: string) => {
    const deletingCandidate = candidates.find((c) => c.id === id);
    try {
      await deleteDoc(doc(db, "candidates", id));
      if (deletingCandidate) {
        addActivityLog(
          `Candidate removed: ${deletingCandidate.name} (${deletingCandidate.role})`,
          "warning"
        );
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `candidates/${id}`);
    }
  };

  // Register new candidate in Firestore
  const handleAddCandidate = async (newCandidateData: Omit<Candidate, "votes">) => {
    const cId = newCandidateData.id || `c-${Date.now()}`;
    const newCandidate: Candidate = {
      ...newCandidateData,
      id: cId,
      votes: 0,
    };
    try {
      await setDoc(doc(db, "candidates", cId), newCandidate);
      addActivityLog(`Registered Candidate: ${newCandidate.name} under ${newCandidate.role}`, "success");
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `candidates/${cId}`);
    }
  };

  // Update candidate parameters in Firestore
  const handleUpdateCandidate = async (updated: Candidate) => {
    try {
      await setDoc(doc(db, "candidates", updated.id), updated);
      addActivityLog(`Updated Candidate: ${updated.name} (${updated.role})`, "success");
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `candidates/${updated.id}`);
    }
  };

  // Instant Single Vote Cast Button Trigger
  const handleInstantVote = async (candidate: Candidate) => {
    try {
      const cRef = doc(db, "candidates", candidate.id);
      await updateDoc(cRef, { votes: candidate.votes + 1 });

      const updatedTurnout = parseFloat((turnoutPercent + 0.1).toFixed(1));
      await updateDoc(doc(db, "settings", "config"), { turnoutPercent: updatedTurnout });

      addActivityLog(`Instant ballot recorded for candidate: ${candidate.name}`, "success");

      // Display celebration modal
      setVoteSuccessModal({
        isOpen: true,
        title: "Vote Secured!",
        description: `Your voice has been successfully recorded for "${candidate.name}". Thank you for participating.`,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `candidates/${candidate.id}`);
    }
  };

  // End of Step Wizard submission ballot sync
  const handleCompleteWizardBallot = async (votesMap: { [role: string]: string }) => {
    const votedIds = Object.values(votesMap);

    try {
      const batch = writeBatch(db);
      votedIds.forEach((id) => {
        const c = candidates.find((cand) => cand.id === id);
        if (c) {
          const cRef = doc(db, "candidates", id);
          batch.update(cRef, { votes: c.votes + 1 });
        }
      });

      // Adjust turnout percentile for category entries completed
      const incrementAmount = parseFloat((votedIds.length * 0.4).toFixed(1));
      const targetTurnout = parseFloat(Math.min((turnoutPercent + incrementAmount), 99.4).toFixed(1));
      
      batch.update(doc(db, "settings", "config"), { turnoutPercent: targetTurnout });
      
      await batch.commit();

      setIsWizardActive(false);

      addActivityLog(
        `Full wizard ballot submitted with ${votedIds.length} categories completed`,
        "success"
      );

      // Display celebration modal
      setVoteSuccessModal({
        isOpen: true,
        title: "Ballot Submitted!",
        description: `Amazing! Your votes across all selected categories have been secured. Thank you for taking part!`,
      });

      // Route to see instant updated live statistics
      setView("results");
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "candidates/batch");
    }
  };

  // Purge/Clear all registered vote counts and reset election metrics
  const handleClearVotes = async () => {
    try {
      const batch = writeBatch(db);
      candidates.forEach((c) => {
        const cRef = doc(db, "candidates", c.id);
        batch.update(cRef, { votes: 0 });
      });
      batch.update(doc(db, "settings", "config"), { turnoutPercent: 0.0 });
      await batch.commit();

      addActivityLog("Administrator cleared all session votes and reset turnout metrics", "warning");

      setVoteSuccessModal({
        isOpen: true,
        title: "Election Purged!",
        description: "All active election vote counts and turnout stats have been cleared successfully across all platforms.",
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "candidates/clear_all");
    }
  };

  const handleCloseSuccessModal = () => {
    const title = voteSuccessModal.title;
    setVoteSuccessModal((prev) => ({ ...prev, isOpen: false }));
    
    if (title === "Vote Secured!" || title === "Ballot Submitted!") {
      setSelectedHouse(null);
      localStorage.removeItem("vibevote_selected_house");
      setView("voting");
      setIsWizardActive(false);
      window.location.reload();
    }
  };

  return (
    <div className="bg-[#11131c] text-[#e1e1ef] font-sans min-h-screen relative flex flex-col pt-20">
      
      {/* Persisting App Header */}
      <Header
        currentView={view}
        setView={(newView) => {
          setIsWizardActive(false);
          setView(newView);
        }}
        isAdminLoggedIn={isAdminLoggedIn}
        logoutAdmin={handleLogout}
        startLiveSession={() => {
          setIsWizardActive(true);
        }}
        isWizardActive={isWizardActive}
      />

      {/* Main Screen Container Routing Canvas */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-4 pb-24 md:pb-12">
        {isWizardActive ? (
          <VotingWizard
            candidates={candidates}
            selectedHouse={selectedHouse}
            onCompleteBallot={handleCompleteWizardBallot}
            onExit={() => setIsWizardActive(false)}
          />
        ) : (
          (() => {
            switch (view) {
              case "voting":
                return (
                  <PublicPortal
                    candidates={candidates}
                    onInstantVote={handleInstantVote}
                    startLiveSession={() => {
                      if (!selectedHouse) {
                        alert("Please select a house to begin first.");
                        return;
                      }
                      setIsWizardActive(true);
                    }}
                    turnoutPercent={turnoutPercent}
                    selectedHouse={selectedHouse}
                    setSelectedHouse={setSelectedHouse}
                  />
                );

              case "admin":
                return (
                  <PINPad
                    onSuccess={handlePinSuccess}
                    onCancel={() => setView("voting")}
                    correctPin={adminPin}
                  />
                );

              case "admin-portal":
                // Safely guard against unauthenticated users attempting route hops
                if (!isAdminLoggedIn) {
                  setView("admin");
                  return null;
                }
                return (
                  <AdminPortal
                    candidates={candidates}
                    onAddCandidate={handleAddCandidate}
                    onDeleteCandidate={handleDeleteCandidate}
                    onUpdateCandidate={handleUpdateCandidate}
                    onUpdatePIN={handleUpdatePIN}
                    activityLogs={activityLogs}
                    addActivityLog={addActivityLog}
                    onClearVotes={handleClearVotes}
                  />
                );

              case "results":
                return (
                  <ResultsHub
                    candidates={candidates}
                    totalVotes={candidates.reduce((sum, c) => sum + c.votes, 0)}
                  />
                );

              default:
                return (
                  <PublicPortal
                    candidates={candidates}
                    onInstantVote={handleInstantVote}
                    startLiveSession={() => {
                      if (!selectedHouse) {
                        alert("Please select a house to begin first.");
                        return;
                      }
                      setIsWizardActive(true);
                    }}
                    turnoutPercent={turnoutPercent}
                    selectedHouse={selectedHouse}
                    setSelectedHouse={setSelectedHouse}
                  />
                );
            }
          })()
        )}
      </main>

      {/* Persistent Mobile Bottom Safe Navigation bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 py-3 bg-white/90 backdrop-blur-2xl border-t border-slate-200 rounded-t-2xl shadow-lg pb-safe">
        <button
          onClick={() => {
            setIsWizardActive(false);
            setView("voting");
          }}
          className={`flex flex-col items-center justify-center transition-all ${
            view === "voting" && !isWizardActive ? "text-indigo-600 scale-105" : "text-slate-400 hover:text-slate-900"
          }`}
        >
          <span className="material-symbols-outlined text-xl font-bold">how_to_vote</span>
          <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">Vote</span>
        </button>

        <button
          onClick={() => {
            setIsWizardActive(false);
            setView("results");
          }}
          className={`flex flex-col items-center justify-center transition-all ${
            view === "results" ? "text-indigo-650 scale-105" : "text-slate-400 hover:text-slate-900"
          }`}
        >
          <span className="material-symbols-outlined text-xl">query_stats</span>
          <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">Analytics</span>
        </button>

        <button
          onClick={() => {
            setIsWizardActive(false);
            setView(isAdminLoggedIn ? "admin-portal" : "admin");
          }}
          className={`flex flex-col items-center justify-center transition-all ${
            view === "admin" || view === "admin-portal" ? "text-indigo-600 scale-105" : "text-slate-400 hover:text-slate-900"
          }`}
        >
          <span className="material-symbols-outlined text-xl">lock_person</span>
          <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">Admin</span>
        </button>
      </nav>

      {/* Custom Dynamic Confetti Celebration Success Dialog Modal */}
      {voteSuccessModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 mr-safe">
          {/* Blurred backdrop screen */}
          <div
            className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-md cursor-pointer"
            onClick={handleCloseSuccessModal}
          />
          
          <div className="glass-card relative z-10 max-w-md w-full rounded-[2.5rem] bg-white p-10 text-center border border-slate-200/80 shadow-xl scale-100 transition-transform">
            
            {/* Ambient vector glow check logo */}
            <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm hover:scale-105 transition-transform duration-300">
               <span className="material-symbols-outlined text-emerald-600 text-4xl font-black">check_circle</span>
            </div>

            <h2 className="font-display text-2xl font-black text-slate-900 mb-3">
              {voteSuccessModal.title}
            </h2>
            
            <p className="font-sans text-sm text-slate-550 leading-relaxed mb-8">
              {voteSuccessModal.description}
            </p>

            <button
              onClick={handleCloseSuccessModal}
              className="w-full py-4 bg-indigo-600 text-white font-display font-extrabold text-sm tracking-wider uppercase rounded-xl hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer shadow-[0_4px_0_#1e1b4b]"
            >
              Okay, Awesome
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
