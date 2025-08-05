import { 
	Box, 
	Paper, 
	Typography
} from "@mui/material"
import { Grid, type GridProps } from "@mui/material"
import { styled } from "@mui/material/styles"
import type { ReactNode } from 'react'

interface FormProps {
	title?: string
	subtitle?: string
	children: ReactNode
	actions?: ReactNode
	loading?: boolean
	error?: string
	success?: string
	spacing?: number
	gridProps?: GridProps
	sx?: any
	className?: string
}

const StyledForm = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
	borderRadius: theme.spacing(2),
	boxShadow: theme.shadows[2],
	'&:hover': {
		boxShadow: theme.shadows[4],
	},
}))

const FormContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(3),
}))

const FormHeader = styled(Box)(({ theme }) => ({
	marginBottom: theme.spacing(2),
}))

const FormContent = styled(Box)(() => ({
	flex: 1,
}))

const FormActions = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'flex-end',
	gap: theme.spacing(2),
	paddingTop: theme.spacing(2),
	borderTop: `1px solid ${theme.palette.divider}`,
}))

export const Form = ({ 
	title,
	subtitle,
	children,
	actions,
	spacing = 2,
	gridProps = {},
	sx = {},
	className = '',
}: FormProps) => {
	return (
		<StyledForm sx={sx} className={className}>
			<FormContainer>
				{(title || subtitle) && (
					<FormHeader>
						{title && (
							<Typography variant="h5" component="h2" gutterBottom>
								{title}
							</Typography>
						)}
						{subtitle && (
							<Typography variant="body2" color="text.secondary">
								{subtitle}
							</Typography>
						)}
					</FormHeader>
				)}

				<FormContent>
					<Grid container spacing={spacing} {...gridProps}>
						{children}
					</Grid>
				</FormContent>

				{actions && (
					<FormActions>
						{actions}
					</FormActions>
				)}
			</FormContainer>
		</StyledForm>
	)
}

// Componente para campos de formulario
interface FormFieldProps {
	children: ReactNode
	xs?: number
	sm?: number
	md?: number
	lg?: number
	xl?: number
	sx?: any
}

export const FormField = ({ 
	children, 
	xs = 12, 
	sm, 
	md, 
	lg, 
	xl,
	sx = {},
}: FormFieldProps) => {
	const gridProps: any = {
		item: true,
		xs,
		sx
	}
	
	if (sm !== undefined) gridProps.sm = sm
	if (md !== undefined) gridProps.md = md
	if (lg !== undefined) gridProps.lg = lg
	if (xl !== undefined) gridProps.xl = xl

	return (
		<Grid {...gridProps}>
			{children}
		</Grid>
	)
} 