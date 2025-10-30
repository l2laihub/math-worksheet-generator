# Supabase Setup Guide

**Status**: Manual Setup Required
**Estimated Time**: 15-20 minutes
**Prerequisites**: None (free tier available)

---

## Step 1: Create Supabase Project (5 minutes)

1. **Go to Supabase**: https://supabase.com
2. **Sign up or log in**
   - Use GitHub account (recommended) or email
3. **Create New Project**
   - Click "New Project"
   - Project Name: `math-worksheet-generator`
   - Database Password: **Save this password!** You'll need it later
   - Region: Choose closest to your users (e.g., `us-east-1`)
   - Plan: Free tier (sufficient for MVP)
4. **Wait for provisioning** (2-3 minutes)

---

## Step 2: Get API Credentials (2 minutes)

Once your project is ready:

1. **Go to Project Settings**
   - Click ⚙️ Settings icon (bottom left)
   - Click "API" tab

2. **Copy these values**:
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (show and copy)
   ```

3. **Create `.env.local` file**:
   ```bash
   # Copy from .env.local.example
   cp .env.local.example .env.local
   ```

4. **Update `.env.local` with your values**:
   ```env
   # Anthropic Claude API (from .env)
   ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

   # Supabase (from Step 2)
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

   # Database URL (update below)
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
   DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"
   ```

---

## Step 3: Get Database Connection String (2 minutes)

1. **Go to Database Settings**
   - Settings > Database
   - Scroll to "Connection String" section

2. **Copy the URI format**:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```

3. **Replace `[YOUR-PASSWORD]`** with the database password you saved in Step 1

4. **Create two versions in `.env.local`**:
   - `DATABASE_URL`: Add `?pgbouncer=true&connection_limit=1` at the end (for Prisma Migrate)
   - `DIRECT_URL`: Keep clean without parameters (for direct queries)

---

## Step 4: Enable Row Level Security (3 minutes)

1. **Go to SQL Editor**
   - Click SQL Editor icon (left sidebar)

2. **Run this SQL to enable RLS**:
   ```sql
   -- Enable RLS on users table
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;

   -- Users can read their own data
   CREATE POLICY "Users can read own data"
     ON users
     FOR SELECT
     USING (auth.uid()::text = id);

   -- Enable RLS on generations table
   ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

   -- Users can read their own generations
   CREATE POLICY "Users can read own generations"
     ON generations
     FOR SELECT
     USING (auth.uid()::text = user_id);

   -- Users can insert their own generations
   CREATE POLICY "Users can insert own generations"
     ON generations
     FOR INSERT
     WITH CHECK (auth.uid()::text = user_id);

   -- Service role can do anything (for API routes)
   CREATE POLICY "Service role full access to generations"
     ON generations
     FOR ALL
     USING (true)
     WITH CHECK (true);
   ```

   **Note**: We'll run these AFTER creating tables with Prisma in Step 6

---

## Step 5: Create Storage Bucket (3 minutes)

1. **Go to Storage**
   - Click Storage icon (left sidebar)
   - Click "Create a new bucket"

2. **Create `worksheets` bucket**:
   - Name: `worksheets`
   - Public bucket: **Yes** (checked)
   - File size limit: 10 MB (sufficient for PDFs)
   - Allowed MIME types: `application/pdf`
   - Click "Create bucket"

3. **Configure bucket policies** (auto-generated for public buckets)
   - Storage > worksheets > Policies
   - Verify "Public access" policy exists:
     ```sql
     CREATE POLICY "Public Access"
     ON storage.objects FOR SELECT
     USING (bucket_id = 'worksheets');
     ```

4. **Test bucket** (optional):
   - Upload a test PDF file
   - Copy public URL
   - Verify accessible in browser

---

## Step 6: Run Prisma Migrations (5 minutes)

Back in your terminal:

1. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

2. **Create initial migration**:
   ```bash
   npx prisma migrate dev --name init
   ```

   This will:
   - Create `users` and `generations` tables
   - Set up relationships and indexes
   - Generate migration files

3. **Verify tables created**:
   - Go to Supabase > Table Editor
   - You should see:
     - `users` table (id, email, created_at)
     - `generations` table (id, user_id, grade_level, topic, etc.)

4. **Now run the RLS policies from Step 4**:
   - Go to SQL Editor
   - Run the RLS policy SQL from Step 4

---

## Step 7: Enable Supabase Auth (3 minutes)

1. **Go to Authentication**
   - Click Authentication icon (left sidebar)
   - Click "Providers" tab

2. **Enable Email Provider**:
   - Enable "Email" toggle
   - Confirm email: **Enabled** (for magic links)
   - Secure email change: **Enabled**
   - Email template customization: (optional, can customize later)

3. **Configure site URL** (for magic link redirects):
   - Authentication > URL Configuration
   - Site URL: `http://localhost:3000` (development)
   - Redirect URLs: Add `http://localhost:3000/auth/callback`

   **Note**: Update these to your production domain when deploying

4. **Test authentication** (optional):
   - Authentication > Users
   - Manually add a test user
   - Email: your-email@example.com
   - Auto-generate password
   - Verify user appears in table

---

## Step 8: Verify Setup (2 minutes)

Run these checks:

1. **Environment variables set**:
   ```bash
   cat .env.local | grep -E "SUPABASE|DATABASE"
   ```
   - Should show all 5 variables populated

2. **Test Prisma connection**:
   ```bash
   npx prisma studio
   ```
   - Opens Prisma Studio at http://localhost:5555
   - You should see `users` and `generations` tables
   - Close with Ctrl+C

3. **Test Supabase client** (create test file):
   ```typescript
   // test-supabase.ts
   import { createClient } from '@/lib/supabase/client';

   const supabase = createClient();
   const { data, error } = await supabase.from('users').select('*').limit(1);
   console.log('Connection successful:', !error);
   ```

---

## Troubleshooting

### Issue: "Role 'postgres' does not exist"
**Solution**: Double-check your database password in `.env.local`

### Issue: "Cannot connect to Supabase"
**Solution**:
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Ensure URL starts with `https://`

### Issue: "RLS policies prevent access"
**Solution**:
- Verify policies created in Step 4
- Use service role key for API routes (not anon key)

### Issue: "Storage bucket not found"
**Solution**:
- Verify bucket name is exactly `worksheets`
- Check bucket is set to public

### Issue: Prisma migration fails
**Solution**:
- Ensure `DATABASE_URL` has `?pgbouncer=true&connection_limit=1`
- Ensure `DIRECT_URL` has no parameters
- Check database password is correct

---

## Next Steps

After completing this setup:

1. ✅ Supabase project created
2. ✅ API credentials configured in `.env.local`
3. ✅ Database connection tested
4. ✅ Row Level Security enabled
5. ✅ Storage bucket created (`worksheets`)
6. ✅ Prisma migrations run
7. ✅ Authentication enabled

**Ready to proceed to**: Phase 1 Day 2 - Core dependencies and Vercel deployment

---

## Reference Links

- **Supabase Dashboard**: https://supabase.com/dashboard
- **Supabase Docs**: https://supabase.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js + Supabase Guide**: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

---

**Last Updated**: 2025-10-29
**Author**: Development Team
