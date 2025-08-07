import React from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Box,
	Chip,
	IconButton,
	Tooltip
} from '@mui/material'
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as ViewIcon
} from '@mui/icons-material'
import type { ActivityWithDetails } from '../../types/ActivityTypes'
import { colors } from '../../styles/theme/colors'

interface ActivitiesTableProps {
	activities: ActivityWithDetails[]
	onEdit?: (activity: ActivityWithDetails) => void
	onDelete?: (activity: ActivityWithDetails) => void
	onView?: (activity: ActivityWithDetails) => void
}

export const ActivitiesTable: React.FC<ActivitiesTableProps> = ({
	activities,
	onEdit,
	onDelete,
	onView
}) => {
	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty?.toLowerCase()) {
			case 'beginner':
				return '#4CAF50'
			case 'intermediate':
				return '#FF9800'
			case 'advanced':
				return '#F44336'
			case 'expert':
				return '#9C27B0'
			default:
				return '#757575'
		}
	}

	const truncateText = (text: string, maxLength: number = 50) => {
		if (text.length <= maxLength) return text
		return text.substring(0, maxLength) + '...'
	}

	return (
		<Box sx={{ p: 3, width: '80vw' }}>
			<TableContainer
				component={Paper}
				sx={{
					background: 'rgba(40, 40, 40, 0.8)',
					backdropFilter: 'blur(20px)',
					border: `1px solid ${colors.border.primary}`,
					borderRadius: 3,
					boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
					width: '100%'
				}}
			>
				<Table >
					<TableHead>
						<TableRow sx={{ background: 'rgba(66, 133, 244, 0.1)' }}>
							<TableCell sx={{ color: colors.text.primary, fontWeight: 600, borderBottom: `1px solid ${colors.border.primary}` }}>
								Título
							</TableCell>
							<TableCell sx={{ color: colors.text.primary, fontWeight: 600, borderBottom: `1px solid ${colors.border.primary}` }}>
								Descripción
							</TableCell>
							<TableCell sx={{ color: colors.text.primary, fontWeight: 600, borderBottom: `1px solid ${colors.border.primary}` }}>
								Profesor
							</TableCell>
							<TableCell sx={{ color: colors.text.primary, fontWeight: 600, borderBottom: `1px solid ${colors.border.primary}` }}>
								Xavicoints
							</TableCell>
							<TableCell sx={{ color: colors.text.primary, fontWeight: 600, borderBottom: `1px solid ${colors.border.primary}` }}>
								Dificultad
							</TableCell>
							<TableCell sx={{ color: colors.text.primary, fontWeight: 600, borderBottom: `1px solid ${colors.border.primary}` }}>
								Sección
							</TableCell>
							<TableCell sx={{ color: colors.text.primary, fontWeight: 600, borderBottom: `1px solid ${colors.border.primary}` }}>
								Acciones
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{activities.map((activity) => (
							<TableRow
								key={activity.id}
								sx={{
									'&:nth-of-type(odd)': {
										background: 'rgba(255, 255, 255, 0.02)'
									},
									'&:hover': {
										background: 'rgba(66, 133, 244, 0.05)',
										transform: 'scale(1.01)',
										transition: 'all 0.2s ease'
									},
									borderBottom: `1px solid ${colors.border.primary}`
								}}
							>
								<TableCell sx={{ color: colors.text.primary, borderBottom: `1px solid ${colors.border.primary}` }}>
									<Typography variant="body2" sx={{ fontWeight: 500 }}>
										{activity.title}
									</Typography>
								</TableCell>
								<TableCell sx={{ color: colors.text.secondary, borderBottom: `1px solid ${colors.border.primary}` }}>
									<Typography variant="body2">
										{truncateText(activity.description)}
									</Typography>
								</TableCell>
								<TableCell sx={{ color: colors.text.primary, borderBottom: `1px solid ${colors.border.primary}` }}>
									<Typography variant="body2">
										{activity.professor?.name || 'N/A'}
									</Typography>
								</TableCell>
								<TableCell sx={{ color: colors.text.primary, borderBottom: `1px solid ${colors.border.primary}` }}>
									<Chip
										label={`${activity.xavicoints} XP`}
										size="small"
										sx={{
											background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
											color: '#000',
											fontWeight: 600,
											fontSize: '0.75rem'
										}}
									/>
								</TableCell>
								<TableCell sx={{ color: colors.text.primary, borderBottom: `1px solid ${colors.border.primary}` }}>
									<Chip
										label={activity.difficulty || 'N/A'}
										size="small"
										sx={{
											background: getDifficultyColor(activity.difficulty || ''),
											color: 'white',
											fontWeight: 600,
											fontSize: '0.75rem',
											textTransform: 'capitalize'
										}}
									/>
								</TableCell>
								<TableCell sx={{ color: colors.text.primary, borderBottom: `1px solid ${colors.border.primary}` }}>
									<Typography variant="body2">
										{activity.section || 'N/A'}
									</Typography>
								</TableCell>
								<TableCell sx={{ color: colors.text.primary, borderBottom: `1px solid ${colors.border.primary}` }}>
									<Box sx={{ display: 'flex', gap: 1 }}>
										{onView && (
											<Tooltip title="Ver detalles">
												<IconButton
													size="small"
													onClick={() => onView(activity)}
													sx={{
														color: colors.primary.main,
														'&:hover': {
															background: 'rgba(66, 133, 244, 0.1)'
														}
													}}
												>
													<ViewIcon />
												</IconButton>
											</Tooltip>
										)}
										{onEdit && (
											<Tooltip title="Editar">
												<IconButton
													size="small"
													onClick={() => onEdit(activity)}
													sx={{
														color: colors.error.main,
														'&:hover': {
															background: 'rgba(244, 67, 54, 0.1)'
														}
													}}
												>
													<EditIcon />
												</IconButton>
											</Tooltip>
										)}
										{onDelete && (
											<Tooltip title="Eliminar">
												<IconButton
													size="small"
													onClick={() => onDelete(activity)}
													sx={{
														color: colors.error.main,
														'&:hover': {
															background: 'rgba(244, 67, 54, 0.1)'
														}
													}}
												>
													<DeleteIcon />
												</IconButton>
											</Tooltip>
										)}
									</Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}
