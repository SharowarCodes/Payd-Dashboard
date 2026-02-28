import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import TopHeader from '../components/TopHeader'
import Breadcrumbs from '../components/Breadcrumbs'

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-full bg-slate-50">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className={collapsed ? 'lg:ml-[76px]' : 'lg:ml-[250px]'}>
        <TopHeader
          onOpenSidebar={() => setMobileOpen(true)}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <main className="px-4 py-6 lg:px-8">
          <div className="mb-4">
            <Breadcrumbs />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
