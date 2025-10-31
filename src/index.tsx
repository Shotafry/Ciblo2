// src/types/index.ts
// ... (AuthResponse, OrganizationSummary se quedan igual) ...

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

export interface Event {
  // ... (La definición de Event se queda igual que en el Paso 2) ...
  id: string
  slug: string
  title: string
  description: string
  short_desc: string
  type: string
  category: string
  level?: string
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

  // --- NUEVO PARA EL PASO 4 ---
  FavoriteEvents?: Event[] // El usuario puede tener eventos favoritos
  // Añadimos la contraseña simulada solo para el mock
  password?: string
}
