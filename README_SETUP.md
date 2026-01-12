# Complete Setup Guide

## 🎯 Project Structure

This is a Turborepo monorepo containing:
- **Web App** (Next.js) - `apps/web/`
- **Native App** (Expo) - `apps/native/`
- **Desktop App** (Tauri) - `apps/desktop/`
- **Shared Packages** - `packages/`

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm 10+
- For Native: Expo CLI (optional, included in dependencies)
- For Desktop: Rust and Tauri CLI (will be installed automatically)

### Install All Dependencies

```bash
npm install --legacy-peer-deps
```

This installs dependencies for all apps and packages.

## 🚀 Running Apps

### Web App (Next.js)

```bash
# Development
npm run dev:web
# or
cd apps/web && npm run dev

# Build
npm run build:web

# Production
npm run start:web
```

Web app runs on: http://localhost:3000

### Native App (Expo)

```bash
# Development
npm run dev:native
# or
cd apps/native && npm start

# iOS
cd apps/native && npm run ios

# Android
cd apps/native && npm run android

# Web (Expo Web)
cd apps/native && npm run web
```

### Desktop App (Tauri)

```bash
# Development
npm run dev:desktop
# or
cd apps/desktop && npm run tauri:dev

# Build (creates installers)
cd apps/desktop && npm run tauri:build
```

## 🏗️ Building All Apps

```bash
# Build all apps
npm run build

# Build specific app
npm run build:web
npm run build:native
npm run build:desktop
```

## 📁 Package Structure

### Shared Packages

- `packages/ui/` - Shared UI components (cross-platform)
- `packages/translations/` - Shared i18n files (12 languages)
- `packages/navigation/` - Solito navigation (cross-platform)

### Using Shared Packages

In any app, import from shared packages:

```typescript
import { ThemeToggle, LanguageSwitcher } from "@repo/ui";
import { getTranslations } from "@repo/translations";
import { Link, useRouter } from "@repo/navigation";
```

## 🔧 Development Workflow

1. **Start all apps in development:**
   ```bash
   npm run dev
   ```

2. **Start specific app:**
   ```bash
   npm run dev:web      # Web only
   npm run dev:native   # Native only
   npm run dev:desktop  # Desktop only
   ```

3. **Make changes:**
   - Edit shared packages in `packages/`
   - Edit app-specific code in `apps/{app-name}/`
   - Changes to shared packages are automatically picked up

4. **Test builds:**
   ```bash
   npm run build
   ```

## 🧪 Testing

```bash
# Type check all
npm run type-check

# Lint all
npm run lint

# Clean all
npm run clean
```

## 📱 Platform-Specific Features

### Native App
- Uses Expo Router for navigation
- Native modules: location, sensors, notifications, haptics
- File-based routing matching web app structure

### Desktop App
- Uses Tauri for native desktop
- File system access for PDFs
- System notifications
- Cross-platform (Windows, macOS, Linux)

### Web App
- Next.js App Router
- Server-side rendering
- Deployed on Vercel

## 🚢 Deployment

### Web App (Vercel)
- Automatically deploys from `apps/web/`
- Configured in `vercel.json`
- Root directory: `apps/web`

### Native App
- Build with EAS: `eas build`
- Or use Expo's build service

### Desktop App
- Build installers: `npm run tauri:build`
- Creates platform-specific installers (DMG, MSI, AppImage)

## 📝 Notes

- All apps share the same translations (12 languages)
- Components in `packages/ui/` work on all platforms
- Navigation is unified via Solito
- Build system uses Turborepo for fast, cached builds

## 🐛 Troubleshooting

### Build Issues
```bash
# Clean and rebuild
npm run clean
npm install --legacy-peer-deps
npm run build
```

### Native App Issues
```bash
cd apps/native
npm install --legacy-peer-deps
npx expo install --fix
```

### Desktop App Issues
```bash
cd apps/desktop
npm install --legacy-peer-deps
# Install Rust if needed: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## ✅ Verification

After setup, verify everything works:

1. **Web app builds:**
   ```bash
   npm run build:web
   ```

2. **Native app starts:**
   ```bash
   cd apps/native && npm start
   ```

3. **Desktop app builds:**
   ```bash
   cd apps/desktop && npm run tauri:dev
   ```

All apps should start without errors! 🎉
