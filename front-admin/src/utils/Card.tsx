import { 
	Card as MuiCard, 
	CardContent, 
	CardActions, 
	CardMedia,
	CardHeader,
	CardActionArea,
	Typography,
	Avatar
} from "@mui/material"
import { styled } from "@mui/material/styles"

interface CardProps {
	children: React.ReactNode
	title?: string
	subtitle?: string
	description?: string
	image?: string
	avatar?: string
	actions?: React.ReactNode
	onClick?: () => void
	elevation?: number
	variant?: 'elevation' | 'outlined'
	hover?: boolean
	loading?: boolean
	sx?: any
	className?: string
}

const StyledCard = styled(MuiCard)(({ theme }) => ({
	borderRadius: theme.spacing(2),
	transition: 'all 0.3s ease-in-out',
	'&:hover': {
		transform: 'translateY(-2px)',
		boxShadow: theme.shadows[8],
	},
}))

const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
	borderRadius: theme.spacing(2),
	'&:hover': {
		transform: 'translateY(-2px)',
		boxShadow: theme.shadows[8],
	},
}))

export const Card = ({ 
	children, 
	title,
	subtitle,
	description,
	image,
	avatar,
	actions,
	onClick,
	elevation = 1,
	variant = 'elevation',
	hover = false,
	sx = {},
	className = '',
}: CardProps) => {
	const CardComponent = onClick ? StyledCardActionArea : StyledCard

	const cardContent = (
		<>
			{image && (
				<CardMedia
					component="img"
					height="140"
					image={image}
					alt={title || 'Card image'}
				/>
			)}
			
			{(title || subtitle || avatar) && (
				<CardHeader
					avatar={avatar ? <Avatar src={avatar} /> : undefined}
					title={title}
					subheader={subtitle}
				/>
			)}
			
			<CardContent>
				{description && (
					<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
						{description}
					</Typography>
				)}
				{children}
			</CardContent>
			
			{actions && (
				<CardActions>
					{actions}
				</CardActions>
			)}
		</>
	)

	return (
		<StyledCard
			elevation={hover ? 0 : elevation}
			variant={variant}
			sx={sx}
			className={className}
		>
			{onClick ? (
				<CardComponent onClick={onClick}>
					{cardContent}
				</CardComponent>
			) : (
				cardContent
			)}
		</StyledCard>
	)
} 