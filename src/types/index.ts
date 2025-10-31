// src/types/index.ts
// ... (Role, AuthResponse, OrganizationSummary, Event, User, DashboardStats, EventFilterParams se quedan igual) ...

export enum Role {
  Admin = 'admin',
  Organizer = 'organizer',
  User = 'user'
}
export interface AuthResponse {
  user: User
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}
export interface OrganizationSummary {
  id: string
  slug: string
  name: string
  logo_url: string
  is_verified: boolean
  city: string
  country: string
}
export interface DashboardStats {
  total_events: number
  total_attendees: number
  total_cities: number
  published_events: number
}
export interface EventFilterParams {
  startDate: Date | null
  endDate: Date | null
  tags: string[]
  locations: string[]
  levels: string[]
}

export interface Event {
  id: string
  slug: string
  title: string
  description: string
  short_desc: string
  type: string
  category: string
  level: string
  start_date: string
  end_date: string
  is_online: boolean
  venue_name?: string
  venue_address?: string
  venue_city?: string
  venue_country?: string
  latitude?: number
  longitude?: number
  online_url?: string
  max_attendees?: number
  current_attendees: number
  is_free: boolean
  price?: number
  image_url?: string
  banner_url?: string
  tags: string[]
  organization: OrganizationSummary
  is_upcoming: boolean
  is_past: boolean
  is_ongoing: boolean
  status?: string
}

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  full_name: string
  role: Role
  company?: string
  position?: string
  is_active: boolean
  is_verified: boolean
  organization?: OrganizationSummary
  created_at: string
  FavoriteEvents?: Event[]
  password?: string
}

export interface CreateEventDTO {
  title: string
  short_desc: string
  description: string
  start_date: string
  end_date: string
  is_online: boolean
  venue_name?: string
  venue_address?: string
  venue_city?: string
  venue_country?: string
  latitude?: number
  longitude?: number
  online_url?: string
  max_attendees: number
  is_free: boolean
  price: number
  tags: string[]
  level: string
}

// --- NUEVO PARA EL REGISTRO ---
// Basado en dto/auth_requests.go
export interface RegisterDTO {
  first_name: string
  last_name: string
  email: string
  password: string
  role: Role
  organization_name?: string // Solo si el rol es 'organizer'
}
