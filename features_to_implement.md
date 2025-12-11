# Features to Implement

## 1. Session Locking (Security & UX)

**Context:**
Currently, anyone with a session link can join a group. This poses a risk of "zoombombing" where unauthorized users could join, disrupt the voting process, or view participant details. While the random Firestore ID provides some security through obscurity, a proactive lock is better.

**Proposed Solution:**
Implement a "Lock Session" toggle visible only to the host.

**Requirements:**
- [ ] **Host UI:** Add a "Lock/Unlock Session" toggle or button in the `WaitingView` (Lobby).
- [ ] **Data Model:** Add a `isLocked` (boolean) field to the Firestore session document.
- [ ] **Backend/Security:**
    - When a new user attempts to join (`handleJoin`), check if `session.isLocked` is true.
    - If locked, reject the join request and show a "Session is locked" error message.
- [ ] **UX:**
    - Show a visual indicator (e.g., a padlock icon) to all participants when the session is locked.
    - Allow the host to unlock it if a friend arrives late.

**Impact:**
Prevents unwanted participants from joining after the group is formed, securing the voting integrity.

## 2. Max Participants Enforcement (Logic & UX)

**Context:**
Currently, if a session is created for 2 people, a 3rd person can still join. This breaks the voting logic because the match threshold remains at 2. As soon as any 2 people agree, a match is declared, potentially before the 3rd person has even voted.

**Proposed Solution:**
Enforce the `groupSize` limit set by the host during session creation.

**Requirements:**
- [ ] **Backend/Security:**
    - In `handleJoin`, check if `participants.length >= session.groupSize`.
    - If the limit is reached, reject the join request.
- [ ] **UX:**
    - Show a specific error message: "This session is full (Max: X participants)."
    - Optional: Allow the host to increase the group size dynamically if they want to let more people in.

**Impact:**
Ensures the voting logic works as intended (Unanimous or Majority rules) and prevents "premature matches" caused by extra voters.
