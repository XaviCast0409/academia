import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import StarsIcon from '@mui/icons-material/Stars';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { claimMissionReward } from "../../services/missionService";
import type { UserMission } from "../../types/rewards";
import { 
  GameCard, 
  ProgressBar, 
  MissionTypeBadge, 
  XavicoinsDisplay 
} from "../../shared";
import { useResponsive, getCurrentUser, MISSION_TYPES, REWARD_TYPES } from "../../shared";

interface Props {
  userMission: UserMission;
  onMissionUpdate: () => void;
}

export const MissionCard = ({ userMission, onMissionUpdate }: Props) => {
  const user = getCurrentUser();
  const userId = user?.id;
  const { isMobile } = useResponsive();
  const [isClaiming, setIsClaiming] = useState(false);

  const mission = userMission.mission;
  const progress = userMission.progress;
  const requiredCount = mission.requiredCount;
  const isCompleted = userMission.isCompleted;
  const isRewardClaimed = userMission.rewardClaimed || false;

  const handleClaimReward = async () => {
    if (!isCompleted || isRewardClaimed || !userId) return;

    setIsClaiming(true);
    try {
      await claimMissionReward(userMission.id, userId);
      onMissionUpdate();
    } catch (error) {
      console.error('Error claiming reward:', error);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <GameCard hover>
      {/* Indicador de completado */}
      {isCompleted && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
          }}
        >
          <CheckCircleIcon
            sx={{
              color: '#4caf50',
              fontSize: 24,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          p: 3,
        }}
      >
        {/* Icono de misión */}
        <Box
          sx={{
            width: isMobile ? "100%" : 110,
            height: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: MISSION_TYPES[mission.type as keyof typeof MISSION_TYPES]?.color || '#E07F3F',
            borderRadius: 2,
            border: "2px solid #e07f3f",
            boxShadow: '0 2px 8px rgba(224,127,63,0.10)',
            mb: isMobile ? 2 : 0,
          }}
        >
          <AssignmentIcon sx={{ color: 'white', fontSize: 40 }} />
        </Box>

        {/* Información */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <AssignmentIcon sx={{ color: "#E07F3F" }} />
            <Typography fontWeight={700} fontSize={isMobile ? "1rem" : "1.15rem"} color="primary.dark" noWrap>
              {mission.title}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <DescriptionIcon sx={{ color: "primary.dark" }} />
            <Typography
              fontSize={isMobile ? "0.9rem" : "1rem"}
              color="text.secondary"
              sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
            >
              {mission.description}
            </Typography>
          </Box>

          {/* Tipo de misión */}
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <StarsIcon sx={{ color: MISSION_TYPES[mission.type as keyof typeof MISSION_TYPES]?.color || '#E07F3F' }} />
            <MissionTypeBadge type={mission.type as keyof typeof MISSION_TYPES} />
          </Box>

          {/* Progreso */}
          <ProgressBar
            current={progress}
            total={requiredCount}
            label="Progreso"
            color={isCompleted ? 'success' : 'primary'}
          />

          {/* Recompensa */}
          <Box display="flex" alignItems="center" gap={1}>
            <MonetizationOnIcon sx={{ color: REWARD_TYPES[mission.rewardType as keyof typeof REWARD_TYPES]?.color || "#E07F3F" }} />
            <XavicoinsDisplay 
              amount={mission.rewardAmount} 
              size="small"
              showIcon={false}
            />
          </Box>
        </Box>

        {/* Botón de reclamar */}
        <Box
          sx={{
            mt: isMobile ? 2 : 0,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            minWidth: isMobile ? '100%' : 120,
          }}
        >
          {isCompleted && !isRewardClaimed ? (
            <Button
              variant="contained"
              color="success"
              startIcon={<EmojiEventsIcon />}
              onClick={handleClaimReward}
              disabled={isClaiming}
              sx={{
                bgcolor: '#4caf50',
                '&:hover': { bgcolor: '#388e3c' },
                fontWeight: 600,
                py: 1.5,
              }}
            >
              {isClaiming ? 'Reclamando...' : 'Reclamar'}
            </Button>
          ) : isRewardClaimed ? (
            <Button
              variant="outlined"
              disabled
              sx={{
                color: '#4caf50',
                borderColor: '#4caf50',
                fontWeight: 600,
                py: 1.5,
              }}
            >
              ✓ Reclamada
            </Button>
          ) : (
            <Button
              variant="outlined"
              disabled
              sx={{
                fontWeight: 600,
                py: 1.5,
              }}
            >
              En progreso
            </Button>
          )}
        </Box>
      </Box>
    </GameCard>
  );
};
