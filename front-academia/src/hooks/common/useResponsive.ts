import { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

export const useResponsive = () => {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    if (isMobile) {
      setScreenSize('mobile');
    } else if (isTablet) {
      setScreenSize('tablet');
    } else {
      setScreenSize('desktop');
    }
  }, [isMobile, isTablet, isDesktop]);

  return {
    isMobile,
    isTablet,
    isDesktop,
    screenSize,
  };
};
