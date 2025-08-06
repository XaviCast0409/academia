import { useState } from 'react'
import { Box } from '@mui/material'
import { Sidebar } from '../sidebar/Sidebar'
import { backgroundUtils } from '../../styles/utils/themeUtils'

interface LayoutAdminProps {
	children: React.ReactNode
	currentRoute?: string
	onNavigate?: (route: string) => void
}

export const LayoutAdmin = ({ children, currentRoute, onNavigate }: LayoutAdminProps) => {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const handleSidebarToggle = () => {
		setSidebarOpen(!sidebarOpen)
	}

	const handleNavigate = (route: string) => {
		console.log('Navigating to:', route)
		onNavigate?.(route) // Call the parent's onNavigate if provided
		setSidebarOpen(false) // Cerrar sidebar en móvil después de navegar
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
				{children}
			</Box>
		</Box>
	)
}
