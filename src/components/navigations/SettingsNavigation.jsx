import { Link, useLocation } from "react-router-dom"
import { FaSmile } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { LuMailbox } from "react-icons/lu";
import { MdAccountCircle } from "react-icons/md";
import { FcOrganization } from "react-icons/fc";
import { FaBoltLightning } from "react-icons/fa6";

const SettingsNavigation = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2];
  if (subpage === undefined) {
    subpage = 'profile';
  }
  const linkClass = (type) => {
    let classes = 'flex items-center gap-2 px-4 py-2 w-full rounded-md '
    if (type === subpage) {
      classes += 'bg-indigo-100 font-semibold'
    }
    return classes;
  }
  return (
    <div className="flex flex-col">
      <Link to={'/settings/profile'} className={linkClass('profile')}>
        <FaSmile className="h-6 w-6 fill-yellow-400" />
        Profile
      </Link>
      <Link to={'/settings/customization'} className={linkClass('customization')}>
        <IoSettings className="h-6 w-6 fill-gray-600" />
        Customization
      </Link>
      <Link to={'/settings/notifications'} className={linkClass('notifications')}>
        <LuMailbox className="h-6 w-6" />
        Notifications
      </Link>
      <Link to={'/settings/account'} className={linkClass('account')}>
        <MdAccountCircle className="h-6 w-6 fill-green-600" />
        Account
      </Link>
      <Link to={'/settings/organization'} className={linkClass('organization')}>
        <FcOrganization className="h-6 w-6" />
        Organization
      </Link>
      <Link to={'/settings/extensions'} className={linkClass('extensions')}>
        <FaBoltLightning className="h-6 w-6 fill-yellow-400" />
        Extensions
      </Link>
    </div>
  )
}

export default SettingsNavigation