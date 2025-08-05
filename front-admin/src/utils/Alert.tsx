import { 
	Alert as MuiAlert, 
	AlertTitle, 
	IconButton, 
	Collapse,
	Box
} from "@mui/material"
import { Close as CloseIcon } from '@mui/icons-material'
import { styled } from "@mui/material/styles"
import { useState } from 'react'

interface AlertProps {
	severity?: 'error' | 'warning' | 'info' | 'success'
	title?: string
	message: string
	action?: React.ReactNode
	onClose?: () => void
	dismissible?: boolean
	autoHide?: boolean
	autoHideDuration?: number
	variant?: 'filled' | 'outlined' | 'standard'
	elevation?: number
	sx?: any
	className?: string
}

const StyledAlert = styled(MuiAlert)(({ theme }) => ({
	borderRadius: theme.spacing(1.5),
	'& .MuiAlert-icon': {
		alignItems: 'center',
	},
	'& .MuiAlert-message': {
		width: '100%',
	},
}))

export const Alert = ({ 
	severity = 'info',
	title,
	message,
	action,
	onClose,
	dismissible = false,
	autoHide = false,
	autoHideDuration = 6000,
	variant = 'standard',
	elevation,
	sx = {},
	className = '',
}: AlertProps) => {
	const [open, setOpen] = useState(true)

	const handleClose = () => {
		setOpen(false)
		if (onClose) {
			onClose()
		}
	}

	// Auto-hide effect
	useState(() => {
		if (autoHide) {
			const timer = setTimeout(() => {
				handleClose()
			}, autoHideDuration)

			return () => clearTimeout(timer)
		}
	})

	if (!open) return null

	return (
		<Collapse in={open}>
			<StyledAlert
				severity={severity}
				variant={variant}
				elevation={elevation}
				action={
					<Box display="flex" alignItems="center" gap={1}>
						{action}
						{dismissible && (
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={handleClose}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						)}
					</Box>
				}
				sx={sx}
				className={className}
			>
				{title && <AlertTitle>{title}</AlertTitle>}
				{message}
			</StyledAlert>
		</Collapse>
	)
} 