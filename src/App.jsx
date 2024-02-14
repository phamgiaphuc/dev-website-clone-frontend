import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import VerificationPage from './pages/VerificationPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import DashboardPage from './pages/DashboardPage'
import EditorPage from './pages/EditorPage'
import ReadingListPage from './pages/ReadingListPage'
import SettingsPage from './pages/SettingsPage'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import axios from 'axios'
import { SERVER_BASE_URL } from './constants/vars'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/store'

axios.defaults.baseURL = SERVER_BASE_URL;
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<HomePage />} />
            <Route path='/signin' element={<SignInPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/verification/:id' element={<VerificationPage />} />
            <Route path='/:username' element={<ProfilePage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/new' element={<EditorPage />} />
            <Route path='/readinglist' element={<ReadingListPage />} />
            <Route path='/settings' element={<SettingsPage />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  )
}

export default App