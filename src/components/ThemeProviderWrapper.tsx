'use client';

import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import { ReactNode, createContext, useContext, useState } from 'react';

type Lang = 'en' | 'fr';

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within ThemeProviderWrapper');
  }
  return context;
}

const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('en');

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </LangContext.Provider>
  );
};

export default ThemeProviderWrapper;
