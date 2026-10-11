// ============================================================
// File: src/utils/errorMessages.ts
// Purpose: Turns a caught query/mutation error into a message
//          the farmer can actually understand
// Logic:
//   - After the backend's IDOR fix, requesting a farm/cattle
//     that isn't yours now returns HTTP 403 (Forbidden) instead
//     of just empty data — this needs its own clear message,
//     distinct from a generic "could not load" failure
//   - Adding a team member with an email that's already
//     registered returns HTTP 409 (Conflict) from the backend,
//     which also needs its own clear message
//   - Falls back to the generic message for every other error
//     (network issues, 500s, etc.), since those don't need a
//     more specific explanation
// ============================================================
import axios from "axios";

// Returns a farmer-friendly message based on the error's HTTP status
export function getFriendlyErrorMessage(error: unknown, fallback: string): string {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
            return "You don't have access to this farm.";
        }
        if (error.response?.status === 409) {
            return "This email is already registered.";
        }
    }
    return fallback;
}