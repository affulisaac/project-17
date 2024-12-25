/*
  # Investor Flow Schema

  1. New Tables
    - `investments`: Tracks individual investments
    - `investment_returns`: Manages profit distributions
    - `milestone_approvals`: Handles milestone voting/approval
    - `investor_communications`: Manages investor messages and updates
    
  2. Security
    - RLS policies for investor access
    - Policies for campaign creators
*/

-- Investment Transactions Table
CREATE TABLE IF NOT EXISTS investment_transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_id uuid REFERENCES users(id),
  campaign_id uuid REFERENCES campaigns(id),
  amount decimal CHECK (amount > 0),
  status text CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method text CHECK (payment_method IN ('card', 'bank', 'wallet')),
  payment_details jsonb,
  transaction_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Investment Returns Table
CREATE TABLE IF NOT EXISTS investment_returns (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  investment_id uuid REFERENCES investment_transactions(id),
  amount decimal CHECK (amount > 0),
  type text CHECK (type IN ('profit', 'revenue', 'equity')),
  status text CHECK (status IN ('pending', 'paid', 'failed')),
  distribution_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Milestone Approvals Table
CREATE TABLE IF NOT EXISTS milestone_approvals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  milestone_id uuid REFERENCES milestones(id),
  investor_id uuid REFERENCES users(id),
  status text CHECK (status IN ('approved', 'rejected', 'pending')),
  feedback text,
  voted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (milestone_id, investor_id)
);

-- Investor Communications Table
CREATE TABLE IF NOT EXISTS investor_communications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid REFERENCES campaigns(id),
  sender_id uuid REFERENCES users(id),
  recipient_id uuid REFERENCES users(id),
  type text CHECK (type IN ('message', 'update', 'question')),
  subject text,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE investment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestone_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_communications ENABLE ROW LEVEL SECURITY;

-- Investment Transactions Policies
CREATE POLICY "Investors can view their own transactions"
  ON investment_transactions FOR SELECT
  TO authenticated
  USING (investor_id = auth.uid());

CREATE POLICY "Investors can create transactions"
  ON investment_transactions FOR INSERT
  TO authenticated
  WITH CHECK (investor_id = auth.uid());

CREATE POLICY "Campaign creators can view their campaign transactions"
  ON investment_transactions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = investment_transactions.campaign_id
      AND campaigns.creator_id = auth.uid()
    )
  );

-- Investment Returns Policies
CREATE POLICY "Investors can view their returns"
  ON investment_returns FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM investment_transactions
      WHERE investment_transactions.id = investment_returns.investment_id
      AND investment_transactions.investor_id = auth.uid()
    )
  );

CREATE POLICY "Campaign creators can manage returns"
  ON investment_returns FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM investment_transactions
      JOIN campaigns ON campaigns.id = investment_transactions.campaign_id
      WHERE investment_transactions.id = investment_returns.investment_id
      AND campaigns.creator_id = auth.uid()
    )
  );

-- Milestone Approvals Policies
CREATE POLICY "Investors can manage their approvals"
  ON milestone_approvals FOR ALL
  TO authenticated
  USING (investor_id = auth.uid());

CREATE POLICY "Campaign creators can view approvals"
  ON milestone_approvals FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM milestones
      JOIN campaigns ON campaigns.id = milestones.campaign_id
      WHERE milestones.id = milestone_approvals.milestone_id
      AND campaigns.creator_id = auth.uid()
    )
  );

-- Investor Communications Policies
CREATE POLICY "Users can view their communications"
  ON investor_communications FOR SELECT
  TO authenticated
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Users can send communications"
  ON investor_communications FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_investment_transactions_investor_id 
  ON investment_transactions(investor_id);
CREATE INDEX IF NOT EXISTS idx_investment_transactions_campaign_id 
  ON investment_transactions(campaign_id);
CREATE INDEX IF NOT EXISTS idx_investment_returns_investment_id 
  ON investment_returns(investment_id);
CREATE INDEX IF NOT EXISTS idx_milestone_approvals_milestone_id 
  ON milestone_approvals(milestone_id);
CREATE INDEX IF NOT EXISTS idx_milestone_approvals_investor_id 
  ON milestone_approvals(investor_id);
CREATE INDEX IF NOT EXISTS idx_investor_communications_campaign_id 
  ON investor_communications(campaign_id);
CREATE INDEX IF NOT EXISTS idx_investor_communications_sender_id 
  ON investor_communications(sender_id);
CREATE INDEX IF NOT EXISTS idx_investor_communications_recipient_id 
  ON investor_communications(recipient_id);

-- Create updated_at triggers
CREATE TRIGGER update_investment_transactions_updated_at
  BEFORE UPDATE ON investment_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_investment_returns_updated_at
  BEFORE UPDATE ON investment_returns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_milestone_approvals_updated_at
  BEFORE UPDATE ON milestone_approvals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_investor_communications_updated_at
  BEFORE UPDATE ON investor_communications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();