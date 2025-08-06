// Star Wars Theme - Breakpoint System
// Centralized breakpoint definitions for responsive design

export const breakpoints = {
	// Standard breakpoints
	xs: 0,
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536,
	
	// Custom breakpoints for specific components
	components: {
		sidebar: {
			mobile: 900, // md breakpoint
			tablet: 1200, // lg breakpoint
			desktop: 1200 // lg breakpoint and above
		},
		appBar: {
			mobile: 600, // sm breakpoint
			tablet: 900, // md breakpoint
			desktop: 1200 // lg breakpoint
		},
		layout: {
			mobile: 600,
			tablet: 900,
			desktop: 1200
		}
	},
	
	// Responsive behavior
	responsive: {
		sidebar: {
			permanent: 'md', // Show permanent sidebar from md up
			temporary: 'xs', // Show temporary sidebar from xs to md
			overlay: 'xs' // Show overlay from xs to md
		},
		appBar: {
			fullWidth: 'xs', // Full width on mobile
			adjustedWidth: 'md' // Adjusted width on desktop
		}
	}
} 