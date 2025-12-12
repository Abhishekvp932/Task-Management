import { Route,Routes } from 'react-router-dom'
import LoginPage from './page/auth/Login'
import SignupPage from './page/auth/Signup'
import HomePage from './page/user/Home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
    </Routes>
  )
}

export default App