import { 
	Box, 
	CircularProgress, 
	Typography, 
	LinearProgress,
	Skeleton,
	Paper
} from "@mui/material"
import { styled } from "@mui/material/styles"

interface LoadingProps {
	type?: 'circular' | 'linear' | 'skeleton'
	size?: 'small' | 'medium' | 'large'
	message?: string
	fullScreen?: boolean
	overlay?: boolean
	height?: string | number
	width?: string | number
	color?: 'primary' | 'secondary' | 'inherit'
	sx?: any
	className?: string
}

const LoadingOverlay = styled(Box)(({ theme }) => ({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: 'rgba(255, 255, 255, 0.8)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: theme.zIndex.modal + 1,
}))

const LoadingContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	gap: theme.spacing(2),
	padding: theme.spacing(3),
}))

const getSizeValue = (size: 'small' | 'medium' | 'large') => {
	switch (size) {
		case 'small': return 24
		case 'large': return 60
		default: return 40
	}
}

export const Loading = ({ 
	type = 'circular',
	size = 'medium',
	message = 'Cargando...',
	fullScreen = false,
	overlay = false,
	height,
	width,
	color = 'primary',
	sx = {},
	className = '',
}: LoadingProps) => {
	const sizeValue = getSizeValue(size)

	const loadingContent = (
		<LoadingContainer sx={{ height, width, ...sx }} className={className}>
			{type === 'circular' && (
				<CircularProgress size={sizeValue} color={color} />
			)}
			{type === 'linear' && (
				<Box sx={{ width: '100%' }}>
					<LinearProgress color={color} />
				</Box>
			)}
			{type === 'skeleton' && (
				<Box sx={{ width: '100%' }}>
					<Skeleton variant="rectangular" height={sizeValue} />
					<Skeleton variant="text" sx={{ mt: 1 }} />
					<Skeleton variant="text" width="60%" />
				</Box>
			)}
			{message && (
				<Typography variant="body2" color="text.secondary">
					{message}
				</Typography>
			)}
		</LoadingContainer>
	)

	if (fullScreen) {
		return (
			<LoadingOverlay>
				<Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
					{loadingContent}
				</Paper>
			</LoadingOverlay>
		)
	}

	if (overlay) {
		return (
			<LoadingOverlay>
				{loadingContent}
			</LoadingOverlay>
		)
	}

	return loadingContent
} 