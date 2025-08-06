import { Box } from '@mui/material'
import { backgroundUtils } from '../../styles/utils/themeUtils'
import { UsersTable } from './UsersTable'

export const UsersView = () => {
	return (
		<Box sx={{ 
			...backgroundUtils.mainBackground, 
			minHeight: '100vh', 
			width: '100%' 
		}}>
			<UsersTable />
		</Box>
	)
} 