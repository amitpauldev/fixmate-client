<div align="center">

# FixMate

**A modern repair-service marketplace for customers, technicians, and administrators.**

[![Live Website](https://img.shields.io/badge/Live-fixsmate.vercel.app-287a60?style=for-the-badge)](https://fixsmate.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-173f35?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-287a60?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescript-lang.org/)

<br />

[Live Website](https://fixsmate.vercel.app) · [Client Repository](https://github.com/amitpauldev/fixmate-client) · [Server Repository](https://github.com/amitpauldev/fixmate-server)

</div>

---

## Overview

**FixMate** is a role-based platform that makes it easier to discover repair services, request professional help, track repair work, and process payments.

The platform supports three experiences:

- **Customers** browse services, request repairs, monitor booking progress, pay completed jobs, and view payment history.
- **Technicians** publish services, receive repair requests, update job status, and track earnings.
- **Administrators** moderate services, manage users and roles, monitor bookings, and review platform transactions.

This repository contains the **Next.js frontend**. The Express.js and MongoDB API is maintained separately.

## Live Application

**Website:** [https://fixsmate.vercel.app](https://fixsmate.vercel.app)

## Key Features

### Public Experience

- Responsive home page with repair services and featured technicians
- Search and filter repair services
- Detailed service and technician information
- Light and dark themes
- Accessible navigation and responsive layouts

### Customer Dashboard

- Platform overview with active, completed, and unpaid jobs
- Repair request creation
- Booking status tracking
- Cancel requested bookings
- Stripe payment checkout
- Payment history

### Technician Dashboard

- Technician overview and earnings summary
- Service creation and updates
- Image uploads
- Assigned request management
- Accept, reject, start, and complete job workflows
- Final payment amount submission

### Administrator Dashboard

- User management and role updates
- Better Auth admin-plugin user creation
- Service approval and rejection
- Platform-wide booking management
- Revenue, payment, and transaction monitoring
- Search and status filters

## Technology Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Authentication | Better Auth |
| Database Adapter | `@better-auth/mongo-adapter` |
| Database | MongoDB |
| Payments | Stripe |
| Icons | Lucide React |
| Animation | Motion |
| Notifications | React Hot Toast |
| Theme | `next-themes` |
| API | Separate Express.js backend |

## Packages and Dependencies

```text
@better-auth/mongo-adapter  Better Auth MongoDB adapter
better-auth                 Authentication and admin plugin
lucide-react                Interface icons
mongodb                     MongoDB integration
motion                      UI animations
next                        Next.js framework
next-themes                 Light/dark theme management
react                       Component UI library
react-dom                   React browser runtime
react-hot-toast             Toast notifications
server-only                 Server-only module protection
stripe                      Stripe payment integration
tailwindcss                 Tailwind CSS v4
typescript                  Static type checking
eslint                      Code linting
```

## Project Structure

```text
src/
├── app/
│   ├── (public)/                 # Public pages and marketing sections
│   ├── api/auth/[...all]/        # Better Auth API handler
│   └── dashboard/
│       ├── admin/                # Admin routes
│       ├── customer/             # Customer routes
│       ├── technician/           # Technician routes
│       └── profile/              # Shared profile route
├── components/
│   ├── auth/                     # Authentication UI
│   ├── layout/                   # Public and dashboard shells
│   ├── shared/                   # Cross-feature components
│   └── ui/                       # Reusable UI primitives
├── features/
│   ├── admin/                    # Admin APIs, actions, and components
│   ├── auth/                     # Authentication-related features
│   ├── bookings/                 # Booking types and actions
│   ├── customer/                 # Customer dashboard components
│   ├── payments/                 # Payment types and UI
│   ├── services/                 # Service browsing and management
│   ├── technician/               # Technician components and APIs
│   └── users/                    # Shared user types
└── lib/
    ├── api/                      # Express API adapters
    ├── auth/                     # Better Auth server/client configuration
    ├── validations/              # Form validation
    └── utils/                    # Shared utilities
```

## Roles and Access

| Role | Dashboard | Primary Access |
| --- | --- | --- |
| Customer | `/dashboard/customer` | Service discovery, repair requests, booking tracking, and payments |
| Technician | `/dashboard/technician` | Service management, assigned jobs, status updates, and earnings |
| Admin | `/dashboard/admin` | User management, service approval, bookings, and transactions |

Registration permits only the customer and technician roles. Admin accounts must be assigned through Better Auth admin tooling or the database.

## Demo and Admin Credentials

Use the following demo accounts to explore the customer and technician experiences:

| Role | Email | Password |
| --- | --- | --- |
| Customer | `customer@gmail.com` | `Customer1234` |
| Technician | `technician@gmail.com` | `Technician1234` |

Admin credentials are intentionally excluded from this public repository.

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- MongoDB
- Running FixMate Express API
- Stripe account for payment testing
- ImgBB API key for service image uploads

### 1. Clone the repositories

```bash
git clone https://github.com/amitpauldev/fixmate-client.git
cd fixmate-client
```

Clone and start the Express server separately:

```bash
git clone https://github.com/amitpauldev/fixmate-server.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root using `.env.example` as a reference:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
PAYMENT_WEBHOOK_SECRET=your_stripe_webhook_secret
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BASE_URL` | Public frontend URL |
| `NEXT_PUBLIC_API_URL` | Express backend URL |
| `BETTER_AUTH_URL` | Better Auth origin |
| `MONGODB_URI` | MongoDB connection string |
| `BETTER_AUTH_SECRET` | Better Auth signing secret |
| `STRIPE_SECRET_KEY` | Server-side Stripe API key |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key |
| `PAYMENT_WEBHOOK_SECRET` | Stripe webhook verification secret |

Never expose private MongoDB, authentication, Stripe, or ImgBB credentials to browser-side code.

### 4. Start the frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Validate TypeScript types |

## API and Security

- Express route authorization, role checks, ownership rules, and price validation remain in the backend.
- Better Auth sessions and JWT handling stay server-side.
- JWT values are never persisted in browser storage.
- Frontend route guards improve navigation UX but are not treated as authorization.
- Protected mutations send booking, service, and user identifiers to the server without trusting client-side prices or authorization state.

## Deployment

The frontend is deployed on Vercel:

**https://fixsmate.vercel.app**

Before production deployment:

1. Configure all required environment variables.
2. Use an HTTPS Better Auth URL.
3. Configure trusted origins and CORS.
4. Set the Express API to the deployed backend URL.
5. Configure Stripe webhook secrets and callback URLs.

## Known Documentation Notes

- The server and client repositories are separate.
- The public API URL must point to the running Express backend.
- Admin credentials should be provisioned privately and are intentionally excluded from this README.

---

<div align="center">

## Developer

**Amit Paul**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Amit_Paul-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/amitpauldev/)
[![GitHub](https://img.shields.io/badge/GitHub-amitpauldev-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/amitpauldev)

Built with care for reliable repairs and a better home-service experience.

</div>
