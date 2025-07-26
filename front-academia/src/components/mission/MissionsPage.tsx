import {
	Box,
	Alert,
	Tabs,
	Tab,
	Paper,
	Typography
} from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useState, useEffect } from "react";
import { MissionCard } from "./MissionCard";
import { useMissionStore } from "../../store/missionStore";
import { PageHeader, LoadingSpinner } from '../common';
import { getCurrentUser } from '../../utils/common';
import { useResponsive } from '../../shared';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`missions-tabpanel-${index}`}
			aria-labelledby={`missions-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
		</div>
	);
}

export const MissionsPage = () => {
	const user = getCurrentUser();
	const userId = user?.id;
	const { isMobile } = useResponsive();
	const [activeTab, setActiveTab] = useState(0);

	const {
		activeMissions,
		completedMissions,
		loading,
		error,
		loadMissions,
		clearError
	} = useMissionStore();

	useEffect(() => {
		loadMissions(userId);
	}, [loadMissions, userId]);

	const handleMissionUpdate = () => {
		loadMissions(userId);
	};

	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	const handleCloseError = () => {
		clearError();
	};

	if (loading) {
		return <LoadingSpinner message="Cargando misiones..." />;
	}

	return (
		<Box sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: 60,
						height: 60,
						bgcolor: '#E07F3F',
						borderRadius: 3,
						boxShadow: '0 4px 12px rgba(224,127,63,0.3)',
					}}
				>
					<AssignmentIcon sx={{ color: 'white', fontSize: 30 }} />
				</Box>
				<PageHeader 
					title="Mis Misiones"
					subtitle="Completa misiones para ganar recompensas y subir de nivel"
				/>
			</Box>

			{/* Error Alert */}
			{error && (
				<Alert severity="error" sx={{ mb: 3 }} onClose={handleCloseError}>
					{error}
				</Alert>
			)}

			{/* Tabs */}
			<Paper sx={{ mb: 3, borderRadius: 3, border: '2px solid #E07F3F' }}>
				<Tabs
					value={activeTab}
					onChange={handleTabChange}
					sx={{
						'& .MuiTab-root': {
							fontWeight: 600,
							fontSize: isMobile ? '0.8rem' : '1rem',
							textTransform: 'none',
							minHeight: 60,
							fontFamily: "'Press Start 2P', cursive",
						},
						'& .Mui-selected': {
							color: '#E07F3F',
						},
						'& .MuiTabs-indicator': {
							bgcolor: '#E07F3F',
						},
					}}
				>
					<Tab
						label={`Activas (${activeMissions.length})`}
						sx={{ flex: 1 }}
					/>
					<Tab
						label={`Completadas (${completedMissions.length})`}
						sx={{ flex: 1 }}
					/>
				</Tabs>
			</Paper>

			{/* Tab Panels */}
			<TabPanel value={activeTab} index={0}>
				{activeMissions.length === 0 ? (
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						minHeight="300px"
						sx={{ textAlign: 'center' }}
					>
						<AssignmentIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
						<Typography variant="h6" color="#666" mb={1}>
							No hay misiones activas
						</Typography>
						<Typography variant="body2" color="#999">
							Las misiones aparecerán aquí cuando estén disponibles
						</Typography>
					</Box>
				) : (
					<Box>
						{activeMissions.map((userMission) => (
							<MissionCard
								key={userMission.id}
								userMission={userMission}
								onMissionUpdate={handleMissionUpdate}
							/>
						))}
					</Box>
				)}
			</TabPanel>

			<TabPanel value={activeTab} index={1}>
				{completedMissions.length === 0 ? (
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						minHeight="300px"
						sx={{ textAlign: 'center' }}
					>
						<AssignmentIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
						<Typography variant="h6" color="#666" mb={1}>
							No hay misiones completadas
						</Typography>
						<Typography variant="body2" color="#999">
							Completa misiones para verlas aquí
						</Typography>
					</Box>
				) : (
					<Box>
						{completedMissions.map((userMission) => (
							<MissionCard
								key={userMission.id}
								userMission={userMission}
								onMissionUpdate={handleMissionUpdate}
							/>
						))}
					</Box>
				)}
			</TabPanel>
		</Box>
	);
}; 