// src/services/apiService.ts
import { mockUsers, mockEvents } from '../mocks/db'
import {
  AuthResponse,
  User,
  Event,
  DashboardStats,
  CreateEventDTO,
  EventFilterParams,
  RegisterDTO,
  Role,
  OrganizationSummary
} from '../types'

const SIMULATED_DELAY = 1000

// --- Login (se queda igual) ---
export const login = (
  email: string,
  password: string
): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      )
      if (user) {
        const authResponse: AuthResponse = {
          user: user,
          access_token: 'fake-access-token-' + Math.random(),
          refresh_token: 'fake-refresh-token-' + Math.random(),
          token_type: 'Bearer',
          expires_in: 3600
        }
        resolve(authResponse)
      } else {
        reject(new Error('Email o contraseña incorrectos'))
      }
    }, SIMULATED_DELAY)
  })
}

// --- MODIFICADO: Registro completo ---
export const register = (data: RegisterDTO): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockUsers.find((u) => u.email === data.email)) {
        reject(new Error('El email ya está registrado'))
        return
      }

      let newUserOrg: OrganizationSummary | undefined = undefined
      // Si se registra como organizador, creamos una nueva organización simulada
      if (data.role === Role.Organizer && data.organization_name) {
        newUserOrg = {
          id: `org-00${mockUsers.length + 1}`,
          slug: data.organization_name.toLowerCase().replace(/\s+/g, '-'),
          name: data.organization_name,
          logo_url: '',
          is_verified: false, // Los nuevos organizadores no están verificados
          city: 'Desconocida',
          country: 'Spain'
        }
      }

      const newUser: User = {
        id: `a1b2c3d4-${Math.floor(Math.random() * 9000) + 1000}`,
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        full_name: `${data.first_name} ${data.last_name}`,
        role: data.role,
        is_active: true,
        is_verified: false, // Los nuevos usuarios no están verificados
        created_at: new Date().toISOString(),
        organization: newUserOrg // Asignamos la nueva organización
      }

      mockUsers.push(newUser) // Añadimos el nuevo usuario a nuestra BD simulada

      const authResponse: AuthResponse = {
        user: newUser,
        access_token: 'fake-access-token-' + Math.random(),
        refresh_token: 'fake-refresh-token-' + Math.random(),
        token_type: 'Bearer',
        expires_in: 3600
      }
      resolve(authResponse)
    }, SIMULATED_DELAY)
  })
}

// --- Funciones de Eventos (se quedan igual) ---
export const getEvents = (filters: EventFilterParams): Promise<Event[]> => {
  // ... (código se queda igual) ...
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredEvents = [
        ...mockEvents.filter((e) => e.status === 'published')
      ]
      if (filters.startDate) {
        filteredEvents = filteredEvents.filter(
          (e) => new Date(e.start_date) >= filters.startDate!
        )
      }
      if (filters.endDate) {
        filteredEvents = filteredEvents.filter(
          (e) => new Date(e.start_date) <= filters.endDate!
        )
      }
      if (filters.tags.length > 0) {
        filteredEvents = filteredEvents.filter((e) =>
          e.tags.some((tag) => filters.tags.includes(tag))
        )
      }
      if (filters.locations.length > 0) {
        filteredEvents = filteredEvents.filter(
          (e) =>
            (e.venue_city && filters.locations.includes(e.venue_city)) ||
            (e.venue_country && filters.locations.includes(e.venue_country))
        )
      }
      if (filters.levels.length > 0) {
        filteredEvents = filteredEvents.filter(
          (e) => e.level && filters.levels.includes(e.level)
        )
      }
      resolve(filteredEvents)
    }, SIMULATED_DELAY / 2)
  })
}
export const getEventBySlug = (slug: string): Promise<Event> => {
  // ... (código se queda igual) ...
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = mockEvents.find((e) => e.slug === slug)
      if (event) {
        resolve(event)
      } else {
        reject(new Error('Evento no encontrado'))
      }
    }, SIMULATED_DELAY / 3)
  })
}
export const subscribeToEvent = (
  eventId: string,
  email: string
): Promise<{ message: string }> => {
  // ... (código se queda igual) ...
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Email ${email} suscrito al evento ${eventId}`)
      resolve({ message: '¡Suscripción confirmada!' })
    }, SIMULATED_DELAY)
  })
}

// --- Funciones de User (se quedan igual) ---
export const getMe = (userId: string): Promise<User> => {
  // ... (código se queda igual) ...
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.id === userId)
      if (user) {
        resolve(user)
      } else {
        reject(new Error('Usuario no encontrado'))
      }
    }, SIMULATED_DELAY / 2)
  })
}
export const unsubscribeFromEvent = (
  userId: string,
  eventId: string
): Promise<void> => {
  // ... (código se queda igual) ...
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUsers = mockUsers.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            FavoriteEvents: user.FavoriteEvents?.filter(
              (event) => event.id !== eventId
            )
          }
        }
        return user
      })
      console.log(
        `Usuario ${userId} ha cancelado suscripción al evento ${eventId}`
      )
      resolve()
    }, SIMULATED_DELAY / 2)
  })
}

// --- Funciones de Organizador (se quedan igual) ---
export const getOrganizerDashboard = (
  orgId: string
): Promise<DashboardStats> => {
  // ... (código se queda igual) ...
  return new Promise((resolve) => {
    setTimeout(() => {
      const orgEvents = mockEvents.filter((e) => e.organization.id === orgId)
      const totalAttendees = orgEvents.reduce(
        (sum, e) => sum + e.current_attendees,
        0
      )
      const cities = new Set(orgEvents.map((e) => e.venue_city))
      resolve({
        total_events: orgEvents.length,
        total_attendees: totalAttendees,
        total_cities: cities.size,
        published_events: orgEvents.filter((e) => e.status === 'published')
          .length
      })
    }, SIMULATED_DELAY / 2)
  })
}
export const getOrganizationEvents = (orgId: string): Promise<Event[]> => {
  // ... (código se queda igual) ...
  return new Promise((resolve) => {
    setTimeout(() => {
      const orgEvents = mockEvents.filter((e) => e.organization.id === orgId)
      resolve(orgEvents)
    }, SIMULATED_DELAY / 2)
  })
}
export const createEvent = (
  eventData: CreateEventDTO,
  organization: OrganizationSummary
): Promise<Event> => {
  // ... (código se queda igual) ...
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEvent: Event = {
        id: `evt-00${mockEvents.length + 1}`,
        slug: eventData.title.toLowerCase().replace(/\s+/g, '-'),
        status: 'published',
        current_attendees: 0,
        is_upcoming: true,
        is_past: false,
        is_ongoing: false,
        organization: organization,
        category: eventData.tags[0] || 'General',
        type: eventData.tags[0] || 'General',
        ...eventData
      }
      mockEvents.push(newEvent)
      resolve(newEvent)
    }, SIMULATED_DELAY)
  })
}
export const deleteEvent = (eventId: string): Promise<void> => {
  // ... (código se queda igual) ...
  return new Promise((resolve) => {
    setTimeout(() => {
      mockEvents = mockEvents.filter((e) => e.id !== eventId)
      resolve()
    }, SIMULATED_DELAY / 2)
  })
}
