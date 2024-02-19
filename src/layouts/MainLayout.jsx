import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="pt-14 container mx-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout