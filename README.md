# Warm Heaven Care Connect

A comprehensive healthcare management system built with Next.js, Supabase, and TailwindCSS. This application provides role-based access control and efficient management tools for healthcare facilities.

## Features

- 🔐 Secure authentication with Supabase
- 👥 Role-based access control (Admin, House Manager, Supervisor, Nurse, Caregiver)
- 📱 Responsive design with mobile-first approach
- 🎨 Modern UI with TailwindCSS and Headless UI
- 🔒 Secure session management
- ⚡ Fast page loads with Next.js
- 🛡️ Type-safe development with TypeScript

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Supabase account and project

## Getting Started

1. Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd warm-heaven-care-connect
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in the required environment variables in `.env.local` with your Supabase credentials and other configurations.

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests

## Production Deployment

### Build and Deploy

1. Ensure all environment variables are set correctly in your production environment
2. Build the application:
```bash
npm run build
```

3. Start the production server:
```bash
npm run start
```

### Deployment Checklist

- [ ] Configure production environment variables
- [ ] Enable HTTPS
- [ ] Set secure cookie options
- [ ] Configure CORS policies
- [ ] Set up error monitoring
- [ ] Configure logging
- [ ] Set up database backups

### Vercel Deployment

For the easiest deployment experience, use [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

1. Push your code to a Git repository
2. Import your project to Vercel
3. Configure environment variables
4. Deploy

Refer to [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed instructions.

## Security Features

- Secure authentication with Supabase
- Role-based access control
- Protected API routes
- HTTP-only cookies
- Type-safe operations
- Input validation
- XSS protection

## Project Structure

```
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── lib/         # Utility functions
│   ├── middleware.ts # Auth middleware
│   └── types/      # TypeScript types
├── public/         # Static files
└── tests/         # Test files
```

## Support

For support or bug reports, please open an issue in the repository.
