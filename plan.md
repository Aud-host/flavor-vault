# Implementation Plan - AVD Video Streaming App

This plan outlines the steps to build "AVD", a video streaming and download application specializing in independent artists of specific genres (Trap, Rap, Hip-hop, Afropop, Afrotrap). The app will support streaming, free/paid downloads, and simulated payment integrations for Visa/Mastercard and Orange/MTN Cameroon mobile money.

## Scope Summary
- **App Name:** AVD
- **Genres:** Trap, Rap, Hip Hop, Afropop, Afrotrap.
- **Content:** Exclusive to independent/lesser-known artists.
- **Features:**
  - Video streaming player.
  - Download functionality (Free and Paid).
  - Simulated payment gateway (Visa/Mastercard, Orange/MTN Cameroon).
  - Responsive dark-themed UI.
  - Client-side persistence (localStorage) for user "purchases" and favorites.
- **Security:** Basic frontend protection patterns (input sanitization, mock virus scanning UI).

## Non-Goals
- Real backend integration (Supabase/DB opted out).
- Real payment processing (Production API keys/PCI compliance).
- Real virus scanning (Simulated for UX).
- Actual large-scale video hosting (Using placeholder/mock assets).

## Assumptions & Open Questions
- **Assumption:** Since Supabase is opted out, all user data (bought tracks, history) is stored in `localStorage`.
- **Assumption:** Videos will be mock/placeholder URLs for the demonstration.
- **Open Question:** Does the user have specific logo/brand assets for "AVD"? (Defaulting to a modern, dark musical aesthetic).

## Affected Areas
- **Frontend UI:** New layout, video player, catalog browsing, checkout flow.
- **State Management:** Local storage for purchase history.
- **Project Config:** Updating title/meta for "AVD".

## Phases

### Phase 1: Foundation & Brand (quick_fix_engineer)
- Rename application to "AVD" in `index.html` and metadata.
- Setup basic routing structure (Home, Genre, Checkout, Library).
- Define the dark theme colors and global styles consistent with music streaming apps.

### Phase 2: Video Catalog & Player (frontend_engineer)
- Create mock data for independent artists in specified genres.
- Build a responsive video grid/list.
- Implement a custom video player component with "Stream" and "Download" options.
- Handle "Paid" vs "Free" logic in the UI.

### Phase 3: Payment & Checkout Flow (frontend_engineer)
- Build a multi-step checkout modal/page.
- Support payment methods:
  - Credit Card (Visa/Mastercard).
  - Mobile Money (Orange Cameroon, MTN Cameroon).
- Implement simulated "Payment Success" logic that unlocks downloads.

### Phase 4: Persistence & Security (frontend_engineer)
- Use `localStorage` to track which videos the user has purchased.
- Add a "My Library" section for purchased/saved content.
- Implement a "Security/Antivirus" simulation overlay or status bar to fulfill user request visually.

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. quick_fix_engineer — Basic branding and metadata setup.
2. frontend_engineer — Implementation of core UI, video player, and payment simulation.

**Per-agent instructions:**
### 1. quick_fix_engineer
- **Phases:** Phase 1
- **Scope:** Update project title to "AVD", change favicon references if applicable, and set up the basic layout shell (Navbar/Sidebar) with the "AVD" branding.
- **Files:** `index.html`, `src/App.tsx`, `src/index.css`.
- **Depends on:** none
- **Acceptance criteria:** Title in browser tab says "AVD", app displays "AVD" logo/header.

### 2. frontend_engineer
- **Phases:** Phase 2, 3, 4
- **Scope:** Build the video streaming application. Create a JSON mock file for artists/videos. Implement a Video Player, a Gallery for genres (Trap, Rap, Hip Hop, Afropop, Afrotrap), and a checkout process for paid downloads. Use `localStorage` to persist "purchases". Add a "Scanner" UI component to simulate the virus protection requested.
- **Files:** `src/components/*`, `src/App.tsx`, `src/lib/mock-data.ts`.
- **Depends on:** quick_fix_engineer (Phase 1)
- **Acceptance criteria:** Users can browse videos, watch them, click "Download", pay via simulated Mobile Money/Card for "Paid" items, and see purchased items in a "My Library" view.
