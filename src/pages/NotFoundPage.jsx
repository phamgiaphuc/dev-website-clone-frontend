import { Link, useNavigate } from "react-router-dom"

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-screen -mt-14 font-light">
      <span className="font-bold tracking-tight text-4xl">404 Not Found</span>
      <span className="max-w-screen-sm text-center">Sorry, we couldn&apos;t find this page. But don&apos;t worry, you can find plenty of other things on our <Link to={'/'} className="text-indigo-600 hover:underline hover:underline-offset-2">homepage</Link> or you can go <Link onClick={() => navigate(-1)} className="text-indigo-600 hover:underline hover:underline-offset-2">back</Link>.</span>
    </div>
  )
}

export default NotFoundPage