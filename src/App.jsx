import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Write from './pages/write/Write'
import Settings from './pages/settings/Settings'
import Single from './pages/single/Single'




function App() {

  


  return (
    <>
      <Navbar />
      <Routes>


        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/write' element={<Write />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/post/:postId' element={<Single />} />


      </Routes>
    </>
  )
}

export default App
