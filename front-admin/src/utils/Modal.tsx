import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	IconButton,
	Typography,
	Box
} from "@mui/material"
import { Close as CloseIcon } from '@mui/icons-material'
import { styled } from "@mui/material/styles"

interface ModalProps {
	open: boolean
	onClose: () => void
	title?: string
	children: React.ReactNode
	actions?: React.ReactNode
	description?: string
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	fullWidth?: boolean
	fullScreen?: boolean
	showCloseButton?: boolean
	closeOnBackdropClick?: boolean
	closeOnEscapeKey?: boolean
	sx?: any
	className?: string
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialog-paper': {
		borderRadius: theme.spacing(2),
		boxShadow: theme.shadows[24],
	},
	'& .MuiDialogTitle-root': {
		padding: theme.spacing(2, 3),
		borderBottom: `1px solid ${theme.palette.divider}`,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	'& .MuiDialogContent-root': {
		padding: theme.spacing(3),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(2, 3),
		borderTop: `1px solid ${theme.palette.divider}`,
	},
}))

export const Modal = ({
	open,
	onClose,
	title,
	children,
	actions,
	description,
	maxWidth = 'sm',
	fullWidth = true,
	fullScreen = false,
	showCloseButton = true,
	closeOnBackdropClick = true,
	closeOnEscapeKey = true,
	sx = {},
	className = '',
}: ModalProps) => {
	const handleClose = (_event: any, reason: string) => {
		if (reason === 'backdropClick' && !closeOnBackdropClick) {
			return
		}
		if (reason === 'escapeKeyDown' && !closeOnEscapeKey) {
			return
		}
		onClose()
	}

	return (
		<StyledDialog
			open={open}
			onClose={handleClose}
			maxWidth={maxWidth}
			fullWidth={fullWidth}
			fullScreen={fullScreen}
			sx={sx}
			className={className}
		>
			{title && (
				<DialogTitle>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Typography variant="h6" component="div">
							{title}
						</Typography>
						{showCloseButton && (
							<IconButton
								aria-label="close"
								onClick={onClose}
								sx={{
									color: (theme) => theme.palette.grey[500],
								}}
							>
								<CloseIcon />
							</IconButton>
						)}
					</Box>
				</DialogTitle>
			)}

			<DialogContent>
				{description && (
					<DialogContentText sx={{ mb: 2 }}>
						{description}
					</DialogContentText>
				)}
				{children}
			</DialogContent>

			{actions && (
				<DialogActions>
					{actions}
				</DialogActions>
			)}
		</StyledDialog>
	)
} 