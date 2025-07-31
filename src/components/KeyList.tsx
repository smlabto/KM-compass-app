import { Box, Card, CardContent, Grid, List, ListItem, Skeleton, Typography } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import ErrorIcon from '@mui/icons-material/Error';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { useLang } from './ThemeProviderWrapper';
import { ReactElement, useMemo } from 'react';

type AllowedTypes = "strengths" | "considerations"

interface KeyListProps {
  // key: number;
  type: AllowedTypes; 
  values: string[];
}

const typeStyles: Record<AllowedTypes, { backgroundColor: string; color: string, fontColor: string }> = {
  strengths: {
    backgroundColor: "#ecfdf5",
    color: "#08805e",
    fontColor: "#076049"
  },
  considerations: {
    backgroundColor: "#fcf4e9",
    color: "#be640c",
    fontColor: "#bf690c"
  },
};

const typeLabels: Record<AllowedTypes, { en: string; fr: string }> = {
  strengths: {
    en: "Key Strengths",
    fr: "Points forts"
  },
  considerations: {
    en: "Key Considerations",
    fr: "Principales considérations"
  }
};

const typeIcons: Record<AllowedTypes, ReactElement> = {
  strengths: <AutoAwesomeIcon />,
  considerations: <ErrorIcon />
};

export default function KeyList({
  type,
  values
}: KeyListProps) {
  const { lang } = useLang();
  const style = typeStyles[type];
  
  const featureReleaseText = useMemo(() => {
    return lang === 'fr'
      ? "Cette fonctionnalité sera disponible dans une prochaine version de KM Compass."
      : "This feature will be released in a future version of KM Compass.";
  }, [lang]);

  const keyText = useMemo(() => {
    return lang === 'fr' ? typeLabels[type].fr : typeLabels[type].en;
  }, [lang, type]);

  return (
    <Grid key={type} size={{xs: 2, md: 1}}>
      <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: "100%", background: style.backgroundColor, border: "1px solid " + style.color + '68', boxShadow: 'none', borderRadius: 3 }}>
        <CardContent sx={{ paddingBottom: "10px !important" }}>
          <Box sx={{ display: 'flex', color: style.color }}>
            {typeIcons[type]}
            <Typography sx={{ color: style.fontColor, ml: 1.5, fontWeight: '600', fontSize: 16 }}>
              {keyText}
            </Typography>
          </Box>

          {values.length > 0 ? (
            <List sx={{ color: style.color, listStyleType: 'disc', pl: 2, ml: 0 }}>
              {values.map((val: string, idx) => {
                return (
                  <ListItem key={idx} sx={{ display: 'list-item', py: "6px", pl: 0, ml: '11px' }}>
                    <Typography sx={{ color: style.fontColor, fontSize: { xs: 12, sm: 14 } }}>
                      <b style={{ fontWeight: 600 }}>{val}</b>
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          ) : ( // Show a skeleton
            <List sx={{ color: style.color, listStyleType: 'disc', pl: 2, ml: 0 }}>
              {[...Array(3)].map((_, idx) => (
                <ListItem key={idx} sx={{ display: 'list-item', py: "6px", pl: 0, ml: '11px' }}>
                  <Typography sx={{ fontSize: 14 }}>
                    <Skeleton animation={false} variant="text" sx={{background: style.color + "32"}} />
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>

        {values.length > 0 ? (
          <></>
          ) : ( // Show a skeleton
          <Box sx={{display: 'flex', mx: 2, mb: 2, borderRadius: 2, alignItems: 'center', background: style.color + '18', padding: "8px 15px", border: 'none', color: style.color}}>
            <AlarmIcon sx={{mr: 2}} />
            <Typography variant="body2" fontWeight={600}>
              {featureReleaseText}
            </Typography>
          </Box>
        )}

      </Card>
    </Grid>
  );
}