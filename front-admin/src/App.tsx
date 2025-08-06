import { useState } from 'react'
import { LayoutAdmin, Dashboard, UsersView } from './components'
import { useLoginStore } from './store/loginStore'

function App() {
	const { isLoggedIn } = useLoginStore()
	const [currentRoute, setCurrentRoute] = useState<string>('/dashboard')

	const handleNavigate = (route: string) => {
		setCurrentRoute(route)
	}

	const renderContent = () => {
		switch (currentRoute) {
			case '/users':
				return <UsersView />
			case '/dashboard':
			default:
				return <Dashboard />
		}
	}

	if (isLoggedIn) {
		return <div>Please log in</div>
	}

	return (
		<LayoutAdmin currentRoute={currentRoute} onNavigate={handleNavigate}>
			{renderContent()}
		</LayoutAdmin>
	)
}

export default App
