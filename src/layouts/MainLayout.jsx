import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"
import GitHubBadges from "@/components/badges/GitHubBadges"

const MainLayout = () => {
  return (
    <div className="relative">
      <Header />
      <div className="pt-14">
        <Outlet />
      </div>
      <GitHubBadges />
    </div>
  )
}

export default MainLayout