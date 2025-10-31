// src/components/EventCard.tsx
import React, { useCallback } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Event } from "../types";
// --- Importamos iconos de Material-UI ---
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';

interface EventCardProps {
  event: Event;
}

// Helper para formatear la fecha
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const onCardClick = useCallback(() => {
    navigate(`/eventos/${event.slug || event.id}`);
  }, [navigate, event]);

  return (
    <Grid item xs={12} component="section" sx={{ maxWidth: "100%" }}>
      <Box
        onClick={onCardClick}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, 
          alignItems: "stretch",
          width: "100%",
          maxWidth: 1362, 
          cursor: "pointer",
          borderRadius: "25px",
          background: "var(--Background-events-2)",
          boxShadow: "var(--shadow-drop)",
          color: "var(--White)",
          fontFamily: "var(--Heading-Font-Family)",
          minHeight: "225px",
        }}
      >
        {/* Imagen del Evento */}
        <Box
          component="img"
          src={event.image_url || "/cyberLogo-gigapixel-art-scale-2-00x-godpix-1@2x.png"}
          alt={event.title}
          sx={{
            width: { xs: "100%", md: "225px" },
            height: { xs: "200px", md: "225px" },
            objectFit: "cover",
            borderRadius: { xs: "25px 25px 0 0", md: "25px 0 0 25px" },
          }}
        />

        {/* Contenido Principal */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flexGrow: 1,
            padding: { xs: "20px", md: "28px 35px 35px 42px" },
            gap: { xs: 3, md: 4 },
          }}
        >
          {/* Columna de Fecha y Ubicación */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flexShrink: 0,
              width: { xs: "100%", md: "320px" },
            }}
          >
            {/* Fecha */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* --- Icono de MUI --- */}
              <CalendarTodayIcon sx={{ fontSize: 24 }} />
              <Typography variant="h3" sx={{ fontSize: "24px", fontWeight: 600 }}>
                {formatDate(event.start_date)}
              </Typography>
            </Box>

            {/* Ubicación */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* --- Icono de MUI --- */}
              <LocationOnIcon sx={{ fontSize 24 }} />
              <Typography variant="body1" sx={{ fontSize: "20px", fontWeight: 400 }}>
                {event.is_online ? "Evento Online" : `${event.venue_city}, ${event.venue_country}`}
              </Typography>
            </Box>

            {/* Tags (Categorías) */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
              {event.tags.slice(0, 3).map((tag) => (
                <Box
                  key={tag}
                  sx={{
                    bgcolor: "var(--White)",
                    color: "var(--Gray-500)",
                    borderRadius: "15px",
                    padding: "5px 12px",
                    fontSize: "16px",
                    textTransform: "capitalize",
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Columna de Título y Descripción */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flexGrow: 1 }}>
            <Typography variant="h2" sx={{ fontSize: "32px", fontWeight: 700, fontStyle: "italic" }}>
              {event.title}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "20px", fontWeight: 400, lineHeight: "120%" }}>
              {event.short_desc}
            </Typography>
          </Box>

          {/* Columna de Asistentes (A la derecha) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              pt: 0.5,
              ml: { xs: 0, md: "auto" },
            }}
          >
            <Box
              sx={{
                border: "1.5px solid var(--White)",
                borderRadius: "10px",
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* --- Icono de MUI --- */}
              <GroupIcon sx={{ fontSize: 24 }} />
              <Typography variant="h3" sx={{ fontSize: "20px", fontWeight: 600 }}>
                {`${event.current_attendees}/${event.max_attendees || "∞"}`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};