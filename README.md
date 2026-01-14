# GameKnight server

This is Nodejs server application meant to accompany GameKnight mobile app. GameKnight is social boardgame app allowing users to track their game collection, games, results and friends.

## Styling guide

Install prettier with `npm i` in project root folder and install [prettier extension for VS Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

Optional (but recommended):

- [Format On Save Mode = File](vscode://settings/editor.formatOnSaveMode)
- [Format On Save = Check](vscode://settings/editor.formatOnSave)
- [Default formatter = Prettier - Code Formatter](vscode://settings/editor.defaultFormatter)

Prettier config is in .prettierrc file.

# Architecture

Server architecture is designed with _Clean architecture_, allowing clear separation of responsibilities, easy technology changes and maintainable code. Below is short guidance for contributors.

## Clean Architecture - Project guidelines

### The Big Picture

Our backend has one core and many adapters.

```
[ HTTP / CLI / Jobs ]
          ↓
     Application (Use Cases)
          ↓
        Domain (Rules)
          ↑
        Ports (Interfaces)
          ↑
[ DB / Auth / External APIs ]
```

The core (Domain + Application) is stable and testable

Adapters (HTTP, DB, external APIs) are replaceable

### Folder responsibilities

### `application/`

What system _does_ - Verbs

- Use cases / user intentions
- One use case per file
- Each exposes a single `execute()` -method

For example, see `application/user/CreateUser.js`.

### `domain/`

What the system is

- Entities (Game, User, Collection, etc.)
- Business _rules_ & invariants
- No imports from Express, Postgres, Auth0, BGG, etc.

As an example: Form of user should always be unchanging and uniform in the application. This ensures easy and safe usage all around the application.

```js
// domain/User.js
class User {
  /**
   * User Constructor
   * @typedef {{id: string, email: string}}
   */
  constructor({ id, email }) {
    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }
    this.id = id;
    this.email = email;
    // ...snip
  }
}
// ...snip
```

### `ports/`

What the core needs from the outside world

- Interfaces only (contracts)
- Owned by the core
- May throw Not implemented

Examples:

- GameRepository
- BoardGameCatalog
- AuthService

Ports describe what, _never_ how.

```js
// Notice: only interface is defined here.
// Implementation is up to `infrastucture`
class UserRepository {
  save(user) {
    throw new Error("Not implemented");
  }

  findByEmail(email) {
    throw new Error("Not implemented");
  }
  // ...snip
}
```

### `interfaces/`

How the outside world talks to us

- HTTP controllers & routes
- CLI commands
- Background jobs

Responsibilities:

- Parse input
- Call useCase.execute()

Format output

No business logic here.
