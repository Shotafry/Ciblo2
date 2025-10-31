// src/components/Header.tsx
import { FunctionComponent, useCallback } from 'react'
import { Box, Button } from '@mui/material'
import { css } from '@emotion/css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Role } from '../types'

export const Header: FunctionComponent = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout, isLoading } = useAuth()

  const onLogoClick = useCallback(() => {
    navigate('/')
  }, [navigate])

  const onLoginClick = useCallback(() => {
    navigate('/loginsign-up')
  }, [navigate])

  const onPanelClick = useCallback(() => {
    if (user?.role === Role.Organizer) {
      navigate('/panel-de-organizador')
    } else if (user?.role === Role.Admin) {
      navigate('/panel-de-admin') // (Ruta futura)
    } else {
      navigate('/panel-de-usuario')
    }
  }, [navigate, user])

  return (
    <header
      className={css`
        align-self: stretch;
        height: 119px;
        position: relative;
        max-width: 100%;
        text-align: center;
        font-size: var(--Title-Page-Size-Base);
        color: var(--White);
        font-family: var(--Title-Page-Font-Family);
      `}
    >
      <Box
        className={css`
          position: absolute;
          height: 112.52%;
          width: 100%;
          top: 0%;
          right: 0%;
          bottom: -12.52%;
          left: 0%;
          max-width: 100%;
          max-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <img
          className={css`
            height: 100%;
            width: 100%;
            overflow: hidden;
            object-fit: contain;
            position: absolute;
            left: 0px;
            top: 11px;
            transform: scale(1.049);
          `}
          alt=''
          src='/Vector1.svg' // (Este SVG está vacío, pero mantenemos la estructura)
        />
      </Box>
      <Box
        className={css`
          position: absolute;
          top: 6px;
          left: 53px;
          width: var(--width-1338);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--gap-20);
          max-width: 100%;
          z-index: 1;
          text-align: left;
          font-size: var(--fs-16);
          color: var(--Gray-100);
          font-family: Inter;
        `}
      >
        <img
          className={css`
            width: var(--width-227);
            position: relative;
            max-height: 100%;
            object-fit: cover;
            cursor: pointer;
          `}
          loading='lazy'
          alt=''
          src='/cyberLogo-1@2x.png'
          onClick={onLogoClick}
        />
        <Box
          className={css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: var(--padding-18) var(--padding-0) var(--padding-0);
          `}
        >
          <Box
            className={css`
              filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
              border-radius: var(--br-90);
              display: flex;
              align-items: center;
              gap: var(--gap-12);
            `}
          >
            {isAuthenticated ? (
              // --- VISTA SI ESTÁS CONECTADO ---
              <>
                <Box
                  className={css`
                    border-radius: var(--br-8);
                    display: flex;
                    align-items: flex-start;
                    cursor: pointer;
                  `}
                  onClick={onPanelClick}
                >
                  <Box
                    className={css`
                      border-radius: var(--br-8);
                      overflow: hidden;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      padding: var(--padding-10) var(--padding-18);
                    `}
                  >
                    <div
                      className={css`
                        position: relative;
                        line-height: var(--lh-24);
                        font-weight: 600;
                      `}
                    >
                      {user?.role === Role.Organizer
                        ? 'Panel Organizador'
                        : 'Mi Panel'}
                    </div>
                  </Box>
                </Box>
                <Button
                  className={css`
                    cursor: pointer;
                  `}
                  disableElevation
                  variant='contained'
                  sx={{
                    textTransform: 'none',
                    color: '#fff',
                    fontSize: '16',
                    background: '#35e8ff',
                    borderColor: '#35e8ff',
                    borderWidth: 'undefinedpx',
                    borderStyle: 'solid',
                    borderRadius: '100px',
                    '&:hover': { background: '#35e8ff' }
                  }}
                  onClick={logout}
                  disabled={isLoading}
                >
                  {isLoading ? 'Cerrando...' : 'Log out'}
                </Button>
              </>
            ) : (
              // --- VISTA SI ESTÁS DESCONECTADO ---
              <>
                <Box
                  className={css`
                    border-radius: var(--br-8);
                    display: flex;
                    align-items: flex-start;
                    cursor: pointer;
                  `}
                  onClick={onLoginClick}
                >
                  <Box
                    className={css`
                      border-radius: var(--br-8);
                      overflow: hidden;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      padding: var(--padding-10) var(--padding-18);
                    `}
                  >
                    <div
                      className={css`
                        position: relative;
                        line-height: var(--lh-24);
                        font-weight: 600;
                      `}
                    >
                      Log in
                    </div>
                  </Box>
                </Box>
                <Button
                  className={css`
                    cursor: pointer;
                  `}
                  disableElevation
                  variant='contained'
                  sx={{
                    textTransform: 'none',
                    color: '#fff',
                    fontSize: '16',
                    background: '#35e8ff',
                    borderColor: '#35e8ff',
                    borderWidth: 'undefinedpx',
                    borderStyle: 'solid',
                    borderRadius: '100px',
                    '&:hover': { background: '#35e8ff' }
                  }}
                  onClick={onLoginClick}
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </header>
  )
}
