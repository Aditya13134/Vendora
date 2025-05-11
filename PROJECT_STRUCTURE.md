# JStigers Project Structure

```
jstigers/
├── public/                    # Static assets
│   └── images/                # Image assets
├── src/
│   ├── app/                   # Next.js 13+ App Router
│   │   ├── api/               # API Routes
│   │   │   └── vendors/       # Vendor-related API endpoints
│   │   │       ├── route.ts   # GET /api/vendors (list), POST /api/vendors (create)
│   │   │       └── [id]/      # Vendor-specific operations
│   │   │           └── route.ts # GET, PUT, DELETE /api/vendors/:id
│   │   ├── vendors/          # Vendor-related pages
│   │   │   ├── page.tsx      # Vendor listing page
│   │   │   ├── new/          # New vendor creation
│   │   │   │   └── page.tsx  # Add vendor form
│   │   │   └── edit/         # Vendor editing
│   │   │       └── [id]/     # Dynamic route for vendor editing
│   │   │           └── page.tsx # Edit vendor form
│   │   └── layout.tsx        # Root layout with shared UI
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Basic UI components
│   │   │   ├── Button.tsx   # Custom button component
│   │   │   └── Input.tsx    # Form input component
│   │   └── vendors/         # Vendor-specific components
│   │       └── VendorForm.tsx # Shared vendor form component
│   ├── lib/                  # Utility functions and configurations
│   │   ├── db.ts            # Database configuration
│   │   └── api.ts           # API utility functions
│   ├── types/               # TypeScript type definitions
│   │   └── vendor.ts        # Vendor-related types
│   └── utils/               # Helper functions
│       ├── validation.ts    # Form validation utilities
│       └── formatting.ts    # Data formatting utilities
├── .env                     # Environment variables
├── .env.local              # Local environment variables
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md              # Project documentation
```

## Key Features

- **App Router Structure**: Utilizes Next.js 13+ app directory structure for routing
- **API Routes**: RESTful API endpoints for vendor management
- **Type Safety**: Full TypeScript support throughout the application
- **Component Organization**: Modular component structure for maintainability
- **Form Handling**: Robust form management with validation
- **Error Handling**: Comprehensive error handling with user feedback
- **UI/UX**: Modern, responsive design with animations

## Main Components

- **Vendor Management**
  - List view with pagination
  - Create new vendor form
  - Edit existing vendor details
  - Delete vendor functionality

- **Form Features**
  - Required field validation
  - Real-time input handling
  - Success/error notifications
  - Loading states

- **UI Components**
  - Responsive layout
  - Loading spinners
  - Toast notifications
  - Animated transitions