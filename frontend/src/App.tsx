import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Layout from './layouts/Layout'
import Auth from './pages/Auth'
import { useAppContext } from './contexts/useAppContext'

function App() {

  const { isLoggedIn } = useAppContext();

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout><HomePage /></Layout>} />
        <Route path='/login' element={<Auth />} />
        <Route path='/kravins' element={<Layout><p>Kravins Page</p></Layout>} />
        {
          isLoggedIn && <>
            {/* <Route path='/add-mypost' element={<Layout><CreatePost /></Layout>} />  DELETE THIS LATER*/} 
          </>
        }

      </Routes>
    </>
  )
}

export default App
