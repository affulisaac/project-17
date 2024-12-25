/*
  # Campaign Creation Schema

  1. New Tables
    - `campaign_details`: Stores basic campaign information and business stage details
    - `campaign_returns`: Stores investment return models and projections
    - `campaign_media`: Stores campaign images, videos, and documents
    - `campaign_visibility`: Stores visibility and access settings
    
  2. Modified Tables
    - Added new columns to existing tables for supporting campaign creation flow
    
  3. Security
    - RLS policies for all new tables
    - Policies for campaign creators and investors
*/

-- Campaign Details Table
CREATE TABLE IF NOT EXISTS campaign_details (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  business_type text CHECK (business_type IN ('idea', 'started', 'unstarted')),
  market_research text,
  business_plan text,
  current_operations text,
  problem_statement text,
  solution text,
  target_market text,
  revenue_model text,
  competitive_advantage text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Campaign Returns Table
CREATE TABLE IF NOT EXISTS campaign_returns (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  return_model text CHECK (return_model IN ('profit-sharing', 'equity', 'revenue-sharing')),
  return_percentage decimal CHECK (return_percentage > 0 AND return_percentage <= 100),
  minimum_investment decimal CHECK (minimum_investment > 0),
  terms text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Return Projections Table
CREATE TABLE IF NOT EXISTS return_projections (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_return_id uuid REFERENCES campaign_returns(id) ON DELETE CASCADE,
  year integer CHECK (year > 0),
  amount decimal CHECK (amount >= 0),
  created_at timestamptz DEFAULT now()
);

-- Campaign Media Table
CREATE TABLE IF NOT EXISTS campaign_media (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  type text CHECK (type IN ('image', 'video', 'document')),
  url text NOT NULL,
  title text,
  description text,
  file_type text,
  file_size text,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Campaign Visibility Table
CREATE TABLE IF NOT EXISTS campaign_visibility (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  type text CHECK (type IN ('public', 'private')) DEFAULT 'public',
  featured boolean DEFAULT false,
  allow_messages boolean DEFAULT true,
  show_team boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (campaign_id)
);

-- Invited Investors Table (for private campaigns)
CREATE TABLE IF NOT EXISTS invited_investors (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  email text NOT NULL,
  status text CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'pending',
  invited_at timestamptz DEFAULT now(),
  responded_at timestamptz,
  UNIQUE (campaign_id, email)
);

-- Enable RLS
ALTER TABLE campaign_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE return_projections ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_visibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE invited_investors ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Campaign Details
CREATE POLICY "Creators can manage campaign details"
  ON campaign_details FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = campaign_details.campaign_id 
      AND campaigns.creator_id = auth.uid()
    )
  );

CREATE POLICY "Public can view active campaign details"
  ON campaign_details FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = campaign_details.campaign_id 
      AND campaigns.status = 'active'
    )
  );

-- Campaign Returns
CREATE POLICY "Creators can manage campaign returns"
  ON campaign_returns FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = campaign_returns.campaign_id 
      AND campaigns.creator_id = auth.uid()
    )
  );

CREATE POLICY "Public can view active campaign returns"
  ON campaign_returns FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = campaign_returns.campaign_id 
      AND campaigns.status = 'active'
    )
  );

-- Return Projections
CREATE POLICY "Creators can manage return projections"
  ON return_projections FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaign_returns 
      WHERE campaign_returns.id = return_projections.campaign_return_id
      AND EXISTS (
        SELECT 1 FROM campaigns 
        WHERE campaigns.id = campaign_returns.campaign_id 
        AND campaigns.creator_id = auth.uid()
      )
    )
  );

CREATE POLICY "Public can view active campaign projections"
  ON return_projections FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM campaign_returns 
      WHERE campaign_returns.id = return_projections.campaign_return_id
      AND EXISTS (
        SELECT 1 FROM campaigns 
        WHERE campaigns.id = campaign_returns.campaign_id 
        AND campaigns.status = 'active'
      )
    )
  );

-- Campaign Media
CREATE POLICY "Creators can manage campaign media"
  ON campaign_media FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = campaign_media.campaign_id 
      AND campaigns.creator_id = auth.uid()
    )
  );

CREATE POLICY "Public can view active campaign media"
  ON campaign_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = campaign_media.campaign_id 
      AND campaigns.status = 'active'
    )
  );

-- Campaign Visibility
CREATE POLICY "Creators can manage campaign visibility"
  ON campaign_visibility FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = campaign_visibility.campaign_id 
      AND campaigns.creator_id = auth.uid()
    )
  );

CREATE POLICY "Public can view campaign visibility settings"
  ON campaign_visibility FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = campaign_visibility.campaign_id 
      AND campaigns.status = 'active'
    )
  );

-- Invited Investors
CREATE POLICY "Creators can manage invited investors"
  ON invited_investors FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns 
      WHERE campaigns.id = invited_investors.campaign_id 
      AND campaigns.creator_id = auth.uid()
    )
  );

CREATE POLICY "Investors can view their invitations"
  ON invited_investors FOR SELECT
  TO authenticated
  USING (email = auth.email());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_campaign_details_campaign_id ON campaign_details(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_returns_campaign_id ON campaign_returns(campaign_id);
CREATE INDEX IF NOT EXISTS idx_return_projections_campaign_return_id ON return_projections(campaign_return_id);
CREATE INDEX IF NOT EXISTS idx_campaign_media_campaign_id ON campaign_media(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_visibility_campaign_id ON campaign_visibility(campaign_id);
CREATE INDEX IF NOT EXISTS idx_invited_investors_campaign_id ON invited_investors(campaign_id);
CREATE INDEX IF NOT EXISTS idx_invited_investors_email ON invited_investors(email);

-- Create updated_at triggers
CREATE TRIGGER update_campaign_details_updated_at
  BEFORE UPDATE ON campaign_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_campaign_returns_updated_at
  BEFORE UPDATE ON campaign_returns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_campaign_media_updated_at
  BEFORE UPDATE ON campaign_media
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_campaign_visibility_updated_at
  BEFORE UPDATE ON campaign_visibility
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();