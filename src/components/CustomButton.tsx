// CustomButton.tsx
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

interface CustomButtonProps extends ButtonProps {
  highlightColor?: string;
}

const CustomButton = styled(Button, {
  // Prevent 'highlightColor' from being forwarded to the DOM element
  shouldForwardProp: (prop) => prop !== 'highlightColor',
})<CustomButtonProps>(({ highlightColor = '#9c27b0' }) => ({
  backgroundColor: '#fff',
  color: '#333',
  border: '1px solid #ccc',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
  textTransform: 'none',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    border: `1px solid ${highlightColor}`,
    boxShadow: `0 0 6px ${highlightColor}`,
    backgroundColor: '#fff',
  },
  '&:focus': {
    border: `1px solid ${highlightColor}`,
    boxShadow: `0 0 6px ${highlightColor}`,
  },
}));

export default CustomButton;