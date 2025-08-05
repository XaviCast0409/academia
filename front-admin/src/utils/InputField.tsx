import { TextField } from "@mui/material"
import type { TextFieldProps } from "@mui/material"
import { styled } from "@mui/material/styles"

interface InputFieldProps extends Omit<TextFieldProps, 'onChange'> {
	label: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	value: string
	error?: boolean
	helperText?: string
	placeholder?: string
	disabled?: boolean
	required?: boolean
	fullWidth?: boolean
	size?: 'small' | 'medium'
	variant?: 'outlined' | 'filled' | 'standard'
	sx?: any
	className?: string
}

const StyledTextField = styled(TextField)(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		'&:hover fieldset': {
			borderColor: theme.palette.primary.main,
		},
		'&.Mui-focused fieldset': {
			borderColor: theme.palette.primary.main,
		},
	},
	'& .MuiInputLabel-root': {
		'&.Mui-focused': {
			color: theme.palette.primary.main,
		},
	},
}))

export const InputField = ({ 
	label, 
	onChange, 
	type = 'text',
	value, 
	error = false, 
	helperText = '', 
	placeholder,
	disabled = false,
	required = false,
	fullWidth = true,
	size = 'medium',
	variant = 'outlined',
	sx = {},
	className = '',
	...props 
}: InputFieldProps) => {
	return (
		<StyledTextField
			label={label}
			value={value}
			onChange={onChange}
			type={type}
			error={error}
			helperText={helperText}
			placeholder={placeholder}
			disabled={disabled}
			required={required}
			fullWidth={fullWidth}
			size={size}
			variant={variant}
			sx={sx}
			className={className}
			{...props}
		/>
	)
}
