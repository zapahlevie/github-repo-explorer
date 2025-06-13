# GitHub Repositories Explorer

A clean and responsive React + TypeScript app to search GitHub users and explore their public repositories. Built with modern tooling, state management, and testing strategies.

**Live Demo:** [https://github-explorer.mrezapahlevi.com](https://github-explorer.mrezapahlevi.com)

---

## Tech Stack

- React + TypeScript
- Zustand – lightweight state management
- React Query – async data fetching
- Tailwind CSS – utility-first styling
- Axios – HTTP requests
- Vite – fast development & builds
- Vitest + React Testing Library – unit testing
- Cypress – integration & E2E testing

---

## Features

- Search GitHub users (limit: 5 results)
- View public repositories for selected users
- Responsive design with mobile-friendly UI
- Loading and error state handling
- Unit & integration tests

---

## Getting Started

Clone the repository and run the development server:

```bash
git clone https://github.com/zapahlevie/github-repo-explorer.git
cd github-repo-explorer
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Testing

```bash
npm run test           # Run unit tests with Vitest
npx cypress open       # Run integration tests in Cypress UI
```

---

## Deployment

This app is optimized for static hosting and has been deployed on [Vercel](https://vercel.com).

To deploy manually:

```bash
npm run build
```

Then upload the contents of the `dist/` folder to any static hosting platform (e.g., GitHub Pages, Vercel, Netlify).

---

## Environment Variables

To avoid hitting GitHub's unauthenticated rate limit, it's recommended to provide a GitHub personal access token in a `.env` file:

```
VITE_GITHUB_TOKEN=your_github_token_here
```

Note: The app still works without the token, but may be limited.

---

## Project Structure

```
src/
├── api/             # API layer (axios + GitHub API)
├── components/      # UI components & their co-located tests
├── hooks/           # Custom React hooks
├── store/           # Zustand state management
├── types/           # Shared TypeScript types
├── utils/           # Utility functions
cypress/             # Cypress integration tests and config
```

---

## License

MIT © [Muhammad Reza Pahlevi](https://github.com/zapahlevie)
