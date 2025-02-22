"use client"
import "../globals.css"
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/dashboard/layouts/DefaultLayout";
import Loader from "@/components/common/loader/Loader";
import Provider from "../Provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <div className={`dark:bg-boxdark-2 dark:text-bodydark w-full min-h-[100vh]  dark:text-slate-400 dark:bg-slate-800`}>
       <Provider>

         <DefaultLayout>
     
    {loading ? <Loader /> : children}
      </DefaultLayout>
       </Provider>

   

    
  </div>
  )
   
 
  
}