// src/pages/PanelDeOrganizador.tsx
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  CircularProgress,
  IconButton,
  Divider
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useAuth } from '../context/AuthContext'
import { DashboardStats, Event } from '../types'
import * as apiService from '../services/apiService'
// --- Importamos iconos de Material-UI ---
import EventIcon from '@mui/icons-material/Event'
import GroupIcon from '@mui/icons-material/Group'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// --- Sub-componente: Tarjeta de Estadística ---
const StatCard: FunctionComponent<{
  icon: any
  value: string | number
  label: string
}> = ({ icon: Icon, value, label }) => (
  <Grid item xs={6} sm={6} md={3}>
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderRadius: '25px',
        minHeight: '125px'
      }}
    >
      {/* --- Icono de MUI --- */}
      <Icon sx={{ fontSize: 48, color: 'var(--color-cadetblue)' }} />
      <Box>
        <Typography
          variant='h2'
          sx={{
            fontSize: '48px',
            fontWeight: 600,
            lineHeight: '120%',
            color: 'var(--color-cadetblue)'
          }}
        >
          {value}
        </Typography>
        <Typography
          variant='h3'
          sx={{ fontSize: '20px', color: 'var(--Gray-500)' }}
        >
          {label}
        </Typography>
      </Box>
    </Paper>
  </Grid>
)

// --- Sub-componente: Fila de Evento ---
const EventRow: FunctionComponent<{
  event: Event
  onDelete: (id: string) => void
}> = ({ event, onDelete }) => (
  <>
    <Grid
      container
      spacing={2}
      alignItems='center'
      sx={{ p: '12px', display: { xs: 'none', md: 'flex' } }}
    >
      <Grid item md={3}>
        <Typography sx={{ fontWeight: 500 }}>{event.title}</Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          {event.tags.slice(0, 3).map((tag) => (
            <Box
              key={tag}
              sx={{
                fontSize: '14px',
                color: 'var(--color-cadetblue)',
                border: '1px solid var(--color-cadetblue)',
                borderRadius: '15px',
                px: 1.5,
                py: 0.5,
                textTransform: 'capitalize'
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item md={2}>
        <Typography>
          {new Date(event.start_date).toLocaleDateString('es-ES')}
        </Typography>
      </Grid>
      <Grid item md={2}>
        <Typography>{event.venue_city}</Typography>
      </Grid>
      <Grid item md={2}>
        <Typography>
          {event.current_attendees}/{event.max_attendees}
        </Typography>
      </Grid>
      <Grid item md={1}>
        <Box
          sx={{
            fontSize: '16px',
            color: 'white',
            bgcolor: 'var(--color-cadetblue)',
            borderRadius: '15px',
            px: 1.5,
            py: 0.5,
            textAlign: 'center',
            textTransform: 'capitalize'
          }}
        >
          {event.status}
        </Box>
      </Grid>
      <Grid item md={2}>
        {/* --- Icono de MUI --- */}
        <IconButton sx={{ color: 'var(--Gray-500)' }}>
          <EditIcon />
        </IconButton>
        <IconButton sx={{ color: 'red' }} onClick={() => onDelete(event.id)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>

    {/* Vista alternativa para Móvil (sin cambios) */}
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        display: { xs: 'block', md: 'none' },
        borderRadius: '15px'
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>
        {event.title}
      </Typography>
      <Typography sx={{ fontSize: '14px' }}>
        {new Date(event.start_date).toLocaleDateString('es-ES')} -{' '}
        {event.venue_city}
      </Typography>
      <Typography sx={{ fontSize: '14px' }}>
        Asistentes: {event.current_attendees}/{event.max_attendees}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
        {event.tags.slice(0, 3).map((tag) => (
          <Box
            key={tag}
            sx={{
              fontSize: '12px',
              color: 'var(--color-cadetblue)',
              border: '1px solid var(--color-cadetblue)',
              borderRadius: '15px',
              px: 1,
              py: 0.2,
              textTransform: 'capitalize'
            }}
          >
            {tag}
          </Box>
        ))}
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            fontSize: '14px',
            color: 'white',
            bgcolor: 'var(--color-cadetblue)',
            borderRadius: '15px',
            px: 1.5,
            py: 0.5,
            textAlign: 'center',
            textTransform: 'capitalize'
          }}
        >
          {event.status}
        </Box>
        <Box>
          <IconButton sx={{ color: 'var(--Gray-500)' }}>
            <EditIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton sx={{ color: 'red' }} onClick={() => onDelete(event.id)}>
            <DeleteIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>
    </Paper>
    <Divider sx={{ display: { xs: 'none', md: 'block' } }} />
  </>
)

const PanelDeOrganizador: FunctionComponent = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadData = useCallback(async () => {
    if (user?.organization) {
      try {
        setIsLoading(true)
        const [statsData, eventsData] = await Promise.all([
          apiService.getOrganizerDashboard(user.organization.id),
          apiService.getOrganizationEvents(user.organization.id)
        ])
        setStats(statsData)
        setEvents(eventsData)
      } catch (error) {
        console.error('Error al cargar datos del organizador:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [user])

  useEffect(() => {
    loadData()
  }, [loadData])

  const onBotnClick = useCallback(() => {
    navigate('/frame-1')
  }, [navigate])

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('¿Estás seguro de que quieres borrar este evento?')) {
      try {
        await apiService.deleteEvent(eventId)
        setEvents((prevEvents) => prevEvents.filter((e) => e.id !== eventId))
      } catch (error) {
        alert('Error al borrar el evento.')
      }
    }
  }

  return (
    <Layout>
      <Container
        maxWidth='lg'
        sx={{ padding: { xs: '24px 16px', md: '50px 16px' } }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3, md: 5 }
          }}
        >
          {/* --- Título y Subtítulo (sin cambios) --- */}
          <Box>
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '38px', md: '48px' },
                fontWeight: 700,
                lineHeight: '120%'
              }}
            >
              Panel de Organizador
            </Typography>
            <Typography
              variant='h3'
              sx={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--Gray-500)'
              }}
            >
              Gestiona tus eventos de ciberseguridad
            </Typography>
          </Box>

          {/* --- Tarjetas de Estadísticas --- */}
          <Grid container spacing={4}>
            {isLoading || !stats ? (
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <CircularProgress />
              </Grid>
            ) : (
              <>
                <StatCard
                  icon={EventIcon}
                  value={stats.total_events}
                  label='Eventos totales'
                />
                <StatCard
                  icon={GroupIcon}
                  value={stats.total_attendees}
                  label='Total asistentes'
                />
                <StatCard
                  icon={LocationCityIcon}
                  value={stats.total_cities}
                  label='Ciudades'
                />
                <StatCard
                  icon={CheckCircleIcon}
                  value={stats.published_events}
                  label='Publicados'
                />
              </>
            )}
          </Grid>

          {/* --- Lista de "Mis Eventos" (sin cambios) --- */}
          <Paper
            elevation={3}
            sx={{ p: { xs: 2, md: 4 }, borderRadius: '25px', width: '100%' }}
          >
            {/* ... (Cabecera de la lista, botón "Nuevo Evento", etc. se quedan igual) ... */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}
            >
              <Typography
                variant='h2'
                sx={{ fontSize: { xs: '24px', md: '32px' }, fontWeight: 600 }}
              >
                Mis eventos
              </Typography>
              <Button
                onClick={onBotnClick}
                variant='contained'
                sx={{
                  textTransform: 'none',
                  color: '#fff',
                  fontSize: '20px',
                  background:
                    'linear-gradient(242.97deg, rgba(45, 206, 227, 0.05), rgba(36, 165, 182, 0.9))',
                  '&:hover': {
                    background:
                      'linear-gradient(242.97deg, rgba(45, 206, 227, 0.05), rgba(36, 165, 182, 0.9))'
                  },
                  height: 45
                }}
              >
                Nuevo Evento
              </Button>
            </Box>

            {/* Cabecera de la tabla (solo en escritorio) */}
            <Grid
              container
              spacing={2}
              sx={{
                p: '12px',
                color: 'var(--Gray-500)',
                fontWeight: 600,
                display: { xs: 'none', md: 'flex' }
              }}
            >
              <Grid item md={3}>
                Evento
              </Grid>
              <Grid item md={2}>
                Fecha
              </Grid>
              <Grid item md={2}>
                Ubicacion
              </Grid>
              <Grid item md={2}>
                Asistentes
              </Grid>
              <Grid item md={1}>
                Estado
              </Grid>
              <Grid item md={2}>
                Acciones
              </Grid>
            </Grid>
            <Divider sx={{ display: { xs: 'none', md: 'block' } }} />

            {/* Cuerpo de la lista */}
            {isLoading ? (
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : events.length > 0 ? (
              events.map((event) => (
                <EventRow
                  key={event.id}
                  event={event}
                  onDelete={handleDeleteEvent}
                />
              ))
            ) : (
              <Typography
                sx={{ textAlign: 'center', p: 4, color: 'var(--Gray-500)' }}
              >
                No has creado ningún evento. ¡Pulsa "Nuevo Evento" para empezar!
              </Typography>
            )}
          </Paper>
        </Box>
      </Container>
    </Layout>
  )
}

export default PanelDeOrganizador
