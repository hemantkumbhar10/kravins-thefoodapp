import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Layout from './layouts/Layout'
import Auth from './pages/Auth'
import { useAppContext } from './contexts/useAppContext'
import MyProfile from './pages/MyProfile'
import { useEffect } from 'react'
import { getUserProfileData } from './store/userProfile-slice';
import { useAppDispatch } from './store/dispatchHooks'
import CreatePost from './components/CreatePost'
import UpdatePersonalPost from './pages/UpdatePersonalPost'

function App() {
  const { isLoggedIn } = useAppContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserProfileData());
    }
  }, [isLoggedIn, dispatch])

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout><HomePage /></Layout>} />
        <Route path='/login' element={<Auth />} />
        <Route path='/kravins' element={<Layout><p>Kravins Page</p></Layout>} />
        {
          isLoggedIn && <>
            <Route path='/create-post' element={<Layout><CreatePost /></Layout>} />
            <Route path='/myProfile' element={<Layout><MyProfile /></Layout>} />
            <Route path='/edit/:id' element={<Layout><UpdatePersonalPost /></Layout>} />
          </>
        }

      </Routes>
    </>
  )
}

export default App
