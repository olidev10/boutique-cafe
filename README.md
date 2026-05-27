# Boutique Cafe

Boutique Cafe is a demo e-commerce storefront for a premium coffee brand. It is built with Next.js App Router, React, TypeScript, Tailwind CSS, Zustand, and local mock data.

The current product experience includes:

- Public storefront homepage
- Product catalog and filters
- Product detail pages
- Client-side cart persisted in `localStorage`
- Checkout flow mockup
- Admin dashboard mockup for products and orders

## Tech Stack

- Next.js `16.2.6`
- React `19.2.4`
- TypeScript
- Tailwind CSS `4`
- Zustand for cart state
- Lucide React for icons
- pnpm lockfile

## Important Next.js Note

This project uses a newer Next.js version with APIs and conventions that may differ from older Next.js knowledge. Before changing routing, rendering, navigation, config, metadata, or other framework-specific code, read the relevant local docs in:

```bash
node_modules/next/dist/docs/
```

Start with `node_modules/next/dist/docs/index.md` and then open the App Router guide or API reference that matches the change.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev
```

Starts the Next.js development server.

```bash
pnpm build
```

Creates a production build.

```bash
pnpm start
```

Runs the production server after a successful build.

```bash
pnpm lint
```

Runs ESLint.

## Project Structure

```text
src/
  app/                  App Router routes and global styles
  components/
    admin/              Admin dashboard UI
    cart/               Cart and checkout UI
    layout/             Header and footer
    products/           Product cards, filters, and grids
  lib/
    cart-store.ts       Zustand cart store with localStorage persistence
    format-price.ts     Price formatting helper
    products.ts         Mock product catalog
  types/
    product.ts          Product type definitions
public/
  images/               SVG artwork used by the storefront
```

## Routes

- `/` - storefront homepage
- `/boutique` - product catalog
- `/produit/[slug]` - product detail page
- `/panier` - cart
- `/checkout` - checkout mockup
- `/checkout/success` - checkout success page
- `/admin` - admin dashboard mockup
- `/admin/produits` - admin products mockup
- `/admin/commandes` - admin orders mockup

## Data And State

Product data is currently static and lives in `src/lib/products.ts`. Add or edit products there while keeping slugs unique, prices in cents, and image paths pointed at files under `public/images/`.

Cart state lives in `src/lib/cart-store.ts`. It is a client-side Zustand store persisted to `localStorage` under the key `kawa-maison-cart`.

There is no real payment provider, authentication, database, or admin authorization yet. The checkout and admin screens are presentational mockups.

## Development Notes

- Prefer pnpm because the repository includes `pnpm-lock.yaml`.
- Keep route files under `src/app`.
- Use the existing component folders before adding new top-level structure.
- Use `@/` imports for source files, matching the existing codebase.
- Keep public-facing copy consistent with the French storefront.
- Run `pnpm lint` and `pnpm build` before opening a pull request when possible.

## Pull Request Checklist

- The app builds with `pnpm build`.
- Lint passes with `pnpm lint`.
- New or changed routes are documented in this README if they affect contributor workflow.
- Mock data changes include valid product slugs, prices, stock values, and image paths.
- Framework-specific changes were checked against `node_modules/next/dist/docs/`.
