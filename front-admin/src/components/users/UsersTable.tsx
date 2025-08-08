import { useEffect } from 'react'
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	Typography,
	LinearProgress,
	Alert
} from '@mui/material'
import { useUserStore } from '../../store/userStore'
import type { UserFilters } from '../../types/UserType'
import { colors } from '../../styles/theme/colors'
import { UsersFilters } from './UsersFilters'
import { UsersTableRow } from './UsersTableRow'

export const UsersTable = () => {
	const {
		users,
		loading,
		error,
		filters,
		pagination,
		fetchUsers,
		setPage,
		setFilters
	} = useUserStore()

	useEffect(() => {
		fetchUsers()
	}, [])

	const handlePageChange = (_event: unknown, newPage: number) => {
		setPage(newPage + 1)
	}

	const handleFiltersChange = (newFilters: Partial<UserFilters>) => {
		setFilters(newFilters)
	}

	if (error) {
		return (
			<Box sx={{ p: 3 }}>
				<Alert severity="error" sx={{ mb: 2 }}>
					Error: {error}
				</Alert>
				<Typography variant="body2" sx={{ color: colors.text.secondary }}>
					Intenta recargar la página o verificar la conexión al servidor.
				</Typography>
			</Box>
		)
	}

	return (
		<Box sx={{ p: 3, width: '80vw' }}>
			{/* Header */}
			<Box sx={{ mb: 3 }}>
				<Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
					Gestión de Usuarios
				</Typography>
				<Typography variant="body1" sx={{ color: colors.text.secondary }}>
					Administra todos los usuarios del sistema
				</Typography>
			</Box>

			{/* Filters */}
			<UsersFilters
				filters={filters}
				onFiltersChange={handleFiltersChange}
			/>

			{/* Table */}
			<Paper
				sx={{
					background: 'rgba(40, 40, 40, 0.8)',
					backdropFilter: 'blur(20px)',
					border: `1px solid ${colors.border.primary}`,
					borderRadius: 2,
					overflow: 'hidden'
				}}
			>
				{loading && (
					<LinearProgress
						sx={{
							backgroundColor: 'rgba(255, 255, 255, 0.1)',
							'& .MuiLinearProgress-bar': {
								backgroundColor: colors.primary.main
							}
						}}
					/>
				)}

				<TableContainer>
					<Table>
						<TableHead>
							<TableRow sx={{ background: 'rgba(255, 255, 255, 0.05)' }}>
								<TableCell sx={{ color: 'white', fontWeight: 600 }}>Usuario</TableCell>
								<TableCell sx={{ color: 'white', fontWeight: 600 }}>Sección</TableCell>
								<TableCell sx={{ color: 'white', fontWeight: 600 }}>Nivel</TableCell>
								<TableCell sx={{ color: 'white', fontWeight: 600 }}>XaviCoins</TableCell>
								<TableCell sx={{ color: 'white', fontWeight: 600 }}>Estado</TableCell>
								<TableCell sx={{ color: 'white', fontWeight: 600 }}>Último Login</TableCell>
								<TableCell sx={{ color: 'white', fontWeight: 600, textAlign: 'center' }}>Acciones</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.length > 0 ? (
								users.map((user) => (
									<UsersTableRow key={user.id} user={user} />
								))
							) : (
								<TableRow>
									<TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
										<Typography variant="body1" sx={{ color: colors.text.secondary }}>
											{loading ? 'Cargando usuarios...' : 'No se encontraron usuarios'}
										</Typography>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>

				{/* Pagination */}
				{pagination.total > 0 && (
					<TablePagination
						component="div"
						count={pagination.total}
						page={pagination.currentPage - 1}
						onPageChange={handlePageChange}
						rowsPerPage={filters.limit}
                        rowsPerPageOptions={[10]}
						sx={{
							color: 'white',
							'& .MuiTablePagination-selectIcon': {
								color: 'white'
							},
							'& .MuiTablePagination-select': {
								color: 'white'
							}
						}}
					/>
				)}
			</Paper>

			{/* Results Info */}
			{pagination.total > 0 && (
				<Box sx={{ mt: 2, textAlign: 'center' }}>
					<Typography variant="body2" sx={{ color: colors.text.secondary }}>
						Mostrando {users.length} de {pagination.total} usuarios
					</Typography>
				</Box>
			)}
		</Box>
	)
} 