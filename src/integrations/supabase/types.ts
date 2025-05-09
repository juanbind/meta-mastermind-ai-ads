export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          company_id: string | null
          completed_at: string | null
          contact_id: string | null
          created_at: string | null
          deal_id: string | null
          description: string | null
          id: string
          scheduled_at: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          description?: string | null
          id?: string
          scheduled_at?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          description?: string | null
          id?: string
          scheduled_at?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_alerts: {
        Row: {
          created_at: string | null
          criteria: Json
          frequency: string | null
          id: string
          is_active: boolean | null
          last_triggered: string | null
          name: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          criteria: Json
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          last_triggered?: string | null
          name: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          criteria?: Json
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          last_triggered?: string | null
          name?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ad_collections: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          tags: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          tags?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ad_insights: {
        Row: {
          ad_id: string | null
          created_at: string | null
          data: Json
          id: string
          insight_type: string
          score: number | null
          updated_at: string | null
        }
        Insert: {
          ad_id?: string | null
          created_at?: string | null
          data: Json
          id?: string
          insight_type: string
          score?: number | null
          updated_at?: string | null
        }
        Update: {
          ad_id?: string | null
          created_at?: string | null
          data?: Json
          id?: string
          insight_type?: string
          score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_insights_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          ad_id: string | null
          advertiser_id: string | null
          advertiser_name: string
          body_text: string | null
          created_at: string | null
          creative_type: string | null
          cta_type: string | null
          description: string | null
          engagement: Json | null
          estimated_duration_days: number | null
          estimated_metrics: Json | null
          first_seen: string | null
          headline: string | null
          id: string
          image_url: string | null
          industry_category: string | null
          keywords: string[] | null
          landing_url: string | null
          language: string | null
          last_seen_date: string | null
          last_updated: string | null
          metadata: Json | null
          original_url: string | null
          page_id: string | null
          page_name: string | null
          platform: string
          start_date: string | null
          targeting: Json | null
          title: string | null
          user_id: string | null
          video_url: string | null
        }
        Insert: {
          ad_id?: string | null
          advertiser_id?: string | null
          advertiser_name: string
          body_text?: string | null
          created_at?: string | null
          creative_type?: string | null
          cta_type?: string | null
          description?: string | null
          engagement?: Json | null
          estimated_duration_days?: number | null
          estimated_metrics?: Json | null
          first_seen?: string | null
          headline?: string | null
          id?: string
          image_url?: string | null
          industry_category?: string | null
          keywords?: string[] | null
          landing_url?: string | null
          language?: string | null
          last_seen_date?: string | null
          last_updated?: string | null
          metadata?: Json | null
          original_url?: string | null
          page_id?: string | null
          page_name?: string | null
          platform: string
          start_date?: string | null
          targeting?: Json | null
          title?: string | null
          user_id?: string | null
          video_url?: string | null
        }
        Update: {
          ad_id?: string | null
          advertiser_id?: string | null
          advertiser_name?: string
          body_text?: string | null
          created_at?: string | null
          creative_type?: string | null
          cta_type?: string | null
          description?: string | null
          engagement?: Json | null
          estimated_duration_days?: number | null
          estimated_metrics?: Json | null
          first_seen?: string | null
          headline?: string | null
          id?: string
          image_url?: string | null
          industry_category?: string | null
          keywords?: string[] | null
          landing_url?: string | null
          language?: string | null
          last_seen_date?: string | null
          last_updated?: string | null
          metadata?: Json | null
          original_url?: string | null
          page_id?: string | null
          page_name?: string | null
          platform?: string
          start_date?: string | null
          targeting?: Json | null
          title?: string | null
          user_id?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      collection_ads: {
        Row: {
          ad_id: string | null
          added_at: string | null
          collection_id: string | null
          custom_tags: string[] | null
          id: string
          notes: string | null
        }
        Insert: {
          ad_id?: string | null
          added_at?: string | null
          collection_id?: string | null
          custom_tags?: string[] | null
          id?: string
          notes?: string | null
        }
        Update: {
          ad_id?: string | null
          added_at?: string | null
          collection_id?: string | null
          custom_tags?: string[] | null
          id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_ads_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_ads_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "ad_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: Json | null
          annual_revenue: number | null
          created_at: string | null
          custom_fields: Json | null
          employees_count: number | null
          id: string
          industry: string | null
          name: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: Json | null
          annual_revenue?: number | null
          created_at?: string | null
          custom_fields?: Json | null
          employees_count?: number | null
          id?: string
          industry?: string | null
          name: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: Json | null
          annual_revenue?: number | null
          created_at?: string | null
          custom_fields?: Json | null
          employees_count?: number | null
          id?: string
          industry?: string | null
          name?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      contact_companies: {
        Row: {
          company_id: string | null
          contact_id: string | null
          created_at: string | null
          id: string
          is_primary: boolean | null
          role: string | null
        }
        Insert: {
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          role?: string | null
        }
        Update: {
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_companies_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          custom_fields: Json | null
          email: string | null
          first_name: string
          id: string
          last_activity: string | null
          last_name: string
          phone: string | null
          source: string | null
          source_id: string | null
          stage: string | null
          status: string | null
          tags: string[] | null
          updated_at: string | null
          value: number | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          email?: string | null
          first_name: string
          id?: string
          last_activity?: string | null
          last_name: string
          phone?: string | null
          source?: string | null
          source_id?: string | null
          stage?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          value?: number | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          email?: string | null
          first_name?: string
          id?: string
          last_activity?: string | null
          last_name?: string
          phone?: string | null
          source?: string | null
          source_id?: string | null
          stage?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          value?: number | null
        }
        Relationships: []
      }
      creative_requests: {
        Row: {
          additional_info: string | null
          business_name: string
          business_services: string
          created_at: string
          id: string
          location: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          additional_info?: string | null
          business_name: string
          business_services: string
          created_at?: string
          id?: string
          location?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          additional_info?: string | null
          business_name?: string
          business_services?: string
          created_at?: string
          id?: string
          location?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      deals: {
        Row: {
          company_id: string | null
          contact_id: string | null
          created_at: string | null
          currency: string | null
          custom_fields: Json | null
          expected_close_date: string | null
          id: string
          name: string
          owner_id: string | null
          probability: number | null
          stage: string
          updated_at: string | null
          value: number | null
        }
        Insert: {
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          currency?: string | null
          custom_fields?: Json | null
          expected_close_date?: string | null
          id?: string
          name: string
          owner_id?: string | null
          probability?: number | null
          stage: string
          updated_at?: string | null
          value?: number | null
        }
        Update: {
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          currency?: string | null
          custom_fields?: Json | null
          expected_close_date?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          probability?: number | null
          stage?: string
          updated_at?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      facebook_integrations: {
        Row: {
          access_token: string
          account_id: string
          created_at: string | null
          id: string
          metadata: Json | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token: string
          account_id: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string
          account_id?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          content: string | null
          created_at: string
          id: number
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      funnel_pages: {
        Row: {
          content: Json | null
          created_at: string | null
          funnel_id: string | null
          id: string
          name: string
          order_index: number
          type: string
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          funnel_id?: string | null
          id?: string
          name: string
          order_index: number
          type: string
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          funnel_id?: string | null
          id?: string
          name?: string
          order_index?: number
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_pages_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      funnels: {
        Row: {
          content: string
          created_at: string
          id: string
          is_published: boolean
          name: string
          published_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_published?: boolean
          name: string
          published_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_published?: boolean
          name?: string
          published_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      integrations: {
        Row: {
          created_at: string | null
          credentials: Json | null
          id: string
          last_sync: string | null
          metadata: Json | null
          name: string
          provider: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          credentials?: Json | null
          id?: string
          last_sync?: string | null
          metadata?: Json | null
          name: string
          provider: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          credentials?: Json | null
          id?: string
          last_sync?: string | null
          metadata?: Json | null
          name?: string
          provider?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          answers: Json | null
          contact_id: string | null
          created_at: string | null
          email: string
          funnel_id: string | null
          id: string
          phone: string | null
          score: number | null
        }
        Insert: {
          answers?: Json | null
          contact_id?: string | null
          created_at?: string | null
          email: string
          funnel_id?: string | null
          id?: string
          phone?: string | null
          score?: number | null
        }
        Update: {
          answers?: Json | null
          contact_id?: string | null
          created_at?: string | null
          email?: string
          funnel_id?: string | null
          id?: string
          phone?: string | null
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      logic_rules: {
        Row: {
          action: Json
          condition: Json
          created_at: string | null
          element_id: string
          funnel_id: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          action: Json
          condition: Json
          created_at?: string | null
          element_id: string
          funnel_id?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          action?: Json
          condition?: Json
          created_at?: string | null
          element_id?: string
          funnel_id?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logic_rules_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          company_id: string | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          deal_id: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      webhooks: {
        Row: {
          created_at: string | null
          endpoint: string
          event_type: string
          id: string
          integration_id: string | null
          secret: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          event_type: string
          id?: string
          integration_id?: string | null
          secret?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          event_type?: string
          id?: string
          integration_id?: string | null
          secret?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhooks_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      score_lead: {
        Args: { lead_id: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
