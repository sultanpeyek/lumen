# Lumen

Archived: this project is no longer maintained. Last activity was in 2023.

Lumen is a Solana NFT explorer built on the Helius DAS (Digital Asset Standard) API. It looks up NFTs by owner, mint, authority, collection, or creator address, shows their details, and lets you download lists of mint addresses. Helius ran a mini-hackathon, and this project was a submission to it.

Live site: https://lumen-solana.vercel.app

## Features

- Search by owner address, mint address, authority address, collection address, or creator address. Creator search can be limited to verified creators.
- Results table built with TanStack Table, with row selection.
- NFT detail view with the raw asset JSON.
- Download mint addresses as `ids.json`, or only the selected rows as `selected_ids.json`.
- Server-side fetching that pages through Helius results, capped at 1000 items per request.

## Stack

- Next.js 16 (App Router) with React 19 and TypeScript, on Node.js 24
- Tailwind CSS with shadcn/ui components on Radix UI
- `helius-sdk` for the DAS API, `@solana/web3.js`, and `zod` for input validation
- `@tanstack/react-table`, `react-json-view-lite`, `react-icons`

## Getting started

The repo uses pnpm (`pnpm-lock.yaml`).

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. Other scripts:

- `pnpm build` creates a production build.
- `pnpm start` serves the production build.
- `pnpm lint` runs `next lint`.

## Configuration

Set one environment variable, for example in `.env.local`:

- `HELIUS_API_KEY`: your Helius API key. The server-side fetch helpers in `src/lib` read it.

## Project structure

```
src/
  app/
    (das)/assets/   result pages by owner, authority, creator, group, and id
    (das)/search/   search pages for each method
  components/
    common/         layout pieces such as footer and heading
    das/            search inputs, data table, NFT detail views
    ui/             shadcn/ui components
  config/           site and API limits
  hooks/            navigation and mount hooks
  lib/              Helius DAS fetch helpers and utilities
```

## Deployment

The live site runs on Vercel.
