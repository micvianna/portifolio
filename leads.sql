-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the "leads" table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    marketing_opt_in BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS) policies
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anonymous users (e.g., website visitors submitting the form)
CREATE POLICY "Allow anonymous inserts" ON public.leads
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- (Optional) If you want to enable read access for authenticated admins only:
-- CREATE POLICY "Allow authenticated read access" ON public.leads
--     FOR SELECT
--     TO authenticated
--     USING (true);
