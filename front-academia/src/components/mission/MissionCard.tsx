import {
	Box,
	Typography,
	Button,
	LinearProgress,
	Chip
} from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import StarsIcon from '@mui/icons-material/Stars';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from "react";
import { claimMissionReward } from "../../services/missionService";
import type { UserMission } from "../../types/rewards";
import { GameCard } from '../common';
import { getCurrentUser } from '../../utils/common';
import { useResponsive } from '../../shared';

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
	const progressPercentage = Math.min((progress / requiredCount) * 100, 100);
	const isCompleted = userMission.isCompleted;
	const isRewardClaimed = userMission.rewardClaimed || false;

	// Colores por tipo de misión
	const missionTypeColors: Record<string, string> = {
		DAILY: '#4caf50',
		WEEKLY: '#1976d2',
		SPECIAL: '#e07f3f',
		GROUP: '#84341c',
	};

	const missionTypeLabels: Record<string, string> = {
		DAILY: 'Diaria',
		WEEKLY: 'Semanal',
		SPECIAL: 'Especial',
		GROUP: 'Grupo',
	};

	// Colores por tipo de recompensa
	const rewardTypeColors: Record<string, string> = {
		COINS: '#E07F3F',
		BADGE: '#1976d2',
		ITEM: '#84341c',
	};

	const rewardTypeLabels: Record<string, string> = {
		COINS: 'XaviCoins',
		BADGE: 'Insignia',
		ITEM: 'Item',
	};

	const handleClaimReward = async () => {
		if (!isCompleted || isClaiming || isRewardClaimed) return;

		setIsClaiming(true);
		try {
			await claimMissionReward(userId, mission.id);
			onMissionUpdate();
		} catch (error) {
			console.error('Error claiming reward:', error);
		} finally {
			setIsClaiming(false);
		}
	};

	return (
		<GameCard
			hover={true}
		>
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
					px: isMobile ? 1 : 3,
					py: isMobile ? 1.5 : 2.5,
					position: 'relative',
					overflow: 'hidden',
					display: "flex",
					flexDirection: isMobile ? "column" : "row",
					alignItems: isMobile ? "flex-start" : "center",
					justifyContent: "space-between",
					gap: 2,
					flexWrap: "wrap"
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
						bgcolor: missionTypeColors[mission.type] || '#E07F3F',
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
						<Typography fontWeight={700} fontSize={isMobile ? "1rem" : "1.15rem"} color="#0D3745" noWrap>
							{mission.title}
						</Typography>
					</Box>

					<Box display="flex" alignItems="center" gap={1} mb={1}>
						<DescriptionIcon sx={{ color: "#0D3745" }} />
						<Typography
							fontSize={isMobile ? "0.9rem" : "1rem"}
							color="#555"
							sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
						>
							{mission.description}
						</Typography>
					</Box>

					{/* Tipo de misión */}
					<Box display="flex" alignItems="center" gap={1} mb={1}>
						<StarsIcon sx={{ color: missionTypeColors[mission.type] || '#E07F3F' }} />
						<Chip
							label={missionTypeLabels[mission.type] || mission.type}
							size="small"
							sx={{
								bgcolor: missionTypeColors[mission.type] || '#E07F3F',
								color: 'white',
								fontWeight: 600,
								fontSize: '0.75rem',
							}}
						/>
					</Box>

					{/* Progreso */}
					<Box mb={1}>
						<Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
							<Typography fontSize={isMobile ? "0.85rem" : "0.95rem"} color="#0D3745" fontWeight={600}>
								Progreso: {progress}/{requiredCount}
							</Typography>
							<Typography fontSize={isMobile ? "0.85rem" : "0.95rem"} color="#0D3745" fontWeight={600}>
								{Math.round(progressPercentage)}%
							</Typography>
						</Box>
						<LinearProgress
							variant="determinate"
							value={progressPercentage}
							sx={{
								height: 8,
								borderRadius: 4,
								bgcolor: '#e0e0e0',
								'& .MuiLinearProgress-bar': {
									bgcolor: isCompleted ? '#4caf50' : '#E07F3F',
									borderRadius: 4,
								},
							}}
						/>
					</Box>

					{/* Recompensa */}
					<Box display="flex" alignItems="center" gap={1}>
						<MonetizationOnIcon sx={{ color: rewardTypeColors[mission.rewardType] || "#E07F3F" }} />
						<Typography fontSize={isMobile ? "0.85rem" : "0.95rem"} color="#E07F3F" fontWeight={600}>
							{mission.rewardAmount} {rewardTypeLabels[mission.rewardType] || mission.rewardType}
						</Typography>
					</Box>
				</Box>

				{/* Botón de reclamar */}
				<Box
					sx={{
						mt: isMobile ? 2 : 0,
						display: "flex",
						flexDirection: isMobile ? "column" : "row",
						gap: 1,
					}}
				>
					{isCompleted ? (
						<Button
							variant="contained"
							size="small"
							startIcon={<EmojiEventsIcon />}
							onClick={handleClaimReward}
							disabled={isClaiming || isRewardClaimed}
							sx={{
								bgcolor: isRewardClaimed ? '#ccc' : '#4caf50',
								color: '#fff',
								fontWeight: 700,
								'&:hover': {
									bgcolor: isRewardClaimed ? '#ccc' : '#45a049',
								},
								'&:disabled': {
									bgcolor: '#ccc',
									color: '#666',
								},
							}}
						>
							{isRewardClaimed ? 'Recompensa reclamada' : (isClaiming ? 'Reclamando...' : 'Reclamar Recompensa')}
						</Button>
					) : (
						<Button
							variant="outlined"
							size="small"
							disabled
							sx={{
								borderColor: '#ccc',
								color: '#999',
								fontWeight: 700,
							}}
						>
							En Progreso
						</Button>
					)}
				</Box>
			</Box>
		</GameCard>
	);
}; 