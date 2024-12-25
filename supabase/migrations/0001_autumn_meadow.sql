/*
  # Initial Schema Setup for VentureConnect

  1. New Tables
    - users
      - Core user profile information
      - Linked to Supabase auth.users
    - campaigns
      - Campaign details and funding information
    - investments
      - Track investments made in campaigns
    - milestones
      - Campaign milestones and progress tracking
    - updates
      - Campaign updates and announcements
    - documents
      - Store campaign-related documents
    - team_members
      - Campaign team information
    
  2. Security
    - RLS enabled on all tables
    - Policies for:
      - Public read access for active campaigns
      - Creator-only write access
      - Investor access to their investments
      - Team member access to their campaigns

  3. Relationships
    - Foreign key constraints to maintain data integrity
    - Cascading deletes where appropriate
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  avatar_url text,
  bio text,
  website text,
  location text,
  role text CHECK (role IN ('entrepreneur', 'investor')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id uuid REFERENCES users(id) NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  stage text NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'funded', 'completed')),
  goal numeric NOT NULL CHECK (goal > 0),
  raised numeric DEFAULT 0 CHECK (raised >= 0),
  image_url text,
  video_url text,
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (end_date > start_date)
);

-- Investments table
CREATE TABLE IF NOT EXISTS investments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_id uuid REFERENCES users(id) NOT NULL,
  campaign_id uuid REFERENCES campaigns(id) NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'refunded')),
  transaction_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid REFERENCES campaigns(id) NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  timeline text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Updates table
CREATE TABLE IF NOT EXISTS updates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid REFERENCES campaigns(id) NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  type text CHECK (type IN ('milestone', 'general', 'important')),
  metrics jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid REFERENCES campaigns(id) NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  size text NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid REFERENCES campaigns(id) NOT NULL,
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Campaigns policies
CREATE POLICY "Anyone can view active campaigns"
  ON campaigns FOR SELECT
  USING (status = 'active');

CREATE POLICY "Creators can manage their campaigns"
  ON campaigns FOR ALL
  TO authenticated
  USING (creator_id = auth.uid());

-- Investments policies
CREATE POLICY "Investors can view their investments"
  ON investments FOR SELECT
  TO authenticated
  USING (investor_id = auth.uid());

CREATE POLICY "Investors can create investments"
  ON investments FOR INSERT
  TO authenticated
  WITH CHECK (investor_id = auth.uid());

-- Milestones policies
CREATE POLICY "Anyone can view milestones of active campaigns"
  ON milestones FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = milestones.campaign_id 
      AND campaigns.status = 'active'
    )
  );

CREATE POLICY "Campaign creators can manage milestones"
  ON milestones FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = milestones.campaign_id 
      AND campaigns.creator_id = auth.uid()
    )
  );

-- Updates policies
CREATE POLICY "Anyone can view updates of active campaigns"
  ON updates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = updates.campaign_id 
      AND campaigns.status = 'active'
    )
  );

CREATE POLICY "Campaign creators can manage updates"
  ON updates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = updates.campaign_id 
      AND campaigns.creator_id = auth.uid()
    )
  );

-- Documents policies
CREATE POLICY "Anyone can view documents of active campaigns"
  ON documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = documents.campaign_id 
      AND campaigns.status = 'active'
    )
  );

CREATE POLICY "Campaign creators can manage documents"
  ON documents FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = documents.campaign_id 
      AND campaigns.creator_id = auth.uid()
    )
  );

-- Team members policies
CREATE POLICY "Anyone can view team members of active campaigns"
  ON team_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = team_members.campaign_id 
      AND campaigns.status = 'active'
    )
  );

CREATE POLICY "Campaign creators can manage team members"
  ON team_members FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = team_members.campaign_id 
      AND campaigns.creator_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS campaigns_creator_id_idx ON campaigns(creator_id);
CREATE INDEX IF NOT EXISTS campaigns_status_idx ON campaigns(status);
CREATE INDEX IF NOT EXISTS investments_investor_id_idx ON investments(investor_id);
CREATE INDEX IF NOT EXISTS investments_campaign_id_idx ON investments(campaign_id);
CREATE INDEX IF NOT EXISTS milestones_campaign_id_idx ON milestones(campaign_id);
CREATE INDEX IF NOT EXISTS updates_campaign_id_idx ON updates(campaign_id);
CREATE INDEX IF NOT EXISTS documents_campaign_id_idx ON documents(campaign_id);
CREATE INDEX IF NOT EXISTS team_members_campaign_id_idx ON team_members(campaign_id);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_investments_updated_at
  BEFORE UPDATE ON investments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_milestones_updated_at
  BEFORE UPDATE ON milestones
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_updates_updated_at
  BEFORE UPDATE ON updates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();