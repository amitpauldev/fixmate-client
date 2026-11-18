<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# FixMate Project Instructions

## Project overview

- FixMate is a role-based repair service platform for customers, technicians, and administrators.
- Preserve the four-domain data model: BetterAuth users plus `services`, `bookings`, and `payments`.
- Support public browsing, authenticated repair requests, technician workflows, admin moderation, and Stripe payments.
- Keep the frontend focused on presentation and API communication; do not duplicate Express server authorization or business rules.

## Next.js and TypeScript standards

- Use Next.js 16 App Router conventions and TypeScript for application code.
- Read the relevant guides in `node_modules/next/dist/docs/` before changing App Router APIs or configuration.
- Use route groups for public, authentication, and payment layouts; use nested layouts for role dashboards.
- Use route entry files only for required pages, layouts, loading, error, and not-found boundaries.
- Use route-specific Server Components for data loading and SEO-sensitive public pages.
- Prefer typed props, explicit interfaces, and discriminated unions for API and domain models.
- Avoid `any`; narrow unknown values and validate external request or response data.
- Use `next/link` for navigation and the framework's typed route helpers when available.
- Preserve existing Next.js configuration unless a separate task explicitly requires a configuration change.

## Tailwind CSS v4 conventions

- Use Tailwind CSS v4 utilities and the existing `src/app/globals.css` as the source of global theme configuration.
- Import Tailwind with `@import "tailwindcss"`; do not introduce a Tailwind v3-style JavaScript configuration file for this project.
- Use the v4 `@theme` and CSS custom-property conventions for project design tokens and Tailwind theme values.
- Define reusable design tokens for colors, typography, status badges, spacing, and breakpoints.
- Avoid Tailwind classes in separate class-name systems unless an established UI library requires them.
- Keep headings, paragraph spacing, card proportions, image ratios, and button styles consistent.
- Use responsive prefixes and container constraints to support mobile, tablet, and desktop layouts.
- Preserve clear contrast and visible focus states in both light and dark themes.

## Feature-based architecture

- Organize domain work under `src/features/auth`, `services`, `bookings`, `payments`, `users`, `customer`, `technician`, and `admin`.
- Use `src/components/ui` for reusable primitives, `src/components/layout` for page shells, and `src/components/shared` for cross-feature UI.
- Put API adapters and server communication in `src/lib/api`, auth/session helpers in `src/lib/auth`, and validation schemas in `src/lib/validations`.
- Put shared hooks in `src/hooks` and shared TypeScript types in `src/types`.
- Keep feature components near their domain and avoid creating cross-feature dependencies without a clear shared boundary.
- Reuse dashboard shells, stat cards, tables, empty states, status badges, loading skeletons, confirmation dialogs, and toast patterns.

## Rendering and component boundaries

- Use Server Components by default.
- Add `"use client"` only for components that require browser state or hooks, event handlers, interactive forms, menus, modals, filters, toast actions, or Stripe redirects.
- Keep client boundaries as small as possible and pass serializable props.
- Do not mark layouts or pages as Client Components solely to reuse fetch or session logic.
- Use `loading.tsx` and Suspense boundaries for route loading states.
- Use `error.tsx` for recoverable route errors and `not-found.tsx` for missing resources.
- Preserve public navbar/footer layouts and keep the dashboard layout separate from public layouts.

## Accessibility and responsive design

- Use semantic HTML, labeled form controls, descriptive image alternatives, and logical heading order.
- Keep all interactive controls keyboard accessible and provide visible focus states.
- Use ARIA attributes only when native semantics are insufficient.
- Implement mobile-first layouts with responsive sidebar, table-to-card adaptations, grid changes, and touch-friendly controls.
- Use consistent status colors and never communicate status by color alone.
- Confirm destructive actions such as deletion, cancellation, and rejection.
- Ensure dialogs, menus, pagination, filters, and toast messages are accessible and usable with a keyboard.

## API communication

- Communicate with the separate Express backend through typed functions in feature API modules or `src/lib/api`.
- Keep server URLs and secrets in environment variables such as `.env.local`; never expose Express secrets or private Stripe credentials in client code.
- Send identifiers and expected action payloads to the server, but never send or trust final prices or authorization state for protected actions.
- Centralize HTTP error parsing and return consistent typed error states to the UI.
- Preserve URL search parameters for server-side search, filtering, sorting, and pagination.
- Do not implement or mock Express endpoints inside Next.js route handlers unless a BetterAuth or documented integration route is required.

## BetterAuth and JWT integration

- Integrate BetterAuth through its Next.js route handler and MongoDB adapter configuration.
- Retrieve the BetterAuth session and any required JWT only in server-side Next.js code, such as Server Components, Server Actions, route handlers, or centralized server API helpers.
- Forward the JWT to the separate Express backend only through a server-created Authorization header; do not expose the raw JWT to browser JavaScript or persist it in local or session storage.
- Keep token extraction and forwarding in shared server-only auth/API utilities, and clear or avoid token state when a session or request ends.
- Keep role as `customer`, `technician`, or `admin`; registration must not permit admin selection.
- Treat phone, area, bio, and profile image as BetterAuth additional fields or the corresponding profile update contract.
- Share session and role checks through typed auth helpers rather than duplicating role logic in individual components.
- Use Next.js proxy or layout/page guards only for navigation UX.
- Rely on Express verifyToken and role middleware for API authorization; frontend route protection is never sufficient.
- Preserve redirect intent through sign-in and redirect authenticated users to the dashboard matching their role.
- Keep JWTs out of browser storage and rely on the project's secure session/token integration.

## Security and environment variables

- Never commit credentials, MongoDB URLs, BetterAuth secrets, JWT secrets, Stripe keys, Stripe webhook secrets, ImgBB keys, or admin credentials.
- Add required secret names to environment example documentation when configuration is introduced, without adding real values.
- Validate all form and API input on both the client and server.
- Enforce role ownership and state-transition rules on the Express backend.
- Prevent duplicate and unauthorized booking, payment, service, and role operations.
- Avoid logging sensitive user data, tokens, authorization headers, or Stripe secrets.
- Require HTTPS/trusted origins for deployed authentication and configure CORS consistently with the production frontend domain.

## Reusable components and naming conventions

- Use clear PascalCase names for components, camelCase names for functions and variables, and kebab-case names for route folders.
- Export shared components through feature or component barrel files only when the barrel improves imports.
- Name pages according to their route purpose and keep route files minimal.
- Share one status badge mapping and consistent badge text across customer, technician, and admin views.
- Keep forms, tables, cards, dialogs, loading states, empty states, and stats cards reusable.
- Put copy and static category/status configuration in constants or feature modules, not duplicated across pages.
- Add props interfaces for reusable components and avoid passing broad or untyped objects.

## Testing and linting expectations

- Run `npm run lint` and TypeScript validation after meaningful frontend changes.
- Run the smallest relevant build or test command before wider validation.
- Introduce test frameworks or testing dependencies only when a feature or change requires repeatable automated coverage; do not install a testing stack prematurely.
- Prefer focused component, integration, or route tests once testing is established, with coverage for role guards, forms, status transitions, filters, payments, and reload behavior.
- Test responsive layouts at mobile, tablet, and desktop widths.
- Add focused tests for role guards, form validation, status transitions, filters, and payment/booking UI behavior as test tooling is introduced.
- Verify unauthorized and wrong-role routes, reload behavior, search/filter URL preservation, and loading/error/empty states.
- Do not weaken or bypass lint, type, accessibility, or route validation to make a temporary implementation pass.

<!-- Design Rules -->

## Design System

- Follow `app/globals.css` as the single source of truth for all design tokens and theme colors.
- FixMate supports Light and Dark themes.
- Light theme is the default. Dark theme activates only when the user explicitly toggles it.
- Use existing CSS variables and Tailwind utilities instead of hardcoding colors.
- Every UI component must support both themes.
- Use the existing `next-themes` provider for theme management.
- Maintain consistent typography, spacing, borders, shadows, and component styles.
- Before creating new UI components, check for existing reusable components.
- Never introduce a separate color palette or theme management system without approval.
