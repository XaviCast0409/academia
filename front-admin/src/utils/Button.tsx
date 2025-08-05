import { 
	Button as MuiButton, 
	ButtonProps as MuiButtonProps,
	CircularProgress
} from "@mui/material"
import { styled } from "@mui/material/styles"

interface ButtonProps extends Omit<MuiButtonProps, 'onClick'> {
	children: React.ReactNode
	onClick?: () => void
	loading?: boolean
	loadingText?: string
	variant?: 'text' | 'outlined' | 'contained'
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
	size?: 'small' | 'medium' | 'large'
	disabled?: boolean
	fullWidth?: boolean
	startIcon?: React.ReactNode
	endIcon?: React.ReactNode
	sx?: any
	className?: string
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
	borderRadius: theme.spacing(1.5),
	fontWeight: 600,
	textTransform: 'none',
	boxShadow: 'none',
	'&:hover': {
		boxShadow: theme.shadows[4],
	},
	'&.Mui-disabled': {
		opacity: 0.6,
	},
}))

export const Button = ({ 
	children, 
	onClick,
	loading = false,
	loadingText = 'Cargando...',
	variant = 'contained',
	color = 'primary',
	size = 'medium',
	disabled = false,
	fullWidth = false,
	startIcon,
	endIcon,
	sx = {},
	className = '',
	...props 
}: ButtonProps) => {
	const isDisabled = disabled || loading

	return (
		<StyledButton
			variant={variant}
			color={color}
			size={size}
			disabled={isDisabled}
			fullWidth={fullWidth}
			onClick={onClick}
			startIcon={loading ? <CircularProgress size={16} /> : startIcon}
			endIcon={endIcon}
			sx={sx}
			className={className}
			{...props}
		>
			{loading ? loadingText : children}
		</StyledButton>
	)
} 