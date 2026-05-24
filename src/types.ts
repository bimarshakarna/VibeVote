export interface Candidate {
  id: string;
  name: string;
  role: string; // e.g., "Head boy", "Head girl", "Sports captain", "Event manager"
  symbol: string; // Emoji representing the candidate
  tagline: string;
  avatar: string; // Picture URL or placeholder character
  votes: number; // For analytics
}

export type ViewState = "voting" | "admin" | "admin-portal" | "results";

export interface CategoryVotes {
  [categoryId: string]: string; // Maps categoryId to candidateId
}

export interface ActivityLog {
  id: string;
  time: string;
  event: string;
  type: "success" | "warning" | "info" | "error";
}
