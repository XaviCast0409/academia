export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.sm}px)`,
  tablet: `@media (max-width: ${breakpoints.md}px)`,
  desktop: `@media (min-width: ${breakpoints.lg}px)`,
};
