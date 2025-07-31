import { ReactNode, useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLang } from '../../components/ThemeProviderWrapper';

interface StepBodyProps {
  title: ReactNode; 
  subTitle?: ReactNode;
  children: ReactNode;
  goNext: () => void;
  goBack: () => void;
  showNext?: boolean;
  showBack?: boolean;
  nextDisabled?: boolean;
  currentStep: number;
}

export default function StepBody({
  // title,
  // subTitle,
  children,
  // goNext,
  goBack,
  // showNext = true,
  // showBack = true,
  // nextDisabled = false,
  currentStep
}: StepBodyProps) {
  const { lang } = useLang();

  const backText = useMemo(() => {
    return lang === "fr" ? "Retour à l'étape" : "Back to Step"
  }, [lang]);

  return (
    <Box sx={{minHeight: 600}}>
      
      <Box sx={{mb: 2, height: 40, justifySelf: 'center'}}>
        {currentStep >= 1 && (
          <Button
            startIcon={<KeyboardBackspaceIcon />}
            variant="text"
            color="error"
            size="small"
            sx={{ mt: 1.5, borderRadius: '24px', textTransform: 'none' }}
            onClick={() => goBack()}
          >
            <Typography variant="body2" sx={{fontSize: '12px'}}>{backText} #{currentStep}</Typography>
          </Button>
        )}
      </Box>

      <Box sx={{mb: 15}}>{children}</Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, }}></Box>
    </Box>
  );
}
