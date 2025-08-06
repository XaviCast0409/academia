import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { componentStyles } from '../../styles/utils/themeUtils'
import { colors } from '../../styles/theme/colors'
import { transitions } from '../../styles/theme/transitions'

interface NavigationItemProps {
	id: string
	label: string
	icon: React.ReactNode
	route: string
	isActive: boolean
	isHovered: boolean
	onClick: (route: string) => void
	onMouseEnter: (itemId: string) => void
	onMouseLeave: () => void
}

export const NavigationItem = ({
	id,
	label,
	icon,
	route,
	isActive,
	isHovered,
	onClick,
	onMouseEnter,
	onMouseLeave
}: NavigationItemProps) => {
	return (
		<ListItem disablePadding sx={{ mb: 1 }}>
			<ListItemButton
				onClick={() => onClick(route)}
				onMouseEnter={() => onMouseEnter(id)}
				onMouseLeave={onMouseLeave}
				sx={{
					...componentStyles.sidebarItem(isActive, isHovered),
					borderRadius: 2,
					mx: 1,
					px: 2,
					py: 1.5,
					position: 'relative',
					overflow: 'hidden',
					'&::before': {
						content: '""',
						position: 'absolute',
						left: 0,
						top: 0,
						bottom: 0,
						width: isActive ? '4px' : '0px',
						background: colors.primary.main,
						borderRadius: '0 2px 2px 0',
						transition: transitions.default
					},
					'&:hover::before': {
						width: '4px'
					}
				}}
			>
				<ListItemIcon
					sx={{
						minWidth: 40,
						color: isActive 
							? colors.primary.main
							: isHovered
							? colors.text.primary
							: colors.text.muted,
						transition: transitions.components.sidebar.icon,
						filter: isActive ? 'drop-shadow(0 0 8px rgba(66, 133, 244, 0.5))' : 'none'
					}}
				>
					{icon}
				</ListItemIcon>
				<ListItemText
					primary={label}
					sx={{
						'& .MuiTypography-root': {
							color: isActive 
								? colors.text.primary
								: isHovered
								? colors.text.primary
								: colors.text.secondary,
							fontWeight: isActive ? 600 : 500,
							fontSize: '0.9rem',
							letterSpacing: '0.3px',
							transition: transitions.components.sidebar.text
						}
					}}
				/>
			</ListItemButton>
		</ListItem>
	)
} 