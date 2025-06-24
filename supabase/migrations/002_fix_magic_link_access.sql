-- Fix magic link access and RLS policies for W9 requests
-- This allows both authenticated request creation and unauthenticated form access

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Users can view own W9 requests" ON public.w9_requests;
DROP POLICY IF EXISTS "Users can create W9 requests" ON public.w9_requests;
DROP POLICY IF EXISTS "Users can update own W9 requests" ON public.w9_requests;

-- SELECT policies: Allow both authenticated users to see their own requests
-- and public access to pending requests (for magic links)
CREATE POLICY "Users can view own W9 requests" ON public.w9_requests
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Public can view pending W9 requests" ON public.w9_requests
  FOR SELECT USING (status = 'pending');

-- INSERT policy: Allow authenticated users to create requests
CREATE POLICY "Authenticated users can create W9 requests" ON public.w9_requests
  FOR INSERT WITH CHECK (auth.uid() = created_by);

-- UPDATE policy: Allow authenticated users to update their own requests
CREATE POLICY "Users can update own W9 requests" ON public.w9_requests
  FOR UPDATE USING (auth.uid() = created_by);

-- This approach provides:
-- - Authenticated users can create and manage their own requests
-- - Public access to pending requests for magic link functionality
-- - Security: completed/expired requests are still protected from unauthorized updates
