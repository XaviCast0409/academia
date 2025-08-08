import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { LayoutAdmin, Dashboard, UsersView, ActivitiesView, EvidencesView, ProductsView } from './components'
import { Login } from './components/login/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider, useAuth } from './context/AuthContext'

function AppContent() {
	const { isAuthenticated } = useAuth()
	const [currentRoute, setCurrentRoute] = useState<string>('/dashboard')
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigate = (route: string) => {
    setCurrentRoute(route)
    navigate(`/admin${route}`)
  }

  const renderContent = () => {
		switch (currentRoute) {
			case '/users':
				return <UsersView />
			case '/activities':
				return <ActivitiesView />
			case '/evidences':
				return <EvidencesView />
      case '/products':
        return <ProductsView />
			case '/dashboard':
			default:
				return <Dashboard />
		}
	}

  // Sync currentRoute with URL path under /admin
  React.useEffect(() => {
    if (!isAuthenticated) return
    const path = location.pathname.replace(/\/+$/, '') // trim trailing slash
    if (path.startsWith('/admin')) {
      const sub = path.slice('/admin'.length) || '/dashboard'
      const normalized = sub === '' ? '/dashboard' : sub
      if (normalized !== currentRoute) {
        setCurrentRoute(normalized)
      }
    }
  }, [location.pathname, isAuthenticated])

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
