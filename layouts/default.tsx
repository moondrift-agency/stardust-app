import React from 'react'
import Navbar from '../components/Layouts/Navbar'
// export const UserContext = React.createContext();

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
