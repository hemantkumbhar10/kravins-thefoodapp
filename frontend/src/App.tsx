import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Layout from './layouts/Layout'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout><HomePage /></Layout>} />

        
        <Route path='/kravins' element={<Layout><p>Kravins Page</p></Layout>} />
      </Routes>
    </>
  )
}

export default App
