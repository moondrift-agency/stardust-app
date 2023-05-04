import React from 'react'
import Navbar from '../components/Layouts/Navbar'
import Footer from '../components/Layouts/Footer'
// import SupabaseProvider from '../supabase-provider'
// export const UserContext = React.createContext();

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
