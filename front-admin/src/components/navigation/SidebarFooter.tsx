import { Box, Typography, Divider } from '@mui/material'
import { colors } from '../../styles/theme/colors'
import { typography } from '../../styles/theme/typography'

interface SidebarFooterProps {
	copyright?: string
}

export const SidebarFooter = ({ copyright = '© 2024 Academia' }: SidebarFooterProps) => {
	return (
		<Box
			sx={{
				mt: 'auto',
				p: 2,
				borderTop: `1px solid ${colors.border.primary}`,
				textAlign: 'center',
				background: 'linear-gradient(135deg, transparent 0%, rgba(66, 133, 244, 0.05) 100%)',
				borderRadius: '0 0 8px 8px'
			}}
		>
			<Divider sx={{ borderColor: colors.border.primary, mb: 2, opacity: 0.3 }} />
			<Typography
				variant="caption"
				sx={{
					...typography.caption,
					color: colors.text.muted,
					fontSize: '0.75rem',
					letterSpacing: '0.5px',
					textTransform: 'uppercase'
				}}
			>
				{copyright}
			</Typography>
		</Box>
	)
} 