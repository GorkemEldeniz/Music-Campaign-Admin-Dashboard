# Music Campaign Admin Dashboard

A powerful admin dashboard for managing music campaigns, built with modern web technologies.

## Tech Stack

- **Framework**: Next.js 15.3 (App Router)
- **Language**: TypeScript
- **UI**: React 19, Shadcn UI, Radix UI
- **Styling**: Tailwind CSS
- **Database**: Supabase with Drizzle ORM
- **Authentication**: Supabase Auth
- **API**: tRPC for type-safe APIs
- **Data Fetching**: React Query
- **Form Handling**: React Hook Form with Zod validation

## Features

- Campaign management dashboard
- Secure authentication system
- Database integration with Supabase
- Modern, responsive UI with Shadcn UI components
- Type-safe API endpoints with tRPC

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/music-campaign-admin-dashboard.git
   cd music-campaign-admin-dashboard
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:

   ```
   DATABASE_URL=your_supabase_postgres_connection_string
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Database Setup

This project uses Drizzle ORM with Supabase. To set up your database:

1. Run migrations

   ```bash
   npx drizzle-kit push
   ```

2. Seed the database (optional)
   ```bash
   npm run seed:ts
   ```

## Deployment

The application can be deployed to platforms like Vercel, Netlify, or any other service that supports Next.js applications.

## Created By

[Görkem Eldeniz](https://github.com/gorkemeldeniz1)

---

Feel free to contribute to this project by submitting pull requests or opening issues.
