// Star Wars Theme - Component Styles
// Centralized component-specific styling definitions

import { colors } from './colors'
import { backgrounds } from './backgrounds'
import { spacing } from './spacing'
import { transitions } from './transitions'

export const components = {
	// Sidebar component styles
	sidebar: {
		width: spacing.components.sidebar.width,
		background: backgrounds.components.sidebar.primary,
		backdropFilter: backgrounds.backdrop,
		border: `1px solid ${colors.border.primary}`,
		menuItem: {
			active: {
				background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.2) 0%, rgba(66, 133, 244, 0.1) 100%)',
				border: `1px solid ${colors.border.secondary}`,
				color: colors.text.primary
			},
			hover: {
				background: colors.background.hover,
				border: `1px solid ${colors.border.hover}`,
				transform: transitions.effects.hover.slide
			},
			default: {
				background: 'transparent',
				border: '1px solid transparent',
				color: colors.text.secondary
			}
		},
		icon: {
			active: colors.primary.main,
			hover: colors.text.primary,
			default: colors.text.muted
		},
		text: {
			active: colors.text.primary,
			hover: colors.text.primary,
			default: colors.text.secondary
		}
	},

	// AppBar component styles
	appBar: {
		background: backgrounds.components.appBar.primary,
		backdropFilter: backgrounds.backdrop,
		borderBottom: `1px solid ${colors.border.primary}`,
		boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
		overlay: backgrounds.components.appBar.overlay
	},

	// Button component styles
	button: {
		primary: {
			background: colors.primary.main,
			color: colors.primary.contrastText,
			boxShadow: '0 4px 15px rgba(66, 133, 244, 0.4)',
			'&:hover': {
				background: colors.primary.dark,
				boxShadow: '0 6px 20px rgba(66, 133, 244, 0.6)',
				transform: transitions.effects.hover.transform
			}
		},
		secondary: {
			background: colors.background.secondary,
			color: colors.text.secondary,
			border: `1px solid ${colors.border.primary}`,
			'&:hover': {
				background: colors.background.hover,
				color: colors.text.primary
			}
		},
		disabled: {
			background: colors.background.secondary,
			color: colors.text.disabled,
			boxShadow: 'none'
		}
	},

	// Input component styles
	input: {
		background: colors.background.secondary,
		border: `1px solid ${colors.border.primary}`,
		color: colors.text.primary,
		'&:focus': {
			border: `1px solid ${colors.border.focus}`,
			boxShadow: `0 0 0 2px ${colors.border.focus}20`
		},
		'&:hover': {
			border: `1px solid ${colors.border.hover}`
		},
		placeholder: colors.text.hint
	},

	// Card component styles
	card: {
		background: backgrounds.components.card.primary,
		backdropFilter: backgrounds.components.card.backdrop,
		border: `1px solid ${colors.border.primary}`,
		borderRadius: 2,
		boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
		'&:hover': {
			boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
			transform: transitions.effects.hover.transform
		}
	},

	// Menu component styles
	menu: {
		background: backgrounds.components.menu.primary,
		backdropFilter: backgrounds.components.menu.backdrop,
		border: `1px solid ${colors.border.primary}`,
		borderRadius: 2,
		boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
		menuItem: {
			color: colors.text.secondary,
			'&:hover': {
				background: colors.background.hover,
				color: colors.text.primary
			}
		}
	},

	// Avatar component styles
	avatar: {
		background: colors.primary.main,
		border: `1px solid ${colors.border.primary}`,
		color: colors.primary.contrastText
	},

	// Icon button styles
	iconButton: {
		color: colors.text.muted,
		'&:hover': {
			color: colors.text.primary,
			background: colors.background.hover
		}
	},

	// Divider styles
	divider: {
		borderColor: colors.border.primary
	},

	// Alert styles
	alert: {
		error: {
			background: 'rgba(244, 67, 54, 0.1)',
			border: '1px solid rgba(244, 67, 54, 0.3)',
			color: colors.accent.main
		},
		success: {
			background: 'rgba(76, 175, 80, 0.1)',
			border: '1px solid rgba(76, 175, 80, 0.3)',
			color: colors.status.success
		},
		warning: {
			background: 'rgba(255, 152, 0, 0.1)',
			border: '1px solid rgba(255, 152, 0, 0.3)',
			color: colors.status.warning
		},
		info: {
			background: 'rgba(33, 150, 243, 0.1)',
			border: '1px solid rgba(33, 150, 243, 0.3)',
			color: colors.status.info
		}
	}
} 