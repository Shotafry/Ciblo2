// src/pages/Page.tsx
import { FunctionComponent, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Container,
  Paper,
  Grid,
  CircularProgress,
  Switch,
  FormControlLabel,
  Autocomplete
} from '@mui/material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
// --- LÍNEA ARREGLADA ---
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3' // Añadimos V3
// --- FIN DEL ARREGLO ---
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useAuth } from '../context/AuthContext'
import * as apiService from '../services/apiService'
import { CreateEventDTO } from '../types'
import { CYBERSECURITY_TAGS, EVENT_LEVELS } from '../constants/filters'
import PeopleIcon from '@mui/icons-material/People'

// (El tipo FormData se queda igual)
type FormData = {
  title: string
  short_desc: string
  description: string
  start_date: Date | null
  end_date: Date | null
  venue_city: string
  venue_address: string
  website: string
  price: string
  max_attendees: string
  level: string
  tags: string[]
}

const Page: FunctionComponent = () => {
  // ... (El resto del archivo se queda exactamente igual) ...
  const navigate = useNavigate()
  const { user } = useAuth()

  const [formData, setFormData] = useState<FormData>({
    title: '',
    short_desc: '',
    description: '',
    start_date: null,
    end_date: null,
    venue_city: '',
    venue_address: '',
    website: '',
    price: '0',
    max_attendees: '0',
    level: 'Principiante',
    tags: []
  })

  const [isOnline, setIsOnline] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (
    name: 'start_date' | 'end_date',
    value: Date | null
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTagsChange = (event: any, newValue: string[]) => {
    setFormData((prev) => ({ ...prev, tags: newValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.organization || !formData.start_date || !formData.end_date) {
      setError('Por favor, completa todos los campos requeridos (*).')
      return
    }

    setIsLoading(true)
    setError('')

    const priceInCents = Math.round(parseFloat(formData.price) * 100)

    const eventData: CreateEventDTO = {
      title: formData.title,
      short_desc: formData.short_desc,
      description: formData.description,
      start_date: formData.start_date.toISOString(),
      end_date: formData.end_date.toISOString(),
      is_online: isOnline,
      venue_name: formData.venue_address,
      venue_address: formData.venue_address,
      venue_city: formData.venue_city,
      venue_country: 'Spain',
      max_attendees: parseInt(formData.max_attendees, 10) || 0,
      is_free: priceInCents === 0,
      price: priceInCents,
      tags: formData.tags,
      level: formData.level
    }

    try {
      await apiService.createEvent(eventData, user.organization)
      navigate('/panel-de-organizador')
    } catch (err: any) {
      setError(err.message || 'Error al crear el evento.')
      setIsLoading(false)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Layout>
        <Container
          maxWidth='lg'
          sx={{ padding: { xs: '24px 16px', md: '50px 16px' } }}
        >
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: '25px',
              maxWidth: '1150px',
              margin: '0 auto'
            }}
          >
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '28px', md: '32px' },
                fontWeight: 600,
                color: 'var(--Gray-500)',
                mb: 4
              }}
            >
              Nuevo evento
            </Typography>

            <Box component='form' onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                {/* --- Columna Izquierda --- */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    required
                    label='Título del evento *'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    sx={{ mb: 4 }}
                  />
                  <DateTimePicker
                    label='Fecha de inicio *'
                    value={formData.start_date}
                    onChange={(val) => handleDateChange('start_date', val)}
                    sx={{ width: '100%' }}
                  />
                </Grid>

                {/* --- Columna Central --- */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    required
                    label='Descripción corta *'
                    name='short_desc'
                    value={formData.short_desc}
                    onChange={handleChange}
                    sx={{ mb: 4 }}
                  />
                  <DateTimePicker
                    label='Fecha de fin *'
                    value={formData.end_date}
                    onChange={(val) => handleDateChange('end_date', val)}
                    sx={{ width: '100%' }}
                  />
                </Grid>

                {/* --- Columna Derecha --- */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label='Descripción completa'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Grid>

                {/* --- Fila 2 --- */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    required
                    label='Ciudad *'
                    name='venue_city'
                    value={formData.venue_city}
                    onChange={handleChange}
                    disabled={isOnline}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label='Precio (€)'
                    name='price'
                    type='number'
                    value={formData.price}
                    onChange={handleChange}
                    InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label='Capacidad'
                    name='max_attendees'
                    type='number'
                    value={formData.max_attendees}
                    onChange={handleChange}
                    InputProps={{
                      inputProps: { min: 0 },
                      endAdornment: (
                        <InputAdornment position='end'>
                          <PeopleIcon sx={{ color: 'var(--Gray-500)' }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                {/* --- Fila 3 --- */}
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label='Dirección'
                    name='venue_address'
                    value={formData.venue_address}
                    onChange={handleChange}
                    disabled={isOnline}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label='Sitio Web'
                    name='website'
                    value={formData.website}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    select
                    fullWidth
                    label='Nivel'
                    name='level'
                    value={formData.level}
                    onChange={handleChange}
                  >
                    {EVENT_LEVELS.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* --- Fila 4: Tags y Online --- */}
                <Grid item xs={12} md={8}>
                  <Autocomplete
                    multiple
                    options={CYBERSECURITY_TAGS}
                    value={formData.tags}
                    onChange={handleTagsChange}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='outlined'
                        label='Tags del evento'
                        placeholder='Añadir tags (ej. CTF, Pentesting...)'
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isOnline}
                        onChange={(e) => setIsOnline(e.target.checked)}
                        color='primary'
                      />
                    }
                    label='Es un evento online'
                  />
                </Grid>

                {/* --- Botones --- */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    mt: 4,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 2,
                    flexWrap: 'wrap'
                  }}
                >
                  {error && (
                    <Typography
                      color='error'
                      sx={{ mr: 'auto', width: '100%', textAlign: 'center' }}
                    >
                      {error}
                    </Typography>
                  )}

                  <Button
                    variant='contained'
                    onClick={() => navigate('/panel-de-organizador')}
                    disabled={isLoading}
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
                      width: { xs: '100%', sm: 175 },
                      height: 45
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    disabled={isLoading}
                    sx={{
                      textTransform: 'none',
                      color: '#fff',
                      fontSize: '20px',
                      background: '#d9d9d9',
                      '&:hover': { background: '#bfbfbf' },
                      width: { xs: '100%', sm: 175 },
                      height: 45
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color='inherit' />
                    ) : (
                      'Crear evento'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Layout>
    </LocalizationProvider>
  )
}

export default Page
