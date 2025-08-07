import React, { useState, useEffect } from 'react'
import {
	Box,
	Typography,
	Paper,
	CircularProgress,
	Alert,
	Button,
	Grid
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { ActivitiesTable } from './ActivitiesTable'
import { CreateActivityModal } from './CreateActivityModal'
import { activityService } from '../../service/activityService'
import type { ActivityWithDetails } from '../../types/ActivityTypes'
import { backgroundUtils, typographyUtils } from '../../styles/utils/themeUtils'
import { colors } from '../../styles/theme/colors'

export const ActivitiesView: React.FC = () => {
	console.log('ActivitiesView: Component loaded')
	const [activities, setActivities] = useState<ActivityWithDetails[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

	useEffect(() => {
		console.log('ActivitiesView: useEffect triggered')
		loadActivities()
	}, [])

	const loadActivities = async () => {
		try {
			setLoading(true)
			setError(null)
			const data = await activityService.getActivities()
			setActivities(data)
		} catch (err) {
			setError('Error al cargar las actividades. Por favor, inténtalo de nuevo.')
			console.error('Error loading activities:', err)
		} finally {
			setLoading(false)
		}
	}

	const handleView = (activity: ActivityWithDetails) => {
		console.log('Ver actividad:', activity)
		// TODO: Implementar vista de detalles
	}

	const handleEdit = (activity: ActivityWithDetails) => {
		console.log('Editar actividad:', activity)
		// TODO: Implementar edición
	}

	const handleDelete = async (activity: ActivityWithDetails) => {
		if (window.confirm(`¿Estás seguro de que quieres eliminar la actividad "${activity.title}"?`)) {
			try {
				await activityService.deleteActivity(activity.id)
				await loadActivities() // Recargar la lista
			} catch (err) {
				setError('Error al eliminar la actividad. Por favor, inténtalo de nuevo.')
				console.error('Error deleting activity:', err)
			}
		}
	}

	const handleCreate = () => {
		console.log('Crear nueva actividad')
		setIsCreateModalOpen(true)
	}

	const handleCreateSuccess = () => {
		loadActivities() // Recargar la lista después de crear
	}

	if (loading) {
		return (
			<Box sx={{
				...backgroundUtils.mainBackground,
				minHeight: '100vh',
				width: '100%'
			}}>
				<CircularProgress
					sx={{
						color: colors.primary.main,
						'& .MuiCircularProgress-circle': {
							strokeLinecap: 'round',
						}
					}}
				/>
			</Box>
		)
	}

	return (
		<Box sx={{
			...backgroundUtils.mainBackground,
			minHeight: '100vh',
			width: '85vw',
		}}>
			{/* Header Section */}
			<Box sx={{ p: 3 }}>
				<Typography
					variant="h3"
					sx={{
						...typographyUtils.title,
						fontSize: '2.5rem',
						fontWeight: 800,
						mb: 2,
						background: 'linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FF6B6B 100%)',
						backgroundClip: 'text',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent'
					}}
				>
					Actividades
				</Typography>
				<Typography
					variant="h6"
					sx={{
						color: colors.text.secondary,
						fontWeight: 400,
						letterSpacing: '0.5px',
						p: 3
					}}
				>
					Gestiona todas las actividades del sistema
				</Typography>
			</Box>

			{/* Error Alert */}
			{error && (
				<Alert
					severity="error"
					sx={{
						mb: 3,
						background: 'rgba(244, 67, 54, 0.1)',
						border: `1px solid ${colors.error.main}`,
						color: colors.error.main
					}}
				>
					{error}
				</Alert>
			)}

			{/* Stats Cards */}
			<Grid container spacing={3} sx={{ mb: 4, p: 3 }}>
				<Grid >
					<Paper
						sx={{
							background: 'rgba(40, 40, 40, 0.8)',
							backdropFilter: 'blur(20px)',
							border: `1px solid ${colors.border.primary}`,
							borderRadius: 3,
							p: 3,
							textAlign: 'center',
							transition: 'all 0.3s ease',
							'&:hover': {
								transform: 'translateY(-2px)',
								boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
								border: `1px solid ${colors.border.secondary}`
							}
						}}
					>
						<Typography variant="h4" sx={{ color: colors.primary.main, fontWeight: 700 }}>
							{activities.length}
						</Typography>
						<Typography variant="body2" sx={{ color: colors.text.secondary }}>
							Total Actividades
						</Typography>
					</Paper>
				</Grid>
				<Grid >
					<Paper
						sx={{
							background: 'rgba(40, 40, 40, 0.8)',
							backdropFilter: 'blur(20px)',
							border: `1px solid ${colors.border.primary}`,
							borderRadius: 3,
							p: 3,
							textAlign: 'center',
							transition: 'all 0.3s ease',
							'&:hover': {
								transform: 'translateY(-2px)',
								boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
								border: `1px solid ${colors.border.secondary}`
							}
						}}
					>
						<Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 700 }}>
							{activities.filter(a => a.difficulty === 'beginner').length}
						</Typography>
						<Typography variant="body2" sx={{ color: colors.text.secondary }}>
							Principiantes
						</Typography>
					</Paper>
				</Grid>
				<Grid >
					<Paper
						sx={{
							background: 'rgba(40, 40, 40, 0.8)',
							backdropFilter: 'blur(20px)',
							border: `1px solid ${colors.border.primary}`,
							borderRadius: 3,
							p: 3,
							textAlign: 'center',
							transition: 'all 0.3s ease',
							'&:hover': {
								transform: 'translateY(-2px)',
								boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
								border: `1px solid ${colors.border.secondary}`
							}
						}}
					>
						<Typography variant="h4" sx={{ color: '#FF9800', fontWeight: 700 }}>
							{activities.filter(a => a.difficulty === 'intermediate').length}
						</Typography>
						<Typography variant="body2" sx={{ color: colors.text.secondary }}>
							Intermedios
						</Typography>
					</Paper>
				</Grid>
				<Grid >
					<Paper
						sx={{
							background: 'rgba(40, 40, 40, 0.8)',
							backdropFilter: 'blur(20px)',
							border: `1px solid ${colors.border.primary}`,
							borderRadius: 3,
							p: 3,
							textAlign: 'center',
							transition: 'all 0.3s ease',
							'&:hover': {
								transform: 'translateY(-2px)',
								boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
								border: `1px solid ${colors.border.secondary}`
							}
						}}
					>
						<Typography variant="h4" sx={{ color: '#F44336', fontWeight: 700 }}>
							{activities.filter(a => a.difficulty === 'advanced' || a.difficulty === 'expert').length}
						</Typography>
						<Typography variant="body2" sx={{ color: colors.text.secondary }}>
							Avanzados
						</Typography>
					</Paper>
				</Grid>
			</Grid>

			{/* Actions Bar */}
			<Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
				<Typography variant="h5" sx={{ color: colors.text.primary, fontWeight: 600 }}>
					Lista de Actividades
				</Typography>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={handleCreate}
					sx={{
						background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
						color: 'white',
						fontWeight: 600,
						px: 3,
						py: 1.5,
						borderRadius: 2,
						textTransform: 'none',
						boxShadow: '0 4px 20px rgba(66, 133, 244, 0.3)',
						'&:hover': {
							background: 'linear-gradient(135deg, #3367D6 0%, #2E7D32 100%)',
							transform: 'translateY(-1px)',
							boxShadow: '0 6px 25px rgba(66, 133, 244, 0.4)'
						}
					}}
				>
					Nueva Actividad
				</Button>
			</Box>

			{/* Activities Table */}
			{activities.length > 0 ? (
				<ActivitiesTable
					activities={activities}
					onView={handleView}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			) : (
				<Paper
					sx={{
						background: 'rgba(40, 40, 40, 0.8)',
						backdropFilter: 'blur(20px)',
						border: `1px solid ${colors.border.primary}`,
						borderRadius: 3,
						p: 8,
						textAlign: 'center'
					}}
				>
					<Typography variant="h6" sx={{ color: colors.text.secondary, mb: 2 }}>
						No hay actividades disponibles
					</Typography>
					<Typography variant="body2" sx={{ color: colors.text.secondary }}>
						Crea la primera actividad para comenzar
					</Typography>
				</Paper>
			)}

			{/* Create Activity Modal */}
			<CreateActivityModal
				open={isCreateModalOpen}
				onClose={() => setIsCreateModalOpen(false)}
				onSuccess={handleCreateSuccess}
			/>
		</Box>
	)
}
