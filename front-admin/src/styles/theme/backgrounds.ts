// Star Wars Theme - Background Patterns and Gradients
// Centralized background definitions for consistent theming

export const backgrounds = {
	// Main background gradients
	primary: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
	secondary: 'linear-gradient(135deg, rgba(66, 133, 244, 0.05) 0%, transparent 50%, rgba(255, 255, 255, 0.02) 100%)',
	
	// Radial gradients for atmospheric effects
	radialGradients: `
		radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
		radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
		radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.05) 0%, transparent 50%)
	`,
	
	// Star pattern overlay
	starPattern: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.01"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
	
	// Container backgrounds
	container: 'rgba(40, 40, 40, 0.95)',
	backdrop: 'blur(20px)',
	
	// Component-specific backgrounds
	components: {
		sidebar: {
			primary: 'rgba(40, 40, 40, 0.95)',
			overlay: 'linear-gradient(135deg, rgba(66, 133, 244, 0.05) 0%, transparent 50%, rgba(255, 255, 255, 0.02) 100%)'
		},
		appBar: {
			primary: 'rgba(40, 40, 40, 0.95)',
			overlay: 'linear-gradient(135deg, rgba(66, 133, 244, 0.05) 0%, transparent 50%, rgba(255, 255, 255, 0.02) 100%)'
		},
		card: {
			primary: 'rgba(40, 40, 40, 0.8)',
			backdrop: 'blur(10px)'
		},
		menu: {
			primary: 'rgba(40, 40, 40, 0.95)',
			backdrop: 'blur(20px)'
		}
	}
} 