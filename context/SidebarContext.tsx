'use client'

import { createContext, useContext, useState } from 'react'

interface SidebarContextValue {
  mobileOpen: boolean
  openMobileSidebar: () => void
  closeMobileSidebar: () => void
}

const SidebarContext = createContext<SidebarContextValue>({
  mobileOpen: false,
  openMobileSidebar: () => {},
  closeMobileSidebar: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <SidebarContext.Provider
      value={{
        mobileOpen,
        openMobileSidebar: () => setMobileOpen(true),
        closeMobileSidebar: () => setMobileOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}
