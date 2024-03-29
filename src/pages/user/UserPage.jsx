import { IoMdMail, IoLogoYoutube, IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoGithub } from "react-icons/io";
import { LuUserSquare } from "react-icons/lu";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoDocumentTextOutline, IoChatbubbleOutline } from "react-icons/io5";
import { CiHashtag } from "react-icons/ci";
import SubCard from "@/components/cards/SubCard";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "@/common/formatDate";
import { LuCake } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import PageTransformMotion from "@/components/motions/PageTransformMotion";
import { createAxios } from "@/common/axiosJWT";
import { userFollowAnotherUser, userUnfollowAnotherUser } from "@/redux/userApi";

const UserPage = () => {
  const { data: currentUser, isSignedIn } = useSelector((state) => state.user);
  const param = useParams();
  const query = new URLSearchParams(window.location.search);
  const [user, setUser] = useState({}); 
  const [blogs, setBlogs] = useState([]);
  const [sort, setSort] = useState(query.get('sort'));
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser, dispatch);

  const handleNewestBlogBtn = () => {
    setSort('desc');
  }

  const handleOldestBlogBtn = () => {
    setSort('asc');
  }

  const handleFollowBtn = async (event) => {
    event.preventDefault();
    if (!isSignedIn) {
      return navigate('/signin');
    }
    isFollow ? 
    await userUnfollowAnotherUser(axiosJWT, user._id, setIsFollow)
    :
    await userFollowAnotherUser(axiosJWT, user._id, setIsFollow);
  }

  useEffect(() => {
    axios.get(`/v1/users/${param.username}`).then(({data}) => {
      setUser(data);
    }).catch((error) => {
      console.log(error);
      return navigate('/')
    });
    axios.get(`/v1/blogs/${param.username}?publish=true&sort=${sort ? sort : 'desc'}`).then(({data}) => {
      setBlogs(data);
    }).catch((error) => {
      console.log(error);
    });
  }, [param.username, navigate, sort]);

  useEffect(() => {
    if (!isSignedIn) {
      return navigate('/signin');
    }
    if (user.id) {
      axiosJWT.post('/v1/users/check_follow', {
        authorId: user.id
      }).then(({ data: { isFollowed }}) =>  {
        setIsFollow(isFollowed);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [isSignedIn, navigate, user.id]);

  return (
    <PageTransformMotion>
      <div className={`absolute left-0 w-screen -z-10 h-[140px] flex justify-center font-light`} style={{ backgroundColor: user.profile?.branding_color }}></div>
      <div className='max-w-screen-lg grid grid-cols-3 gap-4 w-full mx-auto font-light'>
        <div className="relative col-span-3 flex flex-col h-fit max-w-screen-lg w-full p-4 mt-16 bg-white bottom-0 rounded-md border border-gray-200">
          <div className="absolute -top-14 -ml-4 w-full flex justify-center">
            <img src={user.profile?.profile_img} alt={user.profile?.username} className={`h-32 w-32 rounded-full border-8 object-cover`} style={{ borderColor: user.profile?.branding_color }}/>
          </div>
          <div className="flex justify-end">
            {
              currentUser && currentUser.profile?.username === user.profile?.username ?
              <Link to={'/settings'} className="py-2 px-4 z-10 rounded-md bg-indigo-600 text-center text-white hover:bg-indigo-700 hover:underline hover:underline-offset-2 cursor-pointer">
                Edit profile
              </Link>
              :
              isFollow ?
              <button onClick={handleFollowBtn} className="font-medium py-2 px-4 z-10 rounded-md bg-gray-100 text-center ring-2 ring-gray-300 hover:ring-gray-400 hover:bg-gray-200 hover:underline hover:underline-offset-2 cursor-pointer">
                Following
              </button>
              :
              <button onClick={handleFollowBtn} className="py-2 px-4 z-10 rounded-md bg-indigo-600 text-center text-white hover:bg-indigo-700 hover:underline hover:underline-offset-2 cursor-pointer">
                Follow
              </button>
            }
          </div>
          <div className="flex-1 flex justify-between flex-col mt-6 gap-4">
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold tracking-wide">{user.profile?.fullname}</span>
              <span className="text-sm text-gray-600">@{user.profile?.username}</span>
            </div>
            <div className="flex justify-center">
              <div className="w-2/3 text-center">
                {
                  user.profile?.bio.length > 0 ? user.profile?.bio : '404 bio not found'
                }
              </div>
            </div>
            <div className="flex justify-center items-center gap-8">
              {
                user.profile?.address &&
                <span className="flex text-sm items-center gap-2 text-gray-600">
                  <FaLocationDot className="w-6 h-6" />
                  {user.profile?.address}
                </span>
              }
              {
                user.createdAt &&
                <span className="flex text-sm items-center gap-2 text-gray-600">
                  <LuCake className="w-6 h-6" />
                  Joined on {formatDate(user.createdAt)}
                </span>
              }
              {
                user.email &&
                <a href={`mailto:${user.email}`} className="flex text-sm items-center gap-2 text-gray-600 hover:text-indigo-600">
                  <IoMdMail className="w-6 h-6" />
                  <span>{user.email}</span>
                </a>
              }
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className="bg-white flex flex-col justify-center items-center rounded-md border border-gray-200 p-4">
            <span className="text-left w-full mb-4 text-xl font-semibold">Infos</span>
            <div className="flex flex-col w-full gap-6">
              <span className="flex items-center gap-2">
                <IoDocumentTextOutline className="w-6 h-6"/>
                {blogs.length} {blogs.length === 1 ? 'post' : 'posts' } published
              </span>
              <span className="flex items-center gap-2">
                <IoChatbubbleOutline className="w-6 h-6"/>
                0 comments written
              </span>
              <span className="flex items-center gap-2">
                <CiHashtag className="w-6 h-6"/>
                0 tags followed
              </span>
            </div>
          </div>
          <div className="bg-white flex flex-col justify-center items-center rounded-md border border-gray-200 p-4">
            <span className="text-left w-full mb-4 text-xl font-semibold">Contacts</span>
            <div className="flex flex-col w-full gap-6">
              <a href={`mailto:${user.email}`} className="flex items-center gap-2 hover:text-indigo-600">
                <IoMdMail className="w-6 h-6" />
                <span>{user.email}</span>
              </a>
              <a href={user.profile?.social_links?.youtube} target={user.profile?.social_links?.youtube ? '_blank' : ''} className="flex items-center gap-2 hover:text-indigo-600">
                <IoLogoYoutube className="w-6 h-6" />
                <span>{user.profile?.social_links?.youtube ?  'Link' : 'No link'}</span>
              </a>
              <a href={user.profile?.social_links?.facebook} target={user.profile?.social_links?.facebook ? '_blank' : ''} className="flex items-center gap-2 hover:text-indigo-600">
                <IoLogoFacebook className="w-6 h-6" />
                <span>{user.profile?.social_links?.facebook ? 'Link' : 'No link'}</span>
              </a>
              <a href={user.profile?.social_links?.instagram} target={user.profile?.social_links?.instagram ? '_blank' : ''} className="flex items-center gap-2 hover:text-indigo-600">
                <IoLogoInstagram className="w-6 h-6" />
                <span>{user.profile?.social_links?.instagram ? 'Link' : 'No link'}</span>
              </a>
              <a href={user.profile?.social_links?.twitter} target={user.profile?.social_links?.twitter ? '_blank' : ''} className="flex items-center gap-2 hover:text-indigo-600">
                <IoLogoTwitter className="w-6 h-6" />
                <span>{user.profile?.social_links?.twitter ?  'Link' : 'No link'}</span>
              </a>
              <a href={user.profile?.social_links?.github} target={user.profile?.social_links?.github ? '_blank' : ''} className="flex items-center gap-2 hover:text-indigo-600">
                <IoLogoGithub className="w-6 h-6" />
                <span>{user.profile?.social_links?.github ? 'Link' : 'No link'}</span>
              </a>
              <a href={user.profile?.social_links?.website} target={user.profile?.social_links?.website ? '_blank' : ''} className="flex items-center gap-2 hover:text-indigo-600">
                <LuUserSquare className="w-6 h-6" />
                <span>{user.profile?.social_links?.website ?  'Link' : 'No link'}</span>
              </a>
            </div>
          </div>
        </div>
        <div className='col-span-2 flex flex-col gap-2'>
          {
            blogs.length > 0 ?
            <>
              <div className="flex gap-2">
                <button onClick={handleNewestBlogBtn} className={`flex gap-1 items-center py-2 px-4 rounded-md border border-gray-200 bg-white hover:border-gray-400 hover:underline hover:underline-offset-2 cursor-pointer ${sort === 'desc' && 'font-semibold border-gray-600'}`}>
                  <BiSortDown className="w-6 h-6"/>
                  Newest
                </button>
                <button onClick={handleOldestBlogBtn} className={`flex gap-1 items-center py-2 px-4 rounded-md border border-gray-200 bg-white hover:border-gray-400 hover:underline hover:underline-offset-2 cursor-pointer ${sort === 'asc' && 'font-semibold border-gray-600'}`}>
                  <BiSortUp className="w-6 h-6"/>
                  Oldest
                </button>
              </div>
              {
                blogs.map((blog, index) => 
                  <SubCard 
                    key={index}
                    profile_img={user.profile?.profile_img}
                    username={user.profile?.username}
                    fullname={user.profile?.fullname}
                    blog={blog}
                  />
                )
              } 
            </>
            :
            <div className="bg-white flex rounded-md border border-gray-200 p-4 font-semibold text-xl">
              <span>No posts yet</span>
            </div>
          }
        </div>
      </div>
    </PageTransformMotion>
  )
}

export default UserPage