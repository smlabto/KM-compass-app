'use client'
import { Box, Typography, Stack, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';

const Footer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="footer"
      sx={{
        color: 'white',
        py: 4,
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
        width: '100%',
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: 2,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box textAlign={isSmallScreen ? 'center' : 'left'}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://example.com/"
            >
              <Image
                src="/img/smlabto_logo.png"
                alt="Social Media Lab Logo"
                width={300/1.5}
                height={57/1.5}
                priority
              />
            </a>
            <Typography
              variant="body2"
              sx={{ fontSize: '0.875rem', color: 'black', mt: 1 }}
            >
              &copy; {new Date().getFullYear()} SocialMediaLab.Ca
            </Typography>
          </Box>

          <Image
            src="/img/gov_funding.png"
            alt="Government of Canada | Gouvernement du Canada"
            width={400/1.5}
            height={48/1.5}
            priority
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
