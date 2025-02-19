

import "../globals.css"

import { SessionProvider } from "next-auth/react";

import Header from "@/components/header/Header";
import Provider from "../Provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  

  return (
    <div className={``}>
<Provider>

       <Header/>
     
    { children}
</Provider>

      
     

    
  </div>
  )
   
 
  
}