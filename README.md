# Vendora - Vendor Management System

Vendora is a modern web application built with Next.js for managing vendor information efficiently. It provides a user-friendly interface for adding, editing, and managing vendor details with secure authentication.

## Features

- 🔐 Secure Google Authentication
- 📊 Vendor Management Dashboard
- ✨ Modern and Responsive UI
- 🎯 Easy Vendor Information Management
- 📱 Mobile-Friendly Design

## Tech Stack

- **Frontend**: Next.js 15.3.2, React 19
- **Styling**: TailwindCSS 4
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **UI Components**: Framer Motion, React Icons
- **State Management**: React Hooks
- **Form Handling**: React Hot Toast

## Prerequisites

- Node.js (Latest LTS version)
- MongoDB Database
- Google OAuth credentials

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Aditya13134/Vendora.git
cd Vendora
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable React components
├── lib/             # Utility functions and configurations
├── models/          # MongoDB models
└── middleware.ts    # NextAuth middleware
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
