import { Box, Typography, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { typographyUtils } from '../../styles/utils/themeUtils'
import { colors } from '../../styles/theme/colors'
import { hoverEffects } from '../../styles/utils/themeUtils'

interface SidebarHeaderProps {
	onClose?: () => void
}

export const SidebarHeader = ({ onClose }: SidebarHeaderProps) => {
	return (
		<Box
			sx={{
				p: 3,
				borderBottom: `1px solid ${colors.border.primary}`,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.1) 0%, transparent 100%)',
				borderRadius: '8px 8px 0 0',
				mb: 2
			}}
		>
			<Box>
				<Typography
					variant="h5"
					sx={{
						...typographyUtils.title,
						fontSize: '1.5rem',
						fontWeight: 700,
						background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
						backgroundClip: 'text',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						mb: 0.5
					}}
				>
					ACADEMIA
				</Typography>
				<Typography
					variant="body2"
					sx={{
						color: colors.text.secondary,
						fontSize: '0.875rem',
						fontWeight: 500,
						letterSpacing: '1px',
						textTransform: 'uppercase'
					}}
				>
					ADMIN
				</Typography>
			</Box>
			
			{onClose && (
				<IconButton
					onClick={onClose}
					sx={{
						color: colors.text.muted,
						background: 'rgba(255, 255, 255, 0.05)',
						border: `1px solid ${colors.border.primary}`,
						'&:hover': {
							...hoverEffects.iconButton,
							background: 'rgba(66, 133, 244, 0.2)',
							border: `1px solid ${colors.border.secondary}`
						}
					}}
				>
					<CloseIcon />
				</IconButton>
			)}
		</Box>
	)
} 