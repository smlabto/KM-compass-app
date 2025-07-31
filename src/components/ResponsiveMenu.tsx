import { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SelectChangeEvent } from '@mui/material';

const ResponsiveMenu = ({ lang, handleChange } : {
  lang: string;
  handleChange: (event: SelectChangeEvent) => void;
}) =>  {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width:780px)');

  const menuItems = (
    <>
      <Button
        color="secondary"
        target="_blank"
        href="https://example.com/"
        sx={{ textTransform: 'none', fontSize: 16, my: 1 }}
      >
        {lang === 'fr' ? (
            <>À propos</>
        ): (
            <>About</>
        )}
      </Button>
      <Select
        value={lang}
        color="secondary"
        sx={{ height: 40, ml: 1 }}
        onChange={handleChange}
        MenuProps={{ disableScrollLock: true }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="fr">Français</MenuItem>
      </Select>
    </>
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          pr: 2,
        }}
      >
        {/* Desktop view */}
        {!isMobile && (
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
            {menuItems}
          </Box>
        )}

        {/* Mobile burger icon */}
        {isMobile && (
          <>
            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ ml: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Box sx={{ p: 2, width: 200, display: 'flex', flexDirection: 'column' }}>
                {menuItems}
              </Box>
            </Drawer>
          </>
        )}
      </Box>
    </>
  );
};

export default ResponsiveMenu;
