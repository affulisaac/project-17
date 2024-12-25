export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      campaigns: {
        Row: {
          id: string
          creator_id: string
          title: string
          description: string
          category: string
          stage: string
          status: 'draft' | 'active' | 'funded' | 'completed'
          goal: number
          raised: number
          image_url: string | null
          video_url: string | null
          start_date: string | null
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          title: string
          description: string
          category: string
          stage: string
          status?: 'draft' | 'active' | 'funded' | 'completed'
          goal: number
          raised?: number
          image_url?: string | null
          video_url?: string | null
          start_date?: string | null
          end_date?: string | null
        }
        Update: {
          id?: string
          creator_id?: string
          title?: string
          description?: string
          category?: string
          stage?: string
          status?: 'draft' | 'active' | 'funded' | 'completed'
          goal?: number
          raised?: number
          image_url?: string | null
          video_url?: string | null
          start_date?: string | null
          end_date?: string | null
        }
      }
      campaign_details: {
        Row: {
          id: string
          campaign_id: string
          business_type: 'idea' | 'started' | 'unstarted'
          market_research: string | null
          business_plan: string | null
          current_operations: string | null
          problem_statement: string | null
          solution: string | null
          created_at: string
          updated_at: string
        }
      }
      campaign_returns: {
        Row: {
          id: string
          campaign_id: string
          return_model: 'profit-sharing' | 'equity' | 'revenue-sharing'
          return_percentage: number
          minimum_investment: number
          terms: string
          created_at: string
          updated_at: string
        }
      }
      campaign_visibility: {
        Row: {
          id: string
          campaign_id: string
          type: 'public' | 'private'
          featured: boolean
          allow_messages: boolean
          show_team: boolean
          created_at: string
          updated_at: string
        }
      }
    }
  }
}

export type Campaign = Database['public']['Tables']['campaigns']['Row']
export type CampaignCreate = Database['public']['Tables']['campaigns']['Insert']
export type CampaignUpdate = Database['public']['Tables']['campaigns']['Update']