// Star Wars Theme - Main Theme Configuration
// Centralized theme management for the admin interface

import { colors } from './colors'
import { backgrounds } from './backgrounds'
import { typography } from './typography'
import { spacing } from './spacing'
import { transitions } from './transitions'
import { breakpoints } from './breakpoints'
import { components } from './components'

export const starWarsTheme = {
	colors,
	backgrounds,
	typography,
	spacing,
	transitions,
	breakpoints,
	components
}

// Re-export individual theme parts for granular imports
export { colors } from './colors'
export { backgrounds } from './backgrounds'
export { typography } from './typography'
export { spacing } from './spacing'
export { transitions } from './transitions'
export { breakpoints } from './breakpoints'
export { components } from './components'

export default starWarsTheme 