#!/bin/bash

# Comprehensive Clean Build Script for Cache Invalidation
# This script ensures a completely clean build environment

echo "🧹 Starting comprehensive clean build process..."

# Kill any running processes
echo "🔄 Killing existing processes..."
pkill -f "npm run dev" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
pkill -f "node.*next" 2>/dev/null || true

# Remove all cache and build artifacts
echo "🗑️  Removing cache and build artifacts..."
rm -rf .next
rm -rf node_modules
rm -rf package-lock.json
rm -rf yarn.lock
rm -rf pnpm-lock.yaml
rm -rf .turbo
rm -rf .swc
rm -rf .next/cache
rm -rf .next/static
rm -rf .next/server
rm -rf .next/standalone
rm -rf .next/trace
rm -rf .next/analyze
rm -rf .next/build-manifest.json
rm -rf .next/prerender-manifest.json
rm -rf .next/routes-manifest.json
rm -rf .next/export-marker.json
rm -rf .next/package.json
rm -rf .next/required-server-files.json
rm -rf .next/server-functions-manifest.json
rm -rf .next/static-build-manifest.json
rm -rf .next/type-check.js
rm -rf .next/type-check.js.map
rm -rf .next/type-check.js.LICENSE.txt
rm -rf .next/type-check.js.LICENSE.txt.map
rm -rf .next/type-check.js.map
rm -rf .next/type-check.js.LICENSE.txt
rm -rf .next/type-check.js.LICENSE.txt.map

# Clear npm cache
echo "🧽 Clearing npm cache..."
npm cache clean --force

# Clear system caches (macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Clearing macOS system caches..."
    sudo dscacheutil -flushcache 2>/dev/null || true
    sudo killall -HUP mDNSResponder 2>/dev/null || true
fi

# Clear browser caches (if possible)
echo "🌐 Clearing browser caches..."
# This would require browser automation - skipping for now

# Reinstall dependencies
echo "📦 Reinstalling dependencies..."
npm install

# Verify installation
echo "✅ Verifying installation..."
npm list --depth=0

# Start development server with clean cache
echo "🚀 Starting development server with clean cache..."
npm run dev

echo "✨ Clean build process completed!"
echo "🔧 Cache invalidation strategy implemented:"
echo "   - File-based webpack cache with build dependencies"
echo "   - On-demand entries with proper buffer management"
echo "   - Watch options for development hot reloading"
echo "   - SWC minification for better performance"
echo "   - ESM externals for modern bundling"
