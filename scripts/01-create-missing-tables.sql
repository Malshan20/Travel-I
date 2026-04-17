-- Create uploads table for image uploads and location detection
CREATE TABLE IF NOT EXISTS uploads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  detected_location TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create search_history table for AI chat and search queries
CREATE TABLE IF NOT EXISTS search_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  query TEXT NOT NULL,
  result TEXT,
  search_type TEXT DEFAULT 'general', -- 'hotel', 'direction', 'ai_chat', 'general'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update profiles table to match our needs
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_uploads_user_id ON uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_uploads_created_at ON uploads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON search_history(user_id);
CREATE INDEX IF NOT EXISTS idx_search_history_created_at ON search_history(created_at DESC);

-- Enable Row Level Security
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for uploads (allow public read for image upload feature)
CREATE POLICY "Public can view uploads" ON uploads FOR SELECT USING (true);
CREATE POLICY "Users can insert uploads" ON uploads FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own uploads" ON uploads FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own uploads" ON uploads FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for search_history (private to user)
CREATE POLICY "Users can view own search history" ON search_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own search history" ON search_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own search history" ON search_history FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own search history" ON search_history FOR DELETE USING (auth.uid() = user_id);
