import { useState } from 'react'
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'
import { Logout as LogoutIcon } from '@mui/icons-material'
import { Sidebar } from '../sidebar/Sidebar'
import { backgroundUtils } from '../../styles/utils/themeUtils'
import { useAuth } from '../../context/AuthContext'
import { colors } from '../../styles/theme/colors'
import { useNavigate } from 'react-router-dom'

interface LayoutAdminProps {
	children: React.ReactNode
	currentRoute?: string
	onNavigate?: (route: string) => void
}

export const LayoutAdmin = ({ children, currentRoute, onNavigate }: LayoutAdminProps) => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const { user, logout } = useAuth()
	const navigate = useNavigate()

	const handleSidebarToggle = () => {
		setSidebarOpen(!sidebarOpen)
	}

	const handleNavigate = (route: string) => {
		console.log('Navigating to:', route)
		onNavigate?.(route) // Call the parent's onNavigate if provided
		setSidebarOpen(false) // Cerrar sidebar en móvil después de navegar
	}

	const handleLogout = () => {
		logout()
		navigate('/login', { replace: true })
	}

	return (
		<Box sx={{ display: 'flex', minHeight: '100vh' }}>
			{/* Sidebar */}
			<Sidebar
				open={sidebarOpen}
				onToggle={handleSidebarToggle}
				onNavigate={handleNavigate}
				currentRoute={currentRoute}
			/>

			{/* Main Content */}
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					...backgroundUtils.mainBackground,
					ml: { xs: 0, md: '240px' } // Reducido de 280px a 240px para más espacio
				}}
			>
				{/* Header */}
				<AppBar
					position="static"
					sx={{
						background: 'rgba(40, 40, 40, 0.95)',
						backdropFilter: 'blur(20px)',
						borderBottom: `1px solid ${colors.border.primary}`,
						boxShadow: 'none'
					}}
				>
					<Toolbar sx={{ justifyContent: 'space-between' }}>
						<Typography
							variant="h6"
							sx={{
								color: colors.text.primary,
								fontWeight: 600,
								background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
								backgroundClip: 'text',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent'
							}}
						>
							Admin Panel
						</Typography>
						
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<Typography
								variant="body2"
								sx={{ color: colors.text.secondary }}
							>
								{user?.name || 'Usuario'}
							</Typography>
							<IconButton
								onClick={handleLogout}
								sx={{
									color: colors.text.secondary,
									'&:hover': {
										color: colors.error.main,
										background: 'rgba(244, 67, 54, 0.1)'
									}
								}}
							>
								<LogoutIcon />
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>

				{/* Content */}
				<Box sx={{ flex: 1, overflow: 'auto' }}>
					{children}
				</Box>
			</Box>
		</Box>
	)
}
