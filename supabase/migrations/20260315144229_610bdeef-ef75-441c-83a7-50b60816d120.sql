
CREATE TABLE public.waitlist_dismissals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dismiss_count INTEGER NOT NULL DEFAULT 1,
  fingerprint TEXT NOT NULL UNIQUE,
  last_dismissed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.waitlist_dismissals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert dismissal" ON public.waitlist_dismissals
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update dismissal" ON public.waitlist_dismissals
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can read own dismissal" ON public.waitlist_dismissals
  FOR SELECT USING (true);
