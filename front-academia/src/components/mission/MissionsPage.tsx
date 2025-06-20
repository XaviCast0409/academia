import {
	Box,
	Typography,
	Container,
	CircularProgress,
	Alert,
	useMediaQuery,
	useTheme,
	Tabs,
	Tab,
	Paper
} from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useState, useEffect } from "react";
import { MissionCard } from "./MissionCard";
import { useMissionStore } from "../../store/missionStore";

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
	const token = localStorage.getItem('auth-storage');
	const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
	const userId = user?.id;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
		// Aquí necesitarías el userId del usuario actual
		// Por ahora usamos un valor temporal
		loadMissions(userId);
	}, [loadMissions]);

	const handleMissionUpdate = () => {
		// Recargar misiones cuando se actualice una
		// Esto debería venir del contexto de autenticación
		loadMissions(userId);
	};

	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	const handleCloseError = () => {
		clearError();
	};

	if (loading) {
		return (
			<Container maxWidth="lg" sx={{ py: 4 }}>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					minHeight="400px"
				>
					<CircularProgress size={60} sx={{ color: '#E07F3F', mb: 2 }} />
					<Typography variant="h6" color="#0D3745">
						Cargando misiones...
					</Typography>
				</Box>
			</Container>
		);
	}

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			{/* Header */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 2,
					mb: 4,
					flexDirection: isMobile ? 'column' : 'row',
				}}
			>
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
				<Box>
					<Typography
						variant="h4"
						fontWeight={700}
						color="#0D3745"
						sx={{ fontSize: isMobile ? '1.8rem' : '2.5rem' }}
					>
						Mis Misiones
					</Typography>
					<Typography
						variant="body1"
						color="#555"
						sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
					>
						Completa misiones para ganar recompensas y subir de nivel
					</Typography>
				</Box>
			</Box>

			{/* Error Alert */}
			{error && (
				<Alert severity="error" sx={{ mb: 3 }} onClose={handleCloseError}>
					{error}
				</Alert>
			)}

			{/* Tabs */}
			<Paper sx={{ mb: 3, borderRadius: 3 }}>
				<Tabs
					value={activeTab}
					onChange={handleTabChange}
					sx={{
						'& .MuiTab-root': {
							fontWeight: 600,
							fontSize: isMobile ? '0.9rem' : '1rem',
							textTransform: 'none',
							minHeight: 60,
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
						label={`Misiones Activas (${activeMissions.length})`}
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
		</Container>
	);
}; 