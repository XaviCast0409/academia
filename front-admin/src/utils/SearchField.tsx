import { useState, useEffect } from 'react'
import { 
	TextField, 
	Autocomplete, 
	CircularProgress,
	Box,
	InputAdornment
} from "@mui/material"
import { Search as SearchIcon } from '@mui/icons-material'
import { styled } from "@mui/material/styles"

interface SearchOption {
	value: string | number
	label: string
	[key: string]: any
}

interface SearchFieldProps {
	label?: string
	placeholder?: string
	options: SearchOption[]
	value: SearchOption | null
	onChange: (value: SearchOption | null) => void
	onSearch?: (query: string) => void
	loading?: boolean
	disabled?: boolean
	required?: boolean
	fullWidth?: boolean
	size?: 'small' | 'medium'
	variant?: 'outlined' | 'filled' | 'standard'
	debounceMs?: number
	noOptionsText?: string
	loadingText?: string
	sx?: any
	className?: string
}

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
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

export const SearchField = ({ 
	label = 'Buscar',
	placeholder = 'Escribe para buscar...',
	options,
	value,
	onChange,
	onSearch,
	loading = false,
	disabled = false,
	required = false,
	fullWidth = true,
	size = 'medium',
	variant = 'outlined',
	debounceMs = 300,
	noOptionsText = 'No hay opciones',
	loadingText = 'Cargando...',
	sx = {},
	className = '',
}: SearchFieldProps) => {
	const [inputValue, setInputValue] = useState('')
	const [debouncedInputValue, setDebouncedInputValue] = useState('')

	// Debounce effect for search
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedInputValue(inputValue)
		}, debounceMs)

		return () => clearTimeout(timer)
	}, [inputValue, debounceMs])

	// Trigger search when debounced value changes
	useEffect(() => {
		if (onSearch && debouncedInputValue !== '') {
			onSearch(debouncedInputValue)
		}
	}, [debouncedInputValue, onSearch])

	return (
		<StyledAutocomplete
			options={options}
			value={value}
			onChange={(_, newValue) => onChange(newValue)}
			inputValue={inputValue}
			onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
			getOptionLabel={(option) => option.label}
			isOptionEqualToValue={(option, value) => option.value === value.value}
			loading={loading}
			disabled={disabled}
			fullWidth={fullWidth}
			size={size}
			noOptionsText={noOptionsText}
			loadingText={loadingText}
			sx={sx}
			className={className}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					placeholder={placeholder}
					required={required}
					variant={variant}
					InputProps={{
						...params.InputProps,
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
						endAdornment: (
							<>
								{loading ? <CircularProgress color="inherit" size={20} /> : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
		/>
	)
} 