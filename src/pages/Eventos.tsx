// src/pages/Eventos.tsx
import { FunctionComponent, useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Container,
  CircularProgress,
  Divider,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Event } from '../types'
import * as apiService from '../services/apiService'
import { SingleEventMap } from '../components/SingleEventMap'
// --- Importamos iconos de Material-UI ---
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import GroupIcon from '@mui/icons-material/Group'
import NotificationsIcon from '@mui/icons-material/Notifications'

const Eventos: FunctionComponent = () => {
  const { slug } = useParams<{ slug: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [reminder, setReminder] = useState('7')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeMessage, setSubscribeMessage] = useState('')

  useEffect(() => {
    if (slug) {
      const loadEvent = async () => {
        setIsLoading(true)
        setError('')
        try {
          const fetchedEvent = await apiService.getEventBySlug(slug)
          setEvent(fetchedEvent)
        } catch (err: any) {
          setError(err.message || 'No se pudo cargar el evento.')
        } finally {
          setIsLoading(false)
        }
      }
      loadEvent()
    }
  }, [slug])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !event) return

    setIsSubscribing(true)
    setSubscribeMessage('')
    try {
      const response = await apiService.subscribeToEvent(event.id, email)
      setSubscribeMessage(response.message)
    } catch (err: any) {
      setSubscribeMessage(err.message || 'Error al suscribirse.')
    } finally {
      setIsSubscribing(false)
    }
  }

  if (isLoading) {
    /* ... (código de carga se queda igual) ... */
  }
  if (error || !event) {
    /* ... (código de error se queda igual) ... */
  }

  return (
    <Layout>
      <Container maxWidth='lg' sx={{ padding: '50px 16px' }}>
        <Grid container spacing={5}>
          {/* --- Columna Izquierda: Detalles del Evento --- */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                boxShadow: 'var(--shadow-drop)',
                borderRadius: '25px',
                bgcolor: 'var(--White)',
                padding: { xs: '24px', md: '40px 32px' },
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}
            >
              {/* Encabezado */}
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <img
                  src={
                    event.organization.logo_url || '/CloudEvents-logo-2@2x.png'
                  }
                  alt={event.organization.name}
                  style={{ width: 99, height: 99, objectFit: 'contain' }}
                />
                <Box>
                  <Typography
                    variant='h1'
                    sx={{
                      fontSize: '32px',
                      fontWeight: 700,
                      fontStyle: 'italic',
                      lineHeight: '120%',
                      color: 'var(--Gray-500)'
                    }}
                  >
                    {event.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    border: '1.5px solid var(--Gray-500)',
                    borderRadius: '10px',
                    padding: '4px 10px',
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    gap: 1, // Reducido
                    ml: 'auto',
                    height: 'fit-content'
                  }}
                >
                  {/* --- Icono de MUI --- */}
                  <GroupIcon sx={{ fontSize: 24 }} />
                  <Typography
                    variant='h3'
                    sx={{ fontSize: '20px', fontWeight: 600 }}
                  >
                    {`${event.current_attendees}/${event.max_attendees || '∞'}`}
                  </Typography>
                </Box>
              </Box>

              {/* Info Fecha y Lugar */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                  {/* --- Icono de MUI --- */}
                  <CalendarTodayIcon sx={{ fontSize: 24 }} />
                  <Typography variant='body1' sx={{ fontSize: 20 }}>
                    {new Date(event.start_date).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                  {/* --- Icono de MUI --- */}
                  <LocationOnIcon sx={{ fontSize: 24 }} />
                  <Typography variant='body1' sx={{ fontSize: 20 }}>
                    {event.is_online
                      ? 'Evento Online'
                      : `${event.venue_name}, ${event.venue_city}`}
                  </Typography>
                </Box>
              </Box>

              {/* Tags (sin cambios) */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {event.tags.map((tag) => (
                  <Button
                    key={tag}
                    variant='outlined'
                    sx={{
                      borderRadius: '15px',
                      borderColor: 'var(--color-cadetblue)',
                      color: 'var(--color-cadetblue)',
                      textTransform: 'capitalize',
                      fontSize: '20px'
                    }}
                  >
                    {tag}
                  </Button>
                ))}
              </Box>

              <Divider />

              {/* Descripción (sin cambios) */}
              <Box>
                <Typography
                  variant='h3'
                  sx={{
                    fontSize: 24,
                    fontWeight: 400,
                    color: 'var(--Gray-500)',
                    mb: 2
                  }}
                >
                  Descripción
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ fontSize: 20, lineHeight: '125%' }}
                >
                  {event.description}
                </Typography>
              </Box>

              <Divider />

              {/* Organizador */}
              <Box>
                <Typography
                  variant='h3'
                  sx={{
                    fontSize: 24,
                    fontWeight: 400,
                    color: 'var(--Gray-500)',
                    mb: 2
                  }}
                >
                  Organizador
                </Typography>
                <Box
                  sx={{
                    boxShadow: 'var(--shadow-drop)',
                    borderRadius: '25px',
                    bgcolor: 'var(--White)',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <img
                    src={
                      event.organization.logo_url ||
                      '/CloudEvents-logo-2@2x.png'
                    }
                    alt={event.organization.name}
                    style={{ width: 47, height: 47, objectFit: 'contain' }}
                  />
                  <Box>
                    <Typography
                      variant='h3'
                      sx={{ fontSize: 24, fontWeight: 400 }}
                    >
                      {event.organization.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      {/* --- Icono de MUI --- */}
                      <MailOutlineIcon sx={{ fontSize: 28 }} />
                      <Typography variant='body2' sx={{ fontSize: 16 }}>
                        contacto@{event.organization.slug}.com
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Divider />

              {/* Mapa de Ubicación (sin cambios) */}
              <Box>
                <Typography
                  variant='h3'
                  sx={{
                    fontSize: 28,
                    fontWeight: 500,
                    color: 'var(--Gray-500)',
                    mb: 2,
                    textAlign: 'center'
                  }}
                >
                  Ubicación
                </Typography>
                <SingleEventMap event={event} />
              </Box>
            </Box>
          </Grid>

          {/* --- Columna Derecha: Suscripción --- */}
          <Grid item xs={12} md={5}>
            <Box
              component='form'
              onSubmit={handleSubscribe}
              sx={{
                boxShadow: 'var(--shadow-drop)',
                borderRadius: '25px',
                bgcolor: 'var(--White)',
                padding: { xs: '24px', md: '39px 24px' },
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                position: 'sticky',
                top: 100
              }}
            >
              <Typography
                variant='h2'
                sx={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: 'var(--color-cadetblue)'
                }}
              >
                Suscríbete a este evento
              </Typography>
              <Typography
                variant='body1'
                sx={{ fontSize: 16, lineHeight: '140%' }}
              >
                Recibe recordatorios y actualizaciones importantes sobre este
                evento.
              </Typography>

              <TextField
                fullWidth
                variant='outlined'
                placeholder='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {/* --- Icono de MUI --- */}
                      <MailOutlineIcon sx={{ fontSize: 28 }} />
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& fieldset': { borderRadius: '15px' },
                  '& .MuiInputBase-root': {
                    height: '66px',
                    bgcolor: '#fff',
                    borderRadius: '15px'
                  }
                }}
              />
              <Typography variant='body2' sx={{ fontSize: 16, mt: -2, pl: 1 }}>
                Usaremos tu email solo para notificaciones de este evento.
              </Typography>

              <Divider />

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {/* --- Icono de MUI --- */}
                <NotificationsIcon sx={{ fontSize: 24 }} />
                <Typography variant='h3' sx={{ fontSize: 20, fontWeight: 400 }}>
                  Recordatorios
                </Typography>
              </Box>
              <Select
                fullWidth
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                sx={{
                  '& fieldset': { borderRadius: '15px' },
                  '& .MuiInputBase-root': {
                    borderRadius: '15px'
                  }
                }}
              >
                <MenuItem value={'7'}>7 días antes</MenuItem>
                <MenuItem value={'3'}>3 días antes</MenuItem>
                <MenuItem value={'1'}>1 día antes</MenuItem>
              </Select>

              {/* ... (Resto del formulario: Checkboxes, Botón, etc. sin cambios) ... */}
              <Box>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label='Confirmación por email'
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label='Actualizaciones del evento'
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label='Recordatorios automáticos'
                />
              </Box>

              <Button
                type='submit'
                fullWidth
                disableElevation
                disabled={isSubscribing}
                variant='contained'
                sx={{
                  textTransform: 'none',
                  color: '#fff',
                  fontSize: '24px',
                  background:
                    'linear-gradient(242.97deg, rgba(45, 206, 227, 0.05), rgba(36, 165, 182, 0.9))',
                  '&:hover': {
                    background:
                      'linear-gradient(242.97deg, rgba(45, 206, 227, 0.05), rgba(36, 165, 182, 0.9))'
                  },
                  height: 58
                }}
              >
                {isSubscribing ? (
                  <CircularProgress size={28} color='inherit' />
                ) : (
                  'Suscribirme al evento'
                )}
              </Button>

              {subscribeMessage && (
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: subscribeMessage.startsWith('Error')
                      ? 'error.main'
                      : 'success.main'
                  }}
                >
                  {subscribeMessage}
                </Typography>
              )}

              <Typography
                variant='body2'
                sx={{ fontSize: 16, textAlign: 'center' }}
              >
                Podrás cancelar tu suscripción en cualquier momento.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Eventos
