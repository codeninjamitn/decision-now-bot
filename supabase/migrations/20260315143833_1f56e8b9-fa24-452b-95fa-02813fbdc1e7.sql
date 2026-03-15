
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can join waitlist" ON public.waitlist
  FOR INSERT WITH CHECK (true);

-- Only service role can read
CREATE POLICY "Service role can read waitlist" ON public.waitlist
  FOR SELECT USING (false);
