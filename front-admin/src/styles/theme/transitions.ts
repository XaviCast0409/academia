// Star Wars Theme - Transition System
// Centralized transition definitions for smooth animations

export const transitions = {
	// Base transitions
	default: 'all 0.3s ease',
	fast: 'all 0.15s ease',
	slow: 'all 0.5s ease',
	
	// Component-specific transitions
	components: {
		button: {
			default: 'all 0.3s ease',
			hover: 'all 0.2s ease',
			active: 'all 0.1s ease'
		},
		sidebar: {
			item: 'all 0.3s ease',
			icon: 'color 0.3s ease',
			text: 'all 0.3s ease'
		},
		menu: {
			item: 'all 0.2s ease',
			overlay: 'opacity 0.3s ease'
		},
		input: {
			border: 'border-color 0.2s ease',
			focus: 'all 0.2s ease'
		},
		card: {
			hover: 'all 0.3s ease',
			shadow: 'box-shadow 0.3s ease'
		}
	},
	
	// Animation effects
	effects: {
		hover: {
			transform: 'translateY(-2px)',
			scale: 'scale(1.05)',
			slide: 'translateX(4px)'
		},
		focus: {
			scale: 'scale(1.02)',
			glow: 'box-shadow 0.3s ease'
		},
		active: {
			scale: 'scale(0.98)',
			press: 'transform 0.1s ease'
		}
	}
} 