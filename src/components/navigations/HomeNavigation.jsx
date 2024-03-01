import { Link } from "react-router-dom"
import { FcHome } from "react-icons/fc";
import { HiOutlineMicrophone } from "react-icons/hi";
import { FaVideo } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";
import { FcShop } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FcContacts } from "react-icons/fc";
import { FcAddressBook } from "react-icons/fc";
import { FaRegFaceLaughBeam } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import { FcPrivacy } from "react-icons/fc";
import { FcRules } from "react-icons/fc";
import { FaTwitter, FaSquareFacebook, FaSquareGithub, FaSquareInstagram, FaTwitch, FaLinkedin } from "react-icons/fa6";

const navigationList = [
  {
    title: 'Home',
    icon: <FcHome className="w-5 h-5" />,
    to: '/home'
  },
  {
    title: 'Podcasts',
    icon: <HiOutlineMicrophone className="w-5 h-5" />,
    to: '/pod'
  },
  {
    title: 'Videos',
    icon: <FaVideo className="w-5 h-5 fill-green-600" />,
    to: '/videos'
  },
  {
    title: 'Tags',
    icon: <FaTag className="w-5 h-5 fill-yellow-500" />,
    to: '/tags'
  },
  {
    title: 'DEV Help',
    icon: <FaRegLightbulb className="w-5 h-5" />,
    to: '/help'
  },
  {
    title: 'Forem Shop',
    icon: <FcShop className="w-5 h-5" />,
    to: 'https://shop.forem.com/'
  },
  {
    title: 'Advertise on DEV',
    icon: <FaHeart className="w-5 h-5 fill-red-600" />,
    to: '/ads'
  },
  {
    title: 'DEV Showcase',
    icon: <FaStar className="w-5 h-5 fill-yellow-500" />,
    to: '/showcase'
  },
  {
    title: 'About',
    icon: <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png" className="w-5 h-5" />,
    to: '/about'
  },
  {
    title: 'Contact',
    icon: <FcContacts className="w-5 h-5" />,
    to: '/contact'
  },
  {
    title: 'Guides',
    icon: <FcAddressBook className="w-5 h-5" />,
    to: '/guides'
  },
  {
    title: 'Software comparisons',
    icon: <FaRegFaceLaughBeam className="w-5 h-5" />,
    to: '/software-comparisons'
  }
]

const otherList = [
  {
    title: 'Code of Conduct',
    icon: <FaThumbsUp className="w-5 h-5 fill-yellow-500" />,
    to: '/code-of-conduct'
  },
  {
    title: 'Privacy Policy',
    icon: <FcPrivacy className="w-5 h-5" />,
    to: '/privacy'
  },
  {
    title: 'Terms of use',
    icon: <FcRules className="w-5 h-5" />,
    to: '/terms'
  },
]

const linkList = [
  {
    title: 'Twiiter',
    icon: <FaTwitter className="w-6 h-6" />,
  },
  {
    title: 'Facebook',
    icon: <FaSquareFacebook className="w-6 h-6" />,
  },
  {
    title: 'GitHub',
    icon: <FaSquareGithub className="w-6 h-6" />,
  },
  {
    title: 'Instagram',
    icon: <FaSquareInstagram className="w-6 h-6" />,
  },
  {
    title: 'Twitch',
    icon: <FaTwitch className="w-6 h-6" />,
  },
  {
    title: 'LinkedIn',
    icon: <FaLinkedin className="w-6 h-6" />,
  },
]

const HomeNavigation = () => {
  const { isSignedIn } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-4 font-light">
      {
        !isSignedIn
        && 
        <div className="bg-white p-4 rounded-md border border-gray-200 flex flex-col gap-4">
          <span className="text-xl font-semibold">DEV Community is a community of 1,294,319 amazing developers</span>
          <span className="text-justify text-gray-600">
            We&apos;re a place where coders share, stay up-to-date and grow their careers.
          </span>
          <div className="flex flex-col gap-1 text-center">
            <Link to={'/signup'} className='py-2 px-4 border border-indigo-600 rounded-md text-indigo-600 hover:bg-indigo-600 hover:text-white hover:underline hover:underline-offset-2'>
              Create account
            </Link>
            <Link to={'/signin'} className='py-2 px-4 rounded-md hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2'>
              Sign in
            </Link>
          </div>
        </div>
      }
      <div className="flex flex-col">
        {
          navigationList.map((link, index) => {
            return (
              <Link to={link.to} key={index} className="flex items-center gap-2 rounded-md py-2 px-4 hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2">
                {link.icon}
                {link.title}
              </Link>
            )
          })
        }
      </div>
      <div className="flex flex-col">
        <span className="font-semibold ml-4 mb-2">Other</span>
        {
          otherList.map((link, index) => {
            return (
              <Link to={link.to} key={index} className="flex items-center gap-2 rounded-md py-2 px-4 hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2">
                {link.icon}
                {link.title}
              </Link>
            )
          })
        }
      </div>
      <div className="flex items-center">
        {
          linkList.map((link, index) => {
            return (
              <Link key={index} to={'/'} className="p-2 hover:bg-indigo-100 hover:text-indigo-600 rounded-md">
                {link.icon}
              </Link>
            )
          })
        }
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-600">
        <span>
          <Link className="text-indigo-600 hover:underline hover:text-indigo-700">DEV Community</Link> A constructive and inclusive social network for software developers. With you every step of your journey.
        </span>
        <span>
          Built on <Link className="text-indigo-600 hover:underline hover:text-indigo-700">Forem</Link> — the <Link className="text-indigo-600 hover:underline hover:text-indigo-700">open source</Link> software that powers DEV and other inclusive communities.
        </span>
        <span>
          Made with love and <Link className="text-indigo-600 hover:underline hover:text-indigo-700">Ruby on rails</Link>. DEV Community © 2016 - 2024.
        </span>
      </div>
    </div>
  )
}

export default HomeNavigation