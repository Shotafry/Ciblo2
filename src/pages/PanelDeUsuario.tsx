// src/pages/PanelDeUsuario.tsx
import React, { FunctionComponent, useEffect, useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Paper,
  Button,
  IconButton,
  Divider
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useAuth } from '../context/AuthContext'
import { Event, User } from '../types'
import * as apiService from '../services/apiService'
// --- Importamos iconos de Material-UI ---
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import DeleteIcon from '@mui/icons-material/Delete'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant'

// --- Sub-componente para la Tarjeta de Suscripción ---
const SubscriptionCard: FunctionComponent<{
  event: Event
  onUnsubscribe: (eventId: string) => void
}> = ({ event, onUnsubscribe }) => {
  const navigate = useNavigate()
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: '15px',
        mb: 3,
        '&:hover': { boxShadow: 6 }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 1
        }}
      >
        {/* Logo y Título */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => navigate(`/eventos/${event.slug}`)}
        >
          <img
            src={event.organization.logo_url || '/CloudEvents-logo-11@2x.png'}
            alt={event.organization.name}
            style={{ width: 30, height: 30, objectFit: 'contain' }}
          />
          <Typography
            variant='h6'
            sx={{ fontWeight: 700, fontStyle: 'italic', fontSize: '20px' }}
          >
            {event.title}
          </Typography>
        </Box>
        <Button
          variant='contained'
          size='small'
          sx={{
            bgcolor: '#4fbac8',
            '&:hover': { bgcolor: '#43a0a8' },
            borderRadius: '15px',
            fontSize: '14px',
            textTransform: 'none',
            flexShrink: 0
          }}
        >
          Activa
        </Button>
      </Box>

      {/* Detalles */}
      <Box
        sx={{
          pl: '46px',
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* --- Icono de MUI --- */}
          <CalendarTodayIcon sx={{ fontSize: 20 }} />
          <Typography variant='body2'>
            {new Date(event.start_date).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* --- Icono de MUI --- */}
          <MailOutlineIcon sx={{ fontSize: 20 }} />
          <Typography variant='body2'>
            contacto@{event.organization.slug}.com
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* --- Icono de MUI --- */}
          <NotificationsActiveIcon sx={{ fontSize: 20 }} />
          <Typography variant='body2'>Recordatorio: 7 Días antes</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1
          }}
        >
          <Typography
            variant='caption'
            sx={{ color: 'var(--color-cadetblue)', fontWeight: 600 }}
          >
            Suscrito el dia 23 Nov 2024 {/* (Dato simulado) */}
          </Typography>
          <IconButton
            onClick={() => onUnsubscribe(event.id)}
            size='small'
            sx={{ color: 'red' }}
          >
            {/* --- Icono de MUI --- */}
            <DeleteIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  )
}

const PanelDeUsuario: FunctionComponent = () => {
  const { user, refreshUserData } = useAuth()
  const [userData, setUserData] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user?.id) {
      apiService
        .getMe(user.id)
        .then((fullUserData) => {
          setUserData(fullUserData)
          refreshUserData(fullUserData)
        })
        .catch((err) => setError(err.message || 'Error al cargar datos'))
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
      setError('Usuario no encontrado')
    }
  }, [user?.id]) // Dependencia eliminada para evitar bucle

  const notifications = useMemo(() => {
    const notifs: { icon: any; text: string; date: string }[] = []
    if (userData?.FavoriteEvents) {
      userData.FavoriteEvents.forEach((event) => {
        notifs.push({
          icon: AccessTimeIcon, // Icono MUI
          text: `Te recordamos que ${event.title} será en 7 días`,
          date: `07 Dic 2024, 09:00`
        })
        notifs.push({
          icon: CheckCircleIcon, // Icono MUI
          text: `Confirmación de suscripcion a ${event.title}`,
          date: `23 Nov 2024, 09:00`
        })
      })
    }
    return notifs
  }, [userData])

  const handleUnsubscribe = async (eventId: string) => {
    if (!userData) return
    try {
      await apiService.unsubscribeFromEvent(userData.id, eventId)
      const updatedUser = {
        ...userData,
        FavoriteEvents: userData.FavoriteEvents?.filter((e) => e.id !== eventId)
      }
      setUserData(updatedUser)
      refreshUserData(updatedUser)
    } catch (error) {
      console.error('Error al cancelar suscripción:', error)
      alert('No se pudo cancelar la suscripción.')
    }
  }

  if (isLoading) {
    /* ... (código de carga se queda igual) ... */
  }
  if (error || !userData) {
    /* ... (código de error se queda igual) ... */
  }

  return (
    <Layout>
      <Container
        maxWidth='lg'
        sx={{ padding: { xs: '24px 16px', md: '50px 16px' } }}
      >
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {/* --- Columna Izquierda: Mis Suscripciones --- */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, md: 4 },
                borderRadius: '25px',
                minHeight: '687px'
              }}
            >
              <Typography
                variant='h2'
                sx={{ fontSize: '32px', fontWeight: 500, mb: 1 }}
              >
                Mis suscripciones
              </Typography>
              <Typography
                variant='body1'
                sx={{ fontSize: '20px', color: 'var(--Gray-500)', mb: 3 }}
              >
                Gestiona tus suscripciones a eventos y revisa las notificaciones
              </Typography>
              {userData.FavoriteEvents && userData.FavoriteEvents.length > 0 ? (
                userData.FavoriteEvents.map((event) => (
                  <SubscriptionCard
                    key={event.id}
                    event={event}
                    onUnsubscribe={handleUnsubscribe}
                  />
                ))
              ) : (
                <Typography>No estás suscrito a ningún evento.</Typography>
              )}
            </Paper>
          </Grid>

          {/* --- Columna Derecha: Notificaciones y Configuración --- */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {/* Notificaciones Recientes */}
              <Paper
                elevation={3}
                sx={{ p: { xs: 2, md: 4 }, borderRadius: '25px' }}
              >
                <Typography
                  variant='h2'
                  sx={{ fontSize: '32px', fontWeight: 500, mb: 3 }}
                >
                  Notificaciones recientes
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {notifications.map((notif, index) => (
                    <React.Fragment key={index}>
                      <Box
                        sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
                      >
                        {/* --- Icono de MUI --- */}
                        <notif.icon
                          sx={{ fontSize: 48, color: 'var(--Gray-500)' }}
                        />
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: '20px',
                              lineHeight: '120%'
                            }}
                          >
                            {notif.text}
                          </Typography>
                          <Typography
                            sx={{ fontSize: '20px', color: 'var(--Gray-500)' }}
                          >
                            {notif.date}
                          </Typography>
                        </Box>
                        {index === 0 && (
                          <Box
                            sx={{
                              width: 13,
                              height: 13,
                              borderRadius: '50%',
                              bgcolor: 'var(--color-cadetblue)',
                              ml: 'auto'
                            }}
                          />
                        )}
                      </Box>
                      {index < notifications.length - 1 && (
                        <Divider sx={{ my: 1 }} />
                      )}
                    </React.Fragment>
                  ))}
                </Box>
              </Paper>

              {/* Configuración */}
              <Paper
                elevation={3}
                sx={{ p: { xs: 2, md: 4 }, borderRadius: '25px' }}
              >
                <Typography
                  variant='h2'
                  sx={{ fontSize: '32px', fontWeight: 500, mb: 3 }}
                >
                  Configuración
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {/* --- Icono de MUI --- */}
                    <MailOutlineIcon
                      sx={{ fontSize: 48, color: 'var(--Gray-500)' }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: '24px',
                          lineHeight: '120%'
                        }}
                      >
                        Email de notificaciones
                      </Typography>
                      <Typography
                        sx={{ fontSize: '20px', color: 'var(--Gray-500)' }}
                      >
                        {userData.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {/* --- Icono de MUI --- */}
                    <NotificationImportantIcon
                      sx={{ fontSize: 48, color: 'var(--Gray-500)' }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: '24px',
                          lineHeight: '120%'
                        }}
                      >
                        Recordatorios por email
                      </Typography>
                      <Typography
                        sx={{ fontSize: '20px', color: 'var(--Gray-500)' }}
                      >
                        Activado
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default PanelDeUsuario
