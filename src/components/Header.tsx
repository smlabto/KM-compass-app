'use client';

import { Box, SelectChangeEvent  } from '@mui/material';
import { useLang } from './ThemeProviderWrapper';
import Image from 'next/image';
import ResponsiveMenu from './ResponsiveMenu';

const Header = () => {
  const { lang, setLang } = useLang();
  
  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as 'en' | 'fr');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
        <Box sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          background: 'white', 
          borderBottom: '1px solid #e2e2e2',
          boxShadow: '#80808036 0px 1px 7px 1px',
          padding: '8px 15px',
        }}>

          <a href="https://example.com/">

            <Image
              src="/img/km_compass_logo.png"
              alt="KM Compass Logo"
              width={106}
              height={61}
              style={{marginTop: 2, padding: '5px 15px'}}
            />
          </a>

          <ResponsiveMenu lang={lang} handleChange={handleChange} />

        </Box>
      </div>
    </header>
  );
};

export default Header;
