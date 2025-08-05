import { useLoginStore } from '../../store/loginStore'
import { InputField, Button, Form, FormField } from '../../utils'
import { useState } from 'react'
import type { LoginRequest } from '../../types'
import { Box, Typography, Alert } from '@mui/material'

export const Login = () => {
	const { isLoggedIn, logIn, logOut } = useLoginStore()
	const [formData, setFormData] = useState<LoginRequest>({
		email: '',
		password: ''
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>('')

	const handleInputChange = (field: keyof LoginRequest) => (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setFormData(prev => ({
			...prev,
			[field]: e.target.value
		}))
	}

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')

		try {
			// Validación básica
			if (!formData.email || !formData.password) {
				setError('Por favor completa todos los campos')
				return
			}

			// Aquí iría la llamada real a la API
			await logIn(formData.email, formData.password)

			// Limpiar formulario después del login exitoso
			setFormData({
				email: '',
				password: ''
			})
		} catch (err) {
			setError('Error al iniciar sesión. Verifica tus credenciales.')
		} finally {
			setLoading(false)
		}
	}

	const handleLogout = () => {
		logOut()
	}

	if (isLoggedIn) {
		return (
			<Box sx={{ p: 3, textAlign: 'center' }}>
				<Typography variant="h4" gutterBottom>
					¡Bienvenido!
				</Typography>
				<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
					Has iniciado sesión correctamente
				</Typography>
				<Button
					variant="outlined"
					color="primary"
					onClick={handleLogout}
				>
					Cerrar Sesión
				</Button>
			</Box>
		)
	}

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				padding: 2,
			}}
		>
			<Box
				sx={{
					width: '100%',
					maxWidth: 400,
					background: 'rgba(255, 255, 255, 0.95)',
					backdropFilter: 'blur(10px)',
					borderRadius: 3,
					boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
					overflow: 'hidden',
				}}
			>
				<Form
					title="Bienvenido"
					subtitle="Ingresa tus credenciales para continuar"
					error={error}
					sx={{
						background: 'transparent',
						boxShadow: 'none',
						padding: 4,
					}}
				>
					<form onSubmit={handleLogin}>
						<FormField>
							<InputField
								label="Email"
								type="email"
								value={formData.email}
								onChange={handleInputChange('email')}
								placeholder="tu@email.com"
								required
								fullWidth
								error={!!error && !formData.email}
								helperText={!formData.email && error ? 'Email es requerido' : ''}
								variant="outlined"
								size="medium"
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: 2,
										backgroundColor: 'rgba(255, 255, 255, 0.8)',
										'&:hover': {
											backgroundColor: 'rgba(255, 255, 255, 0.9)',
										},
										'&.Mui-focused': {
											backgroundColor: 'rgba(255, 255, 255, 0.95)',
										},
									},
									'& .MuiInputLabel-root': {
										color: '#666',
										'&.Mui-focused': {
											color: '#667eea',
										},
									},
								}}
							/>
						</FormField>

						<FormField>
							<InputField
								label="Contraseña"
								type="password"
								value={formData.password}
								onChange={handleInputChange('password')}
								placeholder="••••••••"
								required
								fullWidth
								error={!!error && !formData.password}
								helperText={!formData.password && error ? 'Contraseña es requerida' : ''}
								variant="outlined"
								size="medium"
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: 2,
										backgroundColor: 'rgba(255, 255, 255, 0.8)',
										'&:hover': {
											backgroundColor: 'rgba(255, 255, 255, 0.9)',
										},
										'&.Mui-focused': {
											backgroundColor: 'rgba(255, 255, 255, 0.95)',
										},
									},
									'& .MuiInputLabel-root': {
										color: '#666',
										'&.Mui-focused': {
											color: '#667eea',
										},
									},
								}}
							/>
						</FormField>

						{error && (
							<FormField>
								<Alert 
									severity="error" 
									sx={{ 
										mt: 1,
										borderRadius: 2,
										backgroundColor: 'rgba(244, 67, 54, 0.1)',
										border: '1px solid rgba(244, 67, 54, 0.3)',
									}}
								>
									{error}
								</Alert>
							</FormField>
						)}

						<FormField>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								loading={loading}
								loadingText="Iniciando sesión..."
								disabled={!formData.email || !formData.password}
								size="large"
								sx={{
									background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
									borderRadius: 2,
									py: 1.5,
									px: 3,
									fontWeight: 600,
									textTransform: 'none',
									fontSize: '1rem',
									boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
									'&:hover': {
										background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
										boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
									},
									'&:disabled': {
										background: '#e0e0e0',
										boxShadow: 'none',
									},
								}}
							>
								Iniciar Sesión
							</Button>
						</FormField>
					</form>
				</Form>
			</Box>
		</Box>
	)
}
