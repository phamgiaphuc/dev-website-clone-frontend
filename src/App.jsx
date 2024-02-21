import { Route, Routes } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import VerificationPage from './pages/VerificationPage'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/User/DashboardPage'
import EditorPage from './pages/User/EditorPage'
import ReadingListPage from './pages/User/ReadingListPage'
import axios from 'axios'
import { SERVER_BASE_URL } from './constants/vars'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import AuthProtectedRoute from './components/AuthProtectedRoute'
import UserProtectedRoute from './components/UserProtectedRoute'
import { PersistGate } from 'redux-persist/integration/react'
import MainLayout from './layouts/MainLayout'
import SettingsLayout from './layouts/SettingsLayout'
import UserPage from './pages/User/UserPage'
import CustomizationPage from './pages/Settings/CustomizationPage'
import ProfilePage from './pages/Settings/ProfilePage'
import NotificationsPage from './pages/Settings/NotificationsPage'
import AccountPage from './pages/Settings/AccountPage'
import OrganizationPage from './pages/Settings/OrganizationPage'
import ExtensionsPage from './pages/Settings/ExtensionsPage'

axios.defaults.baseURL = SERVER_BASE_URL;
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path='/' element={<MainLayout />} >
            <Route index element={<HomePage />} />
            <Route element={<AuthProtectedRoute />}>
              <Route path='signin' element={<SignInPage />} />
              <Route path='signup' element={<SignUpPage />} />
              <Route path='verification/:id' element={<VerificationPage />} />
            </Route>
            <Route element={<UserProtectedRoute />}>
              <Route path=':username' element={<UserPage />} />
              <Route path='dashboard' element={<DashboardPage />} />
              <Route path='readinglist' element={<ReadingListPage />} />
              <Route path='settings' element={<SettingsLayout />}>
                <Route index element={<ProfilePage />} />
                <Route path='profile' element={<ProfilePage />} />
                <Route path='customization' element={<CustomizationPage />} />
                <Route path='notifications' element={<NotificationsPage />} />
                <Route path='account' element={<AccountPage />} />
                <Route path='organization' element={<OrganizationPage />} />
                <Route path='extensions' element={<ExtensionsPage />} />
              </Route>
            </Route>
          </Route>
          <Route element={<UserProtectedRoute />}>
            <Route path='/new' element={<EditorPage />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  )
}

export default App