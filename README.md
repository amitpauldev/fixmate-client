# FixMate Client

FixMate is a role-based smart-device and home-appliance repair platform. It connects customers with technicians for service discovery, repair requests, job tracking, payments, and service administration.

This repository contains the Next.js frontend. The Express and MongoDB backend is maintained separately.

- **Live:** https://fixsmate.vercel.app

- **Client-Repo:** https://github.com/amitpauldev/fixmate-client
- **Server-Repo:** https://github.com/amitpauldev/fixmate-server

## Features

### Public

- Browse and search approved repair services
- Filter services by category and service mode
- View service details and technician information
- Responsive light and dark themes

### Customer

- Request repairs through a detailed request dialog
- Track bookings through requested, accepted, in-progress, completed, cancelled, and rejected states
- Filter bookings by active, unpaid, paid, and closed status
- Cancel requested bookings
- View payment history

### Technician

- Create and update repair services
- Upload service images through ImgBB
- View and manage assigned repair requests
- Work through the booking status workflow

### Admin

- Approve or reject technician services
- Monitor all bookings
- View users and payment transactions

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Better Auth
- MongoDB adapter
- MongoDB
- JWT
- Express.js API
- ImgBB
- Stripe
- Lucide React
- React Hot Toast

## Project Structure

```text
src/
├── app/
│   ├── (public)/          # Home, services, authentication, and public pages
│   ├── api/auth/          # Better Auth route handler
│   └── dashboard/
│       ├── admin/
│       ├── customer/
│       ├── technician/
│       └── profile/
├── components/
│   ├── auth/
│   ├── layout/
│   ├── shared/
│   └── ui/
├── features/
│   ├── admin/
│   ├── bookings/
│   ├── payments/
│   ├── services/
│   └── users/
└── lib/
    ├── api/
    ├── auth/
    ├── utils/
    └── validations/
```

## Roles

| Role       | Access                                                                |
| ---------- | --------------------------------------------------------------------- |
| Customer   | Browse services, request repairs, track bookings, and manage payments |
| Technician | Create and update services and manage assigned repair work            |
| Admin      | Moderate services and monitor users, bookings, and transactions       |

Registration only allows customer or technician roles. Administrators must be assigned through the backend or database.

## Getting Started

### Requirements

- Node.js 20 or newer
- npm
- MongoDB
- A running FixMate Express backend
- Better Auth configuration
- ImgBB API key

### 1. Clone the repository

```bash
git clone https://github.com/amitpauldev/fixmate-client.git
cd fixmate-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/fix_mate
IMGBB_API_KEY=your_imgbb_api_key
```

| Variable               | Purpose                                |
| ---------------------- | -------------------------------------- |
| `NEXT_PUBLIC_API_URL`  | Express API base URL                   |
| `NEXT_PUBLIC_BASE_URL` | Public frontend URL used for redirects |
| `BETTER_AUTH_URL`      | Better Auth client base URL            |
| `MONGODB_URI`          | MongoDB connection string              |
| `IMGBB_API_KEY`        | Server-side ImgBB upload key           |

Never commit `.env.local`, database credentials, authentication secrets, Stripe secrets, or API keys.

### 4. Start the development server

```bash
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the Next.js development server |
| `npm run build`    | Create a production build            |
| `npm run start`    | Start the production build           |
| `npm run lint`     | Run ESLint                           |
| `npx tsc --noEmit` | Run TypeScript validation            |

## Backend

The frontend communicates with a separate Express API. Set `NEXT_PUBLIC_API_URL` to the backend origin.

Example local API:

```text
http://localhost:5000
```

JWT validation and role authorization must remain in the Express backend. Frontend route guards are only for navigation and user experience.

## Security

- Keep JWTs in server-side session handling
- Do not store tokens in browser storage
- Never expose MongoDB, Better Auth, Stripe, or ImgBB secrets to client code
- Validate protected actions and role ownership on the Express server
- Send identifiers and requested actions to the backend without trusting client-side prices or authorization state

## Development Status

Core public service browsing and role-based dashboards are implemented. Stripe payment, complete technician job management, profile editing, and additional admin workflows may still require backend integration or UI completion.
