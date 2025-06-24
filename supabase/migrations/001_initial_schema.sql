-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create W9 requests table
CREATE TABLE public.w9_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  vendor_name TEXT NOT NULL,
  vendor_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired')),
  created_by UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days')
);

-- Create W9 form data table
CREATE TABLE public.w9_form_data (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  request_id UUID REFERENCES public.w9_requests(id) ON DELETE CASCADE NOT NULL,
  legal_name TEXT NOT NULL,
  business_name TEXT,
  tax_classification TEXT NOT NULL,
  ssn_ein TEXT NOT NULL,
  street_address TEXT NOT NULL,
  apartment TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  signature TEXT NOT NULL,
  signature_type TEXT NOT NULL DEFAULT 'typed' CHECK (signature_type IN ('typed', 'drawn')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_w9_requests_created_by ON public.w9_requests(created_by);
CREATE INDEX idx_w9_requests_status ON public.w9_requests(status);
CREATE INDEX idx_w9_requests_vendor_email ON public.w9_requests(vendor_email);
CREATE INDEX idx_w9_form_data_request_id ON public.w9_form_data(request_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_w9_requests_updated_at BEFORE UPDATE ON public.w9_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.w9_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.w9_form_data ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Users can only see W9 requests they created
CREATE POLICY "Users can view own W9 requests" ON public.w9_requests
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can create W9 requests" ON public.w9_requests
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own W9 requests" ON public.w9_requests
  FOR UPDATE USING (auth.uid() = created_by);

-- W9 form data can be viewed by request creator or submitted by anyone with request ID
CREATE POLICY "Request creators can view form data" ON public.w9_form_data
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.w9_requests 
      WHERE id = request_id AND created_by = auth.uid()
    )
  );

CREATE POLICY "Anyone can submit form data" ON public.w9_form_data
  FOR INSERT WITH CHECK (true);

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
