import { Card, useMediaQuery, useTheme } from '@mui/material';

interface GameCardProps {
  children: React.ReactNode;
  hover?: boolean;
  onClick?: () => void;
}

export const GameCard = ({
  children,
  hover = true,
  onClick,
}: GameCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      onClick={onClick}
      elevation={12}
      sx={{
        padding: 4,
        backgroundColor: "#F5E8DC",
        borderRadius: 4,
        boxShadow: "0px 0px 20px 5px rgba(224, 127, 63, 0.4)",
        border: "4px solid #E07F3F",
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        ...(hover && {
          '&:hover': {
            transform: onClick ? 'scale(1.02)' : 'none',
            boxShadow: "0px 0px 25px 7px rgba(224, 127, 63, 0.5)",
          },
        }),
        ...(isMobile && {
          padding: 3,
          '&:hover': {
            transform: 'none',
          },
        }),
      }}
    >
      {children}
    </Card>
  );
};
