# Security Specification for VibeVote

## 1. Data Invariants
- Each nominee in `candidates` must have a valid non-empty `name`, `role`, and `symbol`.
- The `votes` field on `candidates` must be an integer and must be initialized to 0.
- `logs` should record valid event, time, and status types.
- `settings/config` holds the current `adminPin` and `turnoutPercent`.

## 2. The Dirty Dozen Payloads (Target Violations)
1. Attempts to inject a non-numeric string as candidate `votes`.
2. Attempts to set candidate `votes` to a negative value.
3. Attempts to create an empty candidate with no name or role.
4. Attempts to delete all candidates without a valid request.
5. Injected extra properties (shadow fields) into a candidate document.
6. Malformed `log` entries with invalid enum levels.
7. Modifying the `adminPin` to a non-numeric or long string.
8. Resetting the `turnoutPercent` to over 100%.
9. Swapping candidate IDs during an update.
10. Rapid batch modification to deplete quota.
11. Bypassing client-side PIN validation by trying to corrupt `settings/config` directly.
12. Creating logs with fake future timestamps.

## 3. Draft Rules Definition
The rules permit reading all candidates, casting anonymous votes by modifying the vote count increment, and managing candidates.
