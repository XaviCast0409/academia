import { Box, Typography, Paper } from '@mui/material'
import { backgroundUtils, typographyUtils } from '../../styles/utils/themeUtils'
import { colors } from '../../styles/theme/colors'

export const Dashboard = () => {
	return (
		<Box sx={{
			...backgroundUtils.mainBackground,
			minHeight: '100vh',
			width: '100vw',
			p: 4,
			position: 'relative'
		}}>
			{/* Welcome Section */}
			<Box sx={{ mb: 4 }}>
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
					Dashboard
				</Typography>
				<Typography
					variant="h6"
					sx={{
						color: colors.text.secondary,
						fontWeight: 400,
						letterSpacing: '0.5px'
					}}
				>
					Bienvenido al panel de administración de Academia
				</Typography>
			</Box>

			{/* Content Cards */}
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
				<Paper
					sx={{
						background: 'rgba(40, 40, 40, 0.8)',
						backdropFilter: 'blur(20px)',
						border: `1px solid ${colors.border.primary}`,
						borderRadius: 3,
						p: 4,
						transition: 'all 0.3s ease',
						'&:hover': {
							transform: 'translateY(-2px)',
							boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
							border: `1px solid ${colors.border.secondary}`
						}
					}}
				>
					<Typography
						variant="h5"
						sx={{
							color: colors.text.primary,
							fontWeight: 600,
							mb: 2
						}}
					>
						Resumen del Sistema
					</Typography>
					<Typography
						variant="body1"
						sx={{
							color: colors.text.secondary,
							lineHeight: 1.6
						}}
					>
						El sistema está funcionando correctamente. Aquí puedes gestionar usuarios, roles, actividades, evidencias, transacciones, productos, misiones y logros.
					</Typography>
				</Paper>

				<Paper
					sx={{
						background: 'rgba(40, 40, 40, 0.8)',
						backdropFilter: 'blur(20px)',
						border: `1px solid ${colors.border.primary}`,
						borderRadius: 3,
						p: 4,
						transition: 'all 0.3s ease',
						'&:hover': {
							transform: 'translateY(-2px)',
							boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
							border: `1px solid ${colors.border.secondary}`
						}
					}}
				>
					<Typography
						variant="h5"
						sx={{
							color: colors.text.primary,
							fontWeight: 600,
							mb: 2
						}}
					>
						Acciones Rápidas
					</Typography>
					<Typography
						variant="body1"
						sx={{
							color: colors.text.secondary,
							lineHeight: 1.6
						}}
					>
						Utiliza el menú lateral para navegar entre las diferentes secciones del sistema. Cada módulo te permitirá gestionar su respectiva funcionalidad.
					</Typography>
				</Paper>
			</Box>
		</Box>
	)
} 