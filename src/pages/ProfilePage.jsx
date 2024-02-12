import { UserContext } from '@/common/UserContext'
import { useContext } from 'react'

const ProfilePage = () => {
  const { userAuth: { email, profile } } = useContext(UserContext);
  return (
    <div>
      {email}<br />
      {profile?.username}
    </div>
  )
}

export default ProfilePage