# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Tooling & Commands

### Dependencies
- Install Node dependencies with `npm install`.

### Running the app
This is an Expo-managed React Native project.

- Start the Expo dev server (interactive UI with platform options):
  - `npm run start`
- Launch directly on a specific platform:
  - Android: `npm run android`
  - iOS: `npm run ios`
  - Web: `npm run web`

These scripts are thin wrappers around `expo start` with the appropriate flags; prefer using them rather than calling `expo` directly so they stay in sync with `package.json`.

### TypeScript & linting
- TypeScript is configured via `tsconfig.json`, extending `expo/tsconfig.base` with `strict` mode enabled.
- There is currently **no explicit lint or format script** defined in `package.json`. If you add ESLint/Prettier, expose them via `npm run lint` / `npm run format` for consistency.

### Testing
- There is currently **no test runner or `npm test` script** configured.
- Before adding tests, decide on a runner (e.g. Jest, Vitest) and wire it into `package.json` scripts (e.g. `test`, `test:watch`, and targeted test commands) so future agents can run them directly.

## Architecture Overview

This project is a small, layered Expo/React Native application structured around a clean/domain architecture.

### Entry point & composition
- `index.ts` is the platform entry, calling Expo's `registerRootComponent(App)`.
- `App.tsx` is the composition root:
  - Instantiates the infrastructure repository `BoardGameApiRepository`.
  - Wraps it in the application use case `FindBoardGames`.
  - Passes the use case into the root UI screen: `<SearchScreen findBoardGames={findBoardGames} />`.

All dependency wiring happens in `App.tsx`; the lower layers are kept free of Expo/React-specific details.

### Layered structure under `src/`

The `src` folder is split into four primary layers:

- `src/domain/`
  - **Purpose:** Pure domain model and abstractions, independent of UI or networking.
  - `entities/BoardGame.ts`: Defines the `BoardGame` type (id, name, optional `imageUrl`).
  - `repositories/BoardGameRepository.ts`: Interface describing how board games are loaded (`findByName(name: string): Promise<BoardGame[]>`).

- `src/application/`
  - **Purpose:** Use cases / application services that orchestrate domain operations.
  - `FindBoardGames.ts`:
    - Depends only on the `BoardGameRepository` interface.
    - Exposes `execute(query: string)` which:
      - Trims the query.
      - Returns an empty list for blank queries (avoids unnecessary API calls).
      - Otherwise delegates to `repo.findByName(query)`.

- `src/infrastructure/`
  - **Purpose:** Concrete implementations of domain abstractions that talk to external systems.
  - `api/BoardGameApiRepository.ts`:
    - Implements `BoardGameRepository` using `fetch` against an HTTP API at `localhost:/games?query=...`.
    - Encodes the query via `encodeURIComponent` and returns `res.json()` directly.
    - This is the main integration point with the backend service (likely the `GameKnight-server` project); changes to response shape or URL should be coordinated across repos.

- `src/ui/`
  - **Purpose:** React Native presentation layer and view models.
  - `screens/SearchScreen.tsx`:
    - Stateless screen component that receives `findBoardGames` (the use case) as a prop.
    - Uses the `useSearchViewModel` hook to manage state and trigger searches.
    - Renders:
      - A `TextInput` for the search query.
      - A `Button` to trigger search.
      - A conditional `"Loading..."` text while a search is in progress.
      - A `FlatList` of games, using `id` as `keyExtractor` and displaying `name`.
  - `viewModels/useSearchViewModel.ts`:
    - React hook that bridges the UI and the application layer.
    - Holds local state: `query`, `games`, `loading`.
    - Exposes `search()` which:
      - Sets `loading` to `true`.
      - Calls `findBoardGames.execute(query)`.
      - Stores the resulting list into `games`.
      - Sets `loading` back to `false`.

### Data flow: searching for board games

End-to-end, the main feature (searching board games) works as follows:

1. **User input in UI**
   - User types a query into the `SearchScreen` text input.
   - `onChangeText` updates `query` in the `useSearchViewModel` hook.
2. **Triggering the use case**
   - User taps the "Search" button, which calls `vm.search()`.
   - The view model calls `findBoardGames.execute(query)` and manages `loading` and the resulting `games` list.
3. **Application logic**
   - `FindBoardGames.execute` validates the query (empty/whitespace-only queries short-circuit to `[]`).
   - For non-empty queries, it delegates to `BoardGameRepository.findByName`.
4. **Infrastructure / API call**
   - `BoardGameApiRepository.findByName` performs a `fetch` to the backend endpoint with the encoded query and returns parsed JSON.
5. **Rendering results**
   - The view model stores the returned list in `games`.
   - `SearchScreen` renders the list via `FlatList`.

### Guidelines for extending the codebase

When adding new features, prefer to follow the existing layering:

- **Domain:** Add or extend entities and repository interfaces in `src/domain/` without introducing React/Expo or networking concerns.
- **Application:** Add new use cases under `src/application/` that orchestrate domain logic and depend only on domain interfaces.
- **Infrastructure:** Implement those interfaces in `src/infrastructure/` (e.g., new API clients, storage adapters) and keep external concerns (HTTP, persistence) here.
- **UI & view models:** Add screens and hooks under `src/ui/`, consuming use cases as dependencies rather than calling infrastructure directly.

Wire new dependencies together in `App.tsx` (or a dedicated composition root) so that the rest of the app stays declarative and testable.