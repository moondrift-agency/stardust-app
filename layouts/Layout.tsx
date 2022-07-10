import React from "react";

//export const UserContext = React.createContext('');

//components
import Footer from "../components/Layout/Footer/Footer"
import Navbar from '../components/Layout/Navbar/Navbar'

interface LayoutProps {
  children: React.ReactNode,
}

export const Layout = ({ children } : LayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};