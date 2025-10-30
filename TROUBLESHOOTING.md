# Troubleshooting Guide

## Issue: Dev Server Shows "Ready" But ERR_CONNECTION_REFUSED in Browser (WSL)

### Symptoms
- Running `npm run dev` in WSL shows "✓ Ready in X.Xs"
- Console shows `Local: http://localhost:3001`
- Browser immediately shows "ERR_CONNECTION_REFUSED" or "This site can't be reached"
- Server appears to start successfully but doesn't accept connections

### Root Cause
The Next.js binary (`node_modules/.bin/next`) doesn't have execute permissions in WSL. This happens when:
1. You run `npm install` from Windows
2. Then try to run `npm run dev` from WSL
3. The execute bit isn't preserved across the Windows/WSL boundary

### Solution

**Quick Fix:**
```bash
# From WSL terminal
chmod +x node_modules/.bin/next
npm run dev
```

**Permanent Fix (Recommended):**
```bash
# Reinstall all dependencies from within WSL
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Why This Happens
WSL and Windows handle file permissions differently. When npm packages are installed from Windows, the executable flags on binary files may not be set correctly when accessed from WSL.

### Verification
After applying the fix, you should see:
- Server starts successfully
- Browser can access http://localhost:3001
- No connection refused errors

---

## Issue: lightningcss Module Not Found

### Error Message
```
Error: Cannot find module '../lightningcss.linux-x64-gnu.node'
```

### Root Cause
This error occurs when running the Next.js dev server from WSL Ubuntu, but the `lightningcss` native module was not installed in the WSL environment, or Node.js version is incompatible.

### Solution

#### Step 1: Verify Node.js Version in WSL

Next.js 16 requires Node.js >= 20.9.0

```bash
# Check Node.js version in WSL
wsl.exe -e bash -c "node --version"
```

If you see `v18.x.x`, you need to upgrade Node.js.

#### Step 2: Upgrade Node.js in WSL (if needed)

```bash
# Option A: Using nvm (recommended)
wsl.exe -e bash -c "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
wsl.exe -e bash -c "source ~/.bashrc && nvm install 20 && nvm use 20"

# Option B: Using NodeSource repository
wsl.exe -e bash -c "curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -"
wsl.exe -e bash -c "sudo apt-get install -y nodejs"
```

#### Step 3: Install lightningcss in WSL

```bash
wsl.exe -e bash -c "cd ~/Projects/math-worksheet-generator && npm install lightningcss --save-dev"
```

#### Step 4: Clear Next.js Cache

```bash
wsl.exe -e bash -c "cd ~/Projects/math-worksheet-generator && rm -rf .next"
```

#### Step 5: Run Dev Server from WSL

```bash
wsl.exe -e bash -c "cd ~/Projects/math-worksheet-generator && npm run dev"
```

### Alternative: Use Windows Node.js

If you prefer to run everything from Windows (not WSL):

```bash
# From PowerShell or Command Prompt (Windows side)
cd U:\home\l2laihub\Projects\math-worksheet-generator
npm install lightningcss --save-dev
npm run dev
```

**Note**: The `u:/` path indicates you're already using Windows paths, so this might be the simpler option.

## Current Environment Status

### ✅ Completed
- [x] `lightningcss` installed in Windows environment (u:/ path)
- [x] `lightningcss` installed in WSL environment (~/Projects/)
- [x] All project dependencies installed
- [x] Supabase configured
- [x] Database tables created

### ⚠️ Pending
- [ ] Node.js v20+ in WSL (currently v18.19.1)
- [ ] Dev server running successfully

## Recommended Approach

Given the path structure (`u:/home/l2laihub/Projects/math-worksheet-generator`), you're likely using a Windows-based workflow. I recommend:

1. **Use Windows exclusively** - Run all commands from PowerShell/Command Prompt
2. **Avoid WSL for this project** - The UNC path mapping causes issues
3. **Verify Node.js version in Windows**: Run `node --version` (should be >= 20.9.0)

### Quick Test

From PowerShell (Windows):
```powershell
cd U:\home\l2laihub\Projects\math-worksheet-generator
node --version  # Should show v20.x.x or higher
npm run dev
```

If this works, stick with Windows for development.

## Port Configuration

The project runs on port 3000 by default. If you see "Port 3000 is in use", the server will automatically use the next available port (3001, 3002, etc.).

To force a specific port:
```bash
npx next dev -p 3001
```

## File: dev.sh

Note: The `dev.sh` file in the project root is from a different project ("ABL Meditation App"). You can safely delete it or update it for this project:

```bash
#!/bin/bash
# Math Worksheet Generator - Development Server

echo "Starting Math Worksheet Generator development server..."
echo "Access the app at: http://localhost:3000"
echo ""

node ./node_modules/next/dist/bin/next dev -p 3000
```

## Next Steps After Server Starts

Once the dev server is running successfully:

1. **Test the Homepage**
   - Navigate to http://localhost:3000
   - You should see the Math Worksheet Generator homepage

2. **Test the API**
   ```bash
   node tests/test-api.js
   ```

3. **Monitor Console Logs**
   - Look for "[Generate] Calling Claude API..." messages
   - Check for any errors

## Getting Help

If issues persist:
1. Check this troubleshooting guide
2. Review [docs/PHASE-1-DAYS-3-4-SUMMARY.md](docs/PHASE-1-DAYS-3-4-SUMMARY.md)
3. Check [docs/SUPABASE-SETUP-GUIDE.md](docs/SUPABASE-SETUP-GUIDE.md)
4. Review commit history: `git log --oneline`

---

**Last Updated**: October 30, 2025
**Status**: lightningcss installed in both Windows and WSL; Node.js upgrade needed in WSL
