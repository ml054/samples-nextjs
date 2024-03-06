# Getting Started

Used Node.js version: **20.11.1**

## Create database

For the application to work, you must first create a database. You can do this at http://live-test.ravendb.net/studio/index.html#databases.

Then go to `src/db/store.ts` and replace the `"beer-order-database"` name with the one you created.

## Install packages

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
