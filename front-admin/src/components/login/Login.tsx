import { InputField, Button } from '../../utils'
import { useState } from 'react'
import type { LoginRequest } from '../../types/UserType'
import { Box, Typography, Alert, Avatar } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const Login = () => {
	const { login } = useAuth()
	const [formData, setFormData] = useState<LoginRequest>({
		email: '',
		password: ''
	})
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>('')
	const navigate = useNavigate()
	
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

			// Usar el nuevo sistema de autenticación
			await login(formData.email, formData.password)

			// Limpiar formulario después del login exitoso
			setFormData({
				email: '',
				password: ''
			})
			
			// Redirigir al dashboard
			navigate('/admin', { replace: true })
		} catch (err: any) {
			console.error('Login error:', err)
			setError(err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
				backgroundImage: `
					radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
					radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
					radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
				`,
				padding: 2,
				position: 'relative',
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
					pointerEvents: 'none',
				}
			}}
		>
			<Box
				sx={{
					width: '100%',
					maxWidth: 400,
					background: 'rgba(40, 40, 40, 0.95)',
					backdropFilter: 'blur(20px)',
					borderRadius: 4,
					boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
					overflow: 'hidden',
					position: 'relative',
					'&::before': {
						content: '""',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)',
						pointerEvents: 'none',
					}
				}}
			>
				<Box sx={{ p: 4, textAlign: 'center' }}>
					{/* Avatar Section */}
					<Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
						<Avatar
							sx={{
								width: 80,
								height: 80,
								bgcolor: 'rgba(255, 255, 255, 0.1)',
								border: '2px solid rgba(255, 255, 255, 0.2)',
								position: 'relative',
								'&::before': {
									content: '""',
									position: 'absolute',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
									width: 40,
									height: 40,
									background: 'url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/%3E%3C/svg%3E")',
									backgroundSize: 'contain',
									opacity: 0.3,
								}
							}}
						/>
						<Box
							sx={{
								position: 'absolute',
								top: -5,
								right: -5,
								width: 32,
								height: 32,
								bgcolor: '#4285F4',
								borderRadius: '50%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: '0 4px 12px rgba(66, 133, 244, 0.4)',
								cursor: 'pointer',
								transition: 'all 0.3s ease',
								'&:hover': {
									transform: 'scale(1.1)',
									boxShadow: '0 6px 16px rgba(66, 133, 244, 0.6)',
								}
							}}
						>
							<AddIcon sx={{ color: 'white', fontSize: 20 }} />
						</Box>
					</Box>

					{/* Form */}
					<form onSubmit={handleLogin}>
						<Box sx={{ mb: 3 }}>
							<InputField
								label="EMAIL"
								type="email"
								value={formData.email}
								onChange={handleInputChange('email')}
								placeholder="storm@darkside.net"
								required
								fullWidth
								error={!!error && !formData.email}
								helperText={!formData.email && error ? 'Email is required' : ''}
								variant="standard"
								size="medium"
								sx={{
									'& .MuiInput-root': {
										color: 'white',
										'&::before': {
											borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
										},
										'&:hover::before': {
											borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
										},
										'&.Mui-focused::after': {
											borderBottom: '2px solid #4285F4',
										},
									},
									'& .MuiInputLabel-root': {
										color: 'rgba(255, 255, 255, 0.7)',
										fontSize: '0.875rem',
										fontWeight: 500,
										textTransform: 'uppercase',
										letterSpacing: '0.5px',
										'&.Mui-focused': {
											color: '#4285F4',
										},
									},
									'& .MuiInput-input': {
										color: 'white',
										fontSize: '1rem',
										'&::placeholder': {
											color: 'rgba(255, 255, 255, 0.5)',
											opacity: 1,
										},
									},
								}}
							/>
						</Box>

						<Box sx={{ mb: 4 }}>
							<InputField
								label="PASSWORD"
								type="password"
								value={formData.password}
								onChange={handleInputChange('password')}
								placeholder="••••••••"
								required
								fullWidth
								error={!!error && !formData.password}
								helperText={!formData.password && error ? 'Password is required' : ''}
								variant="standard"
								size="medium"
								sx={{
									'& .MuiInput-root': {
										color: 'white',
										'&::before': {
											borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
										},
										'&:hover::before': {
											borderBottom: '2px solid rgba(255, 255, 255, 0.5)',
										},
										'&.Mui-focused::after': {
											borderBottom: '2px solid #4285F4',
										},
									},
									'& .MuiInputLabel-root': {
										color: 'rgba(255, 255, 255, 0.7)',
										fontSize: '0.875rem',
										fontWeight: 500,
										textTransform: 'uppercase',
										letterSpacing: '0.5px',
										'&.Mui-focused': {
											color: '#4285F4',
										},
									},
									'& .MuiInput-input': {
										color: 'white',
										fontSize: '1rem',
										'&::placeholder': {
											color: 'rgba(255, 255, 255, 0.5)',
											opacity: 1,
										},
									},
								}}
							/>
						</Box>

						{error && (
							<Box sx={{ mb: 3 }}>
								<Alert
									severity="error"
									sx={{
										borderRadius: 2,
										backgroundColor: 'rgba(244, 67, 54, 0.1)',
										border: '1px solid rgba(244, 67, 54, 0.3)',
										color: '#ff6b6b',
										'& .MuiAlert-icon': {
											color: '#ff6b6b',
										}
									}}
								>
									{error}
								</Alert>
							</Box>
						)}

						<Box sx={{ mb: 4 }}>
							<Button
								type="submit"
								variant="contained"
								fullWidth
								loading={loading}
								loadingText="Signing In..."
								disabled={!formData.email || !formData.password}
								size="large"
								sx={{
									background: '#4285F4',
									borderRadius: 2,
									py: 1.5,
									px: 3,
									fontWeight: 600,
									textTransform: 'none',
									fontSize: '1rem',
									boxShadow: '0 4px 15px rgba(66, 133, 244, 0.4)',
									transition: 'all 0.3s ease',
									'&:hover': {
										background: '#3367d6',
										boxShadow: '0 6px 20px rgba(66, 133, 244, 0.6)',
										transform: 'translateY(-2px)',
									},
									'&:disabled': {
										background: 'rgba(255, 255, 255, 0.1)',
										color: 'rgba(255, 255, 255, 0.3)',
										boxShadow: 'none',
									},
								}}
							>
								Sign In
							</Button>
						</Box>

						{/* Footer Text */}
						<Typography
							variant="body2"
							sx={{
								color: 'rgba(255, 255, 255, 0.7)',
								textAlign: 'center',
								fontSize: '0.875rem',
								'& a': {
									color: 'white',
									textDecoration: 'none',
									fontWeight: 600,
									cursor: 'pointer',
									transition: 'color 0.3s ease',
									'&:hover': {
										color: '#4285F4',
									}
								}
							}}
						>
							WELCOME TO THE DARK SIDE
						</Typography>
					</form>
				</Box>
			</Box>
		</Box>
	)
}
