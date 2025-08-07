import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LayoutAdmin, Dashboard, UsersView, ActivitiesView, EvidencesView } from './components'
import { Login } from './components/login/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider, useAuth } from './context/AuthContext'

function AppContent() {
	const { isAuthenticated } = useAuth()
	const [currentRoute, setCurrentRoute] = useState<string>('/dashboard')

	const handleNavigate = (route: string) => {
		console.log('App: Navigating to route:', route)
		setCurrentRoute(route)
	}

	const renderContent = () => {
		console.log('App: Current route:', currentRoute)
		switch (currentRoute) {
			case '/users':
				return <UsersView />
			case '/activities':
				return <ActivitiesView />
			case '/evidences':
				return <EvidencesView />
			case '/dashboard':
			default:
				return <Dashboard />
		}
	}

	return (
		<LayoutAdmin currentRoute={currentRoute} onNavigate={handleNavigate}>
			{renderContent()}
		</LayoutAdmin>
	)
}

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/admin/*" element={
						<ProtectedRoute>
							<AppContent />
						</ProtectedRoute>
					} />
					<Route path="/" element={<Navigate to="/admin" replace />} />
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
