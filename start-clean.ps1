# Clean Start Script for Math Worksheet Generator
# This script cleanly starts the dev server by removing the corrupted cache

Write-Host "🧹 Cleaning .next cache..." -ForegroundColor Yellow

# Remove .next directory if it exists
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
    Write-Host "✅ Cache cleared" -ForegroundColor Green
} else {
    Write-Host "ℹ️  No cache to clear" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🚀 Starting development server..." -ForegroundColor Yellow
Write-Host "📝 Note: Watchpack warnings are normal for mapped drives (U:\) and can be ignored" -ForegroundColor Cyan
Write-Host "📍 Server will be at: http://localhost:3000" -ForegroundColor Green
Write-Host ""

# Start the dev server
npm run dev
