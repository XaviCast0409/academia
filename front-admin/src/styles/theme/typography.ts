// Star Wars Theme - Typography System
// Centralized typography definitions for consistent theming

export const typography = {
	// Title styles
	title: {
		color: 'white',
		fontWeight: 600,
		letterSpacing: '0.5px',
		textTransform: 'uppercase' as const
	},
	
	// Subtitle styles
	subtitle: {
		color: 'rgba(255, 255, 255, 0.8)',
		fontWeight: 500,
		letterSpacing: '0.3px'
	},
	
	// Body text styles
	body: {
		color: 'rgba(255, 255, 255, 0.9)',
		fontWeight: 400
	},
	
	// Caption styles
	caption: {
		color: 'rgba(255, 255, 255, 0.5)',
		fontSize: '0.75rem',
		letterSpacing: '0.5px'
	},
	
	// Navigation text styles
	navigation: {
		color: 'rgba(255, 255, 255, 0.8)',
		fontWeight: 500,
		fontSize: '0.9rem',
		letterSpacing: '0.3px'
	},
	
	// Button text styles
	button: {
		color: 'white',
		fontWeight: 600,
		textTransform: 'none' as const,
		fontSize: '1rem'
	},
	
	// Input text styles
	input: {
		color: 'white',
		fontSize: '1rem',
		placeholder: 'rgba(255, 255, 255, 0.5)'
	},
	
	// Label text styles
	label: {
		color: 'rgba(255, 255, 255, 0.7)',
		fontSize: '0.875rem',
		fontWeight: 500,
		textTransform: 'uppercase' as const,
		letterSpacing: '0.5px'
	}
} 