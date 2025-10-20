# 📚 Bookstore App
A modern React Native bookstore application built with Clean Architecture principles and feature-based organization.
<img width="1187" height="600" alt="img" src="https://github.com/user-attachments/assets/aff7fe0a-ddaa-4343-97b2-bee220a9002b" />

![React Native](https://img.shields.io/badge/React_Native-0.81.4-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-54.0.0-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🏗️ Architecture Overview

This project implements **Clean Architecture** with **Feature-Based Organization**, ensuring scalability, maintainability, and testability.

### 🎯 Core Principles

- **Separation of Concerns**: Each layer has a specific responsibility
- **Dependency Inversion**: Dependencies flow inward toward the domain
- **Feature Isolation**: Related functionality grouped in feature modules
- **Type Safety**: Full TypeScript implementation

### 📊 Architecture Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                       │
│     React Components, Hooks, Screens, UI Logic                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         DOMAIN LAYER                            │
│     Entities, Use Cases, Business Logic, Interfaces            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          DATA LAYER                             │
│     API Clients, Repositories, Mappers, External Services      │
└─────────────────────────────────────────────────────────────────┘
```

## 🗂️ Project Structure

```
📦 bookstore-app/
├── 📁 app/                          # Expo Router navigation
│   ├── 📁 (tabs)/                   # Tab-based navigation
│   │   ├── 📁 Home/
│   │   ├── 📁 Categories/
│   │   └── 📁 Users/
│   ├── 📁 details/
│   ├── _layout.tsx
│   └── index.tsx
├── 📁 src/
│   ├── 📁 design/                   # Design System
│   │   ├── 📁 components/           # Reusable UI components
│   │   │   ├── 📁 common/           # Base components (HStack, VStack, Text)
│   │   │   ├── 📁 Categories/       # Category-specific components
│   │   │   ├── 📁 Header/
│   │   │   └── 📁 PreviewTopicsList/
│   │   ├── 📁 tokens/               # Design tokens (Colors, Spacing)
│   │   └── 📁 assets/               # Images, icons, fonts
│   ├── 📁 features/                 # Feature-based modules
│   │   ├── 📁 auth/                 # Authentication feature
│   │   │   ├── 📁 data/
│   │   │   ├── 📁 domain/
│   │   │   └── 📁 presentation/
│   │   ├── 📁 books/                # Books core feature
│   │   │   ├── 📁 data/             # API clients, repositories
│   │   │   ├── 📁 domain/           # Book entity, interfaces
│   │   │   └── 📁 presentation/     # Book-related screens/hooks
│   │   ├── 📁 Categories/           # Categories feature
│   │   │   ├── 📁 data/             # Category data management
│   │   │   ├── 📁 domain/           # Category business logic
│   │   │   └── 📁 presentation/     # Category screens/hooks
│   │   ├── 📁 home/                 # Home screen feature
│   │   └── 📁 profile/              # User profile feature
│   └── 📁 shared/                   # Shared utilities
│       ├── 📁 components/           # Shared components
│       ├── 📁 hooks/                # Custom hooks
│       ├── 📁 providers/            # Context providers
│       ├── 📁 services/             # External services
│       └── 📁 utils/                # Utility functions
├── 📁 assets/                       # Static assets
└── 📁 store/                        # Global state management
```

## 🎨 Design System

### Color Tokens
- **Primary**: Orange-based palette (`#ff7832` main)
- **Neutral**: Grayscale for text and backgrounds
- **Theme Support**: Light and dark mode implementation

### Typography
- **Font Family**: Poppins (Thin to Black weights)
- **Responsive**: Adaptive sizing for different screen sizes

### Components
- **Atomic Design**: Base components (HStack, VStack, Text)
- **Compound Components**: Complex UI elements (Categories, PreviewTopicsList)
- **Theme-Aware**: Automatic dark/light mode switching

## 🚀 Technologies & Libraries

### Core Framework
- **React Native**: `0.81.4` - Mobile app framework
- **Expo**: `54.0.0` - Development platform
- **Expo Router**: `6.0.10` - File-based routing

### Language & Type Safety
- **TypeScript**: `5.9.2` - Static type checking
- **ESLint**: `9.25.1` - Code linting
- **Prettier**: `3.2.5` - Code formatting

### UI & Styling
- **NativeWind**: `4.1.21` - Tailwind CSS for React Native
- **TailwindCSS**: `3.4.0` - Utility-first CSS framework
- **React Native SVG**: `15.13.0` - SVG support
- **React Native Reanimated**: `4.1.1` - Advanced animations

### Navigation & Gesture Handling
- **React Navigation**: `7.1.6` - Navigation library
- **React Native Gesture Handler**: `2.28.0` - Gesture recognition
- **React Native Screens**: `4.16.0` - Native screen optimization

### Forms & Validation
- **React Hook Form**: `7.64.0` - Form management
- **Zod**: `4.1.12` - Schema validation
- **Hookform Resolvers**: `5.2.2` - Form validation integration

### HTTP & Data Management
- **Axios**: `1.12.2` - HTTP client
- **Zustand**: `4.5.1` - State management

### UI Components & Carousels
- **React Native Reanimated Carousel**: `4.0.3` - Advanced carousel component
- **Expo Vector Icons**: `15.0.2` - Icon library

### Security & Storage
- **Expo Secure Store**: `15.0.7` - Secure storage
- **React Native Safe Area Context**: `5.6.0` - Safe area handling

### Development Tools
- **Metro**: Build system
- **Babel**: JavaScript compiler
- **EAS Build**: Cloud build service

## 🏛️ Clean Architecture Implementation

### Feature: Categories + Books

#### 🎭 Presentation Layer
```typescript

useCategoriesPresentation()  // Display logic
useCategoriesManagement()    // CRUD operations
useAddBookForm()            // Form handling


CategoriesScreen.tsx        // Main screen
AddBookScreen.tsx          // Form screen
```

#### 🧠 Domain Layer
```typescript

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
}

ManageBooksUseCase          // Book operations
ManageCategoriesUseCase     // Category operations

bookSchema                  // Zod validation schema
```

#### 🗄️ Data Layer
```typescript

BooksApiClient             // HTTP requests to /api/books
CategoriesApiClient        // HTTP requests to /api/books/categories

BookRepository            // Data access abstraction

BookMapper               // API ↔ Domain conversion
CategoryMapper           // API ↔ Domain conversion

CategoriesFactory        // Dependency injection
```

### 🔄 Data Flow Example

```typescript

const { addBook } = useCategoriesManagement();


const validatedData = bookSchema.parse(formData);


const useCase = new ManageBooksUseCase(repository);
await useCase.execute(validatedData);


await booksApiClient.create(bookData);
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- Expo CLI
- iOS Simulator / Android Emulator

### Installation

```bash

git clone <repository-url>
cd bookstore-app

pnpm install

pnpm start

pnpm ios      # iOS simulator
pnpm android  # Android emulator
```

### Development Scripts

```bash

pnpm start                # Start Expo dev server
pnpm start --dev-client   # Start with dev client

pnpm ios                 # Run on iOS
pnpm android             # Run on Android
pnpm web                 # Run on web
```

## 📱 Features

### 🏠 Home Screen
- **Parallax Carousel**: Featured books display
- **Category Filter**: Browse by genre
- **Preview Lists**: Recently added, available, unavailable books

### 📚 Categories Management
- **CRUD Operations**: Create, read, update, delete categories
- **Book Association**: Link books to categories
- **Form Validation**: Zod schema validation
- **Error Handling**: Comprehensive error management

### 🔍 Book Management
- **Search & Filter**: Find books by various criteria
- **Inventory Status**: Available/unavailable tracking
- **Author Information**: Complete book metadata

### 🎨 Design Features
- **Dark/Light Theme**: Automatic theme switching
- **Responsive Design**: Adapts to different screen sizes
- **Gesture Support**: Native gesture handling
- **Smooth Animations**: Reanimated-powered transitions

## 🧪 Testing Strategy

### Unit Tests
- **Domain Logic**: Use cases and entities
- **Utilities**: Helper functions and mappers
- **Hooks**: Custom React hooks

### Integration Tests
- **API Clients**: HTTP request/response handling
- **Repository Pattern**: Data access layer
- **Form Validation**: Schema validation

### E2E Tests
- **User Flows**: Complete feature workflows
- **Navigation**: Screen transitions
- **State Management**: Global state consistency

## 🚀 Deployment

### Build Profiles
- **Development**: Internal testing with debugging
- **Preview**: Stakeholder review builds
- **Production**: App store distribution

## 🤝 Contributing

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent formatting
- **Conventional Commits**: Semantic commit messages

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Architecture**: Clean Architecture with Feature-Based Organization
- **UI/UX**: Modern design system with theme support
- **Development**: React Native + Expo ecosystem
- **State Management**: Zustand + React Hook Form

---

<div align="center">
  <p>Built with ❤️ using React Native and Clean Architecture</p>
  <p>
    <a href="#-bookstore-app">🔝 Back to top</a>
  </p>
</div>
