// src/components/Footer.tsx
import { FunctionComponent } from 'react'
import { Box, Typography } from '@mui/material'
import { css } from '@emotion/css'

export const Footer: FunctionComponent = () => {
  return (
    <footer
      className={css`
        width: var(--width-1440);
        height: var(--height-365);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: var(--padding-171) var(--padding-546) var(--padding-170);
        box-sizing: border-box;
        position: relative;
        text-align: left;
        font-size: var(--fs-24);
        color: var(--Gray-500);
        font-family: Inter;
        max-width: 100%;
        margin-top: auto; /* Empuja el footer al fondo */
      `}
    >
      <img
        className={css`
          width: 100%;
          height: 100%;
          position: absolute;
          margin: 0 !important;
          top: 0px;
          right: 0px;
          bottom: 0px;
          left: 0px;
          max-width: 100%;
          overflow: hidden;
          max-height: 100%;
          object-fit: contain;
          z-index: 1;
        `}
        alt=''
        src='/Footer-Background.svg' // (Este SVG está vacío, pero mantenemos la estructura)
      />
      <Box
        className={css`
          width: 100%;
          height: var(--height-170);
          margin: 0 !important;
          position: absolute;
          right: 0px;
          bottom: 12px;
          left: 0px;
          display: flex;
          align-items: flex-start;
          padding: var(--padding-64) var(--padding-80) var(--padding-48);
          box-sizing: border-box;
          z-index: 2;
          font-size: var(--fs-16);
        `}
      >
        <Box
          className={css`
            height: var(--height-58);
            width: var(--width-1280);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: var(--padding-0) var(--padding-32);
            box-sizing: border-box;
            gap: var(--gap-32);
            max-width: 100%;
          `}
        >
          <Box
            className={css`
              align-self: stretch;
              height: var(--height-1);
              position: relative;
              background-color: var(--White);
            `}
          />
          <Box
            className={css`
              width: 100%;
              height: var(--height-66);
              display: flex;
              align-items: flex-start;
              justify-content: space-between; /* Ajustado para mejor responsividad */
              padding: var(--padding-26) var(--padding-0) var(--padding-16);
              box-sizing: border-box;
              position: relative;
              gap: var(--gap-20);
              flex-wrap: wrap; /* Añadido para responsividad */
            `}
          >
            <img
              className={css`
                width: var(--width-182);
                position: relative;
                max-height: 100%;
                object-fit: cover;
                z-index: 0;
                flex-shrink: 0;
                top: -26px; /* Ajuste para alinear con el texto */
                left: -32px; /* Ajuste para alinear */
              `}
              loading='lazy'
              alt=''
              src='/cyberLogo-gigapixel-art-scale-2-00x-godpix-letter-1@2x.png'
            />
            <div
              className={css`
                position: relative;
                line-height: var(--lh-24);
                display: inline-block;
                flex-shrink: 0;
                z-index: 1;
                margin-top: 6px; /* Ajuste para alinear */
              `}
            >
              © 2025 CibESphere. Todos los derechos reservados.
            </div>
          </Box>
        </Box>
      </Box>
      <Box
        className={css`
          width: var(--width-343_4);
          height: var(--height-24);
          display: flex;
          align-items: flex-start;
          padding: var(--padding-0) var(--padding-0) var(--padding-0)
            var(--padding-256);
          box-sizing: border-box;
          z-index: 3;
          position: relative; /* Ajuste para responsividad */
          left: 50%; /* Centrado */
          transform: translateX(-50%); /* Centrado */
          top: 20px; /* Ajuste de posición */
          justify-content: center; /* Centrado */
          gap: 40px; /* Espacio entre enlaces */
        `}
      >
        <Typography
          className={css`
            margin: 0;
            height: var(--height-24);
            position: relative;
            display: inline-block;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          `}
          variant='inherit'
          variantMapping={{ inherit: 'h3' }}
          sx={{ fontWeight: '400', lineHeight: 'var(--lh-24)' }}
        >
          Eventos
        </Typography>
        <Typography
          className={css`
            margin: 0;
            height: var(--height-24);
            position: relative;
            display: inline-block;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          `}
          variant='inherit'
          variantMapping={{ inherit: 'h3' }}
          sx={{ fontWeight: '400', lineHeight: 'var(--lh-24)' }}
        >
          Sobre nosotros
        </Typography>
      </Box>
    </footer>
  )
}
