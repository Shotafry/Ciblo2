// src/components/EventFilters.tsx
import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Collapse,
  IconButton,
  TextField,
  Autocomplete
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { EventFilterParams } from '../types'
import {
  LOCATION_OPTIONS,
  CYBERSECURITY_TAGS,
  EVENT_LEVELS
} from '../constants/filters' // Importamos las nuevas listas

// Iconos
import FilterListIcon from '@mui/icons-material/FilterList'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import LabelIcon from '@mui/icons-material/Label'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import SchoolIcon from '@mui/icons-material/School' // Icono para Nivel

interface EventFiltersProps {
  filters: EventFilterParams
  onFilterChange: (newFilters: EventFilterParams) => void
}

// Botón de filtro reutilizable (para Nivel)
const FilterButton: React.FC<{
  label: string
  isSelected: boolean
  onClick: () => void
}> = ({ label, isSelected, onClick }) => (
  <Button
    variant={isSelected ? 'contained' : 'outlined'}
    onClick={onClick}
    sx={{
      borderRadius: '15px',
      textTransform: 'capitalize',
      fontSize: { xs: '14px', md: '18px' },
      borderColor: 'var(--color-cadetblue)',
      color: isSelected ? 'white' : 'var(--color-cadetblue)',
      bgcolor: isSelected ? 'var(--color-cadetblue)' : 'white',
      '&:hover': {
        bgcolor: isSelected ? '#43a0a8' : 'rgba(79, 186, 200, 0.04)'
      }
    }}
  >
    {label}
  </Button>
)

export const EventFilters: React.FC<EventFiltersProps> = ({
  filters,
  onFilterChange
}) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleDateChange = (
    field: 'startDate' | 'endDate',
    value: Date | null
  ) => {
    onFilterChange({ ...filters, [field]: value })
  }

  // --- MODIFICADO: Handler genérico para Autocomplete (múltiple) ---
  const handleMultiSelectChange = (
    field: 'tags' | 'locations' | 'levels',
    newValues: string[]
  ) => {
    onFilterChange({ ...filters, [field]: newValues })
  }

  // --- MODIFICADO: Handler para botones de Nivel ---
  const handleLevelToggle = (value: string) => {
    const currentValues = filters.levels
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value) // Quitar
      : [...currentValues, value] // Añadir
    onFilterChange({ ...filters, levels: newValues })
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: '25px',
        width: '100%',
        maxWidth: '1340px',
        bgcolor: 'var(--White)'
      }}
    >
      {/* --- Cabecera del Filtro --- */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FilterListIcon
            sx={{
              color: 'var(--color-cadetblue)',
              fontSize: { xs: 30, md: 40 }
            }}
          />
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: '28px', md: '40px' },
              fontWeight: '600',
              letterSpacing: '-0.02em',
              color: 'var(--color-cadetblue)'
            }}
          >
            Filtros
          </Typography>
        </Box>
        <IconButton>
          {isOpen ? (
            <ExpandLessIcon fontSize='large' />
          ) : (
            <ExpandMoreIcon fontSize='large' />
          )}
        </IconButton>
      </Box>

      {/* --- Contenido Colapsable --- */}
      <Collapse in={isOpen}>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Rango de Fechas */}
          <Grid item xs={12} md={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CalendarTodayIcon sx={{ color: 'var(--Gray-500)' }} />
              <Typography
                variant='h3'
                sx={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'var(--Gray-500)'
                }}
              >
                Rango de fechas
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label='Fecha inicio'
                  value={filters.startDate}
                  onChange={(val) => handleDateChange('startDate', val)}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label='Fecha fin'
                  value={filters.endDate}
                  onChange={(val) => handleDateChange('endDate', val)}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* --- MODIFICADO: Localización (Autocomplete) --- */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocationCityIcon sx={{ color: 'var(--Gray-500)' }} />
              <Typography
                variant='h3'
                sx={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'var(--Gray-500)'
                }}
              >
                Localización
              </Typography>
            </Box>
            <Autocomplete
              multiple
              options={LOCATION_OPTIONS}
              value={filters.locations}
              onChange={(event, newValue) => {
                handleMultiSelectChange('locations', newValue)
              }}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='Buscar ciudades o comunidades...'
                />
              )}
            />
          </Grid>

          {/* --- MODIFICADO: Categorías (Autocomplete) --- */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LabelIcon sx={{ color: 'var(--Gray-500)' }} />
              <Typography
                variant='h3'
                sx={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'var(--Gray-500)'
                }}
              >
                Categorías y Tags
              </Typography>
            </Box>
            <Autocomplete
              multiple
              options={CYBERSECURITY_TAGS}
              value={filters.tags}
              onChange={(event, newValue) => {
                handleMultiSelectChange('tags', newValue)
              }}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='Buscar tags (ej. Pentesting, CTF...)'
                />
              )}
            />
          </Grid>

          {/* --- NUEVO: Nivel --- */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <SchoolIcon sx={{ color: 'var(--Gray-500)' }} />
              <Typography
                variant='h3'
                sx={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: 'var(--Gray-500)'
                }}
              >
                Nivel
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {EVENT_LEVELS.map((level) => (
                <FilterButton
                  key={level}
                  label={level}
                  isSelected={filters.levels.includes(level)}
                  onClick={() => handleLevelToggle(level)}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Collapse>
    </Paper>
  )
}
