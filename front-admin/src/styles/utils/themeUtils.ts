// Star Wars Theme - Utility Functions
// Helper functions for applying theme styles consistently

import { colors } from '../theme/colors'
import { backgrounds } from '../theme/backgrounds'
import { typography } from '../theme/typography'
import { transitions } from '../theme/transitions'

// Glass morphism effect utility
export const glassMorphism = (opacity: number = 0.95) => ({
	background: `rgba(40, 40, 40, ${opacity})`,
	backdropFilter: 'blur(20px)',
	border: `1px solid ${colors.border.primary}`
})

// Gradient text effect utility
export const gradientText = (startColor: string, endColor: string) => ({
	background: `linear-gradient(135deg, ${startColor} 0%, ${endColor} 100%)`,
	backgroundClip: 'text',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent'
})

// Hover effect utilities
export const hoverEffects = {
	// Button hover effect
	button: {
		transform: 'translateY(-2px)',
		boxShadow: '0 6px 20px rgba(66, 133, 244, 0.6)',
		transition: transitions.default
	},
	
	// Card hover effect
	card: {
		transform: 'translateY(-4px)',
		boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
		transition: transitions.default
	},
	
	// Sidebar item hover effect
	sidebarItem: {
		transform: 'translateX(4px)',
		background: colors.background.hover,
		border: `1px solid ${colors.border.hover}`,
		transition: transitions.default
	},
	
	// Icon button hover effect
	iconButton: {
		color: colors.text.primary,
		background: colors.background.hover,
		transition: transitions.fast
	}
}

// Active state utilities
export const activeStates = {
	// Sidebar item active state
	sidebarItem: {
		background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.2) 0%, rgba(66, 133, 244, 0.1) 100%)',
		border: `1px solid ${colors.border.secondary}`,
		color: colors.text.primary
	},
	
	// Button active state
	button: {
		transform: 'scale(0.98)',
		transition: transitions.fast
	},
	
	// Input focus state
	input: {
		border: `1px solid ${colors.border.focus}`,
		boxShadow: `0 0 0 2px ${colors.border.focus}20`
	}
}

// Background utilities
export const backgroundUtils = {
	// Main page background
	mainBackground: {
		background: backgrounds.primary,
		backgroundImage: backgrounds.radialGradients,
		position: 'relative' as const,
		'&::before': {
			content: '""',
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			background: backgrounds.starPattern,
			pointerEvents: 'none' as const,
		}
	},
	
	// Container background
	containerBackground: {
		background: backgrounds.container,
		backdropFilter: backgrounds.backdrop,
		borderRadius: 2,
		boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
	}
}

// Typography utilities
export const typographyUtils = {
	// Title styles
	title: {
		...typography.title,
		...gradientText(colors.primary.main, colors.secondary.main)
	},
	
	// Navigation text
	navigation: {
		...typography.navigation,
		transition: transitions.components.sidebar.text
	},
	
	// Button text
	buttonText: {
		...typography.button,
		transition: transitions.components.button.default
	},
	
	// Input text
	inputText: {
		...typography.input,
		'&::placeholder': {
			color: typography.input.placeholder,
			opacity: 1
		}
	}
}

// Component-specific style generators
export const componentStyles = {
	// Generate sidebar item styles
	sidebarItem: (isActive: boolean, isHovered: boolean) => ({
		borderRadius: 2,
		background: isActive 
			? activeStates.sidebarItem.background
			: isHovered
			? colors.background.hover
			: 'transparent',
		border: isActive 
			? activeStates.sidebarItem.border
			: isHovered
			? `1px solid ${colors.border.hover}`
			: '1px solid transparent',
		transition: transitions.components.sidebar.item,
		'&:hover': {
			...hoverEffects.sidebarItem
		}
	}),
	
	// Generate button styles
	button: (variant: 'primary' | 'secondary' = 'primary', disabled: boolean = false) => ({
		...typographyUtils.buttonText,
		...glassMorphism(0.9),
		borderRadius: 2,
		padding: '12px 24px',
		transition: transitions.components.button.default,
		...(disabled 
			? { background: colors.background.secondary, color: colors.text.disabled }
			: variant === 'primary'
			? {
				background: colors.primary.main,
				color: colors.primary.contrastText,
				boxShadow: '0 4px 15px rgba(66, 133, 244, 0.4)',
				'&:hover': hoverEffects.button
			}
			: {
				background: colors.background.secondary,
				color: colors.text.secondary,
				border: `1px solid ${colors.border.primary}`,
				'&:hover': {
					background: colors.background.hover,
					color: colors.text.primary
				}
			}
		)
	}),
	
	// Generate input styles
	input: (hasError: boolean = false) => ({
		...typographyUtils.inputText,
		...glassMorphism(0.8),
		borderRadius: 2,
		padding: '12px 16px',
		transition: transitions.components.input.border,
		border: hasError 
			? `1px solid ${colors.accent.main}`
			: `1px solid ${colors.border.primary}`,
		'&:focus': activeStates.input,
		'&:hover': {
			border: `1px solid ${colors.border.hover}`
		}
	})
}

// Responsive utilities
export const responsiveUtils = {
	// Hide on mobile
	hideOnMobile: {
		display: { xs: 'none', md: 'block' }
	},
	
	// Show only on mobile
	showOnlyOnMobile: {
		display: { xs: 'block', md: 'none' }
	},
	
	// Responsive padding
	responsivePadding: {
		padding: { xs: 2, sm: 3, md: 4 }
	},
	
	// Responsive margin
	responsiveMargin: {
		margin: { xs: 1, sm: 2, md: 3 }
	}
} 