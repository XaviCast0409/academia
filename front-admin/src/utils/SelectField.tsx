
import { 
	FormControl, 
	InputLabel, 
	Select, 
	MenuItem, 
	FormHelperText
} from "@mui/material"
import type { SelectProps } from "@mui/material"
import { styled } from "@mui/material/styles"

interface SelectOption {
	value: string | number
	label: string
	disabled?: boolean
}

interface SelectFieldProps extends Omit<SelectProps, 'onChange'> {
	label: string
	onChange: (value: string | number) => void
	value: string | number
	options: SelectOption[]
	error?: boolean
	helperText?: string
	disabled?: boolean
	required?: boolean
	fullWidth?: boolean
	size?: 'small' | 'medium'
	variant?: 'outlined' | 'filled' | 'standard'
	placeholder?: string
	sx?: any
	className?: string
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
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

export const SelectField = ({ 
	label, 
	onChange, 
	value, 
	options,
	error = false, 
	helperText = '',
	disabled = false,
	required = false,
	fullWidth = true,
	size = 'medium',
	variant = 'outlined',
	placeholder,
	sx = {},
	className = '',
	...props 
}: SelectFieldProps) => {
	const handleChange = (event: any) => {
		onChange(event.target.value)
	}

	return (
		<StyledFormControl
			fullWidth={fullWidth}
			error={error}
			disabled={disabled}
			required={required}
			size={size}
			variant={variant}
			sx={sx}
			className={className}
		>
			<InputLabel>{label}</InputLabel>
			<Select
				value={value}
				label={label}
				onChange={handleChange}
				{...props}
			>
				{options.map((option) => (
					<MenuItem 
						key={option.value} 
						value={option.value}
						disabled={option.disabled}
					>
						{option.label}
					</MenuItem>
				))}
			</Select>
			{helperText && (
				<FormHelperText error={error}>
					{helperText}
				</FormHelperText>
			)}
		</StyledFormControl>
	)
}
