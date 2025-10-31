// src/components/Layout.tsx
import React, { ReactNode } from 'react'
import { Box } from '@mui/material'
import { css } from '@emotion/css'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      className={css`
        width: 100%;
        position: relative;
        background-color: var(--White);
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        align-items: center; /* Centramos el contenido */
        min-height: 100vh;
        line-height: var(--lh-normal);
        letter-spacing: var(--ls-normal);
      `}
    >
      <Header />
      <Box
        component='main'
        className={css`
          width: 100%;
          max-width: 1440px; /* Ancho máximo de tu diseño */
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-grow: 1; /* Ocupa el espacio restante */
        `}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
