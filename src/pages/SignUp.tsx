// src/pages/SignUp.tsx
import { FunctionComponent, useCallback, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Collapse,
  Grid
} from '@mui/material'
import { css } from '@emotion/css'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useAuth } from '../context/AuthContext'
import { Role, RegisterDTO } from '../types'
// --- Importamos iconos de Material-UI ---
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import PersonIcon from '@mui/icons-material/Person'
import BusinessIcon from '@mui/icons-material/Business' // Icono de Organización/Empresa

const SignUp: FunctionComponent = () => {
  const navigate = useNavigate()
  const { login, register, isLoading } = useAuth()

  const [mode, setMode] = useState<'login' | 'register'>('login')

  // Estados para el formulario
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState<Role>(Role.User)
  const [organizationName, setOrganizationName] = useState('')

  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onCyberLogo1ImageClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  const handleLoginSubmit = async (event: React.FormEvent) => {
    // ... (código se queda igual) ...
    event.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Email y contraseña son requeridos.')
      return
    }
    try {
      await login(email, password)
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
    }
  }

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    // ... (código se queda igual) ...
    event.preventDefault()
    setError('')
    if (!email || !password || !firstName || !lastName || !confirmPassword) {
      setError('Por favor, rellena todos los campos.')
      return
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (role === Role.Organizer && !organizationName) {
      setError(
        'El nombre de la organización es obligatorio para los organizadores.'
      )
      return
    }
    const registerData: RegisterDTO = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      role: role,
      organization_name: role === Role.Organizer ? organizationName : undefined
    }
    try {
      await register(registerData)
    } catch (err: any) {
      setError(err.message || 'Error al registrar la cuenta.')
    }
  }

  const switchMode = (newMode: 'login' | 'register') => {
    // ... (código se queda igual) ...
    setMode(newMode)
    setError('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setFirstName('')
    setLastName('')
    setRole(Role.User)
    setOrganizationName('')
  }

  return (
    <Layout>
      <section
        className={css`
          display: flex;
          align-items: flex-start;
          padding: 50px;
          box-sizing: border-box;
          max-width: 100%;
          width: 100%;
          justify-content: center;
          text-align: left;
          font-size: var(--fs-24);
          color: var(--Gray-500);
          font-family: Inter;
        `}
      >
        <Box
          className={css`
            width: 562px;
            border-radius: var(--br-45);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: var(--padding-38) 43px var(--padding-56);
            box-sizing: border-box;
            position: relative;
            gap: 40px;
            box-shadow: var(--shadow-drop);
            background-color: var(--White);
            max-width: 100%;
          `}
        >
          {/* --- Cabecera del Formulario (sin cambios) --- */}
          <Box
            className={css`
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: var(--gap-8);
              z-index: 1;
            `}
          >
            <img
              className={css`
                width: 229px;
                position: relative;
                object-fit: cover;
              `}
              loading='lazy'
              alt=''
              src='/cyberLogo-gigapixel-art-scale-2-00x-godpix-letter-1@2x.png'
            />
            <Typography
              variant='h3'
              className={css`
                margin: 0;
                font-size: var(--fs-24) !important;
                font-weight: 400 !important;
                line-height: var(--lh-24) !important;
              `}
            >
              {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Typography>
            <div
              className={css`
                position: relative;
                font-size: var(--fs-16);
                line-height: var(--lh-24);
                text-align: center;
              `}
            >
              {mode === 'login'
                ? 'Accede a tu cuenta para inscribirte o gestionar eventos'
                : 'Regístrate para unirte a la comunidad de CibESphere'}
            </div>
          </Box>

          {/* --- Mensaje de Error Global --- */}
          {error && (
            <Typography
              color='error'
              variant='body1'
              sx={{ textAlign: 'center', zIndex: 2 }}
            >
              {error}
            </Typography>
          )}

          {/* --- FORMULARIO DE LOGIN --- */}
          {mode === 'login' && (
            <Box
              component='form'
              onSubmit={handleLoginSubmit}
              sx={{
                width: '100%',
                maxWidth: '478px',
                display: 'flex',
                flexDirection: 'column',
                gap: '22px',
                zIndex: 2
              }}
            >
              <TextField
                fullWidth
                variant='outlined'
                placeholder='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MailOutlineIcon sx={{ fontSize: 28 }} />
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& fieldset': { borderRadius: '15px' },
                  '& .MuiInputBase-root': {
                    height: '66px',
                    backgroundColor: '#fff',
                    borderRadius: '15px',
                    fontSize: '20px'
                  }
                }}
              />
              <TextField
                fullWidth
                variant='outlined'
                placeholder='Contraseña'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon sx={{ fontSize: 28 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'
                      >
                        {showPassword ? (
                          <VisibilityOffIcon sx={{ fontSize: 28 }} />
                        ) : (
                          <VisibilityIcon sx={{ fontSize: 28 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& fieldset': { borderRadius: '15px' },
                  '& .MuiInputBase-root': {
                    height: '66px',
                    backgroundColor: '#fff',
                    borderRadius: '15px',
                    fontSize: '20px'
                  }
                }}
              />
              <Button
                fullWidth
                type='submit'
                disableElevation
                variant='contained'
                disabled={isLoading}
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
                {isLoading ? (
                  <CircularProgress size={28} color='inherit' />
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </Box>
          )}

          {/* --- FORMULARIO DE REGISTRO --- */}
          {mode === 'register' && (
            <Box
              component='form'
              onSubmit={handleRegisterSubmit}
              sx={{
                width: '100%',
                maxWidth: '478px',
                display: 'flex',
                flexDirection: 'column',
                gap: '22px',
                zIndex: 2
              }}
            >
              {/* Selector de Rol */}
              <ToggleButtonGroup
                color='primary'
                value={role}
                exclusive
                fullWidth
                onChange={(e, newRole) => {
                  if (newRole) setRole(newRole)
                }}
                sx={{ mb: 1 }}
              >
                <ToggleButton
                  value={Role.User}
                  sx={{ textTransform: 'none', fontSize: '16px' }}
                >
                  <PersonIcon sx={{ mr: 1 }} />
                  Asistente
                </ToggleButton>
                <ToggleButton
                  value={Role.Organizer}
                  sx={{ textTransform: 'none', fontSize: '16px' }}
                >
                  <BusinessIcon sx={{ mr: 1 }} />
                  Organizador
                </ToggleButton>
              </ToggleButtonGroup>

              {/* Campos de Registro */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Nombre'
                    name='firstName'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Apellidos'
                    name='lastName'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label='Email'
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />

              <TextField
                fullWidth
                label='Contraseña'
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />

              <TextField
                fullWidth
                label='Confirmar Contraseña'
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />

              <Collapse in={role === Role.Organizer}>
                <TextField
                  fullWidth
                  label='Nombre de la Organización'
                  name='organizationName'
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  disabled={isLoading}
                  required={role === Role.Organizer}
                  sx={{ mt: 2 }}
                />
              </Collapse>

              <Button
                fullWidth
                type='submit'
                disableElevation
                variant='contained'
                disabled={isLoading}
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
                  height: 58,
                  mt: 2
                }}
              >
                {isLoading ? (
                  <CircularProgress size={28} color='inherit' />
                ) : (
                  'Crear Cuenta'
                )}
              </Button>
            </Box>
          )}

          {/* --- Links inferiores (dinámicos) --- */}
          <Box
            className={css`
              width: 100%;
              max-width: 478px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: var(--gap-22);
              z-index: 2;
            `}
          >
            <Divider sx={{ width: '100%' }} />
            <Typography
              variant='h3'
              sx={{
                fontWeight: '500',
                lineHeight: '125%',
                fontSize: '20px !important',
                cursor: 'pointer'
              }}
              onClick={() =>
                switchMode(mode === 'login' ? 'register' : 'login')
              }
            >
              {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
              <Typography
                component='span'
                className={css`
                  text-decoration: underline;
                  &:hover {
                    color: var(--color-cadetblue);
                  }
                `}
              >
                {mode === 'login' ? 'Registrate aquí.' : 'Inicia sesión aquí.'}
              </Typography>
            </Typography>
          </Box>

          <button
            className={css`
              cursor: pointer;
              border: none;
              padding: 0;
              background-color: transparent;
              display: flex;
              align-items: center;
              gap: var(--gap-10);
              z-index: 3;
            `}
            onClick={onCyberLogo1ImageClick}
          >
            {/* --- Usamos un icono de MUI para la flecha --- */}
            <ArrowBackIcon sx={{ color: 'var(--Gray-500)' }} />
            <div
              className={css`
                position: relative;
                font-size: var(--fs-24);
                text-decoration: underline;
                line-height: 125%;
                font-weight: 500;
                font-family: Inter;
                color: var(--Gray-500);
                text-align: center;
              `}
            >
              Volver al inicio
            </div>
          </button>

          <Collapse in={mode === 'login'}>
            <img
              className={css`
                width: 100%;
                max-width: 495px;
                position: relative;
                object-fit: cover;
                z-index: 3;
              `}
              loading='lazy'
              alt='Cuentas de demostración'
              src='/Captura-de-pantalla-2025-10-11-195759-1@2x.png'
            />
          </Collapse>
        </Box>
      </section>
    </Layout>
  )
}

export default SignUp
