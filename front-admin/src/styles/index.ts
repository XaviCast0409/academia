// Styles - Main Export File
// Centralized exports for all styling and theme utilities

// Theme exports
export { starWarsTheme } from './theme/starWarsTheme'
export { colors } from './theme/colors'
export { backgrounds } from './theme/backgrounds'
export { typography } from './theme/typography'
export { spacing } from './theme/spacing'
export { transitions } from './theme/transitions'
export { breakpoints } from './theme/breakpoints'
export { components } from './theme/components'

// Utility exports
export { 
	glassMorphism, 
	gradientText, 
	hoverEffects, 
	activeStates,
	backgroundUtils,
	typographyUtils,
	componentStyles,
	responsiveUtils
} from './utils/themeUtils'

// Re-export theme as default
export { default as theme } from './theme/starWarsTheme' 