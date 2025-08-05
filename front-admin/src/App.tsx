import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Routes>  
      <Route path="/" element={<div>Hello World</div>} />
    </Routes>
  )
}

export default App
