import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import VerificationPage from './pages/VerificationPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/verification/:id' element={<VerificationPage />} />
      </Route>
    </Routes>
  )
}

export default App