import { useState } from 'react'
import {
	Box,
	Drawer,
	List,
	IconButton,
	Tooltip
} from '@mui/material'
import {
	People as PeopleIcon,
	Security as SecurityIcon,
	Event as EventIcon,
	Folder as FolderIcon,
	Payment as PaymentIcon,
	Inventory as InventoryIcon,
	Flag as FlagIcon,
	EmojiEvents as AchievementsIcon,
	Menu as MenuIcon
} from '@mui/icons-material'
import { NavigationItem } from '../navigation/NavigationItem'
import { SidebarHeader } from '../navigation/SidebarHeader'
import { SidebarFooter } from '../navigation/SidebarFooter'

interface SidebarProps {
	open: boolean
	onToggle: () => void
	onNavigate: (route: string) => void
	currentRoute?: string
}

interface MenuItem {
	id: string
	label: string
	icon: React.ReactNode
	route: string
}

const menuItems: MenuItem[] = [
	{
		id: 'users',
		label: 'Usuarios',
		icon: <PeopleIcon />,
		route: '/users'
	},
	{
		id: 'roles',
		label: 'Roles',
		icon: <SecurityIcon />,
		route: '/roles'
	},
	{
		id: 'activities',
		label: 'Actividades',
		icon: <EventIcon />,
		route: '/activities'
	},
	{
		id: 'evidence',
		label: 'Evidencias',
		icon: <FolderIcon />,
		route: '/evidence'
	},
	{
		id: 'transactions',
		label: 'Transacciones',
		icon: <PaymentIcon />,
		route: '/transactions'
	},
	{
		id: 'products',
		label: 'Productos',
		icon: <InventoryIcon />,
		route: '/products'
	},
	{
		id: 'missions',
		label: 'Misiones',
		icon: <FlagIcon />,
		route: '/missions'
	},
	{
		id: 'achievements',
		label: 'Logros',
		icon: <AchievementsIcon />,
		route: '/achievements'
	}
]

const drawerWidth = 240

export const Sidebar = ({ open, onToggle, onNavigate, currentRoute }: SidebarProps) => {
	const [hoveredItem, setHoveredItem] = useState<string | null>(null)

	const handleItemClick = (route: string) => {
		onNavigate(route)
	}

	const handleItemHover = (itemId: string | null) => {
		setHoveredItem(itemId)
	}

	return (
		<>
			{/* Mobile Menu Button */}
			<Box
				sx={{
					position: 'fixed',
					top: 16,
					left: 16,
					zIndex: 1200,
					display: { xs: 'block', md: 'none' }
				}}
			>
				<Tooltip title="Abrir menú">
					<IconButton
						onClick={onToggle}
						sx={{
							background: 'rgba(40, 40, 40, 0.95)',
							backdropFilter: 'blur(20px)',
							border: '1px solid rgba(255, 255, 255, 0.1)',
							color: 'white',
							boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
							'&:hover': {
								background: 'rgba(66, 133, 244, 0.2)',
								border: '1px solid rgba(66, 133, 244, 0.3)',
								transform: 'scale(1.05)'
							}
						}}
					>
						<MenuIcon />
					</IconButton>
				</Tooltip>
			</Box>

			{/* Desktop Sidebar */}
			<Box
				sx={{
					position: 'fixed',
					display: { xs: 'none', md: 'block' },
					width: drawerWidth,
					flexShrink: 0
				}}
			>
				<Drawer
					variant="permanent"
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							boxSizing: 'border-box',
							background: 'rgba(40, 40, 40, 0.95)',
							backdropFilter: 'blur(20px)',
							border: 'none',
							borderRight: '1px solid rgba(255, 255, 255, 0.1)',
							position: 'relative',
							boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)',
							'&::before': {
								content: '""',
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.05) 0%, transparent 50%, rgba(255, 255, 255, 0.02) 100%)',
								pointerEvents: 'none',
							}
						}
					}}
				>
					<SidebarContent
						menuItems={menuItems}
						currentRoute={currentRoute}
						onItemClick={handleItemClick}
						onItemHover={handleItemHover}
						hoveredItem={hoveredItem}
					/>
				</Drawer>
			</Box>

			{/* Mobile Sidebar */}
			<Drawer
				variant="temporary"
				open={open}
				onClose={onToggle}
				ModalProps={{
					keepMounted: true
				}}
				sx={{
					display: { xs: 'block', md: 'none' },
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						background: 'rgba(40, 40, 40, 0.95)',
						backdropFilter: 'blur(20px)',
						border: 'none',
						position: 'relative',
						boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)',
						'&::before': {
							content: '""',
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.05) 0%, transparent 50%, rgba(255, 255, 255, 0.02) 100%)',
							pointerEvents: 'none',
						}
					}
				}}
			>
				<SidebarContent
					menuItems={menuItems}
					currentRoute={currentRoute}
					onItemClick={handleItemClick}
					onItemHover={handleItemHover}
					hoveredItem={hoveredItem}
					onClose={onToggle}
				/>
			</Drawer>
		</>
	)
}

interface SidebarContentProps {
	menuItems: MenuItem[]
	currentRoute?: string
	onItemClick: (route: string) => void
	onItemHover: (itemId: string | null) => void
	hoveredItem: string | null
	onClose?: () => void
}

const SidebarContent = ({
	menuItems,
	currentRoute,
	onItemClick,
	onItemHover,
	hoveredItem,
	onClose
}: SidebarContentProps) => {
	return (
		<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			{/* Header */}
			<SidebarHeader
				onClose={onClose}
			/>
			{/* Navigation Menu */}
			<Box sx={{ flex: 1, overflow: 'auto', px: 1 }}>
				<List sx={{ py: 1 }}>
					{menuItems.map((item) => {
						const isActive = currentRoute === item.route
						const isHovered = hoveredItem === item.id

						return (
							<NavigationItem
								key={item.id}
								id={item.id}
								label={item.label}
								icon={item.icon}
								route={item.route}
								isActive={isActive}
								isHovered={isHovered}
								onClick={onItemClick}
								onMouseEnter={onItemHover}
								onMouseLeave={() => onItemHover(null)}
							/>
						)
					})}
				</List>
			</Box>

			{/* Footer */}
			<SidebarFooter />
		</Box>
	)
}
