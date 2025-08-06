// Star Wars Theme - Spacing System
// Centralized spacing definitions for consistent layout

export const spacing = {
	// Base spacing units
	xs: 1,
	sm: 2,
	md: 3,
	lg: 4,
	xl: 6,
	xxl: 8,
	
	// Component-specific spacing
	components: {
		sidebar: {
			width: 240,
			padding: 3,
			itemSpacing: 1
		},
		appBar: {
			height: 64,
			padding: { xs: 2, md: 3 }
		},
		card: {
			padding: 3,
			margin: 2
		},
		button: {
			padding: { x: 3, y: 1.5 }
		},
		input: {
			padding: { x: 2, y: 1 }
		}
	},
	
	// Layout spacing
	layout: {
		container: {
			padding: { xs: 2, sm: 3, md: 4 }
		},
		section: {
			margin: { top: 3, bottom: 3 }
		},
		grid: {
			gap: 2
		}
	}
} 