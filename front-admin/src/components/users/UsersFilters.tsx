import { useState } from 'react'
import {
	Box,
	Paper,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	IconButton,
	Tooltip
} from '@mui/material'
import {
	Search as SearchIcon,
	Clear as ClearIcon
} from '@mui/icons-material'
import type { UserFilters } from '../../types/UserType'
import { SECTIONS } from '../../types/UserType'
import { colors } from '../../styles/theme/colors'

interface UsersFiltersProps {
	filters: UserFilters
	onFiltersChange: (filters: Partial<UserFilters>) => void
}

export const UsersFilters = ({ filters, onFiltersChange }: UsersFiltersProps) => {
	const [searchValue, setSearchValue] = useState(filters.search || '')

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value)
	}

	const handleSearchSubmit = () => {
		onFiltersChange({ search: searchValue || undefined })
	}

	const handleSectionChange = (event: any) => {
		onFiltersChange({ section: event.target.value || undefined })
	}

	const handleActiveChange = (event: any) => {
		const value = event.target.value
		onFiltersChange({ 
			isActive: value === '' ? undefined : value === 'true'
		})
	}

	const handleClearFilters = () => {
		setSearchValue('')
		onFiltersChange({
			search: undefined,
			section: undefined,
			isActive: undefined
		})
	}

	return (
		<Paper
			sx={{
				background: 'rgba(40, 40, 40, 0.8)',
				backdropFilter: 'blur(20px)',
				border: `1px solid ${colors.border.primary}`,
				borderRadius: 2,
				p: 3,
				mb: 3
			}}
		>
			<Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
				{/* Search */}
				<Box sx={{ flex: { xs: 1, md: 4 } }}>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<TextField
							fullWidth
							placeholder="Buscar usuarios..."
							value={searchValue}
							onChange={handleSearchChange}
							onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
							sx={{
								'& .MuiOutlinedInput-root': {
									color: 'white',
									'& fieldset': {
										borderColor: colors.border.primary
									},
									'&:hover fieldset': {
										borderColor: colors.border.hover
									},
									'&.Mui-focused fieldset': {
										borderColor: colors.border.focus
									}
								},
								'& .MuiInputLabel-root': {
									color: colors.text.secondary
								},
								'& .MuiInputBase-input::placeholder': {
									color: colors.text.hint,
									opacity: 1
								}
							}}
						/>
						<Tooltip title="Buscar">
							<IconButton
								onClick={handleSearchSubmit}
								sx={{
									background: colors.primary.main,
									color: 'white',
									'&:hover': {
										background: colors.primary.dark
									}
								}}
							>
								<SearchIcon />
							</IconButton>
						</Tooltip>
					</Box>
				</Box>

				{/* Section Filter */}
				<Box sx={{ flex: { xs: 1, md: 3 } }}>
					<FormControl fullWidth>
						<InputLabel sx={{ color: colors.text.secondary }}>
							Sección
						</InputLabel>
						<Select
							value={filters.section || ''}
							onChange={handleSectionChange}
							sx={{
								color: 'white',
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: colors.border.primary
								},
								'&:hover .MuiOutlinedInput-notchedOutline': {
									borderColor: colors.border.hover
								},
								'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
									borderColor: colors.border.focus
								},
								'& .MuiSelect-icon': {
									color: colors.text.secondary
								}
							}}
						>
							<MenuItem value="">Todas las secciones</MenuItem>
							{SECTIONS.map((section) => (
								<MenuItem key={section.value} value={section.value}>
									{section.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>

				{/* Active Status Filter */}
				<Box sx={{ flex: { xs: 1, md: 3 } }}>
					<FormControl fullWidth>
						<InputLabel sx={{ color: colors.text.secondary }}>
							Estado
						</InputLabel>
						<Select
							value={filters.isActive === undefined ? '' : filters.isActive.toString()}
							onChange={handleActiveChange}
							sx={{
								color: 'white',
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: colors.border.primary
								},
								'&:hover .MuiOutlinedInput-notchedOutline': {
									borderColor: colors.border.hover
								},
								'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
									borderColor: colors.border.focus
								},
								'& .MuiSelect-icon': {
									color: colors.text.secondary
								}
							}}
						>
							<MenuItem value="">Todos los estados</MenuItem>
							<MenuItem value="true">Activo</MenuItem>
							<MenuItem value="false">Inactivo</MenuItem>
						</Select>
					</FormControl>
				</Box>

				{/* Clear Filters */}
				<Box sx={{ flex: { xs: 1, md: 2 } }}>
					<Tooltip title="Limpiar filtros">
						<Button
							variant="outlined"
							onClick={handleClearFilters}
							startIcon={<ClearIcon />}
							sx={{
								color: colors.text.secondary,
								borderColor: colors.border.primary,
								'&:hover': {
									borderColor: colors.border.hover,
									color: colors.text.primary
								}
							}}
						>
							Limpiar
						</Button>
					</Tooltip>
				</Box>
			</Box>
		</Paper>
	)
} 