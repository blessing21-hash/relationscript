export type HealthCategory =
  | "anxiety"
  | "depression"
  | "adhd"
  | "bipolar"
  | "ptsd"
  | "ocd"
  | "chronic_pain"
  | "autoimmune"
  | "diabetes"
  | "other"

export type LookingFor = "dating" | "friendship" | "support"

export interface Profile {
  id: string
  username: string
  display_name: string
  bio?: string
  age?: number
  location?: string
  photos: string[]
  health_categories: HealthCategory[]
  medications: string[]
  looking_for: LookingFor[]
  show_health_publicly: boolean
  show_medications_publicly: boolean
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface Match {
  id: string
  user1_id: string
  user2_id: string
  matched_at: string
  user1_liked: boolean
  user2_liked: boolean
  is_active: boolean
}

export interface Message {
  id: string
  match_id: string
  sender_id: string
  content: string
  is_read: boolean
  created_at: string
}

export interface Community {
  id: string
  name: string
  description?: string
  health_category?: HealthCategory
  is_private: boolean
  created_by?: string
  created_at: string
}

export interface CommunityPost {
  id: string
  community_id: string
  author_id: string
  content: string
  is_anonymous: boolean
  created_at: string
}
