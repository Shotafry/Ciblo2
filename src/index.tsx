// src/index.tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  StyledEngineProvider
} from '@mui/material'

// La importación de 'createGlobalStyle' se ha eliminado de aquí

const muiTheme = createTheme()

const container = document.getElementById('root')

const root = createRoot(container!) // Añadimos '!' para TypeScript
root.render(
  <React.StrictMode>
    {' '}
    {/* Añadimos StrictMode para mejor depuración */}
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          {/* CssBaseline SÍ es necesario, resetea los estilos */}
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// La llamada a 'createGlobalStyle()' se ha eliminado de aquí

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
