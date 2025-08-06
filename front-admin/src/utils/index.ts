// Componentes de formulario
export { InputField } from './InputField'
export { SelectField } from './SelectField'
export { SearchField } from './SearchField'
export { Form, FormField } from './Form'

// Componentes de UI
export { Button } from './Button'
export { Card } from './Card'
export { Modal } from './Modal'
export { Table } from './Table'

// Componentes de estado
export { Loading } from './Loading'
export { Alert } from './Alert'

// Temas y estilos - Re-export from styles module
export * from '../styles'

// Tipos comunes
export interface SelectOption {
	value: string | number
	label: string
	disabled?: boolean
}

export interface SearchOption {
	value: string | number
	label: string
	[key: string]: any
}

export interface TableColumn {
	id: string
	label: string
	sortable?: boolean
	width?: string | number
	align?: 'left' | 'right' | 'center'
	render?: (value: any, row: any) => React.ReactNode
} 