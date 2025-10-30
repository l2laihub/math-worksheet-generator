-- Manual Database Setup for Math Worksheet Generator
-- Run this in Supabase SQL Editor if Prisma migration fails
-- Dashboard > SQL Editor > New Query > Paste and Run

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create generations table
CREATE TABLE IF NOT EXISTS generations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    grade_level INTEGER NOT NULL,
    topic TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    problem_count INTEGER NOT NULL,
    theme TEXT NOT NULL,
    worksheet_url TEXT NOT NULL,
    answer_key_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_generations_user_id ON generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_status ON generations(status);
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON generations(created_at);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data"
    ON users
    FOR SELECT
    USING (auth.uid()::text = id::text);

-- RLS Policies for generations table
CREATE POLICY "Users can read own generations"
    ON generations
    FOR SELECT
    USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own generations"
    ON generations
    FOR INSERT
    WITH CHECK (auth.uid()::text = user_id::text);

-- Service role can do anything (for API routes using service_role key)
CREATE POLICY "Service role full access to users"
    ON users
    FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role full access to generations"
    ON generations
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Verify tables created
SELECT 'Tables created successfully!' as status;
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('users', 'generations');
