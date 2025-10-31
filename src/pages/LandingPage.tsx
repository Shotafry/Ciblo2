// src/pages/LandingPage.tsx
import { FunctionComponent, useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Container,
  Grid,
  CircularProgress
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { css } from '@emotion/css'
import { Layout } from '../components/Layout'
import { EventMap } from '../components/EventMap'
import { EventCard } from '../components/EventCard'
import { Event, EventFilterParams } from '../types' // Importamos EventFilterParams
import * as apiService from '../services/apiService'
import { EventFilters } from '../components/EventFilters' // Importamos los Filtros

const LandingPage: FunctionComponent = () => {
  // --- MODIFICADO PARA PULIR DETALLES ---
  // Estados para los datos y la carga
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<EventFilterParams>({
    startDate: null,
    endDate: null,
    tags: [],
    locations: []
  })

  // Efecto para cargar los eventos
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true)
      try {
        // Pasamos los filtros a la API simulada
        const fetchedEvents = await apiService.getEvents(filters)
        setEvents(fetchedEvents)
      } catch (error) {
        console.error('Error al cargar eventos simulados:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadEvents()
  }, [filters]) // Se re-ejecuta CADA VEZ que los filtros cambian

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Layout>
        {/* --- Sección del Hero (sin cambios) --- */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '1440px',
            height: '824.5px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: { xs: '0 20px', md: '0 50px' },
            boxSizing: 'border-box'
          }}
        >
          {/* Fondo Vectorial */}
          <Box
            sx={{
              width: '100%',
              height: '927.5px',
              position: 'absolute',
              margin: '0 !important',
              right: '0px',
              bottom: '-103px',
              left: '0px',
              zIndex: 0
            }}
          >
            <img
              className={css`
                width: 100%;
                height: 100%;
                overflow: hidden;
                flex-shrink: 0;
                object-fit: contain;
                position: absolute;
                left: 0px;
                top: 11px;
                transform: scale(1.049);
              `}
              alt=''
              src='/Vector.svg'
            />
          </Box>

          {/* Contenido del Hero */}
          <Container
            maxWidth='lg'
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: '63px',
              zIndex: 2,
              marginTop: '100px'
            }}
          >
            {/* Logo Gigante */}
            <Box
              sx={{
                height: '550px',
                width: { xs: '300px', md: '415px' },
                position: 'relative',
                flexShrink: 0
              }}
            >
              <img
                className={css`
                  position: absolute;
                  top: 392px;
                  left: 14px;
                  width: 95%;
                  height: auto;
                  object-fit: contain;
                `}
                loading='lazy'
                alt=''
                src='/cyberLogo-gigapixel-art-scale-2-00x-godpix-letter-1@2x.png'
              />
              <img
                className={css`
                  position: absolute;
                  top: 0px;
                  left: 0px;
                  width: 100%;
                  height: auto;
                  object-fit: contain;
                `}
                alt=''
                src='/cyberLogo-gigapixel-art-scale-2-00x-godpix-1@2x.png'
              />
            </Box>

            {/* Texto del Hero */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '60px 0 0 0',
                textAlign: 'center',
                color: 'var(--White)'
              }}
            >
              <Typography
                variant='h1'
                sx={{
                  fontWeight: '700',
                  fontSize: { xs: '32px', md: '48px' },
                  lineHeight: '120%',
                  letterSpacing: '-0.02em'
                }}
              >
                La web de referencia para eventos y congresos de Ciberseguridad
                más grande de España.
              </Typography>
              <Typography
                variant='h5'
                sx={{
                  marginTop: '40px',
                  fontSize: { xs: '18px', md: '20px' },
                  lineHeight: '120%',
                  fontFamily: 'var(--Subheading-Font-Family)'
                }}
              >
                Descubre eventos, conferencias, talleres y meetups de
                ciberseguridad en toda España. Conecta con profesionales, haz
                nuevos contactos e incluso amigos y mantente actualizado.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* --- Contenido Principal (Estadísticas, Filtros, Mapa, Eventos) --- */}
        <Container
          component='main'
          maxWidth='lg'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: { xs: '0 16px 85px 16px', md: '0 27px 85px 27px' },
            gap: { xs: '60px', md: '80px' }, // Aumentamos el espacio
            textAlign: 'center',
            color: 'var(--Gray-500)'
          }}
        >
          {/* Aquí iría la sección de Estadísticas que diseñaste.
            La omitimos por ahora para centrarnos en los filtros,
            pero iría aquí.
          */}

          {/* --- NUEVO: Sección de Filtros --- */}
          <EventFilters filters={filters} onFilterChange={setFilters} />

          {/* --- Sección Mapa y Eventos --- */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '89px'
            }}
          >
            {/* MAPA DINÁMICO */}
            {isLoading ? (
              <Box
                sx={{
                  height: '936px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <CircularProgress size={60} />
              </Box>
            ) : (
              <EventMap events={events} />
            )}

            {/* LISTA DE EVENTOS DINÁMICA */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '30px'
              }}
            >
              <Typography
                variant='h2'
                sx={{
                  fontWeight: '700',
                  fontSize: '32px',
                  lineHeight: '120%',
                  paddingLeft: '20px'
                }}
              >
                Próximos eventos ({events.length})
              </Typography>

              {isLoading ? (
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <CircularProgress />
                </Box>
              ) : events.length > 0 ? (
                <Grid container spacing={4} sx={{ padding: '0 20px' }}>
                  {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </Grid>
              ) : (
                <Typography
                  sx={{
                    p: 4,
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '20px'
                  }}
                >
                  No se han encontrado eventos con los filtros seleccionados.
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      </Layout>
    </LocalizationProvider>
  )
}

export default LandingPage
