import { 
	Table as MuiTable, 
	TableBody, 
	TableCell, 
	TableContainer, 
	TableHead, 
	TableRow,
	TablePagination,
	TableSortLabel,
	Paper,
	Typography,
	Box,
	CircularProgress,
	Alert
} from "@mui/material"
import { styled } from "@mui/material/styles"

interface Column {
	id: string
	label: string
	sortable?: boolean
	width?: string | number
	align?: 'left' | 'right' | 'center'
	render?: (value: any, row: any) => React.ReactNode
}

interface TableProps {
	columns: Column[]
	data: any[]
	loading?: boolean
	error?: string
	page?: number
	rowsPerPage?: number
	totalRows?: number
	onPageChange?: (page: number) => void
	onRowsPerPageChange?: (rowsPerPage: number) => void
	sortBy?: string
	sortDirection?: 'asc' | 'desc'
	onSort?: (columnId: string) => void
	emptyMessage?: string
	showPagination?: boolean
	elevation?: number
	sx?: any
	className?: string
}

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
	borderRadius: theme.spacing(1),
	'& .MuiTableCell-head': {
		backgroundColor: theme.palette.grey[50],
		fontWeight: 600,
		borderBottom: `2px solid ${theme.palette.divider}`,
	},
	'& .MuiTableRow-root:hover': {
		backgroundColor: theme.palette.action.hover,
	},
}))

const StyledTable = styled(MuiTable)(({ theme }) => ({
	minWidth: 650,
}))

export const Table = ({ 
	columns, 
	data, 
	loading = false,
	error,
	page = 0,
	rowsPerPage = 10,
	totalRows = 0,
	onPageChange,
	onRowsPerPageChange,
	sortBy,
	sortDirection = 'asc',
	onSort,
	emptyMessage = 'No hay datos disponibles',
	showPagination = true,
	elevation = 1,
	sx = {},
	className = '',
}: TableProps) => {
	const handleSort = (columnId: string) => {
		if (onSort) {
			onSort(columnId)
		}
	}

	const handlePageChange = (event: unknown, newPage: number) => {
		if (onPageChange) {
			onPageChange(newPage)
		}
	}

	const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onRowsPerPageChange) {
			onRowsPerPageChange(parseInt(event.target.value, 10))
		}
	}

	if (loading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" p={4}>
				<CircularProgress />
			</Box>
		)
	}

	if (error) {
		return (
			<Alert severity="error" sx={{ m: 2 }}>
				{error}
			</Alert>
		)
	}

	return (
		<Paper elevation={elevation} sx={sx} className={className}>
			<StyledTableContainer>
				<StyledTable>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align || 'left'}
									style={{ width: column.width }}
								>
									{column.sortable ? (
										<TableSortLabel
											active={sortBy === column.id}
											direction={sortBy === column.id ? sortDirection : 'asc'}
											onClick={() => handleSort(column.id)}
										>
											{column.label}
										</TableSortLabel>
									) : (
										column.label
									)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.length === 0 ? (
							<TableRow>
								<TableCell colSpan={columns.length} align="center">
									<Typography variant="body2" color="text.secondary">
										{emptyMessage}
									</Typography>
								</TableCell>
							</TableRow>
						) : (
							data.map((row, index) => (
								<TableRow key={index}>
									{columns.map((column) => (
										<TableCell key={column.id} align={column.align || 'left'}>
											{column.render 
												? column.render(row[column.id], row)
												: row[column.id]
											}
										</TableCell>
									))}
								</TableRow>
							))
						)}
					</TableBody>
				</StyledTable>
			</StyledTableContainer>
			
			{showPagination && (
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, 50]}
					component="div"
					count={totalRows}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handlePageChange}
					onRowsPerPageChange={handleRowsPerPageChange}
					labelRowsPerPage="Filas por página:"
					labelDisplayedRows={({ from, to, count }) =>
						`${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
					}
				/>
			)}
		</Paper>
	)
} 