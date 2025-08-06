import { useState } from 'react'
import {
	TableCell,
	TableRow,
	IconButton,
	Tooltip,
	Chip,
	Avatar,
	Typography,
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button
} from '@mui/material'
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Visibility as ViewIcon,
	Block as BlockIcon,
	CheckCircle as CheckCircleIcon,
	Star as StarIcon,
	MonetizationOn as CoinsIcon,
	Person as PersonIcon
} from '@mui/icons-material'
import type { User } from '../../types/UserType'
import { useUserStore } from '../../store/userStore'
import { colors } from '../../styles/theme/colors'

interface UsersTableRowProps {
	user: User
}

export const UsersTableRow = ({ user }: UsersTableRowProps) => {
	const { updateUserStatus, deleteUser } = useUserStore()
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)

	const handleStatusToggle = async () => {
		await updateUserStatus(user.id, !user.isActive)
	}

	const handleDelete = async () => {
		await deleteUser(user.id)
		setShowDeleteDialog(false)
	}

	const formatDate = (dateString: string | null) => {
		if (!dateString) return 'Nunca'
		return new Date(dateString).toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		})
	}

	return (
		<>
			<TableRow
				sx={{
					'&:hover': {
						background: 'rgba(255, 255, 255, 0.05)'
					}
				}}
			>
				{/* User Info */}
				<TableCell>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Avatar
							sx={{
								background: colors.primary.main,
								width: 40,
								height: 40
							}}
						>
							<PersonIcon />
						</Avatar>
						<Box>
							<Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
								{user.name}
							</Typography>
							<Typography variant="caption" sx={{ color: colors.text.secondary }}>
								{user.email}
							</Typography>
						</Box>
					</Box>
				</TableCell>

				{/* Section */}
				<TableCell>
					<Chip
						label={`${user.section}`}
						size="small"
						sx={{
							background: 'rgba(66, 133, 244, 0.2)',
							color: colors.primary.main,
							border: `1px solid ${colors.primary.main}`
						}}
					/>
				</TableCell>

				{/* Level */}
				<TableCell>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<StarIcon sx={{ color: colors.accent.main, fontSize: 16 }} />
						<Typography variant="body2" sx={{ color: 'white' }}>
							{user.level}
						</Typography>
					</Box>
				</TableCell>

				{/* XaviCoins */}
				<TableCell>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<CoinsIcon sx={{ color: colors.accent.main, fontSize: 16 }} />
						<Typography variant="body2" sx={{ color: 'white' }}>
							{user.xavicoints}
						</Typography>
					</Box>
				</TableCell>

				{/* Status */}
				<TableCell>
					<Chip
						label={user.isActive ? 'Activo' : 'Inactivo'}
						color={user.isActive ? 'success' : 'error'}
						size="small"
						icon={user.isActive ? <CheckCircleIcon /> : <BlockIcon />}
						sx={{
							background: user.isActive 
								? 'rgba(76, 175, 80, 0.2)' 
								: 'rgba(244, 67, 54, 0.2)',
							border: `1px solid ${user.isActive ? '#4CAF50' : '#F44336'}`
						}}
					/>
				</TableCell>

				{/* Last Login */}
				<TableCell>
					<Typography variant="body2" sx={{ color: colors.text.secondary }}>
						{formatDate(user.lastLogin)}
					</Typography>
				</TableCell>

				{/* Actions */}
				<TableCell align="center">
					<Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
						<Tooltip title="Ver detalles">
							<IconButton
								size="small"
								sx={{
									color: colors.primary.main,
									'&:hover': {
										background: 'rgba(66, 133, 244, 0.2)'
									}
								}}
							>
								<ViewIcon />
							</IconButton>
						</Tooltip>

						<Tooltip title="Editar usuario">
							<IconButton
								size="small"
								sx={{
									color: colors.accent.main,
									'&:hover': {
										background: 'rgba(255, 152, 0, 0.2)'
									}
								}}
							>
								<EditIcon />
							</IconButton>
						</Tooltip>

						<Tooltip title={user.isActive ? 'Desactivar' : 'Activar'}>
							<IconButton
								size="small"
								onClick={handleStatusToggle}
								sx={{
									color: user.isActive ? colors.accent.dark : colors.accent.light,
									'&:hover': {
										background: user.isActive 
											? 'rgba(244, 67, 54, 0.2)' 
											: 'rgba(76, 175, 80, 0.2)'
									}
								}}
							>
								{user.isActive ? <BlockIcon /> : <CheckCircleIcon />}
							</IconButton>
						</Tooltip>

						<Tooltip title="Eliminar usuario">
							<IconButton
								size="small"
								onClick={() => setShowDeleteDialog(true)}
								sx={{
									color: colors.accent.dark,
									'&:hover': {
										background: 'rgba(244, 67, 54, 0.2)'
									}
								}}
							>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					</Box>
				</TableCell>
			</TableRow>

			{/* Delete Confirmation Dialog */}
			<Dialog
				open={showDeleteDialog}
				onClose={() => setShowDeleteDialog(false)}
				PaperProps={{
					sx: {
						background: 'rgba(40, 40, 40, 0.95)',
						backdropFilter: 'blur(20px)',
						border: `1px solid ${colors.border.primary}`,
						color: 'white'
					}
				}}
			>
				<DialogTitle>Confirmar eliminación</DialogTitle>
				<DialogContent>
					<Typography>
						¿Estás seguro de que quieres eliminar al usuario "{user.name}"? Esta acción no se puede deshacer.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setShowDeleteDialog(false)}
						sx={{ color: colors.text.secondary }}
					>
						Cancelar
					</Button>
					<Button
						onClick={handleDelete}
						color="error"
						variant="contained"
					>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
} 