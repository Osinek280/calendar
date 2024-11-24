import { ReactNode } from "react"
import DashboardTopNav from "./components/dashbord-top-nav"
import DashboardSideBar from "./components/dashboard-side-bar"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <DashboardSideBar />
      <DashboardTopNav >
      {children}
      </DashboardTopNav>
    </div>
  )
}